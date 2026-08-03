"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";

import { localeMeta, locales } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/cn";

/** Selector de idioma: español, inglés y portugués de Brasil. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

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
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-[var(--radius-chip)] border border-line-soft px-3 py-1.5 text-sand/80 transition-colors hover:border-copper/40 hover:text-copper"
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
