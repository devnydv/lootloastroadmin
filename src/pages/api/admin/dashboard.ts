import type { APIRoute } from 'astro';
import { requireAdminOrResponse } from '../../../lib/admin-auth';
import { supabaseAdmin } from '../../../lib/supabase-admin';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const unauth = requireAdminOrResponse(cookies);
  if (unauth) return unauth;

  const [{ count: categories }, { count: cards }, { count: topPicks }, { count: trending }, { count: heat }] =
    await Promise.all([
      supabaseAdmin.from('categories').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('cards').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('top_picks').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('trending').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('heat_categories').select('*', { count: 'exact', head: true }),
    ]);

  return new Response(
    JSON.stringify({
      categories: categories ?? 0,
      cards: cards ?? 0,
      topPicks: topPicks ?? 0,
      trending: trending ?? 0,
      heat: heat ?? 0,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
