# Fonte — Agente de Campanhas Meta Ads com n8n + Airtable
> Transcrição: "How we automated a Meta Ad Agency in n8n and Airtable"
> Salvo em: 16/06/2026 | Aplicar ao: DogFlow e Plano Recomeço 21D

---

## 1. Visão Geral do Sistema

**Arquitetura:** Airtable (frontend/interface) + n8n (motor de automação)

**O problema que resolve:** Agências de anúncios fazem manualmente:
1. Pesquisa de produto e público
2. Geração de ângulos e ideias
3. Escrita de scripts e criativos
4. Monitoramento diário de performance
5. Otimização baseada nos resultados

**O que o sistema automatiza:** Todo esse ciclo, mantendo o humano como decisor final nos pontos-chave.

---

## 2. As 5 Fases do Fluxo

```
Fase 1 — Pesquisa de produto (Perplexity)
    ↓
Fase 2 — Geração + seleção de ângulos (Gemini)
    ↓
Fase 3 — Geração + revisão de scripts (Gemini)
    ↓
Fase 4 — Tracking de performance (Meta Graph API)
    ↓
Fase 5 — Flywheel: scripts vencedores → novos ângulos
```

**Humano decide:** quais ângulos seguir (fase 2), aprovação do script (fase 3), quais ads são "melhores" (fase 4)

---

## 3. Ferramentas e Papéis

| Ferramenta | Papel | Custo estimado |
|---|---|---|
| **Perplexity Sonar Reasoning** | Deep research de produto + ICP | ~$5-20/mês |
| **Google Gemini 2.5 Pro** | Geração de ângulos e scripts VSSL | Free tier / ~$3-15/mês |
| **Scrapfly** | Scraping de páginas de anúncios Facebook | ~$30-50/mês |
| **OpenAI Whisper** | Transcrição de vídeos de anúncios | ~$0,006/min |
| **Meta Graph API** | Métricas de campanha + conteúdo de vídeo | Gratuito (requer token) |
| **Airtable** | Frontend/DB de gerenciamento | ~$20/mês |
| **n8n** | Motor de automação / orquestrador | Já temos |

---

## 4. Setup n8n — Webhook único com Switch por `action`

O sistema usa **um único webhook** que roteia 4 automações diferentes via campo `action`:

```
Webhook recebe → Switch node verifica campo "action" → roteia para:

action: "generate_product_details"  → Fase 1 (Perplexity)
action: "generate_angles"           → Fase 2 (Gemini)
action: "generate_script"           → Fase 3 (Gemini)
action: "best_ads"                  → Fase 4 (scraping vídeo)
```

**Como o Airtable dispara:** Automação no Airtable com trigger "when record matches condition" → Run Script → POST para o webhook com `{ recordId, action }`.

---

## 5. Fase 1 — Pesquisa de Produto (Perplexity)

**Input:** nome do produto + notas do produto (contexto humano opcional)

**Processo n8n:**
1. Get Record do Airtable (pelo recordId)
2. Montar prompt com produto + notas
3. Chamar Perplexity Sonar Reasoning
4. Salvar resultado no Airtable (product_details + ICP)

**Output:** Deep dive com perfil do cliente ideal, posicionamento de mercado, detalhes técnicos, identidade de marca

---

## 6. Fase 2 — Geração de Ângulos (Gemini)

**Input:** product_details (do Perplexity) + product_notes + winning_script (se existir)

**Output por ângulo:**
- Conceito e resumo
- Estrutura VSSL completa (hook → problema → solução → prova → oferta → CTA)
- Sugestões de vídeo
- Gatilhos emocionais
- Vieses cognitivos
- Técnicas de direct response

**Número de ângulos:** 5 a 8 por produto

**Importante:** Output em JSON array → parsing separado (segundo node Gemini) para garantir estrutura correta em outputs complexos.

---

## 7. Fase 3 — Geração de Script (Gemini 2.5 Pro)

**Input:** ângulo selecionado + todos os detalhes do produto

**Features:**
- Comprimento configurável (1-3 min, 3-5 min, etc.)
- Revisão/iteração: usuário escreve feedback → n8n regenera com feedback + script original
- Output: script VSSL completo

