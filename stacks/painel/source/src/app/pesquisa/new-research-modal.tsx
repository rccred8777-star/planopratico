"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";

export function NewResearchModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [hypothesis, setHypothesis] = useState("");
  const [targetSegment, setTargetSegment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const supabase = createBrowserClient();
    await supabase.from("research_projects").insert({
      name: name.trim(),
      hypothesis: hypothesis.trim() || null,
      target_segment: targetSegment.trim() || null,
      status: "active",
    });
    setLoading(false);
    setOpen(false);
    setName(""); setHypothesis(""); setTargetSegment("");
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        <Plus className="w-4 h-4" />
        Nova Pesquisa
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-md rounded-xl border p-6" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Nova Pesquisa de Mercado</h2>
              <button onClick={() => setOpen(false)} style={{ color: "var(--muted-foreground)" }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Nome *</label>
                <input
                  value={name} onChange={e => setName(e.target.value)}
                  placeholder="Ex: Pesquisa Adestramento Cães"
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-indigo-500"
                  style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Hipótese</label>
                <textarea
                  value={hypothesis} onChange={e => setHypothesis(e.target.value)}
                  placeholder="O que você acredita sobre este mercado?"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-indigo-500 resize-none"
                  style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Segmento alvo</label>
                <input
                  value={targetSegment} onChange={e => setTargetSegment(e.target.value)}
                  placeholder="Ex: Donos de cães, 25-45 anos"
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-indigo-500"
                  style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }}
                />
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
                  {loading ? "Criando..." : "Criar Pesquisa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
