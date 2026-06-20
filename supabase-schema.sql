-- =============================================================
-- iDes Designers — WhatsApp hybrid agent schema (Supabase / Postgres)
-- Run this once in: Supabase Dashboard → SQL Editor → New query → Run
-- =============================================================

-- Conversations: one row per customer (bot session + inbox metadata)
create table if not exists public.conversations (
  phone           text primary key,
  name            text        not null default '',
  step            text        not null default 'greeting',
  cv_data         jsonb       not null default '{}'::jsonb,
  mode            text        not null default 'auto',   -- auto | bot | human
  unread          integer     not null default 0,
  created_at      bigint      not null,
  last_message_at bigint      not null
);

create index if not exists conversations_last_message_at_idx
  on public.conversations (last_message_at desc);

-- Messages: full inbound/outbound history for the inbox
create table if not exists public.messages (
  id     bigint generated always as identity primary key,
  phone  text   not null,
  dir    text   not null,           -- in | out
  actor  text   not null,           -- customer | bot | human
  text   text   not null default '',
  ts     bigint not null
);

create index if not exists messages_phone_ts_idx
  on public.messages (phone, ts);

-- Settings: simple key/value (used for the availability toggle)
create table if not exists public.settings (
  key   text primary key,
  value text not null
);

-- Default the owner to "busy" so the bot answers until you switch to "available".
insert into public.settings (key, value)
values ('availability', 'busy')
on conflict (key) do nothing;

-- =============================================================
-- Security: the app connects with the SERVICE ROLE key (server-side only),
-- which bypasses RLS. We still enable RLS and add NO public policies, so the
-- anon/public key cannot read or write these tables. This keeps customer
-- conversations private.
-- =============================================================
alter table public.conversations enable row level security;
alter table public.messages       enable row level security;
alter table public.settings       enable row level security;
