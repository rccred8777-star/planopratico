# PLAN — Implantação Base SDD V1

## Fase 0 — Auditoria ✅ CONCLUÍDA

| # | Tarefa | Status |
|---|---|---|
| 0.1 | Auditar container Hermes (read-only) | ✅ |
| 0.2 | Identificar limitações | ✅ |
| 0.3 | Separar Hermes/wiki de n8n/wacrm/Docker | ✅ |

## Fase 1 — Estrutura SDD ✅ CONCLUÍDA

| # | Tarefa | Status |
|---|---|---|
| 1.1 | Criar pastas em /data/workspace/planopratico | ✅ |
| 1.2 | Criar wiki SDD completa | ✅ |
| 1.3 | Criar specs | ✅ |
| 1.4 | Criar plans, tasks, runbooks | ✅ |

## Fase 2 — VPS Real ✅ CONCLUÍDA

| # | Tarefa | Status |
|---|---|---|
| 2.1 | Acesso SSH root VPS | ✅ |
| 2.2 | Auditoria VPS real | ✅ Ubuntu 24.04 / Docker ativo |
| 2.3 | Decisão de stack | ✅ Portainer + NPM |

## Fase 3 — DNS e Proxy ✅ CONCLUÍDA

| # | Tarefa | Status |
|---|---|---|
| 3.1 | UFW (22, 80, 443) | ✅ |
| 3.2 | /opt/planopratico + rede Docker | ✅ |
| 3.3 | Portainer | ✅ UP |
| 3.4 | Nginx Proxy Manager | ✅ UP |
| 3.5 | DNS apontado para 76.13.170.19 | ✅ |

## Fase 4 — n8n e wacrm ✅ CONCLUÍDA

| # | Tarefa | Status |
|---|---|---|
| 4.1 | Instalar n8n via Docker | ✅ UP |
| 4.2 | n8n em n8n.planopratico.shop | ✅ |
| 4.3 | Supabase | ✅ Cloud (São Paulo) |
| 4.4 | Instalar wacrm via Docker | ✅ UP |
| 4.5 | wacrm em crm.planopratico.shop | ✅ |
| 4.6 | Integração WaCRM → n8n validada | ✅ mensagem real |

## Fase 5 — Produto e Checkout ⏳ PENDENTE

| # | Tarefa | Status |
|---|---|---|
| 5.1 | Criar conta Kiwify | ⏳ |
| 5.2 | Produto R$27 + bump R$19 | ⏳ |
| 5.3 | Upsell R$97 + downsell R$47 | ⏳ |
| 5.4 | Webhooks Kiwify → n8n | ⏳ |

## Fase 6 — Funil ⏳ PENDENTE

| # | Tarefa | Status |
|---|---|---|
| 6.1 | Landing + Mini-VSL 1 | ⏳ |
| 6.2 | Quiz 4-6 perguntas | ⏳ |
| 6.3 | Páginas de resultado por perfil | ⏳ |
| 6.4 | Mini-VSL 2 | ⏳ |
| 6.5 | Pixel Meta + UTMify | ⏳ |

## Fase 7 — Tráfego e WhatsApp ⏳ PENDENTE

| # | Tarefa | Status |
|---|---|---|
| 7.1 | Conta Meta Business | ⏳ |
| 7.2 | Número novo WhatsApp | ⏳ |
| 7.3 | Aprovação Meta | ⏳ |
| 7.4 | Primeiras campanhas Meta Ads | ⏳ |
| 7.5 | Fluxos n8n (boas-vindas, recuperação) | ⏳ |
