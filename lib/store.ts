import {
  Availability,
  Conversation,
  ConversationMode,
  ConversationStep,
  StoredMessage,
} from '@/types/cv'

/**
 * Persistent store backed by Supabase (Postgres via the PostgREST REST API).
 *
 * Why: Vercel serverless functions are stateless and recycle frequently, so an
 * in-memory Map loses every conversation on a cold start. Supabase keeps the bot
 * sessions AND powers the admin inbox (message history, availability, handover).
 *
 * We talk to Supabase over plain HTTP (no extra npm dependency) using the
 * service-role key, which runs server-side only.
 *
 * If the Supabase env vars are missing (e.g. local dev), we fall back to an
 * in-memory store so the app still runs — it just won't persist across restarts.
 *
 * Required tables (see supabase-schema.sql):
 *   conversations(phone PK, name, step, cv_data jsonb, mode, unread,
 *                 created_at int8, last_message_at int8)
 *   messages(id PK, phone, dir, actor, text, ts int8)
 *   settings(key PK, value)
 */

// Accept the various names the Supabase/Vercel integration may use, so the
// app works whether the vars are SUPABASE_* or NEXT_PUBLIC_SUPABASE_*.
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
// MUST be the service_role key — RLS is enabled with no public policies, so the
// anon/publishable key would be blocked from reading or writing.
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY

const hasDb = Boolean(SUPABASE_URL && SUPABASE_KEY)

const MAX_STORED_MESSAGES = 200

// ---------------------------------------------------------------------------
// Low-level Supabase REST helper
// ---------------------------------------------------------------------------
async function sb(path: string, init: RequestInit = {}): Promise<any> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY!,
      Authorization: `Bearer ${SUPABASE_KEY!}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${await res.text()}`)
  }
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

async function upsert(table: string, row: Record<string, unknown>): Promise<void> {
  await sb(table, {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(row),
  })
}

// ---------------------------------------------------------------------------
// Row <-> Conversation mapping (snake_case in DB, camelCase in app)
// ---------------------------------------------------------------------------
function rowToConversation(row: any): Conversation {
  return {
    phone: row.phone,
    name: row.name ?? '',
    step: (row.step ?? 'greeting') as ConversationStep,
    cvData: row.cv_data ?? {},
    mode: (row.mode ?? 'auto') as ConversationMode,
    unread: row.unread ?? 0,
    createdAt: Number(row.created_at) || Date.now(),
    lastMessageAt: Number(row.last_message_at) || Date.now(),
  }
}

function conversationToRow(c: Conversation): Record<string, unknown> {
  return {
    phone: c.phone,
    name: c.name,
    step: c.step,
    cv_data: c.cvData,
    mode: c.mode,
    unread: c.unread,
    created_at: c.createdAt,
    last_message_at: c.lastMessageAt,
  }
}

