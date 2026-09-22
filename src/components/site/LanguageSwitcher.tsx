"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";

import { LOCALE_STORAGE_KEY, localeMeta, locales } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/cn";

/** Selector de idioma: español, inglés y portugués de Brasil. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [beacon, setBeacon] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // El sitio abre en inglés: al que nunca eligió idioma hay que avisarle que
  // puede cambiarlo. Late tres veces y se apaga sola; si el visitante abre el
  // selector antes, ya se dio cuenta y no hace falta seguir.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      // almacenamiento bloqueado: se avisa igual, no cuesta nada
    }
    if (stored) return;
    setBeacon(true);
    const off = window.setTimeout(() => setBeacon(false), 5600);
    return () => window.clearTimeout(off);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t("nav.language")}: ${localeMeta[locale].label}`}
        onClick={() => {
          setBeacon(false);
          setOpen((v) => !v);
        }}
        className={cn(
          "flex items-center gap-2 rounded-[var(--radius-chip)] border px-3 py-1.5 transition-colors hover:border-copper/40 hover:text-copper",
          beacon
            ? "lang-beacon border-copper/55 text-copper"
            : "border-line-soft text-sand/80",
        )}
      >
        <Globe className="size-3.5" aria-hidden="true" strokeWidth={1.6} />
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em]">
          {localeMeta[locale].short}
        </span>
      </button>

      {open && (
        <ul
          id={menuId}
          role="menu"
          className="glass-strong absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[11rem] overflow-hidden !rounded-[var(--radius-inner)] p-1.5"
        >
          {locales.map((code) => (
            <li key={code} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={code === locale}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-[calc(var(--radius-inner)-0.35rem)] px-3 py-2 text-left text-sm transition-colors",
                  code === locale
                    ? "bg-copper/12 text-copper"
                    : "text-parchment/80 hover:bg-parchment/[0.06] hover:text-parchment",
                )}
              >
                {localeMeta[code].label}
                {code === locale && (
                  <Check className="size-3.5 shrink-0" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
