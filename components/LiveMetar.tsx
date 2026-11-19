"use client";

import { useCallback, useEffect, useState } from "react";
import FlightBadge from "./FlightBadge";
import FavoriteButton from "./FavoriteButton";
import TimeAgo from "./TimeAgo";
import type { Metar } from "@/lib/metar";
import {
  describeClouds,
  describeVisibility,
  describeWind,
  flightCategoryLabel,
} from "@/lib/decode";

export default function LiveMetar({
  icao,
  initial,
}: {
  icao: string;
  initial: Metar | null;
}) {
  const [metar, setMetar] = useState<Metar | null>(initial);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/metar?ids=${icao}`);
      if (!res.ok) throw new Error("No se pudo actualizar");
      const data: Metar[] = await res.json();
      setMetar(data[0] ?? null);
      setError(null);
      setUpdatedAt(new Date().toLocaleTimeString("es-SV"));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [icao]);

  useEffect(() => {
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, [load]);

  if (!metar) return <p>Sin datos disponibles para {icao}.</p>;

  const card = "rounded-lg border border-black/15 p-6 dark:border-white/20";
  const label = "text-xs uppercase opacity-60";

  return (
    <div className={`space-y-4 ${card}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <FlightBadge cat={metar.fltCat} />
          <span className="text-sm">{flightCategoryLabel(metar.fltCat)}</span>
        </div>
        <FavoriteButton icao={icao} />
      </div>

      <p className="text-sm">
        <TimeAgo reportTime={metar.reportTime} />
      </p>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className={label}>Temperatura / Punto de rocío</dt>
          <dd>{metar.temp ?? "-"} °C / {metar.dewp ?? "-"} °C</dd>
        </div>
        <div>
          <dt className={label}>Viento</dt>
          <dd>{describeWind(metar.wdir, metar.wspd)}</dd>
        </div>
        <div>
          <dt className={label}>Visibilidad</dt>
          <dd>{describeVisibility(metar.visib)}</dd>
        </div>
        <div>
          <dt className={label}>Presión (QNH)</dt>
          <dd>{metar.altim ?? "-"} hPa</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className={label}>Nubes</dt>
          <dd>
            <ul className="list-disc pl-5">
              {describeClouds(metar.clouds).map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <div>
        <p className={label}>METAR original</p>
        <p className="break-words rounded bg-black/5 p-3 font-mono text-sm dark:bg-white/10">
          {metar.rawOb}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="rounded bg-black px-4 py-2 text-sm text-white hover:opacity-80 disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {loading ? "Actualizando..." : "Actualizar ahora"}
        </button>
        <span className="text-xs opacity-70" aria-live="polite">
          {updatedAt ? `Actualizado a las ${updatedAt}` : "Se actualiza cada 60 s"}
        </span>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}