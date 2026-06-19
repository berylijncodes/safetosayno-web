import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity";
import { postBySlugQuery, relatedPostsQuery, allSlugsQuery } from "@/lib/queries";
import ShareButtons from "@/components/ShareButtons/ShareButtons";
import styles from "./post.module.css";

// ─────────────────────────────────────────
// STATIC PARAMS
// ─────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await client.fetch(allSlugsQuery);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

// ─────────────────────────────────────────
// PORTABLE TEXT COMPONENTS
// Maps Sanity block types to your CSS classes
// ─────────────────────────────────────────
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p>{children}</p>,
    h2: ({ children, value }: any) => (
      <h2 id={value._key} className={styles.bodyH2}>{children}</h2>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className={styles.blockquote}><p>{children}</p></blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className={styles.bodyUl}>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
  },
};

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });
  const related = await client.fetch(relatedPostsQuery, { slug });

  if (!post) return <main className={styles.page}><p>Post not found.</p></main>;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Build table of contents from h2 blocks in body
  const tableOfContents = (post.body ?? [])
    .filter((block: any) => block.style === "h2")
    .map((block: any) => ({
      id: block._key,
      label: block.children?.map((c: any) => c.text).join("") ?? "",
    }));

  return (
    <main className={styles.page}>

      {/* ── BREADCRUMB ── */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbCurrent}>{post.category}</span>
      </nav>

      {/* ── MAIN LAYOUT ── */}
      <div className={styles.postLayout}>

        {/* ── ARTICLE ── */}
        <article className={styles.article}>

          {/* Post header */}
          <header className={styles.postHeader}>
            <div className={styles.catRow}>
              <span className={styles.catBadge}>{post.category}</span>
              <span className={styles.readTime}>{post.readingTime}</span>
            </div>

            <h1 className={styles.postTitle}>{post.title}</h1>

            <p className={styles.postExcerpt}>{post.excerpt}</p>

            <div className={styles.authorRow}>
              <div className={styles.authorAvatar}>
                {post.author?.name?.[0] ?? "B"}
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{post.author?.name ?? "Beryl"}</span>
                <span className={styles.authorDate}>{formattedDate}</span>
              </div>
              <ShareButtons title={post.title} />
            </div>
          </header>

          {/* Cover image */}
          <div className={styles.coverWrap}>
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className={styles.coverImg}
                sizes="(max-width: 900px) 100vw, 70vw"
                priority
              />
            ) : (
              <div className={styles.coverFallback} />
            )}
          </div>

          {/* Body */}
          <div className={styles.postBody}>
            <PortableText value={post.body} components={portableTextComponents} />
          </div>

          {/* Tags */}
          {post.tags?.filter((tag: any) => typeof tag === "string").length > 0 && (
            <div className={styles.tagRow}>
              {post.tags.filter((tag: any) => typeof tag === "string").map((tag: string, i: number) => (
                <Link key={`${tag}-${i}`} href={`/blog?category=${tag}`} className={styles.tag}>
                  {tag}
                </Link>
              ))}
            </div>
          )}

        </article>

        {/* ── SIDEBAR ── */}
        <aside className={styles.sidebar}>

          {/* Table of contents */}
          {tableOfContents.length > 0 && (
            <div className={styles.sideBlock}>
              <span className={styles.sideLabel}>In this post</span>
              <ul className={styles.tocList}>
                {tableOfContents.map((item: { id: string; label: string }) => (
                  <li key={item.id} className={styles.tocItem}>
                    <a href={`#${item.id}`} className={styles.tocLink}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tableOfContents.length > 0 && <div className={styles.divider} />}

          {/* Keep reading */}
          {related.length > 0 && (
            <div className={styles.sideBlock}>
              <span className={styles.sideLabel}>Keep reading</span>
              <div className={styles.keepList}>
                {related.map((item: any, i: number) => (
                  <Link key={item.slug} href={`/blog/${item.slug}`} className={styles.keepItem}>
                    <span className={styles.keepNum}>0{i + 1}</span>
                    <span className={styles.keepTitle}>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className={styles.divider} />

          <Link href="/blog" className={styles.backLink}>
            ← Back to all posts
          </Link>

        </aside>
      </div>

      {/* ── MORE POSTS ── */}
      {related.length > 0 && (
        <section className={styles.morePosts}>
          <span className={styles.moreLabel}>You might also like</span>
          <h2 className={styles.moreTitle}>More from the blog</h2>
          <div className={styles.moreGrid}>
            {related.map((rp: any) => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} className={styles.moreCard}>
                <div className={styles.moreImg}>
                  {rp.coverImage ? (
                    <Image
                      src={rp.coverImage}
                      alt={rp.title}
                      fill
                      className={styles.coverImg}
                      sizes="(max-width: 600px) 100vw, 33vw"
                    />
                  ) : (
                    <div className={styles.moreFallback} />
                  )}
                </div>
                <span className={styles.moreCat}>{rp.category}</span>
                <span className={styles.moreCardTitle}>{rp.title}</span>
                <span className={styles.moreMeta}>
                  {new Date(rp.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {rp.readingTime}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}
