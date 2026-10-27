import type { ImageSlotId } from "./image-config";

/**
 * Phase 2 homepage content.
 *
 * Copy is qualitative and category-accurate. No fabricated statistics,
 * certifications, client names, locations or capacity figures. Items that
 * should be confirmed by PIPECO before they carry more specific claims are
 * marked with a comment.
 */

/* A — Engineering & Installation Capabilities */
export const capabilities = [
  {
    index: "01",
    title: "Design & engineering",
    body: "Every tank is sized and specified for its load, duty and site conditions.",
  },
  {
    index: "02",
    title: "Manufacturing",
    body: "Modular sectional panels are built for a consistent, repeatable fit.",
  },
  {
    index: "03",
    title: "Installation",
    body: "Our teams assemble and commission each tank on site.",
  },
  {
    index: "04",
    title: "Aftercare",
    body: "Long-term support for the installation, including replacement panels.",
  },
] as const;

/* C — Industries & Applications.
   Mining is onboarding-verified. The remaining applications are standard uses
   of sectional water storage; PIPECO to confirm the final list and any
   sector-specific wording. */
export const applications = [
  {
    name: "Mining",
    note: "Bulk water storage and specialised underground refuge chambers for active sites.",
  },
  {
    name: "Municipal & bulk water",
    note: "Reservoirs and reticulation storage for towns and water schemes.",
  },
  {
    name: "Agriculture",
    note: "Irrigation reserves and livestock water storage.",
  },
  {
    name: "Commercial & industrial",
    note: "Process, cooling and wash-down water for plants and developments.",
  },
  {
    name: "Fire protection",
    note: "Dedicated fire-reserve storage, sized to requirement.",
  },
] as const;

/* D — Selected Installations.
   Neutral descriptors only — no real client names, logos, locations or project
   details until PIPECO confirms what may be published. */
export const installations: {
  title: string;
  descriptor: string;
  image: ImageSlotId;
}[] = [
  {
    title: "Sectional steel reservoir",
    descriptor: "Bulk water storage",
    image: "install1",
  },
  {
    title: "GRP panel tank",
    descriptor: "Potable water duty",
    image: "install2",
  },
  {
    title: "Stainless steel tank",
    descriptor: "Food-grade duty",
    image: "install3",
  },
];

/* E — Why PIPECO (genuine, verified differentiators). */
export const whyPoints = [
  {
    index: "01",
    title: "South African manufacturer",
    body: "Locally owned and operated, building sectional water storage for South African conditions.",
  },
  {
    index: "02",
    title: "A complete sectional range",
    body: "GRP, pressed steel and stainless steel systems – matched to water quality, environment and capacity.",
  },
  {
    index: "03",
    title: "Engineered and installed in-house",
    body: "From specification through to on-site commissioning, handled by our own teams.",
  },
  {
    index: "04",
    title: "Specialised refuge chambers",
    body: "Underground sectional-steel refuge chambers for the mining sector.",
  },
] as const;
