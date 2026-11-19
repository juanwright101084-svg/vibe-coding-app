export const metadata = { title: "Acerca de | SkyDeck SV" };

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">Acerca de SkyDeck SV</h1>
      <p>
        SkyDeck SV muestra el METAR de aeropuertos de El Salvador y la región,
        con su categoría de vuelo (VFR, MVFR, IFR o LIFR). Los datos provienen
        de AviationWeather.gov y se consultan mediante un Route Handler propio.
      </p>

      <h2 className="text-xl font-semibold">Stack</h2>
      <ul className="list-disc pl-6">
        <li>Next.js 16 con App Router y TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Server Components y Client Components</li>
        <li>Desplegado en Vercel</li>
      </ul>

      <h2 className="text-xl font-semibold">Proceso de Vibe Coding</h2>
      <p>
        El proyecto se construyó de forma iterativa con Claude como copiloto de
        desarrollo: se definió la idea, se generaron los componentes por
        etapas, se validó cada resultado y se corrigieron errores antes de
        cada commit.
      </p>
    </main>
  );
}