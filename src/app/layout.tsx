import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wendaingredients.com.mx"),
  title: {
    default: "Wenda Ingredients | Ingredientes Funcionales Especializados & Soluciones Alimentarias",
    template: "%s | Wenda Ingredients"
  },
  description:
    "Líder global en ingredientes funcionales para la industria alimentaria: Cárnicos, Panificación, Suplementos, Colores de Origen Natural, Tripas VICEL y Maquinaria RIBON. Certificaciones GFSI-BRCGS Grado A, Halal y Star-K Kosher. Más de 30 años de experiencia.",
  keywords: [
    "Wenda Ingredients",
    "wendaingredients.com.mx",
    "ingredientes funcionales",
    "industria cárnica",
    "embutidos",
    "panificación industrial",
    "clean label",
    "conservadores naturales",
    "transglutaminasa libre de alergenos",
    "WBS",
    "Wenda Phos",
    "Safe Plate",
    "NatureBinde",
    "Koolgel",
    "FreshGuard",
    "tripas de celulosa VICEL",
    "maquinaria RIBON",
    "WNDA Science",
    "Wenda Indent",
    "México",
    "BRCGS Grado A"
  ],
  authors: [{ name: "Wenda Ingredients", url: "https://wendaingredients.com.mx" }],
  creator: "Wenda Ingredients",
  publisher: "Wenda Ingredients",
  formatDetection: {
    email: true,
    address: true,
    telephone: true
  },
  alternates: {
    canonical: "https://wendaingredients.com.mx",
    languages: {
      "es-MX": "https://wendaingredients.com.mx",
      "en-US": "https://wendaingredients.com"
    }
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://wendaingredients.com.mx",
    title: "Wenda Ingredients | Ingredientes que Hacen Más",
    description:
      "Transformamos desafíos técnicos en soluciones confiables y eficientes para la industria alimentaria. Presencia en más de 10 países con 6 laboratorios cárnicos y 4 centros de R&D.",
    siteName: "Wenda Ingredients",
    images: [
      {
        url: "/images/hero/food-lab-scientist.jpg",
        width: 1200,
        height: 630,
        alt: "Wenda Ingredients - Centro de Innovación Alimentaria"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Wenda Ingredients | Soluciones Funcionales para Alimentos",
    description:
      "Mejoramos rendimiento, textura y vida útil con respaldo científico y certificaciones BRCGS Grado A.",
    images: ["/images/hero/food-lab-scientist.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://wendaingredients.com.mx/#organization",
      "name": "Wenda Ingredients",
      "url": "https://wendaingredients.com.mx",
      "logo": "https://wendaingredients.com.mx/wenda.svg",
      "slogan": "Trust in Food®",
      "foundingDate": "1995",
      "founders": [
        {
          "@type": "Person",
          "name": "Mr. Wei"
        }
      ],
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": 400
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "MX",
        "addressRegion": "Jalisco",
        "addressLocality": "Zapopan"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+52-33-3818-9000",
        "contactType": "technical support & sales",
        "areaServed": ["MX", "US", "LATAM", "EU", "CN"],
        "availableLanguage": ["Spanish", "English", "Chinese"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://wendaingredients.com.mx/#website",
      "url": "https://wendaingredients.com.mx",
      "name": "Wenda Ingredients Latam",
      "publisher": {
        "@id": "https://wendaingredients.com.mx/#organization"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#F8FAF6] text-[#0F172A] antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
