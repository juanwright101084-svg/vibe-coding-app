import { AIRPORTS } from "@/lib/airports";
import { getMetar } from "@/lib/metar";
import AirportList from "@/components/AirportList";

export default async function AirportsPage() {
  const metars = await getMetar(AIRPORTS.map((a) => a.icao));
  const items = AIRPORTS.map((a) => ({
    ...a,
    metar: metars.find((m) => m.icaoId === a.icao),
  }));

  return (
    <main className="mx-auto w-full max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Aeropuertos</h1>
      <AirportList items={items} />
    </main>
  );
}