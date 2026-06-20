import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createServerClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WIKI_DIR = "/app/docs/wiki";
const PRODUCT_DIR = "/app/docs/product";

const WIKI_INDEX = `
Wiki disponível (use a tool ler_wiki para ler):
- fonte_esteira_low_ticket_V1.md — metodologia completa funil low ticket (1-3-2 ABO, mini VSL, scripts, psicologia de copy)
- fonte_agente_campanhas_meta_V1.md — estratégia e estrutura de campanhas Meta Ads
- metricas.md — KPIs e metas (CPA ≤R$15, ROAS ≥2.5x, CTR ≥1.5%)
- decisoes.md — decisões estratégicas do projeto
- PLANTA_STACK_V1.md — arquitetura técnica da stack

Documentos de produto DogFlow (use ler_wiki com o nome exato):
- PUBLICO_ALVO_DOGFLOW_XIXI_LUGAR_CERTO_V1.md — avatar, dores, desejos e linguagem do público-alvo
- UNICA_CRENCA_DOGFLOW_XIXI_LUGAR_CERTO_V1.md — crença única e mecanismo do DogFlow
- MINI_VSL_DOGFLOW_XIXI_LUGAR_CERTO_V1.md — roteiro completo do mini VSL principal
- HEYGEN_ROTEIRO_MINI_VSL_OFERTA_COMPLETA_DOGFLOW_XIXI_V1.md — roteiro HeyGen VSL oferta completa
- ROTEIROS_VIDEO_CURTOS_DOGFLOW_XIXI_LUGAR_CERTO_V1.md — roteiros prontos para anúncios curtos (HeyGen, por ângulo)
- CRIATIVOS_DOGFLOW_XIXI_LUGAR_CERTO_V1.md — briefing completo de criativos (hooks, textos, CTAs por conjunto)
- LANDING_DOGFLOW_XIXI_LUGAR_CERTO_V1.md — copy da landing page DogFlow
- OFERTA_DOGFLOW_PARE_DE_DESTRUIR_CASA_ORDER_BUMP_V1.md — copy order bump
- CONTEUDO_7_DIAS_DOGFLOW_V1.md — conteúdo completo do produto 7 dias
`;

