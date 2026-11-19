import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-3 p-6">
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <p>El aeropuerto o la ruta que buscas no existe.</p>
      <Link href="/airports" className="underline">
        Ir a aeropuertos
      </Link>
    </main>
  );
}