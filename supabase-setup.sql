-- Create courses table
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert mock data
insert into public.courses (title, progress, icon_name)
values
  ('Advanced React Patterns', 75, 'Code2'),
  ('Next.js Architecture', 60, 'Layers'),
  ('Database Design', 90, 'Database'),
  ('System Design Basics', 40, 'Network');

-- Enable Row Level Security (RLS)
alter table public.courses enable row level security;

-- Create policy to allow read access to everyone (for this prototype)
create policy "Allow public read access"
  on public.courses
  for select
  to public
  using (true);
