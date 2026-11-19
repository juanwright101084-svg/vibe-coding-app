import type { Cloud } from "./metar";

const COVER: Record<string, string> = {
  SKC: "Cielo despejado",
  CLR: "Cielo despejado",
  FEW: "Pocas nubes",
  SCT: "Nubes dispersas",
  BKN: "Nublado",
  OVC: "Cubierto",
  VV: "Visibilidad vertical",
};

const CATEGORY_LABEL: Record<string, string> = {
  VFR: "Reglas de vuelo visual",
  MVFR: "Visual marginal",
  IFR: "Reglas de vuelo por instrumentos",
  LIFR: "Instrumentos con condiciones bajas",
};

export function describeCloud(c: Cloud): string {
  const name = COVER[c.cover] ?? c.cover;
  return c.base != null ? `${name} a ${c.base} ft` : name;
}

export function describeClouds(clouds?: Cloud[]): string[] {
  if (!clouds || clouds.length === 0) return ["Cielo despejado"];
  return clouds.map(describeCloud);
}

export function describeWind(wdir: number | string | null, wspd: number | null): string {
  if (!wspd) return "Calma";
  if (wdir === "VRB" || wdir == null) return `Variable a ${wspd} kt`;
  return `${wdir}° a ${wspd} kt`;
}

export function describeVisibility(v: number | string | null): string {
  if (v == null) return "No disponible";
  if (typeof v === "string" && v.endsWith("+")) return `Más de ${v.slice(0, -1)} SM`;
  return `${v} SM`;
}

export function flightCategoryLabel(cat?: string): string {
  return CATEGORY_LABEL[cat ?? ""] ?? "Sin categoría";
}

export function timeAgo(reportTime: string, now: number): string {
  const mins = Math.max(0, Math.round((now - new Date(reportTime).getTime()) / 60000));
  if (mins < 1) return "hace instantes";
  if (mins < 60) return `hace ${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `hace ${h} h` : `hace ${h} h ${m} min`;
}

export function isStale(reportTime: string, now: number, limitMin = 90): boolean {
  return (now - new Date(reportTime).getTime()) / 60000 > limitMin;
}