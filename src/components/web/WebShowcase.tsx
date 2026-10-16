"use client";

import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { BrowserWindow } from "./BrowserWindow";
import { useT } from "@/i18n/LocaleProvider";
import { useWebProducts, useWebWorks } from "@/i18n/useContent";
import { ChatPreview } from "./ChatPreview";
import { SitePanel } from "./SitePanel";

/**
 * Los trabajos web, uno debajo del otro.
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
 *
 * No todos se muestran igual, porque no todos son lo mismo: los que son un
 * sitio con panel van con el navegador en vivo, y los que no —una linea de
 * WhatsApp que contesta sola— van con lo que de verdad son.
 */

function Band({
  id,
  wash,
  mark,
  mood,
  name,
  role,
  children,
}: {
  id: string;
  wash: string;
  mark: string;
  mood: string;
  name: string;
  role: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`web-${id}`}
      className="relative scroll-mt-24 py-14 md:py-20"
      style={{ "--wash": wash, "--mark": mark } as CSSProperties}
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
              {mood}
            </span>
          </div>

          <h3
            id={`web-${id}`}
            className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-parchment"
          >
            {name}
          </h3>

          <p className="mt-3 text-sm uppercase tracking-[0.14em] text-sand/60">
            {role}
          </p>
        </Reveal>

        {children}
      </div>
    </section>
  );
}

export function WebShowcase() {
  const t = useT();
  const products = useWebProducts();
  const works = useWebWorks();

  return (
    <div className="mt-10 md:mt-14">
      {products.map((product) => (
        <Band
          key={product.slug}
          id={product.slug}
          wash={product.theme.wash}
          mark={product.accent}
          mood={product.theme.mood}
          name={product.name}
          role={product.role}
        >
          <Reveal>
            <p className="prose-editorial mt-5 max-w-2xl">{product.blurb}</p>
          </Reveal>
          <Reveal className="mt-10">
            <SitePanel product={product} titled={false} />
          </Reveal>
        </Band>
      ))}

      <p className="shell text-xs leading-relaxed text-sand/45">
        {t("web.replicaNote")}
      </p>

      {works.map((work) => (
        <Band
          key={work.slug}
          id={work.slug}
          wash={work.theme.wash}
          mark={work.theme.accent}
          mood={work.theme.mood}
          name={work.name}
          role={work.role}
        >
          {/* Con conversacion van lado a lado —el telefono es angosto y
              dejarlo debajo desperdicia media pagina—; sin ella el texto usa
              todo el ancho. */}
          <div
            className={
              work.chat
                ? "lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-14"
                : undefined
            }
          >
            <Reveal>
              <p className="mt-6 max-w-2xl font-display text-[clamp(1.4rem,2.8vw,2.1rem)] font-light leading-[1.25] text-parchment/92">
                {work.claim}
              </p>
              <p className="prose-editorial mt-5 max-w-2xl">{work.blurb}</p>

              {/* Con conversacion, lo que se ve es la conversacion y esto va de
                apoyo. Sin ella —INELEC todavia no tiene su direccion publica—
                la lista ES la pieza, asi que se dibuja como el indice de una
                lamina: numerada y encuadrada. Cada renglon lleva su propio
                recuadro y no es una celda de una grilla con fondo: con siete
                items, tres columnas dejan dos huecos pintados al final y
                parece una tabla sin terminar. */}
              {work.chat ? (
                <ul className="mt-7 flex flex-wrap gap-2">
                  {work.highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-[var(--radius-chip)] border px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-parchment/85"
                      style={{
                        borderColor:
                          "color-mix(in oklab, var(--mark) 45%, transparent)",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <ol className="mt-9 grid max-w-3xl gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {work.highlights.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 rounded-[var(--radius-inner)] border bg-ink/45 px-4 py-3.5"
                      style={{
                        borderColor:
                          "color-mix(in oklab, var(--mark) 26%, transparent)",
                      }}
                    >
                      <span
                        className="font-mono text-[0.62rem] tabular-nums"
                        style={{ color: "var(--mark)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-snug text-parchment/88">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </Reveal>

            {work.screen && (
              <Reveal className="mt-10">
                <BrowserWindow url={work.screen.url} tone="light">
                  <Image
                    src={work.screen.src}
                    alt={work.screen.alt}
                    width={1600}
                    height={1000}
                    className="h-auto w-full"
                    draggable={false}
                  />
                </BrowserWindow>

                <a
                  href={work.screen.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-5"
                >
                  {t("web.openReal")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Reveal>
            )}

            {work.chat && (
              <Reveal className="mt-10 lg:mt-6">
                <ChatPreview work={work} typingLabel={t("web.typing")} />
              </Reveal>
            )}
          </div>

          {work.note && (
            <p className="mt-6 max-w-xl text-xs leading-relaxed text-sand/45">
              {work.note}
            </p>
          )}
        </Band>
      ))}
    </div>
  );
}
