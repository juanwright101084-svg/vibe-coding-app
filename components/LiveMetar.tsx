"use client";

import { useEffect, useState } from "react";
import FlightBadge from "./FlightBadge";
import type { Metar } from "@/lib/metar";

export default function LiveMetar({
  icao,
  initial,
}: {
  icao: string;
  initial: Metar | null;
}) {
  const [metar, setMetar] = useState<Metar | null>(initial);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch(`/api/metar?ids=${icao}`);
        if (!res.ok) throw new Error("No se pudo actualizar");
        const data: Metar[] = await res.json();
        if (active) {
          setMetar(data[0] ?? null);
          setError(null);
        }
      } catch (e) {
        if (active) setError((e as Error).message);
      }
    }

    const id = setInterval(load, 60_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [icao]);

  if (!metar) return <p>Sin datos disponibles para {icao}.</p>;

  const wind =
    metar.wdir === "VRB" ? "Variable" : `${metar.wdir ?? "-"}°`;

  return (
    <div className="space-y-3 rounded-lg border p-6">
      <FlightBadge cat={metar.fltCat} />
      <p className="break-words font-mono text-sm">{metar.rawOb}</p>
      <ul className="grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
        <li>Temp: {metar.temp ?? "-"} °C</li>
        <li>Viento: {wind} / {metar.wspd ?? "-"} kt</li>
        <li>Visibilidad: {metar.visib ?? "-"} SM</li>
        <li>QNH: {metar.altim ?? "-"} hPa</li>
      </ul>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}