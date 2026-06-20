import { createServerClient } from "@/lib/supabase/server";
import { Wrench, Activity, MessageSquare, Database, BarChart2, RefreshCw } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";

export const dynamic = 'force-dynamic';

async function checkN8n() {
  try {
    const res = await fetch("https://n8n.planopratico.shop/healthz", {
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    return { status: res.ok ? "online" : "offline", count: 0 };
  } catch {
    return { status: "offline", count: 0 };
  }
}

export default async function FerramentasPage() {
  const supabase = createServerClient();

  const [
    n8nStatus,
    { data: waConfig },
    { count: adsTotal },
    { count: transcriptsTotal },
    { count: anglesTotal },
    { count: segmentsTotal },
    { count: productsTotal },
    { data: recentAds },
  ] = await Promise.all([
    checkN8n(),
    supabase.from("whatsapp_config").select("status,phone_number_id,connected_at").maybeSingle(),
    supabase.from("competitor_ads").select("*", { count: "exact", head: true }),
    supabase.from("competitor_transcripts").select("*", { count: "exact", head: true }),
    supabase.from("competitor_angles").select("*", { count: "exact", head: true }),
    supabase.from("segments").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("competitor_ads").select("id,page_name,status,created_at").order("created_at", { ascending: false }).limit(10),
  ]);

  const waStatus = waConfig?.status ?? "disconnected";

  const tools = [
    {
      name: "n8n",
      description: "Orquestrador de workflows (EW1–EW4)",
      icon: Activity,
      color: "#f97316",
      status: n8nStatus.status,
      detail: n8nStatus.status === "online" ? `${n8nStatus.count} workflows` : "Sem resposta",
      link: "https://n8n.planopratico.shop",
    },
    {
      name: "WaCRM",
      description: "CRM WhatsApp Cloud API",
      icon: MessageSquare,
      color: "#22c55e",
      status: waStatus,
      detail: waConfig?.phone_number_id ? `ID: ${waConfig.phone_number_id}` : "Não configurado",
      link: "https://crm.planopratico.shop",
    },
    {
      name: "Meta Ads",
      description: "Biblioteca de anúncios dos concorrentes",
      icon: BarChart2,
      color: "#3b82f6",
      status: "online",
      detail: "Token configurado no n8n",
      link: "https://business.facebook.com",
    },
    {
      name: "Supabase",
      description: "Banco de dados e armazenamento",
      icon: Database,
      color: "#a855f7",
      status: "online",
      detail: `${(adsTotal ?? 0) + (transcriptsTotal ?? 0) + (anglesTotal ?? 0)} registros`,
      link: "https://supabase.com/dashboard",
    },
  ];

  const dbStats = [
    { label: "Segmentos", value: segmentsTotal ?? 0 },
    { label: "Produtos", value: productsTotal ?? 0 },
    { label: "Anúncios", value: adsTotal ?? 0 },
    { label: "Transcritos", value: transcriptsTotal ?? 0 },
    { label: "Ângulos", value: anglesTotal ?? 0 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Wrench className="w-6 h-6" style={{ color: "var(--primary)" }} />
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Ferramentas</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Status e monitoramento das ferramentas</p>
        </div>
      </div>

      {/* Tool cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <a key={t.name} href={t.link} target="_blank" rel="noreferrer"
              className="rounded-xl border p-4 hover:border-indigo-500/50 transition-colors block"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: t.color + "22" }}>
                    <Icon className="w-5 h-5" style={{ color: t.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{t.name}</h3>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{t.description}</p>
                  </div>
                </div>
                <StatusBadge status={t.status} />
              </div>
              <p className="text-xs pl-13" style={{ color: "var(--muted-foreground)" }}>{t.detail}</p>
            </a>
          );
        })}
      </div>

      {/* DB Stats */}
      <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>Supabase — Volume de dados</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {dbStats.map(s => (
            <div key={s.label} className="text-center p-3 rounded-lg" style={{ background: "var(--muted)" }}>
              <div className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Últimos 10 anúncios coletados</h2>
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {(recentAds ?? []).length === 0 ? (
            <div className="p-8 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>Nenhum dado ainda</div>
          ) : (
            (recentAds ?? []).map((ad: { id: string; page_name: string; status: string; created_at: string }) => (
              <div key={ad.id} className="flex items-center justify-between px-4 py-2.5">
                <div className="text-sm" style={{ color: "var(--foreground)" }}>{ad.page_name}</div>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {new Date(ad.created_at).toLocaleDateString("pt-BR")}
                  </span>
                  <StatusBadge status={ad.status} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
