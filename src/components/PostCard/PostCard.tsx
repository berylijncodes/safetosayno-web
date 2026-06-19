import Image from "next/image";
import Link from "next/link";
import styles from "./PostCard.module.css";
import type { Post } from "@/lib/mockPosts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className={styles.card}>
      <Link className={styles.link} href={`/blog/${post.slug}`}>
        <div className={styles.media}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className={styles.img}
            sizes="(max-width: 900px) 100vw, 360px"
          />
        </div>

        <div className={styles.body}>
          <div className={styles.meta}>
            <span>{new Date(post.publishedAt).toDateString()}</span>
            <span className={styles.dot}>•</span>
            <span>{post.readingTime}</span>
          </div>

          <h3 className={styles.title}>{post.title}</h3>
          {/* <p className={styles.excerpt}>{post.excerpt}</p> */}
        </div>
      </Link>
    </article>
  );
}
