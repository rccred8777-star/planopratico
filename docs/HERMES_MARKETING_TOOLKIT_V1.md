# Hermes — Toolkit de Marketing (habilidades liberadas)
> Liberado em 19/06/2026. Equipa o agente chefe (Hermes) com as skills de marketing + o conhecimento dos vídeos de método. Carregar/citar este doc ao iniciar uma sessão Hermes de criativo/análise/estratégia.

---

## 1. Skills instaladas (carregam na sessão Claude Code)
Em `/config/.claude/skills/` — markdown puro, sem código, vetadas (grade-A skillsdirectory):
- **`marketing-psychology`** (davila7) — 70+ modelos mentais (psicologia do comprador, persuasão, precificação, growth). Usar pra escolher o gatilho de cada criativo/copy.
- **`alex-hormozi-pitch`** (microck) — engenharia de oferta ($100M Offers): Value Equation, fórmula MAGIC de nome, 4 tipos de garantia. Usar pra construir/afiar a oferta.

## 2. Conhecimento de método — os vídeos (na wiki)
- **`docs/wiki/fonte_low_ticket_raiz_maxima_V1.md`** — Ricardo Máxima (Low Ticket Raiz): alça pronta/ruminação, produto tangível "dedo na tela", no-brain, nome forte, ROI 2+ sem esteira, 3 fases de tráfego (3D → ABO Gramado/cluster pocket → escala regra 20%).
- **`docs/wiki/fonte_esteira_low_ticket_V1.md`** — Davi/Paulo/Vturb (esteira Quiz + Mini VSL).
- **`docs/wiki/fonte_agente_campanhas_meta_V1.md`** — agência de ads automatizada (n8n+Airtable): pesquisa → ângulos → script → tracking → flywheel.

## 3. Playbook operacional (junta tudo)
- **`docs/wiki/SKILL_GESTOR_TRAFEGO_V1.md`** — como transformar a inteligência do Espião + método Máxima em campanha ROI 2+. Inclui exemplo aplicado ao DogFlow.

## 4. Como o Hermes deve usar (fluxo)
```
Dados do Espião (competitor_angles + voz do cliente, Supabase)
  → marketing-psychology escolhe o gatilho
  → alex-hormozi-pitch monta/afia a oferta
  → método Máxima define formato (tangível, dedo na tela) e estrutura de campanha
  → entrega: oferta + criativos + plano de teste A/B (fundamentado, rastreável por ID)
```
Referência de aplicação real: `docs/product/CAMPANHA2_DOGFLOW_XIXI_MAXIMA_V2.md`, `AUDITORIA_CAMPANHA1_XIXI_V1.md`, `HEYGEN_CAMPANHA2_DOGFLOW_XIXI_10_VIDEOS_V1.md`.

## 5. Regras mantidas (DEC-004)
Hermes **recomenda**, não executa: não sobe campanha no Meta, não dispara WhatsApp, não mexe em infra. Gera oferta/criativo/análise/plano → humano aprova e executa. Toda copy passa por compliance (`SPEC_COMPLIANCE_META_BEM_ESTAR`): sem "garantido", sem promessa clínica.

## 6. Regra de novas skills (segurança)
Só adotar skills de fonte escaneada (skillsdirectory.com grade-A / anthropics/skills), lendo o SKILL.md + scripts antes de instalar. Ver `feedback_skills_seguranca` na memória.
