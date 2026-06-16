# SPEC — DogFlow Funil Low Ticket V1

**Produto:** DogFlow — Desafio 7 Dias Cão Mais Educado
**Status:** V1 — aprovado para desenvolvimento
**Compliance:** ver SPEC_COMPLIANCE_DOGFLOW_V1.md

---

## 1. Produto Principal

**Nome:** DogFlow — Desafio 7 Dias Cão Mais Educado
**Formato:** PWA (Progressive Web App) — ver SPEC_DOGFLOW_PWA_V1.md
**URL:** app.planopratico.shop
**Preço:** R$ 27,00 (lançamento: R$ 19,90)

### Transformação entregue

- Cachorro mais obediente em comandos básicos
- Dono mais seguro sobre o que fazer no dia a dia
- Menos xixi fora do lugar
- Menos puxão na guia
- Menos latido excessivo
- Menos pulo nas pessoas
- Melhor rotina dentro de casa
- Início de educação positiva (sem grito, punição ou violência)

### O que NÃO é

- Não é produto de saúde veterinária
- Não promete resolver agressividade grave
- Não substitui adestrador ou veterinário em casos sérios
- É um plano prático para problemas comuns do dia a dia

---

## 2. Estrutura dos 7 Dias

Cada dia contém:
- Objetivo do dia
- Explicação simples (por que isso importa)
- Treino de 10 minutos
- Erro comum (e como evitar)
- Checklist do dia
- Tarefa prática

| Dia | Tema sugerido |
|---|---|
| 1 | Atenção e nome — o cachorro olha para você |
| 2 | Sentar — comando base de tudo |
| 3 | Ficar — impulso e autocontrole |
| 4 | Vir quando chamado — o comando mais importante |
| 5 | Passeio sem puxar — primeiros passos |
| 6 | Não pular nas pessoas — redirecionamento positivo |
| 7 | Rotina consolidada — como manter o que aprendeu |

---

## 3. Bônus Inclusos

| Bônus | Formato |
|---|---|
| Checklist diário de treino | PDF |
| Guia xixi no lugar certo | PDF |
| Guia passeio sem puxar | PDF |
| Lista de erros que fazem o cachorro desobedecer | PDF |
| Modelo de rotina para filhotes | PDF |

---

## 4. Escada de Valor

| Produto | Valor | Tipo |
|---|---|---|
| Desafio 7 Dias Cão Mais Educado | R$ 27,00 | Front-end (one-time) |
| Guia "Xixi no lugar certo" (aprofundado) | R$ 19,00 | Order bump |
| Plano 30 Dias Cão Mais Educado | R$ 97,00 | Upsell |
| Pack de Treinos Essenciais | R$ 47,00 | Downsell |
| Básico — assinatura mensal | R$ 29,90/mês | Backend (Dia 8) |
| Premium — assinatura mensal | R$ 59,90/mês | Backend |
| Pro — assinatura mensal | R$ 99,90/mês | Backend |

---

## 5. Segmentação (MVP)

Sem quiz de perfil no MVP. O dono informa o principal problema do cachorro apenas para personalizar criativos e comunicação. O produto entrega trilha única de 7 dias para todos.

**Dores usadas nos criativos:**
- Cachorro faz xixi fora do lugar
- Cachorro puxa demais na guia
- Cachorro late sem parar
- Cachorro pula em todo mundo
- Filhote bagunceiro, não obedece nada
- Cachorro ansioso / destrói a casa

**Evolução futura:** quiz de perfil → trilha personalizada por problema → app/PWA com cadastro do pet, progresso e planos personalizados.

---

## 6. Funil

```
Meta Ads (criativos por dor: xixi / guia / latido / pulo / filhote)
↓
Landing page + Mini-VSL (planopratico.shop/dogflow ou dogflow.planopratico.shop)
↓
Kiwify Checkout — R$27
↓
Order Bump — R$19 (Guia xixi aprofundado)
↓
Upsell — R$97 (Plano 30 Dias)
↓
Downsell — R$47 (Pack de treinos essenciais)
↓
Obrigado + entrega — Kiwify + n8n
↓
Pós-venda — WhatsApp (wacrm + n8n) + E-mail
```

---

## 7. Rastreamento

- Pixel Meta em todas as páginas do funil
- UTMify para atribuição
- Eventos: PageView, Lead, InitiateCheckout, Purchase, Upsell
- UTMs obrigatórios: utm_source, utm_medium, utm_campaign, utm_content, utm_term

---

## 8. Pós-venda (n8n + wacrm)

**Sequência WhatsApp:**
- D+0: Boas-vindas + link de acesso + instrução do Dia 1
- D+1: Lembrete treino Dia 2
- D+3: Check-in — como está indo?
- D+7: Parabéns por completar + oferta backend (Plano 30 Dias)
- D+14: Prova social + oferta backend

**Sequência E-mail:**
- D+0: Boas-vindas + acesso
- D+1: Dica Dia 1 + motivação
- D+3: Check-in
- D+7: Celebração + oferta backend
- D+14: Prova social

---

## 9. Compliance

Disclaimer obrigatório em todas as páginas:

> *"O DogFlow é um guia de adestramento positivo para problemas comuns de comportamento. Não substitui avaliação veterinária ou adestrador profissional em casos de agressividade, ansiedade grave ou problemas de saúde. Em caso de comportamento de risco, consulte um profissional."*

- Sem promessa de resultado garantido
- Sem linguagem que sugira cura ou tratamento
- Educação positiva — proibido sugerir punição física
