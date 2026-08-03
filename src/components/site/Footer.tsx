"use client";

import Link from "next/link";

import { profile } from "@/data/cv";
import { useT } from "@/i18n/LocaleProvider";

export function Footer() {
  const t = useT();

  return (
    <footer className="relative border-t border-line-faint py-10">
      <div className="shell flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <p className="eyebrow">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <p className="eyebrow text-sand/60">
          Engineering / Design / Fabrication
        </p>

        <div className="flex items-center gap-6">
          <a href={`mailto:${profile.email}`} className="eyebrow link-underline">
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow link-underline"
          >
            LinkedIn
          </a>
          <Link href="/#contact" className="eyebrow link-underline">
            {t("nav.contact")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
