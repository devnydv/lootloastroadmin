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
    .from('cards')
    .select('*, card_stores(*)')
    .order('sort_order', { ascending: true });

  if (error) return json({ error: error.message }, 500);

  const cards = (data ?? []).map((row: any) => ({
    id: row.id,
    cat: row.cat,
    emoji: row.emoji,
    title: row.title,
    desc: row.desc,
    badge: row.badge,
    badgeLabel: row.badge_label,
    sortOrder: row.sort_order,
    stores: (row.card_stores ?? [])
      .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((s: any) => ({
        name: s.name,
        icon: s.icon,
        sub: s.sub,
        costLevel: s.cost_level,
        url: s.url,
        topPick: s.top_pick,
      })),
  }));

  return json(cards);
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const unauth = requireAdminOrResponse(cookies);
  if (unauth) return unauth;

  const body = await request.json();
  const id = String(body.id || '').trim();
  const title = String(body.title || '').trim();
  if (!id || !title) return json({ error: 'id and title are required' }, 400);

  const { error: cardError } = await supabaseAdmin.from('cards').upsert({
    id,
    cat: body.cat ?? '',
    emoji: body.emoji ?? '',
    title,
    description: body.description ?? '',
    badge: body.badge ?? 'top',
    badge_label: body.badgeLabel ?? "Editor's Pick",
    sort_order: Number.isFinite(+body.sortOrder) ? +body.sortOrder : 0,
  });
  if (cardError) return json({ error: cardError.message }, 500);

  // Replace this card's stores wholesale — simplest way to keep order and
  // count in sync with whatever the form submitted (matches original UI,
  // which always resends the full stores array on save).
  const { error: delError } = await supabaseAdmin.from('card_stores').delete().eq('card_id', id);
  if (delError) return json({ error: delError.message }, 500);

  const stores = Array.isArray(body.stores) ? body.stores : [];
  if (stores.length) {
    const rows = stores.map((s: any, i: number) => ({
      card_id: id,
      name: s.name ?? '',
      icon: s.icon ?? '',
      sub: s.sub ?? '',
      cost_level: Number.isFinite(+s.costLevel) ? +s.costLevel : 2,
      url: s.url ?? '',
      top_pick: !!s.topPick,
      sort_order: i,
    }));
    const { error: storesError } = await supabaseAdmin.from('card_stores').insert(rows);
    if (storesError) return json({ error: storesError.message }, 500);
  }

  return json({ ok: true, id });
};
