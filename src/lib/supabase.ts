import { createClient } from '@supabase/supabase-js';

// These run server-side only (in .astro frontmatter and API routes), so we
// deliberately do NOT prefix them with PUBLIC_ — unlike the old
// window.FIREBASE_CONFIG, nothing here ships to the browser bundle.
const SUPABASE_URL = import.meta.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing SUPABASE_URL / SUPABASE_ANON_KEY env vars');
}

// Anon key only — every table this client touches (categories, cards,
// card_stores) has a "Public read ... using (true)" policy and no write
// policies, so this key can never mutate data even if leaked.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

export const PAGE_SIZE = 4;

export type StoreRow = {
  name: string;
  icon: string | null;
  sub: string | null;
  cost_level: number | null;
  url: string | null;
  top_pick: boolean;
  sort_order: number;
};

export type CardRow = {
  id: string;
  cat: string;
  emoji: string | null;
  title: string;
  description: string | null;
  badge: string;
  badge_label: string;
  sort_order: number;
  card_stores: StoreRow[];
};

/**
 * Fetch one page of cards (+ their stores), optionally filtered by category.
 * Offset-based pagination replaces Firebase's startAfter/composite-key
 * ("catSort") approach — Postgres range() does this natively.
 */
export async function fetchCardsPage(filter: string, offset: number, limit = PAGE_SIZE) {
  let q = supabase
    .from('cards')
    .select(
      `id, cat, emoji, title, description, badge, badge_label, sort_order,
       card_stores ( name, icon, sub, cost_level, url, top_pick, sort_order )`
    )
    .order('sort_order', { ascending: true })
    .range(offset, offset + limit - 1);

  if (filter !== 'all') {
    q = q.eq('cat', filter);
  }

  const { data, error } = await q;
  if (error) throw error;

  const cards = (data ?? []) as unknown as CardRow[];
  // card_stores comes back unordered relative to each other — sort client-side
  for (const c of cards) {
    c.card_stores?.sort((a, b) => a.sort_order - b.sort_order);
  }

  return {
    cards,
    exhausted: cards.length < limit,
    nextOffset: offset + cards.length,
  };
}

export async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, label, emoji, sort_order')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchStats() {
  const [{ count: catCount }, { count: storeCount }] = await Promise.all([
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('card_stores').select('*', { count: 'exact', head: true }),
  ]);
  return { catCount: catCount ?? 0, storeCount: storeCount ?? 0 };
}