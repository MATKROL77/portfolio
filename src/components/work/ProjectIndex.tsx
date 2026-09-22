"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { assets } from "@/data/assets.generated";
import { skills } from "@/data/cv";
import { cn } from "@/lib/cn";
import { Checklist, type ChecklistItem } from "@/components/site/Checklist";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useT } from "@/i18n/LocaleProvider";
import { useProjects } from "@/i18n/useContent";

/**
 * Índice completo de proyectos, debajo de la galería del hero.
 *
 * El filtro por herramienta sale de los propios datos: no hay una lista de
 * categorías escrita a mano en ningún lado. Entra una herramienta si aparece
 * en dos proyectos o más, o si está declarada como habilidad en el CV.
 *
 * Esa segunda condición existe por Solid Edge: aparece en un solo proyecto, y
 * es justo la que alguien que busca un perfil de CAD va a querer tildar. Un
 * filtro que deja afuera el término que la gente busca no sirve de nada.
 *
 * Sin nada marcado se ven todos. Marcando varias se ven los que usan
 * cualquiera de ellas, que para siete proyectos es más útil que exigirlas
 * todas juntas.
 */
export function ProjectIndex() {
  const t = useT();
  const projects = useProjects();
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());

  const tools = useMemo<ChecklistItem[]>(() => {
    const tally = new Map<string, number>();
    for (const p of projects) {
      for (const tool of p.tools) tally.set(tool, (tally.get(tool) ?? 0) + 1);
    }
    const declared = new Set(skills.flatMap((group) => group.items));
    return [...tally.entries()]
      .filter(([tool, n]) => n > 1 || declared.has(tool))
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([id, n]) => ({ id, label: id, count: n }));
  }, [projects]);

  const shown = useMemo(
    () =>
      picked.size === 0
        ? projects
        : projects.filter((p) => p.tools.some((tool) => picked.has(tool))),
    [picked, projects],
  );

  const toggle = useCallback((id: string) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  }, []);

  return (
    <section id="index" className="section-y relative scroll-mt-24">
      <div className="shell">
        <SectionHeading
          eyebrow={t("index.eyebrow")}
          title={t("index.title")}
          intro={t("index.intro")}
        />

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 md:mt-10">
          <Checklist
            items={tools}
            selected={picked}
            onToggle={toggle}
            legend={t("index.filterLegend")}
          />
          {picked.size > 0 && (
            <button
              type="button"
              onClick={() => setPicked(new Set())}
              className="link-underline text-[0.7rem] font-medium uppercase tracking-[0.14em] text-sand/60 transition-colors hover:text-copper"
            >
              {t("index.filterClear")}
            </button>
          )}
        </div>

        <RevealGroup
          key={shown.map((p) => p.slug).join()}
          className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3"
        >
          {shown.map((project) => {
            const img = assets[project.heroImage];
            return (
              <RevealItem key={project.slug} className="h-full">
                <Link
                  href={`/work/${project.slug}`}
                  className="glass group relative flex h-full flex-col p-5 transition-all duration-500 hover:-translate-y-1 hover:border-copper/25 sm:p-6 md:p-7"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="eyebrow eyebrow-copper">
                      {project.category}
                    </span>
                    <span className="eyebrow tabular-nums text-sand/40">
                      {project.index}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "surface relative mt-5",
                      project.heroCutout ? "aspect-[16/10]" : "aspect-[4/3]",
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={`Portada del proyecto ${project.title}`}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      placeholder="blur"
                      blurDataURL={img.blurDataURL}
                      className={cn(
                        "transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
                        project.heroCutout
                          ? "object-contain p-3"
                          : "object-cover",
                      )}
                    />
                    {project.status === "concept" && (
                      <span className="absolute left-3 top-3 rounded-[var(--radius-chip)] border border-copper/45 bg-ink/80 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-copper backdrop-blur-sm">
                        Concept
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-display text-2xl leading-tight text-parchment">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-sand/70">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-parchment transition-colors group-hover:text-copper">
                    {t("hero.openCase")}
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