const tools: Anthropic.Tool[] = [
  {
    name: "buscar_angulos",
    description: "Busca ângulos/hooks coletados do Espião. Use para ver o que concorrentes usam, criar hooks, entender o mercado.",
    input_schema: {
      type: "object" as const,
      properties: {
        limite: { type: "number", description: "Quantidade de ângulos (padrão: 15)" },
      },
      required: [],
    },
  },
  {
    name: "buscar_anuncios",
    description: "Busca anúncios coletados com detalhes de texto, página e status.",
    input_schema: {
      type: "object" as const,
      properties: {
        status: {
          type: "string",
          enum: ["discovered", "transcribed", "analyzed", "error"],
          description: "Filtrar por status",
        },
        limite: { type: "number", description: "Quantidade de anúncios (padrão: 10)" },
      },
      required: [],
    },
  },
  {
    name: "ler_wiki",
    description: "Lê um documento da wiki ou produto. Use quando precisar de estratégia, metodologia, roteiro ou copy específica.",
    input_schema: {
      type: "object" as const,
      properties: {
        arquivo: {
          type: "string",
          description: "Nome exato do arquivo (ex: fonte_esteira_low_ticket_V1.md)",
        },
      },
      required: ["arquivo"],
    },
  },
  {
    name: "salvar_memoria",
    description: "Salva uma informação importante para lembrar em conversas futuras. Use para decisões, status de campanhas, insights validados.",
    input_schema: {
      type: "object" as const,
      properties: {
        chave: {
          type: "string",
          description: "ID único da memória (ex: campanha_dogflow_status, decisao_preco_dogflow)",
        },
        valor: { type: "string", description: "Conteúdo a salvar" },
        categoria: {
          type: "string",
          enum: ["geral", "campanha", "produto", "decisao", "metrica"],
          description: "Categoria da memória",
        },
      },
      required: ["chave", "valor"],
    },
  },
  {
    name: "heygen_listar_avatares",
    description: "Lista os avatares disponíveis na conta HeyGen. Use para escolher o avatar antes de criar um vídeo.",
    input_schema: {
      type: "object" as const,
      properties: {
        tipo: { type: "string", enum: ["all", "private", "public"], description: "Tipo de avatar (padrão: all)" },
      },
      required: [],
    },
  },
  {
    name: "heygen_criar_video",
    description: "Cria um vídeo no HeyGen com avatar IA e roteiro. Use para produzir anúncios, conteúdos e apresentações.",
    input_schema: {
      type: "object" as const,
      properties: {
        titulo: { type: "string", description: "Título do vídeo" },
        roteiro: { type: "string", description: "Texto que o avatar vai falar (script completo)" },
        avatar_id: { type: "string", description: "ID do avatar (obter com heygen_listar_avatares)" },
        voice_id: { type: "string", description: "ID da voz (opcional, usa padrão do avatar se omitido)" },
        dimensao: { type: "string", enum: ["9:16", "16:9", "1:1"], description: "Proporção do vídeo (padrão: 9:16 para ads)" },
        background_color: { type: "string", description: "Cor de fundo hex (ex: #ffffff). Padrão: #000000" },
      },
      required: ["titulo", "roteiro", "avatar_id"],
    },
  },
  {
    name: "heygen_status_video",
    description: "Verifica o status de um vídeo em produção no HeyGen. Retorna link quando pronto.",
    input_schema: {
      type: "object" as const,
      properties: {
        video_id: { type: "string", description: "ID do vídeo retornado por heygen_criar_video" },
      },
      required: ["video_id"],
    },
  },
  {
    name: "heygen_listar_videos",
    description: "Lista vídeos JÁ PRONTOS na conta HeyGen (completed). Use antes de subir no Meta para pegar o video_id, video_url e thumbnail_url de cada vídeo existente.",
    input_schema: {
      type: "object" as const,
      properties: {
        limite: { type: "number", description: "Quantidade de vídeos a listar (padrão: 10)" },
      },
      required: [],
    },
  },
  {
    name: "buscar_vendas",
    description: "Busca vendas reais registradas pelo webhook Kiwify. Use para ver conversões, receita e clientes recentes.",
    input_schema: {
      type: "object" as const,
      properties: {
        limite: { type: "number", description: "Quantidade de vendas (padrão: 20)" },
        produto: { type: "string", description: "Filtrar por nome do produto" },
      },
      required: [],
    },
  },
  {
    name: "meta_listar",
    description: "Lista campanhas, conjuntos de anúncio e anúncios da conta Meta Ads. Use para ver o estado atual antes de criar criativos.",
    input_schema: {
      type: "object" as const,
      properties: {
        nivel: { type: "string", enum: ["campanhas", "conjuntos", "anuncios"], description: "Nível a listar (padrão: conjuntos)" },
        campanha_id: { type: "string", description: "ID da campanha (necessário para listar conjuntos ou anúncios)" },
        conjunto_id: { type: "string", description: "ID do conjunto (necessário para listar anúncios)" },
      },
      required: [],
    },
  },
  {
    name: "meta_upload_video",
    description: "Faz upload de um vídeo (via URL pública, ex: HeyGen) para a biblioteca da conta Meta Ads. Retorna o video_id para usar em meta_criar_anuncio.",
    input_schema: {
      type: "object" as const,
      properties: {
        video_url: { type: "string", description: "URL pública do vídeo (ex: URL do HeyGen após renderização)" },
        titulo: { type: "string", description: "Título do vídeo no Meta" },
      },
      required: ["video_url", "titulo"],
    },
  },
  {
    name: "meta_criar_anuncio",
    description: "Cria um criativo de vídeo e um anúncio PAUSADO num conjunto do Meta Ads. SEMPRE cria pausado — ative manualmente quando pronto.",
    input_schema: {
      type: "object" as const,
      properties: {
        conjunto_id: { type: "string", description: "ID do conjunto de anúncios (adset_id)" },
        nome_anuncio: { type: "string", description: "Nome do anúncio" },
        video_id: { type: "string", description: "ID do vídeo no Meta (obtido via meta_upload_video)" },
        titulo: { type: "string", description: "Headline do anúncio (ex: Seu cachorro vai parar de fazer xixi)" },
        mensagem: { type: "string", description: "Texto principal do anúncio (corpo)" },
        descricao: { type: "string", description: "Descrição (aparece abaixo do título)" },
        link_destino: { type: "string", description: "URL de destino (ex: https://planopratico.shop/quiz)" },
        thumbnail_url: { type: "string", description: "URL da thumbnail do vídeo (obrigatório no Meta — usar thumbnail_url retornado por heygen_listar_videos)" },
        page_id: { type: "string", description: "ID da página Facebook (padrão: já configurado no sistema)" },
      },
      required: ["conjunto_id", "nome_anuncio", "video_id", "titulo", "mensagem", "link_destino"],
    },
  },
  {
    name: "meta_ativar_pausar",
    description: "Ativa ou pausa uma campanha, conjunto ou anúncio no Meta Ads.",
    input_schema: {
      type: "object" as const,
      properties: {
        entidade_id: { type: "string", description: "ID da campanha, conjunto ou anúncio" },
        acao: { type: "string", enum: ["ACTIVE", "PAUSED"], description: "ACTIVE para ativar, PAUSED para pausar" },
      },
      required: ["entidade_id", "acao"],
    },
  },
];

