/**
 * Centralised image registry.
 *
 * PIPECO photography will be supplied later. Until then every image on the
 * site is a labelled placeholder driven from this one file. To go live with a
 * real photograph, drop the file into /public/images and set `src` on the
 * matching slot — no component changes required.
 *
 * The official logo is the only real image asset in use right now.
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
  /** Real image path once supplied (e.g. "/images/hero.jpg"). Null = placeholder. */
  src: string | null;
};

export const imageSlots = {
  hero: {
    id: "hero",
    label: "HERO — INDUSTRIAL INSTALLATION IMAGE",
    alt: "Pipeco sectional water tank installation on site in South Africa",
    ratio: "4 / 5",
    src: null,
  },
  productGrp: {
    id: "productGrp",
    label: "GRP SECTIONAL WATER TANK IMAGE",
    alt: "Pipeco GRP sectional water tank",
    ratio: "16 / 10",
    src: null,
  },
  productSteel: {
    id: "productSteel",
    label: "PRESSED STEEL WATER TANK IMAGE",
    alt: "Pipeco pressed steel sectional water tank",
    ratio: "4 / 3",
    src: null,
  },
  productStainless: {
    id: "productStainless",
    label: "STAINLESS STEEL WATER TANK IMAGE",
    alt: "Pipeco pressed stainless steel sectional water tank",
    ratio: "16 / 11",
    src: null,
  },
  capabilities: {
    id: "capabilities",
    label: "ENGINEERING & INSTALLATION IMAGE",
    alt: "Pipeco engineering and installation work on site",
    ratio: "4 / 5",
    src: null,
  },
  refuge: {
    id: "refuge",
    label: "MINING REFUGE CHAMBER IMAGE",
    alt: "Pipeco sectional steel mining refuge chamber",
    ratio: "4 / 5",
    src: null,
  },
  install1: {
    id: "install1",
    label: "INSTALLATION IMAGE 01",
    alt: "Pipeco sectional water tank installation",
    ratio: "4 / 3",
    src: null,
  },
  install2: {
    id: "install2",
    label: "INSTALLATION IMAGE 02",
    alt: "Pipeco sectional water tank installation",
    ratio: "1 / 1",
    src: null,
  },
  install3: {
    id: "install3",
    label: "INSTALLATION IMAGE 03",
    alt: "Pipeco sectional water tank installation",
    ratio: "1 / 1",
    src: null,
  },
} as const satisfies Record<string, ImageSlot>;

export type ImageSlotId = keyof typeof imageSlots;
