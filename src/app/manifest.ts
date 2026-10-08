import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wenda Ingredients - Soluciones Alimentarias Especializadas",
    short_name: "Wenda Ingredients",
    description:
      "Líder global en ingredientes funcionales e innovación técnica para la industria alimentaria: cárnicos, panificación y nutrición.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAF6",
    theme_color: "#0e221b",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
