import Link from 'next/link';
import { ads as mockAds } from '@/data/ads';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    categoria?: string;
    q?: string;
    localizacao?: string;
  }>;
}

export default async function AnunciosPage({ searchParams }: PageProps) {
  const { categoria, q, localizacao } = await searchParams;
  const supabase = await createClient();

  // Buscar todos os anúncios ativos do Supabase
  let query = supabase
    .from('anuncios')
    .select('*')
    .eq('status', 'ativo')
    .order('criado_em', { ascending: false });

  if (categoria) {
    query = query.eq('categoria', categoria.toLowerCase());
  }

  if (q) {
    query = query.ilike('titulo', `%${q}%`);
  }

  if (localizacao) {
    query = query.ilike('localizacao', `%${localizacao}%`);
  }

  const { data: dbAds } = await query;

  // Formatar anúncios do banco
  const realAdsFormatted = (dbAds || []).map(ad => ({
    id: ad.id,
    title: ad.titulo,
    price: Number(ad.preco),
    currency: 'R$',
    image: ad.fotos?.[0] || 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=600&auto=format&fit=crop',
    location: ad.localizacao,
    category: ad.categoria,
    postedAt: new Date(ad.criado_em).toLocaleDateString('pt-BR'),
    isFeatured: true,
  }));

  // Filtrar dados de mock compatíveis se aplicável
  let filteredMockAds = mockAds;
  if (categoria) {
    filteredMockAds = filteredMockAds.filter(a => a.category.toLowerCase() === categoria.toLowerCase());
  }
  if (q) {
    filteredMockAds = filteredMockAds.filter(a => a.title.toLowerCase().includes(q.toLowerCase()));
  }
  if (localizacao) {
    filteredMockAds = filteredMockAds.filter(a => a.location.toLowerCase().includes(localizacao.toLowerCase()));
  }

  // Lista final combinada (prioridade banco de dados)
  const allAds = [...realAdsFormatted, ...filteredMockAds];

  const categories = [
    { id: 'veiculos', label: 'Veículos' },
    { id: 'eletronicos', label: 'Eletrônicos e Celulares' },
    { id: 'imoveis', label: 'Imóveis' },
    { id: 'moveis', label: 'Móveis e Decoração' },
    { id: 'empregos', label: 'Empregos e Vagas' },
    { id: 'esportes', label: 'Esportes e Lazer' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'moda', label: 'Moda e Beleza' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600">Início</Link> &gt; <span>Anúncios</span>
            {categoria && <span className="text-blue-600 font-medium"> &gt; {categoria}</span>}
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {categoria ? `Anúncios em ${categoria.toUpperCase()}` : 'Todos os Anúncios'}
          </h1>
          <p className="text-gray-500 mt-1">Encontramos {allAds.length} resultados para a sua busca.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-200">
              <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Filtros</h2>
              
              <form action="/anuncios" method="GET">
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700">Pesquisar</h3>
                  <input 
                    type="text" 
                    name="q"
                    defaultValue={q || ''}
                    placeholder="Ex: Carro, Smartphone..." 
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-gray-700">Categorias</h3>
                  <div className="space-y-1.5">
                    <Link
                      href="/anuncios"
                      className={`block px-2.5 py-1.5 rounded-lg text-sm transition-colors ${!categoria ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      Todas as Categorias
                    </Link>
                    {categories.map((cat) => {
                      const isSelected = categoria?.toLowerCase() === cat.id;
                      return (
                        <Link
                          key={cat.id}
                          href={`/anuncios?categoria=${cat.id}`}
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                            isSelected ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span>{cat.label}</span>
                          {isSelected && <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Ativo</span>}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700">Localização</h3>
                  <input 
                    type="text" 
                    name="localizacao"
                    defaultValue={localizacao || ''}
                    placeholder="Cidade ou Estado" 
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors font-medium text-sm shadow-xs"
                >
                  Filtrar
                </button>
              </form>
            </div>
          </aside>

          {/* Ad List */}
          <main className="w-full lg:w-3/4">
            {/* Grid */}
            {allAds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allAds.map((ad) => (
                  <div key={ad.id} className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow border border-gray-200 flex flex-col">
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      <img 
                        src={ad.image} 
                        alt={ad.title} 
                        className="w-full h-full object-cover" 
                        loading="lazy"
                      />
                      {ad.isFeatured && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-xs">
                          Destaque
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded capitalize backdrop-blur-xs">
                        {ad.category}
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <Link href={`/anuncios/${ad.id}`}>
                        <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-blue-600 cursor-pointer line-clamp-2 transition-colors">
                          {ad.title}
                        </h3>
                      </Link>
                      <div className="text-orange-500 font-bold text-xl mb-4">
                        R$ {ad.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      
                      <div className="mt-auto flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                        <span className="flex items-center gap-1 truncate max-w-[60%]">
                          📍 {ad.location}
                        </span>
                        <span className="flex items-center gap-1 whitespace-nowrap text-xs">
                          🕒 {ad.postedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
                <p className="text-gray-500 text-lg mb-4">Nenhum anúncio encontrado para esses filtros.</p>
                <Link href="/anuncios" className="text-blue-600 font-medium hover:underline">
                  Ver todos os anúncios
                </Link>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
