"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, TileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";

type Point = { icao: string; name: string; lat: number; lon: number; cat?: string };

const COLOR: Record<string, string> = {
  VFR: "#16a34a",
  MVFR: "#2563eb",
  IFR: "#dc2626",
  LIFR: "#a21caf",
};

const ATTRIBUTION =
  '<a href="https://www.rainviewer.com" target="_blank" rel="noreferrer">Weather data by RainViewer</a>';

export default function AirportMap({ points }: { points: Point[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [showRadar, setShowRadar] = useState(false);
  const [radarTime, setRadarTime] = useState<string | null>(null);
  const [radarError, setRadarError] = useState(false);

  // Mapa base y estaciones
  useEffect(() => {
    let m: LeafletMap | undefined;
    let cancelled = false;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !ref.current) return;

      m = L.map(ref.current).setView([13.7, -89.2], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(m);

      points.forEach((p) => {
        L.circleMarker([p.lat, p.lon], {
          radius: 9,
          color: "#ffffff",
          weight: 2,
          fillColor: COLOR[p.cat ?? ""] ?? "#6b7280",
          fillOpacity: 0.95,
        })
          .addTo(m!)
          .bindPopup(`<strong>${p.icao}</strong><br/>${p.name}<br/>${p.cat ?? "N/D"}`);
      });

      if (points.length > 1) {
        m.fitBounds(
          points.map((p) => [p.lat, p.lon] as [number, number]),
          { padding: [30, 30] }
        );
      }
      setMap(m);
    })();

    return () => {
      cancelled = true;
      m?.remove();
      setMap(null);
    };
  }, [points]);

  // Capa de radar de lluvia (RainViewer)
  useEffect(() => {
    if (!map || !showRadar) return;

    let layer: TileLayer | undefined;
    let cancelled = false;

    async function load() {
      try {
        const L = await import("leaflet");
        const res = await fetch("https://api.rainviewer.com/public/weather-maps.json");
        if (!res.ok) throw new Error("RainViewer no respondió");
        const data = await res.json();
        const past = data.radar?.past;
        const frame = past?.[past.length - 1];
        if (!frame || cancelled) return;

        const next = L.tileLayer(
          `${data.host}${frame.path}/256/{z}/{x}/{y}/2/1_1.png`,
          {
            opacity: 0.6,
            maxNativeZoom: 7,
            maxZoom: 18,
            attribution: ATTRIBUTION,
          }
        );
        next.addTo(map!);
        layer?.remove();
        layer = next;

        setRadarError(false);
        setRadarTime(
          new Date(frame.time * 1000).toLocaleTimeString("es-SV", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } catch {
        if (!cancelled) setRadarError(true);
      }
    }

    load();
    const id = setInterval(load, 5 * 60_000);

    return () => {
      cancelled = true;
      clearInterval(id);
      layer?.remove();
    };
  }, [map, showRadar]);

  return (
    <div className="mb-6 space-y-2">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={showRadar}
          onChange={(e) => setShowRadar(e.target.checked)}
        />
        Radar de lluvia (RainViewer)
      </label>

      <div
        ref={ref}
        role="img"
        aria-label="Mapa de aeropuertos con su categoría de vuelo"
        className="z-0 h-72 w-full overflow-hidden rounded-lg border border-black/15 dark:border-white/20"
      />

      {showRadar && (
        <p className="text-xs opacity-70" aria-live="polite">
          {radarError
            ? "No se pudo cargar el radar en este momento."
            : radarTime
              ? `Radar de las ${radarTime}. Se actualiza cada 5 min.`
              : "Cargando radar..."}
        </p>
      )}
    </div>
  );
}