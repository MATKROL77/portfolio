"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useT } from "@/i18n/LocaleProvider";
import { WebShowcase } from "./WebShowcase";

/**
 * La vista de web y automatizaciones.
 *
 * El portfolio se partio en dos porque hablaba a dos personas distintas con la
 * misma voz. La vista principal es la de ingenieria y CAD, que es la que mira
 * un reclutador; esta es la del trabajo digital, y se llega por la barra.
 *
 * Cada proyecto baja en su propio tramo, con su color y su vista previa a lo
 * ancho. No hay pestañas que haya que descubrir.
 */
export function WebView() {
  const t = useT();

  return (
    <div className="pb-24 pt-28 md:pt-32">
      <header className="shell">
        <Reveal>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-sand/65 transition-colors hover:text-copper"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-500 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            {t("nav.selectedWork")}
          </Link>
        </Reveal>

        <div className="mt-10">
          <SectionHeading
            eyebrow={t("web.eyebrow")}
            title={t("web.title")}
            intro={t("web.intro")}
          />
        </div>
      </header>

      <WebShowcase />
    </div>
  );
}
