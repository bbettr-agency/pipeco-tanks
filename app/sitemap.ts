import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site-config";

/**
 * Only live routes are listed. Product and other pages are added here as each
 * phase ships, so the sitemap never advertises a page that does not exist yet.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.website,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
