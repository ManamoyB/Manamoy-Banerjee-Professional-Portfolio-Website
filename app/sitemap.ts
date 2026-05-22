import type { MetadataRoute } from "next";

import { navigationItems, siteConfig } from "@/lib/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigationItems.map((item) => ({
    url: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    lastModified: new Date(),
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
