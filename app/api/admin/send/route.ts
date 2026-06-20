import { NextRequest, NextResponse } from 'next/server'
import { isAuthed } from '@/lib/auth'
import { sendWhatsAppMessage } from '@/lib/whatsapp'
import { setMode } from '@/lib/store'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const phone: string | undefined = body?.phone
  const text: string | undefined = body?.text

  if (!phone || !text || !text.trim()) {
    return NextResponse.json({ error: 'phone and text are required' }, { status: 400 })
  }

  try {
    // When the owner replies manually, take this conversation over from the bot
    // so it won't also auto-respond to the next customer message.
    await setMode(phone, 'human')
    await sendWhatsAppMessage(phone, text.trim(), 'human')
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Manual send failed:', error)
    return NextResponse.json({ error: 'فشل إرسال الرسالة' }, { status: 500 })
  }
}
