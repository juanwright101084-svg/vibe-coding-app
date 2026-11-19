const COLORS: Record<string, string> = {
  VFR: "bg-green-600",
  MVFR: "bg-blue-600",
  IFR: "bg-red-600",
  LIFR: "bg-fuchsia-700",
};

export default function FlightBadge({ cat }: { cat?: string }) {
  return (
    <span
      className={`rounded px-2 py-1 text-xs font-bold text-white ${
        COLORS[cat ?? ""] ?? "bg-gray-500"
      }`}
    >
      {cat ?? "N/D"}
    </span>
  );
}