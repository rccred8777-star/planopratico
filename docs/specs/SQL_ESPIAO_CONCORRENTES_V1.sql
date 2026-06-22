-- ============================================================
-- Sistema Espião de Concorrentes — DogFlow / PlanoPratico
-- Rodar no Supabase SQL Editor
-- ============================================================

-- Tabela 1: Anúncios de concorrentes encontrados
CREATE TABLE IF NOT EXISTS competitor_ads (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
2

  -- Origem
  keyword             TEXT NOT NULL,              -- palavra-chave usada na busca
  source              TEXT DEFAULT 'meta_library', -- meta_library | manual

  -- Dados do anúncio
  ad_id               TEXT UNIQUE,               -- ID do anúncio no Meta
  page_name           TEXT,                      -- nome da página/anunciante
  page_id             TEXT,                      -- ID da página
  ad_text             TEXT,                      -- texto do anúncio
  ad_snapshot_url     TEXT,                      -- URL do snapshot Meta
  facebook_video_url  TEXT,                      -- URL Facebook do vídeo
  cdn_video_url       TEXT,                      -- URL real do CDN (extraída pelo Scrapfly)

  -- Status do pipeline
  status              TEXT DEFAULT 'discovered'  -- discovered | scraping | transcribed | analyzed | done
                      CHECK (status IN ('discovered','scraping','transcribed','analyzed','done','error')),
  error_msg           TEXT,

  -- Datas do anúncio
  ad_start_date       DATE,
  ad_stop_date        DATE
);

-- Tabela 2: Transcrições dos vídeos
CREATE TABLE IF NOT EXISTS competitor_transcripts (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  competitor_ad_id    UUID REFERENCES competitor_ads(id) ON DELETE CASCADE,

  transcript_raw      TEXT NOT NULL,             -- transcrição bruta do Whisper
  duration_seconds    INTEGER,                   -- duração estimada do vídeo
  language            TEXT DEFAULT 'pt'
);

-- Tabela 3: Ângulos extraídos pelo Gemini de cada anúncio
CREATE TABLE IF NOT EXISTS competitor_angles (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  competitor_ad_id    UUID REFERENCES competitor_ads(id) ON DELETE CASCADE,

  -- Estrutura extraída
  hook                TEXT,                      -- primeiras 2-3 frases
  pain_point          TEXT,                      -- dor principal agitada
  villain             TEXT,                      -- vilão oculto identificado
  mechanism           TEXT,                      -- mecanismo/solução apresentada
  offer_price         TEXT,                      -- preço mencionado (se houver)
  price_anchor        TEXT,                      -- âncora de preço (ex: "de R$97 por R$27")
  cta                 TEXT,                      -- call to action final
  tone                TEXT,                      -- tom: urgência/empatia/autoridade/curiosidade
  duration_estimate   TEXT,                      -- curto(<2min)/médio(2-4min)/longo(>4min)

  -- Score de qualidade (preenchido manualmente)
  quality_score       INTEGER CHECK (quality_score BETWEEN 1 AND 5),
  notes               TEXT
);

-- Tabela 4: Performance dos nossos anúncios (Meta API)
CREATE TABLE IF NOT EXISTS our_ad_performance (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collected_at        TIMESTAMPTZ DEFAULT NOW(),

  -- Identificação
  campaign_id         TEXT,
  campaign_name       TEXT,
  adset_id            TEXT,
  adset_name          TEXT,
  ad_id               TEXT,
  ad_name             TEXT,
  video_id            TEXT,

  -- Métricas
  spend               NUMERIC(10,2),
  impressions         INTEGER,
  clicks              INTEGER,
  conversions         INTEGER,
  roas                NUMERIC(6,2),
  cpc                 NUMERIC(8,2),
  ctr                 NUMERIC(6,4),

  -- Período
  date_start          DATE,
  date_stop           DATE,

  -- Status
  is_winning          BOOLEAN DEFAULT FALSE,     -- marcado pelo humano como vencedor
  transcript          TEXT                       -- script transcrito (se vídeo próprio)
);

-- Tabela 5: Ângulos gerados para o DogFlow
CREATE TABLE IF NOT EXISTS our_angles (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          TIMESTAMPTZ DEFAULT NOW(),

  product             TEXT DEFAULT 'dogflow',
  problem             TEXT,                      -- xixi/guia/latido/pulo/destroi/desobedece

  -- Conteúdo do ângulo
  angle_title         TEXT NOT NULL,
  concept_summary     TEXT,
  vssl_structure      TEXT,                      -- estrutura VSSL completa
  hook_suggestion     TEXT,
  emotional_triggers  TEXT,
  cognitive_biases    TEXT,

  -- Fonte
  based_on_competitor UUID REFERENCES competitor_angles(id),
  icp_research        TEXT,                      -- resultado do Perplexity

  -- Status
  status              TEXT DEFAULT 'generated'   -- generated | selected | scripted | tested
                      CHECK (status IN ('generated','selected','scripted','tested','rejected')),
  selected_at         TIMESTAMPTZ
);

-- Tabela 6: Scripts gerados
CREATE TABLE IF NOT EXISTS our_scripts (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  angle_id            UUID REFERENCES our_angles(id),

  product             TEXT DEFAULT 'dogflow',
  version             INTEGER DEFAULT 1,

  -- Script
  script_full         TEXT NOT NULL,
  script_duration     TEXT,                      -- 1-3min / 3-5min
  feedback            TEXT,                      -- feedback humano para revisão

  -- Status
  status              TEXT DEFAULT 'draft'       -- draft | revised | approved | live
                      CHECK (status IN ('draft','revised','approved','live','rejected'))
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_competitor_ads_status    ON competitor_ads(status);
CREATE INDEX IF NOT EXISTS idx_competitor_ads_keyword   ON competitor_ads(keyword);
CREATE INDEX IF NOT EXISTS idx_our_angles_status        ON our_angles(status);
CREATE INDEX IF NOT EXISTS idx_our_scripts_status       ON our_scripts(status);
CREATE INDEX IF NOT EXISTS idx_ad_performance_winning   ON our_ad_performance(is_winning);

-- Row Level Security (mesmos padrões do schema principal)
ALTER TABLE competitor_ads         ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_angles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE our_ad_performance     ENABLE ROW LEVEL SECURITY;
ALTER TABLE our_angles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE our_scripts            ENABLE ROW LEVEL SECURITY;

-- Acesso service_role (n8n usa service key)
CREATE POLICY "service_role_all" ON competitor_ads         FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON competitor_transcripts FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON competitor_angles      FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON our_ad_performance     FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON our_angles             FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all" ON our_scripts            FOR ALL TO service_role USING (true) WITH CHECK (true);
