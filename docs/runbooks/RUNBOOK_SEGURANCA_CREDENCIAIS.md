# RUNBOOK — Segurança de Credenciais

## Regra Fundamental

> Nenhuma credencial, API key, token ou senha deve aparecer em qualquer arquivo desta wiki.

## O que é Credencial

Nunca expor: API keys (Meta, Kiwify, UTMify, n8n, wacrm, Supabase), tokens OAuth, senhas de banco, senhas de painel, chaves SSH privadas, tokens WhatsApp Cloud API, webhooks com segredo na URL.

## Placeholder Correto

| Tipo | Usar |
|---|---|
| Qualquer key/token/senha configurada | `***configurado***` |
| URL com token | `https://endpoint.com/***` |
| Webhook com segredo | `***webhook configurado no painel***` |

## Onde Ficam as Credenciais Reais

| Tipo | Onde |
|---|---|
| Painéis (Hostinger, Meta, Kiwify) | No próprio painel |
| Variáveis de serviços (n8n, wacrm) | `.env` da instalação, fora da wiki |
| Tokens de API no n8n | Interface do n8n |
| Chaves SSH | `~/.ssh/` no computador do operador |

## Se uma Credencial for Exposta

1. Revogar imediatamente no painel da ferramenta
2. Gerar nova credencial
3. Atualizar todas as integrações
4. Testar funcionamento
5. Registrar incidente em `log.md` (sem a credencial)
6. Verificar uso não autorizado nos logs da plataforma

## Padrão de Senha

- Mínimo 20 caracteres
- Maiúsculas + minúsculas + números + símbolos
- Gerada por gerenciador de senhas
- Única por serviço
