/**
 * Idiomas del sitio.
 *
 * El español sigue siendo el idioma FUENTE: todo el contenido existe en `es` y
 * las otras traducciones se superponen encima. Si a una traducción le falta
 * una clave, cae de vuelta al español en lugar de mostrar un hueco.
 *
 * Pero el sitio ABRE en inglés, que es otra cosa. Apunta a empresas donde el
 * primero que lo mira puede no hablar español, y una página que arranca en un
 * idioma que el visitante no lee se cierra antes de la primera línea. El que
 * prefiera otro lo cambia en la barra, y esa elección se recuerda.
 *
 * No se mira el idioma del navegador a propósito: si se mirara, media
 * audiencia abriría en español y la decisión de arriba no existiría.
 */

export const locales = ["es", "en", "pt"] as const;

export type Locale = (typeof locales)[number];

/** En el que abre el sitio. El contenido fuente sigue siendo `es`. */
export const defaultLocale: Locale = "en";

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

