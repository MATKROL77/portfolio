"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { contact, mailtoHrefWith, whatsappHrefWith } from "@/data/contact";
import { useT } from "@/i18n/LocaleProvider";
import { useCv } from "@/i18n/useContent";

/** Cuerpo del CV de una página. Cliente, para seguir el idioma elegido. */
export function CvView() {
  const t = useT();
  const { profile, education, experience, skills } = useCv();

  return (
    <div className="shell max-w-3xl pb-24 pt-28 md:pt-32">
      <Link
        href="/#about"
        className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-sand/65 transition-colors hover:text-copper print:hidden"
      >
        <ArrowLeft
          className="size-4 transition-transform duration-500 group-hover:-translate-x-1"
          aria-hidden="true"
        />
        {t("cv.back")}
      </Link>

      <header className="mt-8 border-b border-line-soft pb-8">
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-[-0.03em] text-parchment">
          {profile.name}
        </h1>
        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-copper">
          {profile.tagline}
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-sand/75">
          <li>
            <a
              href={mailtoHrefWith(t("contact.emailSubject"))}
              className="link-underline"
            >
              {profile.email}
            </a>
          </li>
          <li>
            <a
              href={whatsappHrefWith(t("contact.whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              {contact.phoneLocal}
            </a>
          </li>
          <li>{profile.location}</li>
          <li>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              {profile.linkedinLabel}
            </a>
          </li>
        </ul>
      </header>

      <Section title={t("cv.profile")}>
        <p className="prose-editorial">{profile.summary}</p>
      </Section>

      <Section title={t("cv.experience")}>
        <div className="space-y-7">
          {experience.map((item) => (
            <article key={item.title} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-display text-lg text-parchment">
                  {item.title}
                </h3>
                {item.period && (
                  <span className="font-mono text-xs text-copper/80">
                    {item.period}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-sand/60">{item.org}</p>
              <p className="prose-editorial mt-2.5">{item.body}</p>
              {item.bullets && (
                <ul className="mt-2.5 grid gap-1 sm:grid-cols-2">
                  {item.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-parchment/80"
                    >
                      <span
                        className="mt-2 size-1 shrink-0 rounded-full bg-copper"
                        aria-hidden="true"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {item.outcome && (
                <p className="mt-3 border-l-2 border-copper/50 pl-3.5 text-sm text-parchment/85">
                  {item.outcome}
                </p>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section title={t("cv.education")}>
        <div className="space-y-6">
          {education.map((item) => (
            <article key={item.institution} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-display text-lg text-parchment">
                  {item.institution}
                </h3>
                {item.period && (
                  <span className="font-mono text-xs text-copper/80">
                    {item.period}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-sand/70">{item.detail}</p>
              {item.highlights && (
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-parchment/80">
                  {item.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              {item.note && (
                <p className="mt-2 text-sm text-sand/65">{item.note}</p>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section title={t("cv.skills")}>
        <dl className="grid gap-5 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.area} className="break-inside-avoid">
              <dt className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-copper">
                {group.area}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-parchment/85">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 border-b border-line-faint pb-10 last:border-0">
      <h2 className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-sand/50">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
