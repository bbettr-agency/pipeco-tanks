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
  /** URL segment for the product detail page (/products/<pageSlug>). */
  pageSlug: string;
  /**
   * Additional real photographs of this range for the detail-page gallery.
   * Paths point at existing, organised assets in /public/images — never
   * fabricated or substituted imagery. Empty when only the feature photo
   * has been supplied so far.
   */
  gallery: string[];
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
    pageSlug: "grp-tanks",
    gallery: [
      "/images/products/grp-tanks/1e7d5b8b-5286-4e2f-bc02-54eaa63b288b.JPG",
      "/images/products/grp-tanks/3d5d34e3-aa0e-4852-b971-69516c242d98.JPG",
      "/images/products/grp-tanks/799ac4f0-87bb-48ce-a45f-163afafb6730.JPG",
      "/images/products/grp-tanks/dbde4e5c-854b-4864-90d0-8e515a0bc7bd.JPG",
      "/images/products/grp-tanks/eb0a38e3-ab4b-4266-b3f6-0b919d85b5b4.JPG",
    ],
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
    pageSlug: "pressed-steel-tanks",
    gallery: [
      "/images/products/pressed-steel-tanks/image1.png",
      "/images/products/pressed-steel-tanks/image5.png",
      "/images/products/pressed-steel-tanks/image6.png",
      "/images/products/pressed-steel-tanks/image7.png",
      "/images/products/pressed-steel-tanks/image9.png",
      "/images/products/pressed-steel-tanks/image10.png",
    ],
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
    pageSlug: "stainless-steel-tanks",
    // Only the feature photograph has been supplied for this range so far.
    gallery: [],
  },
];
