import { createServerClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/status-badge";
import { Search, Plus } from "lucide-react";

export const dynamic = 'force-dynamic';
import Link from "next/link";
import { NewResearchModal } from "./new-research-modal";

export const revalidate = 60;

export default async function PesquisaPage() {
  const supabase = createServerClient();

  const { data: projects } = await supabase
    .from("research_projects")
    .select("*")
    .order("created_at", { ascending: false });

  // Count ads per project
  const projectIds = (projects ?? []).map((p: { id: string }) => p.id);
  const { data: adCounts } = projectIds.length > 0
    ? await supabase.from("competitor_ads").select("research_project_id").in("research_project_id", projectIds)
    : { data: [] };

  const countMap: Record<string, number> = {};
  (adCounts ?? []).forEach((a: { research_project_id: string }) => {
    if (a.research_project_id) countMap[a.research_project_id] = (countMap[a.research_project_id] ?? 0) + 1;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Search className="w-6 h-6" style={{ color: "var(--primary)" }} />
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Pesquisa</h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Fase 1 — análise de mercado antes do produto existir
            </p>
          </div>
        </div>
        <NewResearchModal />
      </div>

      {(projects ?? []).length === 0 ? (
        <div className="rounded-xl border p-12 text-center" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: "var(--muted-foreground)" }} />
          <p className="font-medium mb-1" style={{ color: "var(--foreground)" }}>Nenhuma pesquisa ainda</p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Crie sua primeira pesquisa de mercado para começar a analisar concorrentes
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {(projects ?? []).map((p: { id: string; name: string; hypothesis: string; target_segment: string; status: string; created_at: string }) => (
            <Link key={p.id} href={`/pesquisa/${p.id}`}>
              <div className="rounded-xl border p-4 hover:border-indigo-500/50 transition-colors cursor-pointer h-full"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-sm leading-tight" style={{ color: "var(--foreground)" }}>{p.name}</h3>
                  <StatusBadge status={p.status} />
                </div>
                {p.hypothesis && (
                  <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--muted-foreground)" }}>{p.hypothesis}</p>
                )}
                <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                  {p.target_segment && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                      {p.target_segment}
                    </span>
                  )}
                  <span className="text-xs ml-auto" style={{ color: "var(--muted-foreground)" }}>
                    {countMap[p.id] ?? 0} anúncios
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
