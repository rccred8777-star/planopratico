# Runbook — Fase 5: Workflows n8n Pós-Venda DogFlow

## Pré-requisitos

- [ ] Conta Meta Business ativa (Fase 6.1)
- [ ] Número WhatsApp Business com Cloud API (Fase 6.2)
- [ ] Kiwify conta + produto configurado (Fase 2)
- [ ] App DogFlow no ar (Fase 3.9)
- [ ] n8n acessível em https://n8n.planopratico.shop

---

## Passo 1 — Variáveis globais no n8n

Acesse n8n → Settings → Variables e crie:

| Nome                  | Valor                                                    |
|-----------------------|----------------------------------------------------------|
| `WA_PHONE_NUMBER_ID`  | ID do número no Meta (WhatsApp Manager → Phone Numbers)  |
| `WA_BUSINESS_TOKEN`   | Token de acesso permanente do Meta                       |
| `SUPABASE_URL`        | `https://oardxsdiwaxmpomxhfls.supabase.co`               |
| `SUPABASE_SERVICE_KEY`| Service role key do Supabase (Settings → API)            |

---

## Passo 2 — Importar os workflows

No n8n → Workflows → Import:

| Arquivo                          | O que faz                                      |
|----------------------------------|------------------------------------------------|
| `W1_BOASVINDAS_D0.json`          | Boas-vindas imediatas pós-compra               |
| `W2_LEMBRETES_D1_D6.json`        | Lembretes diários + check-in D+3               |
| `W3_OFERTA_D7_D14.json`          | Oferta de assinatura no D+7 e D+14             |
| `W4_RECUPERACAO_CARRINHO.json`   | Sequência de recuperação (30min + D+1 + D+2)   |
| `W5_WACRM_RESPONDER_MENSAGEM.json` | Responder mensagens recebidas pelo WaCRM     |

---

## Passo 3 — Aprovar templates no Meta

Seguir `WHATSAPP_TEMPLATES.md` — 7 templates a criar e aprovar.

**Atenção:** os workflows enviam por `template.name`. Os nomes dos templates no código devem bater exatamente com os aprovados no Meta.

Templates necessários:
```
dogflow_boas_vindas         (Utility)  — W1
dogflow_lembrete_dia        (Utility)  — W2
dogflow_checkin_d3          (Utility)  — W2
dogflow_oferta_assinatura   (Marketing)— W3
dogflow_recuperacao_1       (Utility)  — W4
dogflow_recuperacao_2       (Utility)  — W4
dogflow_recuperacao_3       (Utility)  — W4
```

---

## Passo 4 — Configurar Kiwify para mandar webhooks

No painel Kiwify → produto DogFlow → Webhooks → adicionar:

| Evento             | URL                                                              |
|--------------------|------------------------------------------------------------------|
| Compra aprovada    | `https://app.planopratico.shop/api/webhooks/kiwify?token=<SECRET>` |
| Carrinho abandonado| `https://app.planopratico.shop/api/webhooks/kiwify?token=<SECRET>` |

O app Next.js recebe ambos e faz o forward para o n8n automaticamente:
- Compra → forward para `/webhook/kiwify-compra` (W1)
- Carrinho → forward para `/webhook/kiwify-carrinho` (W4)

---

## Passo 5 — Executar migração de schema (se ainda não fez)

No Supabase SQL Editor:
```sql
-- Adicionar colunas se já tiver a tabela purchases criada antes do schema atualizado
ALTER TABLE purchases
  ADD COLUMN IF NOT EXISTS customer_name  text,
  ADD COLUMN IF NOT EXISTS customer_phone text;
```

---

## Passo 6 — Ativar os workflows

**Ordem de ativação:**

1. Ativar **W1** (webhook de boas-vindas) — aguardar primeira compra de teste para validar
2. Ativar **W4** (recuperação de carrinho) — testar com número pessoal se possível
3. Ativar **W5** (responder mensagens WaCRM)
4. Ativar **W2** (lembretes diários) — verificar que os templates estão aprovados
5. Ativar **W3** (oferta assinatura) — só após D+7 da primeira compra real

---

## Passo 7 — Teste completo (5.7)

1. Fazer compra de teste no Kiwify (R$1 ou produto de teste)
2. Verificar:
   - [ ] Purchase criada no Supabase com phone + name
   - [ ] Magic link chegou no e-mail
   - [ ] WhatsApp de boas-vindas recebido em ~1 min
3. Aguardar D+1 e verificar:
   - [ ] Lembrete recebido às 9h BRT
4. Simular abandono de carrinho e verificar:
   - [ ] Mensagem 1 recebida em 30 min
   - [ ] Mensagem 2 recebida em D+1
5. Testar resposta de suporte no WaCRM:
   - [ ] Enviar "como acesso?" → verificar resposta automática

---

## Fluxo completo pós-compra

```
Compra Kiwify
    │
    ▼
Next.js /api/webhooks/kiwify
    ├─► Supabase: upsert purchase (com phone + name)
    ├─► Supabase Auth: invite user (magic link → /criar-senha)
    └─► n8n /webhook/kiwify-compra (W1)
            │
            ▼
        WhatsApp: dogflow_boas_vindas (D+0)
            
Cron diário 9h (W2)
    ├─ D+1 → dogflow_lembrete_dia (dia 1)
    ├─ D+2 → dogflow_lembrete_dia (dia 2)
    ├─ D+3 → dogflow_checkin_d3
    ├─ D+4 → dogflow_lembrete_dia (dia 4)
    ├─ D+5 → dogflow_lembrete_dia (dia 5)
    └─ D+6 → dogflow_lembrete_dia (dia 6)

Cron diário 10h (W3)
    ├─ D+7  → dogflow_oferta_assinatura (se sem assinatura)
    └─ D+14 → dogflow_oferta_assinatura (se ainda sem assinatura)

Carrinho abandonado → n8n /webhook/kiwify-carrinho (W4)
    ├─ +30min → dogflow_recuperacao_1
    ├─ +24h   → dogflow_recuperacao_2
    └─ +24h   → dogflow_recuperacao_3

Mensagem recebida WaCRM → n8n /webhook/wacrm-eventos (W5)
    ├─ "acesso/senha/login" → resposta automática de suporte
    └─ "reembolso/cancelar" → resposta automática de reembolso
```
