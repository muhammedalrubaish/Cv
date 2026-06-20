import { NextResponse } from 'next/server'
import { isAuthed } from '@/lib/auth'
import { getAvailability, listConversations } from '@/lib/store'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const [conversations, availability] = await Promise.all([
    listConversations(100),
    getAvailability(),
  ])

  return NextResponse.json({
    availability,
    conversations: conversations.map((c) => ({
      phone: c.phone,
      name: c.name || '',
      step: c.step,
      mode: c.mode,
      unread: c.unread || 0,
      lastMessageAt: c.lastMessageAt,
    })),
  })
}
