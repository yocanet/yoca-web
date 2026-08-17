-- Yoca — Insights publishing system (v6)
-- Run in the Supabase SQL editor after schema.sql / upgrade-v3..v5.
-- Rollback (if ever needed): drop the four tables + bucket policies below.

create extension if not exists "pgcrypto";

-- ── Categories (localized names as jsonb: {"en":"Strategy","tr":"Strateji",...}) ──
create table if not exists public.insight_categories (
  key text primary key,
  names jsonb not null,
  sort_order int not null default 0
);

insert into public.insight_categories (key, names, sort_order) values
  ('strategy',   '{"en":"Strategy","tr":"Strateji","az":"Strategiya","ar":"الاستراتيجية"}', 1),
  ('brand',      '{"en":"Brand","tr":"Marka","az":"Brend","ar":"العلامة التجارية"}', 2),
  ('digital',    '{"en":"Digital Experiences","tr":"Dijital Deneyimler","az":"Rəqəmsal Təcrübələr","ar":"التجارب الرقمية"}', 3),
  ('growth',     '{"en":"Growth","tr":"Büyüme","az":"Artım","ar":"النمو"}', 4),
  ('ai',         '{"en":"AI & Automation","tr":"Yapay Zekâ ve Otomasyon","az":"Süni İntellekt və Avtomatlaşdırma","ar":"الذكاء الاصطناعي والأتمتة"}', 5),
  ('product',    '{"en":"Product & Technology","tr":"Ürün ve Teknoloji","az":"Məhsul və Texnologiya","ar":"المنتج والتقنية"}', 6)
on conflict (key) do nothing;

-- ── Insights: one row per (translation group, locale) ────────────────────
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null default gen_random_uuid(),
  locale text not null check (locale in ('en','tr','az','ar')),
  slug text not null,
  title text not null default '',
  excerpt text not null default '',
  body_md text not null default '',
  cover_url text,
  cover_alt text,
  cover_caption text,
  category_key text references public.insight_categories(key),
  tags text[] not null default '{}',
  author_name text not null default 'Yoca',
  author_role text,
  status text not null default 'DRAFT' check (status in ('DRAFT','IN_REVIEW','SCHEDULED','PUBLISHED','ARCHIVED')),
  publish_at timestamptz,
  featured boolean not null default false,
  related_service text,        -- service slug (e.g. ai-automation)
  related_product text,        -- product key (e.g. yocastudio)
  related_insight_id uuid references public.insights(id) on delete set null,
  cta_type text not null default 'none' check (cta_type in ('none','contact','checkup','service','product')),
  seo_title text,
  meta_description text,
  canonical_override text,
  og_title text,
  og_description text,
  og_image text,
  noindex boolean not null default false,
  sources jsonb not null default '[]',   -- [{title,url,domain,accessed_at,source_type}]
  faq jsonb not null default '[]',       -- [{q,a}]
  reading_minutes int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, slug)
);
create index if not exists insights_public_idx on public.insights (locale, status, publish_at desc);
create index if not exists insights_group_idx on public.insights (group_id);
create index if not exists insights_category_idx on public.insights (locale, category_key);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists insights_touch on public.insights;
create trigger insights_touch before update on public.insights
  for each row execute function public.touch_updated_at();

-- ── Revisions (recovery after AI rewrites / major edits) ─────────────────
create table if not exists public.insight_revisions (
  id uuid primary key default gen_random_uuid(),
  insight_id uuid not null references public.insights(id) on delete cascade,
  title text not null default '',
  excerpt text not null default '',
  body_md text not null default '',
  reason text,
  created_at timestamptz not null default now()
);
create index if not exists insight_revisions_idx on public.insight_revisions (insight_id, created_at desc);

-- ── AI operation log (operational metadata only — no secrets, no reasoning) ─
create table if not exists public.ai_runs (
  id uuid primary key default gen_random_uuid(),
  insight_id uuid references public.insights(id) on delete set null,
  action text not null,
  model text not null,
  locale text,
  status text not null default 'ok',
  created_by text,
  tokens_in int,
  tokens_out int,
  error text,
  created_at timestamptz not null default now()
);

-- ── RLS ──────────────────────────────────────────────────────────────────
alter table public.insight_categories enable row level security;
alter table public.insights enable row level security;
alter table public.insight_revisions enable row level security;
alter table public.ai_runs enable row level security;

drop policy if exists "public read insight categories" on public.insight_categories;
create policy "public read insight categories" on public.insight_categories for select using (true);
drop policy if exists "auth manage insight categories" on public.insight_categories;
create policy "auth manage insight categories" on public.insight_categories for all to authenticated using (true) with check (true);

-- Public: ONLY published rows whose publish time has passed. Drafts never leak.
drop policy if exists "public read published insights" on public.insights;
create policy "public read published insights" on public.insights for select
  using (status = 'PUBLISHED' and publish_at is not null and publish_at <= now());
drop policy if exists "auth manage insights" on public.insights;
create policy "auth manage insights" on public.insights for all to authenticated using (true) with check (true);

drop policy if exists "auth manage insight revisions" on public.insight_revisions;
create policy "auth manage insight revisions" on public.insight_revisions for all to authenticated using (true) with check (true);

drop policy if exists "auth read ai runs" on public.ai_runs;
create policy "auth read ai runs" on public.ai_runs for select to authenticated using (true);
-- ai_runs are written by the server (service role) only.

-- ── Storage bucket for cover images ──────────────────────────────────────
insert into storage.buckets (id, name, public) values ('insights', 'insights', true)
on conflict (id) do nothing;
drop policy if exists "public read insights media" on storage.objects;
create policy "public read insights media" on storage.objects for select using (bucket_id = 'insights');
drop policy if exists "auth write insights media" on storage.objects;
create policy "auth write insights media" on storage.objects for insert to authenticated with check (bucket_id = 'insights');
drop policy if exists "auth update insights media" on storage.objects;
create policy "auth update insights media" on storage.objects for update to authenticated using (bucket_id = 'insights');
drop policy if exists "auth delete insights media" on storage.objects;
create policy "auth delete insights media" on storage.objects for delete to authenticated using (bucket_id = 'insights');
