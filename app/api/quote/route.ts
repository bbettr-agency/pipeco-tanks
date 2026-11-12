import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  FIELD_LIMITS,
  HONEYPOT_FIELD,
  tankTypeValues,
  solutionTypeValues,
} from "@/config/quote-config";
import { createEnquiry, ghlConfigured } from "@/lib/ghl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort, in-memory rate limit. Resets per serverless instance, so it is a
// speed bump against bursts, not a hard guarantee — the honeypot and server-side
// validation do the heavier lifting.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, { count: number; start: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.start > RATE_WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  rec.count += 1;
  return rec.count > RATE_MAX;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim, collapse control chars, and cap length. */
function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Accept quietly without
  // forwarding, so the bot sees no error to adapt to.
  if (clean(raw?.[HONEYPOT_FIELD], 100)) {
    return NextResponse.json({ ok: true });
  }

  // Solution is optional context from a solution-page CTA. Only accept a known
  // value; anything else is dropped rather than forwarded.
  const solutionRaw = clean(raw?.solution, 60);
  const solution = solutionTypeValues.includes(solutionRaw) ? solutionRaw : "";

  const data = {
    name: clean(raw?.name, FIELD_LIMITS.name),
    email: clean(raw?.email, FIELD_LIMITS.email),
    phone: clean(raw?.phone, FIELD_LIMITS.phone),
    tankType: clean(raw?.tankType, 40),
    location: clean(raw?.location, FIELD_LIMITS.location),
    requirements: clean(raw?.requirements, FIELD_LIMITS.requirements),
    capacity: clean(raw?.capacity, FIELD_LIMITS.capacity),
    solution,
    consent: raw?.consent === true || raw?.consent === "true",
  };

  const fields: string[] = [];
  if (!data.name) fields.push("name");
  if (!EMAIL_RE.test(data.email)) fields.push("email");
  if (!data.phone) fields.push("phone");
  if (!tankTypeValues.includes(data.tankType)) fields.push("tankType");
  if (!data.location) fields.push("location");
  if (!data.requirements) fields.push("requirements");
  if (!data.consent) fields.push("consent");

  if (fields.length > 0) {
    return NextResponse.json(
      { error: "Please complete all required fields correctly.", fields },
      { status: 422 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429 }
    );
  }

  // Fail safe when the CRM token is not configured. Never pretend success and
  // never silently drop a genuine enquiry.
  if (!ghlConfigured()) {
    return NextResponse.json(
      {
        error:
          "Online enquiries aren’t switched on yet. Please email sales@pipecoza.com or WhatsApp us and we’ll respond right away.",
        code: "not_configured",
      },
      { status: 503 }
    );
  }

  try {
    const result = await createEnquiry({
      name: data.name,
      email: data.email,
      phone: data.phone,
      tankType: data.tankType,
      capacity: data.capacity,
      location: data.location,
      requirements: data.requirements,
      solution: data.solution,
      submittedAt: new Date().toISOString(),
    });

    // Only report success once the CRM confirms BOTH the contact and the
    // opportunity. No token or PII is ever logged.
    if (!result.ok) {
      console.error(`[quote] GHL ${result.stage} step failed (status ${result.status}).`);
      return NextResponse.json(
        {
          error:
            "We couldn’t send your enquiry just now. Please try again, or email / WhatsApp us.",
        },
        { status: 502 }
      );
    }

    // Genuine, server-confirmed submission: return a fresh non-PII enquiry id,
    // used only as a one-time conversion signal on the /thank-you page.
    return NextResponse.json({ ok: true, enquiryId: randomUUID() });
  } catch {
    // Network/timeout or unexpected error. Deliberately no PII logged.
    return NextResponse.json(
      {
        error:
          "We couldn’t send your enquiry just now. Please try again, or email / WhatsApp us.",
      },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
