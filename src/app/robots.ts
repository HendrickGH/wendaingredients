import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://wendaingredients.com.mx/sitemap.xml",
    host: "https://wendaingredients.com.mx",
  };
}
