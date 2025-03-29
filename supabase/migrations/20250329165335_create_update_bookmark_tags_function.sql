-- Create function to update bookmark tags
create or replace function public.update_bookmark_tags(
  old_tag text,
  new_tag text,
  user_id uuid
)
returns void
language plpgsql
as $$
begin
  update bookmarks
  set tags = array_replace(tags, old_tag, new_tag)
  where user = user_id
    and tags @> array[old_tag];
end;
$$;

-- Grant permission to use the function from client apps
grant execute on function public.update_bookmark_tags(text, text, uuid) to anon;
grant execute on function public.update_bookmark_tags(text, text, uuid) to authenticated;
