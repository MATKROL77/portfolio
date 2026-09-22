"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { assets } from "@/data/assets.generated";
import { profile } from "@/data/cv";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { transitions } from "@/lib/motion";
import { useT } from "@/i18n/LocaleProvider";
import { useFeaturedProjects } from "@/i18n/useContent";

type DeckItem =
  | { kind: "profile"; key: string }
  | { kind: "project"; key: string; project: Project };

/* ==========================================================================
   El anillo

   La baraja era una fila: fichas en linea y, en las puntas, la pregunta de
   siempre — que hace una ficha cuando se le acaba el bloque. Un anillo no la
   hace. No tiene primera ni ultima, asi que el arrastre nunca se termina ni
   rebota, y lo mas lejos que llega una ficha es el radio.

   `turn` es una posicion angular continua, no un indice: el arrastre la mueve
   de a fracciones y al soltar aterriza en el entero mas cercano. Que la ficha
   del frente se achique y se vaya al fondo mientras entra la siguiente sale de
   la geometria, no de una animacion puesta encima.

   La idea, las formulas y el criterio son del bloque Carousel de Bencho
   (github.com/lorenzo04us/Bencho, MIT). Aca esta reescrito sobre los
   componentes, las curvas y las fichas que el sitio ya tenia.
========================================================================== */

const TAU = Math.PI * 2;

const RING = {
  /** hasta donde llega el anillo: radio en px, atado al ancho del marco */
  orbitRatio: 0.38,
  orbitMin: 260,
  orbitMax: 520,
  /** cuanto mas chica se ve la ficha del fondo */
  backScale: 0.52,
  /** y cuanto crece la del frente, para que mande sobre las vecinas */
  frontScale: 1.12,
  /**
   * El fondo del anillo sube. La escala sola dice "mas chica", que se lee como
   * mas lejos o como literalmente mas chica; una ficha que ademas se eleva
   * mientras se aleja esta yendo al fondo sin lugar a dudas, porque es lo que
   * hace un anillo mirado desde un poco arriba.
   */
  lift: 24,
  /** px de arrastre por ficha */
  pull: 210,
  /** cuanto se hunde la ficha bajo el cursor, en grados */
  sink: 9,
};

/** Con cuanta calma aterriza un envion. */
const SETTLE = {
  type: "spring",
  stiffness: 110,
  damping: 20,
  mass: 0.9,
} as const;

/** Distancia minima entre dos posiciones de un anillo de `n` elementos. */
function ringOffset(i: number, active: number, n: number) {
  let offset = (((i - active) % n) + n) % n; // 0..n-1
  if (offset > n / 2) offset -= n; // -n/2..n/2
  return offset;
}

