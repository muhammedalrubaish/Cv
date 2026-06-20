'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type Availability = 'available' | 'busy'
type Mode = 'auto' | 'bot' | 'human'

interface ConvSummary {
  phone: string
  name: string
  step: string
  mode: Mode
  unread: number
  lastMessageAt: number
}

interface Msg {
  dir: 'in' | 'out'
  actor: 'customer' | 'bot' | 'human'
  text: string
  ts: number
}

const STEP_LABELS: Record<string, string> = {
  greeting: 'بداية',
  name: 'الاسم',
  job_title: 'المسمى',
  email: 'البريد',
  city: 'المدينة',
  summary: 'الملخص',
  experience_count: 'الخبرة',
  experience_details: 'الخبرة',
  education: 'التعليم',
  skills: 'المهارات',
  languages: 'اللغات',
  template_choice: 'النموذج',
  confirm: 'التأكيد',
  payment: 'الدفع',
  completed: 'مكتمل',
}

function timeAgo(ts: number) {
  if (!ts) return ''
  const d = Math.floor((Date.now() - ts) / 1000)
  if (d < 60) return 'الآن'
  if (d < 3600) return `${Math.floor(d / 60)} د`
  if (d < 86400) return `${Math.floor(d / 3600)} س`
  return `${Math.floor(d / 86400)} يوم`
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [availability, setAvailability] = useState<Availability>('busy')
  const [conversations, setConversations] = useState<ConvSummary[]>([])
  const [active, setActive] = useState<string | null>(null)
  const [messages, setMessages] = useState<Msg[]>([])
  const [activeMode, setActiveMode] = useState<Mode>('auto')
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)

  const threadRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<string | null>(null)
  activeRef.current = active

  // ---- data loaders ----
  const loadConversations = useCallback(async () => {
    const res = await fetch('/api/admin/conversations', { cache: 'no-store' })
    if (res.status === 401) {
      setAuthed(false)
      return
    }
    setAuthed(true)
    const data = await res.json()
    setAvailability(data.availability)
    setConversations(data.conversations || [])
  }, [])

  const loadMessages = useCallback(async (phone: string) => {
    const res = await fetch(`/api/admin/messages?phone=${encodeURIComponent(phone)}`, {
      cache: 'no-store',
    })
    if (!res.ok) return
    const data = await res.json()
    if (activeRef.current !== phone) return
    setMessages(data.messages || [])
    setActiveMode(data.mode || 'auto')
  }, [])

  // ---- polling ----
  useEffect(() => {
    loadConversations()
    const t = setInterval(loadConversations, 5000)
    return () => clearInterval(t)
  }, [loadConversations])

  useEffect(() => {
    if (!active) return
    loadMessages(active)
    const t = setInterval(() => loadMessages(active), 4000)
    return () => clearInterval(t)
  }, [active, loadMessages])

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight })
  }, [messages])

  // ---- actions ----
  async function doLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setPassword('')
      loadConversations()
    } else {
      const data = await res.json().catch(() => ({}))
      setLoginError(data.error || 'تعذّر تسجيل الدخول')
    }
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setAuthed(false)
  }

  async function toggleAvailability() {
    const next: Availability = availability === 'available' ? 'busy' : 'available'
    setAvailability(next)
    await fetch('/api/admin/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ availability: next }),
    })
  }

  async function changeMode(mode: Mode) {
    if (!active) return
    setActiveMode(mode)
    await fetch('/api/admin/mode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: active, mode }),
    })
    loadConversations()
  }

  async function sendReply(e: React.FormEvent) {
    e.preventDefault()
    if (!active || !reply.trim() || sending) return
    setSending(true)
    const text = reply.trim()
    setReply('')
    const res = await fetch('/api/admin/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: active, text }),
    })
    setSending(false)
    if (res.ok) {
      setActiveMode('human')
      loadMessages(active)
      loadConversations()
    } else {
      setReply(text)
      alert('فشل إرسال الرسالة')
    }
  }

  // ---- render: loading ----
  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">
        جارٍ التحميل…
      </div>
    )
  }

  // ---- render: login ----
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <form
          onSubmit={doLogin}
          className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
        >
          <h1 className="mb-1 text-2xl font-bold text-white">لوحة الاستقبال</h1>
          <p className="mb-6 text-sm text-slate-400">iDes Designers — صندوق الوارد</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
            autoFocus
          />
          {loginError && <p className="mb-3 text-sm text-red-400">{loginError}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500"
          >
            دخول
          </button>
        </form>
      </div>
    )
  }

  const activeConv = conversations.find((c) => c.phone === active)

  // ---- render: dashboard ----
  return (
    <div className="flex h-screen flex-col bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-white">📥 صندوق الوارد</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAvailability}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              availability === 'available'
                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                : 'bg-amber-600 text-white hover:bg-amber-500'
            }`}
            title="عندما تكون «متاح» ترد بنفسك؛ وعندما تكون «مشغول» يرد البوت تلقائياً"
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            {availability === 'available' ? 'متاح (أرد بنفسي)' : 'مشغول (يرد البوت)'}
          </button>
          <button onClick={logout} className="text-sm text-slate-400 hover:text-white">
            خروج
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversation list */}
        <aside className="w-72 shrink-0 overflow-y-auto border-l border-slate-800 bg-slate-900/50">
          {conversations.length === 0 && (
            <p className="p-4 text-sm text-slate-500">لا توجد محادثات بعد.</p>
          )}
          {conversations.map((c) => (
            <button
              key={c.phone}
              onClick={() => {
                setActive(c.phone)
                setMessages([])
              }}
              className={`flex w-full items-start justify-between gap-2 border-b border-slate-800/60 px-4 py-3 text-right transition ${
                active === c.phone ? 'bg-slate-800' : 'hover:bg-slate-800/40'
              }`}
            >
              <div className="min-w-0">
                <div className="truncate font-semibold text-white">
                  {c.name || c.phone}
                </div>
                <div className="truncate text-xs text-slate-400" dir="ltr">
                  {c.phone}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px]">
                  <span className="rounded bg-slate-700 px-1.5 py-0.5 text-slate-300">
                    {STEP_LABELS[c.step] || c.step}
                  </span>
                  {c.mode === 'human' && (
                    <span className="rounded bg-blue-900 px-1.5 py-0.5 text-blue-300">يدوي</span>
                  )}
                  {c.mode === 'bot' && (
                    <span className="rounded bg-purple-900 px-1.5 py-0.5 text-purple-300">بوت</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] text-slate-500">{timeAgo(c.lastMessageAt)}</span>
                {c.unread > 0 && (
                  <span className="min-w-[20px] rounded-full bg-emerald-600 px-1.5 text-center text-[11px] font-bold text-white">
                    {c.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </aside>

        {/* Thread */}
        <main className="flex flex-1 flex-col">
          {!active ? (
            <div className="flex flex-1 items-center justify-center text-slate-500">
              اختر محادثة لعرضها
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-4 py-3">
                <div>
                  <div className="font-semibold text-white">{activeConv?.name || active}</div>
                  <div className="text-xs text-slate-400" dir="ltr">
                    {active}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="ml-1 text-slate-500">من يرد:</span>
                  {(['auto', 'human', 'bot'] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => changeMode(m)}
                      className={`rounded px-2 py-1 transition ${
                        activeMode === m
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {m === 'auto' ? 'تلقائي' : m === 'human' ? 'أنا' : 'البوت'}
                    </button>
                  ))}
                </div>
              </div>

              <div ref={threadRef} className="flex-1 space-y-2 overflow-y-auto bg-slate-950 p-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.dir === 'in' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm ${
                        m.dir === 'in'
                          ? 'bg-slate-800 text-slate-100'
                          : m.actor === 'human'
                          ? 'bg-blue-600 text-white'
                          : 'bg-emerald-700 text-white'
                      }`}
                    >
                      {m.dir === 'out' && (
                        <div className="mb-0.5 text-[10px] opacity-70">
                          {m.actor === 'human' ? '✍️ أنت' : '🤖 البوت'}
                        </div>
                      )}
                      {m.text}
                      <div className="mt-1 text-[10px] opacity-60">{timeAgo(m.ts)}</div>
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <p className="text-center text-sm text-slate-600">لا توجد رسائل</p>
                )}
              </div>

              <form
                onSubmit={sendReply}
                className="flex items-center gap-2 border-t border-slate-800 bg-slate-900 p-3"
              >
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="اكتب ردك… (سيتوقف البوت عن هذه المحادثة)"
                  className="flex-1 rounded-full border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={sending || !reply.trim()}
                  className="rounded-full bg-emerald-600 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-50"
                >
                  {sending ? '…' : 'إرسال'}
                </button>
              </form>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
