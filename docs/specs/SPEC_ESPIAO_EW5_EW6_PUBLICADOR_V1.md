# Spec — EW5 Publicador + EW6 Monitor de Métricas
> Sistema Espião — Fase 2 | Rascunho 16/06/2026 | Aguarda Standard Access ads_management

---

## Visão Geral

Com EW5 e EW6, o ciclo fica completo e fechado:

```
Espião descobre ──► IA escreve script ──► Você aprova ──► Você grava
                                                               │
              ◄── Flywheel: melhores ◄── Monitor pausa ruins  │
              ◄── alimentam novos       + manda métricas       │
                    ângulos                                     │
                                                               ▼
                                              EW5 publica anúncio automaticamente
```

---

## EW5 — Publicador de Anúncios

### Gatilho
Você grava o vídeo e **envia por WhatsApp** com a legenda:
```
/publicar [script_id]
```
Ex: `/publicar abc123`

O WaCRM entrega ao n8n via webhook `new_message_received`.

### Fluxo Completo

```
[WhatsApp: você envia vídeo + "/publicar abc123"]
   │
   ▼
[n8n EW5 — Webhook WaCRM]
   │
   ├─► Verifica: mensagem tem vídeo? + tem /publicar?
   │     NÃO → ignora
   │     SIM → continua
   │
   ├─► Supabase: busca our_scripts WHERE id = 'abc123'
   │     └──► pega: headline, body_text, cta, problema, ad_account_id
   │
   ├─► Download do vídeo via WhatsApp Cloud API
   │     GET https://graph.facebook.com/v21.0/{media_id}
   │     → URL temporária → download binário
   │
   ├─► Upload vídeo para Meta
   │     POST https://graph.facebook.com/v21.0/act_{AD_ACCOUNT_ID}/advideos
   │     body: { source: <binary>, title: "DogFlow_{problema}_{date}" }
   │     → retorna: video_id
   │
   ├─► Aguarda vídeo processar (polling a cada 10s, max 5 tentativas)
   │     GET https://graph.facebook.com/v21.0/{video_id}?fields=status
   │     status: "ready" → continua
   │
   ├─► Cria AdCreative
   │     POST https://graph.facebook.com/v21.0/act_{AD_ACCOUNT_ID}/adcreatives
   │     body:
   │     {
   │       name: "DogFlow_{problema}_{date}",
   │       object_story_spec: {
   │         page_id: "{PAGE_ID}",
   │         video_data: {
   │           video_id: "{video_id}",
   │           message: "{body_text do script}",
   │           call_to_action: {
   │             type: "LEARN_MORE",
   │             value: { link: "https://planopratico.shop/quiz" }
   │           },
   │           title: "{headline do script}"
   │         }
   │       }
   │     }
   │     → retorna: creative_id
   │
   ├─► Cria AdSet (público DogFlow padrão)
   │     POST https://graph.facebook.com/v21.0/act_{AD_ACCOUNT_ID}/adsets
   │     body:
   │     {
   │       name: "DogFlow_{problema}_{date}",
   │       campaign_id: "{CAMPAIGN_ID_DOGFLOW}",
   │       billing_event: "IMPRESSIONS",
   │       optimization_goal: "LINK_CLICKS",
   │       bid_strategy: "LOWEST_COST_WITHOUT_CAP",
   │       daily_budget: 3000,  ← R$30/dia (em centavos)
   │       targeting: {
   │         age_min: 25,
   │         age_max: 65,
   │         genders: [1, 2],
   │         geo_locations: { countries: ["BR"] },
   │         interests: [
   │           { id: "6003107902433", name: "Dogs" },
   │           { id: "6002925969459", name: "Dog training" },
   │           { id: "6003264791593", name: "Pet" }
   │         ]
   │       },
   │       status: "PAUSED"  ← começa pausado para você revisar
   │     }
   │     → retorna: adset_id
   │
   ├─► Cria Ad
   │     POST https://graph.facebook.com/v21.0/act_{AD_ACCOUNT_ID}/ads
   │     body:
   │     {
   │       name: "DogFlow_{problema}_{date}",
   │       adset_id: "{adset_id}",
   │       creative: { creative_id: "{creative_id}" },
   │       status: "PAUSED"
   │     }
   │     → retorna: ad_id
   │
   ├─► Supabase: atualiza our_scripts
   │     SET ad_id = {ad_id}, adset_id = {adset_id},
   │         video_id = {video_id}, creative_id = {creative_id},
   │         status = "published_paused"
   │
   └─► WhatsApp para você:
       "✅ Anúncio criado (PAUSADO para revisão)
        Problema: {problema}
        Script: {headline}
        Ad ID: {ad_id}

        Antes de ativar, confira em Meta Ads Manager.
        Responda ATIVAR {ad_id} para ligar."

[Você responde: "ATIVAR {ad_id}"]
   │
   ▼
[n8n EW5b — Ativador]
   ├─► POST https://graph.facebook.com/v21.0/{ad_id}
   │     body: { status: "ACTIVE" }
   └─► WhatsApp: "🟢 Anúncio {ad_id} ATIVO — monitorando métricas"
```

