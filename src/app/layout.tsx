import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import { copy } from "@/content/copy.es";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0D0E10",
};

export const metadata: Metadata = {
  title: "Maqsyma | Equipos de soldadura ESAB en venta y alquiler en Arequipa",
  description:
    "Venta y alquiler de equipos de soldadura ESAB: MIG/MAG, TIG, MMA y accesorios en Arequipa, Perú. Cotice directo por WhatsApp.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://maqsyma.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maqsyma | Equipos de soldadura ESAB en venta y alquiler en Arequipa",
    description:
      "Venta y alquiler de equipos de soldadura ESAB: MIG/MAG, TIG, MMA y corte por plasma en Arequipa, Perú.",
    url: "/",
    siteName: "MAQSYMA",
    images: [
      {
        url: "/brand/logo-maqsyma.png",
        width: 1200,
        height: 630,
        alt: "MAQSYMA Equipos de Soldadura ESAB Arequipa",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maqsyma | Equipos de soldadura ESAB en Arequipa",
    description: "Venta y alquiler de equipos de soldadura ESAB en Arequipa, Perú.",
    images: ["/brand/logo-maqsyma.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Datos estructurados Schema.org LocalBusiness (05-rendimiento-responsive-y-despliegue)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MAQSYMA - Maquinaria, Sistemas y Materiales Avanzados",
    description: "Venta y alquiler de equipos de soldadura ESAB en Arequipa, Perú.",
    telephone: copy.contact.whatsappNumber,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Arequipa",
      addressRegion: "Arequipa",
      addressCountry: "PE",
    },
    brand: {
      "@type": "Brand",
      name: "ESAB",
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://maqsyma.vercel.app",
    currenciesAccepted: "PEN",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    priceRange: "$$",
  };

  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[var(--color-carbon)] text-[var(--color-plata)] antialiased min-h-screen selection:bg-[var(--color-oro)] selection:text-[var(--color-carbon)] font-['Inter',sans-serif]">
        {children}
      </body>
    </html>
  );
}
