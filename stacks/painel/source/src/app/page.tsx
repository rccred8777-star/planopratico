import { createServerClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/status-badge";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { LayoutDashboard } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = createServerClient();

  const [
    { count: segmentsCount },
    { count: productsCount },
    { count: adsCount },
    { count: anglesCount },
    { data: recentAds },
    { data: allAds },
  ] = await Promise.all([
    supabase.from("segments").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("competitor_ads").select("*", { count: "exact", head: true }),
    supabase.from("competitor_angles").select("*", { count: "exact", head: true }),
    supabase.from("competitor_ads").select("id,page_name,status,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("competitor_ads").select("status,created_at").order("created_at", { ascending: false }).limit(500),
  ]);

  // Pipeline funnel data
  const statusCounts = { discovered: 0, transcribed: 0, analyzed: 0 };
  (allAds ?? []).forEach((ad: { status: string }) => {
    if (ad.status in statusCounts) statusCounts[ad.status as keyof typeof statusCounts]++;
  });

  // Ads per day last 14 days
  const now = new Date();
  const days: { date: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    const count = (allAds ?? []).filter((ad: { created_at: string }) => {
      const adDate = new Date(ad.created_at);
      return adDate.toDateString() === d.toDateString();
    }).length;
    days.push({ date: label, count });
  }

  const stats = [
    { label: "Segmentos", value: segmentsCount ?? 0, color: "#6366f1", sub: "cadastrados" },
    { label: "Produtos", value: productsCount ?? 0, color: "#22c55e", sub: "ativos" },
    { label: "Anúncios", value: adsCount ?? 0, color: "#3b82f6", sub: "coletados" },
    { label: "Ângulos", value: anglesCount ?? 0, color: "#f59e0b", sub: "gerados" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="w-6 h-6" style={{ color: "var(--primary)" }} />
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Visão Geral</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Operação completa PlanoPratico</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{s.label}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>Anúncios coletados — últimos 14 dias</h2>
          <BarChartComponent data={days} />
        </div>
        <div className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>Pipeline Espião</h2>
          <FunnelChart discovered={statusCounts.discovered} transcribed={statusCounts.transcribed} analyzed={statusCounts.analyzed} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Atividade recente</h2>
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {(recentAds ?? []).length === 0 ? (
            <div className="px-4 py-8 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
              Nenhum anúncio coletado ainda
            </div>
          ) : (
            (recentAds ?? []).map((ad: { id: string; page_name: string; status: string; created_at: string }) => (
              <div key={ad.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{ad.page_name}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {new Date(ad.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
                <StatusBadge status={ad.status} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
