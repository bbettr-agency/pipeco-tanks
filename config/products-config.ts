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
   * Large photograph for the split hero on the detail page. A real, organised
   * asset — distinct from the gallery and from the homepage hero so no single
   * photo repeats across the site.
   */
  heroImage: string;
  /**
   * Installation photograph for this range's "Turnkey delivery" section. A
   * different, authentic install photo per range — a generic civil / install
   * stage, never a false material claim.
   */
  turnkeyImage: string;
  /** Alt text for the turnkey installation photograph. */
  turnkeyAlt: string;
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
    heroImage: "/images/products/grp-tanks/grp-tank-wide.jpeg",
    turnkeyImage: "/images/projects/completed-installations/install-tank-base.jpeg",
    turnkeyAlt: "Sectional tank base panels assembled on a concrete plinth during a Pipeco installation",
    gallery: [
      "/images/products/grp-tanks/1e7d5b8b-5286-4e2f-bc02-54eaa63b288b.JPG",
      "/images/products/grp-tanks/5fa7332b-245b-496c-9d83-b1d1a355d941.JPG",
      "/images/products/grp-tanks/799ac4f0-87bb-48ce-a45f-163afafb6730.JPG",
      "/images/products/grp-tanks/dbde4e5c-854b-4864-90d0-8e515a0bc7bd.JPG",
      "/images/products/grp-tanks/eb0a38e3-ab4b-4266-b3f6-0b919d85b5b4.JPG",
      "/images/products/grp-tanks/grp-panels-factory.jpeg",
      "/images/products/grp-tanks/grp-panels-closeup.jpeg",
      "/images/products/grp-tanks/grp-tank-inspection.jpeg",
      "/images/products/grp-tanks/grp-tank-gauge.jpeg",
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
    heroImage: "/images/products/pressed-steel-tanks/image1.png",
    turnkeyImage: "/images/projects/completed-installations/install-elevated-crane.jpeg",
    turnkeyAlt: "Sectional water tank lifted onto an elevated steel tower by crane during a Pipeco installation",
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
    // NOTE: this is the only "stainless" photograph supplied, and it reads as a
    // galvanised pressed-steel hydrant tank — flagged for client verification.
    // Kept as the client's designated stainless product image; not reused as a
    // classified portfolio entry elsewhere.
    heroImage: "/images/products/stainless-steel-tanks/stainless-steel-sectional-tank.jpeg",
    turnkeyImage: "/images/projects/completed-installations/install-steelworks.jpeg",
    turnkeyAlt: "Structural steelworks for a sectional water reservoir during a Pipeco installation",
    // No separate gallery on this page — the client's designated stainless
    // photograph is shown in the /projects gallery instead.
    gallery: [],
  },
];
