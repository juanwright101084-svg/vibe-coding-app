export default function Home() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Mi App";
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV ?? "sin configurar";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-bold">{appName}</h1>
      <p className="text-lg text-gray-400">
        Aplicación Next.js desplegada en AWS Amplify
      </p>
      <p className="text-sm text-gray-500">Entorno: {appEnv}</p>
    </main>
  );
}