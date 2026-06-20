# Planta da Cidade — Stack Completo PlanoPratico
> Versão 1 — 16/06/2026 | Atualizar a cada sprint que adicione ou remova um "prédio"

---

## Mapa da Cidade

```
╔══════════════════════════════════════════════════════════════════════════════════╗
║                        PLANOPRATICO — PLANTA DA CIDADE                         ║
╠══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                  ║
║  ┌─────────────────────────────────────────────────────────────────────────┐    ║
║  │                    BAIRRO 1 — CAPTAÇÃO DE TRÁFEGO                       │    ║
║  │                                                                         │    ║
║  │   ┌──────────────┐          ┌──────────────┐                            │    ║
║  │   │  META ADS    │          │  PIXEL META  │                            │    ║
║  │   │  Campanhas   │◄────────►│  ID:107617.. │                            │    ║
║  │   │  Video/Imagem│          │  PageView    │                            │    ║
║  │   └──────┬───────┘          │  Lead        │                            │    ║
║  │          │                  │  Purchase    │                            │    ║
║  │          │tráfego           └──────────────┘                            │    ║
║  └──────────┼──────────────────────────────────────────────────────────────┘    ║
║             │                                                                    ║
║             ▼                                                                    ║
║  ┌─────────────────────────────────────────────────────────────────────────┐    ║
║  │                    BAIRRO 2 — CONVERSÃO                                 │    ║
║  │                                                                         │    ║
║  │   ┌──────────────┐    ►    ┌──────────────┐    ►    ┌──────────────┐   │    ║
║  │   │    QUIZ      │  click  │   LANDING    │  click  │   KIWIFY     │   │    ║
║  │   │  /quiz       │────────►│  /dogflow    │────────►│  Checkout    │   │    ║
║  │   │  5 perguntas │         │  VSL Vturb   │         │  R$27        │   │    ║
║  │   │  SPIN        │         │  + CTA       │         │  Bump R$17   │   │    ║
║  │   │  UTMify      │         │  UTMify      │         │  Up R$29,90  │   │    ║
║  │   └──────────────┘         └──────────────┘         │  Down R$47   │   │    ║
║  │                                                      └──────┬───────┘   │    ║
║  └─────────────────────────────────────────────────────────────┼───────────┘    ║
║                                                                 │                ║
║                                      webhook order_approved     │                ║
║                                                                 ▼                ║
║  ┌─────────────────────────────────────────────────────────────────────────┐    ║
║  │                    BAIRRO 3 — ENTREGA DO PRODUTO                        │    ║
║  │                                                                         │    ║
║  │   ┌──────────────┐    ◄──► ┌──────────────┐                            │    ║
║  │   │ DOGFLOW PWA  │  auth   │  SUPABASE    │                            │    ║
║  │   │  Next.js     │─────────│  PostgreSQL  │                            │    ║
║  │   │  app.plano.. │         │  São Paulo   │                            │    ║
║  │   │  7 módulos   │         │              │                            │    ║
║  │   │  progresso   │         │  TABELAS:    │                            │    ║
║  │   │  desbloqueio │         │  purchases   │                            │    ║
║  │   │  por 24h     │         │  profiles    │                            │    ║
║  │   └──────────────┘         │  subscript.  │                            │    ║
║  │                            │  training_m. │                            │    ║
║  │                            │  ──────────  │                            │    ║
║  │                            │  competitor_ │ ◄── Sistema Espião        │    ║
║  │                            │  ads         │                            │    ║
║  │                            │  transcripts │                            │    ║
║  │                            │  angles      │                            │    ║
║  │                            │  our_scripts │                            │    ║
║  │                            └──────────────┘                            │    ║
║  └─────────────────────────────────────────────────────────────────────────┘    ║
║                                                                                  ║
║  ┌─────────────────────────────────────────────────────────────────────────┐    ║
║  │                 BAIRRO 4 — AUTOMAÇÃO E RELACIONAMENTO                   │    ║
║  │                                                                         │    ║
║  │   ┌──────────────┐         ┌──────────────┐    ►    ┌──────────────┐   │    ║
║  │   │     n8n      │         │    WaCRM     │  events │  WHATSAPP    │   │    ║
║  │   │  n8n.plano.. │◄───────►│  crm.plano.. │◄───────►│  Cloud API   │   │    ║
║  │   │              │         │              │         │  Oficial Meta│   │    ║
║  │   │  WORKFLOWS   │         │  Inbox conv. │         │              │   │    ║
║  │   │  W1 Boas-v.  │         │  CRM contato │         │  Templates:  │   │    ║
║  │   │  W2 Lemb D1-6│         │  Histórico   │         │  boas-vindas │   │    ║
║  │   │  W3 Oferta   │         └──────────────┘         │  lembretes   │   │    ║
║  │   │  W4 Carrinho │                                   │  oferta      │   │    ║
║  │   │  W5 Resposta │                                   └──────────────┘   │    ║
║  │   │              │                                                       │    ║
║  │   │  ESPIÃO:     │                                                       │    ║
║  │   │  EW1 Busca   │                                                       │    ║
║  │   │  EW2 Transc. │                                                       │    ║
║  │   │  EW3 Análise │                                                       │    ║
║  │   │  EW4 Script  │                                                       │    ║
║  │   └──────────────┘                                                       │    ║
║  └─────────────────────────────────────────────────────────────────────────┘    ║
║                                                                                  ║
║  ┌─────────────────────────────────────────────────────────────────────────┐    ║
║  │                 BAIRRO 5 — INTELIGÊNCIA (SISTEMA ESPIÃO)                │    ║
║  │                                                                         │    ║
║  │   ┌──────────────┐         ┌──────────────┐         ┌──────────────┐   │    ║
║  │   │  SCRAPFLY    │         │    OPENAI    │         │   GEMINI     │   │    ║
║  │   │  Scraping    │         │    WHISPER   │         │   2.5 Pro    │   │    ║
║  │   │  Facebook    │         │    STT PT    │         │   Análise    │   │    ║
║  │   │  Ads Library │         │    R$0,006   │         │   Ângulos    │   │    ║
║  │   │  render_js   │         │    /min      │         │   Scripts    │   │    ║
║  │   │  asp=true    │         └──────────────┘         └──────────────┘   │    ║
║  │   └──────────────┘                                                       │    ║
║  │                                  ┌──────────────┐                        │    ║
║  │                                  │  PERPLEXITY  │                        │    ║
║  │                                  │  Sonar       │                        │    ║
║  │                                  │  ICP Research│                        │    ║
║  │                                  │  Web em tempo│                        │    ║
║  │                                  │  real        │                        │    ║
║  │                                  └──────────────┘                        │    ║
║  └─────────────────────────────────────────────────────────────────────────┘    ║
║                                                                                  ║
║  ┌─────────────────────────────────────────────────────────────────────────┐    ║
║  │                 BAIRRO 6 — INFRAESTRUTURA (FUNDAÇÃO)                    │    ║
║  │                                                                         │    ║
║  │   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  │    ║
║  │   │     VPS      │  │    DOCKER    │  │    NGINX     │  │PORTAINER │  │    ║
║  │   │  Hostinger   │  │  containers  │  │  Proxy Mgr   │  │          │  │    ║
║  │   │  76.13.170.19│  │  network:    │  │  SSL Let's   │  │portainer.│  │    ║
║  │   │  Ubuntu 24.04│  │  planoprat.. │  │  Encrypt     │  │plano..   │  │    ║
║  │   │  4GB RAM     │  │  _net        │  │  proxy.plano │  │          │  │    ║
║  │   └──────────────┘  └──────────────┘  └──────────────┘  └──────────┘  │    ║
║  └─────────────────────────────────────────────────────────────────────────┘    ║
║                                                                                  ║
╚══════════════════════════════════════════════════════════════════════════════════╝
```

