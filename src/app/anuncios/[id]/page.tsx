import { ads } from '@/data/ads';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function AdDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const ad = ads.find(a => a.id === resolvedParams.id);
  
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
          <span className="text-gray-800">{ad.category}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left) */}
          <main className="w-full lg:w-2/3">
            {/* Header & Title */}
            <div className="bg-white p-6 rounded-t-lg border-x border-t">
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
            <div className="bg-black relative h-[400px] md:h-[500px]">
              <img src={ad.image} alt={ad.title} className="w-full h-full object-contain" />
            </div>

            {/* Thumbnail Gallery */}
            <div className="bg-white border-x border-b p-4 rounded-b-lg mb-8 flex gap-2 overflow-x-auto">
              {ad.gallery.map((img, idx) => (
                <div key={idx} className="w-24 h-24 flex-shrink-0 cursor-pointer border-2 hover:border-blue-500 rounded overflow-hidden">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Details Section */}
            <div className="bg-white p-6 rounded-lg border mb-8">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Detalhes do Anúncio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(ad.features).map(([key, value]) => (
                  <div key={key} className="flex justify-between bg-gray-50 p-3 rounded">
                    <span className="text-gray-500 font-medium">{key}:</span>
                    <span className="font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white p-6 rounded-lg border mb-8">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Descrição</h2>
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {ad.description}
              </div>
            </div>
          </main>

          {/* Sidebar (Right) */}
          <aside className="w-full lg:w-1/3 space-y-6">
            
            {/* Seller Card */}
            <div className="bg-white p-6 rounded-lg border shadow-sm text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold mx-auto mb-4">
                {ad.seller.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{ad.seller.name}</h3>
              <p className="text-sm text-gray-500 mb-6">Membro desde {ad.seller.memberSince}</p>
              
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium mb-3 transition-colors text-lg flex items-center justify-center gap-2">
                📞 Ver Telefone
              </button>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg flex items-center justify-center gap-2">
                ✉️ Enviar Mensagem
              </button>
            </div>

            {/* Safety Tips */}
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                🛡️ Dicas de Segurança
              </h3>
              <ul className="text-sm text-yellow-700 space-y-2 list-disc pl-5">
                <li>Encontre o vendedor em um lugar público.</li>
                <li>Verifique o item antes de comprar.</li>
                <li>Pague apenas depois de pegar o item.</li>
                <li>Cuidado com ofertas irreais.</li>
              </ul>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
