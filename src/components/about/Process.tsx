"use client";

import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useT } from "@/i18n/LocaleProvider";
import { useCv } from "@/i18n/useContent";

/** Proceso de trabajo en cinco etapas. */
export function Process() {
  const t = useT();
  const { processSteps } = useCv();

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative scroll-mt-24 py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={t("process.eyebrow")}
          id="process-title"
          title={t("process.title")}
          intro={t("process.intro")}
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => (
            <RevealItem key={step.number} className="h-full">
              <div className="glass relative flex h-full flex-col p-6">
                {/* diagrama mínimo: la línea que avanza de etapa en etapa */}
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="size-1.5 rounded-full bg-copper" />
                  <span className="h-px flex-1 bg-line-soft" />
                  {i === processSteps.length - 1 && (
                    <span className="size-1.5 rounded-full bg-copper/50" />
                  )}
                </div>

                <p className="mt-6 font-mono text-xs tabular-nums text-copper/80">
                  {step.number}
                </p>
                <h3 className="mt-2 font-display text-xl uppercase tracking-[0.04em] text-parchment">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sand/70">
                  {step.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
