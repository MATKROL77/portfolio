"use client";

import { ArrowUpRight, ShieldAlert } from "lucide-react";

import { demoAccess, hasCredentials } from "@/data/demo-access";
import type { WebProduct } from "@/data/portfolio";
import { useT } from "@/i18n/LocaleProvider";
import { AccessBar } from "./AccessBar";

/**
 * Backoffice real, con el acceso de invitado a la vista.
 *
 * Arriba van el usuario y la contraseña con sus botones de copiar; abajo, el
 * panel real embebido para que se pueda iniciar sesión sin salir del portfolio.
 * Si el panel prohíbe mostrarse dentro de otra página, se explica y se ofrece
 * abrirlo en una pestaña.
 *
 * El portfolio nunca completa el formulario ni envía las credenciales: sólo las
 * muestra para que las copie quien esté mirando.
 */
export function RealBackoffice({ product }: { product: WebProduct }) {
  const t = useT();
  const access = demoAccess[product.slug];

  return (
    <div className="flex h-full flex-col bg-[#141110]">
      {hasCredentials(access) && <AccessBar access={access} />}

      {product.adminEmbeddable ? (
        <iframe
          src={product.adminUrl}
          title={`Backoffice de ${product.name}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          // el formulario de login tiene que poder enviarse, por eso allow-forms
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
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
