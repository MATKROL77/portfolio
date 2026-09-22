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
 * El sitio abre en inglés y el servidor ya renderiza así, para que no haya un
 * parpadeo de un idioma al otro. Al montar, el cliente sólo aplica la
 * preferencia guardada si el visitante eligió alguna vez; el idioma del
 * navegador no se consulta (ver `config.ts`).
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isLocale(stored)) setLocaleState(stored);
    } catch {
      // almacenamiento bloqueado: se queda en el idioma con el que abre
    }
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
