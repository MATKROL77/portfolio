"use client";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useT } from "@/i18n/LocaleProvider";
import { useWebProducts } from "@/i18n/useContent";
import { SitePanel } from "./SitePanel";

/** Sección WEB PRODUCTS de la home. */
export function WebProducts() {
  const t = useT();
  const webProducts = useWebProducts();

  return (
    <section
      id="web-products"
      aria-labelledby="web-products-title"
      className="relative scroll-mt-24 section-y"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={t("web.eyebrow")}
          id="web-products-title"
          title={t("web.title")}
          intro={t("web.intro")}
        />

        <div className="mt-14 grid gap-6 xl:grid-cols-2">
          {webProducts.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <SitePanel product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
