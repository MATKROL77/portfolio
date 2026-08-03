"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Expand, Layers, X } from "lucide-react";

import { assets } from "@/data/assets.generated";
import { broteDemo, messaDemo } from "@/data/backoffice-demo";
import type { WebProduct } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/LocaleProvider";
import { BrowserWindow, WindowBadge } from "./BrowserWindow";
import { BackofficeReplica } from "./BackofficeReplica";
import { LiveSite } from "./LiveSite";

type Tab = "public" | "admin";

const demos = { brote: broteDemo, messa: messaDemo } as const;

/**
 * Ficha de un producto web: la ventana del sitio público adelante y la del
 * backoffice detrás, con pestañas para traer una u otra al frente.
 *
 * Decisiones deliberadas:
 *  - El sitio público se embebe en vivo cuando el propio sitio lo permite; si
 *    manda `X-Frame-Options: DENY`, se muestra la captura real y se explica.
 *  - "Ampliar" abre la misma ventana a pantalla completa dentro del portfolio.
 *  - El backoffice es una réplica local con datos de demostración: siempre
 *    accesible, sin credenciales y sin ninguna request a los sistemas reales.
 *  - Ningún control de esta sección puede modificar nada en producción.
 */
export function SitePanel({ product }: { product: WebProduct }) {
  const t = useT();
  const [tab, setTab] = useState<Tab>("public");
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  const baseId = useId();
  const cover = assets[product.cover];
  const demo = demos[product.slug];

  const publicFront = tab === "public";

  const stackTransition = reduced
    ? { duration: 0.2 }
    : { type: "spring" as const, stiffness: 210, damping: 28 };

  return (
    <div className="glass-strong overflow-hidden p-5 md:p-7">
      {/* --- encabezado ------------------------------------------------- */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-3xl leading-none text-parchment">
            {product.name}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-sand/70">
            {product.blurb}
          </p>
          <p className="eyebrow mt-3">{product.role}</p>
        </div>

        <div className="flex shrink-0 flex-col gap-2.5">
          <a
            href={product.publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn justify-center"
          >
            {t("web.openReal")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="btn justify-center"
          >
            {t("web.expand")}
            <Expand className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* --- pestañas ---------------------------------------------------- */}
      <div
        role="tablist"
        aria-label={`Vistas de ${product.name}`}
        className="mt-6 flex flex-wrap gap-1.5"
      >
        {[
          { id: "public" as Tab, label: t("web.publicSite") },
          { id: "admin" as Tab, label: t("web.backoffice") },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${baseId}-tab-${item.id}`}
            aria-selected={tab === item.id}
            aria-controls={`${baseId}-panel-${item.id}`}
            onClick={() => setTab(item.id)}
            className={cn(
              "rounded-[var(--radius-chip)] border px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
              tab === item.id
                ? "border-copper/50 bg-copper/15 text-copper"
                : "border-line-soft text-sand/65 hover:border-line hover:text-parchment",
            )}
          >
            {item.label}
          </button>
        ))}

        {!publicFront && (
          <span className="ml-auto flex items-center gap-2 self-center text-[0.65rem] uppercase tracking-[0.14em] text-sand/50">
            <Layers className="size-3.5" aria-hidden="true" />
            {t("web.backstage")}
          </span>
        )}
      </div>

      {/* --- pila de ventanas --------------------------------------------
          El padding superior y derecho deja el espacio por donde asoma el
          borde de la ventana de atrás. */}
      <div className="relative mt-6 aspect-[16/11] w-full pr-6 pt-6 sm:aspect-[16/9]">
        <motion.div
          role="tabpanel"
          id={`${baseId}-panel-public`}
          aria-labelledby={`${baseId}-tab-public`}
          className="absolute inset-y-0 left-0 right-6 top-6"
          animate={{
            x: publicFront ? "0%" : "5%",
            y: publicFront ? "0%" : "-5%",
            scale: publicFront ? 1 : 0.95,
            opacity: publicFront ? 1 : 0.5,
            zIndex: publicFront ? 20 : 10,
          }}
          transition={stackTransition}
        >
          <BrowserWindow
            url={product.publicUrl}
            tone="light"
            className="h-full"
            badge={
              <WindowBadge tone={product.publicEmbeddable ? "copper" : "neutral"}>
                {product.publicEmbeddable ? t("web.live") : t("web.capture")}
              </WindowBadge>
            }
          >
            <div className="h-[calc(100%-2.75rem)] w-full">
              <LiveSite
                url={product.publicUrl}
                cover={cover}
                alt={`Sitio público de ${product.name}`}
                embeddable={product.publicEmbeddable}
              />
            </div>
          </BrowserWindow>
        </motion.div>

        <motion.div
          role="tabpanel"
          id={`${baseId}-panel-admin`}
          aria-labelledby={`${baseId}-tab-admin`}
          className="absolute inset-y-0 left-0 right-6 top-6"
          animate={{
            x: publicFront ? "5%" : "0%",
            y: publicFront ? "-5%" : "0%",
            scale: publicFront ? 0.95 : 1,
            opacity: publicFront ? 0.5 : 1,
            zIndex: publicFront ? 10 : 20,
          }}
          transition={stackTransition}
          aria-hidden={publicFront}
        >
          <BrowserWindow
            url={product.adminUrl}
            className="h-full"
            badge={<WindowBadge tone="copper">Read-only demo</WindowBadge>}
          >
            <div className="h-[calc(100%-2.75rem)] overflow-y-auto">
              <BackofficeReplica demo={demo} accent={product.accent} />
            </div>
          </BrowserWindow>
        </motion.div>

        {publicFront && (
          <button
            type="button"
            onClick={() => setTab("admin")}
            className="absolute -top-1 right-0 z-30 size-16 rounded-tr-[var(--radius-panel)]"
          >
            <span className="sr-only">Ver el backoffice de {product.name}</span>
          </button>
        )}
      </div>

      {expanded && (
        <ExpandedSite
          product={product}
          tab={tab}
          onTabChange={setTab}
          onClose={() => setExpanded(false)}
        />
      )}
    </div>
  );
}

/* ==========================================================================
   Vista ampliada
========================================================================== */

function ExpandedSite({
  product,
  tab,
  onTabChange,
  onClose,
}: {
  product: WebProduct;
  tab: Tab;
  onTabChange: (t: Tab) => void;
  onClose: () => void;
}) {
  const t = useT();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<Element | null>(null);
  const cover = assets[product.cover];
  const demo = demos[product.slug];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    restoreRef.current = document.activeElement;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      (restoreRef.current as HTMLElement | null)?.focus?.();
    };
  }, [handleKey]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} a pantalla completa`}
      className="fixed inset-0 z-[95] flex flex-col bg-ink/95 p-3 backdrop-blur-xl md:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-xl text-parchment">{product.name}</h2>
          <div role="tablist" aria-label="Vista" className="flex gap-1.5">
            {[
              { id: "public" as Tab, label: t("web.publicSite") },
              { id: "admin" as Tab, label: t("web.backoffice") },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "rounded-[var(--radius-chip)] border px-3.5 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.14em] transition-colors",
                  tab === item.id
                    ? "border-copper/50 bg-copper/15 text-copper"
                    : "border-line-soft text-sand/65 hover:text-parchment",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={tab === "public" ? product.publicUrl : product.adminUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-[var(--radius-chip)] border border-line px-3.5 py-2 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-sand transition-colors hover:border-copper/40 hover:text-copper"
          >
            {t("web.openReal")}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-[var(--radius-chip)] border border-line px-3.5 py-2 text-sand transition-colors hover:border-copper/40 hover:text-copper"
          >
            <span className="eyebrow">{t("gallery.close")}</span>
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <BrowserWindow
          url={tab === "public" ? product.publicUrl : product.adminUrl}
          tone={tab === "public" ? "light" : "dark"}
          className="h-full"
          badge={
            tab === "public" ? (
              <WindowBadge tone={product.publicEmbeddable ? "copper" : "neutral"}>
                {product.publicEmbeddable ? t("web.live") : t("web.capture")}
              </WindowBadge>
            ) : (
              <WindowBadge tone="copper">{t("web.readOnly")}</WindowBadge>
            )
          }
        >
          <div className="h-[calc(100%-2.75rem)] overflow-y-auto">
            {tab === "public" ? (
              <LiveSite
                url={product.publicUrl}
                cover={cover}
                alt={`Sitio público de ${product.name}`}
                embeddable={product.publicEmbeddable}
                className="h-full"
              />
            ) : (
              <BackofficeReplica demo={demo} accent={product.accent} />
            )}
          </div>
        </BrowserWindow>
      </div>
    </div>
  );
}