---

## Fluxo Principal — Esteira Low Ticket (Funil de Venda)

```
[PESSOA]
   │
   │  vê anúncio
   ▼
[META ADS] ──► dispara Pixel PageView
   │
   │  clica no anúncio
   ▼
[QUIZ /quiz] ──► UTMify captura UTMs ──► Pixel Lead (ao capturar email)
   │
   │  conclui quiz → vê VSL (Vturb)
   ▼
[LANDING /dogflow] ──► Pixel PageView ──► CTA com UTMify
   │
   │  clica em "Quero o DogFlow"
   ▼
[KIWIFY CHECKOUT] ──► R$27 + bump R$17 + upsell R$29,90/mês + downsell R$47
   │
   │  order_approved webhook
   ▼
[DOGFLOW PWA /api/webhooks/kiwify]
   │    ├──► cria purchase no Supabase
   │    ├──► convida usuário por email (Supabase Auth)
   │    └──► forward ao n8n
   │
   ▼
[n8n W1 Boas-vindas]
   │    └──► WhatsApp Cloud API → mensagem template
   │
   ▼
[CLIENTE ACESSA app.planopratico.shop]
   │    ├──► login por magic link (email)
   │    ├──► 7 dias de treino (desbloqueio 24h/dia)
   │    └──► progresso salvo no Supabase
   │
[n8n W2–W4] (crons automáticos)
   ├──► lembretes D+1 a D+6 via WhatsApp
   ├──► oferta assinatura D+7 / D+14
   └──► recuperação de carrinho (30min + D+1 + D+2)

[n8n W5] (trigger WaCRM)
   └──► resposta automática a mensagens recebidas
```

