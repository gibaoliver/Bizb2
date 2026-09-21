import Link from 'next/link';
import { ads as mockAds } from '@/data/ads';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient();

  // Buscar anúncios reais do Supabase
  const { data: dbAds } = await supabase
    .from('anuncios')
    .select('*')
    .eq('status', 'ativo')
    .order('criado_em', { ascending: false });

  // Categorias disponíveis e ícones
  const categoriesList = [
    { id: 'veiculos', label: 'Veículos', icon: '🚗' },
    { id: 'eletronicos', label: 'Eletrônicos', icon: '📱' },
    { id: 'imoveis', label: 'Imóveis', icon: '🏠' },
    { id: 'moveis', label: 'Móveis', icon: '🛋️' },
    { id: 'empregos', label: 'Empregos', icon: '💼' },
    { id: 'esportes', label: 'Esportes', icon: '⚽' },
    { id: 'servicos', label: 'Serviços', icon: '🛠️' },
    { id: 'moda', label: 'Moda', icon: '👕' },
  ];

  // Calcular contagem de anúncios por categoria (reais do banco + dados de demonstração)
  const categoryCounts: Record<string, number> = {};
  categoriesList.forEach(c => { categoryCounts[c.id] = 0; });

  if (dbAds) {
    dbAds.forEach(ad => {
      const cat = ad.categoria?.toLowerCase();
      if (categoryCounts[cat] !== undefined) {
        categoryCounts[cat] += 1;
      }
    });
  }

  // Contar também mocks que não conflitam
  mockAds.forEach(ad => {
    const cat = ad.category?.toLowerCase();
    if (categoryCounts[cat] !== undefined) {
      categoryCounts[cat] += 1;
    }
  });

  // Montar lista de anúncios recentes (reais do Supabase primeiro, depois mocks)
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

  const allRecentAds = [...realAdsFormatted, ...mockAds].slice(0, 8);

  return (
    <div>
      {/* Hero / Banner Section */}
      <section className="bg-blue-700 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Encontre Tudo o que Você Precisa</h1>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            O maior mercado de classificados do Brasil. Compre, venda e descubra ofertas incríveis perto de você.
          </p>
          
          {/* Main Search */}
          <form action="/anuncios" method="GET" className="max-w-4xl mx-auto bg-white p-2 md:p-3 rounded-lg md:rounded-xl shadow-lg flex flex-col md:flex-row gap-2 text-left">
            <div className="flex-grow flex items-center border-b md:border-b-0 md:border-r border-gray-200">
              <input 
                type="text" 
                name="q"
                placeholder="O que você está procurando?" 
                className="w-full px-4 py-3 outline-none text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="border-b md:border-b-0 md:border-r border-gray-200 md:w-56 flex items-center">
              <select 
                name="categoria"
                defaultValue=""
                className="w-full px-4 py-3 outline-none text-gray-700 bg-transparent cursor-pointer"
              >
                <option value="">Todas as Categorias</option>
                <option value="veiculos">Veículos</option>
                <option value="eletronicos">Eletrônicos e Celulares</option>
                <option value="imoveis">Imóveis</option>
                <option value="moveis">Móveis e Decoração</option>
                <option value="empregos">Empregos e Vagas</option>
                <option value="esportes">Esportes e Lazer</option>
                <option value="servicos">Serviços</option>
                <option value="moda">Moda e Beleza</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div className="border-b md:border-b-0 md:border-r border-gray-200 md:w-52 flex items-center">
              <input 
                type="text" 
                name="localizacao"
                placeholder="Localização" 
                className="w-full px-4 py-3 outline-none text-gray-800 placeholder-gray-400"
              />
            </div>

            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-md md:rounded-lg transition-colors shadow-sm whitespace-nowrap">
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore as Principais Categorias</h2>
            <p className="text-gray-500">Navegue pelas nossas categorias mais populares para encontrar o que precisa.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {categoriesList.map((category) => (
              <Link 
                href={`/anuncios?categoria=${category.id}`} 
                key={category.id} 
                className="group block text-center p-6 border rounded-xl hover:shadow-lg hover:border-blue-500 transition-all bg-gray-50 hover:bg-white"
              >
                <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-2xl">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{category.label}</h3>
                <span className="text-sm text-gray-500 font-medium">
                  {categoryCounts[category.id] || 0} {categoryCounts[category.id] === 1 ? 'Anúncio' : 'Anúncios'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Anúncios Recentes</h2>
              <p className="text-gray-500">Confira as últimas listagens adicionadas na plataforma.</p>
            </div>
            <Link href="/anuncios" className="text-blue-600 font-medium hover:underline hidden md:block">
              Ver Todos →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allRecentAds.map((ad) => (
              <div key={ad.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border flex flex-col">
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
          
          <div className="text-center mt-10 md:hidden">
            <Link href="/anuncios" className="inline-block bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium shadow-xs">
              Ver Todos os Anúncios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
