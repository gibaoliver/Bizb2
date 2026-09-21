import Link from 'next/link';
import { ads } from '@/data/ads';

export default function AnunciosPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Todos os Anúncios</h1>
          <p className="text-gray-500 mt-2">Encontramos {ads.length} resultados para a sua busca.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Filtros</h2>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Pesquisar</h3>
                <input 
                  type="text" 
                  placeholder="Ex: Smartphone" 
                  className="w-full px-3 py-2 border rounded outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Categorias</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between items-center hover:text-blue-600 cursor-pointer">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" /> Veículos
                    </label>
                    <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">1</span>
                  </li>
                  <li className="flex justify-between items-center hover:text-blue-600 cursor-pointer">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" /> Eletrônicos
                    </label>
                    <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">2</span>
                  </li>
                  <li className="flex justify-between items-center hover:text-blue-600 cursor-pointer">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" /> Imóveis
                    </label>
                    <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">1</span>
                  </li>
                  <li className="flex justify-between items-center hover:text-blue-600 cursor-pointer">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" /> Móveis
                    </label>
                    <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">2</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Faixa de Preço</h3>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-1/2 px-3 py-2 border rounded outline-none text-sm" />
                  <span className="text-gray-400">-</span>
                  <input type="number" placeholder="Max" className="w-1/2 px-3 py-2 border rounded outline-none text-sm" />
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors font-medium">
                Aplicar Filtros
              </button>
            </div>
          </aside>

          {/* Ad List */}
          <main className="w-full lg:w-3/4">
            
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">Mostrando 1 - {ads.length} de {ads.length} anúncios</div>
              <select className="border rounded px-3 py-1 outline-none text-gray-600 text-sm">
                <option>Mais recentes</option>
                <option>Menor preço</option>
                <option>Maior preço</option>
              </select>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {ads.map((ad) => (
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

          </main>
        </div>
      </div>
    </div>
  );
}
