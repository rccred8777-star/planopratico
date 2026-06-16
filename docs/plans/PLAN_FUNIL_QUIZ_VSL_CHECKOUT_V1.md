# PLAN — Funil Quiz + VSL + Checkout V1

**Versão:** V1 | **Status:** Rascunho — aguardando infra pronta

## 1. Visão Geral do Funil

```
[Meta Ads]
↓
[Mini-VSL 1] — planopratico.shop
↓
[Quiz] — quiz.planopratico.shop (4-6 perguntas)
↓
[Resultado] — quiz.planopratico.shop/resultado/{perfil}
↓
[Mini-VSL 2 / Oferta] — planopratico.shop/oferta/{perfil}
↓
[Kiwify Checkout] — R$27
↓
[Order Bump] — R$19
↓
[Upsell] — R$97
↓
[Downsell] — R$47 (se recusar upsell)
↓
[Obrigado / Entrega] — via Kiwify + n8n
↓
[Pós-venda] — WhatsApp (wacrm) + E-mail
```

## 2. Mini-VSL 1 (Entrada)

**Duração:** 60-90s | **Formato:** vertical (Reels) ou horizontal (feed)

Estrutura:
1. Hook de identificação de dor (5-8s)
2. Amplificação da dor / consequência (10-15s)
3. Promessa de solução + prova de conceito (15-20s)
4. CTA: "Descubra seu perfil → Quiz" (5s)

Variações por perfil de dor:
- A: Sobrecarregado | B: Desconectado | C: Hipercrítico | D: Esgotado

## 3. Quiz

**Perguntas:** 4-6 | **Lógica:** pontos por perfil → resultado automático

Perguntas rascunho:
1. "Quando você pensa no seu dia, qual frase mais te representa?" (4 opções)
2. "Como você se sente quando tem uma lista de tarefas grande?" (4 opções)
3. "Como costuma ser sua noite antes de dormir?" (4 opções)
4. "O que mais te impede de fazer o que precisa?" (4 opções)

Página de resultado: revelar perfil + prova social + CTA para oferta

## 4. Mini-VSL 2 (Oferta)

**Duração:** 2-3min | Estrutura:
1. Validar o perfil ("Se você chegou aqui como [Perfil]...")
2. Aprofundar a dor específica
3. Apresentar Plano Recomeço 21D
4. Mostrar o que está dentro do produto
5. Prova social + depoimentos
6. Preço R$27 + garantia
7. CTA para checkout

## 5. Checkout (Kiwify)

- Produto: R$27 | Bump: R$19
- Pixel Meta + UTMify + Webhook → n8n

## 6. Pós-compra

Sequência WhatsApp (wacrm + n8n):
- D+0: Boas-vindas + link | D+3: Check-in | D+7: Prova social | D+14: Backend

Sequência E-mail:
- D+0: Boas-vindas | D+1: Dica dia 1 | D+3: Check-in | D+7: Prova social | D+14: Backend

## 7. Recuperação de Carrinho (n8n)

Gatilho: InitiateCheckout sem Purchase após 30min
- Ação 1: WhatsApp | Ação 2 D+1: E-mail | Ação 3 D+2: WhatsApp final

## 8. Checklist de Pré-lançamento

- [x] VPS + Docker funcional
- [x] n8n instalado
- [ ] wacrm + número WhatsApp aprovado
- [ ] Kiwify: produto + bump + upsell + downsell
- [ ] Webhooks Kiwify → n8n
- [ ] Pixel Meta em todas as páginas
- [ ] UTMify configurado
- [x] DNS + SSL funcionando
- [ ] Mini-VSL 1 gravado e aprovado
- [ ] Quiz criado e testado
- [ ] Mini-VSL 2 gravado (ao menos 1 perfil)
- [ ] Compliance revisado
- [ ] Teste de compra real (R$1)
