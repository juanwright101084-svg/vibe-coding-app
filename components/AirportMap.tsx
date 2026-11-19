"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

type Point = { icao: string; name: string; lat: number; lon: number; cat?: string };

const COLOR: Record<string, string> = {
  VFR: "#16a34a",
  MVFR: "#2563eb",
  IFR: "#dc2626",
  LIFR: "#a21caf",
};

export default function AirportMap({ points }: { points: Point[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !ref.current) return;

      map = L.map(ref.current).setView([13.7, -89.2], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      points.forEach((p) => {
        L.circleMarker([p.lat, p.lon], {
          radius: 9,
          color: "#ffffff",
          weight: 2,
          fillColor: COLOR[p.cat ?? ""] ?? "#6b7280",
          fillOpacity: 0.95,
        })
          .addTo(map!)
          .bindPopup(`<strong>${p.icao}</strong><br/>${p.name}<br/>${p.cat ?? "N/D"}`);
      });

      if (points.length > 1) {
        map.fitBounds(
          points.map((p) => [p.lat, p.lon] as [number, number]),
          { padding: [30, 30] }
        );
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [points]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Mapa de aeropuertos con su categoría de vuelo"
      className="z-0 mb-6 h-72 w-full overflow-hidden rounded-lg border border-black/15 dark:border-white/20"
    />
  );
}