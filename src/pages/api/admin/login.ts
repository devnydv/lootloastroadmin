import type { APIRoute } from 'astro';
import { setAdminSession } from '../../../lib/admin-auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const password = form.get('password');

  // ADMIN_PASSWORD lives server-side only (no PUBLIC_ prefix) so it's
  // never shipped to the browser, unlike the old window.ADMIN_PASSWORD.
  if (typeof password !== 'string' || password.length === 0 || password !== import.meta.env.ADMIN_PASSWORD) {
    return redirect('/admin?error=1');
  }

  setAdminSession(cookies);
  return redirect('/admin');
};
