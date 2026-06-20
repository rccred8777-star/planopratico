# Auditoria da Campanha 1 (15 criativos convencionais) vs Dados do Espião
> Mesmo rigor da Campanha 2: cada criativo da C1 testado contra `competitor_angles` e `youtube_comments` reais (com ID). Verdito: 🟢 sustentado · 🟡 parcial/plausível mas não verificado · 🔴 sem base nos dados.
> Gerado: 19/06/2026 · Fonte da C1: `CRIATIVOS_DOGFLOW_XIXI_LUGAR_CERTO_V1.md`

---

## Veredito por criativo

| # | Ângulo C1 | Verdito | Fonte real / motivo |
|---|---|---|---|
| 01 | Identificação ("faz xixi fora do lugar?") | 🟢 | comentários de quem tentou tapete/banheiro: `UgzEEej6Chl1P7` ("tranco no banheiro"), `Ugy-NyMmjK9Kmn` |
| 02 | Dor do sofá | 🟢 | angle `18dba911` literal: "trocar o sofá, limpando o xixi todo dia" |
| 03 | Frustração ("já tentei de tudo") | 🟢 | comentários: produtos/repelente, "restringir o espaço" (comentário top) — padrão real |
| 04 | Apartamento ("só faz na rua") | 🟡 | segmento plausível, mas **sem ângulo/comentário** no que coletamos. Validar com mais dados ou no teste |
| 05 | Cão adulto | 🟡 | dados pendem pra filhote; só `UgxZroYNTVxtQt` (cão 10 anos) dá suporte fraco |
| 06 | Cheiro ("visita sente o cheiro") | 🔴 | **sem base nos dados** — nenhum comentário/ângulo sobre cheiro/visita. Inventado (plausível, mas não validado) |
| 07 | Quase desistindo | 🟢 | comentário `UgxZroYNTVxtQt`: "me parte o coração o fato dele ter passado a maior parte da vida..." |
| 08 | "Marido quer dar o cachorro embora" | 🔴 | **sem base nos dados** — nenhum dado sobre pressão de família/parceiro. Inventado |
| 09 | Custo do problema | 🟢 | angle `18dba911` (economia) + comentários de compra de produtos |
| 10 | Resultado simples (7 dias/10 min) | 🟢 | é a promessa da oferta (não é ângulo de dado, mas é o produto) |
| 11 | Tapete rasgado | 🟡 | angle `879ef422` cita "chinelo roído" (mastigar), mas **não "rasga o tapete"** especificamente — extrapolação |
| 12 | Método vs punição | 🟢 | tom **dominante** dos concorrentes é empatia/"sem punição" (maioria dos angles) |
| 13 | Filhote ("por onde começo?") | 🟢 | angles `879ef422`, `ebbf893f`, `9489f071` (vários, filhote) |
| 14 | Prova social ("funcionou em 5 dias") | 🟡 | conceito sustentado (`UgyWY0y2Z7HxnK` "deu super certo"), mas o **exemplo da C1 é depoimento fictício** — só usar real |
| 15 | Urgência/direto (R$27) | 🟢 | oferta-base (no-brain) |

---

## Resumo

- **🟢 Sustentados nos dados (9):** 01, 02, 03, 07, 09, 10, 12, 13, 15 → **manter** no teste.
- **🟡 Parciais (4):** 04 (apto), 05 (cão adulto), 11 (tapete rasgado), 14 (prova social fictícia) → **manter com ressalva** — são hipóteses razoáveis; deixar o teste de 5 dias decidir (ou validar com mais coleta do Espião).
- **🔴 Sem base (2):** 06 (cheiro/visita) e 08 (marido quer dar embora) → **cortar ou rebaixar prioridade.** São emocionalmente plausíveis, mas não saíram da pesquisa — risco de gastar verba testando achismo.

## Comparação de método (o ponto do teste A/B)
- **C1:** 9/15 sustentados, 4 parciais, **2 sem base** (achismo). Boa intuição, mas com furos.
- **C2 (Máxima):** 10/10 com fonte declarada (8 com ID exato) + modelo mental nomeado.
- O teste de 5 dias vai dizer se o rigor da C2 se traduz em mais criativos ROI≥2,5 — mas já dá pra **cortar os 2 vermelhos da C1** antes de gastar com eles.

## Recomendação operacional
1. **Cortar C1-06 e C1-08** do teste (sem base nos dados).
2. Subir os 9 verdes da C1 + os 4 amarelos marcados como "hipótese".
3. Rodar contra os 10 da C2. KPIs e regras de corte no plano (`adaptive-drifting-whisper.md`).
