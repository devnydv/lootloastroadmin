// Adjust the import below to match wherever your Supabase client actually
// lives (it's set up next to lib/admin-auth in your admin panel).
import { supabase } from './supabase';

export interface StoreEntry {
  name: string;
  icon: string;
  sub: string;
  url: string;
  topPick: boolean;
  costLevel: number;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
  sortOrder: number;
}

export interface Card {
  id: string;
  cat: string;
  emoji: string;
  title: string;
  description: string;
  badge: string;
  badgeLabel: string;
  sortOrder: number;
  stores: StoreEntry[];
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, label, emoji, sort_order')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('getCategories error:', error.message);
    return [];
  }

  return (data || []).map((c) => ({
    id: c.id,
    label: c.label,
    emoji: c.emoji,
    sortOrder: c.sort_order,
  }));
}

export interface TopPick {
  id: number;
  cat: string;
  emoji: string;
  title: string;
  description: string;
  sortOrder: number;
  store: {
    name: string;
    icon: string;
    sub: string;
    url: string;
  };
}

export async function getTopPicks(
  opts: { limit?: number; offset?: number } = {}
): Promise<{ items: TopPick[]; hasMore: boolean }> {
  const { limit = 4, offset = 0 } = opts;

  const { data, error } = await supabase
    .from('top_picks')
    .select('id, cat, emoji, title, description, sort_order, store_name, store_icon, store_sub, store_url')
    .order('sort_order', { ascending: true })
    .range(offset, offset + limit);

  if (error) {
    console.error('getTopPicks error:', error.message);
    return { items: [], hasMore: false };
  }

  const rows = data || [];
  const hasMore = rows.length > limit;

  const items: TopPick[] = rows.slice(0, limit).map((r: any) => ({
    id: r.id,
    cat: r.cat,
    emoji: r.emoji,
    title: r.title,
    description: r.description,
    sortOrder: r.sort_order,
    store: {
      name: r.store_name,
      icon: r.store_icon,
      sub: r.store_sub,
      url: r.store_url,
    },
  }));

  return { items, hasMore };

  id: number;
  name: string;
  emoji: string;
  activity: number;
  barColor: string;
}

export interface TrendingItem {
  id: number;
  name: string;
  emoji: string;
  url: string;
  meta: string;
  rank: number;
  changeDir: 'up' | 'down' | 'new';
  changeVal: string;
}

export interface Spotlight {
  title: string;
  description: string;
  stores: StoreEntry[];
}

export async function getSpotlight(): Promise<Spotlight | null> {
  const [{ data: row, error: rowErr }, { data: stores, error: storesErr }] = await Promise.all([
    supabase.from('spotlight').select('title, description').eq('id', 1).maybeSingle(),
    supabase.from('spotlight_stores').select('name, icon, sub, url, top_pick, cost_level, sort_order').order('sort_order', { ascending: true }),
  ]);

  if (rowErr) console.error('getSpotlight (row) error:', rowErr.message);
  if (storesErr) console.error('getSpotlight (stores) error:', storesErr.message);
  if (!row) return null;

  return {
    title: row.title || '',
    description: row.description || '',
    stores: (stores || []).map((s: any) => ({
      name: s.name,
      icon: s.icon,
      sub: s.sub,
      url: s.url,
      topPick: s.top_pick,
      costLevel: s.cost_level,
    })),
  };
}

export async function getHeatCategories(): Promise<HeatCategory[]> {
  const { data, error } = await supabase
    .from('heat_categories')
    .select('id, name, emoji, activity, bar_color')
    .order('activity', { ascending: false });

  if (error) {
    console.error('getHeatCategories error:', error.message);
    return [];
  }

  return (data || []).map((h: any) => ({
    id: h.id,
    name: h.name,
    emoji: h.emoji,
    activity: h.activity,
    barColor: h.bar_color,
  }));
}

export async function getTrending(
  opts: { limit?: number; offset?: number } = {}
): Promise<{ items: TrendingItem[]; hasMore: boolean }> {
  const { limit = 4, offset = 0 } = opts;

  const { data, error } = await supabase
    .from('trending')
    .select('id, name, emoji, url, meta, rank, change_dir, change_val')
    .order('rank', { ascending: true })
    .range(offset, offset + limit);

  if (error) {
    console.error('getTrending error:', error.message);
    return { items: [], hasMore: false };
  }

  const rows = data || [];
  const hasMore = rows.length > limit;

  const items: TrendingItem[] = rows.slice(0, limit).map((r: any) => ({
    id: r.id,
    name: r.name,
    emoji: r.emoji,
    url: r.url,
    meta: r.meta,
    rank: r.rank,
    changeDir: r.change_dir,
    changeVal: r.change_val,
  }));

  return { items, hasMore };
}

export async function getCards(
  opts: { cat?: string; limit?: number; offset?: number } = {}
): Promise<{ cards: Card[]; hasMore: boolean }> {
  const { cat, limit = 8, offset = 0 } = opts;

  let query = supabase
    .from('cards')
    .select(
      `id, cat, emoji, title, description, badge, badge_label, sort_order,
       card_stores ( name, icon, sub, url, top_pick, cost_level, sort_order )`
    )
    .order('sort_order', { ascending: true })
    // fetch one extra row so we can tell if there's another page
    .range(offset, offset + limit);

  if (cat && cat !== 'all') {
    query = query.eq('cat', cat);
  }

  const { data, error } = await query;

  if (error) {
    console.error('getCards error:', error.message);
    return { cards: [], hasMore: false };
  }

  const rows = data || [];
  const hasMore = rows.length > limit;

  const cards: Card[] = rows.slice(0, limit).map((r: any) => ({
    id: r.id,
    cat: r.cat,
    emoji: r.emoji,
    title: r.title,
    description: r.description,
    badge: r.badge,
    badgeLabel: r.badge_label,
    sortOrder: r.sort_order,
    stores: (r.card_stores || [])
      .slice()
      .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((s: any) => ({
        name: s.name,
        icon: s.icon,
        sub: s.sub,
        url: s.url,
        topPick: s.top_pick,
        costLevel: s.cost_level,
      })),
  }));

  return { cards, hasMore };
}