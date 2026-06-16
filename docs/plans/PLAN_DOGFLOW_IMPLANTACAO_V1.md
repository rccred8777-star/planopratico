# PLAN — DogFlow Implantação V1

**Produto:** DogFlow — Desafio 7 Dias Cão Mais Educado
**Status:** Fase 1 pendente — infra VPS pronta ✅

---

## Fase 1 — Produto ⏳ PENDENTE

| # | Tarefa | Status |
|---|---|---|
| 1.1 | Escrever conteúdo dos 7 dias (objetivo, explicação, treino, erro, checklist, tarefa) | ✅ docs/product/CONTEUDO_7_DIAS_DOGFLOW_V1.md — aguarda aprovação humana |
| 1.2 | Criar PDF: Checklist diário de treino | ✅ docs/product/PDF_CHECKLIST_DIARIO_TREINO_DOGFLOW_V1.md — aguarda aprovação humana |
| 1.3 | Criar PDF: Guia xixi no lugar certo | ✅ docs/product/PDF_GUIA_XIXI_LUGAR_CERTO_V1.md — aguarda aprovação humana |
| 1.4 | Criar PDF: Guia passeio sem puxar | ✅ docs/product/PDF_GUIA_PASSEIO_SEM_PUXAR_V1.md — aguarda aprovação humana |
| 1.5 | Criar PDF: Lista de erros que fazem o cachorro desobedecer | ✅ docs/product/PDF_LISTA_ERROS_CACHORRO_DESOBEDECE_V1.md — aguarda aprovação humana |
| 1.6 | Criar PDF: Modelo de rotina para filhotes | ✅ docs/product/PDF_MODELO_ROTINA_FILHOTES_V1.md — aguarda aprovação humana |
| 1.7 | Revisar compliance (SPEC_COMPLIANCE_META_BEM_ESTAR_V1) | ✅ Disclaimer incluído em todos os PDFs — aprovação humana pendente |

## Fase 2 — Checkout (Kiwify) ✅ QUASE CONCLUÍDA

| # | Tarefa | Status |
|---|---|---|
| 2.1 | Criar conta Kiwify | ✅ conta criada e configurada |
| 2.2 | Cadastrar produto front-end R$27 | ✅ produto criado — confirmar URL do checkout |
| 2.3 | Configurar order bump | ✅ configurado |
| 2.4 | Configurar upsell | ✅ configurado |
| 2.5 | Configurar downsell | ✅ configurado |
| 2.6 | Configurar webhook Kiwify → app | ✅ `https://app.planopratico.shop/api/webhooks/kiwify?token=xfrktu3mbhz` |
| 2.7 | Teste de compra real (R$1) | ⏳ webhook validado via simulação — teste real após ativar conta Kiwify |

## Fase 3 — PWA (app.planopratico.shop) ✅ DEPLOY CONCLUÍDO

| # | Tarefa | Status |
|---|---|---|
| 3.1 | Scaffold Next.js PWA (manifest, service worker, mobile-first) | ✅ stacks/dogflow/source/ |
| 3.2 | Integração Supabase Auth (magic link + senha) | ✅ /criar-senha + middleware |
| 3.3 | Middleware de acesso: verificar purchases.status = active | ✅ src/middleware.ts + src/lib/access.ts |
| 3.4 | Tela /meu-pet (cadastro do cão) | ✅ |
| 3.5 | Tela /treinos (lista 7 dias + progresso visual) | ✅ |
| 3.6 | Tela /treino/[id] (conteúdo completo + checklist) | ✅ |
| 3.7 | Tela /progresso (dias concluídos + conquistas) | ✅ |
| 3.7b | Tela /planos (assinatura pós-desafio) | ✅ |
| 3.7c | Bottom NavBar (treinos/progresso/planos) | ✅ src/components/BottomNav.tsx |
| 3.7d | Webhook Kiwify → criar purchase + invite user | ✅ src/app/api/webhooks/kiwify/route.ts |
| 3.8 | Schema SQL Supabase + seed módulos | ✅ executado via API — 6 tabelas + RLS + 8 módulos seed ativos |
| 3.9 | Docker na VPS + proxy NPM + SSL (app.planopratico.shop) | ✅ dogflow UP porta 3001, proxy NPM ID=5, cert Let's Encrypt expira 2026-09-13 |
| 3.10 | Teste de acesso: compra → link → senha → app | ⏳ após Fase 2 (Kiwify) |

## Fase 3B — Funil (Landing + VSL) ⏳ PENDENTE

