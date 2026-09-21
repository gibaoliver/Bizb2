import Link from 'next/link';
import { User, PlusCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-xs border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tight text-blue-700 hover:opacity-90 transition-opacity">
          BIZB<span className="text-orange-500">.</span>
        </Link>

        {/* Actions: Entrar + Publicar Anúncio */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link 
            href="/login" 
            className="text-gray-700 hover:text-blue-600 font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base flex items-center gap-1.5"
          >
            <User className="w-4 h-4 text-gray-500" />
            <span>Entrar</span>
          </Link>

          <Link 
            href="/como-anunciar" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 sm:px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all text-sm sm:text-base flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publicar Anúncio</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
