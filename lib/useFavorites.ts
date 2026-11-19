"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const KEY = "skydeck:favorites";
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function getSnapshot() {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}
const getServerSnapshot = () => "[]";

export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const favorites = useMemo<string[]>(() => {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }, [raw]);

  const toggle = useCallback(
    (icao: string) => {
      const next = favorites.includes(icao)
        ? favorites.filter((f) => f !== icao)
        : [...favorites, icao];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      listeners.forEach((l) => l());
    },
    [favorites]
  );

  return { favorites, toggle };
}