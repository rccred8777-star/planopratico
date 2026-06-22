# 🤖 Kit de Robôs — Modelo Reutilizável (esteira de agência)
> Mensagens genéricas com **variáveis**. Cliente novo = preenche a ficha, não reescreve nada.
> Gerado: 20/06/2026 · 1º teste: Eliane (Mapa do Padrão)

---

## 1. A FICHA DO CLIENTE (o único lugar que você preenche)

| Variável | O que é | DogFlow (exemplo) | Eliane (exemplo) |
|---|---|---|---|
| `{{produto}}` | Nome do produto | Desafio 7 Dias | Mapa do Padrão |
| `{{especialista}}` | Nome do expert (vazio se não tiver) | — | Eliane |
| `{{valor}}` | Preço | R$27 | R$67 |
| `{{beneficio}}` | Frase curta do resultado | seu cão no lugar certo em 7 dias | enxergar o padrão que você repete |
| `{{link_acesso}}` | Onde a pessoa recebe/acessa | app.planopratico.shop | (link da Eliane) |
| `{{contato_suporte}}` | Suporte (email/WhatsApp) | contato@planopratico.shop | contato@planopratico.shop |
| `{{remetente}}` | Quem assina | Equipe DogFlow | Eliane / Plano Prático |

> Variáveis que o robô preenche sozinho por venda: `{{primeiro_nome}}` (do cliente), `{{pedido}}`.

---

## 2. OS MODELOS DE MENSAGEM (genéricos)

### 🟢 A) WhatsApp — Boas-vindas (pós-compra)
> ⚠️ Precisa de **aprovação da Meta** (template) por ser proativa. Eu escrevo, você aprova num clique.
```
Oi {{primeiro_nome}}! 🎉 Seu acesso ao {{produto}} está liberado.

Tudo pra {{beneficio}} está aqui: {{link_acesso}}

Qualquer dúvida, é só responder esta mensagem. 💛
— {{remetente}}
```

### 🟢 B) E-mail — Boas-vindas / entrega
> Não precisa de aprovação. Sai na hora.
```
Assunto: Seu acesso ao {{produto}} chegou ✨

Oi {{primeiro_nome}},

Sua compra do {{produto}} foi confirmada — bem-vinda!

👉 Acesse aqui: {{link_acesso}}

A ideia é simples: {{beneficio}}. Vai no seu ritmo.
Se precisar de qualquer coisa, responda este e-mail ou fale com a gente em {{contato_suporte}}.

Um abraço,
{{remetente}}
```

### 🟢 C) Aviso de venda (pro dono — interno)
> O que já fizemos no DogFlow, agora genérico.
```
🎉 Nova venda — {{produto}}!
Cliente: {{primeiro_nome}}
Valor: {{valor}}
Pedido: {{pedido}}
```

### 🟢 D) Atendente IA (prompt base, adaptável)
> O mesmo cérebro, trocando só o contexto do produto.
```
Você é o atendente do {{produto}} ({{remetente}}). Tom: acolhedor, claro, sem promessa exagerada.
Você sabe que o produto entrega: {{beneficio}}. Acesso em {{link_acesso}}.
- Dúvida simples (acesso, como usar, prazo) → responde direto.
- Pedido de reembolso, reclamação séria, ou tema sensível → escala pra humano.
- Nunca prometa cura/resultado garantido. Nunca invente o que não está no produto.
Suporte humano: {{contato_suporte}}.
```

### 🟢 E) Recuperação de carrinho (e-mail — opcional)
```
Assunto: Faltou pouco pro seu {{produto}}

Oi {{primeiro_nome}}, vi que você começou a garantir o {{produto}} e não terminou.

Sem pressão — só queria lembrar que ele é pra {{beneficio}}, por {{valor}}.
Se quiser concluir, é por aqui: {{link_acesso}}

— {{remetente}}
```

---

## 3. COMO USAR (a esteira na prática)
1. Preenche a **ficha** (seção 1) do cliente novo.
2. O robô (n8n) lê a ficha e **troca as variáveis** automaticamente em todas as mensagens.
3. As de WhatsApp proativas (A) vão pra **aprovação da Meta** uma vez por cliente.
4. Pronto — boas-vindas, atendente, aviso de venda e recuperação rodando, sem reescrever nada.

> **Resultado:** cliente novo entra na esteira em **minutos**. O conteúdo (página, criativos) é o único trabalho criativo por cliente; a parte de robôs é só preencher a ficha.

---

## 4. Próximo passo técnico (quando você aprovar os modelos acima)
- Eu transformo isso nos workflows n8n parametrizados (1 conjunto que serve todos os clientes, lendo a ficha por `account_id`/produto no Supabase — que já é multi-cliente).
- Pra Eliane: preencho a ficha dela e ligo os robôs.
