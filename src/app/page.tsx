import Link from 'next/link';

export default function Home() {
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
          <div className="max-w-4xl mx-auto bg-white p-3 rounded-lg shadow-lg flex flex-col md:flex-row gap-2">
            <input 
              type="text" 
              placeholder="O que você está procurando?" 
              className="flex-grow px-4 py-3 outline-none text-gray-800 border-b md:border-b-0 md:border-r"
            />
            <input 
              type="text" 
              placeholder="Localização" 
              className="px-4 py-3 outline-none text-gray-800 border-b md:border-b-0 md:border-r md:w-64"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md transition-colors font-medium">
              Buscar
            </button>
          </div>
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
              { id: 'veiculos', label: 'Veículos' },
              { id: 'eletronicos', label: 'Eletrônicos' },
              { id: 'imoveis', label: 'Imóveis' },
              { id: 'empregos', label: 'Empregos' },
              { id: 'servicos', label: 'Serviços' },
              { id: 'moveis', label: 'Móveis' }
            ].map((category) => (
              <Link href={`/categoria/${category.id}`} key={category.id} className="group block text-center p-6 border rounded-xl hover:shadow-lg hover:border-blue-500 transition-all bg-gray-50 hover:bg-white">
                <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  📁
                </div>
                <h3 className="font-semibold text-gray-800">{category.label}</h3>
                <span className="text-sm text-gray-500">120 Anúncios</span>
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border">
                <div className="h-48 bg-gray-200 relative">
                   <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Destaque</div>
                   <div className="absolute bottom-2 left-2 bg-gray-900/70 text-white text-xs px-2 py-1 rounded">Eletrônicos</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-blue-600 cursor-pointer line-clamp-1">
                    Smartphone Pro Max 256GB
                  </h3>
                  <div className="text-orange-500 font-bold text-xl mb-4">R$ 4.899,00</div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                    <span className="flex items-center gap-1">📍 São Paulo</span>
                    <span className="flex items-center gap-1">🕒 Há 2 horas</span>
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