// ---------------------------------------------------------------------------
// In-memory fallback (used only when Supabase is not configured)
// ---------------------------------------------------------------------------
const mem = {
  availability: 'busy' as Availability,
  convs: new Map<string, Conversation>(),
  msgs: new Map<string, StoredMessage[]>(),
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------
function emptyConversation(phone: string): Conversation {
  const now = Date.now()
  return {
    phone,
    name: '',
    step: 'greeting',
    cvData: {
      personalInfo: {
        fullName: '',
        jobTitle: '',
        phone,
        email: '',
        city: '',
        summary: '',
      },
      experience: [],
      education: [],
      skills: [],
      languages: [],
      template: 'classic',
    },
    mode: 'auto',
    unread: 0,
    createdAt: now,
    lastMessageAt: now,
  }
}

const enc = (v: string) => encodeURIComponent(v)

// ---------------------------------------------------------------------------
// Availability (global owner status)
// ---------------------------------------------------------------------------
export async function getAvailability(): Promise<Availability> {
  if (!hasDb) return mem.availability
  const rows = (await sb(`settings?key=eq.availability&select=value`)) as any[]
  return rows?.[0]?.value === 'available' ? 'available' : 'busy'
}

export async function setAvailability(value: Availability): Promise<void> {
  if (!hasDb) {
    mem.availability = value
    return
  }
  await upsert('settings', { key: 'availability', value })
}

// ---------------------------------------------------------------------------
// Conversations
// ---------------------------------------------------------------------------
export async function getConversation(phone: string): Promise<Conversation | null> {
  if (!hasDb) return mem.convs.get(phone) ?? null
  const rows = (await sb(`conversations?phone=eq.${enc(phone)}&select=*`)) as any[]
  return rows?.[0] ? rowToConversation(rows[0]) : null
}

export async function ensureConversation(phone: string): Promise<Conversation> {
  const existing = await getConversation(phone)
  if (existing) return existing
  const fresh = emptyConversation(phone)
  await saveConversation(fresh)
  return fresh
}

export async function saveConversation(conv: Conversation): Promise<void> {
  if (!hasDb) {
    mem.convs.set(conv.phone, conv)
    return
  }
  await upsert('conversations', conversationToRow(conv))
}

export async function updateConversation(
  phone: string,
  updates: Partial<Conversation>
): Promise<Conversation> {
  const current = (await getConversation(phone)) ?? emptyConversation(phone)
  const next: Conversation = { ...current, ...updates }
  await saveConversation(next)
  return next
}

export async function setMode(phone: string, mode: ConversationMode): Promise<void> {
  await updateConversation(phone, { mode })
}

export async function listConversations(limit = 50): Promise<Conversation[]> {
  if (!hasDb) {
    return Array.from(mem.convs.values())
      .sort((a, b) => b.lastMessageAt - a.lastMessageAt)
      .slice(0, limit)
  }
  const rows = (await sb(
    `conversations?select=*&order=last_message_at.desc&limit=${limit}`
  )) as any[]
  return (rows || []).map(rowToConversation)
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------
export async function appendMessage(
  phone: string,
  message: Omit<StoredMessage, 'ts'> & { ts?: number }
): Promise<void> {
  const msg: StoredMessage = { ...message, ts: message.ts ?? Date.now() }

  if (!hasDb) {
    const list = mem.msgs.get(phone) ?? []
    list.push(msg)
    if (list.length > MAX_STORED_MESSAGES) list.splice(0, list.length - MAX_STORED_MESSAGES)
    mem.msgs.set(phone, list)
  } else {
    await sb('messages', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        phone,
        dir: msg.dir,
        actor: msg.actor,
        text: msg.text,
        ts: msg.ts,
      }),
    })
  }

  // Keep the conversation metadata in sync (ordering + unread badge).
  const conv = (await getConversation(phone)) ?? emptyConversation(phone)
  conv.lastMessageAt = msg.ts
  if (msg.dir === 'in') conv.unread = (conv.unread ?? 0) + 1
  await saveConversation(conv)
}

export async function getMessages(phone: string, limit = 200): Promise<StoredMessage[]> {
  if (!hasDb) {
    const list = mem.msgs.get(phone) ?? []
    return list.slice(-limit)
  }
  // Fetch newest `limit` rows, then return them in chronological order.
  const rows = (await sb(
    `messages?phone=eq.${enc(phone)}&select=dir,actor,text,ts&order=ts.desc&limit=${limit}`
  )) as any[]
  return (rows || [])
    .map((r) => ({ dir: r.dir, actor: r.actor, text: r.text, ts: Number(r.ts) }) as StoredMessage)
    .reverse()
}

export async function markRead(phone: string): Promise<void> {
  await updateConversation(phone, { unread: 0 })
}

// ---------------------------------------------------------------------------
// Routing decision: should the bot auto-reply to this conversation?
// ---------------------------------------------------------------------------
export async function shouldBotReply(conv: Conversation): Promise<boolean> {
  if (conv.mode === 'bot') return true
  if (conv.mode === 'human') return false
  // 'auto' => follow the global toggle
  const availability = await getAvailability()
  return availability === 'busy'
}

export function isStoreConfigured(): boolean {
  return hasDb
}

export type { Conversation, ConversationStep, StoredMessage }
