"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { SloshSlider } from "@/components/site/SloshSlider";
import { useT } from "@/i18n/LocaleProvider";

/**
 * Avance de lectura del caso, arrastrable.
 *
 * Los casos son paginas largas —problema, proceso, resultado y una galeria
 * entera— y hasta ahora no habia forma de saber cuanto faltaba ni de saltar a
 * la galeria sin rodar la rueda. Esto es las dos cosas: muestra el avance y se
 * puede arrastrar para moverse.
 *
 * El scroll es la unica fuente de verdad. Arrastrar no mueve la barra: mueve
 * la pagina, y la barra se entera por el mismo camino que cuando el visitante
 * rueda la rueda. Asi no hay dos estados que puedan discrepar.
 */
export function ReadingScrubber() {
  const t = useT();
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  const maxScroll = () =>
    Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

  useEffect(() => {
    const read = () => {
      frame.current = 0;
      setProgress(window.scrollY / maxScroll());
    };
    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrubTo = useCallback((next: number) => {
    window.scrollTo({ top: next * maxScroll() });
  }, []);

  const glideTo = useCallback((next: number) => {
    window.scrollTo({ top: next * maxScroll(), behavior: "smooth" });
  }, []);

  // Sin fondo, la barra cruza las fotos de la galeria y se lee como un rayon.
  // Con el mismo vidrio que usa la navegacion al rodar, queda apoyada contra
  // ella. Aparece recien cuando hay algo que mostrar, igual que la navegacion.
  const landed = progress > 0.004;

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-16 z-40 transition-colors duration-700 md:top-20",
        landed && "bg-ink/70 backdrop-blur-xl",
      )}
      // la barra no tapa el texto: solo su propia pista recibe el puntero
      style={{ pointerEvents: "none" }}
    >
      <div className="shell py-2" style={{ pointerEvents: "auto" }}>
        <SloshSlider
          value={progress}
          onScrub={scrubTo}
          onRelease={glideTo}
          ariaLabel={t("case.progress")}
        />
      </div>
    </div>
  );
}
