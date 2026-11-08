import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site-config";
import { products } from "@/config/products-config";

/**
 * Only live routes are listed, so the sitemap never advertises a page that does
 * not exist yet. Routes are generated from config where possible (products) so
 * new pages are picked up automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.website;

  const paths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/solutions/mining-refuge-chambers", priority: 0.7, changeFrequency: "yearly" },
    ...products.map((p) => ({
      path: `/products/${p.pageSlug}`,
      priority: 0.7,
      changeFrequency: "yearly" as const,
    })),
  ];

  return paths.map(({ path, priority, changeFrequency }) => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
