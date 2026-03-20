create table leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  company text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  package text not null,
  services text[] not null default '{}',
  url text,
  inspiration text,
  contacted boolean default false
);

-- Allow anonymous inserts (from the website)
alter table leads enable row level security;

create policy "Anyone can insert leads"
  on leads for insert
  with check (true);

create policy "Anyone can read leads"
  on leads for select
  using (true);

create policy "Anyone can update leads"
  on leads for update
  using (true);
