import { AIRPORTS } from "@/lib/airports";
import { getMetar } from "@/lib/metar";
import AirportList from "@/components/AirportList";
import AirportMap from "@/components/AirportMap";

export const metadata = { title: "Aeropuertos" };

export default async function AirportsPage() {
  const metars = await getMetar(AIRPORTS.map((a) => a.icao));
  const items = AIRPORTS.map((a) => ({
    ...a,
    metar: metars.find((m) => m.icaoId === a.icao),
  }));

  const points = items.flatMap((i) =>
    i.metar?.lat != null && i.metar?.lon != null
      ? [{ icao: i.icao, name: i.name, lat: i.metar.lat, lon: i.metar.lon, cat: i.metar.fltCat }]
      : []
  );

  return (
    <main className="mx-auto w-full max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Aeropuertos</h1>
      <AirportMap points={points} />
      <AirportList items={items} />
    </main>
  );
}