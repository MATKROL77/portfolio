import { Hero } from "@/components/hero/Hero";
import { ProfileSummary } from "@/components/about/ProfileSummary";
import { ProjectIndex } from "@/components/work/ProjectIndex";
import { WebProducts } from "@/components/web/WebProducts";
import { Process } from "@/components/about/Process";
import { CurriculumVitae } from "@/components/about/CurriculumVitae";
import { ContactCard } from "@/components/contact/ContactCard";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProfileSummary />
      <ProjectIndex />
      <WebProducts />
      <Process />
      <CurriculumVitae />
      <ContactCard />
    </>
  );
}
