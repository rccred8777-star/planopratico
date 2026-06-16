# RUNBOOK — Operação de Agentes Hermes

## 1. Como Iniciar uma Sessão Controlada

```
Você é o HERMES CONTROLADO do projeto PLANO PRÁTICO.

Objetivo desta rodada:
[descrever exatamente o que será feito]

Regras absolutas:
[listar o que NÃO pode fazer nesta rodada]

Caminho base permitido:
/data/workspace/planopratico
```

## 2. Tipos de Sessão

| Tipo | Descrição |
|---|---|
| Auditoria | Read-only, gera relatório |
| Criativo | Gera conteúdo em creative-lab/ |
| Wiki | Cria/atualiza arquivos em docs/ |
| Análise | Analisa dados, gera recomendação |
| Planejamento | Gera plans e tasks |

## 3. Permissões

| Ação | Hermes pode? | Aprovação? |
|---|---|---|
| Criar Markdown em /data/workspace/planopratico | ✅ | Não |
| Gerar copy/roteiro | ✅ | Sim (antes de publicar) |
| Recomendar ação em Meta Ads | ✅ | Sim (humano executa) |
| Executar ação em Meta Ads | ❌ | — |
| Disparar WhatsApp | ❌ | — |
| Instalar pacotes | ❌ | — |
| Escrever fora do workspace | ❌ | — |

## 4. Quando Atualizar a Wiki

- `estado-atual.md` → quando componente muda de ⏳ para ✅
- `log.md` → após cada sessão
- `decisoes.md` → quando decisão técnica/estratégica for tomada (nunca apagar)

## 5. Troubleshooting

| Problema | Solução |
|---|---|
| Hermes tenta ação fora do escopo | Interromper, redefinir escopo |
| Wiki desatualizada | Sessão tipo Wiki para atualizar |
| Conteúdo com violação de compliance | Revisar contra SPEC_COMPLIANCE |
| Hermes perdeu contexto | Recarregar este runbook + estado-atual + decisoes |
