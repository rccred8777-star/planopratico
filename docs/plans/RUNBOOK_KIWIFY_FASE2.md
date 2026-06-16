# Runbook — Fase 2: Configurar Kiwify DogFlow

**Objetivo:** Criar o produto, order bump, upsell e webhook no Kiwify.
**Tempo estimado:** 30–60 minutos
**URL:** https://kiwify.com.br

---

## Visão geral do funil

```
Visitante → Landing page / Quiz
    ↓
[Checkout] DogFlow — Desafio 7 Dias   R$27,00
    + Order Bump: Pare de Destruir     R$17,00  (check no próprio checkout)
    ↓ (após pagamento)
[Upsell]  Plano Mensal DogFlow        R$29,90/mês
    ↓ (recusa do upsell)
[Downsell] Acesso Semestral            R$47,00  (pagamento único, 6 meses)
    ↓
Página de obrigado → app.planopratico.shop
```

---

## Passo 1 — Criar conta Kiwify

1. Acessar https://kiwify.com.br → **Criar conta**
2. Dados: nome "Plano Prático" / e-mail do negócio / CNPJ ou CPF
3. Aceitar termos e verificar e-mail
4. Completar perfil bancário (para receber pagamentos):
   - Conta corrente ou poupança (PJ ou PF)
   - Os saques ficam disponíveis com D+30 por padrão

---

## Passo 2 — Criar o produto principal

**Menu:** Produtos → Novo Produto → Produto Digital

| Campo | Valor |
|---|---|
| **Nome** | DogFlow — Desafio 7 Dias: Cão Mais Educado |
| **Descrição curta** | Método passo a passo para corrigir o comportamento do seu cão em 7 dias usando reforço positivo. |
| **Categoria** | Educação / Pets |
| **Tipo** | Digital (acesso via URL) |
| **Preço** | R$ 27,00 |
| **Parcelamento** | 1x apenas (valor baixo — não parcelar) |
| **URL de entrega** | https://app.planopratico.shop (após Fase 3.9) |
| **URL de obrigado** | https://planopratico.shop/dogflow/obrigado |

**Imagem do produto:** usar logo DogFlow ou imagem de cão (1200x628px recomendado)

> ⚠️ Salvar o **ID do produto** — será usado na configuração do webhook.

---

## Passo 3 — Configurar Order Bump

No produto principal → aba **Order Bump** → Ativar

| Campo | Valor |
|---|---|
| **Nome do bump** | Pare de Destruir a Casa — Guia dos 3 Comportamentos |
| **Preço** | R$ 17,00 |
| **Descrição no checkout** | Seu cão também late demais, pula nas pessoas ou destrói o que encontra? Guia prático com 3 módulos: roer objetos, pular em visitas e latido excessivo. Mesmo método do DogFlow. Sem punição. |
| **Texto do check** | ✅ Sim, quero adicionar "Pare de Destruir a Casa" por R$17 |
| **URL de entrega** | https://app.planopratico.shop (mesmo acesso — produto ainda em construção) |

> 💡 **Nota:** O conteúdo do bump (3 guias) ainda não está produzido. Configurar no Kiwify mas liberar o mesmo acesso do DogFlow por enquanto. Quando o conteúdo estiver pronto, criar produto separado e atualizar.

---

## Passo 4 — Configurar Upsell (pós-pagamento)

**Menu:** Produto → Upsell → Adicionar upsell

| Campo | Valor |
|---|---|
| **Nome** | Plano Mensal DogFlow — Módulos Avançados |
| **Tipo** | Assinatura mensal |
| **Preço** | R$ 29,90/mês |
| **Período de cobrança** | Mensal |
| **Descrição** | Continue evoluindo além dos 7 dias. Acesso a módulos avançados: passeio sem puxar, controle de latido, socialização, truques. Cancele quando quiser. |
| **URL de entrega** | https://app.planopratico.shop/planos |
| **Texto do botão aceitar** | Sim! Quero continuar por R$29,90/mês |
| **Texto do botão recusar** | Não, prefiro encerrar aqui |

---

## Passo 5 — Configurar Downsell (recusa do upsell)

Dentro do upsell → aba **Downsell**

