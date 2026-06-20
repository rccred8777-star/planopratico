"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function NewProductModal({ segmentId, segmentSlug }: { segmentId: string; segmentSlug: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [expertName, setExpertName] = useState("");
  const [expertAvatar, setExpertAvatar] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const supabase = createBrowserClient();
    await supabase.from("products").insert({
      segment_id: segmentId,
      name: name.trim(),
      slug: slugify(name.trim()),
      expert_name: expertName.trim() || null,
      expert_avatar_url: expertAvatar.trim() || null,
      launch_date: launchDate || null,
      status: "active",
    });
    setLoading(false);
    setOpen(false);
    setName(""); setExpertName(""); setExpertAvatar(""); setLaunchDate("");
    router.refresh();
  }

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
        <Plus className="w-4 h-4" />
        Novo Produto
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-md rounded-xl border p-6" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>Novo Produto</h2>
              <button onClick={() => setOpen(false)} style={{ color: "var(--muted-foreground)" }}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Nome do produto *</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  placeholder="Ex: DogFlow"
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-indigo-500"
                  style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }}
                  required />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Nome do especialista</label>
                <input value={expertName} onChange={e => setExpertName(e.target.value)}
                  placeholder="Ex: João Silva"
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-indigo-500"
                  style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>URL da foto do especialista</label>
                <input value={expertAvatar} onChange={e => setExpertAvatar(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-indigo-500"
                  style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Data de lançamento</label>
                <input type="date" value={launchDate} onChange={e => setLaunchDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-indigo-500"
                  style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)}
                  className="flex-1 py-2 rounded-lg text-sm border"
                  style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>Cancelar</button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
                  style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                  {loading ? "Criando..." : "Criar Produto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
