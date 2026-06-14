-- Per-recommendation save tracking on scan_items.
alter table public.scan_items
  add column saved_recommendation_rank integer,
  add column saved_recommendation jsonb;
