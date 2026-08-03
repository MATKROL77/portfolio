"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";

import { cn } from "@/lib/cn";

/**
 * Aparición al entrar en viewport.
 *
 * Importante: el contenido se renderiza VISIBLE en el HTML. El estado oculto se
 * aplica recién al montar y sólo si el elemento todavía está fuera de la
 * pantalla. Así, si el JavaScript falla o el IntersectionObserver no llega a
 * dispararse, la página sigue siendo legible en vez de quedar en blanco.
 *
 * Con `prefers-reduced-motion` no hay observer ni transición: todo aparece ya
 * en su lugar.
 */

type RevealState = "static" | "hidden" | "shown";

function useRevealState<T extends HTMLElement>(delay: number) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // si ya está en pantalla al montar, se deja como está: evita el parpadeo
    // de ocultar algo que el visitante ya está mirando
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    setState("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        window.setTimeout(() => setState("shown"), delay * 1000);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, state };
}

const stateClass: Record<RevealState, string> = {
  static: "",
  hidden: "translate-y-7 opacity-0",
  shown: "translate-y-0 opacity-100",
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** retraso en segundos */
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, state } = useRevealState<HTMLDivElement>(delay);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        stateClass[state],
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Contenedor que escalona la aparición de sus `RevealItem`. */
export function RevealGroup({
  children,
  className,
  delayChildren = 0,
  step = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  step?: number;
}) {
  let index = 0;

  const withDelays = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const delay = delayChildren + index * step;
    index += 1;
    return cloneElement(child as ReactElement<{ delay?: number }>, { delay });
  });

  return <div className={className}>{withDelays}</div>;
}

export function RevealItem({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal className={className} delay={delay}>
      {children}
    </Reveal>
  );
}
