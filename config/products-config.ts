import type { ImageSlotId } from "./image-config";

/**
 * PIPECO's three sectional tank ranges (onboarding-verified product names).
 *
 * Descriptions are category-accurate and deliberately qualitative. No
 * capacities, panel dimensions, steel grades or other hard specifications are
 * stated until PIPECO confirms them — `specPending` marks where a confirmed
 * spec line will slot in later.
 */
export type Product = {
  index: string;
  name: string;
  shortName: string;
  slug: string;
  lede: string;
  /** One-line material framing — qualitative, no unverified numbers. */
  material: string;
  image: ImageSlotId;
  /**
   * INTERNAL / DEV NOTE ONLY — not rendered on the public site.
   * Marks where a PIPECO-confirmed specification will slot in later.
   */
  specPending: string;
  enquiryHref: string;
};

export const products: Product[] = [
  {
    index: "01",
    name: "GRP Sectional Water Tanks",
    shortName: "GRP",
    slug: "grp-sectional-water-tanks",
    lede: "Glass-reinforced plastic panel tanks – lightweight, corrosion-free and configurable to almost any footprint.",
    material: "Glass-reinforced plastic (GRP) panels",
    image: "productGrp",
    specPending: "Panel sizes & capacities – to be confirmed by PIPECO",
    enquiryHref: "#contact",
  },
  {
    index: "02",
    name: "Pressed Steel Sectional Water Tanks",
    shortName: "Pressed steel",
    slug: "pressed-steel-sectional-water-tanks",
    lede: "Hot-dip galvanised pressed steel panels engineered for high-volume, high-demand bulk storage.",
    material: "Hot-dip galvanised pressed steel panels",
    image: "productSteel",
    specPending: "Coatings & capacities – to be confirmed by PIPECO",
    enquiryHref: "#contact",
  },
  {
    index: "03",
    name: "Pressed Stainless Steel Sectional Water Tanks",
    shortName: "Stainless steel",
    slug: "stainless-steel-sectional-water-tanks",
    lede: "Hygienic stainless steel panels for potable, food-grade and aggressive industrial duties.",
    material: "Pressed stainless steel panels",
    image: "productStainless",
    specPending: "Grades & capacities – to be confirmed by PIPECO",
    enquiryHref: "#contact",
  },
];
