import { siteConfig } from "@/config/site-config";

/**
 * Organization / Manufacturer JSON-LD — verified facts only.
 *
 * Intentionally conservative: name, URL, logo, verified NAP, social profiles
 * and area served (South Africa). No ratings, no capacity claims, no
 * certifications, and no opening hours until PIPECO confirms them. Adding
 * unverified structured data would be an unsupported claim.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Manufacturer"],
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
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
  };
}
