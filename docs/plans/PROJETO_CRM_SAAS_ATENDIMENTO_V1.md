# Projeto CRM — Atendimento Automático como Serviço (SaaS/Agência)

> Status: **PROJETO / pesquisa** — nada construído ainda. Documento de planejamento.
> Criado: 23/06/2026.

## Objetivo
Vender para **outras empresas** o serviço de **atendimento automático no WhatsApp** (atendente IA 24/7), reaproveitando a stack que já roda internamente: **WaCRM + n8n + WhatsApp Cloud API oficial + Supabase + IA**. Encaixa na esteira de agência.

## Achados da investigação (base técnica) — 23/06
- **WaCRM = template Next.js + Supabase**, licença **MIT** (`wacrm` de Arnas Donauskas). Pode **usar, modificar, revender e vender como SaaS livremente** — basta manter o aviso de copyright no código. **Sem trava de licença.**
- **Multi-tenant já é NATIVO e bem-feito:** tabela `accounts` + `account_invitations` (cada empresa = 1 conta com equipe), **120 políticas RLS** isolando tudo por `is_account_member(account_id)` → isolamento real no banco (cliente A nunca vê dado do cliente B).
- Construído para **WhatsApp Business API oficial** (alinhado à DEC-003).
- **NÃO tem billing** no schema (sem Stripe/assinatura/quota; só 2 menções a "plan").

## Placar do que falta
| # | Item | Status |
|---|---|---|
| 1 | **Atendente IA por cliente** (n8n rotear por `account`) | ❌ construir — é o produto |
| 2 | **Billing** (Kiwify/Stripe + limites por conta) | ❌ construir — pode ser manual no piloto |
| 3 | Contrato/DPA + precificação (LGPD) | ✅ já temos |

## Porteira operacional que permanece
- **Número de WhatsApp por cliente:** cada empresa precisa do **próprio número + WABA** (onboarding na Meta). Não reutilizar o número da Split Center. Caminho escalável = virar **Tech Provider da Meta** (embedded signup) pra onboardar WABAs dos clientes. Manter Cloud API oficial (não usar QR/não-oficial — derruba a conta do cliente).

## Arquitetura do #1 (atendente IA multi-cliente)
Chave = o **`phone_number_id`** que a Meta envia em toda mensagem recebida identifica **qual número/cliente** recebeu.

1. **Tabela nova** `ai_agent_configs` (por `account_id`, com RLS): `phone_number_id`, `wa_token` (cred do cliente), `system_prompt`, `base_conhecimento`/FAQ, `horario`, `contato_escalonamento`, `modelo`, `ativo`.
2. **n8n generalizado** (hoje hardcoded DogFlow): recebe msg → resolve `account` pelo `phone_number_id` → carrega prompt+KB **daquele cliente** → IA → responde pelo **token/número do próprio cliente** → loga no WaCRM escopado por conta.
3. Resultado: **adicionar cliente = criar 1 linha de config** (sem mexer em código). É o que destrava escala.
4. Migrar o **DogFlow para ser "o primeiro cliente"** dessa estrutura (prova com dado real).

## Recomendação de execução
1. Construir **#1** primeiro (produto).
2. **Billing manual no piloto** (link Kiwify / cobrança na mão) — automatizar #2 só depois de validar que pagam.
3. **Piloto com 1 cliente** done-for-you (montar número, prompt e fluxos na mão) antes de automatizar.

## Próximos passos possíveis (quando sair de "projeto")
- (b) Criar `ai_agent_configs` + RLS + desenho do roteamento n8n por número.
- (c) Kit de piloto do 1º cliente (onboarding WhatsApp + template de prompt).
- (d) Modelo de billing/preço (planos, limites, integração de cobrança).

## Referências técnicas
- WaCRM stack: `/opt/planopratico/stacks/wacrm` (build próprio Next.js; schema em `all_migrations.sql`).
- WaCRM ao vivo: https://crm.planopratico.shop
- n8n atendentes atuais (hardcoded DogFlow): "WhatsApp — Agente Atendente DogFlow", "Email — Agente Atendente DogFlow".
