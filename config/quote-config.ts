/**
 * Quote form configuration — shared by the client form and the server API route
 * so validation stays in sync.
 */

export const tankTypes = [
  { value: "grp", label: "GRP Sectional Water Tank" },
  { value: "pressed-steel", label: "Pressed Steel Sectional Water Tank" },
  { value: "stainless", label: "Pressed Stainless Steel Sectional Water Tank" },
  { value: "refuge", label: "Mining Refuge Chamber" },
  { value: "not-sure", label: "Not sure / Need advice" },
] as const;

export type TankTypeValue = (typeof tankTypes)[number]["value"];

export const tankTypeValues = tankTypes.map((t) => t.value) as string[];

export function tankTypeLabel(value: string): string {
  return tankTypes.find((t) => t.value === value)?.label ?? "";
}

/**
 * Solution context — carried from solution-page CTAs (e.g. /contact?solution=…).
 * A solution is NOT a tank type: it is the kind of project the enquiry is about,
 * recorded alongside the chosen tank type rather than in place of it.
 */
export const solutionTypes = [
  { value: "turnkey-installations", label: "Turnkey installation" },
  { value: "mining-refuge-chambers", label: "Mining refuge chamber" },
] as const;

export type SolutionTypeValue = (typeof solutionTypes)[number]["value"];

export const solutionTypeValues = solutionTypes.map((s) => s.value) as string[];

export function solutionLabel(value: string): string {
  return solutionTypes.find((s) => s.value === value)?.label ?? "";
}

/** Field length ceilings, enforced on both client and server. */
export const FIELD_LIMITS = {
  name: 120,
  email: 200,
  phone: 40,
  location: 200,
  requirements: 4000,
  capacity: 40,
} as const;

/** The env var that must hold the destination webhook URL (server-side only). */
export const WEBHOOK_ENV_VAR = "PIPECO_QUOTE_WEBHOOK_URL";

/** Name of the honeypot field (must stay empty for a genuine submission). */
export const HONEYPOT_FIELD = "company_website";
