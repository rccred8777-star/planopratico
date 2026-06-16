# Templates WhatsApp — DogFlow
## Aprovar no Meta Business Manager antes de ativar os workflows

> Templates de mensagem são obrigatórios para mensagens business-initiated
> (enviadas pela empresa para o cliente sem a janela de 24h).
> Criar em: Meta Business Manager → WhatsApp Manager → Message Templates

---

## Template 1 — dogflow_boas_vindas
**Usado em:** W1 (D+0, imediatamente após a compra)
**Categoria:** UTILITY

```
Nome do template: dogflow_boas_vindas
Idioma: Português (Brasil)
Categoria: Utility

--- CORPO DA MENSAGEM ---
Olá, {{1}}! 🐾

Sua compra do *DogFlow* foi confirmada!

Em alguns minutos você vai receber um e-mail para criar sua senha e começar o Desafio 7 Dias.

*Próximos passos:*
1. Abra o e-mail "Seu acesso ao DogFlow"
2. Clique no link e crie sua senha
3. Cadastre seu cão e comece o Dia 1 🐾

Qualquer dúvida, responda esta mensagem!

— Equipe Plano Prático

Parâmetros de corpo:
  {{1}} = primeiro nome do cliente
```

---

## Template 2 — dogflow_lembrete_dia
**Usado em:** W2 (D+1 a D+6, exceto D+3)
**Categoria:** UTILITY

```
Nome do template: dogflow_lembrete_dia
Idioma: Português (Brasil)
Categoria: Utility

--- CORPO DA MENSAGEM ---
Oi, {{1}}! 🐾

Hoje é o *Dia {{2}}* do Desafio DogFlow.

10 minutos de treino fazem toda a diferença na criação da rotina do seu cão. Não pule hoje!

👉 app.planopratico.shop

Bora lá! 💪

Parâmetros de corpo:
  {{1}} = primeiro nome do cliente
  {{2}} = número do dia (1 a 6)
```

---

## Template 3 — dogflow_checkin_d3
**Usado em:** W2 (especificamente no D+3)
**Categoria:** UTILITY

```
Nome do template: dogflow_checkin_d3
Idioma: Português (Brasil)
Categoria: Utility

--- CORPO DA MENSAGEM ---
Oi, {{1}}! 🐾

Você está no *Dia 3* do Desafio DogFlow — o meio do caminho!

A maioria dos donos começa a ver diferença exatamente por aqui. Como está sendo para você e o {{1}}?

Se tiver alguma dificuldade ou dúvida, responda esta mensagem. Estamos aqui para ajudar! 💙

Continue firme — você está indo bem!

— Equipe Plano Prático

Parâmetros de corpo:
  {{1}} = primeiro nome do cliente
```

---

## Template 4 — dogflow_oferta_assinatura
**Usado em:** W3 (D+7 e D+14)
**Categoria:** MARKETING

```
Nome do template: dogflow_oferta_assinatura
Idioma: Português (Brasil)
Categoria: Marketing

--- CORPO DA MENSAGEM ---
Parabéns, {{1}}! 🏆

Você chegou ao *Dia {{2}}* do Desafio DogFlow.

Quer continuar evoluindo além dos 7 dias? O plano DogFlow dá acesso a módulos de:

🦮 Passeio sem puxar
🔊 Controle de latido  
🤝 Socialização com outros cães
🐕 Truques e comandos avançados

*A partir de R$29,90/mês* — cancele quando quiser.

👉 app.planopratico.shop/planos

Parâmetros de corpo:
  {{1}} = primeiro nome do cliente
  {{2}} = "7" ou "14" (dia da oferta)
```

---

## Template 5 — dogflow_recuperacao_1
**Usado em:** W4 (30 min após abandono)
**Categoria:** UTILITY

```
Nome do template: dogflow_recuperacao_1
Idioma: Português (Brasil)
Categoria: Utility

--- CORPO DA MENSAGEM ---
Oi, {{1}}! 🐾

Vi que você visitou o DogFlow mas não finalizou a compra. Aconteceu alguma coisa?

O link ainda está disponível:
👉 planopratico.shop/dogflow

Se tiver alguma dúvida antes de comprar, é só responder aqui!

Parâmetros de corpo:
  {{1}} = primeiro nome do cliente
```

---

## Template 6 — dogflow_recuperacao_2
**Usado em:** W4 (D+1 após abandono)
**Categoria:** UTILITY

```
Nome do template: dogflow_recuperacao_2
Idioma: Português (Brasil)
Categoria: Utility

--- CORPO DA MENSAGEM ---
Oi, {{1}}!

Um lembrete rápido sobre o DogFlow. 🐾

Resolver o problema de comportamento do seu cão pode ser mais simples do que você imagina:
✅ 10 minutos por dia
✅ 7 dias seguidos
✅ Método de reforço positivo — sem punição
✅ Garantia de 7 dias

👉 planopratico.shop/dogflow

Qualquer dúvida, responda aqui!

Parâmetros de corpo:
  {{1}} = primeiro nome do cliente
```

---

## Template 7 — dogflow_recuperacao_3
**Usado em:** W4 (D+2 após abandono — última mensagem)
**Categoria:** UTILITY

```
Nome do template: dogflow_recuperacao_3
Idioma: Português (Brasil)
Categoria: Utility

--- CORPO DA MENSAGEM ---
{{1}}, última mensagem! 🐾

Se quiser resolver o problema do seu cão de uma vez por todas, o DogFlow ainda está disponível por *R$27* com garantia de 7 dias.

👉 planopratico.shop/dogflow

Se mudar de ideia, estaremos aqui. 😊

— Equipe Plano Prático

Parâmetros de corpo:
  {{1}} = primeiro nome do cliente
```

---

## Notas sobre aprovação Meta

- Templates de categoria **Utility** são geralmente aprovados em 24–48h
- Templates de categoria **Marketing** podem demorar mais e são mais sujeitos a rejeição
- Evitar: promessas de resultado, linguagem de urgência excessiva, links de domínio suspeito
- Sempre incluir nome da empresa no rodapé
- Após criação, aguardar status "Aprovado" antes de ativar os workflows

## Onde criar no Meta

1. Meta Business Manager → https://business.facebook.com
2. WhatsApp Manager → sua conta → Message Templates
3. Criar template → preencher nome + corpo + parâmetros → Enviar para revisão
