/**
 * Meta Pixel — low-level helpers (client-side only).
 *
 * Consent is enforced by the callers (they read the consent state); these
 * helpers additionally refuse to do anything on a non-approved host, so a
 * localhost / dev / unrelated-preview build can never emit production events.
 * The Pixel is initialised at most once (idempotent load).
 */
import { analyticsConfig, isTrackingHost } from "@/config/analytics-config";

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

/** True only in the browser on an approved production tracking host. */
export function pixelAllowed(): boolean {
  return (
    typeof window !== "undefined" && isTrackingHost(window.location.hostname)
  );
}

/** Inject + initialise the Pixel exactly once. No-op off an approved host. */
export function loadPixel(): void {
  if (!pixelAllowed()) return;
  if (window.fbq) return; // already initialised

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
    else (fbq.queue as unknown[][]).push(args);
  } as FbqFn;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;

  window.fbq = fbq;
  window._fbq = window._fbq || fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", analyticsConfig.metaPixelId);
}

/** Standard PageView. Caller handles de-duplication. */
export function trackPageView(): void {
  if (!pixelAllowed() || !window.fbq) return;
  window.fbq("track", "PageView");
}

/**
 * Standard Lead. `eventID` is the non-PII enquiry id, which de-duplicates the
 * same submission across Pixel reloads (and a future Conversions API). No PII
 * is ever passed. Ensures the Pixel is loaded first so the event is never lost.
 */
export function trackLead(eventID: string): void {
  if (!pixelAllowed()) return;
  loadPixel();
  if (!window.fbq) return;
  window.fbq("track", "Lead", {}, { eventID });
}