**Modelo recomendado:** Google Gemini 2.5 Pro — "works really well for creative writing"

---

## 8. Fase 4 — Tracking Meta API (Schedule trigger)

**Frequência:** Diária ou semanal (configurável)

**Fluxo n8n:**
1. Schedule trigger
2. Meta Graph API → listar ad accounts
3. Split + loop → listar campanhas (só ativas)
4. Split + loop → listar ad sets (só ativos)
5. Wait (evitar rate limit da API)
6. Meta Graph API → listar ads (só ativos + só com video_id)
7. Mapear dados: spend, ROAS, CPC, clicks, conversions, impressions
8. Salvar no Airtable

**Dados coletados por ad:** ad_id, nome, spend, ROAS, CPC, clicks, conversions, impressions, video_id

---

## 9. Fase 4B — Scraping de Vídeos de Anúncios Concorrentes/Próprios

**Este é o fluxo mais complexo** — necessário porque Facebook não permite scraping direto do URL do vídeo.

**Fluxo de 6 etapas:**
```
1. Webhook disparado (usuário marca ad como "best ad")
2. Get Record → pegar video_id
3. Meta Graph API: GET /{video_id}?fields=id,description,length,permalink_url
4. Construir URL completo: "facebook.com" + permalink_url
5. Scrapfly → scraping da página Facebook para encontrar URL real do vídeo
6. Código JavaScript (gerado pelo ChatGPT) → extrair video URL do HTML
7. IF: video URL existe?
   → SIM: HTTP GET → baixar vídeo → OpenAI Whisper → transcrição
   → NÃO: encerrar fluxo
8. Salvar transcrição no Airtable
```

**Por que Scrapfly?** É um dos únicos scrapers que consegue contornar as proteções do Facebook. Mais avançado que alternativas comuns.

---

## 10. Fase 5 — Flywheel de Otimização

**Lógica:** Scripts dos melhores ads → usados como referência para gerar novos ângulos

**Processo:**
1. Usuário seleciona ads com melhor ROAS na fase 4
2. Sistema transcreve o script do vídeo (fase 4B)
3. Script vira campo `winning_script` associado ao produto
4. Na próxima geração de ângulos (fase 2), o winning_script é passado como variável
5. Gemini gera novos ângulos seguindo o estilo/estrutura do que funcionou

---

## 11. Como Gerar o Token Meta Graph API

1. Acesse `developers.facebook.com`
2. Meu Apps → Criar novo app
3. Tipo de uso: **Other** → **Business**
4. Selecionar portfólio de negócios / conta de anúncios
5. Não precisa verificar negócio (mais simples que WhatsApp)
6. Ir em **Marketing API** → Setup
7. Selecionar todos os 3 escopos → **Get Token**
8. Usar esse token no node do n8n (Meta Graph API)

**Escopos necessários:** ads_read, ads_management, business_management

---

## 12. Modelos de IA — Qual usar em cada etapa

| Etapa | Modelo | Motivo |
|---|---|---|
| Research de produto | Perplexity Sonar Reasoning | Acesso à web em tempo real, raciocínio profundo |
| Parsing de outputs complexos | Segundo node Gemini separado | Mais confiável que parser inline para estruturas complexas |
| Geração de ângulos | Gemini 2.5 Pro | Melhor para creative writing + estrutura |
| Geração de scripts VSSL | Gemini 2.5 Pro | Idem |
| Revisão de scripts | Gemini 2.5 Pro | Mantém coerência com original |
| Transcrição de vídeos | OpenAI Whisper | Referência em STT, barato e preciso |

---

## 13. Insights para o DogFlow / PlanoPratico

- Sistema original usa Airtable como DB — pode ser substituído por Supabase (já temos)
- n8n já está UP — é exatamente o motor necessário
- A parte mais valiosa PRÉ-LANÇAMENTO: **espionar anúncios de concorrentes** no nicho pet/adestramento
- Meta Ads Library é pública — permite buscar anúncios ativos de concorrentes SEM precisar de conta de anúncios própria
- Com Scrapfly + Whisper: transcrever scripts dos melhores anúncios de concorrentes → usar como base para nossos próprios ângulos
