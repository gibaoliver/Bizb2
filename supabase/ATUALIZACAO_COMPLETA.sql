-- ==============================================================================
-- BIZB - SCRIPT DE ATUALIZAÇÃO COMPLETA DO BANCO E STORAGE
-- SEGURO: Não apaga nenhum anúncio e pode ser executado a qualquer momento.
-- ==============================================================================

-- 1. ADICIONAR CAMPOS DO ESTABELECIMENTO / LOJA (Se ainda não existirem)
ALTER TABLE public.anuncios 
ADD COLUMN IF NOT EXISTS nome_estabelecimento TEXT,
ADD COLUMN IF NOT EXISTS logo_estabelecimento TEXT,
ADD COLUMN IF NOT EXISTS whatsapp_estabelecimento TEXT;

-- 2. ÍNDICES DE PERFORMANCE (Categorias, Status e Data)
CREATE INDEX IF NOT EXISTS idx_anuncios_categoria ON public.anuncios (categoria);
CREATE INDEX IF NOT EXISTS idx_anuncios_status ON public.anuncios (status);
CREATE INDEX IF NOT EXISTS idx_anuncios_criado_em ON public.anuncios (criado_em DESC);

-- 3. CONFIGURAR STORAGE PARA QUALQUER FORMATO DE IMAGEM (Até 50MB)
-- Garante que o bucket existe e aceita qualquer formato (JPG, PNG, WEBP, GIF, SVG, AVIF, HEIC, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('imagens_anuncios', 'imagens_anuncios', true, 52428800, null)
ON CONFLICT (id) DO UPDATE 
SET 
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = null;

-- 4. POLÍTICAS DE ACESSO DO STORAGE (Garantir leitura pública das imagens)
DROP POLICY IF EXISTS "Imagens públicas" ON storage.objects;
CREATE POLICY "Imagens públicas"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'imagens_anuncios' );

DROP POLICY IF EXISTS "Apenas autenticados gerenciam imagens" ON storage.objects;
CREATE POLICY "Apenas autenticados gerenciam imagens"
  ON storage.objects FOR ALL
  USING ( auth.role() = 'authenticated' AND bucket_id = 'imagens_anuncios' );
