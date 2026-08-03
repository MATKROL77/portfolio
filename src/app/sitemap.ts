import type { MetadataRoute } from "next";

import { projects } from "@/data/portfolio";

export const dynamic = "force-static";

const siteUrl = "https://portfolio.matiascolimodio.workers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteUrl}/cv`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
