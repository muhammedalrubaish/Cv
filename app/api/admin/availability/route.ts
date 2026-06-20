import { NextRequest, NextResponse } from 'next/server'
import { isAuthed } from '@/lib/auth'
import { getAvailability, setAvailability } from '@/lib/store'
import { Availability } from '@/types/cv'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ availability: await getAvailability() })
}

export async function POST(request: NextRequest) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const value = body?.availability as Availability
  if (value !== 'available' && value !== 'busy') {
    return NextResponse.json({ error: 'availability must be available|busy' }, { status: 400 })
  }

  await setAvailability(value)
  return NextResponse.json({ availability: value })
}
