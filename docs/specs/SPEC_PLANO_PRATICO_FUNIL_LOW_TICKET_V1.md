# SPEC — Funil Low Ticket Plano Prático V1

## Produto Principal

**Nome:** Plano Recomeço 21D por Perfil
**Formato:** PDF/guia personalizado + sequência 21 dias

| Produto | Valor | Tipo |
|---|---|---|
| Plano Recomeço 21D | R$ 27,00 | Front-end |
| [bump a definir] | R$ 19,00 | Order bump |
| [upsell a definir] | R$ 97,00 | Upsell |
| [downsell a definir] | R$ 47,00 | Downsell |
| Backend nível 1 (futuro) | R$ 197,00 | Pós-venda |
| Backend nível 2 (futuro) | R$ 497,00 | Mentoria |

## Perfis

| Perfil | Descrição |
|---|---|
| Sobrecarregado | Acumula tarefas, sensação de nunca terminar |
| Desconectado | Rotina no automático, sem energia ou propósito |
| Hipercrítico | Autocobrado, paralisa por medo de errar |
| Esgotado Crônico | Esgotamento persistente, difícil recuperar |

## Funil

```
Meta Ads → Mini-VSL 1 → Quiz → Resultado por perfil
→ Mini-VSL 2 → Kiwify R$27 → Bump R$19
→ Upsell R$97 → Downsell R$47
→ Pós-venda: WhatsApp (wacrm) + E-mail (n8n)
```

## Rastreamento

- Pixel Meta em todas as páginas
- UTMify para atribuição
- Eventos: PageView, Lead, InitiateCheckout, Purchase, Upsell
- UTMs obrigatórios: utm_source, utm_medium, utm_campaign, utm_content

## Compliance

Ver SPEC_COMPLIANCE_META_BEM_ESTAR_V1.md
Resumo: sem promessa médica, sem "curar burnout", disclaimer obrigatório.
