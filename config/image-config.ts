/**
 * Centralised image registry.
 *
 * Every image on the site is driven from this one file. Until a real photograph
 * is supplied, a slot with `src: null` renders a labelled placeholder. To go
 * live with a photo, drop the file into the matching folder under
 * /public/images and set `src` on the slot — no component changes required.
 *
 * Folder convention (/public/images):
 *   homepage/hero              → hero background            (hero)
 *   homepage/capabilities      → engineering & installation (capabilities)
 *   homepage/industries        → industries imagery         (future)
 *   homepage/why-pipeco        → why-Pipeco imagery          (future)
 *   products/grp-tanks         → GRP product                (productGrp)
 *   products/pressed-steel-tanks     → pressed steel product (productSteel)
 *   products/stainless-steel-tanks   → stainless product     (productStainless)
 *   mining-refuge-chambers     → refuge chambers            (refuge)
 *   projects/completed-installations → project gallery       (install1–3)
 *   projects/installation-process    → installation process  (future)
 *   turnkey-solutions/{civil-foundations,elevated-steel-stands,tank-installations} (future)
 *   company/{facilities,team}  → about / company            (future)
 *
 * The official logo (/public/brand) is separate from this registry.
 */
export type ImageSlot = {
  /** Stable id referenced by the <Placeholder slot="…" /> component. */
  id: string;
  /** Dev-facing label shown inside the placeholder. */
  label: string;
  /** Final alt text (used for SEO/accessibility once the photo lands). */
  alt: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Keeps layout stable without a photo. */
  ratio: string;
  /** Real image path once supplied. Null = render the placeholder. */
  src: string | null;
};

export const imageSlots = {
  hero: {
    id: "hero",
    label: "HERO — INDUSTRIAL INSTALLATION IMAGE",
    alt: "Pipeco pressed steel sectional water tank installation in South Africa",
    ratio: "3 / 2",
    src: "/images/homepage/hero/hero.jpg",
  },
  productGrp: {
    id: "productGrp",
    label: "GRP SECTIONAL WATER TANK IMAGE",
    alt: "Pipeco GRP sectional water tank",
    ratio: "16 / 10",
    // → /public/images/products/grp-tanks/
    src: null,
  },
  productSteel: {
    id: "productSteel",
    label: "PRESSED STEEL WATER TANK IMAGE",
    alt: "Pipeco pressed steel sectional water tank",
    ratio: "4 / 3",
    // → /public/images/products/pressed-steel-tanks/
    src: null,
  },
  productStainless: {
    id: "productStainless",
    label: "STAINLESS STEEL WATER TANK IMAGE",
    alt: "Pipeco pressed stainless steel sectional water tank",
    ratio: "16 / 11",
    // → /public/images/products/stainless-steel-tanks/
    src: null,
  },
  capabilities: {
    id: "capabilities",
    label: "ENGINEERING & INSTALLATION IMAGE",
    alt: "Pipeco engineering and installation work on site",
    ratio: "4 / 5",
    // → /public/images/homepage/capabilities/
    src: null,
  },
  refuge: {
    id: "refuge",
    label: "MINING REFUGE CHAMBER IMAGE",
    alt: "Pipeco sectional steel mining refuge chamber",
    ratio: "4 / 5",
    // → /public/images/mining-refuge-chambers/
    src: null,
  },
  install1: {
    id: "install1",
    label: "INSTALLATION IMAGE 01",
    alt: "Pipeco sectional water tank installation",
    ratio: "4 / 3",
    // → /public/images/projects/completed-installations/
    src: null,
  },
  install2: {
    id: "install2",
    label: "INSTALLATION IMAGE 02",
    alt: "Pipeco sectional water tank installation",
    ratio: "1 / 1",
    // → /public/images/projects/completed-installations/
    src: null,
  },
  install3: {
    id: "install3",
    label: "INSTALLATION IMAGE 03",
    alt: "Pipeco sectional water tank installation",
    ratio: "1 / 1",
    // → /public/images/projects/completed-installations/
    src: null,
  },
} as const satisfies Record<string, ImageSlot>;

export type ImageSlotId = keyof typeof imageSlots;
