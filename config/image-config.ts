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
    src: "/images/products/grp-tanks/5fa7332b-245b-496c-9d83-b1d1a355d941.JPG",
  },
  productSteel: {
    id: "productSteel",
    label: "PRESSED STEEL WATER TANK IMAGE",
    alt: "Pipeco pressed steel sectional water tank",
    ratio: "4 / 3",
    // → /public/images/products/pressed-steel-tanks/
    src: "/images/products/pressed-steel-tanks/image2.png",
  },
  productStainless: {
    id: "productStainless",
    label: "STAINLESS STEEL WATER TANK IMAGE",
    alt: "Pipeco pressed stainless steel sectional water tank",
    ratio: "16 / 10",
    // → /public/images/products/stainless-steel-tanks/
    src: "/images/products/stainless-steel-tanks/stainless-steel-sectional-tank.jpeg",
  },
  capabilities: {
    id: "capabilities",
    label: "ENGINEERING & INSTALLATION IMAGE",
    alt: "Site preparation and civil foundation works for a Pipeco installation",
    ratio: "16 / 10",
    // → /public/images/homepage/capabilities/
    src: "/images/homepage/capabilities/turnkey-water-storage.jpeg",
  },
  refuge: {
    id: "refuge",
    label: "MINING REFUGE CHAMBER IMAGE",
    alt: "Pipeco sectional steel mining refuge chamber",
    ratio: "4 / 5",
    // → /public/images/mining-refuge-chambers/
    src: "/images/mining-refuge-chambers/mining-refuge-chamber.jpeg",
  },
  install1: {
    id: "install1",
    label: "INSTALLATION IMAGE 01",
    alt: "Completed Pipeco sectional water tank installation",
    ratio: "16 / 9",
    // → /public/images/projects/completed-installations/
    src: "/images/projects/completed-installations/installation-1.jpeg",
  },
  install2: {
    id: "install2",
    label: "INSTALLATION IMAGE 02",
    alt: "Completed Pipeco sectional water tank installation",
    ratio: "16 / 9",
    // → /public/images/projects/completed-installations/
    src: "/images/projects/completed-installations/installation-2.jpeg",
  },
  install3: {
    id: "install3",
    label: "INSTALLATION IMAGE 03",
    alt: "Completed Pipeco sectional water tank installation",
    ratio: "16 / 9",
    // → /public/images/projects/completed-installations/
    src: "/images/projects/completed-installations/installation-3.png",
  },
} as const satisfies Record<string, ImageSlot>;

export type ImageSlotId = keyof typeof imageSlots;
