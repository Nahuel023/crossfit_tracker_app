-- CrossFit Tracker App — Database Schema
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null default 'Nahuel',
  weight_kg numeric(5,2) default 101.5,
  height_cm numeric(5,1) default 185.0,
  created_at timestamptz default now()
);

create table if not exists public.body_weight_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  weight_kg numeric(5,2) not null,
  logged_at date not null default current_date,
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.training_blocks (
  id uuid default uuid_generate_v4() primary key,
  week_start date not null,
  day_of_week int not null check (day_of_week between 0 and 6),
  phase text not null check (phase in ('build','competition','elite')),
  month text not null,
  category text not null check (category in ('strength','gymnastics','cardio','olympic_lifting','travel','milestone')),
  title text not null,
  description text not null default '',
  skills text[] not null default '{}',
  is_travel_block boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists public.block_completions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  block_id uuid references public.training_blocks(id) on delete cascade not null,
  status text not null check (status in ('completed','pending','deleted')),
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, block_id)
);

create table if not exists public.skill_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  block_id uuid references public.training_blocks(id) on delete set null,
  skill text not null,
  metric_type text not null check (metric_type in ('reps','weight_kg','time_seconds','distance_meters')),
  metric_value numeric(10,2) not null,
  notes text,
  feel int not null check (feel between 1 and 5),
  logged_at date not null default current_date,
  created_at timestamptz default now()
);

create table if not exists public.competition_results (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  competition_date date not null,
  competition_name text not null,
  category text not null check (category in ('scaled','rx')),
  notes text not null default '',
  created_at timestamptz default now()
);

create table if not exists public.milestone_checks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  skill text not null,
  target_value numeric(10,2) not null,
  target_unit text not null,
  achieved_value numeric(10,2),
  achieved_at date,
  is_minimum boolean not null default true,
  created_at timestamptz default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_body_weight_logs_user_date on public.body_weight_logs(user_id, logged_at desc);
create index if not exists idx_training_blocks_week on public.training_blocks(week_start, day_of_week);
create index if not exists idx_training_blocks_phase on public.training_blocks(phase);
create index if not exists idx_block_completions_user on public.block_completions(user_id, block_id);
create index if not exists idx_skill_logs_user_skill on public.skill_logs(user_id, skill, logged_at desc);
create index if not exists idx_milestone_checks_user on public.milestone_checks(user_id, skill);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.body_weight_logs enable row level security;
alter table public.training_blocks enable row level security;
alter table public.block_completions enable row level security;
alter table public.skill_logs enable row level security;
alter table public.competition_results enable row level security;
alter table public.milestone_checks enable row level security;

-- Profiles: users can only see and edit their own profile
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Body weight logs
create policy "body_weight_logs_select" on public.body_weight_logs
  for select using (auth.uid() = user_id);
create policy "body_weight_logs_insert" on public.body_weight_logs
  for insert with check (auth.uid() = user_id);
create policy "body_weight_logs_update" on public.body_weight_logs
  for update using (auth.uid() = user_id);
create policy "body_weight_logs_delete" on public.body_weight_logs
  for delete using (auth.uid() = user_id);

-- Training blocks: readable by all authenticated users (shared plan)
create policy "training_blocks_select" on public.training_blocks
  for select using (auth.role() = 'authenticated');

-- Block completions
create policy "block_completions_select" on public.block_completions
  for select using (auth.uid() = user_id);
create policy "block_completions_insert" on public.block_completions
  for insert with check (auth.uid() = user_id);
create policy "block_completions_update" on public.block_completions
  for update using (auth.uid() = user_id);
create policy "block_completions_delete" on public.block_completions
  for delete using (auth.uid() = user_id);

-- Skill logs
create policy "skill_logs_select" on public.skill_logs
  for select using (auth.uid() = user_id);
create policy "skill_logs_insert" on public.skill_logs
  for insert with check (auth.uid() = user_id);
create policy "skill_logs_update" on public.skill_logs
  for update using (auth.uid() = user_id);
create policy "skill_logs_delete" on public.skill_logs
  for delete using (auth.uid() = user_id);

-- Competition results
create policy "competition_results_select" on public.competition_results
  for select using (auth.uid() = user_id);
create policy "competition_results_insert" on public.competition_results
  for insert with check (auth.uid() = user_id);
create policy "competition_results_update" on public.competition_results
  for update using (auth.uid() = user_id);
create policy "competition_results_delete" on public.competition_results
  for delete using (auth.uid() = user_id);

-- Milestone checks
create policy "milestone_checks_select" on public.milestone_checks
  for select using (auth.uid() = user_id);
create policy "milestone_checks_insert" on public.milestone_checks
  for insert with check (auth.uid() = user_id);
create policy "milestone_checks_update" on public.milestone_checks
  for update using (auth.uid() = user_id);
create policy "milestone_checks_delete" on public.milestone_checks
  for delete using (auth.uid() = user_id);

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, weight_kg, height_cm)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', 'Nahuel'), 101.5, 185.0)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
