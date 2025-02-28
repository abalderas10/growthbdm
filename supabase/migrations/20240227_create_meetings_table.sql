-- Create meetings table
create table public.meetings (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    description text,
    start_time timestamp with time zone not null,
    end_time timestamp with time zone not null,
    attendee_email text not null,
    attendee_name text not null,
    meeting_type text not null,
    google_event_id text,
    status text default 'pending'::text check (status in ('pending', 'confirmed', 'cancelled'))
);

-- Enable RLS
alter table public.meetings enable row level security;

-- Allow public insert access
create policy "Allow public insert access"
    on public.meetings
    for insert
    to public
    with check (true);

-- Allow read access to authenticated users
create policy "Allow read access to authenticated users"
    on public.meetings
    for select
    to authenticated
    using (true);
