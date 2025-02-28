-- Create the google_calendar_tokens table
create table google_calendar_tokens (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  access_token text not null,
  refresh_token text,
  expiry_date timestamp with time zone not null
);

-- Add RLS policies
alter table google_calendar_tokens enable row level security;

-- Only allow authenticated users to view tokens
create policy "Allow authenticated users to view tokens"
  on google_calendar_tokens for select
  using (auth.role() = 'authenticated');

-- Only allow authenticated users to insert/update tokens
create policy "Allow authenticated users to insert/update tokens"
  on google_calendar_tokens for insert
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated users to update tokens"
  on google_calendar_tokens for update
  using (auth.role() = 'authenticated');
