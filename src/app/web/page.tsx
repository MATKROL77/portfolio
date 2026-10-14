import type { Metadata } from "next";

import { profile } from "@/data/cv";
import { WebView } from "@/components/web/WebView";

export const metadata: Metadata = {
  title: "Web y automatizaciones",
  description: `Sitios, tiendas y automatizaciones hechas por ${profile.name}: productos en producción, con su panel de administración.`,
  alternates: { canonical: "/web" },
};

export default function WebPage() {
  return <WebView />;
}
