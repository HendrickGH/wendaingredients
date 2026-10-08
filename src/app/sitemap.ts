import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://wendaingredients.com.mx",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          es: "https://wendaingredients.com.mx",
          en: "https://wendaingredients.com",
        },
      },
    },
  ];
}
