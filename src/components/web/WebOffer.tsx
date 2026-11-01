"use client";

import Link from "next/link";
import { ArrowUpRight, CreditCard, ReceiptText } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { useT } from "@/i18n/LocaleProvider";

/**
 * El cierre de la vista web: con que se conecta un sitio, y como seguir.
 *
 * Las dos integraciones no son una lista de deseos. Estan implementadas en la
 * tienda de BROTE y se puede comprobar en su repositorio: Mercado Pago maneja
 * los cobros, las suscripciones del club y la conciliacion de caja, y la
 * facturacion contra ARCA tiene sus dos entornos, homologacion y produccion.
 * Por eso la nota de abajo dice que estan funcionando y no que se ofrecen.
 */

const integrations = [
  { icon: CreditCard, name: "Mercado Pago", bodyKey: "web.mpBody" as const },
  { icon: ReceiptText, name: "ARCA", bodyKey: "web.arcaBody" as const },
];

export function WebOffer() {
  const t = useT();

  return (
    <>
      <section
        id="integraciones"
        aria-labelledby="integraciones-titulo"
        className="relative scroll-mt-24 section-y"
      >
        <div className="shell">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-copper/70" aria-hidden="true" />
              <span className="eyebrow eyebrow-copper">
                {t("web.stackEyebrow")}
              </span>
            </div>

            <h2
              id="integraciones-titulo"
              className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.1] text-parchment"
            >
              {t("web.stackTitle")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2">
            {integrations.map((item) => (
              <RevealItem key={item.name} className="h-full">
                <div className="glass flex h-full items-start gap-5 p-6 md:p-7">
                  <item.icon
                    className="mt-0.5 size-6 shrink-0 text-copper"
                    aria-hidden="true"
                    strokeWidth={1.4}
                  />
                  <div>
                    <h3 className="font-display text-xl leading-tight text-parchment">
                      {item.name}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-sand/75">
                      {t(item.bodyKey)}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <p className="mt-5 text-xs leading-relaxed text-sand/45">
              {t("web.stackNote")}
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="oferta-titulo" className="relative pb-8">
        <div className="shell">
          <Reveal>
            <div className="glass-strong relative overflow-hidden p-7 md:p-12">
              <div
                className="blueprint pointer-events-none absolute inset-0 opacity-40"
                aria-hidden="true"
              />
              <div className="relative">
                <h2
                  id="oferta-titulo"
                  className="max-w-3xl font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.15] text-parchment"
                >
                  {t("web.offerTitle")}
                </h2>
                <p className="prose-editorial mt-5 max-w-2xl">
                  {t("web.offerBody")}
                </p>
                <Link href="/#contact" className="btn btn-solid mt-8">
                  {t("case.workTogether")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
