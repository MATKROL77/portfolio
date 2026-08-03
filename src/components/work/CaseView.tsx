"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from "lucide-react";

import { assets } from "@/data/assets.generated";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/LocaleProvider";
import { useProjects, useWebProducts } from "@/i18n/useContent";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { CaseGallery } from "@/components/work/CaseGallery";
import { SitePanel } from "@/components/web/SitePanel";

/**
 * Cuerpo de la vista de caso. Es cliente porque el idioma se resuelve en el
 * navegador; la ruta y los metadatos siguen siendo de servidor.
 */
export function CaseView({ slug }: { slug: string }) {
  const t = useT();
  const projects = useProjects();
  const webProducts = useWebProducts();

  const position = projects.findIndex((p) => p.slug === slug);
  const project = projects[position];
  if (!project) return null;

  const hero = assets[project.heroImage];
  const next = projects[(position + 1) % projects.length];
  const webProduct = webProducts.find((w) => w.slug === project.slug);

  return (
    <article className="pb-24 pt-28 md:pt-32">
      {/* --- cabecera ---------------------------------------------------- */}
      <header className="shell">
        <Reveal>
          <Link
            href="/#index"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-sand/65 transition-colors hover:text-copper"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-500 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            {t("case.allProjects")}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="eyebrow eyebrow-copper">{project.category}</span>
            <span className="h-px w-6 bg-line" aria-hidden="true" />
            <span className="eyebrow tabular-nums text-sand/45">
              {project.index}
            </span>
            {project.status === "concept" && (
              <span className="chip border-copper/45 text-copper">Concept</span>
            )}
          </div>

          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.4rem,6.4vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-parchment">
            {project.title}
          </h1>

          <p className="prose-editorial mt-7 max-w-2xl">{project.summary}</p>
        </Reveal>

        {project.disclaimer && (
          <Reveal delay={0.05}>
            <p className="mt-7 flex max-w-2xl items-start gap-3 rounded-[var(--radius-inner)] border border-copper/25 bg-copper/[0.06] px-4 py-3.5 text-sm leading-relaxed text-sand/80">
              <Info
                className="mt-0.5 size-4 shrink-0 text-copper"
                aria-hidden="true"
              />
              {project.disclaimer}
            </p>
          </Reveal>
        )}
      </header>

      {/* --- imagen principal -------------------------------------------- */}
      <Reveal className="shell mt-12 md:mt-16">
        <div
          className={cn(
            "surface relative w-full",
            project.heroCutout
              ? "aspect-[16/9] bg-espresso/40 md:aspect-[21/9]"
              : "aspect-[4/3] md:aspect-[16/9]",
          )}
        >
          <Image
            src={hero.src}
            alt={project.title}
            fill
            sizes="(max-width: 1440px) 92vw, 84rem"
            placeholder="blur"
            blurDataURL={hero.blurDataURL}
            className={cn(
              project.heroCutout
                ? "object-contain p-6 drop-shadow-[0_28px_44px_rgba(0,0,0,0.7)] md:p-12"
                : "object-cover",
            )}
            priority
          />
        </div>
      </Reveal>

      {/* --- ficha técnica ------------------------------------------------ */}
      <section aria-label={t("case.sheet")} className="shell mt-12">
        <RevealGroup className="grid gap-px border-y border-line-faint bg-line-faint sm:grid-cols-2 lg:grid-cols-4">
          <SpecBlock label={t("spec.role")} value={project.role} />
          <SpecBlock label={t("spec.year")} value={project.year} />
          <SpecBlock label={t("spec.tools")} value={project.tools.join(" · ")} />
          <SpecBlock
            label={t("spec.materials")}
            value={project.materials?.join(" · ")}
          />
        </RevealGroup>
      </section>

      {/* --- problema / proceso / resultado -------------------------------- */}
      <div className="shell mt-20 grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] text-parchment">
              {t("case.problem")}
            </h2>
            <p className="prose-editorial mt-5">{project.problem}</p>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] text-parchment">
              {t("case.process")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-8">
            {project.process.map((step, i) => (
              <RevealItem key={step.title}>
                <div className="border-b border-line-faint py-6 last:border-0">
                  <div className="flex gap-5">
                    <span className="mt-1 font-mono text-xs tabular-nums text-copper/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg text-parchment">
                        {step.title}
                      </h3>
                      <p className="prose-editorial mt-2">{step.body}</p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-14">
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] text-parchment">
              {t("case.result")}
            </h2>
            <p className="prose-editorial mt-5">{project.result}</p>
          </Reveal>
        </div>

        {project.specs && (
          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal className="lg:sticky lg:top-28">
              <div className="glass p-6">
                <p className="eyebrow eyebrow-copper">{t("case.sheet")}</p>
                <dl className="mt-5 space-y-4">
                  {project.specs.map((row) => (
                    <div
                      key={row.label}
                      className="border-b border-line-faint pb-4 last:border-0 last:pb-0"
                    >
                      <dt className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-sand/45">
                        {row.label}
                      </dt>
                      <dd className="mt-1.5 text-sm text-parchment/88">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>
        )}
      </div>

      {/* --- módulo interactivo del producto web --------------------------- */}
      {webProduct && (
        <section aria-label={t("case.onScreen")} className="shell mt-20">
          <Reveal>
            <SitePanel product={webProduct} />
          </Reveal>
        </section>
      )}

      {/* --- galería ------------------------------------------------------- */}
      {project.gallery.length > 0 && (
        <section aria-labelledby="galeria" className="shell mt-20">
          <Reveal>
            <h2
              id="galeria"
              className="font-display text-[clamp(1.6rem,3vw,2.4rem)] text-parchment"
            >
              {t("case.record")}
            </h2>
            <p className="prose-editorial mt-4 max-w-2xl">
              {t("case.recordIntro")}
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <CaseGallery items={project.gallery} />
          </Reveal>
        </section>
      )}

      {/* --- reflexión ----------------------------------------------------- */}
      <section className="shell mt-20">
        <Reveal>
          <div className="glass-strong p-8 md:p-12">
            <p className="eyebrow eyebrow-copper">{t("case.takeaway")}</p>
            <p className="mt-6 max-w-3xl font-display text-[clamp(1.3rem,2.6vw,2rem)] font-light leading-[1.3] text-parchment/92">
              {project.reflection}
            </p>
          </div>
        </Reveal>
      </section>

      {/* --- navegación ----------------------------------------------------- */}
      <nav aria-label={t("case.allProjects")} className="shell mt-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line-faint pt-10">
            <Link
              href="/#index"
              className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-sand/65 transition-colors hover:text-copper"
            >
              <ArrowLeft
                className="size-4 transition-transform duration-500 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              {t("case.allProjects")}
            </Link>

            <Link href={`/work/${next.slug}`} className="group text-right">
              <span className="eyebrow block">{t("case.next")}</span>
              <span className="mt-1.5 flex items-center gap-3 font-display text-2xl text-parchment transition-colors group-hover:text-copper">
                {next.title}
                <ArrowRight
                  className="size-5 transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/#contact" className="btn btn-solid">
              {t("case.workTogether")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </nav>
    </article>
  );
}

function SpecBlock({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <RevealItem>
      <div className="h-full bg-ink px-1 py-6">
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-sand/45">
          {label}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-parchment/88">{value}</p>
      </div>
    </RevealItem>
  );
}
