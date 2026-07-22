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
    .from('trending')
    .select('*')
    .order('rank', { ascending: true });

  if (error) return json({ error: error.message }, 500);

  const items = (data ?? []).map((t) => ({
    id: t.id,
    name: t.name,
    emoji: t.emoji,
    url: t.url,
    meta: t.meta,
    rank: t.rank,
    changeDir: t.change_dir,
    changeVal: t.change_val,
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
    url: body.url ?? '',
    meta: body.meta ?? '',
    rank: Number.isFinite(+body.rank) ? +body.rank : 1,
    change_dir: body.changeDir ?? 'up',
    change_val: body.changeVal ?? '',
  };

  if (body.id) {
    const { error } = await supabaseAdmin.from('trending').update(row).eq('id', body.id);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true, id: body.id });
  }

  const { data, error } = await supabaseAdmin.from('trending').insert(row).select('id').single();
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true, id: data.id });
};
