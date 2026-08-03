/**
 * Idiomas del sitio.
 *
 * El español es el idioma fuente: todo el contenido existe en `es` y las otras
 * traducciones se superponen encima. Si a una traducción le falta una clave,
 * cae de vuelta al español en lugar de mostrar un hueco.
 */

export const locales = ["es", "en", "pt"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const localeMeta: Record<
  Locale,
  { label: string; short: string; htmlLang: string }
> = {
  es: { label: "Español", short: "ES", htmlLang: "es" },
  en: { label: "English", short: "EN", htmlLang: "en" },
  pt: { label: "Português (BR)", short: "PT", htmlLang: "pt-BR" },
};

export const LOCALE_STORAGE_KEY = "mc-locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Elige el idioma inicial a partir del navegador. */
export function detectLocale(languages: readonly string[]): Locale {
  for (const lang of languages) {
    const base = lang.toLowerCase().split("-")[0];
    if (base === "pt") return "pt";
    if (base === "en") return "en";
    if (base === "es") return "es";
  }
  return defaultLocale;
}
