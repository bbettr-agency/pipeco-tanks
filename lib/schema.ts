import { siteConfig } from "@/config/site-config";

/**
 * Organization JSON-LD — verified facts only.
 *
 * NOTE: the South African business SUPPLIES and installs tanks that are
 * manufactured internationally (Malaysia), so it is not typed as a Manufacturer.
 *
 * Intentionally conservative: name, URL, logo, verified NAP, social profiles
 * and area served (South Africa). No ratings, no capacity claims, no
 * certifications, and no opening hours until PIPECO confirms them. Adding
 * unverified structured data would be an unsupported claim.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.businessName,
    url: siteConfig.website,
    logo: `${siteConfig.website}/brand/pipeco-logo.png`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.locality,
      addressRegion: siteConfig.region,
      postalCode: siteConfig.postalCode,
      addressCountry: "ZA",
    },
    areaServed: { "@type": "Country", name: "South Africa" },
    knowsAbout: [
      "Sectional water tanks",
      "GRP sectional water tanks",
      "Pressed steel sectional water tanks",
      "Stainless steel sectional water tanks",
      "Turnkey water storage",
      "Water tank installation",
    ],
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
  };
}

const abs = (path: string) =>
  path === "/" ? siteConfig.website : `${siteConfig.website}${path}`;

/** BreadcrumbList for an interior page. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/**
 * Product schema — brand and category only. No price, rating, SKU or
 * specification is asserted, since those are not verified.
 */
export function productSchema(p: {
  name: string;
  description: string;
  /** Optional — omitted when no verified product photograph exists. */
  image?: string;
  path: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    ...(p.image ? { image: abs(p.image) } : {}),
    url: abs(p.path),
    category: p.category ?? "Sectional water tanks",
    brand: { "@type": "Brand", name: "Pipeco" },
    // No price, availability, rating or SKU — none is verified. Enquiries are
    // quoted per project.
  };
}

/** Service schema for a solution/capability page. */
export function serviceSchema(s: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: abs(s.path),
    serviceType: s.serviceType ?? s.name,
    areaServed: { "@type": "Country", name: "South Africa" },
    provider: {
      "@type": "Organization",
      name: siteConfig.businessName,
      url: siteConfig.website,
    },
  };
}

/** FAQPage schema from question/answer pairs. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
