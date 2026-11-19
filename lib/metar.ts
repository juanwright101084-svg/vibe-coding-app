export type Cloud = { cover: string; base: number | null };

export type Metar = {
  icaoId: string;
  name?: string;
  lat?: number;
  lon?: number;
  reportTime: string;
  temp: number | null;
  dewp: number | null;
  wdir: number | string | null;
  wspd: number | null;
  visib: number | string | null;
  altim: number | null;
  fltCat?: "VFR" | "MVFR" | "IFR" | "LIFR";
  clouds?: Cloud[];
  rawOb: string;
};

export async function getMetar(ids: string[]): Promise<Metar[]> {
  const base = process.env.AVIATION_API_URL;
  if (!base) throw new Error("Falta AVIATION_API_URL");

  const res = await fetch(`${base}/metar?ids=${ids.join(",")}&format=json`, {
    next: { revalidate: 60 },
  });

  if (res.status === 204) return [];
  if (!res.ok) throw new Error(`AviationWeather respondió ${res.status}`);
  return res.json();
}