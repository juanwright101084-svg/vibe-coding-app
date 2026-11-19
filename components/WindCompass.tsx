type Props = { wdir: number | string | null; wspd: number | null };

export default function WindCompass({ wdir, wspd }: Props) {
  const calm = !wspd;
  const variable = wdir === "VRB";
  const deg = typeof wdir === "number" ? wdir : null;
  const showArrow = !calm && (variable || deg !== null);

  const label = calm
    ? "Calma"
    : variable
      ? `Variable · ${wspd} kt`
      : deg !== null
        ? `Desde ${String(deg).padStart(3, "0")}° · ${wspd} kt`
        : "Sin dato de viento";

  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 140 140"
        role="img"
        aria-label={`Rosa de vientos: ${label}`}
        className="h-44 w-44 text-foreground"
      >
        <circle cx="70" cy="70" r="48" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1="70"
            y1="22"
            x2="70"
            y2={i % 3 === 0 ? 30 : 26}
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="2"
            transform={`rotate(${i * 30} 70 70)`}
          />
        ))}
        <text x="70" y="14" textAnchor="middle" fontSize="11" fill="currentColor">N</text>
        <text x="130" y="74" textAnchor="middle" fontSize="11" fill="currentColor">E</text>
        <text x="70" y="134" textAnchor="middle" fontSize="11" fill="currentColor">S</text>
        <text x="10" y="74" textAnchor="middle" fontSize="11" fill="currentColor">O</text>

        {showArrow && (
          <g
            className={`text-sky-600 dark:text-sky-400 ${variable ? "wind-vrb" : ""}`}
            style={
              variable
                ? undefined
                : {
                    transform: `rotate(${deg}deg)`,
                    transformOrigin: "70px 70px",
                    transition: "transform 0.8s ease",
                  }
            }
          >
            <line x1="70" y1="26" x2="70" y2="56" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <polygon points="70,68 62,52 78,52" fill="currentColor" />
            <circle cx="70" cy="22" r="5" fill="currentColor" />
          </g>
        )}
        <circle cx="70" cy="70" r="3" fill="currentColor" />
      </svg>
      <figcaption className="text-sm font-medium">{label}</figcaption>
    </figure>
  );
}