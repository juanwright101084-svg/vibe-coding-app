export type Taf = { icaoId: string; rawTAF: string };

export async function getTaf(ids: string[]): Promise<Taf[]> {
  const base = process.env.AVIATION_API_URL;
  if (!base) throw new Error("Falta AVIATION_API_URL");

  const res = await fetch(`${base}/taf?ids=${ids.join(",")}&format=json`, {
    next: { revalidate: 300 },
  });

  if (res.status === 204) return [];
  if (!res.ok) throw new Error(`AviationWeather respondió ${res.status}`);
  return res.json();
}