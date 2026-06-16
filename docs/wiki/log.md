# Log de Operações — Plano Prático

> Registro cronológico de todas as ações executadas no projeto.

---

## Sprint 0 — Auditoria (14/06/2026)

- **[14/06/2026] Hermes** — Auditoria read-only do container (AUDIT_VPS_PRECHECK_V1)
- **[14/06/2026] Hermes** — Identificou ambiente como container KVM, usuário u4s, sem root/Docker
- **[14/06/2026] Humano** — Decisão: wiki SDD em /data/workspace/planopratico
- **[14/06/2026] Humano** — Decisão: n8n/wacrm fora do container Hermes

## Sprint 1 — Estrutura SDD (14/06/2026)

- **[14/06/2026] Hermes** — Criou estrutura de pastas em /data/workspace/planopratico
- **[14/06/2026] Hermes** — Criou wiki SDD completa (README, estado-atual, decisoes, log, links, métricas)
- **[14/06/2026] Hermes** — Criou specs: funil low ticket, infra agentes, compliance Meta
- **[14/06/2026] Hermes** — Criou plans, tasks e runbooks

## Sprint 1 — Consolidação (14/06/2026)

- **[14/06/2026] Humano** — Lentidão confirmada como load do host KVM compartilhado
- **[14/06/2026] Humano** — Hermes = docs/análise/criativo, não executor de infra
- **[14/06/2026] Humano** — Regra: Allow once / Allow session, nunca Always allow

## Sprint 2A — Auditoria VPS real (14/06/2026)

- **[14/06/2026] Humano** — SSH root em srv1756424 / 76.13.170.19
- **[14/06/2026] Humano** — Ubuntu 24.04 / Docker ativo / VPS limpa / UFW inactive
- **[14/06/2026] Humano** — Decisão: Nginx Proxy Manager como proxy reverso
- **[14/06/2026] Humano** — Ordem: UFW → Portainer → NPM → n8n → wacrm
- **[14/06/2026] Hermes** — Criou AUDIT_VPS_REAL_DOCKER_V1.md e TASKS_03

## Sprint 3 — Base Docker + Portainer + NPM (14/06/2026)

- **[14/06/2026] Humano** — UFW ativado (portas 22, 80, 443, 81, 9000, 9443)
- **[14/06/2026] Humano** — Docker + rede `planopratico_net` criada
- **[14/06/2026] Humano** — Portainer UP — https://portainer.planopratico.shop
- **[14/06/2026] Humano** — Nginx Proxy Manager UP — https://proxy.planopratico.shop

## Sprint 4 — DNS + SSL (14/06/2026)

- **[14/06/2026] Humano** — SSL Let's Encrypt emitido para todos os domínios (expira 2026-09-12)

## Sprint 5 — n8n (14/06/2026)

- **[14/06/2026] Humano** — n8n UP — https://n8n.planopratico.shop

## Sprint 6 — WaCRM + WhatsApp (14/06/2026)

- **[14/06/2026] Humano** — Supabase provisionado — projeto `oardxsdiwaxmpomxhfls` (São Paulo)
- **[14/06/2026] Humano** — WhatsApp Business conectado e com status `Registered`
- **[14/06/2026] Humano** — Webhook Meta/WaCRM verificado e recebendo eventos
- **[14/06/2026] Humano** — WaCRM UP — https://crm.planopratico.shop

## Sprint 7 — Integração WaCRM → n8n (14/06/2026)

- **[14/06/2026] Humano** — Integração validada com mensagem real no WhatsApp ✅
- **[14/06/2026] Humano** — Método: `send_webhook` nativo do WaCRM (zero alteração de código)
- **[14/06/2026] Humano** — Trigger: `new_message_received`
- **[14/06/2026] Humano** — Workflow n8n: `WaCRM - Receber Eventos` (ID: `FPBRVHXTg2b23LjE`)
- **[14/06/2026] Humano** — URL webhook: `https://n8n.planopratico.shop/webhook/wacrm-eventos`
- **[14/06/2026] Humano** — Payload recebido: `{ message_text, conversation_id }`

