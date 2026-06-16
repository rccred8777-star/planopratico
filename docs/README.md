# PlanoPratico — Documentação

Repositório de documentação técnica e de produto do projeto PlanoPratico.

## Estrutura

```
docs/
├── README.md         ← este arquivo
├── audits/           ← relatórios de execução por sprint
├── specs/            ← especificações de produto e funcionalidades
├── product/          ← oferta, persona, proposta de valor
└── wiki/             ← log geral, decisões, estado atual
```

## Infraestrutura atual

| Serviço    | URL                                    | Status |
|------------|----------------------------------------|--------|
| WaCRM      | https://crm.planopratico.shop          | UP     |
| n8n        | https://n8n.planopratico.shop          | UP     |
| Portainer  | https://portainer.planopratico.shop    | UP     |
| NPM Admin  | https://proxy.planopratico.shop        | UP     |

## Sprints concluídas

| Sprint | Descrição |
|--------|-----------|
| 3 | Base Docker + Portainer + Nginx Proxy Manager |
| 4 | DNS + SSL + Proxy Hosts |
| 5 | n8n UP com HTTPS |
| 6 | WaCRM + WhatsApp UP com HTTPS |
| 7 | Integração WaCRM → n8n validada com mensagem real |
