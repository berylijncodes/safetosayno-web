import styles from "./Footer.module.css";
import Link from "next/link";

const SOCIAL_LINKS = [
  {
    label: "YouTube",
    href: "https://youtube.com/@safetosayno",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/safetosayno",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
] as const;

export default function Footer({ hideNewsletter = false }: { hideNewsletter?: boolean }) {
  return (
      <footer id="newsletter" className={styles.footer}>
        <div className={styles.footerTop}>
          <div>
            <span className={styles.footerLogo}>safe to say no</span>
            <p className={styles.footerTagline}>
              A gentle corner of the internet for people learning that their no
              is enough — just as it is.
            </p>
            {!hideNewsletter && (
              <form className={styles.subscribeForm}>
                <input
                  className={styles.subscribeInput}
                  type="email"
                  placeholder="your@email.com"
                />
                <button className={styles.subscribeBtn} type="submit">
                  Join
                </button>
              </form>
            )}
          </div>

          <div>
            <p className={styles.footerColTitle}>Navigate</p>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Beryl</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/free-guide">Free guide</Link></li>
            </ul>
          </div>

          <div>
            <p className={styles.footerColTitle}>Topics</p>
            <ul className={styles.footerLinks}>
              <li><Link href="/blog">Boundaries</Link></li>
              <li><Link href="/blog">Overthinking</Link></li>
              <li><Link href="/blog">Self-worth</Link></li>
              <li><Link href="/blog">Relationships</Link></li>
              <li><Link href="/blog">Mindset</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} safetosayno.com · All rights reserved</span>
          <div className={styles.socialRow}>
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                className={styles.socialDot}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>)  
      // return (
  //   <footer className={styles.footer}>
  //     <div className={styles.overlay} />

  //     <div className={styles.content}>
  //       <h2 className={styles.title}>Safe To Say No</h2>

  //       <p className={styles.text}>
  //         A quiet space for reflection, boundaries, and choosing yourself.
  //       </p>

  //       <p className={styles.copy}>
  //         © {new Date().getFullYear()} SafeToSayNo
  //       </p>
  //     </div>
  //   </footer>
  // );
}

    
