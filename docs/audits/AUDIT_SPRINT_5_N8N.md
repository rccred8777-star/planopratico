# AUDIT — Sprint 5: n8n

**Data de execução:** 2026-06-14  
**VPS:** srv1756424 | Ubuntu 24.04.4 LTS | IP: 76.13.170.19  
**Executor:** Claude Code (agente controlado)  
**Status geral:** SUCESSO

---

## 1. DNS

| Host | Tipo | Valor | Status |
|------|------|-------|--------|
| `n8n.planopratico.shop` | A | `76.13.170.19` | Propagado |

---

## 2. Container

| Nome | Imagem | Status | Porta interna |
|------|--------|--------|---------------|
| n8n | n8nio/n8n:latest | Up | 5678 |

Volume: `/opt/planopratico/volumes/n8n_data`  
Permissões: `chown 1000:1000` aplicado

---

## 3. Certificado SSL

| Domínio | ID Cert | Expira em |
|---------|---------|-----------|
| `n8n.planopratico.shop` | 3 | 2026-09-12 |

---

## 4. Proxy Host NPM

| ID | Domínio | Forward | SSL | HTTPS Forçado |
|----|---------|---------|-----|---------------|
| 3 | `n8n.planopratico.shop` | n8n:5678 | Cert #3 | Sim |

WebSocket habilitado: Sim (necessário para n8n)

---

## 5. Validação

| URL | HTTP Code | Resultado |
|-----|-----------|-----------|
| https://n8n.planopratico.shop | 200 | OK |

---

## 6. Acesso

| Serviço | URL |
|---------|-----|
| n8n | https://n8n.planopratico.shop |

Na primeira visita o n8n pedirá criação de conta de owner (email + senha).

---

## 7. Próximos Passos (Sprint 6+)

- Instalar wacrm
- Integrar wacrm com n8n

---

*Relatório gerado automaticamente pelo agente Claude Code em 2026-06-14.*
