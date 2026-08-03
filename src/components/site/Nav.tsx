"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/cn";
import { useT } from "@/i18n/LocaleProvider";
import type { UiKey } from "@/i18n/ui";
import { LanguageSwitcher } from "./LanguageSwitcher";

const sections: { href: string; key: UiKey }[] = [
  { href: "/#selected-work", key: "nav.selectedWork" },
  { href: "/#web-products", key: "nav.webProducts" },
  { href: "/#process", key: "nav.process" },
  { href: "/#about", key: "nav.about" },
  { href: "/#contact", key: "nav.contact" },
];

export function Nav() {
  const pathname = usePathname();
  const t = useT();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // cierra el menú móvil al cambiar de ruta y con Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-700",
        scrolled && "bg-ink/70 backdrop-blur-xl",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-3 md:h-20 md:gap-6">
        {/* En pantallas chicas el nombre se acorta: con el interletrado ancho,
            el nombre completo empuja el menú fuera del viewport a 375 px. */}
        <Link
          href="/"
          aria-label="Matías Colimodio, inicio"
          className="font-display tracking-[0.28em] text-parchment transition-colors hover:text-copper sm:tracking-[0.34em]"
        >
          <span className="text-sm sm:hidden">MATÍAS C.</span>
          <span className="hidden text-sm sm:inline md:text-base">
            MATÍAS COLIMODIO
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {sections.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="eyebrow link-underline">
                    {t(s.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageSwitcher />

          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-[var(--radius-chip)] border border-line px-3.5 py-2 lg:hidden"
          >
            {open ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
            <span className="eyebrow hidden sm:inline">
              {open ? t("nav.close") : t("nav.menu")}
            </span>
          </button>
        </div>
      </div>

      {/* progreso de lectura */}
      <div className="relative h-px w-full bg-line-faint">
        <motion.div
          className="h-px origin-left bg-copper/70"
          style={{ scaleX: reduced ? scrollYProgress : progress }}
          aria-hidden="true"
        />
      </div>

      {open && (
        <nav
          id="menu-movil"
          aria-label="Principal móvil"
          className="glass-strong mx-4 mt-2 !rounded-[var(--radius-panel)] lg:hidden"
        >
          <ul className="flex flex-col px-5 py-2">
            {sections.map((s) => (
              <li key={s.href} className="border-b border-line-faint last:border-0">
                <Link
                  href={s.href}
                  className="block py-4 font-display text-2xl text-parchment"
                >
                  {t(s.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
