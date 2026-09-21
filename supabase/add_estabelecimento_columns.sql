-- ==============================================================================
-- ADICIONAR DADOS DO ESTABELECIMENTO / LOJA NA TABELA ANUNCIOS
-- ==============================================================================

-- 1. Adicionar colunas de estabelecimento/loja
ALTER TABLE public.anuncios 
ADD COLUMN IF NOT EXISTS nome_estabelecimento TEXT,
ADD COLUMN IF NOT EXISTS logo_estabelecimento TEXT,
ADD COLUMN IF NOT EXISTS whatsapp_estabelecimento TEXT;

-- 2. Atualizar comentários informativos
COMMENT ON COLUMN public.anuncios.nome_estabelecimento IS 'Nome da loja ou estabelecimento dono do anúncio';
COMMENT ON COLUMN public.anuncios.logo_estabelecimento IS 'URL da logomarca da loja ou estabelecimento';
COMMENT ON COLUMN public.anuncios.whatsapp_estabelecimento IS 'WhatsApp de contato direto com o estabelecimento';
