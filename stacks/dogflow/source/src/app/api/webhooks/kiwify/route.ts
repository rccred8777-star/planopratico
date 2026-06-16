import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const PRODUCT_ID = 'dogflow_7dias'
const N8N_BOASVINDAS_URL = 'https://n8n.planopratico.shop/webhook/kiwify-compra'
const N8N_CARRINHO_URL   = 'https://n8n.planopratico.shop/webhook/kiwify-carrinho'

function verifyToken(req: NextRequest): boolean {
  const token = req.nextUrl.searchParams.get('token')
  return token === process.env.KIWIFY_WEBHOOK_SECRET
}

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

async function forwardToN8n(url: string, body: unknown) {
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch (e) {
    console.error(`n8n forward failed (${url})`, e)
  }
}

export async function POST(req: NextRequest) {
  if (!verifyToken(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Kiwify envolve o payload dentro de body.order
  const order   = body?.order ?? body
  const event   = order?.webhook_event_type ?? order?.order_status ?? body?.event ?? body?.status
  const orderId = order?.order_id ?? order?.id ?? body?.id ?? body?.order_id
  const email   = order?.Customer?.email  ?? order?.customer?.email  ?? body?.Customer?.email  ?? body?.customer?.email
  const phone   = (order?.Customer?.mobile ?? order?.customer?.mobile ?? order?.customer?.phone ?? body?.Customer?.mobile ?? '').replace(/\D/g, '')
  const name    = order?.Customer?.full_name ?? order?.Customer?.name ?? order?.customer?.name ?? body?.Customer?.name ?? ''

  if (!email || !orderId) {
    return NextResponse.json({ error: 'Missing email or order_id' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // ── Compra aprovada ──────────────────────────────────────────
  if (event === 'order_approved' || event === 'paid') {
    const { error: purchaseErr } = await supabase
      .from('purchases')
      .upsert({
        email,
        customer_name:  name  || null,
        customer_phone: phone || null,
        kiwify_order_id: orderId,
        product: PRODUCT_ID,
        status: 'active',
      }, { onConflict: 'kiwify_order_id' })

    if (purchaseErr) {
      console.error('purchases upsert error', purchaseErr)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    // Invite user — magic link de criação de senha
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://app.planopratico.shop'
    const { error: inviteErr } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${siteUrl}/criar-senha`,
    })
    if (inviteErr && !inviteErr.message.toLowerCase().includes('already')) {
      console.error('invite error', inviteErr)
    }

    // Vincular user_id à purchase (se usuário já existe)
    const { data: { users } } = await supabase.auth.admin.listUsers()
    const user = users.find(u => u.email === email)
    if (user) {
      await supabase.from('purchases').update({ user_id: user.id }).eq('kiwify_order_id', orderId)
    }

    // Disparar workflow n8n de boas-vindas (normalizado para o W1)
    await forwardToN8n(N8N_BOASVINDAS_URL, {
      event: 'order_approved',
      id: orderId,
      Customer: { name, email, mobile: phone },
    })

    return NextResponse.json({ ok: true })
  }

  // ── Reembolso / chargeback ───────────────────────────────────
  if (event === 'order_refunded' || event === 'order_chargeback' || event === 'refunded') {
    await supabase
      .from('purchases')
      .update({ status: event === 'order_chargeback' ? 'chargeback' : 'refunded' })
      .eq('kiwify_order_id', orderId)
    return NextResponse.json({ ok: true })
  }

  // ── Carrinho abandonado ──────────────────────────────────────
  if (event === 'abandoned_cart' || event === 'order_abandoned') {
    await forwardToN8n(N8N_CARRINHO_URL, body)
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ ok: true, ignored: true })
}
