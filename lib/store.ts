import {
  Availability,
  Conversation,
  ConversationMode,
  ConversationStep,
  StoredMessage,
} from '@/types/cv'

/**
 * Persistent store backed by Upstash Redis (REST API).
 *
 * Why: Vercel serverless functions are stateless and recycle frequently, so an
 * in-memory Map loses every conversation on a cold start. Redis keeps the bot
 * sessions AND powers the admin inbox (message history, availability, handover).
 *
 * If the Upstash env vars are missing (e.g. local dev), we fall back to an
 * in-memory store so the app still runs — it just won't persist across restarts.
 */

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

const hasRedis = Boolean(REDIS_URL && REDIS_TOKEN)

const MAX_STORED_MESSAGES = 200
const KEY_AVAILABILITY = 'availability'
const KEY_INDEX = 'conv:index'
const convKey = (phone: string) => `conv:${phone}`
const msgsKey = (phone: string) => `msgs:${phone}`

// ---------------------------------------------------------------------------
// Low-level Redis command (Upstash REST)
// ---------------------------------------------------------------------------
async function redis(command: (string | number)[]): Promise<any> {
  const res = await fetch(REDIS_URL!, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error(`Redis command failed (${res.status}): ${await res.text()}`)
  }
  const data = await res.json()
  return data.result
}

// ---------------------------------------------------------------------------
// In-memory fallback (used only when Upstash is not configured)
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

// ---------------------------------------------------------------------------
// Availability (global owner status)
// ---------------------------------------------------------------------------
export async function getAvailability(): Promise<Availability> {
  if (!hasRedis) return mem.availability
  const value = (await redis(['GET', KEY_AVAILABILITY])) as string | null
  return value === 'available' ? 'available' : 'busy'
}

export async function setAvailability(value: Availability): Promise<void> {
  if (!hasRedis) {
    mem.availability = value
    return
  }
  await redis(['SET', KEY_AVAILABILITY, value])
}

// ---------------------------------------------------------------------------
// Conversations
// ---------------------------------------------------------------------------
export async function getConversation(phone: string): Promise<Conversation | null> {
  if (!hasRedis) return mem.convs.get(phone) ?? null
  const raw = (await redis(['GET', convKey(phone)])) as string | null
  return raw ? (JSON.parse(raw) as Conversation) : null
}

export async function ensureConversation(phone: string): Promise<Conversation> {
  const existing = await getConversation(phone)
  if (existing) return existing
  const fresh = emptyConversation(phone)
  await saveConversation(fresh)
  return fresh
}

export async function saveConversation(conv: Conversation): Promise<void> {
  if (!hasRedis) {
    mem.convs.set(conv.phone, conv)
    return
  }
  await redis(['SET', convKey(conv.phone), JSON.stringify(conv)])
  await redis(['ZADD', KEY_INDEX, conv.lastMessageAt, conv.phone])
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
  if (!hasRedis) {
    return Array.from(mem.convs.values())
      .sort((a, b) => b.lastMessageAt - a.lastMessageAt)
      .slice(0, limit)
  }
  const phones = (await redis(['ZRANGE', KEY_INDEX, 0, limit - 1, 'REV'])) as string[]
  if (!phones || phones.length === 0) return []
  const keys = phones.map(convKey)
  const raws = (await redis(['MGET', ...keys])) as (string | null)[]
  return raws
    .filter((r): r is string => Boolean(r))
    .map((r) => JSON.parse(r) as Conversation)
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------
export async function appendMessage(
  phone: string,
  message: Omit<StoredMessage, 'ts'> & { ts?: number }
): Promise<void> {
  const msg: StoredMessage = { ...message, ts: message.ts ?? Date.now() }

  if (!hasRedis) {
    const list = mem.msgs.get(phone) ?? []
    list.push(msg)
    if (list.length > MAX_STORED_MESSAGES) list.splice(0, list.length - MAX_STORED_MESSAGES)
    mem.msgs.set(phone, list)
  } else {
    await redis(['RPUSH', msgsKey(phone), JSON.stringify(msg)])
    await redis(['LTRIM', msgsKey(phone), -MAX_STORED_MESSAGES, -1])
  }

  // Keep the conversation metadata in sync (ordering + unread badge).
  const conv = (await getConversation(phone)) ?? emptyConversation(phone)
  conv.lastMessageAt = msg.ts
  if (msg.dir === 'in') conv.unread = (conv.unread ?? 0) + 1
  await saveConversation(conv)
}

export async function getMessages(phone: string, limit = 100): Promise<StoredMessage[]> {
  if (!hasRedis) {
    const list = mem.msgs.get(phone) ?? []
    return list.slice(-limit)
  }
  const raws = (await redis(['LRANGE', msgsKey(phone), -limit, -1])) as string[]
  return (raws || []).map((r) => JSON.parse(r) as StoredMessage)
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
  return hasRedis
}

export type { Conversation, ConversationStep, StoredMessage }
