"use client";

import { useCallback, useEffect, useRef } from "react";
import { ArrowUpRight, Eye, ShieldAlert } from "lucide-react";

import { demoAccess, hasCredentials } from "@/data/demo-access";
import type { WebProduct } from "@/data/portfolio";
import { useT } from "@/i18n/LocaleProvider";
import { AccessBar } from "./AccessBar";

/**
 * Backoffice real embebido.
 *
 * Hay dos formas de entrar, según lo que ofrezca cada sistema:
 *
 *  - `mode: "auto"` — la ruta embebida ya viene con la sesión de invitado
 *    abierta (MESSA lo resuelve así, con una cookie `SameSite=None`). No se
 *    publica ninguna credencial. Como esa sesión caduca, el marco se recarga
 *    cuando la pestaña vuelve a estar visible después de un rato.
 *  - `mode: "credentials"` — se muestran usuario y contraseña arriba, con
 *    botón de copiar, y el visitante entra por el formulario del propio panel.
 *
 * El portfolio nunca completa el formulario ni envía credenciales.
 */
export function RealBackoffice({ product }: { product: WebProduct }) {
  const t = useT();
  const access = demoAccess[product.slug];
  const frameRef = useRef<HTMLIFrameElement>(null);
  const loadedAt = useRef<number>(Date.now());

  const src = product.adminEmbedUrl ?? product.adminUrl;
  const auto = access.mode === "auto";
  const showsCredentials = access.mode === "credentials" && access.email.length > 0;

  const refresh = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    loadedAt.current = Date.now();
    // reasignar el src fuerza una carga nueva sin ensuciar el historial
    frame.src = src;
  }, [src]);

  // La sesión de invitado caduca. Si alguien deja la pestaña abierta y vuelve
  // pasado ese tiempo, se recarga el marco para que no aparezca el login.
  useEffect(() => {
    if (!auto || !access.sessionMinutes) return;
    const maxAge = access.sessionMinutes * 60 * 1000;

    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - loadedAt.current < maxAge * 0.9) return;
      refresh();
    };

    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [auto, access.sessionMinutes, refresh]);

  return (
    <div className="flex h-full flex-col bg-[#141110]">
      {showsCredentials && (
        <AccessBar access={access} missingPassword={!hasCredentials(access)} />
      )}

      {auto && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-line-soft bg-moss/[0.12] px-4 py-2.5">
          <span className="flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-parchment/85">
            <Eye className="size-3.5 text-copper" aria-hidden="true" />
            {t("web.autoAccess")}
          </span>
          <span className="text-[0.66rem] leading-relaxed text-sand/60">
            {t("web.autoAccessNote")}
          </span>
        </div>
      )}

      {product.adminEmbeddable ? (
        <iframe
          ref={frameRef}
          src={src}
          title={`Backoffice de ${product.name}`}
          loading="lazy"
          // allow-same-origin es indispensable: sin eso el navegador trata al
          // marco como origen opaco y descarta la cookie de sesión
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          className="min-h-0 w-full flex-1 border-0 bg-white"
        />
      ) : (
        <div className="flex min-h-0 flex-1 flex-col items-start justify-center gap-4 p-6">
          <ShieldAlert className="size-6 text-copper" aria-hidden="true" />
          <p className="max-w-md text-sm leading-relaxed text-sand/75">
            {t("web.adminBlocked")}
          </p>
          <a
            href={product.adminUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            {t("web.openAdmin")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}
