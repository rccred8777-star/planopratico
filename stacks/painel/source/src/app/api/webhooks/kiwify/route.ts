import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KIWIFY_TOKEN = process.env.KIWIFY_WEBHOOK_TOKEN || "";

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token || token !== KIWIFY_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const order = (body.order ?? body) as Record<string, unknown>;
  const eventType =
    (order.webhook_event_type as string) ||
    (body.event as string) ||
    "unknown";

  if (eventType !== "order_approved") {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const customer = (order.Customer ?? order.customer ?? {}) as Record<string, unknown>;
  const productName = (order.Product as Record<string, unknown>)?.name ?? "Produto desconhecido";
  const amount = ((order.amount as number) ?? 0) / 100;
  const orderId = (order.order_id as string) ?? (order.id as string) ?? "unknown";
  const customerName = (customer.full_name as string) ?? (customer.name as string) ?? "Cliente";
  const customerEmail = (customer.email as string) ?? "";
  const customerPhone = (customer.mobile as string) ?? (customer.phone as string) ?? "";

  const supabase = createServerClient();

  // Salvar venda na tabela de vendas do agente
  await supabase.from("agent_vendas").upsert(
    {
      order_id: orderId,
      event: eventType,
      produto: productName,
      valor: amount,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      payload: body,
      created_at: new Date().toISOString(),
    },
    { onConflict: "order_id" }
  );

  // Salvar também em agent_memory para o agente saber da venda
  await supabase.from("agent_memory").upsert(
    {
      chave: `venda_${orderId}`,
      valor: `Nova venda! ${customerName} comprou ${productName} por R$${amount.toFixed(2)} em ${new Date().toLocaleDateString("pt-BR")}`,
      categoria: "campanha",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "chave" }
  );

  return NextResponse.json({ ok: true, order_id: orderId });
}
