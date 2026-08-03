import type { Locale } from "./config";

/**
 * Traducciones del contenido.
 *
 * El español vive en `src/data/portfolio.ts` y `src/data/cv.ts`, y es el
 * original. Acá van sólo las diferencias por idioma: lo que falte cae al
 * español automáticamente, así una traducción incompleta nunca deja huecos.
 */

export type ProjectOverride = {
  title?: string;
  category?: string;
  description?: string;
  summary?: string;
  role?: string;
  year?: string;
  problem?: string;
  result?: string;
  reflection?: string;
  disclaimer?: string;
  tags?: string[];
  tools?: string[];
  materials?: string[];
  process?: { title: string; body: string }[];
  specs?: { label: string; value: string }[];
  /** por clave de asset, para no depender del orden de la galería */
  gallery?: Record<string, { alt?: string; caption?: string }>;
};

export type WebProductOverride = {
  role?: string;
  blurb?: string;
};

export type CvOverride = {
  profile?: {
    headline?: string;
    summary?: string;
  };
  education?: Record<
    string,
    { detail?: string; note?: string; highlights?: string[]; period?: string }
  >;
  experience?: Record<
    string,
    {
      title?: string;
      org?: string;
      period?: string;
      body?: string;
      bullets?: string[];
      outcome?: string;
    }
  >;
  skills?: Record<string, { area?: string; items?: string[] }>;
  process?: Record<string, { title?: string; body?: string }>;
  capabilities?: Record<string, { title?: string; body?: string }>;
  facts?: Record<string, string>;
  profileParagraphs?: string[];
};

export type ContentBundle = {
  projects?: Record<string, ProjectOverride>;
  webProducts?: Record<string, WebProductOverride>;
  cv?: CvOverride;
};

export type ContentOverrides = Partial<Record<Locale, ContentBundle>>;
