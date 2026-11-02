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
