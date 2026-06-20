import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; color: string }> = {
  discovered: { label: "Descoberto", color: "#3b82f6" },
  transcribed: { label: "Transcrito", color: "#eab308" },
  analyzed: { label: "Analisado", color: "#22c55e" },
  active: { label: "Ativo", color: "#22c55e" },
  paused: { label: "Pausado", color: "#f97316" },
  archived: { label: "Arquivado", color: "#6b7280" },
  draft: { label: "Rascunho", color: "#6b7280" },
  promoted: { label: "Promovido", color: "#a855f7" },
  concluded: { label: "Concluído", color: "#06b6d4" },
  connected: { label: "Conectado", color: "#22c55e" },
  disconnected: { label: "Desconectado", color: "#ef4444" },
  online: { label: "Online", color: "#22c55e" },
  offline: { label: "Offline", color: "#ef4444" },
};

export function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? { label: status, color: "#6b7280" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: cfg.color + "22", color: cfg.color, border: `1px solid ${cfg.color}44` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
}
