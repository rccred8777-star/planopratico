# EXECUTE — Agente VPS
**Para:** Claude Code na VPS  
**Projeto:** Mapa do Padrão — Eliane Barboza  
**Repo:** https://github.com/rccred8777-star/planopratico  
**Pasta cliente:** `agencia/clientes/eliane/`

---

## TAREFA 1 — DEPLOY LANDING PAGE (Netlify)

**Arquivo:** `agencia/clientes/eliane/mapa-do-padrao-landing.html`  
**Objetivo:** Subir a landing page em produção no Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Fazer login com token (Ricardo vai colar o token)
netlify login

# Criar site e fazer deploy
mkdir /tmp/deploy-mapa
cp agencia/clientes/eliane/mapa-do-padrao-landing.html /tmp/deploy-mapa/index.html
cd /tmp/deploy-mapa
netlify deploy --prod --dir . --message "Mapa do Padrao landing v1"
```

**Resultado esperado:** URL pública tipo `https://mapa-do-padrao.netlify.app`  
**Após deploy:** Atualizar este arquivo com a URL gerada.

---

## TAREFA 2 — INSERIR VSL NA LANDING PAGE

**Quando:** Assim que tiver o link de download do vídeo HeyGen  
**Link do vídeo HeyGen:** https://app.heygen.com/videos/e9a6704b6afc40b0afbc9c5b77778188

No arquivo `mapa-do-padrao-landing.html`, localizar o placeholder:
```html
<!-- VIDEO_PLACEHOLDER -->
```
Substituir por:
```html
<video controls playsinline style="width:100%;border-radius:12px;">
  <source src="URL_DO_VIDEO_AQUI.mp4" type="video/mp4">
</video>
```
Ou se for embed do YouTube/Vimeo:
```html
<iframe src="URL_EMBED" frameborder="0" allowfullscreen 
  style="width:100%;aspect-ratio:16/9;border-radius:12px;"></iframe>
```

Fazer novo deploy após inserir.

---

## TAREFA 3 — SITE ELIANE (estanciaequilibrio.com.br)

**Arquivo:** `agencia/clientes/eliane/site-eliane.html`  
**Objetivo:** Subir o site institucional da Eliane

```bash
mkdir /tmp/deploy-site
cp agencia/clientes/eliane/site-eliane.html /tmp/deploy-site/index.html
cd /tmp/deploy-site
netlify deploy --prod --dir . --message "Site Eliane Barboza v1"
```

**Resultado esperado:** URL pública para apontar `estanciaequilibrio.com.br`  
**DNS:** Após deploy, configurar CNAME no domínio apontando para Netlify.

---

## TAREFA 4 — CRIATIVOS PRONTOS PARA META ADS

**Arquivo:** `agencia/clientes/eliane/roteiros-mapa-do-padrao.md`  
**Objetivo:** Os 10 roteiros estão prontos. Gerar versões em texto para upload no Meta.

Criar pasta `agencia/clientes/eliane/criativos/` com:
- `legenda-criativo-01.txt` até `legenda-criativo-10.txt`
  (extrair as legendas do arquivo de roteiros, uma por arquivo)
- `headlines.txt` — as 3 variações de headline do briefing
- `briefing-campanha.md` — já existe, copiar para a pasta

**Estrutura de upload Meta Ads:**  
Ver `agencia/clientes/eliane/briefing-campanha-mapa-do-padrao.md`  
Campanha: `[MAPA_PADRAO] ABO Validação V1`  
10 conjuntos × R$15/dia = R$150/dia

---

## TAREFA 5 — CONFIGURAR EMAILS (GoHighLevel)

**Arquivo:** `agencia/clientes/eliane/emails-pos-compra-mapa-do-padrao.md`  
**Credenciais:** Ricardo vai fornecer acesso ao GoHighLevel

Sequência a configurar:
| Email | Delay | Assunto |
|---|---|---|
| 1 | Imediato | Seu Mapa chegou 🗺️ |
| 2 | +24h | Uma coisa antes de começar |
| 3 | +3 dias | O que acontece quando você vê |
| 4 | +5 dias | Ela preencheu e me disse isso |
| 5 | +7 dias | Você chegou ao fim dos 7 dias |

**Trigger:** Tag `comprou_mapa_do_padrao` (webhook Kiwify → GHL)

---

## STATUS DAS TAREFAS

| Tarefa | Status | URL/Resultado |
|---|---|---|
| Deploy landing page | ⏳ pendente | — |
| VSL na landing | ⏳ aguardando MP4 | — |
| Site Eliane no ar | ⏳ pendente | — |
| Criativos organizados | ⏳ pendente | — |
| Emails no GHL | ⏳ aguardando acesso | — |

---

## ARQUIVOS DO PROJETO

```
agencia/clientes/eliane/
├── mapa-do-padrao-landing.html     ← landing page pronta
├── site-eliane.html                ← site institucional pronto
├── roteiros-mapa-do-padrao.md      ← 10 roteiros de criativos
├── landingpage-mapa-do-padrao.md   ← copy da landing (referência)
├── briefing-campanha-mapa-do-padrao.md  ← briefing Meta Ads
├── emails-pos-compra-mapa-do-padrao.md  ← sequência 5 emails
├── vsl-mapa-do-padrao-heygen.md    ← script VSL + config HeyGen
└── roteiro-edicao-vsl-capcut.md    ← roteiro edição CapCut
```

---

## CONTATOS

**Ricardo (estratégia):** rccred8777@gmail.com  
**Eliane (cliente):** @elianecriistina | (51) 98564-1277  
**Produto:** Mapa do Padrão — R$67 — Kiwify  
**Domínio:** estanciaequilibrio.com.br
