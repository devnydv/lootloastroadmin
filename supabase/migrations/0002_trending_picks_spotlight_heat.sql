-- Follow-up to 0001: Trending, Top Picks, Spotlight, Heat Grid.
-- These are simpler than cards — mostly flat rows — except Spotlight,
-- which (like a card) has its own list of stores.

create table if not exists trending (
  id bigint generated always as identity primary key,
  name text not null,
  emoji text,
  url text,
  meta text,                      -- e.g. "Levi's · Myntra"
  rank integer not null default 1,
  change_dir text not null default 'up' check (change_dir in ('up','down','new')),
  change_val text,                -- e.g. "34%"
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists trending_rank_idx on trending (rank);

create table if not exists top_picks (
  id bigint generated always as identity primary key,
  cat text,                       -- freeform category label, not a categories FK
  emoji text,
  title text not null,
  description text,
  sort_order integer not null default 0,
  store_name text,
  store_icon text,
  store_sub text,
  store_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists top_picks_sort_idx on top_picks (sort_order);

create table if not exists heat_categories (
  id bigint generated always as identity primary key,
  name text not null,
  emoji text,
  activity integer not null default 0,
  bar_color text not null default 'var(--gold)',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists heat_categories_activity_idx on heat_categories (activity desc);

-- Singleton row: always id = 1.
create table if not exists spotlight (
  id smallint primary key default 1 check (id = 1),
  title text,
  description text,
  updated_at timestamptz not null default now()
);

create table if not exists spotlight_stores (
  id bigint generated always as identity primary key,
  name text not null,
  icon text,
  sub text,
  cost_level smallint,
  url text,
  top_pick boolean not null default false,
  sort_order integer not null default 0
);

create trigger trending_set_updated_at before update on trending
  for each row execute function set_updated_at();
create trigger top_picks_set_updated_at before update on top_picks
  for each row execute function set_updated_at();
create trigger heat_categories_set_updated_at before update on heat_categories
  for each row execute function set_updated_at();
create trigger spotlight_set_updated_at before update on spotlight
  for each row execute function set_updated_at();

alter table trending enable row level security;
alter table top_picks enable row level security;
alter table heat_categories enable row level security;
alter table spotlight enable row level security;
alter table spotlight_stores enable row level security;

create policy "Public read trending" on trending for select using (true);
create policy "Public read top_picks" on top_picks for select using (true);
create policy "Public read heat_categories" on heat_categories for select using (true);
create policy "Public read spotlight" on spotlight for select using (true);
create policy "Public read spotlight_stores" on spotlight_stores for select using (true);
