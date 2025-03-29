-- Create collection_tags_view
create or replace view public.collection_tags_view as
select
  b.collection,
  array_agg(distinct tag) as tags,
  count(*) as bookmark_count
from public.bookmarks b,
lateral unnest(b.tags) as tag
where b.tags is not null and b.collection is not null
group by b.collection;

-- Grant access to authenticated users
grant select on public.collection_tags_view to anon;
grant select on public.collection_tags_view to authenticated;
