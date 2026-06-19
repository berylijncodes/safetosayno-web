"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const HIDE_NEWSLETTER_ROUTES = ["/free-guide"];

export default function FooterWrapper() {
  const pathname = usePathname();
  const hideNewsletter = HIDE_NEWSLETTER_ROUTES.includes(pathname);
  return <Footer hideNewsletter={hideNewsletter} />;
}
