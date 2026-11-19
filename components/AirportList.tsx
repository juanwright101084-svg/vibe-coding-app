"use client";

import { useState } from "react";
import Link from "next/link";
import FlightBadge from "./FlightBadge";
import type { Metar } from "@/lib/metar";

type Item = { icao: string; name: string; country: string; metar?: Metar };

export default function AirportList({ items }: { items: Item[] }) {
  const [q, setQ] = useState("");

  const filtered = items.filter((a) =>
    `${a.icao} ${a.name} ${a.country}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar aeropuerto..."
        className="mb-6 w-full rounded border p-2"
      />

      {filtered.length === 0 && <p>No se encontraron aeropuertos.</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <Link
            key={a.icao}
            href={`/airports/${a.icao}`}
            className="rounded-lg border p-4 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold">{a.icao}</h2>
              <FlightBadge cat={a.metar?.fltCat} />
            </div>
            <p className="text-sm">{a.name}</p>
            <p className="text-xs opacity-70">{a.country}</p>
          </Link>
        ))}
      </div>
    </>
  );
}