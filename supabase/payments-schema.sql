-- Run this in Supabase SQL editor after the main schema.sql

alter table tenants
  add column if not exists stripe_customer_id text,
  add column if not exists easypaisa_number text,
  add column if not exists jazzcash_number text;

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  tenant_name text not null default '',
  amount integer not null,
  currency text not null default 'PKR',
  gateway text not null,
  method text not null default 'link',
  status text not null default 'pending',
  payment_link text,
  stripe_session_id text,
  notes text default '',
  admin text not null default 'Anes Khan',
  created_at timestamptz default now(),
  paid_at timestamptz
);
