"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import { cn } from "@/lib/cn";

/**
 * Barra que se llena como un liquido, no como una barra.
 *
 * El relleno no sigue al valor: lo persigue. `viscosity` decide cuanto —en 0
 * es un relleno rigido que llega clavado, en 100 es liquido suelto que se
 * pasa de largo y vuelve—, y de esa diferencia entre donde esta y donde
 * deberia estar sale todo lo demas.
 *
 * La cabeza se inclina sobre el borde de avance porque un liquido empujado se
 * amontona adelante. La inclinacion sale de la velocidad del propio resorte,
 * asi que frenar no la apaga de golpe: la deja caer.
 *
 * La idea es del bloque SloshSlider de Bencho
 * (github.com/lorenzo04us/Bencho, MIT).
 */
export function SloshSlider({
  value,
  onScrub,
  onRelease,
  ariaLabel,
  corner = 13,
  viscosity = 15,
  momentum = 55,
  tilt = 45,
  className,
}: {
  /** 0 a 1, controlado desde afuera */
  value: number;
  /** mientras se arrastra */
  onScrub: (next: number) => void;
  /** al soltar, con lo que le queda de envion ya sumado */
  onRelease?: (next: number) => void;
  ariaLabel: string;
  /** 0 a 20 px */
  corner?: number;
  /** 0 relleno rigido, 100 liquido suelto */
  viscosity?: number;
  /** cuanto sigue de largo al soltar, 0 a 100 */
  momentum?: number;
  /** cuanto se recuesta sobre el borde de avance, 0 a 100 */
  tilt?: number;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // Subir la viscosidad afloja el resorte: llega mas tarde y se pasa un poco.
  const level = useSpring(value, {
    stiffness: reduced ? 900 : 400 - viscosity * 2.6,
    damping: reduced ? 90 : 40 - viscosity * 0.28,
    mass: 0.6,
  });

  useEffect(() => {
    level.set(value);
  }, [level, value]);

  const velocity = useVelocity(level);
  /** 0 quieto, 1 a toda velocidad, con signo */
  const rush = useTransform(velocity, (v) =>
    Math.max(-1, Math.min(v / 1.6, 1)),
  );

  const width = useTransform(level, (p) => `${Math.max(0, Math.min(p, 1)) * 100}%`);
  const skewX = useTransform(rush, (r) => (reduced ? 0 : -r * (tilt / 100) * 26));
  const headScaleX = useTransform(rush, (r) =>
    reduced ? 1 : 1 + Math.abs(r) * 1.1,
  );
  const headScaleY = useTransform(rush, (r) =>
    reduced ? 1 : 1 - Math.abs(r) * 0.28,
  );

  /** Posicion del puntero sobre la pista, 0 a 1. */
  const ratioAt = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return Math.max(0, Math.min((clientX - r.left) / r.width, 1));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    onScrub(ratioAt(e.clientX));
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    onScrub(ratioAt(e.clientX));
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (!onRelease) return;
    // lo que le queda de envion: la velocidad del resorte en el momento de
    // soltar, escalada por `momentum`
    const coast = reduced ? 0 : velocity.get() * (momentum / 100) * 0.16;
    onRelease(Math.max(0, Math.min(ratioAt(e.clientX) + coast, 1)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const jump =
      e.key === "ArrowRight" ? 0.05 : e.key === "ArrowLeft" ? -0.05 : null;
    if (jump !== null) {
      e.preventDefault();
      onScrub(Math.max(0, Math.min(value + jump, 1)));
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      onScrub(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onScrub(1);
    }
  };

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(Math.max(0, Math.min(value, 1)) * 100)}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      style={{ borderRadius: corner }}
      className={cn(
        "group relative h-1.5 w-full cursor-pointer touch-none bg-line-faint",
        className,
      )}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 bg-copper/85"
        style={{ width, borderRadius: corner }}
      />

      {/* la cabeza: se alarga y se recuesta sobre el borde de avance */}
      <motion.span
        aria-hidden="true"
        className="absolute top-1/2 block size-2.5 rounded-full bg-parchment shadow-[0_0_10px_rgba(0,0,0,0.45)]"
        style={{
          left: width,
          x: "-50%",
          y: "-50%",
          skewX,
          scaleX: headScaleX,
          scaleY: headScaleY,
        }}
      />
    </div>
  );
}