/* --------------------------------------------------------------------------
   Una posicion del anillo.

   Tres movimientos, tres elementos, una transformacion cada uno: el hueco
   lleva el anillo, el flotador la deriva y la ficha la inclinacion. Un solo
   nodo escrito por tres manos —un arrastre, unos keyframes y un par de
   resortes— siempre pierde una.
-------------------------------------------------------------------------- */
function RingSlot({
  index,
  count,
  turn,
  orbit,
  reduced,
  children,
}: {
  index: number;
  count: number;
  turn: MotionValue<number>;
  orbit: number;
  reduced: boolean;
  children: React.ReactNode;
}) {
  // El angulo no se toma modulo nada. Envolver `turn` a 0..360 manda la ficha
  // por el camino largo apenas cruza la costura, que es el unico error visible
  // que este arreglo puede tener.
  const angle = useTransform(turn, (v) => (index - v) * (TAU / count));
  /** 1 adelante, 0 atras */
  const face = useTransform(angle, (th) => (Math.cos(th) + 1) / 2);

  const x = useTransform(angle, (th) => Math.sin(th) * orbit);
  const y = useTransform(face, (f) => -(1 - f) * RING.lift);
  const scale = useTransform(
    face,
    (f) => RING.backScale + (RING.frontScale - RING.backScale) * f,
  );
  // La opacidad y el desenfoque caen mas rapido que `face`: sin eso, media
  // docena de fichas a medio camino se amontonan en el centro del anillo y la
  // del frente deja de mandar.
  const opacity = useTransform(face, (f) => 0.1 + 0.9 * Math.pow(f, 1.9));
  const filter = useTransform(
    face,
    (f) => `blur(${(Math.pow(1 - f, 1.3) * 5).toFixed(2)}px)`,
  );
  // Aca todo es 2D —escala y desplazamiento, no translateZ— asi que nada se
  // ordena solo y una ficha pintaria sobre la que tiene adelante. `face` ya
  // sabe cual esta mas cerca.
  const zIndex = useTransform(face, (f) => Math.round(f * 100));

  return (
    // La capa de afuera centra la ficha con clases y la de adentro la anima.
    // Si el centrado y la animacion viven en el mismo elemento, `x` pisa a
    // `translateX` —son el mismo valor en Framer Motion— y todas las fichas
    // terminan apiladas en el centro.
    <motion.div
      style={{ zIndex }}
      className="absolute left-1/2 top-1/2 w-[clamp(17.5rem,25vw,22rem)] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        style={
          reduced ? { x, scale, opacity } : { x, y, scale, opacity, filter }
        }
      >
        <div
          className={reduced ? undefined : "deck-float"}
          style={reduced ? undefined : { animationDelay: `${index * -1.7}s` }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   La ficha se hunde, no se levanta.

   Toda tarjeta con inclinacion rota HACIA el cursor; esta se va abajo suyo.
   Un signo menos, y es la diferencia entre una superficie que se te muestra y
   una que estas tocando.
-------------------------------------------------------------------------- */
function TiltCard({
  reduced,
  children,
}: {
  reduced: boolean;
  children: React.ReactNode;
}) {
  const spring = { stiffness: 220, damping: 18, mass: 0.5 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduced) return;
      const r = e.currentTarget.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      rotateX.set(-ny * RING.sink);
      rotateY.set(nx * RING.sink);
    },
    [reduced, rotateX, rotateY],
  );

  const reset = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

export function ProjectDeck() {
  const t = useT();
  const featured = useFeaturedProjects();
  const items = useMemo<DeckItem[]>(
    () => [
      { kind: "profile", key: "profile" },
      ...featured.map((project) => ({
        kind: "project" as const,
        key: project.slug,
        project,
      })),
    ],
    [featured],
  );

  const reduced = useReducedMotion() ?? false;
  const count = items.length;

  // Posicion angular continua. No se acota ni se envuelve: el anillo puede
  // girar indefinidamente en cualquiera de los dos sentidos.
  const turn = useMotionValue(0);
  const [current, setCurrent] = useState(0);

  // Ultimo destino pedido. Los pasos se cuentan contra esto y no contra la
  // posicion en vuelo: si no, apretar la flecha varias veces seguidas redondea
  // un valor que todavia se esta moviendo y se pierden pasos por el camino.
  const target = useRef(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const [orbit, setOrbit] = useState(RING.orbitMin);
  const drag = useRef<{
    id: number;
    x: number;
    turn: number;
    live: boolean;
  } | null>(null);
  const headingId = useId();

  // el radio sigue al ancho del marco, para que las vecinas no se coman a la
  // ficha del frente en pantallas angostas
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () =>
      setOrbit(
        Math.min(
          RING.orbitMax,
          Math.max(RING.orbitMin, el.clientWidth * RING.orbitRatio),
        ),
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // el indice redondeado es lo que leen el contador, los puntos y el lector de
  // pantalla; la geometria sigue usando el valor continuo
  useEffect(() => {
    const sync = (v: number) => {
      const i = ((Math.round(v) % count) + count) % count;
      setCurrent((prev) => (prev === i ? prev : i));
    };
    sync(turn.get());
    return turn.on("change", sync);
  }, [turn, count]);

  const settle = useCallback(
    (to: number) => {
      target.current = to;
      animate(turn, to, reduced ? { duration: 0.2 } : SETTLE);
    },
    [turn, reduced],
  );

  const step = useCallback(
    (delta: number) => settle(target.current + delta),
    [settle],
  );

  /** Va a una ficha concreta por el lado mas corto del anillo. */
  const goTo = useCallback(
    (i: number) => {
      const from = ((target.current % count) + count) % count;
      settle(target.current + ringOffset(i, from, count));
    },
    [count, settle],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      }
    },
    [goTo, step],
  );

  // Arrastre continuo: el anillo sigue al puntero en vez de saltar por umbral.
  // No bloquea el scroll vertical de la pagina.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      turn: turn.get(),
      live: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = drag.current;
    if (!st || st.id !== e.pointerId) return;
    const dx = e.clientX - st.x;

    // La captura se toma recien cuando el puntero se movio de verdad: asi un
    // clic sobre una ficha del fondo sigue siendo un clic y la trae al frente.
    // Una vez tomada, los eventos dejan de mirar sobre que hijo esta el
    // puntero, que es lo que cortaba el arrastre a los pocos pixeles.
    if (!st.live) {
      if (Math.abs(dx) < 4) return;
      st.live = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    turn.set(st.turn - dx / RING.pull);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = drag.current;
    if (!st) return;
    drag.current = null;
    if (!st.live) return; // fue un clic, no un arrastre
    if (e.currentTarget.hasPointerCapture(st.id)) {
      e.currentTarget.releasePointerCapture(st.id);
    }
    settle(Math.round(turn.get()));
  };

  const activeItem = items[current];
  const activeLabel =
    activeItem.kind === "profile" ? profile.name : activeItem.project.title;

  return (
    <div className="relative">
      {/* ---------------------------------------------------------------
          Desktop / tablet: el anillo
      --------------------------------------------------------------- */}
      <div
        ref={frameRef}
        role="group"
        aria-roledescription="galería de proyectos"
        aria-label="Proyectos destacados"
        aria-describedby={headingId}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative hidden h-[clamp(30rem,52vw,38rem)] cursor-grab select-none items-center justify-center [perspective:2200px] active:cursor-grabbing md:flex"
      >
        <p id={headingId} className="sr-only">
          {t("hero.deckHelp")} {count} · {activeLabel}
        </p>

        <div className="relative h-full w-full [transform-style:preserve-3d]">
          {items.map((item, i) => (
            <RingSlot
              key={item.key}
              index={i}
              count={count}
              turn={turn}
              orbit={orbit}
              reduced={reduced}
            >
              <TiltCard reduced={reduced}>
                <DeckCard
                  item={item}
                  isActive={i === current}
                  onSelect={() => goTo(i)}
                />
              </TiltCard>
            </RingSlot>
          ))}
        </div>

        {/* contador, arriba a la derecha, como en un visor */}
        <div className="pointer-events-none absolute right-0 top-2 hidden items-center gap-3 lg:flex">
          <span className="eyebrow tabular-nums">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-16 bg-line" aria-hidden="true">
            <motion.span
              className="block h-px bg-copper"
              animate={{ scaleX: (current + 1) / count }}
              style={{ originX: 0 }}
              transition={transitions.quick}
            />
          </span>
          <span className="eyebrow tabular-nums text-sand/50">
            {String(count).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* controles */}
      <div className="mt-6 hidden items-center justify-center gap-7 md:flex">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={t("hero.prev")}
          className="p-2 text-sand transition-colors hover:text-copper"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2.5">
          {items.map((item, i) => (
            <button
              key={item.key}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a ${
                item.kind === "profile" ? profile.name : item.project.title
              }`}
              aria-current={i === current}
              className="group py-2"
            >
              <span
                className={cn(
                  "block h-px transition-all duration-500",
                  i === current
                    ? "w-9 bg-copper"
                    : "w-4 bg-line group-hover:bg-sand",
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label={t("hero.next")}
          className="p-2 text-sand transition-colors hover:text-copper"
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      {/* ---------------------------------------------------------------
          Mobile: carrusel horizontal con snap, sin 3D
      --------------------------------------------------------------- */}
      <div className="md:hidden">
        <ul className="no-scrollbar snap-x-mandatory -mx-5 flex gap-4 overflow-x-auto px-5 pb-4">
          {items.map((item) => (
            <li
              key={item.key}
              className="snap-center-always w-[78vw] shrink-0 last:mr-5"
            >
              <DeckCard item={item} isActive onSelect={() => {}} compact />
            </li>
          ))}
        </ul>
        <p className="eyebrow mt-2 text-balance px-2 text-center text-sand/50">
          {t("hero.swipeHint")}
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   Tarjeta
========================================================================== */

type DeckCardProps = {
  item: DeckItem;
  isActive: boolean;
  onSelect: () => void;
  compact?: boolean;
};

function DeckCard({ item, isActive, onSelect, compact }: DeckCardProps) {
  if (item.kind === "profile") {
    return (
      <ProfileCard isActive={isActive} onSelect={onSelect} compact={compact} />
    );
  }
  return (
    <ProjectCard
      project={item.project}
      isActive={isActive}
      onSelect={onSelect}
      compact={compact}
    />
  );
}

/**
 * El detalle de la ficha: se abre y se cierra sin saltos.
 *
 * Antes se montaba y se desmontaba de golpe, y la ficha crecia 94 px en un
 * solo cuadro justo mientras el anillo giraba suave. El ojo veia el salto, no
 * el giro.
 *
 * La altura se mide aca con `scrollHeight` y no se deja en manos de una
 * animacion a `height: auto`. Esas miden con `getBoundingClientRect`, que
 * viene con la escala del anillo encima: adentro de una ficha agrandada 1.10
 * medían 177 px donde habia 161, animaban hasta ahi y al terminar se
 * desinflaban 16 px de golpe. `scrollHeight` es espacio de layout, asi que la
 * escala del padre deja de importar.
 *
 * Tampoco sirve el truco de grilla `0fr` a `1fr`: no interpola en pixeles
 * —cualquier fraccion mayor que cero ya resuelve a la altura del contenido—,
 * asi que la duracion que uno escribe no es la que se ve.
 *
 * Cerrado sigue estando en el DOM, asi que va `inert`: sin eso el enlace de
 * adentro seguiria recibiendo foco con el tabulador estando invisible.
 */
function Detail({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const measure = () => setFull(el.scrollHeight);
    measure();
    // el contenido cambia de alto al cambiar de idioma
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={!open}
      aria-hidden={!open}
      className="overflow-hidden transition-[height] duration-[560ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
      style={{ height: open ? (full ?? "auto") : 0 }}
    >
      <div
        ref={inner}
        className="transition-opacity"
        // al abrir, el texto entra cuando ya hay lugar; al cerrar se va
        // primero, para no verlo aplastarse
        style={{
          opacity: open ? 1 : 0,
          transitionDuration: open ? "420ms" : "160ms",
          transitionDelay: open ? "170ms" : "0ms",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function CardShell({
  children,
  isActive,
  onSelect,
  interactive,
  label,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onSelect: () => void;
  interactive: boolean;
  label: string;
}) {
  return (
    // Siempre el mismo elemento. Antes era un `button` mientras la ficha
    // estaba atras y un `div` cuando llegaba al frente, y ese cambio
    // desmontaba la ficha entera en cada giro: la imagen volvia a montarse y
    // cualquier animacion de adentro arrancaba de cero. La zona de clic vive
    // ahora en una capa aparte, que aparece y desaparece sin arrastrar al
    // resto.
    <div
      className={cn(
        "relative w-full overflow-hidden text-left transition-[border-color,box-shadow] duration-700",
        isActive ? "glass-strong" : "glass",
      )}
    >
      {children}

      {/* velo sobre las fichas que no estan al frente: refuerza la jerarquia
          sin depender solo del desenfoque */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-10 rounded-[var(--radius-card)] bg-ink/40 transition-opacity duration-700",
          isActive ? "opacity-0" : "opacity-100",
        )}
      />

      {interactive && !isActive && (
        <button
          type="button"
          onClick={onSelect}
          aria-label={label}
          className="absolute inset-0 z-20"
        />
      )}
    </div>
  );
}

function ProfileCard({
  isActive,
  onSelect,
  compact,
}: {
  isActive: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  const t = useT();
  const portrait = assets["portrait/matias-portrait"];
  const roleLines = t("hero.roleLines").split("|");

  return (
    <CardShell
      isActive={isActive}
      onSelect={onSelect}
      interactive={!compact}
      label={`Ir a ${profile.name}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)]">
        <Image
          src={portrait.src}
          alt="Retrato de Matías Colimodio"
          fill
          sizes="(max-width: 768px) 78vw, 25rem"
          placeholder="blur"
          blurDataURL={portrait.blurDataURL}
          className="object-cover object-top"
          // la imagen es parte de la ficha, no un archivo suelto: sin esto el
          // navegador arranca su propio arrastre y le roba el del anillo
          draggable={false}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="eyebrow eyebrow-copper">{t("hero.role")}</span>
          <div className="mt-3 h-px w-10 bg-copper" aria-hidden="true" />
          <ul className="mt-3 space-y-1 text-sm text-parchment/72">
            {roleLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <Detail open={isActive}>
            <Link
              href="/#about"
              className="link-underline mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-copper"
            >
              {t("hero.viewProfile")}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </Detail>
        </div>
      </div>
    </CardShell>
  );
}

function ProjectCard({
  project,
  isActive,
  onSelect,
  compact,
}: {
  project: Project;
  isActive: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  const t = useT();
  const img = assets[project.heroImage];
  // `compact` es opcional, y `Detail` necesita un booleano de verdad
  const showDetail = isActive || compact === true;

  return (
    <CardShell
      isActive={isActive}
      onSelect={onSelect}
      interactive={!compact}
      label={`Ir a ${project.title}`}
    >
      {/* trama de plano técnico de fondo */}
      <div
        className="blueprint absolute inset-0 rounded-[var(--radius-card)] opacity-60"
        aria-hidden="true"
      />

      <div className="relative p-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="eyebrow eyebrow-copper">{project.category}</span>
          <span className="eyebrow tabular-nums text-sand/45">
            {project.index}
          </span>
        </div>

        <h3 className="mt-2 font-display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.1] text-parchment">
          {project.title}
        </h3>

        <Detail open={showDetail}>
          {/* relleno y no margen: el margen del primer hijo se escapa del
              bloque al medirlo y la altura final no coincide con la medida */}
          <p className="pt-1.5 text-xs leading-relaxed text-sand/70">
            {project.description}
          </p>
        </Detail>

        <div
          className={cn(
            "surface relative mt-4",
            project.heroCutout ? "aspect-[16/10]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={img.src}
            alt=""
            fill
            sizes="(max-width: 768px) 78vw, 25rem"
            placeholder="blur"
            blurDataURL={img.blurDataURL}
            className={cn(
              project.heroCutout
                ? "object-contain p-3 drop-shadow-[0_18px_28px_rgba(0,0,0,0.65)]"
                : "object-cover",
            )}
            draggable={false}
          />
          {project.status === "concept" && (
            <span className="absolute left-3 top-3 rounded-[var(--radius-chip)] border border-copper/45 bg-ink/80 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-copper backdrop-blur-sm">
              Concept
            </span>
          )}
        </div>

        <Detail open={showDetail}>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-4">
            {project.year && (
              <Spec label={t("spec.year")} value={project.year} />
            )}
            <Spec label={t("spec.type")} value={project.category} />
            <Spec
              label={t("spec.tools")}
              value={project.tools.slice(0, 2).join(", ")}
            />
            {project.materials && (
              <Spec
                label={t("spec.materials")}
                value={project.materials.slice(0, 2).join(", ")}
              />
            )}
          </dl>

          <div className="mt-5 border-t border-line-soft pt-4">
            <Link
              href={`/work/${project.slug}`}
              className="group flex items-center justify-between gap-3"
            >
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-parchment transition-colors group-hover:text-copper">
                {t("hero.openCase")}
              </span>
              <ArrowRight
                className="size-4 text-copper transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Detail>
      </div>
    </CardShell>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-sand/45">
        {label}
      </dt>
      <dd className="mt-0.5 text-xs leading-snug text-parchment/85">{value}</dd>
    </div>
  );
}
