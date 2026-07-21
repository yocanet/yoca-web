-- ═══════════════════════════════════════════════════════════════
-- Yoca — v4 upgrade for EXISTING databases (safe to run repeatedly)
-- Adds: case_studies.kind + video_url, Arabic locale support in
--        site_content, Products menu entries.
-- Fresh installs should run schema.sql instead (it includes all this).
-- ═══════════════════════════════════════════════════════════════

-- case_studies: kind (client/product) + hover video
alter table public.case_studies
  add column if not exists kind text not null default 'client';
alter table public.case_studies
  add column if not exists video_url text;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'case_studies_kind_check'
  ) then
    alter table public.case_studies
      add constraint case_studies_kind_check check (kind in ('client', 'product'));
  end if;
end $$;

-- site_content: allow Arabic
alter table public.site_content drop constraint if exists site_content_locale_check;
alter table public.site_content
  add constraint site_content_locale_check check (locale in ('en', 'tr', 'az', 'ar'));

-- Menus: add Products (header + footer), once
insert into public.menus (title, url, location, order_index, is_active)
select 'Products', '/products', 'header',
  coalesce((select max(order_index) from public.menus where location = 'header'), 0) + 1, true
where not exists (
  select 1 from public.menus where location = 'header' and url = '/products'
);

insert into public.menus (title, url, location, order_index, is_active)
select 'Products', '/products', 'footer',
  coalesce((select max(order_index) from public.menus where location = 'footer'), 0) + 1, true
where not exists (
  select 1 from public.menus where location = 'footer' and url = '/products'
);
