import type { APIRoute } from 'astro';
import { getCards } from '../../lib/lootlo-queries';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const cat = url.searchParams.get('cat') || 'all';
  const offset = parseInt(url.searchParams.get('offset') || '0');
  const limit = parseInt(url.searchParams.get('limit') || '8');

  const { cards, hasMore } = await getCards({ cat, limit, offset });

  return new Response(JSON.stringify({ cards, hasMore }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};