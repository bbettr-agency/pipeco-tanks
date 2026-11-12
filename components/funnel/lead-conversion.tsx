"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * One-time lead-conversion signal.
 *
 * Reads the non-PII payload stashed by the quote form on a *confirmed* success
 * ({ ok: true } with a server enquiry id), pushes a single `generate_lead`
 * dataLayer event, and removes the payload so a refresh, bookmark, back-button
 * or direct visit to /thank-you can never fire a second conversion. Removing
 * the payload before pushing also neutralises React StrictMode's dev
 * double-invoke. No analytics/ads libraries are loaded here — only the
 * dataLayer array, ready for a future GTM container.
 *
 * No name, email, phone or requirements text is ever included.
 */
export default function LeadConversion() {
  useEffect(() => {
    let payload: {
      enquiry_id?: string;
      tank_type?: string;
      form_source?: string;
    } | null = null;

    try {
      const raw = sessionStorage.getItem("pipeco_lead");
      if (!raw) return;
      sessionStorage.removeItem("pipeco_lead"); // consume once, immediately
      payload = JSON.parse(raw);
    } catch {
      return;
    }

    // Only a server-confirmed submission carries an enquiry id; without one
    // (e.g. a honeypot accept, a manual visit) no conversion is counted.
    if (!payload || !payload.enquiry_id) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "generate_lead",
      enquiry_id: payload.enquiry_id,
      tank_type: payload.tank_type ?? null,
      form_source: payload.form_source ?? null,
    });
  }, []);

  return null;
}
