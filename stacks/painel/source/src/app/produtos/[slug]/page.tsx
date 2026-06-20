import { createServerClient } from "@/lib/supabase/server";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";

export const dynamic = 'force-dynamic';
import { NewProductModal } from "./new-product-modal";

export const revalidate = 60;

export default async function SegmentoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data: segment } = await supabase.from("segments").select("*").eq("slug", slug).single();
  if (!segment) notFound();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("segment_id", segment.id)
    .order("created_at", { ascending: false });

  // Ads count per product
  const prodIds = (products ?? []).map((p: { id: string }) => p.id);
  const { data: adCounts } = prodIds.length > 0
    ? await supabase.from("competitor_ads").select("product_id").in("product_id", prodIds)
    : { data: [] };
  const countMap: Record<string, number> = {};
  (adCounts ?? []).forEach((a: { product_id: string }) => {
    if (a.product_id) countMap[a.product_id] = (countMap[a.product_id] ?? 0) + 1;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/produtos" className="p-1.5 rounded-lg hover:bg-white/5" style={{ color: "var(--muted-foreground)" }}>
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <span className="text-2xl">{segment.icon}</span>
        <div className="flex-1">
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{segment.name}</h1>
          {segment.description && <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{segment.description}</p>}
        </div>
        <NewProductModal segmentId={segment.id} segmentSlug={slug} />
      </div>

      {(products ?? []).length === 0 ? (
        <div className="rounded-xl border p-12 text-center" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <Package className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: "var(--muted-foreground)" }} />
          <p className="font-medium mb-1" style={{ color: "var(--foreground)" }}>Nenhum produto ainda</p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Crie o primeiro produto neste segmento</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {(products ?? []).map((p: { id: string; name: string; slug: string; expert_name: string; expert_avatar_url: string; status: string }) => (
            <Link key={p.id} href={`/produtos/${slug}/${p.slug}`}>
              <div className="rounded-xl border p-4 hover:border-indigo-500/50 transition-colors cursor-pointer"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{p.name}</h3>
                  <StatusBadge status={p.status ?? "active"} />
                </div>
                {p.expert_name && (
                  <div className="flex items-center gap-2 mb-3">
                    {p.expert_avatar_url ? (
                      <img src={p.expert_avatar_url} alt={p.expert_name} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: segment.color + "33", color: segment.color }}>
                        {p.expert_name[0]}
                      </div>
                    )}
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.expert_name}</span>
                  </div>
                )}
                <div className="text-xs pt-2 border-t" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                  {countMap[p.id] ?? 0} anúncios coletados
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
