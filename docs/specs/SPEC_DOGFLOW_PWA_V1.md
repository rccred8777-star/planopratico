# SPEC — DogFlow PWA V1

**Produto:** DogFlow
**Modelo:** Híbrido — Low Ticket (entrada) + Assinatura (recorrente)
**Status:** V1 — aprovado para desenvolvimento

---

## 1. Modelo de Negócio

```
ENTRADA (low ticket one-time)
  R$27 → Desafio 7 Dias Cão Mais Educado
  └── Bump R$19 / Upsell R$97 / Downsell R$47

         ↓ (pós-desafio / oferta no Dia 8)

RECORRENTE (assinatura mensal)
  Básico   R$29,90/mês → 1 pet + módulos base
  Premium  R$59,90/mês → 3 pets + todos os módulos
  Pro      R$99,90/mês → ilimitado + IA + consultoria
```

**Funil:** Meta Ads → Landing → Kiwify R$27 → App (7 dias) → Oferta assinatura no Dia 8

---

## 2. Stack Técnica

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js (PWA) |
| Auth + DB | Supabase |
| Hospedagem | Docker na VPS → `app.planopratico.shop` |
| Automações | n8n (webhooks Kiwify + sequências) |
| Checkout one-time | Kiwify |
| Checkout recorrente | Kiwify (assinatura) ou Stripe |
| WhatsApp | wacrm + n8n |

---

## 3. Telas (MVP)

| Rota | Tela | Acesso |
|---|---|---|
| `/login` | Login e-mail + senha | público |
| `/criar-senha` | Magic link pós-compra | via e-mail |
| `/meu-pet` | Cadastro do pet (nome, raça, idade, problema) | autenticado |
| `/treinos` | Lista de módulos disponíveis + progresso | autenticado |
| `/treino/[id]` | Módulo — steps sequenciais | autenticado + acesso ativo |
| `/progresso` | Módulos concluídos + conquistas + métricas | autenticado |
| `/planos` | Planos de assinatura (upgrade pós-desafio) | autenticado |
| `/acesso-negado` | Sem acesso ou expirado | público |

---

## 4. Banco de Dados (Supabase)

### `purchases` — controle de compras one-time

```sql
create table purchases (
  id              uuid primary key default gen_random_uuid(),
  email           text not null,
  user_id         uuid references auth.users(id),
  kiwify_order_id text,
  product         text not null,  -- 'dogflow_7dias'
  status          text not null default 'active',  -- active | refunded | cancelled
  purchased_at    timestamptz default now()
);
```

### `subscriptions` — controle de assinaturas recorrentes

```sql
create table subscriptions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) not null,
  plan            text not null,  -- 'basico' | 'premium' | 'pro'
  price_monthly   numeric not null,
  status          text not null default 'active',  -- active | cancelled | past_due
  start_date      date not null,
  end_date        date,
  kiwify_sub_id   text
);
```

### `pets` — perfil do cão

```sql
create table pets (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) not null,
  name         text not null,
  breed        text,
  age_months   int,
  main_problem text,  -- xixi | guia | latido | pulo | filhote | ansioso
  created_at   timestamptz default now()
);
```

### `training_modules` — módulos de treino

```sql
create table training_modules (
  id           uuid primary key default gen_random_uuid(),
  product      text not null,   -- 'dogflow_7dias' | 'dogflow_mensal'
  category     text,            -- 'iniciante' | 'filhotes' | 'obediencia' | 'social' | 'truques'
  title        text not null,
  description  text,
  order_index  int not null,
  plan_required text default 'basico',  -- 'desafio' | 'basico' | 'premium' | 'pro'
  unlock_hours int default 0    -- para desafio 7 dias: horas após compra
);
```

### `training_steps` — steps de cada módulo

```sql
create table training_steps (
  id             uuid primary key default gen_random_uuid(),
  module_id      uuid references training_modules(id) not null,
  order_index    int not null,
  title          text not null,
  objective      text not null,
  explanation    text not null,
  training       text not null,
  common_error   text not null,
  practical_task text not null,
  checklist      jsonb not null default '[]'
);
```

### `training_progress` — progresso por usuário por módulo por pet

