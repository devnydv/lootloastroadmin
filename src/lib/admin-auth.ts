import type { AstroCookies } from 'astro';

const COOKIE_NAME = 'sv_admin_session';
const SESSION_VALUE = 'ok'; // shared-password model, no per-user identity
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

export function isAdminAuthed(cookies: AstroCookies): boolean {
  return cookies.get(COOKIE_NAME)?.value === SESSION_VALUE;
}


export function setAdminSession(cookies: AstroCookies) {
  cookies.set(COOKIE_NAME, SESSION_VALUE, {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: MAX_AGE_SECONDS,
  });
}

export function clearAdminSession(cookies: AstroCookies) {
  cookies.delete(COOKIE_NAME, { path: '/' });
}

/**
 * Use at the top of every /api/admin/* handler.
 * Returns a 401 Response if the request isn't authenticated, otherwise null.
 */
export function requireAdminOrResponse(cookies: AstroCookies): Response | null {
  if (!isAdminAuthed(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return null;
}
