import Link from "next/link";
import { AIRPORTS } from "@/lib/airports";
import { getMetar, type Metar } from "@/lib/metar";
import SkyHero from "@/components/SkyHero";
import HomeLive from "@/components/HomeLive";
import CategorySimulator from "@/components/CategorySimulator";

const FEATURES = [
  { href: "/airports", title: "Mapa y filtros", text: "Todos los aeropuertos en un mapa, con buscador, filtro por categoría y favoritos." },
  { href: "/airports/MSLP", title: "METAR decodificado", text: "El reporte en español: viento, visibilidad, nubes, presión y pronóstico TAF." },
  { href: "/about", title: "Cómo se construyó", text: "El proceso de Vibe Coding detrás de SkyDeck SV." },
];

export default async function Home() {
  let metars: Metar[] = [];
  try {
    metars = await getMetar(AIRPORTS.map((a) => a.icao));
  } catch {
    metars = [];
  }

  const items = AIRPORTS.map((a) => ({
    ...a,
    metar: metars.find((m) => m.icaoId === a.icao),
  }));
  const main = items[0];

  return (
    <main className="mx-auto w-full max-w-5xl space-y-12 p-6">
      <SkyHero metar={main.metar} icao={main.icao} />
      <HomeLive items={items} />
      <CategorySimulator />

      <section className="grid gap-4 md:grid-cols-3">
        {FEATURES.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="space-y-2 rounded-lg border border-black/15 p-5 hover:shadow-md dark:border-white/20"
          >
            <h3 className="font-semibold">{f.title} →</h3>
            <p className="text-sm opacity-80">{f.text}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}