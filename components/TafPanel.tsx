import { getTaf } from "@/lib/taf";

export default async function TafPanel({ icao }: { icao: string }) {
  let taf: string | null = null;
  let failed = false;

  try {
    const [t] = await getTaf([icao]);
    taf = t?.rawTAF ?? null;
  } catch {
    failed = true;
  }

  return (
    <section className="space-y-2 rounded-lg border border-black/15 p-6 dark:border-white/20">
      <h2 className="font-semibold">Pronóstico (TAF)</h2>
      {failed ? (
        <p className="text-sm text-red-600">No se pudo cargar el pronóstico.</p>
      ) : taf ? (
        <p className="whitespace-pre-wrap break-words rounded bg-black/5 p-3 font-mono text-sm dark:bg-white/10">
          {taf}
        </p>
      ) : (
        <p className="text-sm opacity-70">Esta estación no publica TAF.</p>
      )}
    </section>
  );
}