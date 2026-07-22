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
    .from('heat_categories')
    .select('*')
    .order('activity', { ascending: false });

  if (error) return json({ error: error.message }, 500);

  const items = (data ?? []).map((h) => ({
    id: h.id,
    name: h.name,
    emoji: h.emoji,
    activity: h.activity,
    barColor: h.bar_color,
  }));

  return json(items);
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const unauth = requireAdminOrResponse(cookies);
  if (unauth) return unauth;

  const body = await request.json();
  const name = String(body.name || '').trim();
  if (!name) return json({ error: 'name is required' }, 400);

  const row = {
    name,
    emoji: body.emoji ?? '',
    activity: Number.isFinite(+body.activity) ? +body.activity : 0,
    bar_color: body.barColor ?? 'var(--gold)',
  };

  if (body.id) {
    const { error } = await supabaseAdmin.from('heat_categories').update(row).eq('id', body.id);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true, id: body.id });
  }

  const { data, error } = await supabaseAdmin.from('heat_categories').insert(row).select('id').single();
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true, id: data.id });
};
