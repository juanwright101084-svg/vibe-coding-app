import Link from "next/link";
import { notFound } from "next/navigation";
import { AIRPORTS } from "@/lib/airports";
import { getMetar } from "@/lib/metar";
import LiveMetar from "@/components/LiveMetar";

export default async function AirportDetail({
  params,
}: {
  params: Promise<{ icao: string }>;
}) {
  const { icao } = await params;
  const airport = AIRPORTS.find((a) => a.icao === icao.toUpperCase());
  if (!airport) notFound();

  const [metar] = await getMetar([airport.icao]);

  return (
    <main className="mx-auto w-full max-w-3xl space-y-4 p-6">
      <Link href="/airports" className="text-sm underline">
        ← Volver a aeropuertos
      </Link>
      <h1 className="text-2xl font-bold">
        {airport.icao}: {airport.name}
      </h1>
      <p className="text-sm opacity-70">{airport.country}</p>
      <LiveMetar icao={airport.icao} initial={metar ?? null} />
    </main>
  );
}