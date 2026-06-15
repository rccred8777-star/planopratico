# AUDIT — Sprint 6: WaCRM

**Data de execução:** 2026-06-14  
**VPS:** srv1756424 | Ubuntu 24.04.4 LTS | IP: 76.13.170.19  
**Executor:** Claude Code (agente controlado)  
**Status geral:** SUCESSO

---

## 1. DNS

| Host | Tipo | Valor | Status |
|------|------|-------|--------|
| `crm.planopratico.shop` | A | `76.13.170.19` | Propagado |

---

## 2. Supabase

| Item | Valor |
|------|-------|
| Projeto | oardxsdiwaxmpomxhfls |
| URL | https://oardxsdiwaxmpomxhfls.supabase.co |
| Migrações aplicadas | 22/22 |
| Região | South America (São Paulo) |

---

## 3. Build Docker

| Item | Detalhe |
|------|---------|
| Imagem base | node:20-alpine |
| Build | Next.js 16.2.6 — compilado com sucesso |
| Páginas geradas | 34 páginas estáticas + rotas dinâmicas |
| Dockerfile | /opt/planopratico/stacks/wacrm/Dockerfile |
| docker-compose | /opt/planopratico/stacks/wacrm/docker-compose.yml |

---

## 4. Container

| Nome | Status | Porta interna |
|------|--------|---------------|
| wacrm | Up | 3000 |

---

## 5. Certificado SSL

| Domínio | ID Cert | Expira em |
|---------|---------|-----------|
| `crm.planopratico.shop` | 4 | 2026-09-12 |

---

## 6. Proxy Host NPM

| ID | Domínio | Forward | SSL | HTTPS Forçado |
|----|---------|---------|-----|---------------|
| 4 | `crm.planopratico.shop` | wacrm:3000 | Cert #4 | Sim |

---

## 7. Validação

| URL | HTTP Code | Resultado |
|-----|-----------|-----------|
| https://crm.planopratico.shop | 307 | OK (redirect para /login) |

---

## 8. Variáveis configuradas

| Variável | Status |
|----------|--------|
| NEXT_PUBLIC_SUPABASE_URL | Configurado |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Configurado |
| SUPABASE_SERVICE_ROLE_KEY | Configurado |
| ENCRYPTION_KEY | Gerado (AES-256-GCM) |
| META_APP_SECRET | Placeholder — atualizar após setup Meta |
| NEXT_PUBLIC_SITE_URL | https://crm.planopratico.shop |
| AUTOMATION_CRON_SECRET | Gerado |

---

## 9. Pendências para ativar WhatsApp

1. Criar conta Meta for Developers (developers.facebook.com)
2. Criar App do tipo "Business"
3. Ativar produto "WhatsApp"
4. Obter META_APP_SECRET e META_APP_ID
5. Configurar número de telefone WhatsApp Business
6. Atualizar .env em /opt/planopratico/stacks/wacrm/.env
7. Rebuild: `docker compose up -d --build`
8. Configurar webhook URL na Meta: https://crm.planopratico.shop/api/whatsapp/webhook

---

## 10. Estado final de todos os containers

| Serviço | URL | Status |
|---------|-----|--------|
| Portainer | https://portainer.planopratico.shop | UP |
| NPM Admin | https://proxy.planopratico.shop | UP |
| n8n | https://n8n.planopratico.shop | UP |
| WaCRM | https://crm.planopratico.shop | UP |

---

*Relatório gerado automaticamente pelo agente Claude Code em 2026-06-14.*
