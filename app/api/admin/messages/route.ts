import { NextRequest, NextResponse } from 'next/server'
import { isAuthed } from '@/lib/auth'
import { getConversation, getMessages, markRead } from '@/lib/store'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const phone = request.nextUrl.searchParams.get('phone')
  if (!phone) {
    return NextResponse.json({ error: 'phone is required' }, { status: 400 })
  }

  const [messages, conv] = await Promise.all([getMessages(phone, 200), getConversation(phone)])

  // Opening a conversation clears its unread badge.
  await markRead(phone)

  return NextResponse.json({
    phone,
    name: conv?.name || '',
    step: conv?.step || 'greeting',
    mode: conv?.mode || 'auto',
    messages,
  })
}
