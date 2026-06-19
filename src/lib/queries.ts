// lib/queries.ts

// All posts for blog listing page
export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readingTime,
    "coverImage": coverImage.asset->url,
    "category": category->title,
    "tags": tags[]
  }
`

// Single post by slug
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readingTime,
    "coverImage": coverImage.asset->url,
    "category": category->title,
    "author": author->{ name },
    "tags": tags[],
    body
  }
`

// Related posts (exclude current slug)
export const relatedPostsQuery = `
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...3] {
    title,
    "slug": slug.current,
    publishedAt,
    readingTime,
    "coverImage": coverImage.asset->url,
    "category": category->title
  }
`

// All slugs for generateStaticParams
export const allSlugsQuery = `
  *[_type == "post"]{ "slug": slug.current }
`
