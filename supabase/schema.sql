-- ─── Zyro Admin — Supabase Schema ────────────────────────────────────────────
-- Run this once in your Supabase SQL editor before deploying.

-- Tenants
create table if not exists tenants (
  id text primary key,
  name text not null,
  initials text not null default '',
  owner text not null default '',
  phone text not null default '',
  email text not null default '',
  city text not null default '',
  signed_up text not null default '',
  plan text not null default 'Growth',
  mrr integer not null default 0,
  status text not null default 'active',
  health integer not null default 75,
  band text not null default 'watch',
  orders30d integer not null default 0,
  dunning_days integer,
  integrations text[] default '{}',
  breakdown jsonb default '[]',
  deep_dive jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Audit log
create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  admin text not null default 'Anes Khan',
  action text not null,
  tenant text not null default '',
  type text not null default 'account',
  reason text default '',
  created_at timestamptz default now()
);

-- Feature flags
create table if not exists feature_flags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  flag_type text not null default 'rollout',
  description text not null default '',
  owner text not null default 'Anes Khan',
  enabled boolean not null default true,
  rollout integer not null default 100,
  updated_at timestamptz default now()
);

-- Announcements
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  audience text not null default 'all',
  published_by text not null default 'Anes Khan',
  created_at timestamptz default now()
);
