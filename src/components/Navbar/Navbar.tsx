"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          <span className={styles.logoMain}>safe to say no</span>
          <span className={styles.logoTag}>boundaries with grace</span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.navLinks}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={pathname === href ? styles.navLinkActive : styles.navLink}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/free-guide" className={styles.navCta}>
              Free guide
            </Link>
          </li>
        </ul>

        {/* Hamburger button */}
        <button
          className={styles.hamburger}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className={`${styles.bar} ${open ? styles.barTop : ""}`} />
          <span className={`${styles.bar} ${open ? styles.barMid : ""}`} />
          <span className={`${styles.bar} ${open ? styles.barBot : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`} aria-hidden={!open}>
        <button className={styles.drawerClose} onClick={() => setOpen(false)} aria-label="Close menu">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Close
        </button>
        <ul className={styles.drawerLinks}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={pathname === href ? styles.drawerLinkActive : styles.drawerLink}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/free-guide" className={styles.drawerCta} onClick={() => setOpen(false)}>
              Free guide
            </Link>
          </li>
        </ul>
      </div>

      {/* Backdrop */}
      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}
    </>
  );
}
