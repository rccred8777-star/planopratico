# Wiki — Plano Prático

> Documento vivo. Atualizado pelo Cowork (Claude) a cada novo desenvolvimento.  
> Última atualização: 20/06/2026

---

## 1. O NEGÓCIO

**Plano Prático** é uma agência de marketing digital especializada em infoprodutos e lançamentos no mercado brasileiro. Opera com um time de agentes de IA especializados (skills) coordenados pelo Cowork, com execução técnica via Claude Code na VPS.

**Modelo de operação:**
- Cowork (Claude Desktop) → estratégia, copy, criativos, briefings → Git
- Claude Code (VPS) → execução técnica, deploy, automações → Git
- n8n (VPS) → automações de CRM, webhooks, integrações
- WACRM (VPS) → WhatsApp + CRM

---

## 2. INFRAESTRUTURA VPS

**Repo:** https://github.com/rccred8777-star/planopratico  
**VPS:** planopratico.shop  

**Stacks rodando:**
| Stack | Função |
|---|---|
| n8n | Automações, webhooks, integrações |
| WACRM | WhatsApp CRM |
| Portainer | Gestão de containers Docker |
| Nginx Proxy Manager | Proxy reverso + SSL |

**Workflow Git:**
```
Cowork gera entregável → commit em agencia/clientes/[cliente]/ → VPS faz git pull → Claude Code executa
```

---

## 3. TIME DE SKILLS (Agentes de IA)

Skills instaladas no Cowork. Ativam automaticamente por palavras-chave.

### Liderança
| Skill | Função | Triggers principais |
|---|---|---|
| `estrategista-senior` | Visão de mercado, ROI, oportunidade | estratégia, diagnóstico, onde investir |
| `gerente-agencia` | QA, tarefas, evolução de skills | revisar entrega, QA, melhorar skill |

### Estratégia & Produto
| Skill | Função | Triggers principais |
|---|---|---|
| `estrategista-produto` | Oferta, naming, funil | produto, naming, mecanismo único |
| `copywriter` | Copy, VSL, página de vendas | copy, headline, VSL, carta de vendas |
| `low-ticket-quiz` | Quiz GCO, mini VSL, ABO/CBO | low ticket, quiz, GCO, funil de quiz |
| `criativos` | Roteiros, scripts, hooks | criativo, roteiro, hook, UGC |
| `landing-page` | Páginas de conversão | landing page, página de vendas, checkout |

### Tráfego
| Skill | Função | Triggers principais |
|---|---|---|
| `gestor-trafego` | Meta Ads, infoprodutos | Meta Ads, campanha, CPL, lançamento |
| `google-ads` | Search, YouTube | Google Ads, Search, YouTube Ads |
| `negocio-local` | Google Business, local | negócio local, Google Meu Negócio |

### Retenção
| Skill | Função | Triggers principais |
|---|---|---|
| `email-crm` | Email marketing, automação | email, CRM, GoHighLevel, sequência |
| `social-media` | Conteúdo orgânico, Reels | conteúdo, Reels, calendário editorial |
| `account-manager` | Relacionamento com cliente | onboarding, briefing, cliente |

### Dados
| Skill | Função | Triggers principais |
|---|---|---|
| `analista-dados` | Relatórios, Windsor.ai | relatório, métricas, ROI, ROAS |

**Total: 14 skills**

---

## 4. METODOLOGIAS BASE

### Ricardo Maxxima — Low Ticket Raiz
- **Tangibilização**: produto digital tem que ter "sensação de toque" no criativo
- **No-brain**: compra sem pensar, sem consultar ninguém
- **Ruminação mental**: resolve uma dor que a pessoa pensa todo dia
- **Naming**: gancho + promessa + fechamento
- **ROI 2+ obrigatório**: sem escala antes de ROI 2
- **Lateralidade**: mínimo 3 produtos na esteira
- **Funil Protagon**: low ticket porta → microwave → alto ticket

### GCO — Davi Murer & Paulo Henrique
- **GCO = Geração → Coleta → Otimização**
- Quiz como entrada de funil (4 tipos: sigiloso, diagnóstico, teste, combinado)
- SPIN Selling nas perguntas do quiz
- ABO validação: 2 contas × 5 conjuntos × 2 criativos = R$120/dia
- CBO escala: 1×1×1 com vencedores

