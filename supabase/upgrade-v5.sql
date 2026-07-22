-- ═══════════════════════════════════════════════════════════════
-- Yoca — v5 upgrade for EXISTING databases (safe to run repeatedly)
-- Adds: extended work status values (concept / experimental) and the
--        optional live_url column on case_studies.
-- Fresh installs should run schema.sql instead (it includes all this).
-- ═══════════════════════════════════════════════════════════════

alter table public.case_studies
  add column if not exists live_url text;

alter table public.case_studies drop constraint if exists case_studies_kind_check;
alter table public.case_studies
  add constraint case_studies_kind_check
  check (kind in ('client', 'concept', 'product', 'experimental'));
