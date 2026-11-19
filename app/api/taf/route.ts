import { NextResponse } from "next/server";
import { getTaf } from "@/lib/taf";

export async function GET(request: Request) {
  const ids = new URL(request.url).searchParams.get("ids") ?? "MSLP";

  try {
    return NextResponse.json(await getTaf(ids.split(",")));
  } catch {
    return NextResponse.json({ error: "No se pudo obtener el TAF" }, { status: 502 });
  }
}