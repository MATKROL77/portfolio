"use client";

import type { CSSProperties } from "react";

import type { WebWork } from "@/data/web-works";

/**
 * La conversacion de una automatizacion de WhatsApp.
 *
 * Va dibujada en HTML y no como captura: el anuncio del que sale esta a 828 px
 * de ancho, asi que recortar el telefono de ahi daria una imagen borrosa en
 * cualquier pantalla decente. Dibujada se ve nitida y ademas se traduce.
 *
 * Muestra lo mismo que el anuncio y nada mas: el mensaje con el que el cliente
 * abre el chat, y la linea escribiendo. La respuesta no se inventa porque en
 * el anuncio tampoco se ve.
 */
export function ChatPreview({
  work,
  typingLabel,
}: {
  work: WebWork;
  typingLabel: string;
}) {
  if (!work.chat?.length) return null;

  return (
    // El marco es el de un telefono y no el de una tarjeta: lo que se muestra
    // es una conversacion en un telefono, y un borde grueso con la muesca
    // arriba lo dice sin tener que escribirlo.
    <div
      className="w-full max-w-[20rem] rounded-[2.6rem] border-[6px] border-[#1b1714] bg-ink shadow-[0_40px_80px_-28px_rgba(0,0,0,0.85)]"
      style={{ "--mark": work.theme.accent } as CSSProperties}
    >
      <div className="overflow-hidden rounded-[2.1rem] bg-ink/95">
        {/* la muesca */}
        <div className="flex justify-center pt-2.5" aria-hidden="true">
          <span className="h-1.5 w-20 rounded-full bg-[#2a2420]" />
        </div>

        {/* cabecera del chat */}
        <div className="flex items-center gap-3 border-b border-line-faint px-5 py-4">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-semibold text-ink"
            style={{ background: "var(--mark)" }}
            aria-hidden="true"
          >
            {work.name.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm text-parchment">{work.name}</p>
            <p
              className="text-[0.6rem] uppercase tracking-[0.16em]"
              style={{ color: "var(--mark)" }}
            >
              {work.theme.mood}
            </p>
          </div>
        </div>

        <div className="space-y-3 px-5 py-6">
          {work.chat.map((line) => (
            <p
              key={line.text}
              className={
                line.from === "client"
                  ? "max-w-[85%] rounded-2xl rounded-tl-sm bg-espresso/70 px-4 py-3 text-sm leading-relaxed text-parchment/90"
                  : "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed text-ink"
              }
              style={
                line.from === "bot" ? { background: "var(--mark)" } : undefined
              }
            >
              {line.text}
            </p>
          ))}

          {/* la linea escribiendo: es donde termina el anuncio */}
          <p
            className="ml-auto flex w-fit items-center gap-1.5 rounded-2xl rounded-tr-sm px-4 py-3.5"
            style={{ background: "var(--mark)" }}
          >
            <span className="sr-only">{typingLabel}</span>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                className="size-1.5 animate-pulse rounded-full bg-ink/70"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
