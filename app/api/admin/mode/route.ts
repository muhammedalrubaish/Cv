import { NextRequest, NextResponse } from 'next/server'
import { isAuthed } from '@/lib/auth'
import { setMode } from '@/lib/store'
import { ConversationMode } from '@/types/cv'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const phone: string | undefined = body?.phone
  const mode = body?.mode as ConversationMode

  if (!phone) {
    return NextResponse.json({ error: 'phone is required' }, { status: 400 })
  }
  if (mode !== 'auto' && mode !== 'bot' && mode !== 'human') {
    return NextResponse.json({ error: 'mode must be auto|bot|human' }, { status: 400 })
  }

  await setMode(phone, mode)
  return NextResponse.json({ ok: true, mode })
}