```sql
create table training_progress (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) not null,
  pet_id          uuid references pets(id) not null,
  module_id       uuid references training_modules(id) not null,
  completed_steps int default 0,
  status          text default 'in_progress',  -- in_progress | completed
  last_activity   timestamptz default now()
);
```

---

## 5. Controle de Acesso por Camada

| Tipo de acesso | Condição | Módulos disponíveis |
|---|---|---|
| Desafio 7 Dias | `purchases.status = active` | Módulos `plan_required = 'desafio'`, liberados por `unlock_hours` |
| Básico | `subscriptions.plan = basico AND status = active` | Módulos `plan_required IN ('desafio', 'basico')` |
| Premium | `subscriptions.plan = premium AND status = active` | + socialização + truques + 3 pets |
| Pro | `subscriptions.plan = pro AND status = active` | Tudo + pets ilimitados + IA + consultoria |

### Lógica de desbloqueio do Desafio (middleware Next.js)

```typescript
const horasSinceCompra = (Date.now() - purchase.purchased_at) / 3600000
const moduloLiberado = modulo.unlock_hours <= horasSinceCompra
```

---

## 6. Liberação Progressiva — Desafio 7 Dias

| Conteúdo | Liberado | unlock_hours |
|---|---|---|
| Boas-vindas + Cadastro pet + Módulo 0 | Imediato | 0 |
| Dia 1 — Atenção e nome | Imediato | 0 |
| Dia 2 — Sentar | 24h | 24 |
| Dia 3 — Ficar | 48h | 48 |
| Dia 4 — Vir quando chamado | 72h | 72 |
| Dia 5 — Passeio sem puxar | 96h | 96 |
| Dia 6 — Não pular nas pessoas | 120h | 120 |
| Dia 7 — Rotina consolidada | 144h | 144 |
| **Bônus PDFs + Oferta assinatura** | **Dia 8 (168h)** | **168** |

---

## 7. Planos de Assinatura (pós-Desafio)

| Plano | Preço | Pets | Destaques |
|---|---|---|---|
| Básico | R$29,90/mês | 1 pet | Módulos de obediência + progresso |
| Premium | R$59,90/mês | 3 pets | Todos os módulos + socialização + truques + suporte |
| Pro | R$99,90/mês | ilimitado | IA + consultoria mensal + módulos avançados |

Oferta apresentada no **Dia 8** após conclusão do desafio.

---

## 8. Fluxo Completo

```
1. Compra Kiwify R$27
   → Webhook → n8n → INSERT purchases
   → Supabase Auth: invite user (magic link)
   → WhatsApp + E-mail: "Seu acesso está pronto"

2. Usuário cria senha → entra no app
   → Cadastra o pet
   → Começa Dia 1 (imediato)
   → Dias 2-7 liberados a cada 24h

3. Dia 8 — bônus + oferta
   → n8n dispara: WhatsApp + E-mail com oferta Básico R$29,90
   → Tela /planos ativada com CTA de upgrade

4. Usuário assina plano
   → Kiwify assinatura → webhook → n8n → INSERT subscriptions
   → Acesso expandido imediato (mais módulos, mais pets)

5. Chargeback/Reembolso
   → n8n atualiza purchases.status = 'refunded'
   → Acesso bloqueado automaticamente
```

---

## 9. PWA — Configuração

- `manifest.json`: nome DogFlow, ícone, `display: standalone`
- Service Worker: cache offline das telas de treino
- Instalável no celular (Android + iOS)
- Mobile-first

---

## 10. Hospedagem

- Subdomínio: `app.planopratico.shop`
- Docker na VPS, proxy via NPM, SSL Let's Encrypt
- `.env`: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY

---

## 11. Evolução Futura (V2)

| Feature | Quando |
|---|---|
| Plano 30 dias (upsell R$97) como módulo mensal | V2 |
| Trilha personalizada por problema do pet | V2 |
| IA para sugestão de treino | Pro / V2 |
| Lembretes automáticos via WhatsApp | V2 |
| Histórico com gráficos | V2 |
| Múltiplos produtos no mesmo app (Plano Recomeço, etc.) | V3 |
