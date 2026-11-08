import { imageSlots, type ImageSlot } from "./image-config";

/**
 * Selected installations shown on /projects.
 *
 * Captions describe only what is visibly shown (the turnkey stage) — no tank
 * material, duty, capacity, client or location is asserted, since those cannot
 * be verified from the photographs. `category` is used by the portfolio filter
 * and reflects the visible stage only.
 *
 * TO ADD A COMPLETED PROJECT LATER:
 *   1. Drop the photograph into /public/images/projects/completed-installations/
 *   2. Register it as a slot in config/image-config.ts
 *   3. Append an entry below with its category. The grid and filters update
 *      automatically. For a full project record with its own page, add a
 *      `verifiedProjects` entry (see below).
 */
export type ProjectCategory = "Civil works" | "Tank installations";

export type Project = {
  caption: string;
  descriptor: string;
  category: ProjectCategory;
  slot: ImageSlot;
};

export const projects: Project[] = [
  {
    caption: "Civil foundation works",
    descriptor: "Turnkey site works",
    category: "Civil works",
    slot: imageSlots.install1,
  },
  {
    caption: "Tank base and dwarf walls",
    descriptor: "Turnkey site works",
    category: "Civil works",
    slot: imageSlots.install2,
  },
  {
    caption: "Sectional tank installation",
    descriptor: "Supplied & installed",
    category: "Tank installations",
    slot: imageSlots.install3,
  },
];

/** Filter options — "All" plus the categories actually present. */
export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
] as const;

/**
 * Verified, named projects that have their own detail page at
 * /projects/[slug]. Intentionally empty: no project names, locations, clients
 * or capacities have been confirmed by PIPECO for publication yet. Add a record
 * here only once the client approves the details — the route and detail layout
 * are already built and will render automatically.
 */
export type VerifiedProject = {
  slug: string;
  title: string;
  summary: string;
  /** Neutral, confirmed facts only. */
  facts?: { label: string; value: string }[];
  /** Image slot ids (from image-config) for this project's gallery. */
  images: ImageSlot[];
};

export const verifiedProjects: VerifiedProject[] = [];
