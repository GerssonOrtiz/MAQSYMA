import { MetadataRoute } from "next";
import { equiposDemo } from "@/data/equiposDemo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maqsyma.vercel.app";

  const todos = [...equiposDemo.mas_vendido, ...equiposDemo.mejor_valorado, ...equiposDemo.nuevo];
  const equipoRoutes: MetadataRoute.Sitemap = todos.map((e) => ({
    url: `${baseUrl}/equipos/${e.modelo.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
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
