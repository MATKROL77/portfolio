import type { MetadataRoute } from "next";

// En `output: "export"` las rutas de metadata tienen que declararse estáticas.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://portfolio.matiascolimodio.workers.dev/sitemap.xml",
  };
}
