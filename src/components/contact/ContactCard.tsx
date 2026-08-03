"use client";

import { ArrowUpRight, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";

import { contact, mailtoHrefWith, whatsappHrefWith } from "@/data/contact";
import { Reveal } from "@/components/site/Reveal";
import { useT } from "@/i18n/LocaleProvider";

/**
 * Cierre del sitio: una sola tarjeta grande con los dos canales directos.
 * Los enlaces abren WhatsApp y el cliente de correo del visitante; el sitio
 * no envía nada por su cuenta ni guarda datos de contacto de terceros.
 */
export function ContactCard() {
  const t = useT();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-24 pb-24 pt-8 md:pb-32"
    >
      <div className="shell">
        <Reveal>
          <div className="glass-strong relative overflow-hidden p-8 md:p-14 lg:p-16">
            {/* trama técnica y halo cálido, sólo decorativos */}
            <div
              className="blueprint pointer-events-none absolute inset-0 opacity-40"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(181,139,93,0.16),transparent)] blur-2xl"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-copper/70" aria-hidden="true" />
                <span className="eyebrow eyebrow-copper">
                  {t("contact.eyebrow")}
                </span>
              </div>

              <h2
                id="contact-title"
                className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,6vw,4.6rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-parchment"
              >
                {t("contact.title")}
              </h2>

              <p className="prose-editorial mt-6 max-w-2xl">
                {t("contact.intro")}
              </p>

              {/* --- los dos canales directos --------------------------- */}
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <a
                  href={whatsappHrefWith(t("contact.whatsappMessage"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group flex items-center gap-5 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-copper/30 md:p-7"
                >
                  <span
                    className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-inner)] border border-line-soft bg-moss/25 text-parchment transition-colors duration-500 group-hover:border-copper/40 group-hover:text-copper"
                    aria-hidden="true"
                  >
                    <MessageCircle className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block">{t("contact.whatsapp")}</span>
                    <span className="mt-1.5 block font-display text-2xl leading-tight text-parchment">
                      {contact.phoneLocal}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-copper transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={mailtoHrefWith(t("contact.emailSubject"))}
                  className="glass group flex items-center gap-5 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-copper/30 md:p-7"
                >
                  <span
                    className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-inner)] border border-line-soft bg-walnut/25 text-parchment transition-colors duration-500 group-hover:border-copper/40 group-hover:text-copper"
                    aria-hidden="true"
                  >
                    <Mail className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block">{t("contact.email")}</span>
                    <span className="mt-1.5 block truncate font-display text-2xl leading-tight text-parchment">
                      {contact.email}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-copper transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>

              {/* --- secundarios ---------------------------------------- */}
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line-soft pt-8">
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm text-parchment/80 transition-colors hover:text-copper"
                >
                  <Linkedin className="size-4" aria-hidden="true" strokeWidth={1.5} />
                  <span className="link-underline">{contact.linkedinLabel}</span>
                </a>

                <span className="inline-flex items-center gap-2.5 text-sm text-sand/65">
                  <MapPin className="size-4" aria-hidden="true" strokeWidth={1.5} />
                  {contact.location}
                </span>

                <a href="/cv/matias-colimodio-cv.pdf" download className="btn ml-auto">
                  {t("contact.downloadCv")}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
