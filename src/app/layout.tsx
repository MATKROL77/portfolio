import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";

import { AmbientBackdrop } from "@/components/site/AmbientBackdrop";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { profile } from "@/data/cv";

import "./globals.css";

/**
 * Tipografía tipo Apple. En macOS e iOS el stack arranca por `-apple-system`,
 * así que el visitante ve San Francisco real; en el resto de las plataformas
 * cae en Inter Tight / Inter, que es el sustituto más cercano.
 */
const displayFont = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display-web",
  display: "swap",
});

const sansUi = Inter({
  subsets: ["latin"],
  variable: "--font-sans-web",
  display: "swap",
});

// Dominio de publicación. Si más adelante se apunta un dominio propio,
// se cambia acá, en `sitemap.ts` y en `robots.ts`.
const siteUrl = "https://portfolio.matiascolimodio.workers.dev";
const title = "Matías Colimodio — Engineering, Design & Fabrication";
const description =
  "Portfolio de Matías Colimodio: ingeniería mecánica, diseño técnico, CAD, prototipado, impresión 3D y productos digitales.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Matías Colimodio",
  },
  description,
  applicationName: "Matías Colimodio",
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    "ingeniería mecánica",
    "diseño industrial",
    "CAD",
    "Fusion 360",
    "impresión 3D",
    "prototipado",
    "diseño de mobiliario",
    "desarrollo web",
    "UX/UI",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: profile.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#11110f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${displayFont.variable} ${sansUi.variable}`}>
      <body className="min-h-dvh antialiased">
        {/* salto directo al contenido para navegación por teclado */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-chip)] focus:bg-copper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#17110c]"
        >
          Saltar al contenido / Skip to content
        </a>

        <LocaleProvider>
          <AmbientBackdrop />
          <Nav />
          <main id="contenido">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
