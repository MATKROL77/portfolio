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
 * Interruptor de dos estados con la pastilla liquida.
 *
 * Lo que lo separa de un selector comun es que la pastilla se ESTIRA mientras
 * viaja y recien al frenar vuelve a su forma. El estiramiento no esta
 * programado aparte: sale de la velocidad del propio resorte, asi que un
 * recorrido corto casi no deforma y un salto de punta a punta si. Ademas se
 * alarga HACIA donde va —el origen de la escala sigue al signo de la
 * velocidad—, que es la diferencia entre algo elastico y algo que late.
 *
 * Mantiene la semantica de `tablist`: son dos pestañas que traen un panel al
 * frente, no un ajuste de encendido y apagado, y el lector de pantalla tiene
 * que seguir escuchando eso.
 *
 * La idea es del bloque LiquidToggle de Bencho
 * (github.com/lorenzo04us/Bencho, MIT).
 */

export type ToggleOption<T extends string> = {
  id: T;
  label: string;
  /** ids para atar la pestaña con su panel */
  tabId: string;
  panelId: string;
};

export function LiquidToggle<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  speed = 50,
  stretch = 36,
  className,
}: {
  /** exactamente dos: la pastilla viaja entre la primera y la segunda */
  options: readonly [ToggleOption<T>, ToggleOption<T>];
  value: T;
  onChange: (next: T) => void;
  ariaLabel: string;
  /** que tan rapido llega, 0 a 100 */
  speed?: number;
  /** cuanto se alarga mientras se mueve, 0 a 100 */
  stretch?: number;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const found = options.findIndex((o) => o.id === value);
  const index = found < 0 ? 0 : found;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // posicion de la pastilla: 0 la primera, 1 la segunda
  const position = useSpring(index, {
    // `speed` no toca el amortiguamiento: subirlo tiene que llegar antes, no
    // rebotar mas
    stiffness: 170 + speed * 5.4,
    damping: 30,
    mass: 0.7,
  });

  // el destino se escribe en un efecto: un MotionValue no se toca durante el
  // render
  useEffect(() => {
    position.set(index);
  }, [index, position]);

  const velocity = useVelocity(position);
  /** 0 quieta, 1 a toda velocidad */
  const rush = useTransform(velocity, (v) => Math.min(Math.abs(v) / 4, 1));

  const amount = (stretch / 100) * 0.55;
  const scaleX = useTransform(rush, (r) => 1 + r * amount);
  // el volumen se conserva a ojo: lo que se alarga se adelgaza
  const scaleY = useTransform(rush, (r) => 1 - r * amount * 0.5);
  // se alarga hacia donde va
  const originX = useTransform(velocity, (v) => (v >= 0 ? 0 : 1));
  const x = useTransform(position, (p) => `${p * 100}%`);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const next = e.key === "ArrowRight" ? 1 : 0;
      onChange(options[next].id);
      tabs.current[next]?.focus();
    },
    [onChange, options],
  );

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        "relative inline-flex rounded-full border border-line-soft bg-espresso/40 p-1",
        className,
      )}
    >
      {/* la pastilla: decorativa, el estado lo dicen los botones */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-parchment"
        style={
          reduced
            ? { x }
            : { x, scaleX, scaleY, originX, originY: 0.5 }
        }
      />

      {options.map((option, i) => {
        const selected = i === index;
        return (
          <button
            key={option.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={option.tabId}
            aria-selected={selected}
            aria-controls={option.panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative z-10 flex-1 basis-0 whitespace-nowrap rounded-full px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] transition-colors duration-200",
              selected ? "text-ink" : "text-sand/65 hover:text-parchment",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
