create extension if not exists pgcrypto;
create table if not exists public.quotes (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 email text not null,
 phone text,
 type text,
 message text not null,
 status text not null default 'Yeni' check (status in ('Yeni','İnceleniyor','Teklif Gönderildi','Tamamlandı','İptal')),
 note text default '',
 created_at timestamptz not null default now()
);
create index if not exists quotes_created_at_idx on public.quotes(created_at desc);
create index if not exists quotes_status_idx on public.quotes(status);
alter table public.quotes enable row level security;
-- Service-role API uses SUPABASE_SERVICE_ROLE_KEY server-side; no public policy is created.