## Sprint 8 — Wiki consolidada na VPS (15/06/2026)

- **[15/06/2026] Hermes** — Wiki SDD do Hermes consolidada em /opt/planopratico/docs/
- **[15/06/2026] Hermes** — Criados: specs/, plans/, runbooks/, wiki/decisoes.md, wiki/metricas.md, wiki/links-operacao.md

---

## Sprint 9 — Conteúdo 7 Dias DogFlow (15/06/2026)

- **[15/06/2026] Hermes** — Criou CONTEUDO_7_DIAS_DOGFLOW_V1.md em docs/product/ (Fase 1.1 ✅)
- **[15/06/2026] Hermes** — Conteúdo inclui: Módulo 0 (boas-vindas), Dias 1-7 completos
- **[15/06/2026] Hermes** — Formato: title, objective, explanation, training, common_error, practical_task, checklist por step
- **[15/06/2026] Hermes** — Seed SQL dos training_modules incluído no arquivo
- **[15/06/2026] Hermes** — Compliance verificado (sem promessa clínica, aprovação humana pendente)

---

## Sprint 10 — PDFs Bônus DogFlow (15/06/2026)

- **[15/06/2026] Hermes** — Criou PDF_CHECKLIST_DIARIO_TREINO_DOGFLOW_V1.md (Fase 1.2 ✅)
- **[15/06/2026] Hermes** — Criou PDF_GUIA_XIXI_LUGAR_CERTO_V1.md (Fase 1.3 ✅)
- **[15/06/2026] Hermes** — Criou PDF_GUIA_PASSEIO_SEM_PUXAR_V1.md (Fase 1.4 ✅)
- **[15/06/2026] Hermes** — Criou PDF_LISTA_ERROS_CACHORRO_DESOBEDECE_V1.md (Fase 1.5 ✅)
- **[15/06/2026] Hermes** — Criou PDF_MODELO_ROTINA_FILHOTES_V1.md (Fase 1.6 ✅)
- **[15/06/2026] Hermes** — Compliance verificado em todos os PDFs (disclaimer + sem promessa clínica)
- **[15/06/2026] Hermes** — Fase 1 completa — aguarda aprovação humana de todos os arquivos

---

## Sprint 11 — PWA DogFlow Scaffold (15/06/2026)

- **[15/06/2026] Hermes** — Scaffold Next.js PWA completo em stacks/dogflow/source/ (Fase 3 ✅)
- **[15/06/2026] Hermes** — Telas: /login, /criar-senha, /meu-pet, /treinos, /treino/[id], /progresso, /planos, /acesso-negado
- **[15/06/2026] Hermes** — Middleware auth + controle de acesso por purchase/subscription
- **[15/06/2026] Hermes** — Desbloqueio progressivo por unlock_hours (Dias 1–7 a cada 24h)
- **[15/06/2026] Hermes** — BottomNav (treinos/progresso/planos) em src/components/BottomNav.tsx
- **[15/06/2026] Hermes** — Webhook Kiwify: POST /api/webhooks/kiwify → cria purchase + invite user
- **[15/06/2026] Hermes** — Schema SQL Supabase em database/schema.sql (RLS + seed módulos)
- **[15/06/2026] Hermes** — .env.example criado com todas as variáveis necessárias
- **[15/06/2026] Hermes** — KIWIFY_WEBHOOK_SECRET adicionado ao docker-compose.yml

---

## Sprint 12 — Landing Page + Obrigado (15/06/2026)

- **[15/06/2026] Hermes** — Landing page completada (Fase 3B.1 ✅): seção VSL placeholder + OG tags + CTA Kiwify marcado
- **[15/06/2026] Hermes** — Página de obrigado criada (Fase 3B.3 ✅): landing/dogflow-xixi/obrigado.html com próximos passos e link para o app
- **[15/06/2026] Hermes** — Compliance verificado em ambas as páginas — aprovação humana pendente

---

## Sprint 13 — Workflows n8n Fase 5 (15/06/2026)

