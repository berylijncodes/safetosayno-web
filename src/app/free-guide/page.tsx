"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./free-guide.module.css";

// ─────────────────────────────────────────
// GUIDE PREVIEW ITEMS
// ─────────────────────────────────────────
const PREVIEW_ITEMS = [
  {
    num: "01",
    title: "The Giving Scale questionnaire",
    desc: "Find out exactly where you are across six areas of your life",
  },
  {
    num: "02",
    title: "Seeing yourself clearly",
    desc: "Recognise the pattern — at home, at work, in your relationships",
  },
  {
    num: "03",
    title: "Small, quiet steps back",
    desc: "Practical exercises and reflection prompts at your own pace",
  },
  {
    num: "04",
    title: "Staying — accountability to self",
    desc: "How to keep choosing yourself when old patterns pull back",
  },
];

// ─────────────────────────────────────────
// PROMISES
// ─────────────────────────────────────────
const PROMISES = [
  {
    num: "01",
    title: "The Giving Scale questionnaire",
    desc: "A short, honest self-assessment across six areas of your life. Answer truthfully and find out exactly where you are. No judgment. Just clarity.",
    dark: false,
  },
  {
    num: "02",
    title: "The guide: From Exhausted to Enough",
    desc: "Twelve pages for the person who is aware something is off but doesn't know how to change it. Four gentle chapters. Exercises. A realistic path back to yourself.",
    dark: true,
  },
  {
    num: "03",
    title: "A starting point, not a pressure point",
    desc: "No programme. No deadlines. No daily check-ins. A quiet resource you return to at your own pace. No performance required — just honesty.",
    dark: false,
  },
];

// ─────────────────────────────────────────
// FOR LIST
// ─────────────────────────────────────────
const FOR_LIST = [
  "You say yes before you have finished deciding if you mean it.",
  "You feel genuinely happy when you help — and genuinely empty when no one helps back.",
  "You have lent time, money, or energy and quietly absorbed the loss when it wasn't returned.",
  "You know something needs to change but you are afraid of becoming someone you don't recognise.",
  "You are tired in a way that is hard to explain — not just physically, but somewhere deeper.",
  "You have never quite managed to put yourself on the list of people worth taking care of.",
];

// ─────────────────────────────────────────
// SUBSCRIBE FORM — reusable
// ─────────────────────────────────────────
function SubscribeForm({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Something went wrong");

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.successMsg}>
        <span className={styles.successIcon}>✓</span>
        <div>
          <p className={variant === "dark" ? styles.successTitleDark : styles.successTitle}>
            It&apos;s on its way!
          </p>
          <p className={variant === "dark" ? styles.successSubDark : styles.successSub}>
            Check your inbox — your guide is heading to you now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <div className={variant === "dark" ? styles.formRowDark : styles.formRow}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={variant === "dark" ? styles.inputDark : styles.input}
          disabled={status === "loading"}
        />
        <button
          type="submit"
          className={styles.formBtn}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : variant === "dark" ? "I am ready →" : "Send me the guide →"}
        </button>
      </div>
      {errorMsg && (
        <p className={styles.errorMsg}>{errorMsg}</p>
      )}
      <span className={variant === "dark" ? styles.microDark : styles.micro}>
        Free. No spam. Unsubscribe whenever you like.
      </span>
    </form>
  );
}

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────
export default function FreeGuidePage() {
  return (
    <main className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>

        {/* Left */}
        <div className={styles.heroLeft}>
          <span className={styles.eyebrow}>Free guide + self-assessment</span>
          <h1 className={styles.heroTitle}>
            You have been there<br />
            for <em>everyone.</em><br />
            This is for you.
          </h1>
          <p className={styles.heroSub}>
            A free self-assessment and gentle guide for the person who gives
            freely, carries quietly, and is finally ready to also show up for
            herself.
          </p>

          <div className={styles.formWrap}>
            <span className={styles.formLabel}>
              Enter your email to get instant access
            </span>
            <SubscribeForm variant="light" />
          </div>
        </div>

        {/* Right — guide preview card */}
        <div className={styles.heroRight}>
          <div className={styles.orb1} aria-hidden="true" />
          <div className={styles.orb2} aria-hidden="true" />

          <div className={styles.guideCard}>
            <span className={styles.cardLabel}>Inside the guide</span>
            <h2 className={styles.cardTitle}>
              From Exhausted<br />to Enough
            </h2>
            <p className={styles.cardSubtitle}>
              A gentle guide for the person who gives everything and keeps
              nothing for herself
            </p>
            <div className={styles.cardDivider} />
            <div className={styles.cardContents}>
              {PREVIEW_ITEMS.map((item) => (
                <div key={item.num} className={styles.cardItem}>
                  <span className={styles.cardNum}>{item.num}</span>
                  <div>
                    <span className={styles.cardItemTitle}>{item.title}</span>
                    <span className={styles.cardItemDesc}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.cardPages}>
                12 pages · 4 chapters · reflection exercises
              </span>
              <span className={styles.cardFree}>Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className={styles.whatSection}>
        <span className={styles.sectionEyebrow}>What is waiting for you</span>
        <h2 className={styles.sectionTitle}>
          Here is what you <em>get</em>
        </h2>
        <div className={styles.promisesGrid}>
          {PROMISES.map((p) => (
            <div
              key={p.num}
              className={`${styles.promiseCard} ${p.dark ? styles.promiseCardDark : ""}`}
            >
              <span className={styles.promiseNum}>{p.num}</span>
              <h3 className={styles.promiseTitle}>{p.title}</h3>
              <p className={styles.promiseDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO THIS IS FOR + BERYL QUOTE ── */}
      <section className={styles.forSection}>

        {/* For list */}
        <div className={styles.forLeft}>
          <h2 className={styles.forTitle}>
            This is <em>for you</em> if —
          </h2>
          <div className={styles.forList}>
            {FOR_LIST.map((item, i) => (
              <div key={i} className={styles.forItem}>
                <div className={styles.forDot} aria-hidden="true" />
                <span className={styles.forText}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Beryl quote */}
        <div className={styles.forRight}>
          <div className={styles.berylQuote}>
            <span className={styles.bqLabel}>A word from Beryl</span>
            <p className={styles.bqText}>
              &ldquo;I know what it is like to give until there is nothing left
              and then give a little more. This guide is what I wish someone had
              put in my hands on one of those days. It will not fix everything.
              But it will help you see yourself clearly — probably for the first
              time in a long time. And seeing clearly is always where change
              begins.&rdquo;
            </p>
          </div>
          <div className={styles.berylRow}>
            <div className={styles.berylAvatar}>B</div>
            <div>
              <span className={styles.berylName}>Beryl</span>
              <span className={styles.berylSite}>safetosayno.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className={styles.finalCta}>
        <span className={styles.ctaEyebrow}>
          You have given enough to everyone else
        </span>
        <h2 className={styles.ctaTitle}>
          Give yourself <em>this one thing.</em>
        </h2>
        <p className={styles.ctaSub}>
          Free. No spam. Just a guide that was written entirely for you —
          the person who is always there for everyone else.
        </p>
        <SubscribeForm variant="dark" />
      </section>

    </main>
  );
}
