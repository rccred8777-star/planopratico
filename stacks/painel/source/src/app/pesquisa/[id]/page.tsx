import { createServerClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/status-badge";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';
import { TopHooksChart } from "./top-hooks-chart";

export const revalidate = 60;

export default async function PesquisaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: project } = await supabase.from("research_projects").select("*").eq("id", id).single();
  if (!project) notFound();

  const { data: ads } = await supabase
    .from("competitor_ads")
    .select("id,page_name,status,created_at")
    .eq("research_project_id", id)
    .order("created_at", { ascending: false });

  const adIds = (ads ?? []).map((a: { id: string }) => a.id);
  const { data: angles } = adIds.length > 0
    ? await supabase.from("competitor_angles").select("hook,pain_point,competitor_ad_id").in("competitor_ad_id", adIds)
    : { data: [] };

  // Top hooks
  const hookCount: Record<string, number> = {};
  (angles ?? []).forEach((a: { hook: string }) => {
    if (a.hook) hookCount[a.hook.substring(0, 80)] = (hookCount[a.hook.substring(0, 80)] ?? 0) + 1;
  });
  const topHooks = Object.entries(hookCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, value]) => ({ name, value }));

  const tabItems = [
    { key: "anuncios", label: `Anúncios (${(ads ?? []).length})` },
    { key: "angulos", label: `Ângulos (${(angles ?? []).length})` },
    { key: "insights", label: "Insights" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/pesquisa" className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: "var(--muted-foreground)" }}>
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <Search className="w-5 h-5" style={{ color: "var(--primary)" }} />
        <div className="flex-1">
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{project.name}</h1>
          {project.target_segment && (
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{project.target_segment}</p>
          )}
        </div>
        <StatusBadge status={project.status} />
      </div>

      {project.hypothesis && (
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>HIPÓTESE</p>
          <p className="text-sm" style={{ color: "var(--foreground)" }}>{project.hypothesis}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        {/* Anúncios Tab */}
        <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Anúncios coletados</h2>
        </div>
        {(ads ?? []).length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
            Nenhum anúncio vinculado a esta pesquisa ainda.<br />
            Configure o EW1 com o research_project_id: <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ background: "var(--muted)" }}>{id}</code>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {(ads ?? []).map((ad: { id: string; page_name: string; status: string; created_at: string }) => (
              <div key={ad.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{ad.page_name}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {new Date(ad.created_at).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                <StatusBadge status={ad.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Hooks */}
      {topHooks.length > 0 && (
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>Top Hooks dos concorrentes</h2>
          <TopHooksChart data={topHooks} />
        </div>
      )}

      {/* Angles summary */}
      {(angles ?? []).length > 0 && (
        <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
            <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Ângulos extraídos</h2>
          </div>
          <div className="divide-y max-h-64 overflow-y-auto" style={{ borderColor: "var(--border)" }}>
            {(angles ?? []).map((a: { hook: string; pain_point: string; competitor_ad_id: string }, i: number) => (
              <div key={i} className="px-4 py-3">
                {a.hook && <div className="text-xs mb-1"><span className="font-medium" style={{ color: "var(--muted-foreground)" }}>Hook: </span><span style={{ color: "var(--foreground)" }}>{a.hook}</span></div>}
                {a.pain_point && <div className="text-xs"><span className="font-medium" style={{ color: "var(--muted-foreground)" }}>Dor: </span><span style={{ color: "var(--foreground)" }}>{a.pain_point}</span></div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