- **[15/06/2026] Hermes** — W1: Boas-vindas D+0 (webhook kiwify-compra → WhatsApp template)
- **[15/06/2026] Hermes** — W2: Lembretes D+1–D+6 + check-in D+3 (cron 9h BRT + Supabase query)
- **[15/06/2026] Hermes** — W3: Oferta assinatura D+7 e D+14 (cron 10h BRT + verificação sem assinatura)
- **[15/06/2026] Hermes** — W4: Recuperação de carrinho (webhook → wait 30min → D+1 → D+2)
- **[15/06/2026] Hermes** — W5: Responder mensagens WaCRM (detecção de intenção + resposta automática)
- **[15/06/2026] Hermes** — 7 templates WhatsApp documentados em WHATSAPP_TEMPLATES.md
- **[15/06/2026] Hermes** — Runbook completo em RUNBOOK_SETUP_FASE5.md (variáveis, importação, teste)
- **[15/06/2026] Hermes** — Webhook Kiwify atualizado: salva customer_phone + customer_name + forward automático ao n8n
- **[15/06/2026] Hermes** — Schema SQL atualizado: purchases com customer_phone + customer_name

---

## Sprint 14 — Quiz Funil DogFlow (15/06/2026)

- **[15/06/2026] Hermes** — Criou landing/quiz/index.html — quiz self-contained HTML/CSS/JS (Fase 3C ✅)
- **[15/06/2026] Hermes** — 5 perguntas SPIN: nome do cão, idade, problema, impacto, comprometimento
- **[15/06/2026] Hermes** — Resultado personalizado por tipo de problema (6 variantes)
- **[15/06/2026] Hermes** — Captura de nome + e-mail antes do resultado
- **[15/06/2026] Hermes** — Animação de loading "Analisando suas respostas..." (3.7s, 4 etapas)
- **[15/06/2026] Hermes** — Auto-advance nas opções (380ms após seleção)
- **[15/06/2026] Hermes** — UTM params dinâmicos no link Kiwify (utm_campaign = problema selecionado)
- **[15/06/2026] Hermes** — Placeholder: URL Kiwify (SUBSTITUIR), Pixel Meta (comentado)
- **[15/06/2026] Hermes** — Compliance: disclaimer médico/veterinário no rodapé do resultado
- **[15/06/2026] Hermes** — Deploy: quiz.planopratico.shop — requer ação humana

---

## Sprint 15 — Deploy DogFlow PWA (15/06/2026)

- **[15/06/2026] Humano** — Build e deploy do container `dogflow` na VPS (porta 3001, rede planopratico_net)
- **[15/06/2026] Claude VPS** — DNS A record `app.planopratico.shop → 76.13.170.19` adicionado no Hostinger
- **[15/06/2026] Claude VPS** — Proxy host NPM criado via API (ID=5): `app.planopratico.shop → dogflow:3001`)
- **[15/06/2026] Claude VPS** — Certificado Let's Encrypt emitido (ID=6, expira 2026-09-13)
- **[15/06/2026] Claude VPS** — Force HTTPS ativado + Block exploits ativado
- **[15/06/2026] Validado** — HTTP 301 → HTTPS funcionando; middleware auth redireciona para /login ✅

---

## Sprint 16 — Kiwify Fase 2 (15/06/2026)

- **[15/06/2026] Humano** — Conta Kiwify criada e verificada ✅
- **[15/06/2026] Humano** — Produto DogFlow R$27 criado no Kiwify ✅
- **[15/06/2026] Humano** — Order bump configurado ✅
- **[15/06/2026] Humano** — Upsell configurado ✅
- **[15/06/2026] Humano** — Downsell configurado ✅
- **[15/06/2026] Humano** — Webhook Kiwify criado apontando para app.planopratico.shop ✅
- **[15/06/2026] Humano** — Token webhook: `xfrktu3mbhz` — URL: `https://app.planopratico.shop/api/webhooks/kiwify?token=xfrktu3mbhz` ✅
- **[15/06/2026] Validado** — `KIWIFY_WEBHOOK_SECRET=xfrktu3mbhz` ativo no container dogflow ✅
- **[15/06/2026] Humano** — URLs Kiwify confirmadas e registradas ✅
  - Checkout principal R$27: `https://pay.kiwify.com.br/a6a8NmF`
  - Order Bump R$17: `https://pay.kiwify.com.br/Z4f6t5U`
  - Upsell R$29,90/mês: `https://pay.kiwify.com.br/VhbF8rS`
  - Downsell R$47: `https://pay.kiwify.com.br/TDTPcu6`
  - Sales Page: `https://kiwify.app/h3f3BY5`
