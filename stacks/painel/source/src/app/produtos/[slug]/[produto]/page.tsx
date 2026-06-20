import { createServerClient } from "@/lib/supabase/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";

export const dynamic = 'force-dynamic';
import { TopHooksChart } from "@/app/pesquisa/[id]/top-hooks-chart";

export const revalidate = 60;

export default async function ProdutoDetailPage({
  params,
}: {
  params: Promise<{ slug: string; produto: string }>;
}) {
  const { slug, produto } = await params;
  const supabase = createServerClient();

  const { data: segment } = await supabase.from("segments").select("*").eq("slug", slug).single();
  if (!segment) notFound();

  const { data: product } = await supabase.from("products").select("*").eq("slug", produto).eq("segment_id", segment.id).single();
  if (!product) notFound();

  const { data: ads } = await supabase
    .from("competitor_ads")
    .select("id,page_name,status,created_at,ad_snapshot_url")
    .eq("product_id", product.id)
    .order("created_at", { ascending: false });

  const adIds = (ads ?? []).map((a: { id: string }) => a.id);
  const { data: angles } = adIds.length > 0
    ? await supabase.from("competitor_angles").select("*").in("competitor_ad_id", adIds)
    : { data: [] };

  const { data: ytVideos } = await supabase
    .from("youtube_videos")
    .select("video_id,title,keyword,view_count,gemini_analysis")
    .eq("product_id", product.id)
    .not("gemini_analysis", "is", null);

  const { count: ytCommentsCount } = await supabase
    .from("youtube_comments")
    .select("*", { count: "exact", head: true })
    .eq("product_id", product.id);

  const ytDores: string[] = [];
  const ytPerguntas: string[] = [];
  const ytObjecoes: string[] = [];
  const ytLinguagem: string[] = [];
  (ytVideos ?? []).forEach((v: { gemini_analysis: Record<string, string[]> }) => {
    const a = v.gemini_analysis;
    if (!a) return;
    (a.dores || []).forEach((d: string) => ytDores.push(d));
    (a.perguntas || []).forEach((p: string) => ytPerguntas.push(p));
    (a.objecoes || []).forEach((o: string) => ytObjecoes.push(o));
    (a.linguagem || []).forEach((l: string) => ytLinguagem.push(l));
  });
  const uniq = (arr: string[]) => [...new Set(arr)];

  const statusCounts = { discovered: 0, transcribed: 0, analyzed: 0 };
  (ads ?? []).forEach((a: { status: string }) => {
    if (a.status in statusCounts) statusCounts[a.status as keyof typeof statusCounts]++;
  });

  const total = (ads ?? []).length;

  const hookCount: Record<string, number> = {};
  (angles ?? []).forEach((a: { hook: string }) => {
    if (a.hook) hookCount[a.hook.substring(0, 80)] = (hookCount[a.hook.substring(0, 80)] ?? 0) + 1;
  });
  const topHooks = Object.entries(hookCount).sort(([, a], [, b]) => b - a).slice(0, 10).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
        <Link href="/produtos" className="hover:text-white transition-colors">Produtos</Link>
        <span>/</span>
        <Link href={`/produtos/${slug}`} className="hover:text-white transition-colors">{segment.name}</Link>
        <span>/</span>
        <span style={{ color: "var(--foreground)" }}>{product.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href={`/produtos/${slug}`} className="p-1.5 rounded-lg hover:bg-white/5 mt-1" style={{ color: "var(--muted-foreground)" }}>
          <ArrowLeft className="w-4 h-4" />
        </Link>
        {product.expert_avatar_url ? (
          <img src={product.expert_avatar_url} alt={product.expert_name} className="w-14 h-14 rounded-full object-cover" />
        ) : product.expert_name ? (
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
            style={{ background: segment.color + "33", color: segment.color }}>
            {product.expert_name[0]}
          </div>
        ) : null}
        <div className="flex-1">
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{product.name}</h1>
          {product.expert_name && <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Especialista: {product.expert_name}</p>}
          {product.launch_date && <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            Lançamento: {new Date(product.launch_date).toLocaleDateString("pt-BR")}
          </p>}
        </div>
        <StatusBadge status={product.status ?? "active"} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Anúncios", value: total, color: "#3b82f6" },
          { label: "Transcritos", value: statusCounts.transcribed, color: "#eab308" },
          { label: "Analisados", value: statusCounts.analyzed, color: "#22c55e" },
          { label: "Ângulos", value: (angles ?? []).length, color: "#a855f7" },
          { label: "Comentários YT", value: ytCommentsCount ?? 0, color: "#ef4444" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline bar */}
      {total > 0 && (
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>Pipeline Espião</h2>
          <div className="flex rounded-full overflow-hidden h-6">
            {[
              { key: "discovered", color: "#3b82f6", n: statusCounts.discovered },
              { key: "transcribed", color: "#eab308", n: statusCounts.transcribed },
              { key: "analyzed", color: "#22c55e", n: statusCounts.analyzed },
            ].map(s => (
              s.n > 0 && (
                <div key={s.key} className="flex items-center justify-center text-xs font-medium text-white"
                  style={{ width: `${(s.n / total) * 100}%`, background: s.color }}>
                  {Math.round((s.n / total) * 100)}%
                </div>
              )
            ))}
          </div>
          <div className="flex gap-4 mt-2">
            {[
              { label: "Descobertos", color: "#3b82f6", n: statusCounts.discovered },
              { label: "Transcritos", color: "#eab308", n: statusCounts.transcribed },
              { label: "Analisados", color: "#22c55e", n: statusCounts.analyzed },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                {s.label}: {s.n}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ads table */}
      <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Anúncios — Espião</h2>
        </div>
        {(ads ?? []).length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
            Nenhum anúncio ainda. Configure o EW1 com product_id: <code className="font-mono text-xs px-1 rounded" style={{ background: "var(--muted)" }}>{product.id}</code>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {(ads ?? []).slice(0, 20).map((ad: { id: string; page_name: string; status: string; created_at: string; ad_snapshot_url: string }) => (
              <div key={ad.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{ad.page_name}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {new Date(ad.created_at).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={ad.status} />
                  {ad.ad_snapshot_url && (
                    <a href={ad.ad_snapshot_url} target="_blank" rel="noreferrer"
                      className="text-xs underline" style={{ color: "var(--primary)" }}>Ver</a>
                  )}
                </div>
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

      {/* Voz do Cliente — YouTube */}
      <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <div>
            <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Voz do Cliente — YouTube</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              {(ytVideos ?? []).length} vídeos analisados · {ytCommentsCount ?? 0} comentários reais
            </p>
          </div>
          <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: "#ef444422", color: "#ef4444" }}>EW5+EW6</span>
        </div>

        {(ytVideos ?? []).length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
            Aguardando análise de comentários YouTube.<br />
            <span className="text-xs opacity-60">EW5 roda toda segunda às 7h BRT · EW6 analisa após coleta.</span>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Dores", items: uniq(ytDores).slice(0, 7), color: "#ef4444", bg: "#ef444415" },
              { label: "Perguntas", items: uniq(ytPerguntas).slice(0, 6), color: "#f59e0b", bg: "#f59e0b15" },
              { label: "Objeções", items: uniq(ytObjecoes).slice(0, 6), color: "#8b5cf6", bg: "#8b5cf615" },
              { label: "Linguagem real", items: uniq(ytLinguagem).slice(0, 7), color: "#10b981", bg: "#10b98115" },
            ].map(col => (
              <div key={col.label}>
                <div className="text-xs font-semibold mb-2" style={{ color: col.color }}>{col.label}</div>
                <div className="space-y-1.5">
                  {col.items.length === 0 ? (
                    <span className="text-xs opacity-40" style={{ color: "var(--muted-foreground)" }}>—</span>
                  ) : col.items.map((item, i) => (
                    <div key={i} className="text-xs px-2 py-1.5 rounded-lg leading-snug"
                      style={{ background: col.bg, color: "var(--foreground)" }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Angles */}
      {(angles ?? []).length > 0 && (
        <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
            <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Ângulos extraídos</h2>
          </div>
          <div className="divide-y max-h-72 overflow-y-auto" style={{ borderColor: "var(--border)" }}>
            {(angles ?? []).slice(0, 30).map((a: { id: string; hook: string; pain_point: string; cta: string; tone: string }) => (
              <div key={a.id} className="px-4 py-3 space-y-1">
                {a.hook && <div className="text-xs"><span className="font-medium" style={{ color: "var(--muted-foreground)" }}>Hook: </span><span style={{ color: "var(--foreground)" }}>{a.hook}</span></div>}
                {a.pain_point && <div className="text-xs"><span className="font-medium" style={{ color: "var(--muted-foreground)" }}>Dor: </span><span style={{ color: "var(--foreground)" }}>{a.pain_point}</span></div>}
                {a.cta && <div className="text-xs"><span className="font-medium" style={{ color: "var(--muted-foreground)" }}>CTA: </span><span style={{ color: "var(--foreground)" }}>{a.cta}</span></div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
