# Skill — Gestor de Tráfego (Low Ticket Raiz)
> O "cérebro" que transforma a inteligência do Espião + método Máxima em campanhas com ROI 2+.
> Criado: 19/06/2026 | Fontes: `fonte_low_ticket_raiz_maxima_V1.md`, `fonte_agente_campanhas_meta_V1.md`, dados do Espião (Supabase)

---

## 1. Mandato

O Gestor de Tráfego atua em **dois momentos**:

- **Pré-lançamento (análise):** usa a inteligência do Espião (anúncios de concorrentes + voz do cliente) para definir **ângulo, criativo, funil e estrutura de campanha** ANTES de gastar R$1.
- **Pós-lançamento (otimização):** roda o método Máxima nas 3 fases — testa, acha vencedores, escala — matando o que dá ROI < 2 e dobrando o que escala.

**Princípio-mãe:** copy e criativo são extensão da pesquisa. O Espião É a pesquisa. Nada de achismo.

---

## 2. Entradas (dados que ele consome)

| Fonte | Tabela / doc | O que extrai |
|---|---|---|
| Ângulos de concorrentes | `competitor_angles` (70) | hook, pain_point, cta, tone — o que já está validado no mercado |
| Anúncios crus | `competitor_ads` (178) | quem anuncia, há quanto tempo (longevidade = funciona) |
| Transcrições | `competitor_transcripts` (99) | estrutura de VSL, mecanismo, oferta |
| Voz do Cliente | `youtube_videos.gemini_analysis` | dores, perguntas, objeções, **linguagem literal** |
| Método | docs Máxima + agente de campanhas | estrutura de campanha e fases |
| Pós-launch | Meta Ads (via Windsor quando conectar) | spend, ROAS, CPC, conversões por criativo |

---

## 3. Pré-lançamento — da inteligência ao criativo (passo a passo)

**Passo 1 — Mapear os ângulos vencedores.**
Agrupar os 70 ângulos por `tone` e `pain_point`. O que **mais se repete** entre concorrentes que anunciam **há mais tempo** = ângulo validado. (Longevidade do anúncio é o voto de confiança do mercado.)

**Passo 2 — Cruzar com a linguagem real do cliente.**
Pegar as frases literais da Voz do Cliente (YouTube) e usá-las como headline. O Facebook não conhece as palavras do cliente; você conhece.

**Passo 3 — Construir o produto/funil low ticket** (método Máxima):
- Produto **tangível** (mostra no criativo, dedo na tela), **no-brain**, resolve uma **ruminação**, **nome forte** (gancho+promessa+fechamento), R$27–67.
- Funil curto: **criativo → página → checkout**. SEM order bump até bater ROI 2.

**Passo 4 — Brief de 10 criativos** (todos mostrando o produto), cada um com um ângulo diferente cruzando concorrente × voz do cliente.

---

## 4. Estrutura de campanha — as 3 fases (Máxima)

### Fase 3D — Teste de criativo
- **10 criativos** diferentes, todos mostrando o produto.
- Estrutura **ABO 1×1×1**: 1 campanha → 10 conjuntos isolados → 1 criativo cada. Verba no conjunto.
- **Objetivo:** sair com **4 criativos com ROI ≥ 2,5**. Achou 2? Roda mais 10. Não avança sem 4.

### Fase 2 — Teste de estrutura (achar o cluster)
- Para de testar criativo. Pega os 4 vencedores, joga **todos no mesmo conjunto** (ABO Gramado), R$67/dia.
- Cria **5 ABO Gramado iguais** pra caçar o **cluster pocket** (a "rua" que vende mais).
- Roda 5 dias → bom → dobra verba (67→134) → +5 dias → R$500/dia (escala vertical).

### Fase 3 — Escala
- Estrutura travada (Gramado). Só troca criativo ("pneu que gasta").
- **Regra dos 20%:** no máx 20% da verba/dia testando criativo novo; 80% no que traz ROI.

### Higiene de conta (regra técnica)
- Histórico da conta pesa +50%. **Excluir** (não desativar) campanhas ruins pra não virarem referência.
- Manter histórico ABO se for rodar ABO.

---

## 5. Gatilhos de decisão (operação diária)

| Situação | Ação |
|---|---|
| Criativo com ROI < 2 após gasto = preço do produto | **Matar** |
| 4 criativos com ROI ≥ 2,5 na mão | **Avançar pra Fase 2** |
| ABO Gramado 5 dias com ROI bom | **Dobrar verba** |
| Cluster pocket (ROI 3+) | **Escalar vertical, não mexer** |
| Criativo perdendo performance (frequência alta) | **Trocar pneu** (regra 20%) |
| ROI geral caindo ao escalar | Voltou a desequilibrar → reduzir teste pra ≤20% |

---

## 6. Como plugar nos dados (quando lançar)

