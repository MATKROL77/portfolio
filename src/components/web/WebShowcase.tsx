"use client";

import type { CSSProperties } from "react";

import { Reveal } from "@/components/site/Reveal";
import { useT } from "@/i18n/LocaleProvider";
import { useWebProducts } from "@/i18n/useContent";
import { SitePanel } from "./SitePanel";

/**
 * Los productos web, uno debajo del otro.
 *
 * Antes vivian en una grilla de dos columnas: cada vista previa entraba en
 * media pantalla y habia que entrecerrar los ojos para leer la interfaz. Ahora
 * cada proyecto ocupa su propio tramo de pagina, a lo ancho del contenedor,
 * y se llega a el bajando, no apretando una pestaña.
 *
 * Y la pagina se viste de cada proyecto mientras dura su tramo: la franja toma
 * el color de la marca y la linea, el rotulo y los botones toman su acento. El
 * tiñe entra y sale con un degradado, asi que el tramo siguiente empieza
 * limpio en vez de cortar de golpe.
 */
export function WebShowcase() {
  const t = useT();
  const products = useWebProducts();

  return (
    <div className="mt-10 md:mt-14">
      {products.map((product) => (
        <section
          key={product.slug}
          id={product.slug}
          aria-labelledby={`web-${product.slug}`}
          className="relative scroll-mt-24 py-14 md:py-20"
          style={
            {
              "--wash": product.theme.wash,
              "--mark": product.accent,
            } as CSSProperties
          }
        >
          {/* la franja del proyecto: entra y sale con degradado */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--wash)_12%,var(--wash)_88%,transparent_100%)]"
          />

          <div className="shell relative">
            <Reveal>
              <div className="flex items-center gap-4">
                <span
                  className="h-px w-8"
                  style={{ background: "var(--mark)" }}
                  aria-hidden="true"
                />
                <span
                  className="text-[0.62rem] font-medium uppercase tracking-[0.2em]"
                  style={{ color: "var(--mark)" }}
                >
                  {product.theme.mood}
                </span>
              </div>

              <h3
                id={`web-${product.slug}`}
                className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-parchment"
              >
                {product.name}
              </h3>

              <p className="mt-3 text-sm uppercase tracking-[0.14em] text-sand/60">
                {product.role}
              </p>

              <p className="prose-editorial mt-5 max-w-2xl">{product.blurb}</p>
            </Reveal>

            <Reveal className="mt-10">
              <SitePanel product={product} titled={false} />
            </Reveal>
          </div>
        </section>
      ))}

      <p className="shell mt-6 text-xs leading-relaxed text-sand/45">
        {t("web.replicaNote")}
      </p>
    </div>
  );
}
