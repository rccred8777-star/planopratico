import { createServerClient } from "@/lib/supabase/server";
import { Package } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';
import { NewSegmentModal } from "./new-segment-modal";

export const revalidate = 60;

export default async function ProdutosPage() {
  const supabase = createServerClient();

  const { data: segments } = await supabase
    .from("segments")
    .select("*")
    .order("created_at", { ascending: false });

  // Product count per segment
  const segIds = (segments ?? []).map((s: { id: string }) => s.id);
  const { data: productCounts } = segIds.length > 0
    ? await supabase.from("products").select("segment_id").in("segment_id", segIds)
    : { data: [] };

  const countMap: Record<string, number> = {};
  (productCounts ?? []).forEach((p: { segment_id: string }) => {
    countMap[p.segment_id] = (countMap[p.segment_id] ?? 0) + 1;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6" style={{ color: "var(--primary)" }} />
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Produtos</h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Fase 2 — hierarquia segmento → produto</p>
          </div>
        </div>
        <NewSegmentModal />
      </div>

      {(segments ?? []).length === 0 ? (
        <div className="rounded-xl border p-12 text-center" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <Package className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: "var(--muted-foreground)" }} />
          <p className="font-medium mb-1" style={{ color: "var(--foreground)" }}>Nenhum segmento ainda</p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Crie seu primeiro segmento de mercado para organizar seus produtos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {(segments ?? []).map((s: { id: string; name: string; slug: string; icon: string; color: string; description: string }) => (
            <Link key={s.id} href={`/produtos/${s.slug}`}>
              <div className="rounded-xl border p-5 hover:border-indigo-500/50 transition-colors cursor-pointer"
                style={{ background: "var(--card)", borderColor: "var(--border)", borderLeft: `4px solid ${s.color ?? "#6366f1"}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{s.icon ?? "📦"}</span>
                  <div>
                    <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>{s.name}</h3>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {countMap[s.id] ?? 0} produto{(countMap[s.id] ?? 0) !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                {s.description && (
                  <p className="text-xs line-clamp-2" style={{ color: "var(--muted-foreground)" }}>{s.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
