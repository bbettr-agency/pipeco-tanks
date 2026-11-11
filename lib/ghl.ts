/**
 * GoHighLevel client — server-side only.
 *
 * Turns a validated quote enquiry into a GHL contact + opportunity in the
 * "PIPECO — Quotation Enquiries" pipeline. Credentials come from the
 * PIPECO_GHL_TOKEN environment variable and are never logged or returned.
 *
 * Duplicate / stage safety:
 *  - Contact upsert dedupes on email/phone (location setting), so a repeat
 *    enquiry updates the same contact instead of creating a second one.
 *  - Opportunities are CREATED (not upserted). GHL blocks a duplicate
 *    opportunity for the same contact in the same pipeline (400
 *    OPPORTUNITY_NO_DUPLICATE, with the existing id in `meta.existingId`). On
 *    that response we reuse the existing opportunity WITHOUT modifying it — so a
 *    retry never creates a duplicate, a progressed opportunity is never reset to
 *    New Enquiry, and a separate active project is never overwritten.
 *
 * Success is only reported when BOTH the contact and the opportunity are
 * confirmed by the API — the caller must never show success otherwise.
 */

import { GHL } from "@/config/ghl-config";
import { tankTypeLabel, solutionLabel } from "@/config/quote-config";

const TIMEOUT_MS = 10_000;

export type QuoteEnquiry = {
  name: string;
  email: string;
  phone: string;
  tankType: string;
  capacity: string;
  location: string;
  requirements: string;
  solution: string;
  submittedAt: string; // ISO
};

export type GhlResult =
  | {
      ok: true;
      contactId: string;
      opportunityId: string;
      contactCreated: boolean;
      opportunityCreated: boolean;
    }
  | {
      ok: false;
      stage: "config" | "contact" | "opportunity";
      status: number;
      message: string;
    };

function getToken(): string | null {
  const t = process.env[GHL.tokenEnvVar];
  return t && t.trim() ? t.trim() : null;
}

/** Whether the server has a GHL token configured (no value is exposed). */
export function ghlConfigured(): boolean {
  return getToken() !== null;
}

type GhlResponse = { status: number; json: Record<string, unknown> };

function authHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Version: GHL.apiVersion,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function ghlFetch(
  token: string,
  method: "GET" | "POST",
  path: string,
  body?: unknown
): Promise<GhlResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${GHL.apiBase}${path}`, {
      method,
      headers: authHeaders(token),
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return { status: res.status, json };
  } finally {
    clearTimeout(timer);
  }
}

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { firstName: full.trim(), lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/** ISO → YYYY-MM-DD, or "" if unparseable. */
function toDateOnly(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

/** Extract a human-readable message from a GHL error body (string or array). */
function ghlMessage(json: Record<string, unknown>): string {
  const m = json?.message;
  if (typeof m === "string") return m;
  if (Array.isArray(m)) return m.join("; ");
  return "Unexpected response from CRM.";
}

function ok2xx(status: number): boolean {
  return status >= 200 && status < 300;
}

/** Fallback lookup: the contact's existing opportunity id in this pipeline. */
async function findOpportunityId(
  token: string,
  contactId: string
): Promise<string | null> {
  const params = new URLSearchParams({
    location_id: GHL.locationId,
    contact_id: contactId,
    pipeline_id: GHL.pipelineId,
    status: "all",
    limit: "1",
  });
  const r = await ghlFetch(token, "GET", `/opportunities/search?${params.toString()}`);
  if (!ok2xx(r.status)) return null;
  const opps = r.json?.opportunities as Array<{ id?: string }> | undefined;
  return opps && opps[0]?.id ? opps[0].id! : null;
}

export async function createEnquiry(data: QuoteEnquiry): Promise<GhlResult> {
  const token = getToken();
  if (!token) {
    return { ok: false, stage: "config", status: 0, message: "GHL token not configured." };
  }

  const { firstName, lastName } = splitName(data.name);
  const tankLabel = tankTypeLabel(data.tankType) || data.tankType;
  const originLabel = data.solution ? solutionLabel(data.solution) : tankLabel;

  // 1) Contact (create or update) with the seven mapped custom fields.
  const customFields = [
    { id: GHL.fields.tankTypeSolution, fieldValue: tankLabel },
    { id: GHL.fields.approximateCapacity, fieldValue: data.capacity },
    { id: GHL.fields.installationLocation, fieldValue: data.location },
    { id: GHL.fields.projectRequirements, fieldValue: data.requirements },
    { id: GHL.fields.enquirySource, fieldValue: "PIPECO Website" },
    { id: GHL.fields.productSolutionPage, fieldValue: originLabel },
    { id: GHL.fields.submissionDate, fieldValue: toDateOnly(data.submittedAt) },
  ].filter((f) => f.fieldValue !== "");

  const contactRes = await ghlFetch(token, "POST", "/contacts/upsert", {
    locationId: GHL.locationId,
    name: data.name,
    firstName,
    lastName,
    email: data.email,
    phone: data.phone,
    source: "PIPECO Website",
    customFields,
  });

  if (!ok2xx(contactRes.status)) {
    return {
      ok: false,
      stage: "contact",
      status: contactRes.status,
      message: ghlMessage(contactRes.json),
    };
  }

  const contact = contactRes.json?.contact as { id?: string } | undefined;
  const contactId = contact?.id;
  if (!contactId) {
    return { ok: false, stage: "contact", status: contactRes.status, message: "No contact id returned." };
  }
  const contactCreated = contactRes.json?.new === true;

  // 2) Create the opportunity in the "New Enquiry" stage, linked to the contact.
  const oppRes = await ghlFetch(token, "POST", "/opportunities/", {
    pipelineId: GHL.pipelineId,
    locationId: GHL.locationId,
    pipelineStageId: GHL.stages.newEnquiry,
    contactId,
    name: `PIPECO | ${data.name} | ${originLabel}`,
    status: "open",
    monetaryValue: 0,
  });

  if (ok2xx(oppRes.status)) {
    const opp = (oppRes.json?.opportunity ?? {}) as { id?: string };
    if (!opp.id) {
      return { ok: false, stage: "opportunity", status: oppRes.status, message: "No opportunity id returned." };
    }
    return { ok: true, contactId, opportunityId: opp.id, contactCreated, opportunityCreated: true };
  }

  // Duplicate guard: GHL refuses a second opportunity for this contact+pipeline.
  // Reuse the existing one untouched — no stage reset, no overwrite.
  if (oppRes.status === 400) {
    const meta = oppRes.json?.meta as { existingId?: string } | undefined;
    let existingId =
      meta?.existingId ||
      (typeof oppRes.json?.existingId === "string" ? (oppRes.json.existingId as string) : "");
    if (!existingId) existingId = (await findOpportunityId(token, contactId)) || "";
    if (existingId) {
      return { ok: true, contactId, opportunityId: existingId, contactCreated, opportunityCreated: false };
    }
  }

  return {
    ok: false,
    stage: "opportunity",
    status: oppRes.status,
    message: ghlMessage(oppRes.json),
  };
}
