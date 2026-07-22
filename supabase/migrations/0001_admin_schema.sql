-- LootLo admin schema: categories + cards (+ their stores)
-- Trending / top_picks / spotlight / heat_categories are follow-up tables,
-- built the same way once this pass is confirmed working.

create table if not exists categories (
  id text primary key,                 -- slug, e.g. "mens"
  label text not null,
  emoji text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists cards (
  id text primary key,                 -- slug, e.g. "mens-shirts"
  cat text not null references categories(id) on update cascade,
  emoji text,
  title text not null,
  description text,
  badge text not null default 'top',            -- 'top' | 'hot' | 'new'
  badge_label text not null default 'Editor''s Pick',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists cards_cat_sort_idx on cards (cat, sort_order);

create table if not exists card_stores (
  id bigint generated always as identity primary key,
  card_id text not null references cards(id) on delete cascade,
  name text not null,
  icon text,
  sub text,
  cost_level smallint,                 -- 1 = budget, 2 = mid, 3 = premium
  url text,
  top_pick boolean not null default false,
  sort_order integer not null default 0
);
create index if not exists card_stores_card_id_idx on card_stores(card_id);

-- keep updated_at fresh
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger categories_set_updated_at before update on categories
  for each row execute function set_updated_at();
create trigger cards_set_updated_at before update on cards
  for each row execute function set_updated_at();

-- RLS: the public site reads directly with the anon key (read-only).
-- The admin panel writes through API routes using the service role key,
-- which bypasses RLS entirely, so no write policies are defined here.
alter table categories enable row level security;
alter table cards enable row level security;
alter table card_stores enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read cards" on cards for select using (true);
create policy "Public read card_stores" on card_stores for select using (true);
