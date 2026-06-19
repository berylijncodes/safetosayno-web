import type { PortableTextBlock } from '@portabletext/types'

export type SanityImage = {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }

export type Author = {
    _id: string
    name: string
    slug: string
    image?: SanityImage
    bio?: string
  }
   
  export type Category = {
    _id: string
    title: 'boundaries' | 'people-pleasing' | 'mindset' | 'relationships' | 'self-worth'
    slug: string
    description?: string
  }
   
  export type Post = {
    _id: string
    title: string
    slug: string
    excerpt?: string
    body: PortableTextBlock[]
    publishedAt: string
    coverImage: string        // resolved URL via GROQ image() helper
    coverImageAlt?: string
    readingTime?: string
    author?: Pick<Author, '_id' | 'name' | 'image'>
    category?: Pick<Category, '_id' | 'title' | 'slug'>
  }

  export type BlogPostListItem = {
    title: string
    slug: string
    excerpt?: string
    publishedAt: string
    readingTime?: string
    coverImage?: string
    category?: string
    tags?: string[]
  }