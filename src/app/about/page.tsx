import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

const VALUES = [
  {
    num: "01",
    title: "Honesty over performance",
    desc: "Real stories, not highlight reels. The messy parts included.",
  },
  {
    num: "02",
    title: "Gentleness over hustle",
    desc: "Growth doesn't have to be brutal. We can move at our own pace.",
  },
  {
    num: "03",
    title: "Boundaries as love",
    desc: "Saying no is an act of respect — for yourself and for others.",
  },
];

const PILLARS = [
  {
    title: "Boundaries",
    desc: "Practical and emotional tools for drawing lines — with love, without guilt, and without a five-paragraph explanation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    dark: false,
  },
  {
    title: "People pleasing",
    desc: "Unpacking why we do it, where it comes from, and the gentle work of breaking patterns that no longer serve us.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    dark: false,
  },
  {
    title: "Self-worth",
    desc: "Letters on learning to believe you are enough — not when you've done more, achieved more, or shrunk yourself enough.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    dark: true,
  },
  {
    title: "Relationships",
    desc: "Navigating the people we love while learning that their comfort doesn't have to come at the cost of our own.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    dark: false,
  },
  {
    title: "Mindset",
    desc: "Reframing the thoughts that keep us stuck — the overthinking, the guilt spirals, the inner voice that says we're too much.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    dark: false,
  },
  {
    title: "Rest & hustle",
    desc: "Saying no to busyness as a badge of honour. Rest is not laziness — it's the most radical boundary you can set.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    dark: false,
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>

        {/* Left */}
        <div className={styles.heroLeft}>
          <span className={styles.eyebrow}>About Beryl</span>
          <h1 className={styles.heroTitle}>
            Hi, I&apos;m Beryl.<br />
            I used to say <em>yes</em><br />
            to everything.
          </h1>
          <p className={styles.heroBody}>
            And I was exhausted. Not the kind of tired that sleep fixes —
            the kind that comes from spending years being everything to everyone
            while quietly disappearing from your own life.
          </p>
          <p className={styles.heroBody}>
            <strong>Safe to Say No</strong> is the space I wish had existed
            when I was learning that my no was not a betrayal. It&apos;s a
            collection of honest letters, gentle reflections, and practical
            tools for people who give a lot — and are finally ready to give a
            little back to themselves.
          </p>
          <span className={styles.heroSig}>— Beryl</span>
        </div>

        {/* Right — photo panel */}
        <div className={styles.heroRight}>
          <div className={styles.heroOrbs} aria-hidden="true">
            <div className={styles.orbA} />
            <div className={styles.orbB} />
            <div className={styles.orbC} />
          </div>

          <div className={styles.photoCard}>
            <Image src="/images/about_beryl.jpeg" alt="Beryl" width={500} height={600} className={styles.photoImg} priority />
            <div className={styles.namePlate}>
              <span className={styles.plateName}>Beryl</span>
              <span className={styles.plateRole}>
                Writer · boundary enthusiast · recovering people pleaser
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY + VALUES ── */}
      <section className={styles.storySection}>

        {/* Story */}
        <div className={styles.storyLeft}>
          <span className={styles.sectionLabel}>My story</span>
          <h2 className={styles.sectionTitle}>
            Where this all <em>began</em>
          </h2>
          <p className={styles.storyP}>
            I spent most of my twenties being the person everyone could count
            on. The friend who showed up. The colleague who stayed late. The
            daughter who never caused trouble. I thought that was just who I
            was.
          </p>
          <p className={styles.storyP}>
            It wasn&apos;t until I completely burned out — quietly, slowly,
            invisibly — that I started asking the question I&apos;d been too
            afraid to ask: <strong>what do I actually want?</strong>
          </p>
          <p className={styles.storyP}>
            The answer surprised me. I didn&apos;t want to stop caring. I just
            wanted to stop abandoning myself in the process. That&apos;s the
            difference between kindness and self-erasure. And learning that
            difference changed everything.
          </p>
          <p className={styles.storyP}>
            This blog is me sharing that unlearning. The messy, non-linear,
            sometimes funny process of choosing yourself — without becoming
            someone you don&apos;t recognise.
          </p>
        </div>

        {/* Values */}
        <div className={styles.storyRight}>
          <blockquote className={styles.quoteLarge}>
            &ldquo;You can be a warm, generous, deeply loving person and still
            have limits. Those two things are not in conflict.&rdquo;
          </blockquote>
          <span className={styles.quoteAttr}>— Beryl, safetosayno.com</span>

          <div className={styles.valuesList}>
            {VALUES.map((v) => (
              <div key={v.num} className={styles.valueItem}>
                <span className={styles.valueNum}>{v.num}</span>
                <div>
                  <span className={styles.valueTitle}>{v.title}</span>
                  <span className={styles.valueDesc}>{v.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL FIND ── */}
      <section className={styles.findSection}>
        <div className={styles.findHeader}>
          <div>
            <span className={styles.sectionLabel}>What lives here</span>
            <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>
              What you&apos;ll find on the blog
            </h2>
          </div>
          <Link href="/blog" className={styles.findCta}>
            Browse all posts →
          </Link>
        </div>

        <div className={styles.pillarsGrid}>
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className={`${styles.pillarCard} ${p.dark ? styles.pillarCardDark : ""}`}
            >
              <div className={styles.pillarIconWrap}>{p.icon}</div>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── YOUTUBE ── */}
      <section className={styles.ytSection}>

        <div className={styles.ytLeft}>
          <span className={styles.sectionLabel}>Also on YouTube</span>
          <h2 className={styles.sectionTitle}>
            The same conversations,<br />on <em>video</em>
          </h2>
          <p className={styles.storyP}>
            If you prefer watching to reading, the YouTube channel is an
            extension of this space — same honesty, same warmth, just with a
            camera involved. Videos on boundaries, people pleasing, and the
            everyday work of choosing yourself.
          </p>
          <p className={styles.storyP}>
            New videos drop alongside new posts. Subscribe so you don&apos;t
            miss one.
          </p>
          <a
            href="https://youtube.com/@safetosayno"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ytLink}
          >
            Watch on YouTube →
          </a>
        </div>

        <div className={styles.ytRight}>
          <div className={styles.ytStat}>
            <span className={styles.ytStatNum}>@safetosayno</span>
            <span className={styles.ytStatLabel}>YouTube channel</span>
          </div>

          {/* Swap for a real video thumbnail when ready */}
          <div className={styles.ytThumb}>
            <div className={styles.ytThumbBg} />
            <div className={styles.ytPlay}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style={{ marginLeft: "3px" }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span className={styles.ytThumbLabel}>Latest video</span>
          </div>

          <p className={styles.ytBody}>
            &ldquo;Why you feel guilty after saying no — and what that guilt is
            really telling you.&rdquo;
          </p>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className={styles.ctaBand}>
        <span className={styles.ctaEyebrow}>Ready to begin?</span>
        <h2 className={styles.ctaTitle}>
          Your no is <em>waiting</em> for you.
        </h2>
        <p className={styles.ctaSub}>
          Start with the blog, grab the free guide, or just sit here for a
          moment. You&apos;re already in the right place.
        </p>
        <div className={styles.ctaActions}>
          <Link href="/blog" className={styles.btnPrimary}>
            Read the blog
          </Link>
          <Link href="/free-guide" className={styles.btnGhost}>
            Get the free guide
          </Link>
        </div>
      </section>

    </main>
  );
}
