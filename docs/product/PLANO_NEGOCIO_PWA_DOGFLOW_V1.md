# Plano de Negócios — PWA DogFlow (nicho pet)
> Visão estratégica, monetização e funcionalidades do PWA. Fornecido pelo dono em 19/06/2026.
> Coluna "Estado" = o que já está construído vs roadmap (auditado no app dogflow).

---

## 1. Estratégia de Funil (Low Ticket → Assinatura)
- **Fase 1 (Low Ticket):** Desafio de 7 dias resolvendo a dor urgente: *"treinar o cão para fazer xixi e cocô no lugar certo"*. — ✅ em execução (Campanha Xixi, R$27)
- **Fase 2 (Recorrência/Upsell):** transição automática para assinatura mensal após o desafio, liberando ferramentas utilitárias + novos módulos. — 🟡 parcial (planos existem; transição automática a amarrar)

## 2. Funcionalidades do PWA

| Módulo | Descrição | Estado |
|---|---|---|
| **Desafio 7 Dias** | cronograma diário interativo, técnica por dia, progresso + marcar tarefa | ✅ construído (`/treinos`, training_modules, progress) |
| **Perfil do Cão — dados biométricos** | nome, raça, idade, peso, nível de energia | ✅ parcial (tabela `pets` / cadastro do cão) |
| **Perfil do Cão — Álbum de Evolução** | fotos Dia 1 vs Dia 7 | 🔴 roadmap |
| **Perfil do Cão — Mural de Conquistas** | medalhas/badges por missão concluída | 🔴 roadmap |
| **Agenda de Vacinas e Vermífugos** | datas, lembretes de doses, histórico | 🔴 roadmap (área de assinatura) |
| **Calculadora de Alimentação** | porção diária ideal por peso/idade | 🔴 roadmap (assinatura) |
| **Controle de Gastos** | despesas vet, banho/tosa, ração, brinquedos | 🔴 roadmap (assinatura) |

> As 3 ferramentas de utilidade são o **valor da assinatura** (justificam o R$29,90–99,90/mês recorrente). São o principal trabalho de produto pendente.

## 3. Arquitetura de Automação
```
Checkout (Kiwify) → Webhook → n8n → WhatsApp API Oficial (Meta) → régua de engajamento
```
| Etapa | Estado |
|---|---|
| Checkout Kiwify (low ticket + assinaturas) | ✅ ativo (links Básico/Premium/Pro no app) |
| Webhook Kiwify → app/n8n → Supabase | ✅ construído e validado |
| WhatsApp boas-vindas (credenciais de acesso) | ✅ W1 + API oficial Meta integrada |
| Régua diária (lembrete da tarefa do dia) | ✅ W2 (lembretes D+1 a D+6) |
| Atendente IA (responde dúvidas) | ✅ construído (WhatsApp + email) |

## 4. Planos de assinatura (Kiwify, ativos)
| Plano | Preço | Checkout |
|---|---|---|
| Básico | R$29,90/mês | pay.kiwify.com.br/sOitKRK |
| Premium | R$59,90/mês | pay.kiwify.com.br/YvUvutB |
| Pro | R$99,90/mês | pay.kiwify.com.br/lAxkqcH |
| Sales page | — | kiwify.app/tQC45AS |

## 5. Próximo trabalho de produto (pra a assinatura ter valor)
O low ticket + automação estão maduros. O que falta pra a **Fase 2 (recorrência)** sustentar:
1. **Ferramentas de utilidade** (agenda vacinas, calculadora ração, controle de gastos) — o coração da assinatura
2. **Mini-social do pet** (álbum evolução + badges) — retenção/engajamento
3. **Transição automática** desafio → oferta de assinatura (gatilho no Dia 7)
