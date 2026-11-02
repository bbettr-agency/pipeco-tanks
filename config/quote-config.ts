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

/** Field length ceilings, enforced on both client and server. */
export const FIELD_LIMITS = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  location: 200,
  requirements: 4000,
  capacity: 40,
  application: 200,
} as const;

/** The env var that must hold the destination webhook URL (server-side only). */
export const WEBHOOK_ENV_VAR = "PIPECO_QUOTE_WEBHOOK_URL";

/** Name of the honeypot field (must stay empty for a genuine submission). */
export const HONEYPOT_FIELD = "company_website";