| Campo | Valor |
|---|---|
| **Nome** | DogFlow — Acesso Semestral (6 meses) |
| **Tipo** | Pagamento único |
| **Preço** | R$ 47,00 |
| **Descrição** | Prefere não pagar mensalidade? Acesse os módulos avançados por 6 meses completos com pagamento único. Sem renovação automática. |
| **URL de entrega** | https://app.planopratico.shop/planos |
| **Texto do botão aceitar** | Sim, quero 6 meses por R$47 |
| **Texto do botão recusar** | Não, obrigado |

---

## Passo 6 — Configurar Webhook

**Menu:** Produto → Integrações → Webhooks → Adicionar

### Configuração

| Campo | Valor |
|---|---|
| **URL** | `https://app.planopratico.shop/api/webhooks/kiwify?token=SEU_SECRET` |
| **Eventos** | ☑ Compra aprovada · ☑ Compra reembolsada · ☑ Estorno · ☑ Carrinho abandonado |

### Gerar o token secreto

Execute no terminal (ou peça ao Claude Code):
```bash
openssl rand -hex 32
```

Copie o resultado e:
1. Cole no final da URL acima (`?token=resultado`)
2. Cole também no `.env` do app Next.js como `KIWIFY_WEBHOOK_SECRET=resultado`
3. Cole no `docker-compose.yml` do DogFlow na variável `KIWIFY_WEBHOOK_SECRET`

> ⚠️ Guardar o token em local seguro. Sem ele, o app rejeita todos os webhooks.

---

## Passo 7 — Configurar página de obrigado personalizada

**Menu:** Produto → Checkout → Página pós-venda

- Selecionar **Redirecionar para URL**
- URL: `https://planopratico.shop/dogflow/obrigado`

> O arquivo `landing/dogflow-xixi/obrigado.html` já está pronto — basta fazer deploy junto com a landing page.

---

## Passo 8 — Personalizar checkout

**Menu:** Produto → Checkout → Aparência

| Campo | Valor |
|---|---|
| **Cor primária** | #ff7a11 |
| **Logo** | Logo DogFlow (PNG fundo transparente) |
| **Descrição no checkout** | "7 dias de treino guiado · 10 minutos por dia · Método de reforço positivo · Garantia de 7 dias" |
| **Garantia** | 7 dias (Kiwify oferece campo padrão de garantia) |

---

## Passo 9 — Teste de compra

1. No produto → **Modo teste** → ativar
2. Fazer compra com cartão de teste Kiwify
3. Verificar:
   - [ ] E-mail de confirmação chegou
   - [ ] Redirecionamento para obrigado.html funcionou
   - [ ] Webhook chegou no Next.js (ver logs: `docker logs dogflow-app`)
   - [ ] Purchase criada no Supabase
   - [ ] Magic link enviado para o e-mail do comprador

---

## Passo 10 — Coletar URLs e atualizar o projeto

Após criar o produto, copiar as URLs geradas pelo Kiwify:

| Item | URL |
|---|---|
| **Checkout principal** | `https://pay.kiwify.com.br/XXXXXX` |
| **Checkout com bump** | mesmo link (bump aparece automaticamente) |

Substituir `SUBSTITUIR` nos arquivos:
- `landing/dogflow-xixi/index.html` — CTA do botão
- `landing/quiz/index.html` — CTA do resultado

---

## Checklist final Fase 2

- [ ] Conta Kiwify criada e verificada (2.1)
- [ ] Produto principal DogFlow R$27 criado (2.2)
- [ ] Order Bump "Pare de Destruir" R$17 configurado (2.3)
- [ ] Upsell Mensal R$29,90 configurado (2.4)
- [ ] Downsell Semestral R$47 configurado (2.5)
- [ ] Webhook configurado com token seguro (2.6)
- [ ] Token adicionado ao .env do app
- [ ] Teste de compra bem-sucedido (2.7)
- [ ] URLs do checkout substituídas na landing e no quiz

---

## Depois da Fase 2

Com o checkout no ar, os próximos passos são:
1. **Fase 3.9** — Deploy do app na VPS (para o webhook funcionar de verdade)
2. **Fase 5.7** — Ativar workflows n8n e testar fluxo completo
3. **Fase 4** — Pixel Meta + UTMify
