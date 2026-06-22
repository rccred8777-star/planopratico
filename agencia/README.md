# Agência — Plano Prático

Pasta gerenciada pelo Cowork (Claude). Contém todos os entregáveis de estratégia, copy e campanha por cliente.

## Estrutura

```
agencia/
├── clientes/
│   └── [nome-cliente]/
│       ├── roteiros-criativos.md
│       ├── landingpage-[produto].md
│       ├── [produto]-landing.html
│       ├── briefing-campanha.md
│       └── emails-pos-compra.md
└── skills/
    └── (skills de referência)
```

## Workflow

1. Cowork gera os entregáveis e commita nesta pasta
2. Claude Code na VPS monitora `agencia/` e executa a parte técnica
3. Novos arquivos = nova tarefa para o agente da VPS

## Clientes ativos

- `eliane/` — Mapa do Padrão (low ticket R$67) — campanha iniciando
