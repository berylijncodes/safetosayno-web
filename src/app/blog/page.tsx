import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity"
import { allPostsQuery } from "@/lib/queries"
import type { BlogPostListItem } from "@/lib/types"
import styles from "./blog.module.css";

const POSTS_PER_PAGE = 7;
const CATEGORIES = ["All", "Boundaries", "People pleasing", "Mindset", "Relationships", "Self-worth"];

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = await client.fetch<BlogPostListItem[]>(allPostsQuery)
  const { page, category } = await searchParams;
  const currentPage = Number(page ?? 1);
  const activeCategory = category ?? "All";

  const normalize = (s: string) => s.toLowerCase().replace(/[\s-]/g, "");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) =>
          normalize(p.category ?? "") === normalize(activeCategory)
        );

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginated = filtered.slice(start, start + POSTS_PER_PAGE);
  const [heroPost, ...listPosts] = paginated;

  const popular = [...posts].slice(0, 4);

  return (
    <main className={styles.page}>

      {/* ── PAGE HEADER ── */}
      <div className={styles.pageHeader}>
        <span className={styles.eyebrow}>All posts</span>
        <h1 className={styles.pageTitle}>
          The <em>blog</em>
        </h1>
        <p className={styles.pageSub}>
          Gentle reads on boundaries, self-worth, and the quiet art of choosing
          yourself — without the guilt.
        </p>
      </div>

      {/* ── FILTER BAR ── */}
      <div className={styles.filterBar}>
        <div className={styles.filterTags}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${cat}`}
              className={`${styles.tag} ${activeCategory === cat ? styles.tagActive : ""}`}
            >
              {cat}
            </Link>
          ))}
        </div>
        <span className={styles.postCount}>{filtered.length} posts</span>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className={styles.blogLayout}>

        {/* Posts area */}
        <div className={styles.postsArea}>

          {/* Empty state */}
          {!heroPost && (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Nothing here yet.</p>
              <p className={styles.emptySub}>More posts on this topic are on their way.</p>
              <Link href="/blog" className={styles.emptyLink}>Browse all posts →</Link>
            </div>
          )}

          {/* Hero post — first on page */}
          {heroPost && (
            <Link href={`/blog/${heroPost.slug}`} className={styles.postHero}>
              <div className={styles.heroImg}>
                {heroPost.coverImage ? (
                  <Image
                    src={heroPost.coverImage}
                    alt={heroPost.title}
                    fill
                    className={styles.heroImgFile}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className={styles.heroImgFallback} />
                )}
                <span className={styles.imgBadge}>
                  {heroPost.category ?? "Read"}
                </span>
              </div>
              <div className={styles.heroBody}>
                <span className={styles.postCat}>Latest post</span>
                <h2 className={styles.heroTitle}>{heroPost.title}</h2>
                <p className={styles.heroExcerpt}>{heroPost.excerpt}</p>
                <div className={styles.postFoot}>
                  <span className={styles.postDate}>
                    {new Date(heroPost.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {heroPost.readingTime}
                  </span>
                  <span className={styles.readLink}>Read →</span>
                </div>
              </div>
            </Link>
          )}

          {/* Post list */}
          <div className={styles.postsList}>
            {listPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={styles.postRow}
              >
                <div className={styles.rowThumb}>
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className={styles.heroImgFile}
                      sizes="96px"
                    />
                  ) : (
                    <div className={styles.rowThumbFallback} />
                  )}
                </div>
                <div className={styles.rowBody}>
                  <span className={styles.rowCat}>
                    {post.category ?? "Read"}
                  </span>
                  <span className={styles.rowTitle}>{post.title}</span>
                  <span className={styles.rowMeta}>
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {post.readingTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Blog pages">
              {currentPage > 1 && (
                <Link
                  href={`/blog?page=${currentPage - 1}&category=${activeCategory}`}
                  className={`${styles.pgBtn} ${styles.pgPill}`}
                >
                  ← Prev
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
                const show =
                  n === 1 ||
                  n === totalPages ||
                  Math.abs(n - currentPage) <= 1;
                const showDotsBefore =
                  n === totalPages && currentPage < totalPages - 2;
                const showDotsAfter =
                  n === 1 && currentPage > 3;

                if (!show) return null;

                return (
                  <span key={n} className={styles.pgGroup}>
                    {showDotsAfter && (
                      <span className={styles.pgDots}>···</span>
                    )}
                    <Link
                      href={`/blog?page=${n}&category=${activeCategory}`}
                      className={`${styles.pgBtn} ${n === currentPage ? styles.pgCurrent : ""}`}
                    >
                      {n}
                    </Link>
                    {showDotsBefore && (
                      <span className={styles.pgDots}>···</span>
                    )}
                  </span>
                );
              })}

              {currentPage < totalPages && (
                <Link
                  href={`/blog?page=${currentPage + 1}&category=${activeCategory}`}
                  className={`${styles.pgBtn} ${styles.pgPill}`}
                >
                  Next →
                </Link>
              )}
            </nav>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <aside className={styles.sidebar}>

          {/* Most read */}
          <div className={styles.sideBlock}>
            <span className={styles.sideLabel}>Most read</span>
            <div className={styles.popList}>
              {popular.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={styles.popItem}
                >
                  <span className={styles.popNum}>
                    0{i + 1}
                  </span>
                  <span className={styles.popTitle}>{post.title}</span>
                </Link>
              ))}
            </div>
          </div>

        </aside>
      </div>

    </main>
  );
}
