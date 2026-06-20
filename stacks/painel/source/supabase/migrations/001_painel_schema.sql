-- ============================================================
-- Painel de Controle — Schema inicial
-- Rodar no Supabase SQL Editor: supabase.com → projeto → SQL Editor
-- ============================================================

-- Segmentos de mercado
CREATE TABLE IF NOT EXISTS segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT DEFAULT '📦',
  color TEXT DEFAULT '#6366f1',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Produtos por segmento
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  segment_id UUID NOT NULL REFERENCES segments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  expert_name TEXT,
  expert_avatar_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'archived')),
  launch_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projetos de pesquisa (Phase 1 — antes do produto existir)
CREATE TABLE IF NOT EXISTS research_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  hypothesis TEXT,
  target_segment TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'concluded', 'promoted')),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adicionar product_id e research_project_id nas tabelas do Espião
ALTER TABLE competitor_ads
  ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS research_project_id UUID REFERENCES research_projects(id) ON DELETE SET NULL;

-- Índices
CREATE INDEX IF NOT EXISTS idx_products_segment_id ON products(segment_id);
CREATE INDEX IF NOT EXISTS idx_research_projects_product_id ON research_projects(product_id);
CREATE INDEX IF NOT EXISTS idx_competitor_ads_product_id ON competitor_ads(product_id);
CREATE INDEX IF NOT EXISTS idx_competitor_ads_research_project_id ON competitor_ads(research_project_id);

-- RLS desabilitado para acesso via service_role do painel
-- (ajustar se adicionar auth ao painel)
