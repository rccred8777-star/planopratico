"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";

const EMOJI_OPTIONS = ["📦", "🐕", "💪", "💰", "🏋️", "🧠", "❤️", "🌱", "🎯", "🚀", "✨", "🔥", "💎", "🎓", "🏆"];
const COLOR_OPTIONS = ["#6366f1", "#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316", "#ec4899", "#10b981"];

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function NewSegmentModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("📦");
  const [color, setColor] = useState("#6366f1");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const supabase = createBrowserClient();
    await supabase.from("segments").insert({
      name: name.trim(),
      slug: slugify(name.trim()),
      icon,
      color,
      description: description.trim() || null,
    });
    setLoading(false);
    setOpen(false);
    setName(""); setDescription("");
    router.refresh();
  }

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
        <Plus className="w-4 h-4" />
        Novo Segmento
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-md rounded-xl border p-6" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Novo Segmento</h2>
              <button onClick={() => setOpen(false)} style={{ color: "var(--muted-foreground)" }}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Nome *</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  placeholder="Ex: Adestramento de Cães"
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-indigo-500"
                  style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }}
                  required />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Ícone</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJI_OPTIONS.map(e => (
                    <button key={e} type="button" onClick={() => setIcon(e)}
                      className="w-9 h-9 text-xl rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: icon === e ? "var(--primary)" : "var(--muted)", border: icon === e ? "2px solid var(--primary)" : "2px solid transparent" }}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Cor</label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map(c => (
                    <button key={c} type="button" onClick={() => setColor(c)}
                      className="w-8 h-8 rounded-full transition-transform"
                      style={{ background: c, transform: color === c ? "scale(1.25)" : "scale(1)", outline: color === c ? `2px solid ${c}` : "none", outlineOffset: 2 }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Descrição</label>
                <input value={description} onChange={e => setDescription(e.target.value)}
                  placeholder="Opcional"
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-indigo-500"
                  style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)}
                  className="flex-1 py-2 rounded-lg text-sm border"
                  style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                  Cancelar
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
                  style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                  {loading ? "Criando..." : "Criar Segmento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
