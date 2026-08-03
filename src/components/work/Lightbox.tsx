"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { assets } from "@/data/assets.generated";
import type { GalleryItem } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/LocaleProvider";

/**
 * Visor a pantalla completa. Se cierra con Escape, atrapa el foco mientras
 * está abierto y devuelve el foco al elemento que lo abrió.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const t = useT();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<Element | null>(null);

  const total = items.length;
  const go = useCallback(
    (next: number) => onIndexChange(((next % total) + total) % total),
    [onIndexChange, total],
  );

  useEffect(() => {
    restoreRef.current = document.activeElement;
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
        return;
      }
      // trampa de foco: el tabulador no se escapa del diálogo
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
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
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      (restoreRef.current as HTMLElement | null)?.focus?.();
    };
  }, [go, index, onClose]);

  const item = items[index];
  const img = assets[item.image];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <span className="eyebrow tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
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

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label={t("gallery.prev")}
          className="absolute left-2 z-10 rounded-full border border-line bg-ink/70 p-2.5 text-sand transition-colors hover:border-copper/40 hover:text-copper md:left-6"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>

        <figure className="flex h-full max-h-full w-full max-w-6xl flex-col items-center justify-center gap-4">
          <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
            <Image
              src={img.src}
              alt={item.alt}
              width={img.width}
              height={img.height}
              placeholder="blur"
              blurDataURL={img.blurDataURL}
              className={cn(
                "max-h-full w-auto object-contain",
                item.cutout && "drop-shadow-[0_28px_44px_rgba(0,0,0,0.7)]",
              )}
              sizes="90vw"
            />
          </div>
          {item.caption && (
            <figcaption className="max-w-2xl text-center text-sm text-sand/70">
              {item.caption}
            </figcaption>
          )}
        </figure>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label={t("gallery.next")}
          className="absolute right-2 z-10 rounded-full border border-line bg-ink/70 p-2.5 text-sand transition-colors hover:border-copper/40 hover:text-copper md:right-6"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
