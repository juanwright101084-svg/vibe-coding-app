"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-3 p-6">
      <p className="text-red-600">Ocurrió un error al cargar los datos.</p>
      <button
        onClick={reset}
        className="rounded bg-black px-4 py-2 text-white hover:opacity-80"
      >
        Reintentar
      </button>
    </main>
  );
}