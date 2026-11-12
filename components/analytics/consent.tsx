"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Lightweight, consent-aware gate for non-essential (advertising/analytics)
 * tracking. Nothing tracking-related loads until the visitor accepts; the
 * choice is remembered and can be changed from the footer "Cookie Preferences"
 * control. The site — including the quote form — works fully whether consent is
 * granted or declined.
 */
type ConsentState = "unset" | "granted" | "denied";

const STORAGE_KEY = "pipeco_consent";

type ConsentContextValue = {
  consent: ConsentState;
  /** True once the stored choice has been read on the client. */
  ready: boolean;
  grant: () => void;
  deny: () => void;
  reopen: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>("unset");
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    let stored: ConsentState = "unset";
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "granted" || v === "denied") stored = v;
    } catch {
      /* storage unavailable — treat as undecided */
    }
    setConsent(stored);
    setReady(true);
    setShowBanner(stored === "unset");
  }, []);

  const persist = useCallback((value: ConsentState) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* best-effort */
    }
    setConsent(value);
    setShowBanner(false);
  }, []);

  const grant = useCallback(() => persist("granted"), [persist]);
  const deny = useCallback(() => persist("denied"), [persist]);
  const reopen = useCallback(() => setShowBanner(true), []);

  const value = useMemo<ConsentContextValue>(
    () => ({ consent, ready, grant, deny, reopen }),
    [consent, ready, grant, deny, reopen]
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {ready && showBanner && (
        <ConsentBanner onAccept={grant} onReject={deny} />
      )}
    </ConsentContext.Provider>
  );
}

function ConsentBanner({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-forest-deepest/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl font-body text-sm leading-6 text-white/80">
          We use cookies to measure quotation enquiries and for advertising
          (including the Meta Pixel). These are only set if you accept — the site
          and the quote form work either way. See our{" "}
          <Link
            href="/privacy-policy"
            className="font-medium text-brass-light underline underline-offset-4 hover:text-white"
          >
            Privacy &amp; Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={onReject}
            className="rounded-[2px] border border-white/25 px-5 py-2.5 font-display text-sm font-semibold text-white transition-colors duration-200 ease-house hover:border-white/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-forest-deepest"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="rounded-[2px] bg-brass px-5 py-2.5 font-display text-sm font-semibold text-ink transition-colors duration-200 ease-house hover:bg-brass-dark hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-forest-deepest"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer control to re-open the consent choice. */
export function CookiePreferences({ className }: { className?: string }) {
  const { reopen } = useConsent();
  return (
    <button type="button" onClick={reopen} className={className}>
      Cookie Preferences
    </button>
  );
}