---

## Fluxo Espião — Sistema de Inteligência Competitiva

```
[VOCÊ] POST /webhook/espiao-busca
       {"keyword": "adestramento cachorro", "limit": 10}
   │
   ▼
[n8n EW1 — Busca Concorrentes]
   │    ├──► Scrapfly scrapa facebook.com/ads/library
   │    ├──► parser JS extrai ad_id, page_name, snapshot_url
   │    └──► HTTP POST → Supabase competitor_ads (status: discovered)
   │
   │  resposta: {"ok":true, "found":10, "keyword":"..."}
   │
   ▼
[VOCÊ] escolhe anúncios interessantes → POST /webhook/espiao-transcricao
       {"competitor_ad_id": "UUID"}
   │
   ▼
[n8n EW2 — Transcrição de Vídeo]
   │    ├──► Scrapfly scrapa snapshot do anúncio (render_js + asp)
   │    ├──► extrai CDN URL do vídeo
   │    ├──► HTTP GET baixa o vídeo
   │    ├──► OpenAI Whisper transcreve (PT-BR, ~R$0,02/vídeo)
   │    └──► Supabase competitor_transcripts (status: transcribed)
   │
   ▼
[AUTOMÁTICO — todo dia 8h BRT]
[n8n EW3 — Análise de Ângulos]
   │    ├──► busca todos status: transcribed no Supabase
   │    ├──► Gemini 2.5 Pro analisa cada transcrição
   │    │    └──► extrai: hook / vilão / mecanismo / prova / CTA / tom emocional
   │    └──► Supabase competitor_angles (status: analyzed)
   │
   ▼
[VOCÊ] POST /webhook/espiao-gerar-script
       {"problem": "xixi", "script_duration": "1-3min"}
   │
   ▼
[n8n EW4 — Geração de Script DogFlow]
   │    ├──► Perplexity Sonar pesquisa ICP atual (web em tempo real)
   │    ├──► Gemini gera 5 ângulos diferentes
   │    ├──► Gemini gera script Mini VSL completo (hook→vilão→mecanismo→prova→CTA)
   │    └──► Supabase our_angles + our_scripts
   │
   ▼
[VOCÊ] lê script no Supabase → aprova → grava o vídeo → sobe no Meta Ads
```

---

## Inventário de Prédios (Todos os Serviços)

### Serviços Próprios (na VPS)

| Serviço | URL | Container | Stack |
|---------|-----|-----------|-------|
| n8n | n8n.planopratico.shop | `n8n` | Docker + NPM |
| WaCRM | crm.planopratico.shop | `wacrm` | Docker + NPM |
| DogFlow PWA | app.planopratico.shop | `dogflow` | Next.js + Docker |
| Landing/Quiz | planopratico.shop | `landing` | nginx:alpine |
| Portainer | portainer.planopratico.shop | `portainer` | Docker |
| Nginx Proxy Mgr | proxy.planopratico.shop | `nginxproxymanager` | Docker |

