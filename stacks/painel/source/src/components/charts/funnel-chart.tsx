"use client";

interface FunnelProps {
  discovered: number;
  transcribed: number;
  analyzed: number;
}

export function FunnelChart({ discovered, transcribed, analyzed }: FunnelProps) {
  const stages = [
    { label: "Descobertos", value: discovered, color: "#3b82f6", pct: 100 },
    { label: "Transcritos", value: transcribed, color: "#eab308", pct: discovered > 0 ? Math.round((transcribed / discovered) * 100) : 0 },
    { label: "Analisados", value: analyzed, color: "#22c55e", pct: discovered > 0 ? Math.round((analyzed / discovered) * 100) : 0 },
  ];

  return (
    <div className="space-y-3">
      {stages.map((s) => (
        <div key={s.label}>
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{ color: "var(--muted-foreground)" }}>{s.label}</span>
            <span className="font-semibold" style={{ color: s.color }}>{s.value}</span>
          </div>
          <div className="h-7 rounded-lg overflow-hidden" style={{ background: "var(--muted)" }}>
            <div
              className="h-full rounded-lg flex items-center px-2 text-xs font-medium text-white transition-all duration-500"
              style={{ width: `${Math.max(s.pct, 4)}%`, background: s.color }}
            >
              {s.pct > 10 && `${s.pct}%`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
