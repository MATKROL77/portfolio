import type { Metadata } from "next";

import { profile } from "@/data/cv";
import { CvView } from "@/components/about/CvView";

export const metadata: Metadata = {
  title: "CV",
  description: `Currículum de ${profile.name}: diseño mecánico y CAD en Fusion 360 y Solid Edge, seguimiento de proyectos, impresión 3D y trato con el cliente.`,
  alternates: { canonical: "/cv" },
};

/**
 * CV en una sola página, pensado para leer y para imprimir.
 * Los estilos de impresión están en globals.css bajo `@media print`, y son los
 * que usa `npm run cv:pdf` para generar el PDF descargable.
 */
export default function CvPage() {
  return <CvView />;
}
