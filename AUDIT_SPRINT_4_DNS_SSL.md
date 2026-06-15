# AUDIT — Sprint 4: DNS + SSL + Proxy Hosts

**Data de execução:** 2026-06-14  
**VPS:** srv1756424 | Ubuntu 24.04.4 LTS | IP: 76.13.170.19  
**Executor:** Claude Code (agente controlado)  
**Status geral:** SUCESSO

---

## 1. DNS — Registros Configurados

| Host | Tipo | Valor | Status |
|------|------|-------|--------|
| `planopratico.shop` | A | `76.13.170.19` | Propagado |
| `portainer.planopratico.shop` | A | `76.13.170.19` | Propagado |
| `proxy.planopratico.shop` | A | `76.13.170.19` | Propagado |

Provedor DNS: Hostinger (hPanel)

---

## 2. Certificados SSL — Let's Encrypt

| Domínio | ID Cert | Emitido em | Expira em |
|---------|---------|------------|-----------|
| `portainer.planopratico.shop` | 1 | 2026-06-14 | 2026-09-12 |
| `proxy.planopratico.shop` | 2 | 2026-06-14 | 2026-09-12 |

---

## 3. Proxy Hosts — Nginx Proxy Manager

| ID | Domínio | Forward | SSL | HTTPS Forçado |
|----|---------|---------|-----|---------------|
| 1 | `portainer.planopratico.shop` | portainer:9000 | Cert #1 | Sim |
| 2 | `proxy.planopratico.shop` | nginx-proxy-manager:81 | Cert #2 | Sim |

---

## 4. Validação de Saúde

| URL | HTTP Code | Resultado |
|-----|-----------|-----------|
| https://portainer.planopratico.shop | 307 | OK (redirect para login) |
| https://proxy.planopratico.shop | 200 | OK |

---

## 5. Acesso aos Painéis

| Serviço | URL |
|---------|-----|
| Portainer | https://portainer.planopratico.shop |
| NPM Admin | https://proxy.planopratico.shop |

---

## 6. Próximos Passos (Sprint 5+)

- Instalar n8n com domínio `n8n.planopratico.shop`
- Configurar proxy host n8n no NPM
- Instalar wacrm (sprint futura)

---

*Relatório gerado automaticamente pelo agente Claude Code em 2026-06-14.*
