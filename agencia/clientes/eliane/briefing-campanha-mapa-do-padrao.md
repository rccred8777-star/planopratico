# Briefing de Campanha — Mapa do Padrão (Eliane)
**Para:** Gestor de Tráfego  
**Produto:** Mapa do Padrão | **Preço:** R$67  
**Fase:** Validação ABO | **Duração:** 3 dias  
**Verba:** R$150/dia = R$450 total no teste

---

## OBJETIVO

Encontrar os criativos vencedores com ROI ≥ 2 em 3 dias.  
Meta ideal: 4 criativos com ROI ≥ 2,5.  
Se sair com 2 vencedores → rodar mais 10 criativos antes de escalar.

---

## ESTRUTURA DA CAMPANHA

```
1 CAMPANHA
└── 10 CONJUNTOS (ABO)
    └── 1 CRIATIVO por conjunto
```

| Item | Configuração |
|---|---|
| Objetivo | Vendas (evento: Compra) |
| Tipo de compra | Leilão |
| Orçamento | ABO — R$15/dia por conjunto |
| Total/dia | R$150 (10 conjuntos × R$15) |
| Duração | 3 dias (não mexer durante esse período) |
| Pixel | Evento "Compra" no checkout Kiwify |
| Janela de atribuição | 7 dias após clique / 1 dia após visualização |

---

## SEGMENTAÇÃO

| Item | Configuração |
|---|---|
| País | Brasil |
| Gênero | Feminino |
| Idade | 28–55 anos |
| Interesses | Deixar aberto (Advantage+) — deixar o Meta otimizar |
| Públicos excluídos | Compradores dos últimos 30 dias |
| Posicionamentos | Automático (Advantage+ Placements) |

> ⚠️ Não segmentar por interesse nesta fase. O objetivo é deixar o algoritmo achar a bolsa. Segmentação manual limita a entrega no início.

---

## OS 10 CRIATIVOS

Cada conjunto roda 1 criativo. Ordem de upload:

| Conjunto | Criativo | Ângulo |
|---|---|---|
| 1 | Criativo 2 | "O problema sou eu" ← prioridade máxima |
| 2 | Criativo 10 | "Não é seu" |
| 3 | Criativo 1 | "Mente acelerada" |
| 4 | Criativo 3 | "O que tenho de errado?" |
| 5 | Criativo 6 | "Amor é sofrimento" |
| 6 | Criativo 4 | "Padrão materno" |
| 7 | Criativo 5 | "Só existo, não vivo" |
| 8 | Criativo 7 | Depoimento real |
| 9 | Criativo 8 | "Já tentei tudo" |
| 10 | Criativo 9 | Ritual 7 dias |

**Formato:** vídeo 9:16 vertical, legenda queimada, sem música com direitos autorais.

---

## COPY DO ANÚNCIO

Cada criativo tem sua legenda específica no arquivo de roteiros.  
Usar a legenda correspondente ao número do criativo.

**Texto do anúncio (campo "Texto principal"):** copiar a legenda do roteiro.  
**Título (headline do anúncio):** usar variações abaixo por conjunto:

| Conjunto | Headline do anúncio |
|---|---|
| 1-3 | "Descubra de onde vem o que você repete" |
| 4-6 | "O peso que você carrega pode não ser seu" |
| 7-10 | "Mapa do Padrão — R$67. Acesso imediato." |

**URL de destino:** link da landing page Kiwify  
**CTA do botão:** "Saiba mais"

---

## CHECKLIST ANTES DE SUBIR

**Conta e pixel:**
- [ ] Pixel do Meta instalado na landing page
- [ ] Evento "Compra" disparando no checkout (testar com Meta Pixel Helper)
- [ ] Evento "Visualização de conteúdo" na landing page
- [ ] Evento "Iniciar checkout" na página de checkout
- [ ] Conta de anúncio sem campanhas ruins recentes (excluir, não só desativar)

**Criativos:**
- [ ] 10 vídeos exportados em 9:16, resolução mínima 1080×1920
- [ ] Legenda queimada em todos
- [ ] Nenhum criativo com atributo pessoal em 2ª pessoa (compliance)
- [ ] Nenhum com música com direitos autorais

**Landing page:**
- [ ] Página carregando em menos de 3s no celular
- [ ] Botão de compra funcionando
- [ ] Pixel disparando corretamente
- [ ] Disclaimer de compliance no rodapé

**Campanha:**
- [ ] Nome da campanha: `[MAPA_PADRAO] ABO Validação V1`
- [ ] Nome dos conjuntos: `[C01] O Problema Sou Eu`, `[C02] Nao E Seu`... etc
- [ ] Orçamento ABO confirmado (não CBO nesta fase)
- [ ] Data de início definida
- [ ] Alerta de gasto configurado no Gerenciador

---

## REGRAS DE CORTE — DIA 3

No fim do terceiro dia, avaliar cada conjunto:

**Manter (vencedor):**
- ROI ≥ 2 → candidato a escala
- ROI entre 1,5-2 → observar mais 1 dia antes de decidir

**Desativar (perdedor):**
- ROI < 1 após 3 dias → desativar
- Sem nenhuma compra após R$45 gastos → desativar
- CPC > R$2,50 com baixa passagem → desativar

**Meta ideal:**
- 4 conjuntos com ROI ≥ 2 → ir para fase Gramado
- Menos de 4 vencedores → rodar 10 criativos novos antes de escalar

---

## FASE 2 — GRAMADO (após validação)

Quando tiver 4 vencedores:

```
1 CAMPANHA CBO
└── 5 CONJUNTOS IGUAIS (Gramado)
    └── 4 CRIATIVOS VENCEDORES em cada conjunto
```

| Item | Configuração |
|---|---|
| Orçamento inicial | R$67/dia (equivale ao ticket do produto) |
| Duração | 5 dias sem mexer |
| Objetivo | Mesma campanha → duplicar os conjuntos |
| Escala | Se ROI ≥ 2 nos 5 dias → dobrar verba (R$134/dia) |
| Regra dos 20% | Máximo 20% da verba em criativos novos durante escala |

**Meta de escala até 11/07:**
- Semana 1: R$150/dia (validação)
- Semana 2: R$300/dia (se ROI ≥ 2)
- Semana 3: R$600/dia
- Semana 4: R$1.000+/dia

---

## MÉTRICAS A MONITORAR (dashboard diário)

| Métrica | Meta |
|---|---|
| CPC (custo por clique) | < R$1,50 |
| CTR (taxa de clique) | > 1,5% |
| Custo por Initiate Checkout | < R$30 |
| Taxa de conversão checkout | > 15% |
| CPA (custo por compra) | < R$33 (ROI 2 = CPA máximo de R$33,50) |
| ROI | ≥ 2 |

**Fórmula ROI:** Receita ÷ Investimento  
Ex: R$134 receita ÷ R$67 gasto = ROI 2

---

## CONTATOS DO PROJETO

**Produto/Estratégia:** Ricardo  
**Especialista:** Eliane  
**Plataforma:** Kiwify  
**Criativos:** HeyGen (avatar Eliane) + arquivos de roteiro  
**Relatório:** enviar diariamente via WhatsApp com: gasto do dia, compras, CPA, ROI por conjunto
