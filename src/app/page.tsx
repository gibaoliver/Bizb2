import Link from 'next/link';
import { ads } from '@/data/ads';

export default function Home() {
  // Pegamos apenas os 8 anúncios mais recentes (ou destaques) para a Home
  const recentAds = ads.slice(0, 8);

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
                <option value="eletronicos">Eletrônicos</option>
                <option value="imoveis">Imóveis</option>
                <option value="empregos">Empregos</option>
                <option value="esportes">Esportes</option>
                <option value="moveis">Móveis</option>
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { id: 'veiculos', label: 'Veículos', count: 12 },
              { id: 'eletronicos', label: 'Eletrônicos', count: 24 },
              { id: 'imoveis', label: 'Imóveis', count: 8 },
              { id: 'empregos', label: 'Empregos', count: 3 },
              { id: 'esportes', label: 'Esportes', count: 5 },
              { id: 'moveis', label: 'Móveis', count: 15 }
            ].map((category) => (
              <Link href={`/anuncios?categoria=${category.id}`} key={category.id} className="group block text-center p-6 border rounded-xl hover:shadow-lg hover:border-blue-500 transition-all bg-gray-50 hover:bg-white">
                <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  📁
                </div>
                <h3 className="font-semibold text-gray-800">{category.label}</h3>
                <span className="text-sm text-gray-500">{category.count} Anúncios</span>
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
              <p className="text-gray-500">Confira as últimas listagens adicionadas pela nossa comunidade.</p>
            </div>
            <Link href="/anuncios" className="text-blue-600 font-medium hover:underline hidden md:block">
              Ver Todos →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentAds.map((ad) => (
              <div key={ad.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border flex flex-col">
                <div className="h-48 bg-gray-200 relative">
                   <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
                   {ad.isFeatured && (
                     <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Destaque</div>
                   )}
                   <div className="absolute bottom-2 left-2 bg-gray-900/70 text-white text-xs px-2 py-1 rounded">{ad.category}</div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <Link href={`/anuncios/${ad.id}`}>
                    <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-blue-600 cursor-pointer line-clamp-2">
                      {ad.title}
                    </h3>
                  </Link>
                  <div className="text-orange-500 font-bold text-xl mb-4">{ad.currency} {ad.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                  
                  <div className="mt-auto flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                    <span className="flex items-center gap-1 truncate max-w-[60%]">📍 {ad.location}</span>
                    <span className="flex items-center gap-1 whitespace-nowrap">🕒 {ad.postedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10 md:hidden">
            <Link href="/anuncios" className="inline-block bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium">
              Ver Todos os Anúncios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
