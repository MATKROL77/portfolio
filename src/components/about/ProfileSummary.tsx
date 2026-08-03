"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  CircuitBoard,
  Compass,
  Languages,
  MapPin,
  MonitorSmartphone,
  Printer,
  Ruler,
} from "lucide-react";

import { assets } from "@/data/assets.generated";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { useT } from "@/i18n/LocaleProvider";
import { useCv } from "@/i18n/useContent";

/**
 * Resumen de perfil, entre la galería del hero y el índice de proyectos.
 * Sintetiza el CV y lo que efectivamente muestran los proyectos: nada acá
 * afirma algo que no esté respaldado por el material del archivo.
 */

const capabilities = [
  {
    icon: Compass,
    title: "Ingeniería mecánica",
    body: "Diseño de piezas y mecanismos funcionales, pensando fabricación, normas y criterios de ensamblaje desde el principio.",
  },
  {
    icon: Ruler,
    title: "CAD y oficina técnica",
    body: "Modelado en Fusion 360 y Solid Edge, planos normalizados, cortes, acotación y metrología básica.",
  },
  {
    icon: Printer,
    title: "Fabricación digital",
    body: "Impresión 3D de punta a punta: preparación del modelo, producción por tandas y postprocesado hasta el acabado final.",
  },
  {
    icon: Boxes,
    title: "Diseño de producto y objeto",
    body: "De la forma al ensamble real: carcasas, mobiliario y piezas donde la geometría tiene que alojar componentes concretos.",
  },
  {
    icon: CircuitBoard,
    title: "Electrónica embebida",
    body: "Montaje de placas, baterías y actuadores sobre soportes diseñados a medida. Nociones de Arduino.",
  },
  {
    icon: MonitorSmartphone,
    title: "Producto digital",
    body: "Diseño y desarrollo de sitios y backoffices, del modelo de datos a la interfaz que usa el negocio todos los días.",
  },
];

const facts = [
  { labelKey: "profile.education" as const, value: "Ing. Mecánica — UTN FRGP" },
  { labelKey: "profile.since" as const, value: "2025, estudiante activo" },
  { labelKey: "profile.venture" as const, value: "Impresión 3D, desde 2024" },
  { labelKey: "profile.award" as const, value: "2.º puesto, robótica U. Austral" },
];

/** Párrafos del resumen en español; las traducciones vienen de `useCv`. */
const paragraphsEs = [
  "Soy estudiante de Ingeniería Mecánica en la UTN Facultad Regional General Pacheco, con secundario bilingüe e inglés C1. Trabajo en la franja donde la ingeniería se cruza con el diseño: modelo en CAD, fabrico, ensamblo y, cuando el proyecto lo pide, también lo llevo a pantalla.",
  "Eso se ve en lo que hay en este archivo. Un eje lineal resuelto en CAD junto a las láminas de dibujo técnico que lo sostienen. Un parlante propio con carcasa de caracol que termina alojando parlante, batería y placa sobre bases diseñadas a medida, firmado KROL. Un escritorio de 2400 mm que existe primero acotado y después construido, y la señalética corpórea de BROTE montada en pared. Réplicas, maquetas y estuches salidos de un emprendimiento propio de impresión 3D donde manejo presupuesto, diseño, producción y cliente. Y dos sitios web en línea, BROTE y MESSA, con sus backoffices.",
  "El hilo común es bastante simple: me interesa la parte del problema donde hay que decidir. Qué se compra hecho y qué se fabrica, dónde se parte una pieza grande, cuánta tolerancia aguanta un encastre, qué complejidad carga el sistema para que no la cargue la persona que lo usa.",
];

export function ProfileSummary() {
  const t = useT();
  const { profile, profileParagraphs, fact, capability } = useCv();
  const portrait = assets["portrait/matias-portrait"];
  const paragraphs = profileParagraphs ?? paragraphsEs;

  return (
    <section
      id="profile"
      aria-labelledby="profile-title"
      className="relative scroll-mt-24 py-20 md:py-28"
    >
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* --- retrato + datos rápidos ---------------------------------- */}
          <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <div className="glass-strong overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)]">
                <Image
                  src={portrait.src}
                  alt="Retrato de Matías Colimodio"
                  fill
                  sizes="(max-width: 1024px) 90vw, 30vw"
                  placeholder="blur"
                  blurDataURL={portrait.blurDataURL}
                  className="object-cover object-top"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="p-6">
                <dl className="space-y-4">
                  {facts.map((f) => (
                    <div key={f.value}>
                      <dt className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-sand/45">
                        {t(f.labelKey)}
                      </dt>
                      <dd className="mt-1 text-sm text-parchment/85">
                        {fact(f.value)}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="chip">
                    <MapPin className="size-3" aria-hidden="true" />
                    {profile.location}
                  </span>
                  <span className="chip">
                    <Languages className="size-3" aria-hidden="true" />
                    Inglés C1
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* --- texto + capacidades -------------------------------------- */}
          <div className="lg:col-span-8">
            <Reveal className="glass-strong p-7 md:p-10">
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-copper/70" aria-hidden="true" />
                <span className="eyebrow eyebrow-copper">
                  {t("profile.eyebrow")}
                </span>
              </div>

              <h2
                id="profile-title"
                className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-light leading-[1.1] text-parchment"
              >
                {profile.headline}
              </h2>

              <div className="prose-editorial mt-6 max-w-2xl">
                {paragraphs.map((text) => (
                  <p key={text.slice(0, 40)}>{text}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/#about" className="btn">
                  {t("profile.viewCv")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href="/#contact" className="link-underline eyebrow">
                  {t("profile.directContact")}
                </Link>
              </div>
            </Reveal>

            <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {capabilities.map((cap) => {
                const translated = capability(cap.title);
                return (
                  <RevealItem key={cap.title} className="h-full">
                    <div className="glass h-full p-5">
                      <cap.icon
                        className="size-5 text-copper"
                        aria-hidden="true"
                        strokeWidth={1.4}
                      />
                      <h3 className="mt-4 font-display text-lg leading-tight text-parchment">
                        {translated?.title ?? cap.title}
                      </h3>
                      <p className="mt-2 text-[0.82rem] leading-relaxed text-sand/70">
                        {translated?.body ?? cap.body}
                      </p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
