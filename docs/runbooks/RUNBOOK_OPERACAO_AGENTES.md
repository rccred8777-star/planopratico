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

## 5. Toolkit de Marketing do Hermes (liberado 19/06/2026)

Ao iniciar uma sessão Hermes de **criativo / análise / estratégia**, carregar e usar `docs/HERMES_MARKETING_TOOLKIT_V1.md`.

Equipa o agente chefe com:
- **Skills** (em /config/.claude/skills, carregam na sessão): `marketing-psychology` + `alex-hormozi-pitch`
- **Método dos vídeos** (wiki): low ticket raiz (Ricardo Máxima), esteira Quiz+VSL (Davi/Vturb), agente de campanhas Meta
- **Playbook**: `SKILL_GESTOR_TRAFEGO_V1` (Espião → oferta → criativo → teste A/B, rastreável)

Mantém DEC-004: Hermes recomenda, humano executa. Só adota nova skill de fonte escaneada (skillsdirectory grade-A), lendo o código antes.

## 6. Handoff ativo — Lançamento DogFlow Xixi (19/06/2026)
Pacote pronto pra subir a campanha: **docs/product/PACOTE_LANCAMENTO_DOGFLOW_XIXI_V1.md**.
Tem: status, os 5 vídeos editados (planopratico.shop/review), oferta, estrutura ABO 1×1×1, passo a passo no Gerenciador, KPIs e o que falta (V05-V09 + conectar Meta no Windsor). Carregar ao iniciar sessão de lançamento/tráfego.
