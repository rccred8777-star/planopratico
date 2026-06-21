# Roteiro de Edição VSL — Mapa do Padrão
**Editor:** CapCut Desktop  
**Duração final:** ~1:50  
**Exportar:** 1920x1080 (16:9) para landing page | 1080x1920 (9:16) para Stories/Reels

---

## ARQUIVOS NECESSÁRIOS ANTES DE COMEÇAR

| Arquivo | Origem | Onde usar |
|---|---|---|
| `vsl-eliane-avatar.mp4` | HeyGen (avatar falando) | Trilha principal |
| `broll-01-maos-escrevendo.mp4` | HeyGen gerador de vídeo | 32s–52s |
| `broll-02-mulher-janela.mp4` | HeyGen gerador de vídeo | 4s–18s |
| `broll-03-vela-lavanda.mp4` | HeyGen gerador de vídeo | 52s–68s |
| `broll-04-papel-linhas.mp4` | HeyGen gerador de vídeo | 68s–88s |
| `imagem-produto-mapa.png` | Canva (capa do produto) | 32s–52s overlay |
| `musica-fundo.mp3` | Epidemic Sound / CapCut library | trilha inteira |

---

## PASSO A PASSO NO CAPCUT

### 1. CONFIGURAR PROJETO
- Novo projeto → proporção **16:9** (1920x1080)
- Importar todos os arquivos acima
- Colocar `vsl-eliane-avatar.mp4` na trilha principal (linha 1)

---

### 2. TRILHA PRINCIPAL (Avatar Eliane)

A trilha do avatar fica a vida toda no projeto. O B-roll entra **por cima** em momentos específicos, cobrindo o avatar mas mantendo o áudio.

---

### 3. CAMADA DE B-ROLL (linha 2, acima do avatar)

| Tempo | Clipe | Opacidade | Transição |
|---|---|---|---|
| 0s – 4s | ❌ sem B-roll — avatar aparece limpo | — | — |
| 4s – 18s | `broll-02-mulher-janela.mp4` | 100% | Fade in 0.3s |
| 18s – 32s | ❌ sem B-roll — avatar no mecanismo | — | Fade out 0.3s |
| 32s – 52s | `broll-01-maos-escrevendo.mp4` | 100% | Fade in 0.3s |
| 40s – 48s | `imagem-produto-mapa.png` (overlay canto direito) | 90% | Aparecer suave |
| 52s – 68s | `broll-03-vela-lavanda.mp4` | 85% | Fade in 0.3s |
| 68s – 88s | `broll-04-papel-linhas.mp4` | 100% | Fade in 0.3s |
| 88s – fim | ❌ sem B-roll — avatar no CTA | — | Fade out 0.3s |

> **Regra:** quando o avatar faz algo importante (mostrar produto, CTA final), zera o B-roll e deixa o avatar aparecer limpo.

---

### 4. OVERLAY DO PRODUTO (linha 3)

**Quando:** 40s até 52s  
**O que:** imagem da capa do Mapa do Padrão  
**Posição:** canto inferior direito da tela  
**Tamanho:** 30% da tela  
**Animação:** desliza da direita, fica 12 segundos, some com fade

No CapCut:
- Importar `imagem-produto-mapa.png`
- Arrastar para a linha 3 no tempo 40s
- Redimensionar para 30%
- Mover para canto inferior direito
- Entrada: animação "Deslizar da direita" (0.4s)
- Saída: fade out (0.3s)

---

### 5. LEGENDAS QUEIMADAS (linha 4)

Adicionar legenda automática:
- CapCut → **Texto → Legenda Automática**
- Fonte: **Inter Bold** ou similar (sem serifa, legível)
- Cor: **branco** com contorno preto fino (2px)
- Posição: parte inferior, centralizado
- Tamanho: 42px

**Legendas manuais de destaque** (adicionar por cima da automática nos momentos certos):

| Tempo | Texto | Tamanho | Cor |
|---|---|---|---|
| 0s – 4s | *"o que tem de errado comigo?"* | 52px | Branco, itálico |
| 18s – 22s | *"não começou em você"* | 52px | Dourado #C19B3C |
| 68s – 75s | **"R$67 · Acesso imediato · Garantia 7 dias"** | 44px | Branco, fundo escuro semitransparente |
| 100s – fim | **"👇 CLICA AQUI E ACESSA AGORA"** | 56px | Dourado, pulsando |

---

### 6. MÚSICA DE FUNDO (linha 5)

- Buscar na biblioteca do CapCut: **"emotional piano soft"** ou **"calm healing"**
- Volume: **8%** (não pode concorrer com a voz)
- Fade in: 2s no início
- Fade out: 3s nos últimos 10s do vídeo
- Nunca ultrapassar 10% de volume

---

### 7. AJUSTE DE COR (Color Grading)

Aplicar em todo o vídeo:
- **Temperatura:** +8 (mais quente, acolhedor)
- **Contraste:** +5
- **Saturação:** -5 (levemente dessaturado = mais cinematográfico)
- **Vinheta:** leve, intensidade 15%

No CapCut: selecionar tudo → Filtro → "Ajuste" → aplicar os valores acima.

---

### 8. TELA FINAL (últimos 5 segundos)

Após o CTA, adicionar uma tela simples:

```
[Fundo creme #FAF6F0]
[Centro] Logo / Nome: "Eliane Barboza"
[Abaixo] "estanciaequilibrio.com.br"
[Abaixo] "@elianecriistina"
```

Duração: 4 segundos com fade in suave.

---

## CHECKLIST FINAL ANTES DE EXPORTAR

- [ ] Áudio da Eliane limpo e sem eco
- [ ] B-roll não cobre o rosto dela no hook e no CTA
- [ ] Produto aparece em tela entre 40s–52s
- [ ] Legenda de destaque dourada nos momentos certos
- [ ] Música abaixo de 10%
- [ ] Tela final com site e Instagram
- [ ] Assistir completo 1x antes de exportar

---

## EXPORTAÇÃO

**Para landing page (16:9):**
- Resolução: 1920x1080
- Qualidade: Alta (recomendado)
- Formato: MP4
- Nome: `vsl-mapa-do-padrao-land.mp4`

**Para Stories / Reels (9:16):**
- Criar novo projeto 1080x1920
- Reposicionar elementos para vertical
- Avatar centralizado, B-roll recortado no centro
- Nome: `vsl-mapa-do-padrao-stories.mp4`

---

## TEMPO ESTIMADO DE EDIÇÃO

| Tarefa | Tempo |
|---|---|
| Organizar trilhas e B-roll | 20 min |
| Legendas automáticas + ajustes | 15 min |
| Legendas de destaque manuais | 10 min |
| Color grading + música | 10 min |
| Tela final + revisão | 10 min |
| **Total** | **~65 min** |