type SupabaseClient = ReturnType<typeof createServerClient>;

async function executeTool(
  name: string,
  input: Record<string, unknown>,
  supabase: SupabaseClient
): Promise<string> {
  switch (name) {
    case "buscar_angulos": {
      const limite = (input.limite as number) || 15;
      const { data, error } = await supabase
        .from("competitor_angles")
        .select("hook, pain_point, villain, mechanism, cta, tone, quality_score, notes, competitor_ad_id")
        .order("created_at", { ascending: false })
        .limit(limite);
      if (error) return `Erro: ${error.message}`;
      return JSON.stringify(data || [], null, 2);
    }

    case "buscar_anuncios": {
      const limite = (input.limite as number) || 10;
      let query = supabase
        .from("competitor_ads")
        .select("page_name, status, ad_text, error_msg, ad_snapshot_url, created_at")
        .order("created_at", { ascending: false })
        .limit(limite);
      if (input.status) query = query.eq("status", input.status as string);
      const { data, error } = await query;
      if (error) return `Erro: ${error.message}`;
      return JSON.stringify(data || [], null, 2);
    }

    case "ler_wiki": {
      const arquivo = input.arquivo as string;
      const sanitized = path.basename(arquivo);
      const wikiPath = path.join(WIKI_DIR, sanitized);
      const prodPath = path.join(PRODUCT_DIR, sanitized);
      try {
        if (fs.existsSync(wikiPath)) return fs.readFileSync(wikiPath, "utf-8");
        if (fs.existsSync(prodPath)) return fs.readFileSync(prodPath, "utf-8");
        return `Arquivo "${sanitized}" não encontrado. Arquivos disponíveis: ${[
          ...fs.readdirSync(WIKI_DIR).filter((f) => f.endsWith(".md")),
          ...fs.readdirSync(PRODUCT_DIR).filter((f) => f.endsWith(".md")),
        ].join(", ")}`;
      } catch {
        return `Erro ao ler arquivo: ${sanitized}`;
      }
    }

    case "salvar_memoria": {
      const { error } = await supabase.from("agent_memory").upsert(
        {
          chave: input.chave as string,
          valor: input.valor as string,
          categoria: (input.categoria as string) || "geral",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "chave" }
      );
      return error ? `Erro: ${error.message}` : "Memória salva.";
    }

    case "heygen_listar_avatares": {
      const tipo = (input.tipo as string) || "all";
      const url = tipo === "private"
        ? "https://api.heygen.com/v2/avatars?type=private"
        : tipo === "public"
        ? "https://api.heygen.com/v2/avatars?type=public"
        : "https://api.heygen.com/v2/avatars";
      const res = await fetch(url, {
        headers: { "X-Api-Key": process.env.HEYGEN_API_KEY || "" },
      });
      const data = await res.json();
      if (!res.ok) return `Erro HeyGen: ${JSON.stringify(data)}`;
      const avatars = (data.data?.avatars || []).slice(0, 20).map((a: { avatar_id: string; avatar_name: string; gender: string }) => ({
        id: a.avatar_id,
        nome: a.avatar_name,
        genero: a.gender,
      }));
      return JSON.stringify(avatars, null, 2);
    }

    case "heygen_criar_video": {
      const dimensaoMap: Record<string, { width: number; height: number }> = {
        "9:16": { width: 720, height: 1280 },
        "16:9": { width: 1280, height: 720 },
        "1:1":  { width: 720, height: 720 },
      };
      const dim = dimensaoMap[(input.dimensao as string) || "9:16"];
      const body = {
        video_inputs: [{
          character: {
            type: "avatar",
            avatar_id: input.avatar_id as string,
            avatar_style: "normal",
          },
          voice: input.voice_id
            ? { type: "text", input_text: input.roteiro as string, voice_id: input.voice_id as string }
            : { type: "text", input_text: input.roteiro as string },
        }],
        dimension: dim,
        title: input.titulo as string,
      };
      const res = await fetch("https://api.heygen.com/v2/video/generate", {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.HEYGEN_API_KEY || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) return `Erro HeyGen: ${JSON.stringify(data)}`;
      return JSON.stringify({ video_id: data.data?.video_id, status: "processando", mensagem: "Vídeo em produção. Use heygen_status_video para verificar quando estiver pronto." });
    }

    case "heygen_listar_videos": {
      const limite = (input.limite as number) || 10;
      const res = await fetch(`https://api.heygen.com/v2/videos?limit=${limite}`, {
        headers: { "X-Api-Key": process.env.HEYGEN_API_KEY || "" },
      });
      const data = await res.json();
      if (!res.ok) return `Erro HeyGen: ${JSON.stringify(data)}`;
      const videos = (data.data || [])
        .filter((v: { status: string }) => v.status === "completed")
        .map((v: { id: string; title: string; video_url: string; thumbnail_url: string; duration: number; created_at: number }) => ({
          id: v.id,
          titulo: v.title,
          video_url: v.video_url,
          thumbnail_url: v.thumbnail_url,
          duracao: v.duration,
          criado_em: new Date(v.created_at * 1000).toLocaleString("pt-BR"),
        }));
      return JSON.stringify(videos, null, 2);
    }

    case "heygen_status_video": {
      const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${input.video_id}`, {
        headers: { "X-Api-Key": process.env.HEYGEN_API_KEY || "" },
      });
      const data = await res.json();
      if (!res.ok) return `Erro HeyGen: ${JSON.stringify(data)}`;
      const v = data.data;
      return JSON.stringify({
        status: v?.status,
        url: v?.video_url || null,
        thumbnail: v?.thumbnail_url || null,
        duracao: v?.duration || null,
        mensagem: v?.status === "completed" ? "Vídeo pronto!" : v?.status === "processing" ? "Ainda processando..." : v?.status,
      });
    }

    case "buscar_vendas": {
      const limite = (input.limite as number) || 20;
      let query = supabase
        .from("agent_vendas")
        .select("order_id, produto, valor, customer_name, customer_email, customer_phone, created_at")
        .order("created_at", { ascending: false })
        .limit(limite);
      if (input.produto) query = query.ilike("produto", `%${input.produto as string}%`);
      const { data, error } = await query;
      if (error) return `Erro: ${error.message}`;
      const total = (data || []).reduce((sum, v) => sum + (v.valor || 0), 0);
      return JSON.stringify({ total_vendas: data?.length || 0, receita_total: `R$${total.toFixed(2)}`, vendas: data || [] }, null, 2);
    }

    case "meta_listar": {
      const META_TOKEN = process.env.META_ACCESS_TOKEN || "";
      const AD_ACCOUNT = process.env.META_AD_ACCOUNT || "act_1319011403758714";
      const nivel = (input.nivel as string) || "conjuntos";

      if (nivel === "campanhas") {
        const res = await fetch(
          `https://graph.facebook.com/v21.0/${AD_ACCOUNT}/campaigns?fields=id,name,status,objective,daily_budget&access_token=${META_TOKEN}`
        );
        const data = await res.json();
        return JSON.stringify(data.data || data, null, 2);
      }

      if (nivel === "conjuntos") {
        const campId = (input.campanha_id as string) || "120248611748940623";
        const res = await fetch(
          `https://graph.facebook.com/v21.0/${campId}/adsets?fields=id,name,status,daily_budget&access_token=${META_TOKEN}`
        );
        const data = await res.json();
        return JSON.stringify(data.data || data, null, 2);
      }

      if (nivel === "anuncios") {
        const conjId = input.conjunto_id as string;
        if (!conjId) return "Informe conjunto_id para listar anúncios.";
        const res = await fetch(
          `https://graph.facebook.com/v21.0/${conjId}/ads?fields=id,name,status,creative{id,name}&access_token=${META_TOKEN}`
        );
        const data = await res.json();
        return JSON.stringify(data.data || data, null, 2);
      }

      return "Nível inválido.";
    }

    case "meta_upload_video": {
      const META_TOKEN = process.env.META_ACCESS_TOKEN || "";
      const AD_ACCOUNT = process.env.META_AD_ACCOUNT || "act_1319011403758714";
      const res = await fetch(`https://graph.facebook.com/v21.0/${AD_ACCOUNT}/advideos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file_url: input.video_url as string,
          title: input.titulo as string,
          access_token: META_TOKEN,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) return `Erro upload Meta: ${JSON.stringify(data.error || data)}`;
      return JSON.stringify({ video_id: data.id, mensagem: "Vídeo enviado para Meta. Use este video_id em meta_criar_anuncio." });
    }

    case "meta_criar_anuncio": {
      const META_TOKEN = process.env.META_ACCESS_TOKEN || "";
      const AD_ACCOUNT = process.env.META_AD_ACCOUNT || "act_1319011403758714";
      const pageId = (input.page_id as string) || "1304660396052868";
      const linkDestino = (input.link_destino as string) || "https://planopratico.shop/quiz";

      // 1. Criar criativo
      const creativeBody = {
        name: `Criativo — ${input.nome_anuncio}`,
        object_story_spec: {
          page_id: pageId,
          video_data: {
            video_id: input.video_id as string,
            message: input.mensagem as string,
            title: input.titulo as string,
            ...(input.thumbnail_url ? { image_url: input.thumbnail_url } : {}),
            ...(input.descricao ? { link_description: input.descricao } : {}),
            call_to_action: {
              type: "LEARN_MORE",
              value: { link: linkDestino },
            },
          },
        },
        access_token: META_TOKEN,
      };

      const creativeRes = await fetch(`https://graph.facebook.com/v21.0/${AD_ACCOUNT}/adcreatives`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creativeBody),
      });
      const creativeData = await creativeRes.json();
      if (!creativeRes.ok || creativeData.error)
        return `Erro ao criar criativo: ${JSON.stringify(creativeData.error || creativeData)}`;

      // 2. Criar anúncio PAUSADO
      const adRes = await fetch(`https://graph.facebook.com/v21.0/${AD_ACCOUNT}/ads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: input.nome_anuncio as string,
          adset_id: input.conjunto_id as string,
          creative: { creative_id: creativeData.id },
          status: "PAUSED",
          access_token: META_TOKEN,
        }),
      });
      const adData = await adRes.json();
      if (!adRes.ok || adData.error)
        return `Erro ao criar anúncio: ${JSON.stringify(adData.error || adData)}`;

      return JSON.stringify({
        anuncio_id: adData.id,
        criativo_id: creativeData.id,
        status: "PAUSED",
        mensagem: "Anúncio criado e PAUSADO. Use meta_ativar_pausar com acao=ACTIVE quando quiser ativar.",
      });
    }

    case "meta_ativar_pausar": {
      const META_TOKEN = process.env.META_ACCESS_TOKEN || "";
      const res = await fetch(`https://graph.facebook.com/v21.0/${input.entidade_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: input.acao as string,
          access_token: META_TOKEN,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) return `Erro: ${JSON.stringify(data.error || data)}`;
      return `Status atualizado para ${input.acao} com sucesso.`;
    }

    default:
      return "Tool desconhecida.";
  }
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const supabase = createServerClient();

  const [
    { count: segmentsCount },
    { count: productsCount },
    { count: adsCount },
    { count: anglesCount },
    { data: segments },
    { data: recentAngles },
    { data: memories },
  ] = await Promise.all([
    supabase.from("segments").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("competitor_ads").select("*", { count: "exact", head: true }),
    supabase.from("competitor_angles").select("*", { count: "exact", head: true }),
    supabase.from("segments").select("name,slug"),
    supabase
      .from("competitor_angles")
      .select("hook,pain_point,tone,quality_score")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("agent_memory")
      .select("chave,valor,categoria")
      .order("updated_at", { ascending: false })
      .limit(40),
  ]);

  const memoriesText =
    (memories ?? []).length > 0
      ? (memories ?? [])
          .map((m: { chave: string; valor: string; categoria: string }) => `[${m.categoria}] ${m.chave}: ${m.valor}`)
          .join("\n")
      : "Nenhuma memória salva ainda.";

  const anglesPreview =
    (recentAngles ?? []).length > 0
      ? (recentAngles ?? [])
          .map(
            (a: { hook: string; pain_point: string; tone: string; quality_score: number }) =>
              `• Hook: "${a.hook}" | Dor: ${a.pain_point} | Tom: ${a.tone} | Score: ${a.quality_score}`
          )
          .join("\n")
      : "Nenhum ângulo ainda.";

  const systemPrompt = `Você é o Agente Chefe do PlanoPratico — responsável por coordenar toda a operação de info-produtos digitais.

## NEGÓCIO

**PlanoPratico** opera dois produtos low-ticket:
- **DogFlow** — adestramento de cães (filhotes, xixi no lugar certo, comportamentos). ATIVO — campanha criada, prestes a ir ao ar.
- **Plano Recomeço 21D** — recuperação emocional/divórcio. Em desenvolvimento.

**Funil:** Meta Ads → Landing page (Mini VSL no Vturb) → Kiwify checkout → PWA/produto digital → WhatsApp automatizado (n8n + WaCRM)

**Kiwify DogFlow:** https://pay.kiwify.com.br/a6a8NmF

## STACK
- n8n (n8n.planopratico.shop): automações, Espião EW1-EW4
- WaCRM (crm.planopratico.shop): CRM WhatsApp
- Supabase: banco de dados (competitor_ads, competitor_angles, segments, products, agent_memory)
- Meta Ads: conta act_1319011403758714 | Pixel: 1390710396449878
- Kiwify: checkout e entrega digital
- HeyGen: produção de vídeos de anúncio com avatar IA
- Meta Ads API: conta act_1319011403758714 — leitura e escrita (campanhas, conjuntos, criativos, anúncios)

## ESTADO ATUAL
- Segmentos: ${segmentsCount ?? 0} (${(segments ?? []).map((s: { name: string }) => s.name).join(", ") || "nenhum"})
- Produtos: ${productsCount ?? 0}
- Anúncios coletados Espião: ${adsCount ?? 0}
- Ângulos gerados: ${anglesCount ?? 0}

**Últimos hooks do Espião:**
${anglesPreview}

## CAMPANHA ATIVA — DOGFLOW
- ID: 120248611748940623 | Status: PAUSED (aguardando criativos)
- Estrutura: 1 campanha ABO, OUTCOME_SALES, 3 conjuntos × R$10/dia
- A1: [DogFlow] A1 — Filhote Comportamentos (empatia)
- A2: [DogFlow] A2 — Fuga Portão Perigo (medo/urgência)
- A3: [DogFlow] A3 — Método 7 Dias (autoridade/resultado)
- Criativos: 6 vídeos via HeyGen (2 por conjunto) — PENDENTES

## MÉTRICAS ALVO
- CPA ≤ R$15 | ROAS ≥ 2.5x | CTR link ≥ 1.5% | CPC ≤ R$0.80
- Quiz→checkout ≥ 8% | checkout→pago ≥ 35% | Order bump ≥ 25%

## WIKI
${WIKI_INDEX}

## MEMÓRIAS
${memoriesText}

## INSTRUÇÕES DE COMPORTAMENTO
- Use as tools para buscar dados reais quando a pergunta exigir
- Salve decisões e insights relevantes com salvar_memoria
- Responda sempre em português, seja direto e objetivo
- Quando der orientação estratégica, cite de onde vem (wiki, ângulos, métricas)
- Para roteiros e scripts, leia o documento correspondente antes de criar
- Não invente dados — consulte o Supabase ou a wiki

## REGRAS META ADS — OBRIGATÓRIAS
- **NUNCA crie anúncio com status ACTIVE** — sempre PAUSED. O humano ativa quando quiser
- **NUNCA ative campanha ou conjunto** sem ordem explícita do humano ("pode ativar", "liga", "ativa agora")
- Fluxo de produção de anúncio: heygen_criar_video → heygen_status_video (aguardar "completed") → meta_upload_video → meta_criar_anuncio (PAUSED) → avisar humano com lista dos anúncios prontos
- Page ID padrão DogFlow: 1304660396052868 (usar se não informado)
- Link destino padrão: https://planopratico.shop/quiz`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const anthropicMessages: Anthropic.MessageParam[] = messages
    .filter((m: { role: string; content: string }) => m.content)
    .map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

  // Agentic loop: execute tools, then stream final answer
  let currentMessages = [...anthropicMessages];
  let loopCount = 0;
  let finalText = "";

  while (loopCount < 6) {
    loopCount++;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: systemPrompt,
      tools,
      messages: currentMessages,
    });

    const textBlocks = response.content.filter(
      (b): b is Anthropic.TextBlock => b.type === "text"
    );

    if (response.stop_reason !== "tool_use") {
      finalText = textBlocks.map((b) => b.text).join("");
      break;
    }

    // Execute tools
    const toolUseBlocks = response.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
    );
    const toolResults: Anthropic.ToolResultBlockParam[] = [];

    for (const toolUse of toolUseBlocks) {
      const result = await executeTool(
        toolUse.name,
        toolUse.input as Record<string, unknown>,
        supabase
      );
      toolResults.push({
        type: "tool_result",
        tool_use_id: toolUse.id,
        content: result,
      });
    }

    currentMessages = [
      ...currentMessages,
      { role: "assistant" as const, content: response.content },
      { role: "user" as const, content: toolResults },
    ];
  }

  // Stream final text word by word
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      if (!finalText) {
        const data = JSON.stringify({ choices: [{ delta: { content: "Sem resposta." } }] });
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
        return;
      }

      const chunks = finalText.match(/.{1,4}/g) || [];
      let i = 0;
      const interval = setInterval(() => {
        if (i >= chunks.length) {
          clearInterval(interval);
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
          return;
        }
        const data = JSON.stringify({ choices: [{ delta: { content: chunks[i] } }] });
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        i++;
      }, 12);
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
