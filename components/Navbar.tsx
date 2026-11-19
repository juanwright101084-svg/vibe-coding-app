import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "SkyDeck SV";

  return (
    <nav className="border-b border-black/15 dark:border-white/20">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 p-4">
        <Link href="/" className="text-lg font-bold">
          ✈ {appName}
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">Inicio</Link>
          <Link href="/airports" className="hover:underline">Aeropuertos</Link>
          <Link href="/about" className="hover:underline">Acerca de</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}