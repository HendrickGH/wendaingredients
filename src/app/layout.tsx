import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#0e221b",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wendaingredients.com.mx"),
  title: {
    default: "Wenda Ingredients | Ingredientes Funcionales Especializados & Soluciones Alimentarias",
    template: "%s | Wenda Ingredients"
  },
  description:
    "Líder global en ingredientes funcionales e innovación técnica para la industria alimentaria: cárnicos, panificación y nutrición. Calidad certificada BRCGS Grado A.",
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
  applicationName: "Wenda Ingredients",
  category: "Ingredientes para la Industria Alimentaria",
  classification: "Ingredientes Funcionales y Soluciones Alimentarias",
  referrer: "origin-when-cross-origin",
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
      "Ingredientes funcionales especializados y formulaciones a medida para cárnicos, panificación y nutrición. Calidad certificada BRCGS Grado A con presencia global.",
    siteName: "Wenda Ingredients",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 541,
        alt: "Wenda Ingredients - Ingredientes que hacen más",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Wenda Ingredients | Ingredientes que Hacen Más",
    description:
      "Ingredientes funcionales especializados y formulaciones a medida para cárnicos, panificación y nutrición. Calidad certificada BRCGS Grado A con presencia global.",
    images: ["/og-image.png"]
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
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/manifest.webmanifest"
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
      "image": "https://wendaingredients.com.mx/og-image.png",
      "description":
        "Líder global en ingredientes funcionales e innovación técnica para la industria alimentaria.",
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
      },
      "sameAs": [
        "https://www.linkedin.com/company/wenda-ingredients/home/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://wendaingredients.com.mx/#website",
      "url": "https://wendaingredients.com.mx",
      "name": "Wenda Ingredients",
      "description":
        "Soluciones técnicas e ingredientes funcionales para la industria de alimentos y bebidas.",
      "inLanguage": "es-MX",
      "publisher": {
        "@id": "https://wendaingredients.com.mx/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://wendaingredients.com.mx/#webpage",
      "url": "https://wendaingredients.com.mx",
      "name": "Wenda Ingredients | Ingredientes Funcionales Especializados & Soluciones Alimentarias",
      "isPartOf": {
        "@id": "https://wendaingredients.com.mx/#website"
      },
      "about": {
        "@id": "https://wendaingredients.com.mx/#organization"
      },
      "description":
        "Líder global en ingredientes funcionales e innovación técnica para la industria alimentaria: cárnicos, panificación y nutrición. Calidad certificada BRCGS Grado A.",
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "@id": "https://wendaingredients.com.mx/#primaryimage",
        "url": "https://wendaingredients.com.mx/og-image.png",
        "contentUrl": "https://wendaingredients.com.mx/og-image.png",
        "width": 1024,
        "height": 541,
        "caption": "Wenda Ingredients - Ingredientes que hacen más"
      },
      "inLanguage": "es-MX"
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
