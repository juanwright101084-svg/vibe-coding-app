"use client";

import { useEffect, useState } from "react";
import { isStale, timeAgo } from "@/lib/decode";

export default function TimeAgo({ reportTime }: { reportTime: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  if (now === null) return <span className="opacity-60">Calculando...</span>;

  const stale = isStale(reportTime, now);
  return (
    <span className={stale ? "text-amber-600 dark:text-amber-400" : "opacity-80"}>
      Reporte {timeAgo(reportTime, now)}
      {stale && " · posiblemente desactualizado"}
    </span>
  );
}