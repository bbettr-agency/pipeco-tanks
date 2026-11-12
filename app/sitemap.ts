import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site-config";
import { products } from "@/config/products-config";
import { verifiedProjects } from "@/config/projects-config";

/**
 * Only live routes are listed, generated from config so new pages are picked up
 * automatically and the sitemap never advertises a page that does not exist.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.website;

  type Entry = {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  };

  const entries: Entry[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/products", priority: 0.9, changeFrequency: "monthly" },
    ...products.map((p) => ({
      path: `/products/${p.pageSlug}`,
      priority: 0.8,
      changeFrequency: "yearly" as const,
    })),
    { path: "/solutions", priority: 0.8, changeFrequency: "monthly" },
    { path: "/solutions/turnkey-installations", priority: 0.7, changeFrequency: "yearly" },
    { path: "/solutions/mining-refuge-chambers", priority: 0.7, changeFrequency: "yearly" },
    { path: "/industries", priority: 0.7, changeFrequency: "yearly" },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
    ...verifiedProjects.map((p) => ({
      path: `/projects/${p.slug}`,
      priority: 0.6,
      changeFrequency: "yearly" as const,
    })),
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  ];

  return entries.map(({ path, priority, changeFrequency }) => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
