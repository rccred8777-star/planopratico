# 🚀 Pacote de Lançamento — DogFlow Xixi (handoff p/ o agente chefe)
> Tudo pronto pra subir a campanha. Para o Hermes/agente chefe executar ou guiar o humano no Gerenciador de Anúncios.
> Gerado: 19/06/2026 · Produto R$27 · método Ricardo Máxima

---

## 1. Status geral (o que JÁ está pronto)
| Item | Estado |
|---|---|
| Produto entregue (app) | ✅ os 7 dias reescritos pra XIXI (batiam obediência antes) — `scripts/atualizar_conteudo_xixi.py` |
| Landing | ✅ `planopratico.shop/dogflow` no ar |
| Checkout Kiwify R$27 | ✅ `pay.kiwify.com.br/a6a8NmF` |
| Tracking | ✅ Pixel único `1076171898074575`, PageView + InitiateCheckout + Purchase R$27, UTMify, webhook→Supabase |
| App (login/PWA/acesso) | ✅ bugs corrigidos (acesso negado, PWA, esqueci senha, cache) |
| Atendente IA (WhatsApp+email) | ✅ no ar |

## 2. Os criativos
> ⛔ **NÃO suba os vídeos CRUS do HeyGen** (avatar sozinho, sem o app na tela). Use SÓ os EDITADOS abaixo. Se já criou conjuntos com vídeo cru, deixe PAUSADO e troque o vídeo pelos editados antes de ativar — o "dedo na tela" é o diferencial do método.

**5 vídeos editados (avatar HeyGen + app na tela / dedo na tela), prontos pra baixar:**
- `planopratico.shop/review/TESTE_V01.mp4` (alça pronta)
- `planopratico.shop/review/TESTE_V02.mp4` (economia)
- `planopratico.shop/review/TESTE_V03.mp4` (já gastou e não resolveu)
- `planopratico.shop/review/TESTE_V04.mp4` (solução mais simples)
- `planopratico.shop/review/TESTE_V10.mp4` (o que acontece se não resolver)

**Tela de revisão (aprovar/reprovar):** `planopratico.shop/review/` (decisões na tabela `creative_reviews`).
**15 criativos estáticos:** `docs/product/CRIATIVOS_DOGFLOW_XIXI_LUGAR_CERTO_V1.md` (⚠️ cortar C1-06 e C1-08 — sem base, ver `AUDITORIA_CAMPANHA1_XIXI_V1.md`).
**Roteiros completos:** `HEYGEN_CAMPANHA2_DOGFLOW_XIXI_10_VIDEOS_V1.md`.
**Pendente:** gerar V05-V09 no HeyGen (web) + editar (baixar via API + ffmpeg, igual aos 5).

## 3. A oferta (Máxima)
R$27, no-brain, **SEM order bump** no teste (ligar só após ROI 2). Garantia 7 dias.

## 4. Estrutura da campanha (subir no Gerenciador de Anúncios)

> ⚠️ **NÃO CONFUNDIR (erro comum):** o "1×1×1" do Máxima = 1 campanha × 1 conjunto × 1 criativo **POR CONJUNTO**. Com 10 criativos = **10 conjuntos ISOLADOS** (um criativo em cada). NÃO é "todos os criativos num conjunto só". Conjunto único com todos = ABO Gramado, que é a **Fase 2 (escala)**, só com os 4 vencedores. Subir tudo num conjunto agora MATA o teste (a Meta concentra a verba em 1-2 e você não vê qual vende).

**Fase 3D — Teste de criativo (ABO 1×1×1):**
- 1 campanha, objetivo **Vendas/Conversões** (evento Compra)
- **conjuntos ISOLADOS**, **1 criativo por conjunto** (ABO — verba no conjunto)
- Verba: **R$10/dia POR CONJUNTO**, rodar **5 dias**

> ✅ **DECISÃO DO DONO (19/06): opção B — começar JÁ com os 5 prontos.**
> - Subir AGORA **5 conjuntos** (V01, V02, V03, V04, V10 — os editados em planopratico.shop/review/TESTE_Vxx.mp4), R$10/dia cada = **R$50/dia total**.
> - Quando os V05-V09 forem gerados no HeyGen + editados, **adicionar mais 5 conjuntos** na mesma campanha (chegando aos 10).
> - Manter a regra: alvo 4 criativos ROI ≥ 2,5 → Fase 2 (Gramado).
- Público amplo (deixar a Meta otimizar) ou interesse pet/cachorro/filhote
- Pixel: `1076171898074575`, otimizar por **Compra**

**Passo a passo no Gerenciador:**
1. Campanha → Objetivo **Vendas** → nome "DogFlow Xixi - Teste 3D"
2. Desativar Advantage Campaign Budget (verba no conjunto = ABO)
3. Criar 10 conjuntos (1 por criativo): verba R$15/dia, otimização por Compra, pixel 1076, público
4. 1 anúncio por conjunto, cada um com um vídeo/estático, link → `pay.kiwify.com.br/a6a8NmF` (ou a landing)
5. Publicar tudo pausado → revisar → ativar

## 5. KPIs e regras de corte (o gestor analisa)
- Alvo: **4 criativos com ROI ≥ 2,5** ao fim dos 5 dias. Matar ROI < 2.
- Métricas: ROAS, CPA, CTR, hook rate (3s), % InitiateCheckout→Purchase.
- Achou 4 vencedores → **Fase 2 (ABO Gramado)**: os 4 juntos num conjunto, R$67/dia, 5 ABO iguais (cluster pocket).

## 6. O que falta (bloqueios externos)
- **Gerar V05-V09** no HeyGen.
- **Conectar Meta Ads no Windsor.ai** (hoje só Google Ads) → o gestor puxa ROAS e executa pause/budget.
- **Confirmar plano Supabase** (free → Pro antes de escalar verba) e tirar code-server da VPS.
- Nome de exibição WhatsApp "planopratico" (em revisão Meta) — cosmético.

## 7. Compliance (toda peça)
Sem "garantido"/promessa clínica. Conteúdo do app é honesto: 7 dias = rotina + primeiros acertos, fixação 100% com semanas. Ref: `SPEC_COMPLIANCE_META_BEM_ESTAR`.
