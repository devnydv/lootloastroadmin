import type { APIRoute } from 'astro';
import { requireAdminOrResponse } from '../../../lib/admin-auth';
import { supabaseAdmin } from '../../../lib/supabase-admin';

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

  const [{ data: spotlight, error: sErr }, { data: stores, error: stErr }] = await Promise.all([
    supabaseAdmin.from('spotlight').select('*').eq('id', 1).maybeSingle(),
    supabaseAdmin.from('spotlight_stores').select('*').order('sort_order', { ascending: true }),
  ]);

  if (sErr) return json({ error: sErr.message }, 500);
  if (stErr) return json({ error: stErr.message }, 500);

  return json({
    title: spotlight?.title ?? '',
    desc: spotlight?.desc ?? '',
    stores: (stores ?? []).map((s) => ({
      name: s.name,
      icon: s.icon,
      sub: s.sub,
      costLevel: s.cost_level,
      url: s.url,
      topPick: s.top_pick,
    })),
  });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const unauth = requireAdminOrResponse(cookies);
  if (unauth) return unauth;

  const body = await request.json();

  const { error: upsertErr } = await supabaseAdmin.from('spotlight').upsert({
    id: 1,
    title: body.title ?? '',
    desc: body.desc ?? '',
  });
  if (upsertErr) return json({ error: upsertErr.message }, 500);

  // Replace the store list wholesale, same approach as a card's stores.
  const { error: delErr } = await supabaseAdmin.from('spotlight_stores').delete().neq('id', 0);
  if (delErr) return json({ error: delErr.message }, 500);

  const stores = Array.isArray(body.stores) ? body.stores : [];
  if (stores.length) {
    const rows = stores.map((s: any, i: number) => ({
      name: s.name ?? '',
      icon: s.icon ?? '',
      sub: s.sub ?? '',
      cost_level: Number.isFinite(+s.costLevel) ? +s.costLevel : 2,
      url: s.url ?? '',
      top_pick: !!s.topPick,
      sort_order: i,
    }));
    const { error: insErr } = await supabaseAdmin.from('spotlight_stores').insert(rows);
    if (insErr) return json({ error: insErr.message }, 500);
  }

  return json({ ok: true });
};
