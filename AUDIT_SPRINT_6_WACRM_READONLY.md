# AUDIT — Sprint 6: WaCRM (Read-Only / Pré-Instalação)

**Data:** 2026-06-14  
**VPS:** srv1756424 | /opt/planopratico/stacks/wacrm/source  
**Executor:** Claude Code (agente controlado)  
**Modo:** Read-only — nenhum container subido, nenhum build executado

---

## 1. Repositório

| Item | Valor |
|------|-------|
| Repo | https://github.com/ArnasDon/wacrm |
| Versão | 0.2.2 |
| Licença | MIT |
| Autor | Arnas Donauskas |
| Stack | Next.js 16 + React 19 + TypeScript + Tailwind v4 |
| Banco | Supabase (Postgres + Auth + Storage + RLS) |
| Canal WhatsApp | Meta Cloud API (oficial) |

---

## 2. Dockerfile / Docker Compose

**Resultado: NÃO EXISTE nenhum Dockerfile ou docker-compose.yml no repositório.**

O projeto é uma aplicação Next.js pura. O deploy recomendado pelo autor é via Hostinger Managed Node.js. Para rodar na VPS via Docker, será necessário **criar um Dockerfile customizado**.

---

## 3. Variáveis de Ambiente Obrigatórias (.env.local.example)

| Variável | Descrição | Status |
|----------|-----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase | Não temos |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública Supabase | Não temos |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave privada Supabase (server-side) | Não temos |
| `ENCRYPTION_KEY` | 64 hex chars, AES-256-GCM | Gerável localmente |
| `META_APP_SECRET` | HMAC para webhooks Meta | Não temos |
| `NEXT_PUBLIC_SITE_URL` | URL pública do deploy | `https://crm.planopratico.shop` |

**Variáveis opcionais relevantes:**
- `AUTOMATION_CRON_SECRET` — necessário para automações com Wait steps
- `META_APP_ID` — necessário para upload de mídia em templates

---

## 4. Banco de Dados — Supabase

O WaCRM **não usa Postgres local**. Toda a persistência é via Supabase (SaaS ou self-hosted).

Migrações encontradas em `/supabase/migrations/`:

| Arquivo | Conteúdo |
|---------|----------|
| 001_initial_schema.sql | Schema principal |
| 002 a 020 | Pipelines, broadcasts, automações, flows, account sharing, templates Meta |

Total: **20 migrações SQL** que precisam ser aplicadas no projeto Supabase antes do primeiro boot.

---

## 5. Dependências Principais

| Pacote | Versão | Função |
|--------|--------|--------|
| next | 16.2.6 | Framework |
| react | 19.2.4 | UI |
| @supabase/supabase-js | ^2.107.0 | Cliente Supabase |
| @supabase/ssr | ^0.10.3 | Auth SSR |
| @xyflow/react | ^12.11.0 | Visual builder de automações |
| Node.js requerido | >=20.0.0 | Runtime |

---

## 6. O que é necessário para instalar na VPS via Docker

Para rodar na VPS dentro da arquitetura planopratico_net, as etapas são:

### Pré-requisitos externos (fora da VPS)
1. **Conta Supabase** — criar projeto gratuito em supabase.com
2. **Aplicar as 20 migrações SQL** no Supabase (via CLI ou dashboard)
3. **Conta Meta for Developers** — criar App, obter App Secret
4. **WhatsApp Business Account** — verificada na Meta

### Na VPS (próxima sprint)
5. Criar `Dockerfile` customizado (Node 20 + build Next.js)
6. Criar `.env.local` com todas as variáveis
7. Criar `docker-compose.yml` na stack
8. Adicionar DNS `crm.planopratico.shop` → `76.13.170.19`
9. Criar proxy host no NPM + SSL
10. Subir container

---

## 7. Diagnóstico

| Item | Status |
|------|--------|
| Código clonado | OK |
| Dockerfile existente | NÃO — precisa criar |
| docker-compose existente | NÃO — precisa criar |
| Banco local (Postgres VPS) | NÃO — usa Supabase externo |
| Licença open-source | MIT — sem restrição |
| Credenciais necessárias | Supabase + Meta (não temos ainda) |
| Containers existentes afetados | Nenhum |
| Firewall alterado | Não |

---

## 8. Decisão necessária antes de continuar

**Para prosseguir com a Sprint 6 real, o Ricardo precisa:**

1. Criar conta no **Supabase** (supabase.com — free tier disponível)
2. Criar projeto Supabase e obter as 3 chaves
3. Criar conta de desenvolvedor na **Meta** e configurar WhatsApp Business API
4. Obter `META_APP_SECRET` e `META_APP_ID`

Só após ter essas credenciais, a instalação Docker na VPS pode ser concluída.

---

*Relatório de auditoria read-only gerado em 2026-06-14. Nenhum container foi subido. Nenhum build executado. Nenhum arquivo fora de /opt/planopratico foi modificado.*
