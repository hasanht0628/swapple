-- Swapple initial schema: profiles, scans, scan_items, tracker_events.
-- Includes enums, indexes, RLS policies, and the scan-images storage bucket.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type subscription_status as enum ('free', 'paid', 'past_due', 'canceled');
create type scan_item_verdict as enum ('good', 'caution', 'avoid');

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  priorities text[] not null default '{}',
  subscription_status subscription_status not null default 'free',
  stripe_customer_id text,
  stripe_subscription_id text,
  onboarding_complete boolean not null default false,
  disclaimer_accepted_at timestamptz,
  notifications_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint priorities_count check (
    array_length(priorities, 1) is null or array_length(priorities, 1) between 1 and 3
  )
);

create table public.scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  image_path text not null,
  image_url text,
  status text not null default 'processing'
    check (status in ('processing', 'completed', 'failed')),
  item_count int,
  raw_ai_response jsonb,
  created_at timestamptz not null default now()
);

create table public.scan_items (
  id uuid primary key default gen_random_uuid(),
  scan_id uuid not null references public.scans(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  item_name text not null,
  brand_name text,
  barcode text,
  verdict scan_item_verdict not null,
  free_reason text not null,
  general_principle text not null,
  detailed_reason text,
  priority_tradeoffs jsonb not null default '[]'::jsonb,
  brand_recommendations jsonb not null default '[]'::jsonb,
  product_data_source text,         -- 'open_food_facts' | 'usda' | 'gs1' | 'model'
  confidence numeric,
  saved boolean not null default false,
  swapped boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.tracker_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  scan_item_id uuid references public.scan_items(id) on delete set null,
  event_type text not null check (event_type in ('saved', 'unsaved', 'swapped', 'unswapped')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index scans_user_created_idx on public.scans(user_id, created_at desc);
create index scan_items_scan_idx on public.scan_items(scan_id);
create index scan_items_user_saved_idx on public.scan_items(user_id, saved) where saved = true;
create index tracker_events_user_created_idx on public.tracker_events(user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at trigger for profiles
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- New-user trigger: create a profile row when an auth user is created.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.scans enable row level security;
alter table public.scan_items enable row level security;
alter table public.tracker_events enable row level security;

-- profiles: a user can see and modify only their own profile row.
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());
create policy "profiles_insert_own" on public.profiles
  for insert with check (id = auth.uid());
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- scans
create policy "scans_select_own" on public.scans
  for select using (user_id = auth.uid());
create policy "scans_insert_own" on public.scans
  for insert with check (user_id = auth.uid());
create policy "scans_update_own" on public.scans
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- scan_items
create policy "scan_items_select_own" on public.scan_items
  for select using (user_id = auth.uid());
create policy "scan_items_insert_own" on public.scan_items
  for insert with check (user_id = auth.uid());
create policy "scan_items_update_own" on public.scan_items
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- tracker_events
create policy "tracker_events_select_own" on public.tracker_events
  for select using (user_id = auth.uid());
create policy "tracker_events_insert_own" on public.tracker_events
  for insert with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Storage: scan-images bucket (private). Per-user {userId}/ prefix.
-- Images are retained indefinitely for eval and are NOT user-deletable in MVP
-- (no delete policy is created on purpose).
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('scan-images', 'scan-images', false)
on conflict (id) do nothing;

create policy "scan_images_read_own" on storage.objects
  for select using (
    bucket_id = 'scan-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "scan_images_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'scan-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
