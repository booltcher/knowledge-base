export type Bookmark = {
  link: string,
  icon?: string,
  desc?: string,
  title: string
}
export type BookmarkCategory = {
  title: string,
  icon?: string,
  children: Bookmark[] | BookmarkCategory[]
}