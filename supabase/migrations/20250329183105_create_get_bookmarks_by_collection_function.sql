-- Create RPC function to get bookmarks by collection name
create or replace function public.get_bookmarks_by_collection(
  collection_name text
)
returns setof public.bookmarks
language sql
as $$
  select *
  from public.bookmarks
  where collection = collection_name;
$$;

-- Grant access for client roles
grant execute on function public.get_bookmarks_by_collection(text) to anon;
grant execute on function public.get_bookmarks_by_collection(text) to authenticated;
