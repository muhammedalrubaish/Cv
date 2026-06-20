import { cookies } from 'next/headers'

/**
 * Very lightweight single-owner auth for the admin inbox.
 * The password is stored in the ADMIN_PASSWORD env var; on login we set an
 * httpOnly cookie holding that same value and compare on every request.
 * Good enough for a private single-user dashboard — not multi-tenant auth.
 */
export const ADMIN_COOKIE = 'ides_admin'

export function getAdminPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD
}

export function isAuthed(): boolean {
  const password = getAdminPassword()
  if (!password) return false
  const cookie = cookies().get(ADMIN_COOKIE)?.value
  return Boolean(cookie) && cookie === password
}
