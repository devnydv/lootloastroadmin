import type { APIRoute } from 'astro';
import { requireAdminOrResponse } from '../../../../lib/admin-auth';
import { supabaseAdmin } from '../../../../lib/supabase-admin';

export const prerender = false;

export const DELETE: APIRoute = async ({ params, cookies }) => {
  const unauth = requireAdminOrResponse(cookies);
  if (unauth) return unauth;

  // card_stores rows are removed automatically via ON DELETE CASCADE.
  const { error } = await supabaseAdmin.from('cards').delete().eq('id', params.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
