import { MetadataRoute } from "next";
import { catalogoProductos } from "@/data/catalogoOficial";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maqsyma-app.vercel.app";

  const equipoRoutes: MetadataRoute.Sitemap = catalogoProductos.map((e) => ({
    url: `${baseUrl}/equipos/${e.slug || e.modelo.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...equipoRoutes,
  ];
}
