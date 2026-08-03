"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ShieldAlert } from "lucide-react";

import type { Asset } from "@/data/assets.generated";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/LocaleProvider";

/**
 * Muestra un sitio real embebido.
 *
 * Mientras el iframe carga se ve la captura, así no queda un rectángulo vacío.
 * Si el sitio prohíbe el embebido con `X-Frame-Options` o `frame-ancestors`, el
 * navegador bloquea el marco y nosotros no podemos leer ese error por ser otro
 * origen: por eso, cuando el sitio ya se sabe que no es embebible, ni siquiera
 * se intenta y se explica el motivo en pantalla.
 *
 * El iframe va en modo sandbox y sin permisos de formulario ni de navegación
 * superior: el visitante puede mirar, no operar sobre el sitio real.
 */
export function LiveSite({
  url,
  cover,
  alt,
  embeddable,
  className,
}: {
  url: string;
  cover: Asset;
  alt: string;
  embeddable: boolean;
  className?: string;
}) {
  const t = useT();
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // si el marco no reporta carga en un tiempo razonable, se deja la captura
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    if (!embeddable) return;
    const t = window.setTimeout(() => setTimedOut(true), 9000);
    return () => window.clearTimeout(t);
  }, [embeddable]);

  const showCover = !embeddable || !loaded;

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[#f6f2ea]", className)}>
      {embeddable && (
        <iframe
          ref={frameRef}
          src={url}
          title={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-popups"
          className={cn(
            "absolute inset-0 h-full w-full border-0 transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {showCover && (
        <Image
          src={cover.src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 92vw, 60vw"
          placeholder="blur"
          blurDataURL={cover.blurDataURL}
          className="object-cover object-top"
        />
      )}

      {/* aviso honesto cuando el sitio no se deja embeber */}
      {!embeddable && (
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-3 bg-ink/88 px-4 py-3 backdrop-blur-sm">
          <ShieldAlert
            className="size-4 shrink-0 text-copper"
            aria-hidden="true"
          />
          <p className="min-w-0 flex-1 text-[0.7rem] leading-snug text-sand/80">
            {t("web.blockedNotice")}{" "}
            <code className="font-mono text-sand/55">X-Frame-Options: DENY</code>
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 rounded-[var(--radius-chip)] border border-copper/40 px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-copper transition-colors hover:bg-copper/10"
          >
            {t("web.openReal")}
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
        </div>
      )}

      {embeddable && timedOut && !loaded && (
        <p className="absolute inset-x-0 bottom-0 bg-ink/88 px-4 py-3 text-[0.7rem] leading-snug text-sand/80 backdrop-blur-sm">
          {t("web.slowNotice")}
        </p>
      )}
    </div>
  );
}
