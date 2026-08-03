"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

/** Cuánto se degrada una tarjeta según su distancia a la activa. */
function depthStyle(offset: number, reduced: boolean) {
  const distance = Math.min(Math.abs(offset), 4);
  const sign = Math.sign(offset);

  if (reduced) {
    // sin perspectiva ni desenfoque: sólo separación y opacidad
    return {
      x: `${offset * 62}%`,
      scale: distance === 0 ? 1 : 0.86,
      rotateY: 0,
      z: 0,
      opacity: distance === 0 ? 1 : distance > 2 ? 0 : 0.45,
      filter: "blur(0px)",
    };
  }

  // todas las tarjetas miden lo mismo: la activa crece por escala, así el
  // desplazamiento en % sigue siendo comparable entre fichas
  const scaleByDistance = [1.12, 0.92, 0.82, 0.74, 0.7];

  return {
    // la primera vecina se separa lo suficiente como para no quedar debajo de
    // la activa; las siguientes se acercan entre sí y dan sensación de fuga
    x: `${sign * (distance === 0 ? 0 : 86 + (distance - 1) * 28)}%`,
    scale: scaleByDistance[distance],
    rotateY: -sign * (distance === 0 ? 0 : 23 + (distance - 1) * 3),
    z: -distance * 160,
    opacity: distance > 3 ? 0 : 1 - distance * 0.13,
    filter: `blur(${distance === 0 ? 0 : 1.4 + (distance - 1) * 1.5}px)`,
  };
}

/** Distancia mínima entre dos posiciones de un anillo de `n` elementos. */
function ringOffset(i: number, active: number, n: number) {
  let offset = (((i - active) % n) + n) % n; // 0..n-1
  if (offset > n / 2) offset -= n; // -n/2..n/2
  return offset;
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
  // el índice no se acota: la baraja es un anillo, así que puede crecer o
  // bajar indefinidamente y el resto se calcula con módulo
  const [active, setActive] = useState(0); // arranca en la ficha de perfil
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; moved: boolean } | null>(null);
  const headingId = useId();

  const count = items.length;
  const current = ((active % count) + count) % count;
  const go = useCallback((next: number) => setActive(next), []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(active + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(active - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        go(active - current);
      }
    },
    [active, current, go],
  );

  // arrastre con el puntero: no bloquea el scroll vertical de la página
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    dragState.current = { startX: e.clientX, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const st = dragState.current;
    if (!st) return;
    const dx = e.clientX - st.startX;
    if (Math.abs(dx) > 90) {
      go(active + (dx < 0 ? 1 : -1));
      dragState.current = { startX: e.clientX, moved: true };
    }
  };

  const endDrag = () => {
    dragState.current = null;
  };

  const activeItem = items[current];
  const activeLabel =
    activeItem.kind === "profile" ? profile.name : activeItem.project.title;

  return (
    <div className="relative">
      {/* ---------------------------------------------------------------
          Desktop / tablet: baraja con profundidad
      --------------------------------------------------------------- */}
      <div
        ref={containerRef}
        role="group"
        aria-roledescription="galería de proyectos"
        aria-label="Proyectos destacados"
        aria-describedby={headingId}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="relative hidden h-[clamp(30rem,52vw,38rem)] cursor-grab select-none items-center justify-center [perspective:2200px] active:cursor-grabbing md:flex"
      >
        <p id={headingId} className="sr-only">
          {t("hero.deckHelp")} {count} · {activeLabel}
        </p>

        <div className="relative h-full w-full [transform-style:preserve-3d]">
          {items.map((item, i) => {
            const offset = ringOffset(i, current, count);
            const isActive = offset === 0;
            const style = depthStyle(offset, reduced);

            return (
              // Dos capas a propósito: la de afuera centra la ficha y la de
              // adentro anima. Si el centrado y la animación viven en el mismo
              // elemento, `x` pisa a `translateX` (son el mismo valor en Framer
              // Motion) y todas las fichas terminan apiladas en el centro.
              <div
                key={item.key}
                className="absolute left-1/2 top-1/2 w-[clamp(17.5rem,25vw,22rem)] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
                style={{
                  zIndex: 50 - Math.abs(offset),
                  pointerEvents: Math.abs(offset) > 3 ? "none" : "auto",
                }}
              >
                <motion.div
                  className="[transform-style:preserve-3d]"
                  animate={style}
                  transition={reduced ? transitions.quick : transitions.deck}
                >
                  <DeckCard
                    item={item}
                    isActive={isActive}
                    onSelect={() => go(active + offset)}
                  />
                </motion.div>
              </div>
            );
          })}
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
          onClick={() => go(active - 1)}
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
              onClick={() => go(active + ringOffset(i, current, count))}
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
          onClick={() => go(active + 1)}
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
    return <ProfileCard isActive={isActive} onSelect={onSelect} compact={compact} />;
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

function CardShell({
  children,
  isActive,
  onSelect,
  interactive,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onSelect: () => void;
  interactive: boolean;
}) {
  const className = cn(
    "relative w-full overflow-hidden text-left transition-shadow duration-700",
    isActive ? "glass-strong" : "glass",
  );

  // velo sobre las fichas que no están activas: refuerza la jerarquía sin
  // depender sólo del desenfoque
  const scrim = !isActive && (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 rounded-[var(--radius-card)] bg-ink/40"
    />
  );

  if (interactive && !isActive) {
    return (
      <button type="button" onClick={onSelect} className={cn(className, "block")}>
        {children}
        {scrim}
      </button>
    );
  }

  return (
    <div className={className}>
      {children}
      {scrim}
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
    <CardShell isActive={isActive} onSelect={onSelect} interactive={!compact}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)]">
        <Image
          src={portrait.src}
          alt="Retrato de Matías Colimodio"
          fill
          sizes="(max-width: 768px) 78vw, 25rem"
          placeholder="blur"
          blurDataURL={portrait.blurDataURL}
          className="object-cover object-top"
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
          {isActive && (
            <Link
              href="/#about"
              className="link-underline mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-copper"
            >
              {t("hero.viewProfile")}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          )}
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
  const showDetail = isActive || compact;

  return (
    <CardShell isActive={isActive} onSelect={onSelect} interactive={!compact}>
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

        {showDetail && (
          <p className="mt-1.5 text-xs leading-relaxed text-sand/70">
            {project.description}
          </p>
        )}

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
          />
          {project.status === "concept" && (
            <span className="absolute left-3 top-3 rounded-[var(--radius-chip)] border border-copper/45 bg-ink/80 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-copper backdrop-blur-sm">
              Concept
            </span>
          )}
        </div>

        {showDetail && (
          <>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {project.year && <Spec label={t("spec.year")} value={project.year} />}
              <Spec label={t("spec.type")} value={project.category} />
              <Spec label={t("spec.tools")} value={project.tools.slice(0, 2).join(", ")} />
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
          </>
        )}
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
