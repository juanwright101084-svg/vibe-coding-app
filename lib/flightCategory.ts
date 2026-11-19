export type Category = "VFR" | "MVFR" | "IFR" | "LIFR";

const ORDER: Category[] = ["VFR", "MVFR", "IFR", "LIFR"];

export function categoryByCeiling(ft: number): Category {
  if (ft < 500) return "LIFR";
  if (ft < 1000) return "IFR";
  if (ft <= 3000) return "MVFR";
  return "VFR";
}

export function categoryByVisibility(sm: number): Category {
  if (sm < 1) return "LIFR";
  if (sm < 3) return "IFR";
  if (sm <= 5) return "MVFR";
  return "VFR";
}

export function classify(ceilingFt: number, visibilitySm: number) {
  const byCeiling = categoryByCeiling(ceilingFt);
  const byVisibility = categoryByVisibility(visibilitySm);
  const i = ORDER.indexOf(byCeiling);
  const j = ORDER.indexOf(byVisibility);
  const category = ORDER[Math.max(i, j)];
  const limitedBy = i === j ? "ambos" : i > j ? "techo" : "visibilidad";
  return { category, byCeiling, byVisibility, limitedBy };
}