# Safe to Say No

A blog and content site on boundaries, self-worth and saying no without guilt. I designed it, built it and run it.

**Live:** [safetosayno.com](https://safetosayno.com)

## Features

- Blog with individual post pages, categories and authors, with content managed in Sanity
- Embedded Sanity Studio at `/studio` for writing and publishing without touching code
- Email signup that subscribes visitors through the Kit API, using a Next.js API route
- Free guide landing page, an About page, and share buttons on posts
- Custom design system built with CSS Modules (no UI library)

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Sanity CMS (`next-sanity`, Portable Text) · CSS Modules · Kit · Vercel

## Run it locally

```bash
npm install
npm run dev
```

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
KIT_API_KEY=your-kit-api-key
KIT_FORM_ID=your-kit-form-id
```

The site runs at http://localhost:3000 and the Studio at http://localhost:3000/studio.

## Project structure

- `src/app`: pages and the `/api/subscribe` route
- `src/components`: Navbar, Footer, PostCard, ShareButtons
- `src/sanity`: content schemas for posts, categories and authors
- `src/lib`: Sanity client, queries and types
