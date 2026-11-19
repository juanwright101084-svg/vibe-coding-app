"use client";

import { useState } from "react";
import FlightBadge from "./FlightBadge";
import { classify, type Category } from "@/lib/flightCategory";

const SKY: Record<Category, [string, string]> = {
  VFR: ["#075985", "#0ea5e9"],
  MVFR: ["#1e3a8a", "#3b82f6"],
  IFR: ["#334155", "#94a3b8"],
  LIFR: ["#0f172a", "#475569"],
};

const RULES: { cat: Category; text: string }[] = [
  { cat: "VFR", text: "Techo mayor a 3000 ft y visibilidad mayor a 5 SM" },
  { cat: "MVFR", text: "Techo de 1000 a 3000 ft o visibilidad de 3 a 5 SM" },
  { cat: "IFR", text: "Techo de 500 a 999 ft o visibilidad de 1 a menos de 3 SM" },
  { cat: "LIFR", text: "Techo menor a 500 ft o visibilidad menor a 1 SM" },
];

export default function CategorySimulator() {
  const [ceiling, setCeiling] = useState(5000);
  const [vis, setVis] = useState(8);

  const r = classify(ceiling, vis);
  const [from, to] = SKY[r.category];
  const cloudBottom = 8 + (ceiling / 10000) * 70;
  const haze = 0.7 * (1 - Math.min(vis, 10) / 10);

  return (
    <section aria-labelledby="sim-title" className="space-y-4">
      <div>
        <h2 id="sim-title" className="text-xl font-bold">
          Simulador de categoría de vuelo
        </h2>
        <p className="text-sm opacity-80">
          Mueve los controles y mira cómo cambian las condiciones. La categoría
          la define el peor de los dos factores.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div
          aria-hidden="true"
          className="relative h-56 overflow-hidden rounded-lg transition-colors duration-700"
          style={{ backgroundImage: `linear-gradient(to bottom, ${from}, ${to})` }}
        >
          <div
            className="absolute inset-x-0 h-10 bg-white/70 blur-md transition-all duration-500"
            style={{ bottom: `${cloudBottom}%` }}
          />
          <div
            className="absolute inset-0 bg-slate-200 transition-opacity duration-500"
            style={{ opacity: haze }}
          />
          <div className="absolute inset-x-0 bottom-0 h-3 bg-emerald-900" />
        </div>

        <div className="space-y-5">
          <label className="block text-sm">
            Techo de nubes:{" "}
            <strong>{ceiling >= 10000 ? "sin techo (10000+ ft)" : `${ceiling} ft`}</strong>
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={ceiling}
              onChange={(e) => setCeiling(Number(e.target.value))}
              className="mt-2 w-full accent-sky-600"
            />
          </label>

          <label className="block text-sm">
            Visibilidad: <strong>{vis >= 10 ? "10+ SM" : `${vis} SM`}</strong>
            <input
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={vis}
              onChange={(e) => setVis(Number(e.target.value))}
              className="mt-2 w-full accent-sky-600"
            />
          </label>

          <div className="space-y-1" aria-live="polite">
            <div className="flex items-center gap-3">
              <span className="text-sm">Categoría resultante:</span>
              <FlightBadge cat={r.category} />
            </div>
            <p className="text-xs opacity-70">
              Por techo: {r.byCeiling} · Por visibilidad: {r.byVisibility}
              {r.limitedBy !== "ambos" && ` · la limita el ${r.limitedBy}`}
            </p>
          </div>
        </div>
      </div>

      <ul className="grid gap-2 text-sm md:grid-cols-2">
        {RULES.map((rule) => (
          <li
            key={rule.cat}
            className={`flex items-center gap-2 rounded p-2 ${
              rule.cat === r.category ? "ring-2 ring-sky-500" : ""
            }`}
          >
            <FlightBadge cat={rule.cat} />
            <span>{rule.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}