| # | Tarefa | Status |
|---|---|---|
| 3B.1 | Criar landing page (planopratico.shop/dogflow) | ✅ landing/dogflow-xixi/index.html — substituir URL Kiwify |
| 3B.2 | Gravar Mini-VSL (ao menos 1 versão — dor geral) | ⏳ roteiro pronto (MINI_VSL_DOGFLOW_XIXI_LUGAR_CERTO_V1.md) — gravação requer ação humana |
| 3B.3 | Criar página de obrigado + entrega | ✅ landing/dogflow-xixi/obrigado.html |
| 3B.4 | Revisão compliance em todas as páginas | ✅ disclaimer incluído — aprovação humana pendente |

## Fase 3C — Quiz Funil (quiz.planopratico.shop) ✅ HERMES CONCLUÍDO

| # | Tarefa | Status |
|---|---|---|
| 3C.1 | Criar quiz HTML self-contained (5 perguntas SPIN) | ✅ landing/quiz/index.html |
| 3C.2 | Resultado personalizado por tipo de problema (6 variantes) | ✅ incluído |
| 3C.3 | Captura nome + e-mail antes do resultado | ✅ incluído |
| 3C.4 | Loading "Analisando suas respostas..." (4 etapas) | ✅ incluído |
| 3C.5 | UTM params dinâmicos no CTA Kiwify | ✅ utm_campaign = problema selecionado |
| 3C.6 | Substituir URL Kiwify SUBSTITUIR | ⏳ após Fase 2 |
| 3C.7 | Colar Pixel Meta (Lead event) | ⏳ após Fase 4 |
| 3C.8 | Deploy quiz.planopratico.shop (NPM proxy + VPS) | ⏳ requer ação humana |

## Fase 4 — Rastreamento ⏳ PENDENTE

| # | Tarefa | Status |
|---|---|---|
| 4.1 | Instalar Pixel Meta em todas as páginas | ⏳ |
| 4.2 | Configurar UTMify | ⏳ |
| 4.3 | Mapear eventos: PageView, Lead, InitiateCheckout, Purchase, Upsell | ⏳ |
| 4.4 | Testar disparo de eventos (Meta Events Manager) | ⏳ |

## Fase 5 — Pós-venda (n8n + wacrm) ⏳ PENDENTE

| # | Tarefa | Status |
|---|---|---|
| 5.1 | Criar workflow n8n: boas-vindas D+0 | ✅ W1_BOASVINDAS_D0.json |
| 5.2 | Criar workflow n8n: lembretes D+1 a D+6 | ✅ W2_LEMBRETES_D1_D6.json |
| 5.3 | Criar workflow n8n: check-in D+3 | ✅ incluído no W2 (ramo D+3) |
| 5.4 | Criar workflow n8n: oferta backend D+7 e D+14 | ✅ W3_OFERTA_D7_D14.json |
| 5.5 | Criar workflow n8n: recuperação de carrinho (30min + D+1 + D+2) | ✅ W4_RECUPERACAO_CARRINHO.json |
| 5.5b | Criar workflow n8n: responder mensagens WaCRM | ✅ W5_WACRM_RESPONDER_MENSAGEM.json |
| 5.6 | Configurar templates WhatsApp no Meta | ✅ WHATSAPP_TEMPLATES.md (7 templates) — aprovação Meta pendente |
| 5.7 | Importar workflows + ativar + teste de compra real | ⏳ requer ação humana (ver RUNBOOK_SETUP_FASE5.md) |

## Fase 6 — Tráfego (Meta Ads) ⏳ PENDENTE

| # | Tarefa | Status |
|---|---|---|
| 6.1 | Criar conta Meta Business | ⏳ |
| 6.2 | Configurar número novo WhatsApp (Cloud API) | ⏳ |
| 6.3 | Aprovação da conta Meta | ⏳ |
| 6.4 | Criar criativos por dor: xixi / guia / latido / pulo / filhote | ⏳ |
| 6.5 | Configurar campanha de conversão (Purchase) | ⏳ |
| 6.6 | Configurar UTMs em todos os anúncios | ⏳ |
| 6.7 | Lançar com orçamento mínimo e validar CPA | ⏳ |

---

## Dependências

```
Infra VPS ✅ → Kiwify → Landing → Pixel → n8n fluxos → Meta Ads
                                    ↑
                              Produto pronto (Fase 1)
```

---

## Próxima ação

**Fase 1.1** — escrever o conteúdo dos 7 dias. Hermes pode gerar o rascunho completo aguardando aprovação humana.
