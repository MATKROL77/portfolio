import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-start justify-center py-28">
      <p className="eyebrow eyebrow-copper">404</p>
      <h1 className="mt-5 max-w-2xl font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold tracking-[-0.03em] text-parchment">
        Esta página no existe.
      </h1>
      <p className="prose-editorial mt-5 max-w-lg">
        El enlace puede estar viejo o la dirección mal escrita. Desde el inicio
        se llega a todos los proyectos.
      </p>
      <Link href="/" className="btn mt-9">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver al inicio
      </Link>
    </div>
  );
}
