/**
 * Extended, detail-page content for each product range, keyed by pageSlug.
 *
 * All copy is category-accurate and qualitative. No capacities, panel sizes,
 * coatings, steel grades or performance figures are stated — those are
 * confirmed per project. FAQs avoid any unverified specific claim.
 */
export type Benefit = { title: string; body: string };
export type Faq = { q: string; a: string };

type ProductContent = {
  /** Benefit-led hero line. */
  tagline: string;
  /** object-position for the feature hero photo. */
  heroFocus?: string;
  benefits: Benefit[];
  /** Industries this range is especially suited to (labels match /industries). */
  industries: string[];
  faqs: Faq[];
};

const SHARED_FAQS: Faq[] = [
  {
    q: "What capacities and sizes are available?",
    a: "Sectional tanks are modular, so capacity and footprint are configured per project from the panel grid. Pipeco confirms the exact size for your site — send your requirement and we will quote it.",
  },
  {
    q: "Do you install the tank, or only supply it?",
    a: "We do both. Pipeco supplies and installs as a complete turnkey solution — including civil foundations and elevated steel stands where needed — then assembles, seals and commissions the tank on site.",
  },
  {
    q: "Where are the tanks manufactured?",
    a: "Pipeco sectional tanks are manufactured in Malaysia and supplied and installed for projects across South Africa.",
  },
];

export const productContent: Record<string, ProductContent> = {
  "grp-tanks": {
    tagline: "Lightweight, corrosion-free sectional storage for potable and restricted-access sites.",
    heroFocus: "center 60%",
    benefits: [
      {
        title: "Corrosion-free & hygienic",
        body: "Inert GRP panels won't rust, making them well suited to potable water and coastal or corrosive environments.",
      },
      {
        title: "Light enough for anywhere",
        body: "Lightweight panels can be carried into rooftop and restricted-access spaces where heavier materials can't go.",
      },
      {
        title: "Configurable footprint",
        body: "Modular panels build to almost any footprint and height to suit the space you have.",
      },
    ],
    industries: ["Commercial & industrial", "Infrastructure & municipal", "Agriculture"],
    faqs: [
      {
        q: "Is GRP suitable for drinking water?",
        a: "Yes — GRP panels are inert and hygienic and are widely used for potable water storage. Final suitability is confirmed per project.",
      },
      ...SHARED_FAQS,
    ],
  },
  "pressed-steel-tanks": {
    tagline: "Robust, cost-effective sectional storage built for large-volume bulk duty.",
    heroFocus: "center 55%",
    benefits: [
      {
        title: "Strong and robust",
        body: "Pressed steel panels are built for large-volume, high-demand bulk storage.",
      },
      {
        title: "Cost-effective at scale",
        body: "An economical choice when the capacity required is large.",
      },
      {
        title: "A proven workhorse",
        body: "Long established for municipal, mining and industrial storage and fire-water reserves.",
      },
    ],
    industries: ["Infrastructure & municipal", "Mining", "Fire-water storage"],
    faqs: [
      {
        q: "Is pressed steel suitable for large reservoirs?",
        a: "Yes — pressed steel is a cost-effective choice for large-volume bulk storage, including municipal, mining and fire-water reserves.",
      },
      ...SHARED_FAQS,
    ],
  },
  "stainless-steel-tanks": {
    tagline: "Hygienic, highly corrosion-resistant sectional storage with a long service life.",
    heroFocus: "center",
    benefits: [
      {
        title: "Highly corrosion-resistant",
        body: "Stainless panels resist corrosion for a long, low-maintenance service life.",
      },
      {
        title: "Hygienic surfaces",
        body: "Smooth, inert surfaces suit potable, food-grade and healthcare duties.",
      },
      {
        title: "Built for demanding duty",
        body: "A dependable choice for aggressive industrial environments.",
      },
    ],
    industries: ["Commercial & industrial", "Infrastructure & municipal"],
    faqs: [
      {
        q: "Why choose stainless over the other ranges?",
        a: "Stainless offers the highest corrosion resistance and hygiene for potable, food-grade and demanding industrial duties, with a long service life.",
      },
      ...SHARED_FAQS,
    ],
  },
};
