import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, getAdminPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const password = getAdminPassword()
  if (!password) {
    return NextResponse.json(
      { error: 'لم يتم ضبط كلمة المرور (ADMIN_PASSWORD) في الخادم' },
      { status: 500 }
    )
  }

  const body = await request.json().catch(() => ({}))
  if (body?.password !== password) {
    return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, password, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 })
  return response
}
