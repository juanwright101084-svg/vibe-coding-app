"use client";

import { useFavorites } from "@/lib/useFavorites";

export default function FavoriteButton({ icao }: { icao: string }) {
  const { favorites, toggle } = useFavorites();
  const active = favorites.includes(icao);

  return (
    <button
      type="button"
      onClick={() => toggle(icao)}
      aria-pressed={active}
      aria-label={active ? `Quitar ${icao} de favoritos` : `Agregar ${icao} a favoritos`}
      className="text-2xl leading-none text-amber-500"
    >
      {active ? "★" : "☆"}
    </button>
  );
}