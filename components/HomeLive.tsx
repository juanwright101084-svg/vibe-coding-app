"use client";

import { useState } from "react";
import Link from "next/link";
import FlightBadge from "./FlightBadge";
import WindCompass from "./WindCompass";
import type { Metar } from "@/lib/metar";
import { describeClouds, describeVisibility, flightCategoryLabel } from "@/lib/decode";

type Item = { icao: string; name: string; country: string; metar?: Metar };

const DOT: Record<string, string> = {
  VFR: "bg-green-600",
  MVFR: "bg-blue-600",
  IFR: "bg-red-600",
  LIFR: "bg-fuchsia-700",
};

export default function HomeLive({ items }: { items: Item[] }) {
  const [icao, setIcao] = useState(items[0]?.icao ?? "");
  const current = items.find((i) => i.icao === icao);
  const m = current?.metar;

  const label = "text-xs uppercase opacity-60";

  return (
    <section aria-labelledby="live-title" className="space-y-4">
      <h2 id="live-title" className="text-xl font-bold">
        Clima en vivo por aeropuerto
      </h2>

      <div role="group" aria-label="Elegir aeropuerto" className="flex flex-wrap gap-2">
        {items.map((i) => {
          const active = i.icao === icao;
          return (
            <button
              key={i.icao}
              type="button"
              onClick={() => setIcao(i.icao)}
              aria-pressed={active}
              className={`flex items-center gap-2 rounded border border-black/15 px-3 py-1 text-sm dark:border-white/20 ${
                active
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${DOT[i.metar?.fltCat ?? ""] ?? "bg-gray-500"}`} />
              {i.icao}
            </button>
          );
        })}
      </div>

      {current && (
        <div className="grid gap-6 rounded-lg border border-black/15 p-6 dark:border-white/20 md:grid-cols-[auto_1fr] md:items-center">
          {m ? (
            <WindCompass wdir={m.wdir} wspd={m.wspd} />
          ) : (
            <p className="text-sm opacity-70">Sin datos por ahora para {current.icao}.</p>
          )}

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-semibold">
                {current.icao} · {current.name}
              </h3>
              <FlightBadge cat={m?.fltCat} />
            </div>
            <p className="text-sm opacity-80">{flightCategoryLabel(m?.fltCat)}</p>

            {m && (
              <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className={label}>Temperatura</dt>
                  <dd>{m.temp ?? "-"} °C</dd>
                </div>
                <div>
                  <dt className={label}>Visibilidad</dt>
                  <dd>{describeVisibility(m.visib)}</dd>
                </div>
                <div>
                  <dt className={label}>QNH</dt>
                  <dd>{m.altim ?? "-"} hPa</dd>
                </div>
                <div className="col-span-2 sm:col-span-3">
                  <dt className={label}>Nubes</dt>
                  <dd>{describeClouds(m.clouds).join(", ")}</dd>
                </div>
              </dl>
            )}

            <Link href={`/airports/${current.icao}`} className="inline-block text-sm underline">
              Ver detalle completo →
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}