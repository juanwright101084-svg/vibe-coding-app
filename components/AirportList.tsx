"use client";

import { useState } from "react";
import Link from "next/link";
import FlightBadge from "./FlightBadge";
import FavoriteButton from "./FavoriteButton";
import { useFavorites } from "@/lib/useFavorites";
import type { Metar } from "@/lib/metar";

type Item = { icao: string; name: string; country: string; metar?: Metar };

const CATEGORIES = ["Todas", "VFR", "MVFR", "IFR", "LIFR"];

export default function AirportList({ items }: { items: Item[] }) {
  const { favorites } = useFavorites();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todas");
  const [onlyFav, setOnlyFav] = useState(false);

  const filtered = items
    .filter((a) => {
      const text = `${a.icao} ${a.name} ${a.country}`.toLowerCase();
      const matchText = text.includes(q.toLowerCase());
      const matchCat = cat === "Todas" || a.metar?.fltCat === cat;
      const matchFav = !onlyFav || favorites.includes(a.icao);
      return matchText && matchCat && matchFav;
    })
    .sort(
      (a, b) =>
        Number(favorites.includes(b.icao)) - Number(favorites.includes(a.icao))
    );

  const btn = (active: boolean) =>
    `rounded border border-black/15 px-3 py-1 text-sm dark:border-white/20 ${
      active
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "hover:bg-black/5 dark:hover:bg-white/10"
    }`;

  return (
    <>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar aeropuerto..."
        aria-label="Buscar aeropuerto"
        className="mb-4 w-full rounded border border-black/15 bg-transparent p-2 dark:border-white/20"
      />

      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filtros">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={btn(cat === c)}>
            {c}
          </button>
        ))}
        <button onClick={() => setOnlyFav((v) => !v)} aria-pressed={onlyFav} className={btn(onlyFav)}>
          ★ Solo favoritos
        </button>
      </div>

      {filtered.length === 0 && <p>No se encontraron aeropuertos.</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <div
            key={a.icao}
            className="rounded-lg border border-black/15 p-4 hover:shadow-md dark:border-white/20"
          >
            <div className="flex items-start justify-between gap-2">
              <Link href={`/airports/${a.icao}`} className="flex-1">
                <h2 className="font-bold">{a.icao}</h2>
                <p className="text-sm">{a.name}</p>
                <p className="text-xs opacity-70">{a.country}</p>
              </Link>
              <div className="flex flex-col items-end gap-2">
                <FavoriteButton icao={a.icao} />
                <FlightBadge cat={a.metar?.fltCat} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}