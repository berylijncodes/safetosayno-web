# Safe To Say No — Claude Code context

Personal blog and editorial site about boundaries, self-worth, and saying no without guilt.

## Repos / folders

| Folder | Purpose |
|--------|---------|
| `safetosayno-web/` (this repo) | Next.js frontend + embedded Sanity Studio at `/studio` |
| `../safetosayno-studio/` | Standalone Sanity Studio (optional; same Sanity project) |

Prefer editing content in Sanity. The web app reads from the Sanity API.

## Stack

- **Next.js 16** (App Router, Turbopack in dev)
- **React 19**, **TypeScript**
- **Sanity** via `next-sanity`, `@portabletext/react`
- **CSS Modules** for component/page styles (no Tailwind)
- **Fonts**: Playfair Display + Inter (see `src/app/layout.tsx`)

## Dev commands

```bash
# Website (port 3000)
cd safetosayno-web
npm run dev

# Standalone Sanity Studio (port 3333) — optional
cd ../safetosayno-studio
npm run dev
```

Embedded studio also runs at `http://localhost:3000/studio` when the web app is running.

## Environment variables

Set in `.env.local` (never commit secrets):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (usually `production`)
- `KIT_API_KEY` — ConvertKit newsletter API
- `KIT_FORM_ID` — ConvertKit form ID

## Key paths

```
src/app/
  page.tsx              # Homepage (featured + recent posts from Sanity)
  blog/page.tsx         # Blog listing with category filter + pagination
  blog/[slug]/page.tsx  # Single post (Portable Text body)
  about/page.tsx
  free-guide/page.tsx
  studio/[[...tool]]/   # Embedded Sanity Studio
  api/subscribe/        # Newsletter signup route

src/lib/
  sanity.ts             # Sanity client + urlFor image helper
  queries.ts            # GROQ queries (allPostsQuery, postBySlugQuery, etc.)
  types.ts              # Post / BlogPostListItem TypeScript types
  mockPosts.ts          # Legacy mock data — blog now uses Sanity; avoid adding new mocks

src/sanity/
  schemas/              # post, author, category document types

src/components/
  Navbar/, Footer/, PostCard/, ShareButtons/
```

## Content model (Sanity)

- **post** — title, slug, author, category, coverImage, publishedAt, readingTime, excerpt, body (Portable Text), tags
- **author** — name, slug, image, bio
- **category** — title, slug, description

GROQ queries live in `src/lib/queries.ts`. Extend queries there when adding fields.

## Design conventions

- Editorial, calm aesthetic: cream/blush/espresso palette (see `src/app/page.module.css` tokens)
- Homepage max-width: `1200px` on `.page`
- Use existing CSS module patterns; match naming in sibling files
- Prefer `Link` from `next/link` for internal navigation
- Use `next/image` for images; remote Sanity images allowed via `cdn.sanity.io` in `next.config.ts`

## Coding guidelines

- Keep changes focused and minimal — match existing style
- Server Components by default; add `"use client"` only when needed
- Blog pages are async server components fetching from `client.fetch()`
- Post slugs use `generateStaticParams` in `blog/[slug]/page.tsx`
- Portable Text rendering is customized in `portableTextComponents` on the post page

## Common tasks

| Task | Where to look |
|------|----------------|
| Change homepage layout | `src/app/page.tsx`, `page.module.css` |
| Change blog listing | `src/app/blog/page.tsx`, `blog.module.css` |
| Add post field | `src/sanity/schemas/post-schema.ts` → `queries.ts` → `types.ts` → page components |
| Fix images not loading | `next.config.ts` remotePatterns, GROQ `coverImage` projection |
| Newsletter | `src/app/api/subscribe/route.ts`, footer/home forms |

## Do not

- Commit `.env.local` or API keys
- Reintroduce `mockPosts` as the primary data source
- Add Tailwind or a new CSS framework without being asked
- Run destructive git commands unless explicitly requested
