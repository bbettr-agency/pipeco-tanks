import { imageSlots, type ImageSlot } from "./image-config";

/**
 * Selected installations shown on /projects.
 *
 * Neutral, category-level descriptors only — no client names, locations,
 * capacities or dates are published until PIPECO confirms what may be shown.
 * The `caption`/`descriptor` here are descriptive placeholders pending that
 * confirmation.
 *
 * TO ADD A COMPLETED PROJECT LATER:
 *   1. Drop the photograph into /public/images/projects/completed-installations/
 *   2. Register it as a slot in config/image-config.ts
 *   3. Append an entry below. The gallery lays out automatically — the first
 *      entry becomes the full-width lead image and the rest flow into the grid.
 */
export type Project = {
  /** Short descriptive title (neutral until confirmed). */
  caption: string;
  /** One-line duty/descriptor (neutral until confirmed). */
  descriptor: string;
  slot: ImageSlot;
};

// Captions describe only what is visibly shown (the turnkey stage) — no tank
// material, duty, capacity, client or location is asserted, since those cannot
// be verified from the photographs. Replace with confirmed project details once
// PIPECO approves them for publication.
export const projects: Project[] = [
  {
    caption: "Civil foundation works",
    descriptor: "Turnkey site works",
    slot: imageSlots.install1,
  },
  {
    caption: "Tank base and dwarf walls",
    descriptor: "Turnkey site works",
    slot: imageSlots.install2,
  },
  {
    caption: "Sectional tank installation",
    descriptor: "Supplied & installed",
    slot: imageSlots.install3,
  },
];
