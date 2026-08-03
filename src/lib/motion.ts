import type { Transition, Variants } from "framer-motion";

/** Curvas compartidas: movimiento preciso, nunca rebotado. */
export const easeSoft = [0.22, 1, 0.36, 1] as const;
export const easeInOutSoft = [0.65, 0, 0.35, 1] as const;

export const transitions = {
  soft: { duration: 0.8, ease: easeSoft },
  quick: { duration: 0.45, ease: easeSoft },
  deck: { type: "spring", stiffness: 190, damping: 30, mass: 0.9 },
} satisfies Record<string, Transition>;

/** Aparición al entrar en viewport. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitions.soft,
  },
};

export const revealFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transitions.soft },
};

/** Escalona los hijos de un contenedor. */
export function stagger(delayChildren = 0, staggerChildren = 0.08): Variants {
  return {
    hidden: {},
    show: {
      transition: { delayChildren, staggerChildren },
    },
  };
}

/**
 * Variante equivalente sin desplazamiento, para `prefers-reduced-motion`.
 * Se sigue usando opacidad porque no produce movimiento vestibular.
 */
export const revealReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

export function pickReveal(reduced: boolean | null): Variants {
  return reduced ? revealReduced : revealUp;
}
