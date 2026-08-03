"use client";

import { Eye, Search } from "lucide-react";

import type { BackofficeDemo } from "@/data/backoffice-demo";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/LocaleProvider";

/**
 * Réplica local del backoffice.
 *
 * Es una maqueta: los datos son de demostración y ningún control escribe nada.
 * No hay iframe, no hay credenciales guardadas y no se hace ninguna request a
 * los sistemas reales de BROTE o MESSA. Cualquiera puede mirarla, siempre, sin
 * iniciar sesión.
 */
export function BackofficeReplica({
  demo,
  accent,
}: {
  demo: BackofficeDemo;
  accent: string;
}) {
  const t = useT();

  return (
    <div className="bg-[#141110] text-parchment">
      {/* barra de la app */}
      <div className="flex items-center justify-between gap-3 border-b border-line-faint px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
          <span className="text-[0.72rem] font-medium tracking-wide text-parchment/85">
            {demo.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-[var(--radius-chip)] border border-line-faint px-2.5 py-1 text-[0.6rem] text-sand/45 sm:flex">
            <Search className="size-3" aria-hidden="true" />
            Buscar
          </span>
          <span className="flex items-center gap-1.5 rounded-[var(--radius-chip)] border border-copper/35 bg-copper/10 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.12em] text-copper">
            <Eye className="size-3" aria-hidden="true" />
            {t("web.readOnlyShort")}
          </span>
        </div>
      </div>

      {/* métricas */}
      <div className="grid grid-cols-2 gap-px border-b border-line-faint bg-line-faint md:grid-cols-4">
        {demo.metrics.map((m) => (
          <div key={m.label} className="bg-[#141110] px-4 py-3.5">
            <p className="text-[0.58rem] font-medium uppercase tracking-[0.14em] text-sand/45">
              {m.label}
            </p>
            <p
              className={cn(
                "mt-1.5 font-display text-xl tabular-nums",
                "status" in m && m.status === "warn"
                  ? "text-[#c47a5e]"
                  : "text-parchment",
              )}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-px bg-line-faint lg:grid-cols-3">
        {/* tabla */}
        <div className="bg-[#141110] lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr>
                  {demo.columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="border-b border-line-faint px-4 py-2.5 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-sand/45"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {demo.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-line-faint/60 last:border-0">
                    {row.map((cell, i) => {
                      const isState = i === row.length - 1;
                      const alert =
                        cell === "Sin stock" || cell === "Sin mozo asignado";
                      return (
                        <td
                          key={i}
                          className={cn(
                            "px-4 py-2.5 text-[0.76rem]",
                            i === 0 ? "text-parchment/90" : "text-sand/70",
                            isState && "whitespace-nowrap",
                          )}
                        >
                          {isState ? (
                            <span
                              className={cn(
                                "rounded-[var(--radius-chip)] border px-2 py-0.5 text-[0.6rem]",
                                alert
                                  ? "border-[#c47a5e]/40 text-[#c47a5e]"
                                  : "border-line-soft text-sand/65",
                              )}
                            >
                              {cell}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* panel lateral */}
        <div className="bg-[#141110] p-4">
          <p className="text-[0.58rem] font-medium uppercase tracking-[0.14em] text-sand/45">
            {demo.side.title}
          </p>
          <ul className="mt-3 space-y-3">
            {demo.side.items.map((item) => (
              <li
                key={item.primary}
                className="rounded-[var(--radius-inner)] border border-line-faint px-3 py-2.5"
              >
                <p className="text-[0.76rem] text-parchment/88">{item.primary}</p>
                <p className="mt-0.5 text-[0.68rem] text-sand/55">
                  {item.secondary}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="border-t border-line-faint px-4 py-3 text-[0.66rem] leading-relaxed text-sand/50">
        {t("web.replicaNote")}
      </p>
    </div>
  );
}