1. Conectar **Meta Ads no Windsor.ai** (1 clique — hoje só Google Ads/Splitcenter está conectado).
2. Puxar `facebook` (spend, ROAS, CPC, conversões) por criativo/conjunto.
3. Aplicar os gatilhos da seção 5.
4. Executar via Windsor: `pause_campaign`, `set_campaign_budget` (com aprovação humana).
> **ATUALIZADO 20/06:** Meta JÁ conectado no Windsor (conta planopratico). Campanha Xixi Máxima viva (`120248854033500623`). Credenciais e ativos na seção 9.

---

## 7. Exemplo aplicado — DogFlow (com dados reais do Espião)

**Ângulos dominantes dos concorrentes (tom = empatia/reforço positivo):**
- *"Seu cão não precisa de punições, gritos ou medo para aprender."*
- *"Gritar NÃO nunca vai fazer seu cachorro reativo obedecer."*
- *"Se o cachorro late pra tudo que passa, não é porque ele é mau..."*
- Ângulo de **economia:** *"Adestrar é mais barato do que trocar o sofá e limpar xixi todo dia."*
- Problemas específicos validados: **vir quando chamado, latido, xixi no lugar, reatividade.**

**Voz do Cliente (linguagem literal pra headline):**
- *"latido insuportável"*, *"não aguento mais"*, *"tô quase louca"*, *"ele é um monstro da tazmania"*, *"socooorrooo!"*

**Recomendação do Gestor:**
- **Ângulo-mãe:** reforço positivo ("sem gritos, sem punição") — é o que os concorrentes mais rodam e o que o público pede. Diferencial: tangibilizar num produto (cartilha/rotina/mapa) à la Máxima.
- **3 hooks pra testar (cruzando concorrente × cliente):**
  1. *"Cansou do latido insuportável? Não é castigo que resolve — é isso aqui 👇"* (mostra a rotina/produto)
  2. *"Seu cão faz xixi em tudo? Sai mais barato que trocar o sofá."*
  3. *"'Tô quase louca' — se você já disse isso do seu cão, esse plano de 7 dias é pra você."*
- **Funil:** criativo (mostra o produto) → página curta → checkout R$27. Sem bump até ROI 2.
- **Estrutura:** Fase 3D com 10 criativos ABO 1×1×1, R$150/dia, alvo 4 criativos ROI≥2,5.

---

## 8. Como invocar esta skill

- **Pré-lançamento:** "Gestor, analisa o Espião do [produto] e me traz ângulo + 10 criativos + plano de campanha." → ele consome competitor_angles + VoC e devolve o plano (como o exemplo acima).
- **Pós-lançamento:** "Gestor, puxa o Meta dos últimos X dias e aplica os gatilhos." → ele lista o que matar/escalar e propõe as ações (pause/budget) pra aprovação.

---

## 9. Credenciais e Acessos (atualizado 20/06/2026)

### Ativos da conta Meta (planopratico)
- Conta de anúncios: **`act_1319011403758714`**
- Page (Facebook): **`1304660396052868`** (Planopratico)
- Pixel: **`1390710396449878`** (DogFlow Pixel) — único válido na conta; landing+Kiwify disparam ele
- Campanhas: Xixi Máxima `120248854033500623` (ativa) · Antiga genérica `120248611748940623` (ativa)

### Dois caminhos pra AGIR (use o certo)
| Ação | Como |
|---|---|
| Ler ROAS/gasto/conversões · **pausar** · **ativar** · **mudar orçamento** | **Windsor** (conector `facebook`, conta já conectada). NÃO precisa de token. `execute_action` → pedir aprovação humana. |
| **Criar** campanha nova · **subir criativo** novo · editar segmentação | **Token do Meta** (Graph API, `ads_management`). Ex: `POST /v21.0/act_1319011403758714/campaigns` `/adsets` `/adcreatives` `/ads`. |

### Token do Meta (Graph API) — longa duração, app PlanoPratico Ads
```
META_ADS_TOKEN=<<NO COFRE DA VPS — não versionado. Ver /opt/planopratico/docs/wiki ou pedir ao dono>>
```
- **Válido até ~2026-08-19 (60 dias).** App: PlanoPratico Ads (`1577021880668374`). Escopos: `ads_management`, `ads_read`, `business_management`.
- App Secret (pra renovar a troca de 60 dias): `<<NO COFRE DA VPS — não versionado>>`.
- **Renovar quando vencer:** gerar token curto no Graph API Explorer com o app **PlanoPratico Ads** e trocar:
  `GET /v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=1577021880668374&client_secret=<secret>&fb_exchange_token=<token_curto>`
- ✅ **Permanente de verdade:** só com **Usuário do Sistema** (Business Settings). Quando der, usar esse no lugar.
🔒 **Não publicar/commitar este arquivo.** Para o dia a dia (pausar/escalar/verba) prefira o **Windsor** — não depende deste token.
