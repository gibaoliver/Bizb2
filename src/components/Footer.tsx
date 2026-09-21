import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* About Widget */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">BIZB<span className="text-orange-500">.</span></h3>
            <p className="mb-6 text-gray-400">
              A plataforma de classificados mais confiável para comprar, vender e encontrar tudo o que você precisa na sua região.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">FB</a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors">TW</a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors">IG</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li><Link href="/sobre" className="hover:text-orange-500 transition-colors">Sobre Nós</Link></li>
              <li><Link href="/contato" className="hover:text-orange-500 transition-colors">Fale Conosco</Link></li>
              <li><Link href="/planos" className="hover:text-orange-500 transition-colors">Planos e Preços</Link></li>
              <li><Link href="/faq" className="hover:text-orange-500 transition-colors">Dúvidas Frequentes</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Principais Categorias</h4>
            <ul className="space-y-3">
              <li><Link href="/categoria/veiculos" className="hover:text-orange-500 transition-colors">Veículos</Link></li>
              <li><Link href="/categoria/eletronicos" className="hover:text-orange-500 transition-colors">Eletrônicos</Link></li>
              <li><Link href="/categoria/imoveis" className="hover:text-orange-500 transition-colors">Imóveis</Link></li>
              <li><Link href="/categoria/empregos" className="hover:text-orange-500 transition-colors">Vagas de Emprego</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Informações de Contato</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex gap-3">
                <span className="text-orange-500">📍</span>
                <span>Rua dos Classificados, 123, São Paulo - SP</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500">📞</span>
                <span>+55 11 99999-9999</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500">✉️</span>
                <span>suporte@bizb.com.br</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Bizb. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacidade" className="hover:text-white">Política de Privacidade</Link>
            <Link href="/termos" className="hover:text-white">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
