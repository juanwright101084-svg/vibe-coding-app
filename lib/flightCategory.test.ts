import { describe, expect, it } from "vitest";
import { categoryByCeiling, categoryByVisibility, classify } from "./flightCategory";

describe("categoryByCeiling", () => {
  it("respeta los límites del techo", () => {
    expect(categoryByCeiling(4000)).toBe("VFR");
    expect(categoryByCeiling(3000)).toBe("MVFR");
    expect(categoryByCeiling(1000)).toBe("MVFR");
    expect(categoryByCeiling(999)).toBe("IFR");
    expect(categoryByCeiling(500)).toBe("IFR");
    expect(categoryByCeiling(499)).toBe("LIFR");
  });
});

describe("categoryByVisibility", () => {
  it("respeta los límites de visibilidad", () => {
    expect(categoryByVisibility(6)).toBe("VFR");
    expect(categoryByVisibility(5)).toBe("MVFR");
    expect(categoryByVisibility(3)).toBe("MVFR");
    expect(categoryByVisibility(2.5)).toBe("IFR");
    expect(categoryByVisibility(1)).toBe("IFR");
    expect(categoryByVisibility(0.5)).toBe("LIFR");
  });
});

describe("classify", () => {
  it("gana la peor de las dos categorías", () => {
    expect(classify(8000, 2).category).toBe("IFR");
    expect(classify(800, 8).category).toBe("IFR");
    expect(classify(4000, 8).category).toBe("VFR");
  });
  it("indica qué factor limita", () => {
    expect(classify(8000, 2).limitedBy).toBe("visibilidad");
    expect(classify(800, 8).limitedBy).toBe("techo");
    expect(classify(4000, 8).limitedBy).toBe("ambos");
  });
});