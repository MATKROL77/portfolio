"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2 } from "lucide-react";

import { assets } from "@/data/assets.generated";
import type { GalleryItem } from "@/data/portfolio";
import { cn } from "@/lib/cn";
import { Lightbox } from "./Lightbox";

/** Galería del caso. Cada imagen abre el visor a pantalla completa. */
export function CaseGallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => {
          const img = assets[item.image];
          const wide = img.width / img.height > 1.6;

          return (
            <li key={item.image} className={cn(wide && "sm:col-span-2")}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full text-left"
              >
                <figure>
                  <div
                    className={cn(
                      "surface relative overflow-hidden",
                      item.cutout ? "aspect-[16/9] bg-espresso/50" : "aspect-[4/3]",
                      wide && !item.cutout && "aspect-[16/9]",
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 40vw"
                      placeholder="blur"
                      blurDataURL={img.blurDataURL}
                      className={cn(
                        "transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]",
                        item.cutout ? "object-contain p-5" : "object-cover",
                      )}
                    />
                    <span
                      className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border border-line-soft bg-ink/70 text-sand opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-hidden="true"
                    >
                      <Maximize2 className="size-3.5" />
                    </span>
                  </div>
                  {item.caption && (
                    <figcaption className="mt-3 text-sm leading-relaxed text-sand/65">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              </button>
            </li>
          );
        })}
      </ul>

      {open !== null && (
        <Lightbox
          items={items}
          index={open}
          onClose={() => setOpen(null)}
          onIndexChange={setOpen}
        />
      )}
    </>
  );
}
