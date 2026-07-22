import type { APIRoute } from 'astro';
import { fetchCardsPage } from '../../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const filter = url.searchParams.get('filter') || 'all';
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);

  try {
    const { cards, exhausted, nextOffset } = await fetchCardsPage(filter, offset);

    // Shape matches what the client renderer expects (camelCase, same as
    // the old Firebase card objects) so buildCardEl() barely has to change.
    const payload = cards.map((c) => ({
      id: c.id,
      cat: c.cat,
      emoji: c.emoji,
      title: c.title,
      description: c.description,
      badge: c.badge,
      badgeLabel: c.badge_label,
      sortOrder: c.sort_order,
      stores: c.card_stores.map((s) => ({
        name: s.name,
        icon: s.icon,
        sub: s.sub,
        costLevel: s.cost_level,
        url: s.url,
        topPick: s.top_pick,
      })),
    }));

    return new Response(JSON.stringify({ cards: payload, exhausted, nextOffset }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('cards.json error:', err);
    return new Response(JSON.stringify({ error: 'Failed to load cards' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};