- **[15/06/2026] Claude VPS** — Comentários SUBSTITUIR removidos de landing e quiz (URLs já estavam corretas) ✅
- **[15/06/2026] Claude VPS** — Fix: middleware.ts excluía `/api/` de auth (webhook retornava /login) ✅
- **[15/06/2026] Claude VPS** — Fix: invite error silencer usava substring errada (`already registered` → `.toLowerCase().includes('already')`) ✅
- **[15/06/2026] Validado** — Webhook simulado `order_approved` → purchase criada no Supabase + logs limpos ✅
- **[15/06/2026] Validado** — Kiwify alcança endpoint (200 OK com token correto) ✅
- **[15/06/2026] Claude VPS** — Container `landing` (nginx:alpine) + NPM proxy host ID=6 + SSL cert ID=7 (expira 2026-09-13) ✅
- **[15/06/2026] Validado** — planopratico.shop/dogflow → 200 | /dogflow/obrigado → 200 | /quiz → 200 ✅

---

## Pendências / Próximos passos

- [x] ~~Confirmar URL checkout Kiwify~~ — `pay.kiwify.com.br/a6a8NmF` ✅
- [x] ~~Confirmar token do webhook~~ — `xfrktu3mbhz` no container ✅
- [x] ~~Executar database/schema.sql no Supabase~~ — tabelas + RLS + 8 módulos seed ✅
- [x] ~~Criar .env~~ — já existia com todas as credenciais reais ✅
- [ ] Teste de compra real (Fase 2.7) — após .env configurado
- [ ] Importar workflows n8n + ativar (RUNBOOK_SETUP_FASE5.md)
- [x] ~~Deploy landing page~~ — `planopratico.shop/dogflow` + `/dogflow/obrigado` + `/quiz` ✅
- [ ] quiz.planopratico.shop (subdomínio separado — opcional, quiz já acessível em planopratico.shop/quiz)
- [ ] Landing page: colar embed Vturb no `#vsl-container` quando vídeo gravado
- [x] ~~Email SMTP configurado~~ — contato@planopratico.shop via smtp.hostinger.com:465 ✅
  - Supabase: magic links saindo pelo email próprio
  - n8n: credencial ID=l0eH4dtL7YoqmjOa pronta para workflows
- [ ] Pixel Meta + UTMify (Fase 4)
- [ ] Conta Meta Business + número novo WhatsApp (Fase 6)

---

## Sprint 17 — Workflows n8n Fase 5 (15/06/2026)

- **[15/06/2026] Claude VPS** — Importados 5 workflows via API n8n (removidos campos read-only: active, tags, notes) ✅
- **[15/06/2026] Claude VPS** — W1 Boas-vindas D+0 (ID: T4PpjDMdSiojjBr2) — ATIVO ✅
- **[15/06/2026] Claude VPS** — W2 Lembretes D+1–D+6 (ID: EMw5Z0CJ7Ph9tqY8) — ATIVO ✅
- **[15/06/2026] Claude VPS** — W3 Oferta Assinatura D+7/D+14 (ID: uuM5kimadvaVDpXM) — ATIVO ✅
- **[15/06/2026] Claude VPS** — W4 Recuperação de Carrinho (ID: WWmQ8DoUAkxjBCVK) — ATIVO ✅
- **[15/06/2026] Claude VPS** — W5 WaCRM Responder Mensagem (ID: wdNHZQozkr3FNwZ3) — ATIVO ✅
- **[15/06/2026] Claude VPS** — Workflow placeholder "WaCRM - Receber Eventos" (ID: FPBRVHXTg2b23LjE) desativado (era noOp, substituído pelo W5) ✅

