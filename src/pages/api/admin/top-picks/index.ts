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
    .from('top_picks')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) return json({ error: error.message }, 500);

  const items = (data ?? []).map((p) => ({
    id: p.id,
    cat: p.cat,
    emoji: p.emoji,
    title: p.title,
    description: p.desc,
    sortOrder: p.sort_order,
    store: {
      name: p.store_name,
      icon: p.store_icon,
      sub: p.store_sub,
      url: p.store_url,
    },
  }));

  return json(items);
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const unauth = requireAdminOrResponse(cookies);
  if (unauth) return unauth;

  const body = await request.json();
  const title = String(body.title || '').trim();
  if (!title) return json({ error: 'title is required' }, 400);

  const row = {
    cat: body.cat ?? '',
    emoji: body.emoji ?? '',
    title,
    description: body.desc ?? '',
    sort_order: Number.isFinite(+body.sortOrder) ? +body.sortOrder : 0,
    store_name: body.store?.name ?? '',
    store_icon: body.store?.icon ?? '',
    store_sub: body.store?.sub ?? '',
    store_url: body.store?.url ?? '',
  };

  if (body.id) {
    const { error } = await supabaseAdmin.from('top_picks').update(row).eq('id', body.id);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true, id: body.id });
  }

  const { data, error } = await supabaseAdmin.from('top_picks').insert(row).select('id').single();
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true, id: data.id });
};
