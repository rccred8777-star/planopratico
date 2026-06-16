# Runbook — Sistema Espião de Concorrentes DogFlow

> **Por onde começar:** siga as etapas nessa ordem. Cada etapa tem no máximo 10 minutos.

---

## ETAPA 1 — Banco de Dados (Supabase) — 5 min

1. Acesse [supabase.com](https://supabase.com) → projeto `oardxsdiwaxmpomxhfls` (São Paulo)
2. Menu lateral → **SQL Editor**
3. Abra o arquivo `docs/specs/SQL_ESPIAO_CONCORRENTES_V1.sql`
4. Cole todo o conteúdo no editor e clique **Run**
5. Confirme que as 6 tabelas foram criadas: `competitor_ads`, `competitor_transcripts`, `competitor_angles`, `our_ad_performance`, `our_angles`, `our_scripts`

---

## ETAPA 2 — API Keys necessárias

Você precisa de 4 keys. Veja onde conseguir cada uma:

### 2.1 Meta Ads Library Token (GRÁTIS)
1. Acesse `developers.facebook.com`
2. **My Apps** → **Create App** → tipo: **Other** → **Business**
3. Selecione seu portfólio de negócios
4. No app criado: **Marketing API** → **Setup**
5. Selecione todos os 3 escopos: `ads_read`, `ads_management`, `business_management`
6. Clique **Get Token** → copie o token
7. **Importante:** este token expira em 60 dias — renove ou use token de sistema permanente

### 2.2 Scrapfly (PAGO — ~$30/mês)
1. Acesse `scrapfly.io` → crie conta
2. Dashboard → **API Key** → copie
3. Plano mínimo funciona para testes

### 2.3 OpenAI Whisper (PAGO — ~$0,006/min de vídeo)
1. Acesse `platform.openai.com`
2. **API Keys** → **Create new secret key** → copie
3. Custo: 10 vídeos de 3 min = ~R$1,00

### 2.4 Google Gemini (GRÁTIS para começar)
1. Acesse `aistudio.google.com`
2. Clique em **Get API Key** → **Create API key**
3. Free tier: 50 requests/dia no Gemini 2.5 Pro

### 2.5 Perplexity Sonar (PAGO — ~$5/mês)
1. Acesse `perplexity.ai/api`
2. Crie conta de API → copie a key

---

## ETAPA 3 — Variáveis de Ambiente no n8n — 5 min

No n8n (n8n.planopratico.shop):
1. **Settings** (ícone engrenagem) → **Variables**
2. Adicione as variáveis abaixo:

| Nome | Valor |
|------|-------|
| `META_ADS_LIBRARY_TOKEN` | token do passo 2.1 |
| `SCRAPFLY_API_KEY` | key do passo 2.2 |
| `GEMINI_API_KEY` | key do passo 2.4 |
| `PERPLEXITY_API_KEY` | key do passo 2.5 |

> A key da OpenAI vai nas **Credentials** do n8n (não em variáveis):
> Menu → **Credentials** → **Add** → busque **OpenAI** → cole a key

---

## ETAPA 4 — Credentials Supabase no n8n — 3 min

1. No n8n: **Credentials** → **Add** → busque **Supabase**
2. Preencha:
   - **Host:** `https://oardxsdiwaxmpomxhfls.supabase.co`
   - **Service Role Secret:** pegue em Supabase → **Settings** → **API** → `service_role` key
3. Nomeie como: `Supabase PlanoPratico`
4. Salve e teste

---

## ETAPA 5 — Importar os Workflows — 5 min

No n8n:
1. Menu → **Workflows** → **Import from file**
2. Importe nesta ordem:
   - `ESPIAO_W1_BUSCA_CONCORRENTES.json`
   - `ESPIAO_W2_TRANSCRICAO_VIDEO.json`
   - `ESPIAO_W3_ANALISE_ANGULOS.json`
   - `ESPIAO_W4_GERACAO_SCRIPT.json`
3. Em cada workflow importado, verifique se as Credentials Supabase foram atribuídas (clique nos nodes Supabase e selecione `Supabase PlanoPratico`)
4. Ative **apenas o W3** (Schedule 8h) — os outros são acionados via webhook

---

## ETAPA 6 — Primeiro Teste (W1 + W2) — 10 min

### Teste W1 — Buscar concorrentes
Abra o terminal ou Postman e dispare:

```bash
curl -X POST https://n8n.planopratico.shop/webhook/espiao-busca \
  -H "Content-Type: application/json" \
  -d '{"keyword": "adestramento cachorro", "limit": 10}'
```

Resposta esperada:
```json
{ "ok": true, "found": 10, "keyword": "adestramento cachorro" }
```

Confirme no Supabase → tabela `competitor_ads` → deve ter 10 linhas com `status: "discovered"`.

### Teste W2 — Transcrever um vídeo
Pegue um `id` (UUID) da tabela `competitor_ads` e dispare:

```bash
curl -X POST https://n8n.planopratico.shop/webhook/espiao-transcricao \
  -H "Content-Type: application/json" \
  -d '{"competitor_ad_id": "UUID-AQUI"}'
```

Aguarde ~2-3 min. Confirme na tabela `competitor_transcripts` — deve ter a transcrição.

---

## ETAPA 7 — Gerar Script DogFlow (W4)

```bash
curl -X POST https://n8n.planopratico.shop/webhook/espiao-gerar-script \
  -H "Content-Type: application/json" \
  -d '{
    "problem": "xixi",
    "script_duration": "1-3min"
  }'
```

Resposta inclui `script_id`. Veja o script completo em Supabase → `our_scripts`.

Problemas disponíveis: `xixi` | `guia` | `latido` | `pulo` | `destroi` | `desobedece`

---

## Fluxo Completo do Sistema

```
[VOCÊ] POST /espiao-busca  →  W1 busca no Meta Ads Library
                            →  Salva em competitor_ads (status: discovered)
                            ↓
[VOCÊ] POST /espiao-transcricao (para cada anúncio interessante)
                            →  W2 scrapa via Scrapfly
                            →  Baixa vídeo + Whisper transcreve
                            →  Salva em competitor_transcripts (status: transcribed)
                            ↓
[AUTOMÁTICO — todo dia 8h]  →  W3 pega todos status: transcribed
                            →  Gemini extrai hook/vilão/mecanismo/CTA
                            →  Salva em competitor_angles (status: analyzed)
                            ↓
[VOCÊ] POST /espiao-gerar-script
                            →  W4 Perplexity pesquisa ICP
                            →  Gemini gera 5 ângulos
                            →  Gemini gera script Mini VSL completo
                            →  Salva em our_angles + our_scripts
                            ↓
[VOCÊ] Lê o script no Supabase → Aprova → Grava o vídeo
```

---

## Palavras-chave sugeridas para busca inicial

Use no W1 para mapear o mercado:
- `adestramento cachorro`
- `cachorro obediente`
- `como adestrar cão`
- `parar latido cachorro`
- `cachorro faz xixi dentro casa`
- `adestramento positivo`
- `curso adestramento online`

---

## Troubleshooting

| Problema | Causa provável | Solução |
|----------|---------------|---------|
| W2 status `error` | Scrapfly não encontrou vídeo no snapshot | Tente outro anúncio — nem todo snapshot tem vídeo |
| W3 não roda | Schedule não ativado | Ative o W3 no n8n |
| W4 retorna `parse_error` em ângulos | Gemini retornou markdown | Normal — o parser limpa; verifique `our_angles` mesmo assim |
| Supabase auth error | Service role key errada | Confirme em Supabase Settings → API |
| Meta token expirado | Token de curto prazo venceu | Gere novo em developers.facebook.com |
