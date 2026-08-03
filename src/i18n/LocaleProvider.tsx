"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  LOCALE_STORAGE_KEY,
  defaultLocale,
  detectLocale,
  isLocale,
  localeMeta,
  type Locale,
} from "./config";
import { translate, type UiKey } from "./ui";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: UiKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Estado de idioma del sitio.
 *
 * El servidor siempre renderiza en español, que es el idioma fuente: así el
 * HTML inicial es válido y los buscadores ven contenido real. Al montar, el
 * cliente aplica la preferencia guardada o la del navegador.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) {
      setLocaleState(stored);
      return;
    }
    setLocaleState(detectLocale(navigator.languages ?? [navigator.language]));
  }, []);

  // mantiene el atributo lang del documento en sincronía con el idioma elegido
  useEffect(() => {
    document.documentElement.lang = localeMeta[locale].htmlLang;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // modo privado o almacenamiento bloqueado: el idioma dura la sesión
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key: UiKey) => translate(locale, key),
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale debe usarse dentro de <LocaleProvider>");
  }
  return ctx;
}

/** Atajo para componentes que sólo necesitan traducir. */
export function useT() {
  return useLocale().t;
}
