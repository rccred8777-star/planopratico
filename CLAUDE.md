> 📨 AGENTE CHEFE: há mensagem pendente pra você em docs/MENSAGEM_PARA_O_AGENTE_CHEFE.md (campanha DogFlow Xixi).

## ⛔ REGRAS INVIOLÁVEIS (acima de tudo, sempre)

🥇 **REGRA DE OURO — A VERDADE É A FONTE DA VERDADE.** Nunca declarar, informar ou afirmar nada sem **base verdadeira**. Verifique no real (código servido, banco, logs, o arquivo/HTML de fato) ANTES de afirmar. Se não verificou, diga **"não verifiquei"** — nunca afirme como fato. Quando o resultado de um grep/filtro surpreender, desconfie do método antes de concluir (ex.: filtrar imagem por `.jpg` perde URLs com query string). Não deduzir o que dá pra checar.

1. **NUNCA saia do plano.** Existe um plano acordado — siga-o. Não improvise, não tome direção própria, não comece a executar sem método. Se algo não está no plano, **pergunte antes**. Frase ou ideia solta do dono pode ser **exemplo**, não diretriz final — confirme antes de tratar como decisão.
2. **Leia a WIKI ANTES de qualquer tarefa:** `docs/wiki/log.md` (estado atual), `decisoes.md`, `metricas.md`, `links-operacao.md`. Não aja sem ler o estado.
3. **Finalize CADA tarefa atualizando a wiki** (`docs/wiki/log.md` — o que foi feito + estado novo). Tarefa que não foi registrada na wiki **não está concluída**.
4. **NUNCA mentir, enganar, ludibriar, nem declarar sem fatos.** Só afirme o que **verificou**. Não testou → diga que não testou. Falhou → mostre o erro real. Proibido dizer "está pronto/funcionando" sem prova. Sem hedge, sem inventar, sem maquiar resultado.
5. **Ordem de criativo: pesquisa (VoC) → COPY → design.** Nunca pular pro criativo antes da copy fundamentada na pesquisa. Pensar como designer: intencional e sequencial, nunca no chute.

---

# PlanoPratico — Contexto para Claude

## O que é este projeto

Negócio digital de info-produtos. Dois produtos ativos:

1. **DogFlow** — Desafio 7 Dias Cão Mais Educado (adestramento positivo)
2. **Plano Recomeço 21D** — plano de rotina por perfil comportamental (bem-estar humano)

Funil: Meta Ads → Landing → Kiwify → PWA/entrega → pós-venda WhatsApp + e-mail via n8n.

---

## Ambientes

| Ambiente | Host | Usuário | Workspace |
|---|---|---|---|
| code-server (container ativo) | `code-server` container na VPS | `root` | `/opt/planopratico/` |
| VPS host (produção) | `srv1756424` / `76.13.170.19` | `root` | `/opt/planopratico/` |

**Se você está rodando dentro do code-server:** seu workspace é `/opt/planopratico/` — os arquivos são os reais de produção. Você **pode** editar código, configs, landing, docs. Você **não pode** rodar `docker` diretamente (sem acesso ao socket do host).

**Se você está rodando no host da VPS:** tem acesso total incluindo Docker.

---

## Serviços UP na VPS

| Serviço | URL | Stack |
|---|---|---|
| WaCRM | https://crm.planopratico.shop | `/opt/planopratico/stacks/wacrm/` |
| n8n | https://n8n.planopratico.shop | `/opt/planopratico/stacks/n8n/` |
| Portainer | https://portainer.planopratico.shop | `/opt/planopratico/stacks/portainer/` |
| NPM Admin | https://proxy.planopratico.shop | `/opt/planopratico/stacks/nginxproxymanager/` |
| DogFlow PWA | app.planopratico.shop | `/opt/planopratico/stacks/dogflow/` *(pendente)* |

Rede Docker: `planopratico_net`
SSL: Let's Encrypt via NPM (expira 2026-09-12)

---

## Estrutura de diretórios

