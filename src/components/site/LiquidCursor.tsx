"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/**
 * El puntero convertido en una bola liquida.
 *
 * Son dos piezas, y las dos hacen falta. El PUNTO va exactamente donde esta
 * el mouse, sin retraso: ese es el cursor de verdad, el que apunta. La BOLA
 * viene atras, se estira en la direccion en la que viaja y se redondea
 * cuando frena.
 *
 * Reemplazar el cursor por algo que llega tarde es la forma clasica de
 * arruinar una pagina: el visitante apunta a un enlace y el cursor todavia
 * viene en camino. Con el punto adelante no se pierde precision en ningun
 * momento, y la bola queda como lo que es: una consecuencia del movimiento,
 * no el movimiento.
 *
 * No aparece con el dedo —no hay puntero que seguir—, ni si el sistema pide
 * menos movimiento, ni si el JavaScript no llega a correr: el cursor nativo
 * solo se esconde cuando este componente ya esta vivo y sabe que puede
 * reemplazarlo.
 *
 * La idea es del bloque DraggingBall de Bencho
 * (github.com/lorenzo04us/Bencho, MIT). Sin su dependencia `liquid-gooey`:
 * la deformacion sale de la velocidad del resorte, como en los demas.
 */

const BALL = {
  /** cuanto se deforma al moverse, 0 a 70 */
  stretch: 36,
  /** con cuanta rapidez vuelve a ser redonda, 10 a 100 */
  give: 50,
  /** cuanto se aprieta al mantenerla apretada, 0 a 100 */
  grip: 50,
  /** diametro en px, 32 a 84 */
  size: 56,
};

/** velocidad a la que la deformacion llega a su tope, en px/s */
const TOP_SPEED = 2300;

export function LiquidCursor() {
  const [live, setLive] = useState(false);
  const [over, setOver] = useState(false);
  const [held, setHeld] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // la bola persigue; el punto no
  const bx = useSpring(mx, { stiffness: 260, damping: 26, mass: 0.55 });
  const by = useSpring(my, { stiffness: 260, damping: 26, mass: 0.55 });

  const vx = useVelocity(bx);
  const vy = useVelocity(by);

  const angle = useTransform([vx, vy], ([x, y]: number[]) =>
    x === 0 && y === 0 ? 0 : (Math.atan2(y, x) * 180) / Math.PI,
  );

  // `give` decide con cuanta rapidez la deformacion vuelve a cero, y por eso
  // vive en su propio resorte en vez de salir directo de la velocidad
  const reach = useSpring(
    useTransform([vx, vy], ([x, y]: number[]) =>
      Math.min(Math.hypot(x, y) / TOP_SPEED, 1),
    ),
    { stiffness: 120 + BALL.give * 4, damping: 26, mass: 0.4 },
  );

  const amount = (BALL.stretch / 70) * 0.55;
  const squeeze = held ? 1 - (BALL.grip / 100) * 0.26 : 1;
  const scaleX = useTransform(reach, (r) => (1 + r * amount) * squeeze);
  const scaleY = useTransform(reach, (r) => (1 - r * amount * 0.62) * squeeze);

  useEffect(() => {
    // sin puntero fino no hay nada que reemplazar
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!live) setLive(true);

      const el = e.target as Element | null;
      setOver(
        !!el?.closest?.(
          'a, button, label, summary, [role="tab"], [role="slider"], [tabindex]:not([tabindex="-1"])',
        ),
      );
    };
    const down = () => setHeld(true);
    const up = () => setHeld(false);
    const leave = () => setLive(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, [live, mx, my]);

  // el cursor nativo se esconde recien cuando la bola ya esta en pantalla
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("liquid-cursor", live);
    return () => root.classList.remove("liquid-cursor");
  }, [live]);

  if (!live) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      {/* la bola, que llega tarde y se deforma */}
      <motion.div className="absolute left-0 top-0" style={{ x: bx, y: by }}>
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            style={{
              width: BALL.size,
              height: BALL.size,
              rotate: angle,
              scaleX,
              scaleY,
            }}
            className={
              over
                ? "rounded-full border border-copper/70 bg-copper/15 backdrop-blur-[1px] transition-colors duration-300"
                : "rounded-full border border-parchment/25 bg-parchment/[0.07] transition-colors duration-300"
            }
          />
        </div>
      </motion.div>

      {/* el punto: este es el que apunta */}
      <motion.div className="absolute left-0 top-0" style={{ x: mx, y: my }}>
        <div
          className={
            over
              ? "size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper transition-colors duration-300"
              : "size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-parchment transition-colors duration-300"
          }
        />
      </motion.div>
    </div>
  );
}
