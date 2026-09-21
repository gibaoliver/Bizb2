import Link from "next/link";
import { MessageCircle, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";

export default function ComoAnunciarPage() {
  const whatsappNumber = "5511999999999"; // Exemplo, pode ser ajustado
  const whatsappMessage = "Olá! Gostaria de saber mais sobre como anunciar no BIZB.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Anuncie no <span className="text-blue-600">BIZB</span> e aumente suas vendas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Uma plataforma exclusiva, moderna e com alto alcance para dar destaque aos seus produtos e serviços.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Alta Visibilidade</h3>
            <p className="text-gray-600">
              Seu anúncio posicionado estrategicamente para alcançar o público certo e maximizar suas chances de negócio.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Ambiente Seguro</h3>
            <p className="text-gray-600">
              Plataforma monitorada e anúncios verificados para garantir a melhor experiência para compradores e vendedores.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="h-14 w-14 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-7 w-7 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Gestão Profissional</h3>
            <p className="text-gray-600">
              Administração direta e suporte humanizado. Você fala direto com a nossa equipe para anunciar.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-200 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pronto para começar?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Para manter a qualidade e segurança da plataforma, a inclusão de novos anúncios é feita diretamente pela nossa equipe comercial.
          </p>
          
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <MessageCircle className="h-6 w-6" />
            Falar no WhatsApp
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Atendimento de segunda a sexta, das 9h às 18h.
          </p>
        </div>
      </main>
    </div>
  );
}