### Paulo Maccedo — Copywriting
- AIDA, PVPP, 10 Passos, 12 Passos da Carta de Vendas
- Psicologia das emoções
- Ruminação mental aplicada à copy

---

## 5. CLIENTES ATIVOS

### Eliane — Identidade Restaurada
**Status:** Em produção  
**Nicho:** Padrões ancestrais / constelação familiar  
**Pasta Git:** `agencia/clientes/eliane/`

#### Produto Principal
- **Identidade Restaurada** (programa completo) — lançamento 11/07/2026

#### Low Ticket (porta de entrada)
- **Mapa do Padrão** — R$67
- PDF preenchível + ritual 7 dias + vídeo-aula
- Funil perpétuo → alimenta base para lançamento do IR

#### VoC Real Coletada
- "mente acelerada / ciclos repetitivos"
- "o problema sou eu"
- "o que tenho de errado?"
- "amor é sofrimento"
- "tenho que aguentar este homem"
- "só existo, não vivo"

#### Entregáveis Prontos
| Arquivo | Status |
|---|---|
| `roteiros-mapa-do-padrao.md` | ✅ 10 roteiros completos |
| `landingpage-mapa-do-padrao.md` | ✅ Copy completa |
| `mapa-do-padrao-landing.html` | ✅ Visual responsivo |
| `briefing-campanha-mapa-do-padrao.md` | ✅ ABO 3 dias, R$150/dia |
| `emails-pos-compra-mapa-do-padrao.md` | ✅ 7 emails + tags GoHighLevel |

#### Pendente
- [ ] Eliane grava vídeo base pro HeyGen
- [ ] Validar blocos 3 e 5 do Mapa (conteúdo terapêutico)
- [ ] Inserir depoimentos reais na LP e email 4
- [ ] Design do PDF do Mapa
- [ ] Subir campanha ABO

#### Campanha
- **Fase 1:** ABO validação — 10 criativos, R$150/dia, 3 dias
- **Fase 2:** Gramado com 4 vencedores — escala até 11/07
- **Meta:** ROI ≥ 2 na validação → escalar progressivamente até lançamento

---

## 6. FLUXO DE TRABALHO

### Novo projeto
```
1. Estrategista Sênior → diagnóstico + oportunidade
2. Estrategista de Produto → oferta + naming
3. Copywriter → copy da página e criativos
4. Criativos → 10 roteiros com VoC real
5. Landing Page → HTML responsivo
6. Gestor de Tráfego → briefing campanha ABO
7. Email & CRM → sequência pós-compra
8. Gerente → QA de tudo antes de entregar
9. Push pro Git → Claude Code VPS executa
```

### Entrega ao cliente
```
Cowork gera → Gerente revisa → Push Git → Cliente recebe
```

### Monitoramento
```
Analista de Dados (Windsor.ai) → relatório diário → decisão de escala
```

---

## 7. CONVENÇÕES DO REPO

### Estrutura de pastas
```
planopratico/
├── agencia/
│   ├── clientes/
│   │   └── [nome-cliente]/
│   │       └── [entregaveis].md / .html
│   └── skills/
├── stacks/          (infra VPS)
├── scripts/         (scripts de manutenção)
└── WIKI.md          (este arquivo)
```

### Padrão de commit
```
feat: novo entregável ou feature
fix: correção
update: atualização de arquivo existente
docs: documentação / wiki
infra: mudança de stack ou infraestrutura
```

### Exemplo
```
feat: roteiros criativos + landing page Eliane (Mapa do Padrao)
update: briefing campanha Eliane - ajuste verba
docs: wiki atualizada com cliente Joao
```

---

## 8. DECISÕES REGISTRADAS

| Data | Decisão | Motivo |
|---|---|---|
| 20/06/2026 | Perpétuo em vez de lançamento para o Mapa | Low ticket não tem data — é torneira contínua alimentando o IR |
| 20/06/2026 | 3 dias de teste em vez de 5 | Estrutura pronta + depoimentos reais justificam tempo menor |
| 20/06/2026 | Imagens estáticas primeiro, vídeos depois | Validar ângulo barato antes de produzir 10 vídeos |
| 20/06/2026 | HeyGen para produção dos vídeos | Eliane grava 1 base, HeyGen replica 10 criativos |
| 20/06/2026 | Git como camada de comunicação Cowork ↔ VPS | Separa responsabilidades: Cowork = estratégia, VPS = execução |
