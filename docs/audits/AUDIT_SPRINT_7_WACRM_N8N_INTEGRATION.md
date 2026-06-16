# AUDIT — Sprint 7: Integração WaCRM → n8n

**Data de execução:** 2026-06-14  
**VPS:** srv1756424 | Ubuntu 24.04.4 LTS | IP: 76.13.170.19  
**Executor:** Claude Code (agente controlado)  
**Status geral:** SUCESSO — validado com mensagem real no WhatsApp

---

## 1. Objetivo

Integrar o WaCRM com o n8n para que toda mensagem recebida no WhatsApp dispare
um evento no n8n, permitindo automações externas sem alterar o código do WaCRM.

---

## 2. Arquitetura da integração

```
WhatsApp (Meta Cloud API)
        │
        ▼ POST /api/whatsapp/webhook
    WaCRM (Next.js)
        │  trigger: new_message_received
        ▼
  Engine de Automações (interno WaCRM)
        │  step: send_webhook → POST
        ▼
    n8n Webhook
  https://n8n.planopratico.shop/webhook/wacrm-eventos
        │
        ▼
  [Workflows n8n — a definir]
```

**Método escolhido:** `send_webhook` nativo do WaCRM (zero alteração de código).

---

## 3. Recursos criados

### 3.1 n8n — Workflow

| Campo | Valor |
|-------|-------|
| Nome | WaCRM - Receber Eventos |
| ID | `FPBRVHXTg2b23LjE` |
| Status | Ativo |
| URL do webhook | `https://n8n.planopratico.shop/webhook/wacrm-eventos` |
| Método | POST |
| Path | `wacrm-eventos` |
| Nó trigger | `Receber do WaCRM` (n8n-nodes-base.webhook v2) |

### 3.2 WaCRM — Automação no Supabase

| Campo | Valor |
|-------|-------|
| ID | `ff93fb3d-ed18-4d80-a329-341c7374cfad` |
| Nome | Enviar para n8n - Nova Mensagem |
| Trigger | `new_message_received` |
| Status | Ativa (`is_active = true`) |
| Account | `761426c4-5c45-4f97-ba5c-b648ca186b6c` (jose ricardo) |

### 3.3 WaCRM — Step da automação

| Campo | Valor |
|-------|-------|
| ID | `d198bbde-e532-4d7d-ba98-144c21a2cb61` |
| Tipo | `send_webhook` |
| URL destino | `https://n8n.planopratico.shop/webhook/wacrm-eventos` |
| Headers | `X-Source: wacrm` |
| Body template | nenhum (engine envia contexto raw como JSON) |

---

## 4. Payload recebido no n8n

A cada mensagem real recebida no WhatsApp, o n8n recebe via POST:

```json
{
  "message_text": "texto da mensagem",
  "conversation_id": "uuid-da-conversa"
}
```

O `conversation_id` permite consultar o Supabase para enriquecer com
dados do contato (nome, telefone, tags) quando necessário.

---

## 5. Trigger types disponíveis no WaCRM

Para criar futuras automações, os triggers válidos são:

| Trigger | Quando dispara |
|---------|----------------|
| `new_message_received` | Toda mensagem inbound recebida |
| `first_inbound_message` | Primeira mensagem de um contato |
| `keyword_match` | Mensagem contém palavra-chave configurada |
| `new_contact_created` | Novo contato criado automaticamente |
| `conversation_assigned` | Conversa atribuída a um agente |
| `tag_added` | Tag adicionada ao contato |
| `time_based` | Agendamento por cron |

---

## 6. Variáveis de interpolação no body_template

Se um `body_template` customizado for usado no step `send_webhook`:

| Variável | Resolve para |
|----------|-------------|
| `{{ message.text }}` | Texto da mensagem recebida |
| `{{ vars.NOME }}` | Variável customizada no contexto |

Variáveis inválidas (ex: `{{ context.contact.id }}`) são substituídas por string vazia.

---

## 7. Validação com mensagem real

| Teste | Resultado |
|-------|-----------|
| Mensagem chegou no WaCRM | ✅ registrada no Supabase |
| Automação disparou | ✅ `execution_count=2` após 2 mensagens |
| n8n recebeu execução | ✅ execução `[4]` status=`success` |
| `message_text` presente | ✅ texto real da mensagem |
| `conversation_id` presente | ✅ UUID correto |
| Latência WaCRM → n8n | < 1 segundo |

---

## 8. Bugs encontrados e corrigidos durante a sprint

| Bug | Causa | Correção |
|-----|-------|----------|
| Automação nunca disparava | `trigger_type: "inbound_message"` (inexistente) | Corrigido para `"new_message_received"` |
| Body chegava vazio `{}` no n8n | Header `Content-Type` duplicado (lowercase + PascalCase) | Removido `Content-Type` do `cfg.headers` — engine já define |
| Variáveis do template inválidas | `{{ context.contact.id }}` não existe no engine | Removido body_template; engine envia contexto raw |

---

## 9. Estado dos containers em produção

| Serviço | URL | Status |
|---------|-----|--------|
| Portainer | https://portainer.planopratico.shop | UP |
| NPM (proxy) | https://proxy.planopratico.shop | UP |
| n8n | https://n8n.planopratico.shop | UP |
| WaCRM | https://crm.planopratico.shop | UP |

---

## 10. Próximos passos (não executados)

1. Definir lógica de automação no n8n (filtros, respostas, integrações)
2. Enriquecer payload com dados do contato via consulta ao Supabase no n8n
3. Considerar trigger `keyword_match` para palavras-chave específicas
4. Configurar tratamento de erro no n8n (retries, alertas)
5. Adicionar autenticação no webhook do n8n (header secret)

---

## 11. Marco

```
Sprint 7 — WaCRM → n8n: validada com mensagem real
Data: 2026-06-14
```

---

*Relatório gerado automaticamente pelo agente Claude Code em 2026-06-14.*
