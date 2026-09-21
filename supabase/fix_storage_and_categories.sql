-- ==============================================================================
-- AJUSTE DE FORMATOS DE IMAGEM (STORAGE) E CATEGORIAS
-- ==============================================================================

-- 1. Garantir que o bucket de imagens aceite qualquer formato de imagem e tamanho até 50MB
UPDATE storage.buckets
SET 
  public = true,
  file_size_limit = 52428800, -- 50MB
  allowed_mime_types = null    -- Sem restrição de formato: aceita PNG, JPG, JPEG, WEBP, GIF, AVIF, HEIC, etc.
WHERE id = 'imagens_anuncios';

-- Se o bucket ainda não existir, criar com permissão irrestrita
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('imagens_anuncios', 'imagens_anuncios', true, 52428800, null)
ON CONFLICT (id) DO UPDATE 
SET 
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = null;

-- 2. Políticas de Acesso ao Storage
DROP POLICY IF EXISTS "Imagens públicas" ON storage.objects;
CREATE POLICY "Imagens públicas"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'imagens_anuncios' );

DROP POLICY IF EXISTS "Apenas autenticados gerenciam imagens" ON storage.objects;
CREATE POLICY "Apenas autenticados gerenciam imagens"
  ON storage.objects FOR ALL
  USING ( auth.role() = 'authenticated' AND bucket_id = 'imagens_anuncios' );

-- 3. Índices para distribuição rápida por categoria e status no banco de dados
CREATE INDEX IF NOT EXISTS idx_anuncios_categoria ON public.anuncios (categoria);
CREATE INDEX IF NOT EXISTS idx_anuncios_status ON public.anuncios (status);
CREATE INDEX IF NOT EXISTS idx_anuncios_criado_em ON public.anuncios (criado_em DESC);
