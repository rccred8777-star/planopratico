"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou o Agente Chefe do PlanoPratico. Posso te ajudar com informações sobre segmentos, produtos, dados do Espião, projetos de pesquisa e status das ferramentas. Como posso ajudar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!res.ok) throw new Error("Erro na API");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Sem stream");

      let assistantText = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
        for (const line of lines) {
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content ?? parsed.delta?.text ?? "";
            if (delta) {
              assistantText += delta;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantText };
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Desculpe, ocorreu um erro. Tente novamente." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === "assistant" ? "" : ""
            }`}
              style={{ background: msg.role === "assistant" ? "var(--primary)" : "var(--muted)" }}>
              {msg.role === "assistant" ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4" style={{ color: "var(--foreground)" }} />
              )}
            </div>
            <div className={`max-w-2xl px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"
            }`}
              style={{
                background: msg.role === "assistant" ? "var(--card)" : "var(--primary)",
                color: msg.role === "assistant" ? "var(--foreground)" : "var(--primary-foreground)",
                border: msg.role === "assistant" ? "1px solid var(--border)" : "none",
              }}>
              {msg.content || (loading && i === messages.length - 1 ? (
                <span className="opacity-60">Pensando...</span>
              ) : "")}
            </div>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.content === "" && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--primary)" }}>
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm flex gap-1 items-center"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--muted-foreground)", animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--muted-foreground)", animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "var(--muted-foreground)", animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-6 py-4 border-t shrink-0" style={{ borderColor: "var(--border)" }}>
        <div className="flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte sobre seus produtos, espião, métricas..."
            rows={1}
            className="flex-1 px-4 py-3 rounded-xl text-sm border outline-none resize-none"
            style={{
              background: "var(--input)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
              maxHeight: 120,
            }}
            onInput={(e) => {
              const t = e.currentTarget;
              t.style.height = "auto";
              t.style.height = Math.min(t.scrollHeight, 120) + "px";
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-opacity disabled:opacity-40"
            style={{ background: "var(--primary)" }}>
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-xs mt-2 text-center" style={{ color: "var(--muted-foreground)" }}>
          Enter para enviar · Shift+Enter para nova linha
        </p>
      </div>
    </div>
  );
}
