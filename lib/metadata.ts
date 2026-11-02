import type { Metadata } from "next";
import { seoConfig } from "@/config/seo-config";
import { siteConfig } from "@/config/site-config";

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
};

/**
 * Single source of page metadata. Per-page overrides pass title/description/path;
 * the homepage uses the defaults from seo-config.
 */
export function createMetadata(options: CreateMetadataOptions = {}): Metadata {
  const title = options.title
    ? `${options.title} | ${siteConfig.businessName}`
    : seoConfig.title;

  const description = options.description ?? seoConfig.description;
  const url = options.path
    ? `${siteConfig.website}${options.path}`
    : siteConfig.website;

  return {
    metadataBase: new URL(siteConfig.website),
    title,
    description,
    keywords: [...seoConfig.keywords],
    authors: [{ name: seoConfig.author }],
    robots: seoConfig.robots,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.businessName,
      type: "website",
      locale: "en_ZA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
