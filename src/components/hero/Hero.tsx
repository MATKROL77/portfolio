"use client";

import { useT } from "@/i18n/LocaleProvider";
import { ProjectDeck } from "./ProjectDeck";

export function Hero() {
  const t = useT();

  return (
    <section
      id="selected-work"
      aria-labelledby="hero-title"
      className="relative scroll-mt-24 pb-16 pt-24 md:pb-24 md:pt-28"
    >
      <div className="shell">
        <ProjectDeck />

        {/* frase grande debajo de la galería */}
        <div className="mt-14 text-center md:mt-20">
          {/* En mobile cada palabra ocupa su propia línea: a 375 px el bloque
              completo no entra en dos líneas sin recortarse. */}
          <h1
            id="hero-title"
            className="font-display text-[clamp(1.55rem,6.4vw,5rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-parchment"
          >
            <span className="block sm:inline">ENGINEERING</span>{" "}
            <span className="text-copper/70">/</span>{" "}
            <span className="block sm:inline">DESIGN</span>{" "}
            <span className="text-copper/70">/</span>{" "}
            <span className="block sm:inline">FABRICATION</span>
          </h1>

          <p className="eyebrow mx-auto mt-6 max-w-xl text-balance">
            {t("hero.claim")}
          </p>

          <div
            className="mx-auto mt-8 h-px w-14 bg-copper/60"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
