import type { APIRoute } from 'astro';
import { getTopPicks } from '../../lib/lootlo-queries';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const offset = parseInt(url.searchParams.get('offset') || '0');
  const limit = parseInt(url.searchParams.get('limit') || '4');

  const { items, hasMore } = await getTopPicks({ limit, offset });

  return new Response(JSON.stringify({ items, hasMore }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};