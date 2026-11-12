"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { loadPixel, trackPageView } from "@/lib/meta-pixel";
import { useConsent } from "./consent";

/**
 * Meta Pixel loader + PageView tracker for the App Router.
 *
 * - Loads/initialises the Pixel exactly once, and only after consent on an
 *   approved production host (the lib enforces the host check).
 * - Fires PageView on the initial load and on every client-side route change,
 *   de-duplicated by URL so a given URL is never counted twice in a row.
 * - Does not inject a second Pixel; coexists with a future GTM container (the
 *   funnel's generate_lead dataLayer event remains the shared signal).
 */
export default function MetaPixel() {
  const { consent } = useConsent();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  // Load + init once consent is granted.
  useEffect(() => {
    if (consent !== "granted") return;
    loadPixel();
  }, [consent]);

  // PageView on initial load + client-side navigation (dedup by URL).
  useEffect(() => {
    if (consent !== "granted") return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    if (lastTracked.current === url) return;
    lastTracked.current = url;
    trackPageView();
  }, [consent, pathname, searchParams]);

  return null;
}
