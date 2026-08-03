"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { assets } from "@/data/assets.generated";
import { cn } from "@/lib/cn";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useT } from "@/i18n/LocaleProvider";
import { useProjects } from "@/i18n/useContent";

/** Índice completo de proyectos, debajo de la galería del hero. */
export function ProjectIndex() {
  const t = useT();
  const projects = useProjects();

  return (
    <section id="index" className="section-y relative scroll-mt-24">
      <div className="shell">
        <SectionHeading
          eyebrow={t("index.eyebrow")}
          title={t("index.title")}
          intro={t("index.intro")}
        />

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 md:gap-5 lg:grid-cols-3">
          {projects.map((project) => {
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
