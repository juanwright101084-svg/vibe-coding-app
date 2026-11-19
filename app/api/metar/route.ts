import { NextResponse } from "next/server";
import { getMetar } from "@/lib/metar";

export async function GET(request: Request) {
  const ids = new URL(request.url).searchParams.get("ids") ?? "MSLP,MSSS";

  try {
    const data = await getMetar(ids.split(","));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "No se pudo obtener el METAR" },
      { status: 502 }
    );
  }
}