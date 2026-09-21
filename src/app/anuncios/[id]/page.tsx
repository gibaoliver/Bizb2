import { ads as mockAds } from '@/data/ads';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
      image: dbAd.fotos?.[0] || 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=600&auto=format&fit=crop',
      gallery: dbAd.fotos && dbAd.fotos.length > 0 ? dbAd.fotos : ['https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=600&auto=format&fit=crop'],
      location: dbAd.localizacao,
      category: dbAd.categoria,
      postedAt: new Date(dbAd.criado_em).toLocaleDateString('pt-BR'),
      description: dbAd.descricao,
      features: {
        'Condição': dbAd.condicao === 'novo' ? 'Novo' : 'Usado',
        'Negociável': dbAd.negociavel ? 'Sim' : 'Não',
        'Status': dbAd.status,
      },
      seller: {
        name: 'Super Admin Bizb',
        phone: '+55 11 99999-9999',
        email: 'contato@bizb.com.br',
        verified: true,
      }
    };
  } else {
    // 2. Fallback para os mock ads
    const foundMock = mockAds.find(a => a.id === id);
    if (foundMock) {
      ad = foundMock;
    }
  }

  if (!ad) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex gap-2">
          <Link href="/" className="hover:text-blue-600">Início</Link> &gt; 
          <Link href="/anuncios" className="hover:text-blue-600">Anúncios</Link> &gt; 
          <span className="text-gray-800 capitalize">{ad.category}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left) */}
          <main className="w-full lg:w-2/3">
            {/* Header & Title */}
            <div className="bg-white p-6 rounded-t-xl border-x border-t border-gray-200">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{ad.title}</h1>
                <div className="text-2xl md:text-3xl font-bold text-orange-500 whitespace-nowrap">
                  {ad.currency} {ad.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </div>
              </div>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>📍 {ad.location}</span>
                <span>🕒 Publicado {ad.postedAt}</span>
              </div>
            </div>

            {/* Main Image Gallery */}
            <div className="bg-black relative h-[350px] md:h-[450px] flex items-center justify-center">
              <img 
                src={ad.image} 
                alt={ad.title} 
                className="max-w-full max-h-full object-contain" 
                loading="lazy"
              />
            </div>

            {/* Thumbnail Gallery */}
            {ad.gallery && ad.gallery.length > 1 && (
              <div className="bg-white border-x border-b border-gray-200 p-4 rounded-b-xl mb-8 flex gap-2 overflow-x-auto">
                {ad.gallery.map((img: string, idx: number) => (
                  <div key={idx} className="w-20 h-20 flex-shrink-0 border-2 hover:border-blue-500 rounded-lg overflow-hidden bg-gray-100">
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Details Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 my-8">
              <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Detalhes do Anúncio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(ad.features || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2 text-sm">
                    <span className="text-gray-500">{key}:</span>
                    <span className="font-semibold text-gray-800">{String(value)}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Descrição</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {ad.description}
              </p>
            </div>
          </main>

          {/* Sidebar (Right) */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-24 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Informações de Contato</h3>
                <p className="text-sm text-gray-500">Entre em contato para saber mais sobre este item.</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg space-y-2 border border-gray-100">
                <div className="font-semibold text-gray-800">{ad.seller?.name || 'Classificados Bizb'}</div>
                <div className="text-sm text-gray-600">📱 {ad.seller?.phone || '+55 11 99999-9999'}</div>
                <div className="text-sm text-gray-600">✉️ {ad.seller?.email || 'contato@bizb.com.br'}</div>
              </div>

              <a 
                href={`https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20an%C3%BAncio%3A%20${encodeURIComponent(ad.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                💬 Conversar no WhatsApp
              </a>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
