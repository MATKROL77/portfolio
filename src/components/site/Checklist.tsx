"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

/**
 * Lista de casillas que se hinchan al marcarse.
 *
 * La casilla no crece hasta su tamaño y frena: se pasa, y vuelve. Ese exceso
 * es `bounce`, y es todo lo que separa a una casilla que responde de una que
 * simplemente cambia de color. El tilde se dibuja mientras la casilla todavia
 * se esta acomodando, asi que las dos cosas se leen como un solo gesto.
 *
 * Son `<input type="checkbox">` de verdad, escondidos debajo. El teclado, el
 * foco y el lector de pantalla no tienen que enterarse de nada de esto.
 *
 * La idea es del bloque Checklist de Bencho
 * (github.com/lorenzo04us/Bencho, MIT).
 */

export type ChecklistItem = {
  id: string;
  label: string;
  /** cuantos resultados deja esta opcion */
  count?: number;
};

export function Checklist({
  items,
  selected,
  onToggle,
  legend,
  corner = 18,
  box = 18,
  bounce = 50,
  className,
}: {
  items: readonly ChecklistItem[];
  selected: ReadonlySet<string>;
  onToggle: (id: string) => void;
  legend: string;
  /** 0 a 40 px */
  corner?: number;
  /** 14 a 28 px */
  box?: number;
  /** cuanto se pasa de su tamaño al marcarse, 0 a 100 */
  bounce?: number;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const swell = 1 + (bounce / 100) * 0.45;

  return (
    <fieldset className={cn("flex flex-wrap gap-2", className)}>
      <legend className="sr-only">{legend}</legend>

      {items.map((item) => {
        const checked = selected.has(item.id);
        return (
          <label
            key={item.id}
            style={{ borderRadius: corner }}
            className={cn(
              "group flex cursor-pointer select-none items-center gap-2.5 border px-3 py-2 transition-colors duration-300",
              "has-[:focus-visible]:border-copper/60 has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-copper/40",
              checked
                ? "border-copper/45 bg-copper/10"
                : "border-line-soft hover:border-line",
            )}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={checked}
              onChange={() => onToggle(item.id)}
            />

            <motion.span
              aria-hidden="true"
              style={{ width: box, height: box, borderRadius: box * 0.32 }}
              className={cn(
                "relative flex shrink-0 items-center justify-center border transition-colors duration-200",
                checked
                  ? "border-copper bg-copper"
                  : "border-line bg-transparent group-hover:border-sand/50",
              )}
              // se pasa de su tamaño y vuelve
              animate={reduced ? {} : { scale: checked ? [1, swell, 1] : 1 }}
              transition={{ duration: 0.34, times: [0, 0.45, 1], ease: "easeOut" }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-[68%] text-ink"
                initial={false}
              >
                <motion.path
                  d="M4.5 12.6 9.6 17.5 19.5 6.8"
                  animate={{ pathLength: checked ? 1 : 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.26, delay: checked ? 0.06 : 0 }
                  }
                />
              </motion.svg>
            </motion.span>

            <span
              className={cn(
                "text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
                checked ? "text-copper" : "text-sand/70 group-hover:text-parchment",
              )}
            >
              {item.label}
            </span>

            {item.count !== undefined && (
              <span className="text-[0.65rem] tabular-nums text-sand/40">
                {item.count}
              </span>
            )}
          </label>
        );
      })}
    </fieldset>
  );
}
