"use client";

import { useEffect, useRef } from "react";

import { useConsent } from "@/components/analytics/consent";
import { trackLead } from "@/lib/meta-pixel";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

type LeadPayload = {
  enquiry_id?: string;
  tank_type?: string;
  form_source?: string;
};

/**
 * One-time lead-conversion signal.
 *
 * Reads the non-PII payload stashed by the quote form on a *confirmed* success
 * ({ ok: true } with a server enquiry id), then:
 *   1. pushes a single `generate_lead` dataLayer event (internal / future-GTM
 *      signal; emits no network request on its own), and
 *   2. fires the Meta standard `Lead` once consent is granted, keyed by the
 *      enquiry id (eventID) for de-duplication.
 *
 * The payload is consumed immediately so a refresh, bookmark, back-button or
 * direct visit to /thank-you can never fire a second conversion, and React
 * StrictMode's dev double-invoke can't double-count. The same single signal
 * drives both outputs — there is no separate page-view-based counter. No name,
 * email, phone or requirements text is ever included.
 */
export default function LeadConversion() {
  const { consent, ready } = useConsent();
  const consumed = useRef(false);
  const payloadRef = useRef<LeadPayload | null>(null);
  const leadFired = useRef(false);

  // Consume the one-time payload and push the internal dataLayer event.
  useEffect(() => {
    if (consumed.current) return;
    consumed.current = true;

    let payload: LeadPayload | null = null;
    try {
      const raw = sessionStorage.getItem("pipeco_lead");
      if (!raw) return;
      sessionStorage.removeItem("pipeco_lead"); // consume once, immediately
      payload = JSON.parse(raw);
    } catch {
      return;
    }
    if (!payload || !payload.enquiry_id) return;

    payloadRef.current = payload;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "generate_lead",
      enquiry_id: payload.enquiry_id,
      tank_type: payload.tank_type ?? null,
      form_source: payload.form_source ?? null,
    });
  }, []);

  // Fire the Meta Lead once the consent choice is known and granted. Runs
  // separately so it isn't skipped by the consent state resolving a tick later,
  // and so accepting on the banner here still counts the conversion.
  useEffect(() => {
    if (!ready || leadFired.current) return;
    const payload = payloadRef.current;
    if (!payload || !payload.enquiry_id) return;
    if (consent !== "granted") return;

    leadFired.current = true;
    trackLead(payload.enquiry_id);
  }, [ready, consent]);

  return null;
}
