"use client";

import { useMemo } from "react";

import { education, experience, processSteps, profile, skills } from "@/data/cv";
import {
  projects,
  webProducts,
  type GalleryItem,
  type Project,
  type WebProduct,
} from "@/data/portfolio";
import type { Locale } from "./config";
import { useLocale } from "./LocaleProvider";
import { contentEn } from "./content.en";
import { contentPt } from "./content.pt";
import type { ContentBundle } from "./content.types";

const bundles: Partial<Record<Locale, ContentBundle>> = {
  en: contentEn,
  pt: contentPt,
};

/** Devuelve el primer valor definido; así lo no traducido cae al español. */
function pick<T>(translated: T | undefined, original: T): T {
  return translated ?? original;
}

function localizeProject(project: Project, bundle?: ContentBundle): Project {
  const o = bundle?.projects?.[project.slug];
  if (!o) return project;

  const gallery: GalleryItem[] = project.gallery.map((item) => {
    const g = o.gallery?.[item.image];
    if (!g) return item;
    return {
      ...item,
      alt: pick(g.alt, item.alt),
      caption: g.caption ?? item.caption,
    };
  });

  return {
    ...project,
    title: pick(o.title, project.title),
    category: pick(o.category, project.category),
    description: pick(o.description, project.description),
    summary: pick(o.summary, project.summary),
    role: pick(o.role, project.role),
    year: pick(o.year, project.year),
    problem: pick(o.problem, project.problem),
    result: pick(o.result, project.result),
    reflection: pick(o.reflection, project.reflection),
    disclaimer: pick(o.disclaimer, project.disclaimer),
    tags: pick(o.tags, project.tags),
    tools: pick(o.tools, project.tools),
    materials: pick(o.materials, project.materials),
    process: pick(o.process, project.process),
    specs: pick(o.specs, project.specs),
    gallery,
  };
}

/** Todos los proyectos en el idioma activo. */
export function useProjects(): Project[] {
  const { locale } = useLocale();
  return useMemo(() => {
    const bundle = bundles[locale];
    return projects.map((p) => localizeProject(p, bundle));
  }, [locale]);
}

export function useProject(slug: string): Project | undefined {
  return useProjects().find((p) => p.slug === slug);
}

export function useFeaturedProjects(): Project[] {
  return useProjects().filter((p) => p.featured);
}

export function useWebProducts(): WebProduct[] {
  const { locale } = useLocale();
  return useMemo(() => {
    const bundle = bundles[locale];
    return webProducts.map((product) => {
      const o = bundle?.webProducts?.[product.slug];
      if (!o) return product;
      return {
        ...product,
        role: pick(o.role, product.role),
        blurb: pick(o.blurb, product.blurb),
      };
    });
  }, [locale]);
}

/** CV completo en el idioma activo. */
export function useCv() {
  const { locale } = useLocale();

  return useMemo(() => {
    const o = bundles[locale]?.cv;

    return {
      profile: {
        ...profile,
        headline: pick(o?.profile?.headline, profile.headline),
        summary: pick(o?.profile?.summary, profile.summary),
      },
      education: education.map((item) => {
        const t = o?.education?.[item.institution];
        return {
          ...item,
          detail: pick(t?.detail, item.detail),
          period: pick(t?.period, item.period),
          note: pick(t?.note, item.note),
          highlights: pick(t?.highlights, item.highlights),
        };
      }),
      experience: experience.map((item) => {
        const t = o?.experience?.[item.title];
        return {
          ...item,
          title: pick(t?.title, item.title),
          org: pick(t?.org, item.org),
          period: pick(t?.period, item.period),
          body: pick(t?.body, item.body),
          bullets: pick(t?.bullets, item.bullets),
          outcome: pick(t?.outcome, item.outcome),
        };
      }),
      skills: skills.map((group) => {
        const t = o?.skills?.[group.area];
        return {
          ...group,
          area: pick(t?.area, group.area),
          items: pick(t?.items, group.items),
        };
      }),
      processSteps: processSteps.map((step) => {
        const t = o?.process?.[step.number];
        return {
          ...step,
          title: pick(t?.title, step.title),
          body: pick(t?.body, step.body),
        };
      }),
      /** párrafos largos del resumen de perfil */
      profileParagraphs: o?.profileParagraphs,
      /** traducciones sueltas usadas en las fichas rápidas */
      fact: (value: string) => o?.facts?.[value] ?? value,
      capability: (spanishTitle: string) => o?.capabilities?.[spanishTitle],
    };
  }, [locale]);
}
