import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-px w-8 bg-copper/70" aria-hidden="true" />
        <span className="eyebrow eyebrow-copper">{eyebrow}</span>
      </div>

      <h2
        id={id}
        className="mt-5 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.08] text-parchment"
      >
        {title}
      </h2>

      {intro && <p className="prose-editorial mt-5">{intro}</p>}
    </Reveal>
  );
}
