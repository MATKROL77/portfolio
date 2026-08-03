import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { assets } from "@/data/assets.generated";
import { getProject, projects } from "@/data/portfolio";
import { CaseView } from "@/components/work/CaseView";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — Matías Colimodio`,
      description: project.description,
      type: "article",
      images: [{ url: assets[project.heroImage].src }],
    },
  };
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();

  return <CaseView slug={slug} />;
}
