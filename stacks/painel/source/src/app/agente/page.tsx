import { AgentChat } from "./agent-chat";
import { Bot } from "lucide-react";

export default function AgentePage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-3 px-6 py-4 border-b shrink-0" style={{ borderColor: "var(--border)" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "var(--primary)" }}>
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Agente Chefe</h1>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Coordenador de operações PlanoPratico</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs" style={{ color: "#22c55e" }}>
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Online
        </div>
      </div>
      <AgentChat />
    </div>
  );
}
