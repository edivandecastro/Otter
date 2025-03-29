-- Add column to store visibility of collections in profile settings
alter table public.profiles
add column if not exists settings_collections_visible boolean default false not null;

grant select on public.profiles to anon;
grant select on public.profiles to authenticated;