## Sprint 18 — Variáveis n8n + $env (15/06/2026)

- **[15/06/2026] Claude VPS** — Token WaCRM decriptado (AES-256-GCM) via ENCRYPTION_KEY ✅
- **[15/06/2026] Claude VPS** — docker-compose.yml n8n atualizado com WA_PHONE_NUMBER_ID, WA_BUSINESS_TOKEN, SUPABASE_URL, SUPABASE_SERVICE_KEY + N8N_BLOCK_ENV_ACCESS_IN_NODE=false ✅
- **[15/06/2026] Claude VPS** — Workflows W1–W5 atualizados de $vars → $env via API ✅
- **[15/06/2026] Claude VPS** — n8n reiniciado e 5 workflows reativados ✅
- **[15/06/2026] Pendente** — Criar e aprovar 7 templates WhatsApp no Meta (sem templates, envio retorna erro 132000)

## Sprint 19 — Fix webhook Kiwify + Templates WhatsApp (15/06/2026)

- **[15/06/2026] Claude VPS** — Bug detectado: handler lia body.event mas Kiwify envia body.order.webhook_event_type ✅
- **[15/06/2026] Claude VPS** — Fix: route.ts normaliza body.order antes de extrair event/orderId/email/phone/name ✅
- **[15/06/2026] Claude VPS** — Fix: forward ao n8n normalizado (event,id,Customer no root) ✅
- **[15/06/2026] Claude VPS** — Rebuild e redeploy dogflow — purchase real criada: order 3c329d34 (jose neto) ✅
- **[15/06/2026] Claude VPS** — Templates WhatsApp corrigidos: {{1}} → {{customer_name}}/{{day_number}} ✅
- **[15/06/2026] Claude VPS** — Workflows W1–W4 atualizados com parameter_name no payload Meta API ✅
- **[15/06/2026] Pendente** — Templates em revisão no Meta (aprovação aguardada)
- **[15/06/2026] Pendente** — Reenviar webhook da compra real quando templates aprovarem (ou fazer nova compra de teste)

## Sprint 20 — Meta Pixel (15/06/2026)

- **[15/06/2026] Humano** — Pixel criado no Meta Events Manager: ID `1076171898074575` (DogFlow Pixel) ✅
- **[15/06/2026] Claude VPS** — Pixel instalado em `/dogflow` (PageView) ✅
- **[15/06/2026] Claude VPS** — Pixel instalado em `/dogflow/obrigado` (PageView + Purchase R$27) ✅
- **[15/06/2026] Claude VPS** — Pixel instalado em `/quiz` (PageView + Lead ao capturar email) ✅
- **[15/06/2026] Humano** — Domínio planopratico.shop verificado no Meta Business Manager ✅
- **[15/06/2026] Pendente** — UTMify (instalação pendente — aguarda ajuda técnica)

---

## Sprint 21 — Sync de status (16/06/2026)

- **[16/06/2026] Humano** — VSL gravado e pronto ✅ (falta embed Vturb na landing)
- **[16/06/2026] Humano** — Domínio planopratico.shop verificado no Meta Business Manager ✅
- **[16/06/2026] Humano** — Templates WhatsApp: ainda em revisão no Meta (aguardando aprovação)
- **[16/06/2026] Humano** — Conta Meta Business + número novo WhatsApp criados — aguardando aprovação Meta ✅
- **[16/06/2026] Humano** — Teste de compra real completo pendente: falta liberar número real de WhatsApp (depende da aprovação Meta)
- **[16/06/2026] Hermes** — UTMify: script já estava instalado nas 3 páginas; faltava `data-utmify` nos links Kiwify — adicionado em landing/dogflow-xixi/index.html e landing/quiz/index.html ✅
- **[16/06/2026] Claude VPS** — Deploy dos arquivos landing na VPS: UTMify já estava no quiz e landing ✅ (arquivos servidos direto pelo volume nginx)

