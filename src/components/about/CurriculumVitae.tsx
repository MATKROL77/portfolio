"use client";

import { Download } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useT } from "@/i18n/LocaleProvider";
import { useCv } from "@/i18n/useContent";

/**
 * CV completo. Todo el contenido va en texto plano y visible: nada de
 * información importante escondida detrás de una animación o un acordeón.
 */
export function CurriculumVitae() {
  const t = useT();
  const { profile, education, experience, skills } = useCv();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative scroll-mt-24 section-y"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={t("cv.eyebrow")}
          id="about-title"
          title={t("cv.title")}
          intro={profile.summary}
        />

        <div className="mt-12 grid gap-10 md:mt-16 md:gap-12 lg:grid-cols-12 lg:gap-10">
          {/* --- experiencia --------------------------------------------- */}
          <div className="lg:col-span-7">
            <h3 className="eyebrow eyebrow-copper">{t("cv.experience")}</h3>

            <RevealGroup className="mt-7 space-y-4">
              {experience.map((item) => (
                <RevealItem key={item.title}>
                  <article className="glass p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-display text-xl leading-tight text-parchment">
                        {item.title}
                      </h4>
                      {item.period && (
                        <span className="font-mono text-xs text-copper/80">
                          {item.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-sand/60">{item.org}</p>
                    <p className="prose-editorial mt-4">{item.body}</p>

                    {item.bullets && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {item.bullets.map((b) => (
                          <li key={b} className="chip">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.outcome && (
                      <p className="mt-4 border-l-2 border-copper/50 pl-4 text-sm leading-relaxed text-parchment/85">
                        {item.outcome}
                      </p>
                    )}
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* --- educación e idiomas -------------------------------------- */}
          <div className="lg:col-span-5">
            <h3 className="eyebrow eyebrow-copper">{t("cv.education")}</h3>

            <RevealGroup className="mt-7 space-y-4">
              {education.map((item) => (
                <RevealItem key={item.institution}>
                  <article className="glass p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-display text-lg leading-tight text-parchment">
                        {item.institution}
                      </h4>
                      {item.period && (
                        <span className="font-mono text-xs text-copper/80">
                          {item.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-sand/70">{item.detail}</p>

                    {item.highlights && (
                      <ul className="mt-4 space-y-1.5">
                        {item.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2.5 text-sm text-parchment/80"
                          >
                            <span
                              className="mt-2 size-1 shrink-0 rounded-full bg-copper"
                              aria-hidden="true"
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.note && (
                      <p className="mt-4 text-sm leading-relaxed text-sand/65">
                        {item.note}
                      </p>
                    )}
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* --- habilidades ------------------------------------------------ */}
        <div className="mt-12 md:mt-16">
          <h3 className="eyebrow eyebrow-copper">{t("cv.skills")}</h3>

          <RevealGroup className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <RevealItem key={group.area} className="h-full">
                <div className="glass h-full p-5 sm:p-6">
                  <h4 className="font-display text-lg text-parchment">
                    {group.area}
                  </h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center gap-4">
          <a href="/cv" className="btn">
            {t("cv.viewPage")}
          </a>
          <a href="/cv/matias-colimodio-cv.pdf" download className="btn btn-solid">
            <Download className="size-4" aria-hidden="true" />
            {t("cv.downloadPdf")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
