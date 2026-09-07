import { BLOG_POSTS } from './blog-posts'
import { BLOG_POSTS_PART2 } from './blog-posts-2'

export const ALL_BLOG_POSTS = [...BLOG_POSTS, ...BLOG_POSTS_PART2]

export function getBlogBySlug(slug: string) {
  return ALL_BLOG_POSTS.find(p => p.slug === slug)
}
