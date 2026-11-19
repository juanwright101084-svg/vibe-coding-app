import Link from "next/link";
import FlightBadge from "./FlightBadge";
import TimeAgo from "./TimeAgo";
import type { Metar } from "@/lib/metar";
import { describeWind } from "@/lib/decode";

const SKY: Record<string, [string, string]> = {
  VFR: ["#075985", "#0284c7"],
  MVFR: ["#1e3a8a", "#1d4ed8"],
  IFR: ["#334155", "#64748b"],
  LIFR: ["#0f172a", "#334155"],
  default: ["#0c4a6e", "#0369a1"],
};

export default function SkyHero({ metar, icao }: { metar?: Metar; icao: string }) {
  const [from, to] = SKY[metar?.fltCat ?? ""] ?? SKY.default;

  return (
    <section
      className="relative overflow-hidden rounded-2xl text-white"
      style={{ backgroundImage: `linear-gradient(to bottom, ${from}, ${to})` }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <svg className="plane" viewBox="0 0 64 64">
          <path d="M62 32 L40 26 L28 6 L22 6 L27 26 L14 27 L8 18 L4 18 L7 32 L4 46 L8 46 L14 37 L27 38 L22 58 L28 58 L40 38 Z" />
        </svg>
      </div>

      <div className="relative space-y-5 p-8 md:p-12">
        <p className="text-sm uppercase tracking-widest opacity-80">
          Clima aeronáutico en tiempo real
        </p>
        <h1 className="text-4xl font-bold md:text-5xl">SkyDeck SV</h1>
        <p className="max-w-xl text-lg">
          METAR y pronósticos de los aeropuertos de El Salvador y Centroamérica,
          decodificados y con su categoría de vuelo.
        </p>

        {metar && (
          <div className="inline-flex flex-wrap items-center gap-3 rounded-full bg-black/30 px-4 py-2 text-sm backdrop-blur">
            <span className="font-semibold">{icao} ahora</span>
            <FlightBadge cat={metar.fltCat} />
            <span>{metar.temp ?? "-"} °C</span>
            <span>Viento {describeWind(metar.wdir, metar.wspd)}</span>
            <TimeAgo reportTime={metar.reportTime} />
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Link
            href="/airports"
            className="rounded bg-white px-5 py-3 font-medium text-slate-900 hover:opacity-90"
          >
            Ver aeropuertos
          </Link>
          <Link
            href="/about"
            className="rounded border border-white/60 px-5 py-3 hover:bg-white/10"
          >
            Acerca del proyecto
          </Link>
        </div>
      </div>
    </section>
  );
}