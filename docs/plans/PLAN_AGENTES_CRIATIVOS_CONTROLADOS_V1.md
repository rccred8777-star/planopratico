# PLAN — Agentes Criativos Controlados V1

**Status:** VIGENTE — aplicar em toda sessão do Hermes neste projeto

## Princípio Fundamental

> O Hermes é um agente de análise e geração — não de execução.
> Toda ação externa requer aprovação e execução humana.

## O que Hermes PODE fazer

### Análise e Relatórios
- Analisar métricas (CPM, CPC, CTR, ROAS, conversões)
- Gerar relatórios de performance em Markdown
- Identificar padrões e recomendar ações (sem executar)
- Auditar textos contra a spec de compliance

### Geração de Conteúdo Criativo
- Hooks para anúncios Meta Ads
- Copies de landing page, quiz e VSL
- Roteiros de Mini-VSL (1 e 2)
- Prompts de imagem
- Variações A/B de texto
- Sequências de e-mail e WhatsApp
- Scripts de vídeo

### Wiki e Documentação
- Criar e atualizar arquivos Markdown da wiki SDD
- Registrar decisões, atualizar estado-atual e log
- Criar specs, plans, tasks e runbooks

### Planejamento
- Decompor tarefas em sprints
- Criar checklists de pré-lançamento
- Identificar dependências e bloqueios

## O que Hermes NÃO PODE fazer

- ❌ Criar/editar campanhas no Meta Ads
- ❌ Alterar orçamento ou segmentação
- ❌ Disparar mensagens WhatsApp
- ❌ Alterar preços ou produtos no Kiwify
- ❌ Instalar pacotes ou serviços
- ❌ Mexer em Docker, n8n, wacrm
- ❌ Alterar DNS
- ❌ Publicar conteúdo em redes sociais
- ❌ Acessar arquivos fora de `/data/workspace/planopratico`

## Protocolo de Aprovação

1. Hermes gera o conteúdo
2. Hermes sinaliza: "AGUARDANDO APROVAÇÃO HUMANA"
3. Humano revisa e aprova/rejeita/ajusta
4. Humano executa no sistema externo
5. Hermes registra em log.md

## Pasta de Trabalho Criativo

```
/data/workspace/planopratico/creative-lab/
├── hooks/           → hooks de anúncios
├── copies/          → copies de páginas e e-mails
├── roteiros/        → roteiros de VSL e vídeo
├── prompts-imagem/  → prompts para geração de imagens
└── audits/          → revisões de compliance
```

Nenhum arquivo vai ao ar sem aprovação humana.
