import { ads as mockAds } from '@/data/ads';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdGallery from '@/components/AdGallery';
import { 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  MessageCircle, 
  ShieldCheck, 
  ArrowLeft, 
  Share2, 
  BadgeCheck, 
  Tag, 
  Sparkles,
  Info
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const supabase = await createClient();

  // 1. Tentar buscar no banco de dados Supabase
  let ad: any = null;

  const { data: dbAd } = await supabase
    .from('anuncios')
    .select('*')
    .eq('id', id)
    .single();

  if (dbAd) {
    ad = {
      id: dbAd.id,
      title: dbAd.titulo,
      price: Number(dbAd.preco),
      currency: 'R$',
      images: dbAd.fotos && dbAd.fotos.length > 0 
        ? dbAd.fotos 
        : ['https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=600&auto=format&fit=crop'],
      location: dbAd.localizacao,
      category: dbAd.categoria,
      condition: dbAd.condicao || 'usado',
      negotiable: dbAd.negociavel,
      status: dbAd.status || 'ativo',
      postedAt: new Date(dbAd.criado_em).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      description: dbAd.descricao,
      seller: {
        name: 'Super Admin Bizb',
        phone: '+55 11 99999-9999',
        email: 'suporte@bizb.com.br',
        verified: true,
      }
    };
  } else {
    // 2. Fallback para os mock ads
    const foundMock = mockAds.find(a => a.id === id);
    if (foundMock) {
      ad = {
        id: foundMock.id,
        title: foundMock.title,
        price: foundMock.price,
        currency: 'R$',
        images: foundMock.gallery && foundMock.gallery.length > 0 ? foundMock.gallery : [foundMock.image],
        location: foundMock.location,
        category: foundMock.category,
        condition: 'usado',
        negotiable: false,
        status: 'ativo',
        postedAt: foundMock.postedAt,
        description: foundMock.description,
        seller: foundMock.seller || {
          name: 'Classificados Bizb',
          phone: '+55 11 99999-9999',
          email: 'suporte@bizb.com.br',
          verified: true
        }
      };
    }
  }

  if (!ad) {
    notFound();
  }

  const categoryNames: Record<string, string> = {
    veiculos: 'Veículos',
    eletronicos: 'Eletrônicos e Celulares',
    imoveis: 'Imóveis',
    moveis: 'Móveis e Decoração',
    empregos: 'Empregos e Vagas',
    esportes: 'Esportes e Lazer',
    servicos: 'Serviços',
    moda: 'Moda e Beleza',
    outros: 'Outros'
  };

  const categoryLabel = categoryNames[ad.category?.toLowerCase()] || ad.category;

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no anúncio "${ad.title}" anunciado no BIZB por R$ ${ad.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}. Ainda está disponível?`
  );

  return (
    <div className="bg-slate-50 min-h-screen py-6 md:py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Top Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link 
            href="/anuncios" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors bg-white px-3.5 py-2 rounded-xl shadow-xs border border-slate-200/70"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Anúncios
          </Link>

          <nav className="text-sm text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">Início</Link>
            <span>/</span>
            <Link href="/anuncios" className="hover:text-blue-600 transition-colors">Anúncios</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">{categoryLabel}</span>
          </nav>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coluna Principal (Esquerda - 8 colunas) */}
          <main className="lg:col-span-8 space-y-6">
            
            {/* Galeria de Fotos Interativa */}
            <AdGallery 
              images={ad.images} 
              title={ad.title} 
              category={categoryLabel} 
              condition={ad.condition} 
            />

            {/* Informações Principais do Produto */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200/80 space-y-6">
              
              {/* Título e Metadados */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {categoryLabel}
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Anúncio Ativo
                  </span>
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {ad.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{ad.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Publicado em {ad.postedAt}</span>
                  </div>
                </div>
              </div>

              {/* Especificações em Cards Elegantes */}
              <div className="pt-2">
                <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  Especificações do Item
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 border border-slate-200/70 p-3.5 rounded-2xl">
                    <span className="text-xs text-slate-400 block font-medium">Condição</span>
                    <span className="text-sm font-bold text-slate-800 capitalize mt-0.5 block">
                      {ad.condition === 'novo' ? 'Produto Novo' : 'Item Usado'}
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/70 p-3.5 rounded-2xl">
                    <span className="text-xs text-slate-400 block font-medium">Categoria</span>
                    <span className="text-sm font-bold text-slate-800 capitalize mt-0.5 block truncate">
                      {categoryLabel}
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/70 p-3.5 rounded-2xl col-span-2 sm:col-span-1">
                    <span className="text-xs text-slate-400 block font-medium">Negociação</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5 block">
                      {ad.negotiable ? 'Preço Negociável' : 'Valor Fixo'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Descrição Detalhada */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Descrição do Produto
                </h3>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                  {ad.description}
                </p>
              </div>

            </div>

          </main>

          {/* Coluna Lateral (Direita - 4 colunas) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Card Principal de Preço e Contato WhatsApp */}
            <div className="bg-white rounded-3xl p-6 md:p-7 shadow-sm border border-slate-200/80 space-y-5">
              
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Valor do Anúncio
                </span>
                <div className="text-3xl sm:text-4xl font-black text-blue-700 mt-1 tracking-tight">
                  R$ {ad.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                {ad.negotiable && (
                  <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mt-2">
                    Aceita propostas
                  </span>
                )}
              </div>

              {/* Botão de WhatsApp em Destaque */}
              <a 
                href={`https://wa.me/5511999999999?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-5 rounded-2xl transition-all shadow-[0_4px_16px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2.5 text-base group cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                <span>Conversar no WhatsApp</span>
              </a>

              <div className="text-center">
                <span className="text-xs text-slate-400">Resposta rápida e contato direto</span>
              </div>

              {/* Vendedor Info */}
              <div className="pt-5 border-t border-slate-100 space-y-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Anunciante
                </span>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg shadow-xs">
                    {ad.seller?.name?.charAt(0) || 'B'}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      {ad.seller?.name || 'Classificados Bizb'}
                      <BadgeCheck className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Conta Verificada</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Dicas de Segurança */}
            <div className="bg-slate-100/70 rounded-3xl p-5 border border-slate-200/60 space-y-3">
              <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Dicas de Segurança Bizb</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                <li>Nunca realize transferências ou depósitos antes de ver o item pessoalmente.</li>
                <li>Dê preferência para encontros em locais públicos e movimentados.</li>
                <li>Confira todas as características do produto no ato da entrega.</li>
              </ul>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
