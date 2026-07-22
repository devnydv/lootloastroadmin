import type { APIRoute } from 'astro';
import { requireAdminOrResponse } from '../../../../lib/admin-auth';
import { supabaseAdmin } from '../../../../lib/supabase-admin';

export const prerender = false;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const GET: APIRoute = async ({ cookies }) => {
  const unauth = requireAdminOrResponse(cookies);
  if (unauth) return unauth;

  const { data, error } = await supabaseAdmin
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) return json({ error: error.message }, 500);

  const categories = (data ?? []).map((c) => ({
    id: c.id,
    label: c.label,
    emoji: c.emoji,
    sortOrder: c.sort_order,
  }));

  return json(categories);
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const unauth = requireAdminOrResponse(cookies);
  if (unauth) return unauth;

  const body = await request.json();
  const id = String(body.id || '').trim().toLowerCase().replace(/\s+/g, '-');
  const label = String(body.label || '').trim();

  if (!id || !label) return json({ error: 'id and label are required' }, 400);

  const { error } = await supabaseAdmin.from('categories').upsert({
    id,
    label,
    emoji: body.emoji ?? '',
    sort_order: Number.isFinite(+body.sortOrder) ? +body.sortOrder : 0,
  });

  if (error) return json({ error: error.message }, 500);
  return json({ ok: true, id });
};
