import type { ImageSlotId } from "./image-config";

/**
 * PIPECO's three sectional tank ranges (onboarding-verified product names).
 *
 * Copy is conversion-focused but stays category-accurate: what the tank is, its
 * genuine advantages, and typical applications. No capacities, panel sizes,
 * steel grades, coating specifications or performance figures are stated until
 * PIPECO confirms them — `specPending` is an internal note, not rendered.
 *
 * `tankType` is the quote-form value this product preselects.
 */
export type Product = {
  index: string;
  name: string;
  shortName: string;
  slug: string;
  /** What it is. */
  lede: string;
  /** Key advantages — short, qualitative. */
  advantages: string;
  /** Typical applications / "ideal for". */
  applications: string;
  image: ImageSlotId;
  /** INTERNAL / DEV NOTE ONLY — not rendered. */
  specPending: string;
  /** Quote-form tank-type value this product preselects. */
  tankType: string;
  enquiryHref: string;
};

export const products: Product[] = [
  {
    index: "01",
    name: "GRP Sectional Water Tanks",
    shortName: "GRP",
    slug: "grp-sectional-water-tanks",
    lede: "Glass-reinforced plastic panel tanks – lightweight, corrosion-free and configurable to almost any footprint.",
    advantages:
      "Corrosion-free, hygienic for potable water, and light enough to carry into restricted or rooftop spaces.",
    applications:
      "Potable water, rooftop and confined-access sites, coastal and corrosive environments.",
    image: "productGrp",
    specPending: "Panel sizes & capacities – to be confirmed by PIPECO",
    tankType: "grp",
    enquiryHref: "/?tank=grp#contact",
  },
  {
    index: "02",
    name: "Pressed Steel Sectional Water Tanks",
    shortName: "Pressed steel",
    slug: "pressed-steel-sectional-water-tanks",
    lede: "Pressed steel panel tanks built for large-volume, high-demand bulk storage.",
    advantages:
      "Strong and robust, cost-effective at large capacities, and proven for heavy-duty bulk duty.",
    applications:
      "Bulk municipal, mining and industrial storage, and fire-water reserves.",
    image: "productSteel",
    specPending: "Coatings & capacities – to be confirmed by PIPECO",
    tankType: "pressed-steel",
    enquiryHref: "/?tank=pressed-steel#contact",
  },
  {
    index: "03",
    name: "Pressed Stainless Steel Sectional Water Tanks",
    shortName: "Stainless steel",
    slug: "stainless-steel-sectional-water-tanks",
    lede: "Stainless steel panel tanks for hygienic potable, food-grade and demanding industrial duties.",
    advantages:
      "Highly corrosion-resistant, hygienic, with smooth surfaces and a long service life.",
    applications:
      "Potable and food-grade water, healthcare facilities, and aggressive industrial duties.",
    image: "productStainless",
    specPending: "Grades & capacities – to be confirmed by PIPECO",
    tankType: "stainless",
    enquiryHref: "/?tank=stainless#contact",
  },
];