### Serviços SaaS (externos)

| Serviço | Função | Custo | Credencial |
|---------|--------|-------|------------|
| Supabase | PostgreSQL + Auth + Storage | Free tier | `oardxsdiwaxmpomxhfls` |
| Kiwify | Checkout + entrega digital | % por venda | produtos configurados |
| Meta Ads | Anúncios pagos | R$/dia (budget) | conta ads PlanoPratico |
| WhatsApp Cloud API | Mensagens oficiais | por mensagem | `1114925368379067` |
| Scrapfly | Web scraping (Espião) | ~$30/mês | `<<SCRAPFLY_KEY — cofre VPS>>...` |
| OpenAI Whisper | Transcrição de vídeos (Espião) | $0,006/min | conta Plus |
| Gemini 2.5 Pro | IA análise + scripts (Espião) | Free tier / pago | `AQ.Ab8RN6...` |
| Perplexity Sonar | Pesquisa ICP em tempo real (Espião) | ~$5/mês | `pplx-xfTiEdl...` |
| UTMify | Rastreamento de UTMs | — | script instalado |
| Vturb | Player de vídeo VSL | — | ID `6a30530b...` |
| Hostinger | VPS host | mensal | `76.13.170.19` |

---

## Conexões Críticas (Onde Quebra se Cair)

```
Kiwify ──webhook──► DogFlow PWA      ← quebra: cliente compra mas não recebe acesso
Kiwify ──webhook──► n8n W1           ← quebra: nenhuma mensagem de boas-vindas
Supabase ◄──► DogFlow PWA            ← quebra: nenhum cliente consegue logar
Meta Cloud API ◄── n8n W1-W4         ← quebra: WhatsApp mudo (templates pendentes)
WaCRM ──webhook──► n8n W5            ← quebra: sem resposta automática às mensagens
Scrapfly ◄── n8n EW1/EW2             ← quebra: espião para de funcionar
```

---

## Status Atual de Cada Prédio (16/06/2026)

| Prédio | Status | Observação |
|--------|--------|------------|
| VPS + Docker + NPM + SSL | ✅ UP | SSL expira 2026-09-12 |
| n8n | ✅ UP | 9 workflows ativos |
| WaCRM | ✅ UP | integrado com n8n |
| DogFlow PWA | ✅ UP | 7 módulos, webhook Kiwify ativo |
| Landing + Quiz | ✅ UP | VSL Vturb + UTMify + Pixel |
| Supabase | ✅ UP | 10+ tabelas com RLS |
| Kiwify | ✅ UP | checkout + bump + up + down configurados |
| WhatsApp Cloud API | ⏳ PARCIAL | número aprovado, templates em revisão Meta |
| Meta Ads | ⏳ PARCIAL | campanhas ativas, destino ajustado para /quiz |
| Espião EW1 Busca | ✅ ATIVO | Scrapfly + Supabase funcionando (10 ads/busca) |
| Espião EW2 Transcrição | ✅ ATIVO | aguarda uso (pendente teste real) |
| Espião EW3 Análise | ✅ ATIVO | schedule 8h, aguarda transcrições |
| Espião EW4 Script | ✅ ATIVO | aguarda uso (pendente teste real) |
| App Plano Spy (Meta) | ⏳ REVIEW | aguardando Standard Access ads_read |

---

## O Que Cada Bairro Precisa para Funcionar

### Bairro 1 — Captação
- Conta Meta Business ativa ✅
- Pixel instalado ✅
- UTMify instalado ✅
- Anúncios rodando → URL destino: planopratico.shop/quiz ✅

### Bairro 2 — Conversão
- Quiz UP ✅
- Landing UP ✅
- VSL Vturb embutida ✅
- Kiwify checkout ativo ✅

### Bairro 3 — Entrega
- DogFlow PWA UP ✅
- Supabase UP ✅
- Webhook Kiwify → criação automática de acesso ✅
- **PENDENTE:** teste de compra real com número WhatsApp aprovado

### Bairro 4 — Automação
- n8n UP ✅
- WaCRM UP ✅
- WhatsApp Business aprovado ✅
- **PENDENTE:** templates WhatsApp aprovados pelo Meta
