import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 text-sm text-gray-600 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <span>📞 +55 11 99999-9999</span>
            <span>✉️ suporte@bizb.com.br</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-blue-600">Entrar</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-blue-700">
          BIZB<span className="text-orange-500">.</span>
        </Link>

        {/* Search Bar & Categories */}
        <div className="flex-grow max-w-2xl hidden lg:flex items-center border rounded-md overflow-hidden">
          <select className="px-4 py-3 bg-gray-50 border-r outline-none text-gray-700">
            <option>Todas as Categorias</option>
            <option>Veículos</option>
            <option>Eletrônicos</option>
            <option>Imóveis</option>
          </select>
          <input 
            type="text" 
            placeholder="O que você está procurando?" 
            className="flex-grow px-4 py-3 outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 transition-colors">
            Buscar
          </button>
        </div>

        {/* Action Button */}
        <Link 
          href="/como-anunciar" 
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          + Publicar Anúncio
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="border-t lg:hidden">
        <div className="container mx-auto px-4 flex justify-between py-3 overflow-x-auto gap-4">
            <Link href="/categoria/veiculos" className="text-gray-700 whitespace-nowrap hover:text-blue-600">Veículos</Link>
            <Link href="/categoria/eletronicos" className="text-gray-700 whitespace-nowrap hover:text-blue-600">Eletrônicos</Link>
            <Link href="/categoria/imoveis" className="text-gray-700 whitespace-nowrap hover:text-blue-600">Imóveis</Link>
        </div>
      </div>
    </header>
  );
}