---

## EW6 — Monitor de Métricas

### Gatilho
Schedule: todo dia às **8h BRT** (já dentro do EW3 ou workflow separado)

### Fluxo Completo

```
[Schedule 8h BRT]
   │
   ▼
[n8n EW6]
   │
   ├─► Supabase: busca our_scripts WHERE status = 'active' AND ad_id IS NOT NULL
   │
   ├─► Para cada ad_id:
   │     GET https://graph.facebook.com/v21.0/{ad_id}/insights
   │       ?fields=spend,impressions,clicks,ctr,cpm,actions,cost_per_action_type
   │       &date_preset=last_7d
   │
   ├─► Calcula por anúncio:
   │     - ROAS = receita / spend  (actions[purchase].value / spend)
   │     - CPL = spend / leads
   │     - CTR = clicks / impressions * 100
   │     - Tendência: melhorando ou piorando vs semana anterior
   │
   ├─► Regras automáticas:
   │     IF CTR < 0.8% após 3 dias E gasto > R$30 → PAUSAR
   │     IF ROAS < 0.5 após R$50 gasto → PAUSAR
   │     IF ROAS > 3.0 → aumentar orçamento 20% (opcional)
   │
   ├─► Supabase: salva em our_ad_performance
   │     { ad_id, date, spend, roas, ctr, cpm, conversions, paused_auto }
   │
   ├─► Flywheel: se ROAS > 2.5 AND duração > 7 dias:
   │     → marcar como "winning_ad"
   │     → transcrever via EW2 (POST /webhook/espiao-transcricao)
   │     → script vencedor alimenta EW3 como referência de ângulo
   │
   └─► WhatsApp resumo diário:
       "📊 DogFlow — Métricas 16/06
        ─────────────────────
        🟢 'Late demais' — ROAS 2.3x — R$89 gasto
        🟡 'Xixi errado' — ROAS 1.1x — R$34 gasto
        🔴 'Pula visitante' — CTR 0.6% — PAUSADO AUTO
        ─────────────────────
        Total gasto: R$123 | Receita: R$189 | ROAS médio: 1.5x
        ─────────────────────
        💡 'Late demais' está ganhando — gerando novo ângulo similar"
```

---

## Permissões Meta API necessárias

| Permissão | Para que serve | Status |
|-----------|---------------|--------|
| `ads_read` | ler métricas e campanhas | ⏳ App Review |
| `ads_management` | criar/pausar/editar anúncios | ⏳ solicitar após ads_read |
| `pages_read_engagement` | ler página DogFlow | ✅ já configurado |
| `business_management` | acessar conta de anúncios | ✅ já configurado |

---

## Variáveis necessárias no n8n (docker-compose)

```yaml
- META_AD_ACCOUNT_ID=act_219174082541635   # sua conta principal
- META_PAGE_ID=<ID da página DogFlow>       # página Facebook do DogFlow
- META_CAMPAIGN_ID=<ID da campanha base>    # campanha mãe (criar 1x manualmente)
- META_ACCESS_TOKEN=<token permanente>      # token de sistema (não expira)
```

---

## O que ainda precisa de você (irredutivelmente humano)

1. **Gravar o vídeo** — 30 segundos na câmera seguindo o script
2. **Enviar via WhatsApp** com `/publicar {id}`
3. **Revisar no Meta Ads Manager** (30 seg) e responder `ATIVAR`
4. **Aprovar scripts** (responder 1/2/3 no WhatsApp)

Tudo o mais é automático.

---

## Cronograma de implementação (após Standard Access)

| Etapa | Tempo | Dependência |
|-------|-------|-------------|
| Solicitar `ads_management` no App Review | 1 dia | ads_read aprovado |
| Criar campanha base no Meta Ads Manager (1x) | 30 min | ads_management |
| Implementar EW5 (publicador) | 2h | token permanente |
| Implementar EW6 (monitor) | 1h | EW5 rodando |
| Primeiro anúncio publicado via sistema | 1 dia | EW5 + vídeo gravado |
| Flywheel funcionando | 1 semana | 3+ anúncios com dados |
