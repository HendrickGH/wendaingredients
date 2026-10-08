import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://wendaingredients.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          es: "https://wendaingredients.vercel.app",
          en: "https://wendaingredients.com",
        },
      },
    },
  ];
}
