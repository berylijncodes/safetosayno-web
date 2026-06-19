import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { client } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/queries";

export default async function HomePage() {
  const posts = await client.fetch(allPostsQuery);
  const [featured, ...rest] = posts;
  const latest = rest.slice(0, 4);

  return (
    <main className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        {/* Left */}
        <div className={styles.heroLeft}>
          <span className={styles.eyebrow}>A space for people pleasers &amp; overthinkers</span>
          <h1 className={styles.heroTitle}>
            You don&apos;t need<br />
            to <em>earn</em><br />
            your no.
          </h1>
          <p className={styles.heroDesc}>
            Gentle, honest reads on boundaries, self-worth, and the quiet
            courage it takes to choose yourself — without the guilt.
          </p>
          <div className={styles.heroActions}>
            <Link href="/blog" className={styles.btnPrimary}>Start reading</Link>
            <Link href="/about" className={styles.btnGhost}>My story</Link>
          </div>
        </div>

        {/* Right — blush orb panel with floating quote card */}
        <div className={styles.heroRight}>
          {/* Decorative blush circles */}
          <div className={styles.orb1} aria-hidden="true" />
          <div className={styles.orb2} aria-hidden="true" />

          {/* Floating quote card */}
          <div className={styles.quoteCard}>
            <span className={styles.quoteCardLabel}>Featured reflection</span>
            <p className={styles.quoteCardText}>
              &ldquo;The guilt you feel after saying no is just old programming
              — not the truth.&rdquo;
            </p>
            <div className={styles.quoteCardMeta}>
              <span className={styles.quoteAvatar}>B</span>
              <div className={styles.quoteAuthorBlock}>
                <span className={styles.quoteAuthor}>Beryl</span>
                <span className={styles.quoteSite}>safetosayno.com</span>
              </div>
              <span className={styles.quoteBar} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Curated reads</span>
          <h2 className={styles.sectionTitle}>Featured posts</h2>
        </div>

        <div className={styles.featuredGrid}>
          {/* Main card */}
          <article className={styles.featMainCard}>
            <div className={styles.featMainImg}>
              {featured.coverImage && (
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className={styles.featImg}
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              )}
              <span className={styles.featTag}>Featured</span>
            </div>
            <div className={styles.featMainBody}>
              <h3 className={styles.featTitle}>{featured.title}</h3>
              <p className={styles.featExcerpt}>{featured.excerpt}</p>
              <div className={styles.featFoot}>
                <span className={styles.featDate}>
                  {new Date(featured.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "long", year: "numeric",
                  })}{" "}
                  · {featured.readingTime}
                </span>
                <Link href={`/blog/${featured.slug}`} className={styles.readMore}>
                  Read →
                </Link>
              </div>
            </div>
          </article>

          {/* Side cards */}
          <div className={styles.featSide}>
            {latest.slice(0, 3).map((post: any) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.sideCard}>
                <div className={styles.sideImgWrap}>
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className={styles.featImg}
                      sizes="200px"
                    />
                  )}
                </div>
                <div className={styles.sideBody}>
                  <span className={styles.sideCat}>Read</span>
                  <h4 className={styles.sideTitle}>{post.title}</h4>
                  <span className={styles.sideDate}>{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT POSTS ── */}
      <section className={styles.recentsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Keep reading</span>
          <h2 className={styles.sectionTitle}>Recent posts</h2>
        </div>

        <div className={styles.recentsList}>
          {latest.map((post: any, i: number) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.recentItem}>
              <span className={styles.recentNum}>0{i + 1}</span>
              <div className={styles.recentThumb}>
                {post.coverImage && (
                  <Image src={post.coverImage} alt="" fill className={styles.featImg} sizes="80px" />
                )}
              </div>
              <div className={styles.recentBody}>
                <span className={styles.recentCat}>Read</span>
                <h4 className={styles.recentTitle}>{post.title}</h4>
                <p className={styles.recentExcerpt}>{post.excerpt}</p>
              </div>
              <span className={styles.recentDate}>
                {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </span>
            </Link>
          ))}
        </div>

        <div className={styles.viewAllRow}>
          <Link href="/blog" className={styles.btnGhost}>View all posts →</Link>
        </div>
      </section>
    </main>
  );
}
