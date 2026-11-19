import Link from "next/link";
import FlightBadge from "@/components/FlightBadge";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 p-6">
      <h1 className="text-3xl font-bold md:text-4xl">SkyDeck SV</h1>
      <p className="text-lg">
        Panel de clima aeronáutico para los aeropuertos de El Salvador y
        Centroamérica, con reportes METAR actualizados en tiempo real.
      </p>

      <section className="space-y-2">
        <h2 className="font-semibold">Categorías de vuelo</h2>
        <div className="flex flex-wrap gap-2">
          <FlightBadge cat="VFR" />
          <FlightBadge cat="MVFR" />
          <FlightBadge cat="IFR" />
          <FlightBadge cat="LIFR" />
        </div>
      </section>

      <Link
        href="/airports"
        className="inline-block rounded bg-black px-5 py-3 text-white hover:opacity-80"
      >
        Ver aeropuertos
      </Link>
    </main>
  );
}