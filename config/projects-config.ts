/**
 * Selected installations shown on /projects.
 *
 * Each entry is a real photograph with a neutral caption describing only what is
 * visibly shown. `category` is used by the portfolio filter. A photo is placed
 * in a MATERIAL category (GRP / Pressed steel / Stainless steel) only when the
 * tank material is clearly supported by the photograph; anything where the
 * material cannot be verified goes under "Tank Installations" (a material-
 * agnostic stage), never guessed. No client, location, capacity or project
 * detail is asserted.
 *
 * Material classification notes:
 *   • GRP          — dimpled/pyramid GRP panels.
 *   • Pressed steel — X-embossed hot-dip galvanised steel panels.
 *   • Stainless     — no verified photograph supplied → empty state.
 *   • The supplied "stainless" image reads as a galvanised pressed-steel
 *     hydrant tank, so it is shown as a material-agnostic Tank Installation.
 */
export type ProjectCategory =
  | "GRP Sectional Tanks"
  | "Pressed Steel Tanks"
  | "Stainless Steel Tanks"
  | "Tank Installations";

export type Project = {
  caption: string;
  category: ProjectCategory;
  src: string;
  alt: string;
};

export const projects: Project[] = [
  /* ---- GRP Sectional Tanks (verified GRP panels) ---- */
  {
    caption: "GRP sectional tank installation",
    category: "GRP Sectional Tanks",
    src: "/images/projects/completed-installations/installation-3.png",
    alt: "Large Pipeco GRP sectional water tank installation",
  },
  {
    caption: "GRP sectional water tank",
    category: "GRP Sectional Tanks",
    src: "/images/products/grp-tanks/grp-tank-wide.jpeg",
    alt: "Pipeco GRP sectional water tank with level gauge",
  },
  {
    caption: "GRP tank on concrete plinth",
    category: "GRP Sectional Tanks",
    src: "/images/products/grp-tanks/grp-tank-plinth.jpeg",
    alt: "Pipeco GRP sectional water tank on a concrete plinth",
  },
  {
    caption: "GRP tank with pipework",
    category: "GRP Sectional Tanks",
    src: "/images/products/grp-tanks/eb0a38e3-ab4b-4266-b3f6-0b919d85b5b4.JPG",
    alt: "Pipeco GRP sectional water tank with connected pipework at sunset",
  },

  /* ---- Pressed Steel Tanks (verified galvanised X-panel steel) ---- */
  {
    caption: "Pressed steel sectional tank",
    category: "Pressed Steel Tanks",
    src: "/images/products/pressed-steel-tanks/image1.png",
    alt: "Pipeco pressed steel sectional water tank on a concrete plinth",
  },
  {
    caption: "Elevated pressed steel tank",
    category: "Pressed Steel Tanks",
    src: "/images/products/pressed-steel-tanks/image9.png",
    alt: "Pipeco pressed steel sectional water tank on an elevated steel stand",
  },
  {
    caption: "Pressed steel tank at dusk",
    category: "Pressed Steel Tanks",
    src: "/images/products/pressed-steel-tanks/image6.png",
    alt: "Pipeco pressed steel sectional water tank at sunset",
  },
  {
    caption: "Pressed steel tank installation",
    category: "Pressed Steel Tanks",
    src: "/images/products/pressed-steel-tanks/image10.png",
    alt: "Pipeco pressed steel sectional water tanks on concrete plinths",
  },

  /* ---- Tank Installations (material-agnostic civil / install stages) ---- */
  {
    caption: "Elevated tank installation",
    category: "Tank Installations",
    src: "/images/projects/completed-installations/install-elevated-crane.jpeg",
    alt: "Sectional water tank lifted onto an elevated steel tower by crane",
  },
  {
    caption: "Tank base assembly",
    category: "Tank Installations",
    src: "/images/projects/completed-installations/install-tank-base.jpeg",
    alt: "Sectional tank base panels assembled on a concrete plinth",
  },
  {
    caption: "Reservoir steelworks",
    category: "Tank Installations",
    src: "/images/projects/completed-installations/install-steelworks.jpeg",
    alt: "Structural steelworks for a sectional water reservoir",
  },
  {
    caption: "Reinforced foundations",
    category: "Tank Installations",
    src: "/images/projects/completed-installations/installation-1.jpeg",
    alt: "Reinforced concrete foundation works for a Pipeco installation",
  },
  {
    caption: "Civil foundation works",
    category: "Tank Installations",
    src: "/images/projects/completed-installations/install-foundations.jpeg",
    alt: "Concrete civil foundation works for a sectional water tank",
  },
  {
    caption: "Tank base and dwarf walls",
    category: "Tank Installations",
    src: "/images/projects/completed-installations/installation-2.jpeg",
    alt: "Concrete tank base and dwarf walls for a Pipeco installation",
  },
  {
    caption: "Fire-water (hydrant) tank",
    category: "Tank Installations",
    src: "/images/products/stainless-steel-tanks/stainless-steel-sectional-tank.jpeg",
    alt: "Installed sectional fire-water hydrant tank",
  },
];

/**
 * Fixed filter taxonomy (requested). All five are always shown; a category with
 * no verified entries (e.g. stainless steel) renders a professional empty state
 * rather than fabricated content.
 */
export const projectCategories = [
  "All",
  "GRP Sectional Tanks",
  "Pressed Steel Tanks",
  "Stainless Steel Tanks",
  "Tank Installations",
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
  /** Image paths for this project's gallery. */
  images: string[];
};

export const verifiedProjects: VerifiedProject[] = [];
