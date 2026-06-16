# Decisões — Plano Prático

## DEC-001 — Domínio guarda-chuva
Usar `planopratico.shop` exclusivo. Separado do SplitCenter.

## DEC-002 — Separação total do SplitCenter
Nenhum nível compartilhado: domínio, conta, pixel, WhatsApp.

## DEC-003 — WhatsApp Cloud API oficial apenas
Proibido: QR code, Baileys, não-oficial. Usar número novo + Meta Business.

## DEC-004 — Hermes como agente controlado
Pode: análise, docs, criativos, wiki.
Não pode: publicar, Meta Ads, WhatsApp, checkout, infra.

## DEC-005 — n8n como motor de automações
Docker na VPS real. Subdomínio `n8n.planopratico.shop`.

## DEC-006 — wacrm como CRM WhatsApp oficial
Docker + Supabase + número novo + Meta Cloud API.

## DEC-007 — Kiwify como checkout
Bump, upsell, downsell nativos.

## DEC-008 — UTMify como rastreamento
Todos os UTMs de Meta Ads passam pelo UTMify.

## DEC-009 — Wiki SDD como fonte da verdade
`/data/workspace/planopratico/docs/wiki/` — nenhuma decisão vale sem estar aqui.

## DEC-010 — n8n e wacrm fora do container Hermes
Container Hermes sem root/Docker. Instalar na VPS raiz.

## DEC-011 — Hermes = docs/análise/criativo, não executor
Load KVM alto confirma: trabalho pesado fica na VPS real.

## DEC-012 — Aprovações: Allow once / Allow session apenas
Nunca Always allow para agente experimental.

## DEC-013 — Sprint 2 roda via SSH root, não dentro do Hermes

## DEC-014 — VPS real aprovada: srv1756424 / 76.13.170.19 / Ubuntu 24.04

## DEC-015 — Nginx Proxy Manager como proxy reverso
Interface visual, SSL automático. Caddy descartado.

## DEC-016 — Ordem: UFW → Portainer → NPM → n8n → wacrm
Cada etapa confirmada antes da próxima.

## DEC-017 — DNS apontar planopratico.shop para 76.13.170.19
Registros: planopratico.shop, www, portainer, n8n, crm.
