import { describe, expect, it } from "vitest";
import {
  describeCloud,
  describeVisibility,
  describeWind,
  isStale,
  timeAgo,
} from "./decode";

const NOW = Date.parse("2026-11-19T01:23:00.000Z");

describe("describeWind", () => {
  it("devuelve calma sin viento", () => {
    expect(describeWind(0, 0)).toBe("Calma");
  });
  it("maneja viento variable", () => {
    expect(describeWind("VRB", 1)).toBe("Variable a 1 kt");
  });
  it("incluye dirección y velocidad", () => {
    expect(describeWind(270, 12)).toBe("270° a 12 kt");
  });
});

describe("describeVisibility", () => {
  it("interpreta 6+", () => {
    expect(describeVisibility("6+")).toBe("Más de 6 SM");
  });
  it("muestra valores numéricos", () => {
    expect(describeVisibility(3)).toBe("3 SM");
  });
  it("maneja null", () => {
    expect(describeVisibility(null)).toBe("No disponible");
  });
});

describe("describeCloud", () => {
  it("traduce la cobertura y la base", () => {
    expect(describeCloud({ cover: "FEW", base: 7000 })).toBe("Pocas nubes a 7000 ft");
  });
});

describe("timeAgo e isStale", () => {
  it("calcula minutos", () => {
    expect(timeAgo("2026-11-19T01:00:00.000Z", NOW)).toBe("hace 23 min");
  });
  it("calcula horas y minutos", () => {
    expect(timeAgo("2026-11-19T00:00:00.000Z", NOW)).toBe("hace 1 h 23 min");
  });
  it("marca reportes viejos", () => {
    expect(isStale("2026-11-19T01:00:00.000Z", NOW)).toBe(false);
    expect(isStale("2026-11-18T23:00:00.000Z", NOW)).toBe(true);
  });
});