"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, KeyRound } from "lucide-react";

import type { DemoAccess } from "@/data/demo-access";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/LocaleProvider";

/**
 * Barra con el usuario y la contraseña de la cuenta de solo lectura, arriba
 * del backoffice, con un botón de copiar al lado de cada dato.
 *
 * Estos valores son públicos a propósito: están para que quien visita el
 * portfolio pueda entrar a mirar el panel. Ver `src/data/demo-access.ts`.
 */
export function AccessBar({ access }: { access: DemoAccess }) {
  const t = useT();

  return (
    <div className="border-b border-line-soft bg-copper/[0.07] px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <span className="flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-copper">
          <KeyRound className="size-3.5" aria-hidden="true" />
          {t("web.accessTitle")}
        </span>

        <CopyField label={t("web.accessEmail")} value={access.email} />
        <CopyField label={t("web.accessPassword")} value={access.password} />
      </div>

      <p className="mt-2.5 text-[0.66rem] leading-relaxed text-sand/60">
        {access.note ?? t("web.accessNote")}
      </p>
    </div>
  );
}

/** Un dato con su botón de copiar. */
function CopyField({ label, value }: { label: string; value: string }) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // navegadores sin permiso de portapapeles: se selecciona para copiar a mano
      const input = document.createElement("input");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.body.removeChild(input);
      return;
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }, [value]);

  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="text-[0.6rem] font-medium uppercase tracking-[0.14em] text-sand/50">
        {label}
      </span>
      <code className="truncate font-mono text-[0.78rem] text-parchment">
        {value}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={`${t("web.copy")} ${label}`}
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-chip)] border transition-colors",
          copied
            ? "border-moss/60 bg-moss/20 text-parchment"
            : "border-line-soft text-sand/70 hover:border-copper/45 hover:text-copper",
        )}
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? t("web.copied") : ""}
      </span>
    </span>
  );
}
