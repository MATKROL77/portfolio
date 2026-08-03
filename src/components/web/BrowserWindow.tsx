import { Lock } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * Marco de ventana de navegador. Es sólo presentación: la barra de direcciones
 * muestra la URL real pero no es un campo editable ni navega a ningún lado.
 */
export function BrowserWindow({
  url,
  children,
  badge,
  className,
  tone = "dark",
}: {
  url: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-panel)] border shadow-[0_40px_80px_-32px_rgba(0,0,0,0.9)]",
        tone === "dark"
          ? "border-line-soft bg-[#171310]"
          : "border-black/10 bg-[#f6f2ea]",
        className,
      )}
    >
      {/* barra de título */}
      <div
        className={cn(
          "flex items-center gap-3 border-b px-3.5 py-2.5",
          tone === "dark"
            ? "border-line-faint bg-[#1e1815]"
            : "border-black/10 bg-[#e9e3d8]",
        )}
      >
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#e0705f]" />
          <span className="size-2.5 rounded-full bg-[#e0b25f]" />
          <span className="size-2.5 rounded-full bg-[#7ea56b]" />
        </div>

        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-chip)] px-3 py-1",
            tone === "dark" ? "bg-ink/70" : "bg-white/70",
          )}
        >
          <Lock
            className={cn(
              "size-3 shrink-0",
              tone === "dark" ? "text-moss" : "text-[#5c7a4d]",
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "truncate font-mono text-[0.68rem]",
              tone === "dark" ? "text-sand/70" : "text-black/55",
            )}
          >
            {host}
          </span>
        </div>

        {badge}
      </div>

      {children}
    </div>
  );
}

/** Etiqueta de estado para la barra de la ventana. */
export function WindowBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "copper";
}) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-[var(--radius-chip)] border px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.14em]",
        tone === "copper"
          ? "border-copper/40 bg-copper/10 text-copper"
          : "border-line-soft text-sand/60",
      )}
    >
      {children}
    </span>
  );
}