---

## Sprint 22 — Correção de destino dos anúncios (16/06/2026)

- **[16/06/2026] Humano** — Anúncios Meta apontavam para landing `/dogflow` em vez do quiz `/quiz`
- **[16/06/2026] Claude VPS** — Verificado: quiz UP (200), pixel + UTMify + data-utmify no CTA todos presentes ✅
- **[16/06/2026] Decisão** — Mudar URL de destino dos anúncios de `/dogflow` para `/quiz` — ação no Meta Ads Manager pelo humano
- **[16/06/2026] Pendente** — Humano atualizar URL de destino nos conjuntos de anúncio do Meta

---

## Sprint 23 — Redesign quiz intro + foto real de cão (16/06/2026)

- **[16/06/2026] Claude VPS** — Hero image full-width no intro screen: golden retriever Unsplash (onerror fallback laranja) ✅
- **[16/06/2026] Claude VPS** — Badge flutuante sobre a foto: "Diagnóstico gratuito · resultado em 2 minutos" ✅
- **[16/06/2026] Claude VPS** — Checklist icons: círculos laranja preenchidos ✅
- **[16/06/2026] Claude VPS** — Option cards: sombra sutil, hover, cantos arredondados ✅
- **[16/06/2026] Claude VPS** — Vturb preloads adicionados ao head do quiz ✅

---

## Sprint 24 — Correção do funil quiz conforme framework Low Ticket Academy (16/06/2026)

- **[16/06/2026] Claude VPS** — Auditoria do funil: identificados 6 problemas críticos vs framework do curso ✅
- **[16/06/2026] Claude VPS** — Mini VSL Vturb embutida na tela de resultado (player ID: 6a30530b1ead4fb7a53cdaf0) ✅
- **[16/06/2026] Claude VPS** — Fluxo corrigido: Quiz → Loading → VSL → resultado + CTA (era: Quiz → CTA direto) ✅
- **[16/06/2026] Claude VPS** — Vilão oculto + absolvição adicionados ao PROBLEM_DATA (6 variantes por problema) ✅
- **[16/06/2026] Claude VPS** — Ancoragem de valor: "De R$97 → R$27 por fazer o diagnóstico" ✅
- **[16/06/2026] Claude VPS** — Prova social por identificação: card com ★★★★★ e citação personalizada pelo nome ✅
- **[16/06/2026] Claude VPS** — Opção negativa P5 removida: "Tenho dúvidas" → "Quero tentar — preciso que seja simples" ✅
- **[16/06/2026] Claude VPS** — Urgência: badge pulsante vermelho "Valor exclusivo para quem fez o diagnóstico" ✅

---

## Sprint 25 — Redesign completo do corpo da result screen (16/06/2026)

- **[16/06/2026] Claude VPS** — Hero header: fundo escuro (#1a1a2e) + badge laranja + título branco ✅
- **[16/06/2026] Claude VPS** — Diagnóstico: card com header gradiente laranja ✅
- **[16/06/2026] Claude VPS** — Vilão oculto: card amarelo com badge "Por que acontece isso" ✅
- **[16/06/2026] Claude VPS** — Solução: card com header gradiente verde ✅
- **[16/06/2026] Claude VPS** — Benefícios: grid 2×3 de cards com ícone grande (substituiu lista plana) ✅
- **[16/06/2026] Claude VPS** — Bônus: strip escura estilo premium com 5 PDFs e tags ✅
- **[16/06/2026] Claude VPS** — Comparação de valor: tabela (adestrador R$250 / tapete R$60 / DogFlow R$27) ✅
- **[16/06/2026] Claude VPS** — CTA: box escuro + badge "72% off" + preço R$27 grande + botão pulsante ✅
- **[16/06/2026] Claude VPS** — Garantia: badge visual com escudo + título + descrição ✅
- **[16/06/2026] Claude VPS** — Segundo CTA pós-garantia adicionado ✅