```
/opt/planopratico/
├── CLAUDE.md           ← este arquivo
├── docs/
│   ├── wiki/           ← log.md, decisoes.md, links-operacao.md, metricas.md
│   ├── specs/          ← specs de produto, infra, compliance
│   ├── plans/          ← planos de implantação por fase
│   ├── runbooks/       ← operação e segurança
│   ├── audits/         ← relatórios por sprint
│   └── product/        ← criativos, landing, VSL, persona
├── stacks/             ← docker-compose por serviço
├── scripts/            ← backup-volumes.sh
├── creative-lab/       ← assets criativos
├── landing/            ← páginas de funil
├── logs/
└── volumes/            ← dados persistentes dos containers
```

---

## Produto principal em construção: DogFlow

**Stack:** Next.js (PWA) + Supabase + Docker + n8n + WaCRM + Kiwify

**Spec completa:** `docs/specs/SPEC_DOGFLOW_PWA_V1.md`
**Plano de implantação:** `docs/plans/PLAN_DOGFLOW_IMPLANTACAO_V1.md`

### Fases e status

| Fase | Descrição | Status |
|---|---|---|
| 1 | Conteúdo dos 7 dias + PDFs bônus | ⏳ PRÓXIMA |
| 2 | Kiwify — conta + produtos + webhook | ⏳ |
| 3 | PWA Next.js + Supabase + deploy | ⏳ |
| 3B | Landing page + Mini-VSL | ⏳ |
| 4 | Pixel Meta + UTMify + eventos | ⏳ |
| 5 | Workflows n8n pós-venda | ⏳ |
| 6 | Meta Ads — conta + número + campanhas | ⏳ |

**Próxima ação desbloqueante:** Fase 1 — escrever conteúdo dos 7 dias.

### Escada de valor DogFlow

| Produto | Valor | Tipo |
|---|---|---|
| Desafio 7 Dias | R$27 | Front-end |
| Guia Xixi (aprofundado) | R$19 | Order bump |
| Plano 30 Dias | R$97 | Upsell |
| Pack de Treinos | R$47 | Downsell |
| Básico | R$29,90/mês | Assinatura |
| Premium | R$59,90/mês | Assinatura |
| Pro | R$99,90/mês | Assinatura |

---

## Decisões que nunca mudam

- **DEC-003:** WhatsApp Cloud API oficial apenas. Proibido QR code, Baileys, não-oficial.
- **DEC-004:** Hermes não executa infra, não publica, não acessa Meta/WhatsApp/checkout.
- **DEC-007:** Kiwify como checkout (bump, upsell, downsell nativos).
- **DEC-008:** UTMify para rastreamento de UTMs de Meta Ads.
- **DEC-012:** Aprovações always-allow nunca. Apenas Allow once / Allow session.

Decisões completas: `docs/wiki/decisoes.md`

---

## Compliance obrigatório

Todo conteúdo passa pela `docs/specs/SPEC_COMPLIANCE_META_BEM_ESTAR_V1.md`.

Regra resumida: sem promessa clínica, sem "curar", sem "garantido". Disclaimer obrigatório em todas as páginas.

Revisão: Hermes revisa → humano aprova → nenhuma peça vai ao ar sem aprovação documentada.

---

## Integração WaCRM → n8n (ativa)

- Trigger: `new_message_received`
- Workflow: `WaCRM - Receber Eventos` (ID: `FPBRVHXTg2b23LjE`)
- URL: `https://n8n.planopratico.shop/webhook/wacrm-eventos`
- Payload: `{ message_text, conversation_id }`
- **Pendente:** autenticação via header secret

---

## Como trabalhar neste projeto

1. Leia sempre `docs/wiki/log.md` para saber o estado mais recente.
2. Qualquer decisão nova vai em `docs/wiki/decisoes.md` com número sequencial.
3. Specs de produto ficam em `docs/specs/`, nunca em comentários de código.
4. Nenhuma ação irreversível (push, publicação, Meta Ads) sem confirmação humana explícita.
5. Atualizar `docs/wiki/log.md` ao final de cada sprint com o que foi feito.

## Protocolo obrigatório de início de sessão

**Toda sessão começa assim:**
> "Claude, o que foi feito desde a última vez: [lista o que fez]"

Sem esse sync, a wiki fica desatualizada — o humano age em plataformas externas (Kiwify, Supabase, Meta, VPS) e o agente não sabe. Responsabilidade do humano reportar; responsabilidade do agente atualizar log.md + memória imediatamente ao receber o relato.

Se o humano não trouxer sync, o agente pergunta: **"O que foi feito desde a última sessão?"** antes de qualquer outra ação.
