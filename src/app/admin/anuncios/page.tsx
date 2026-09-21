import { createClient } from "@/utils/supabase/server";
import { Package, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AnunciosPage() {
  const supabase = await createClient();

  const { data: anuncios, error } = await supabase
    .from("anuncios")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    console.error("Erro ao buscar anúncios:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Meus Anúncios</h1>
          <p className="text-zinc-400">Gerencie todos os anúncios da plataforma.</p>
        </div>
        <Link 
          href="/admin/novo-anuncio" 
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2 w-fit"
        >
          <Plus className="h-5 w-5" />
          Novo Anúncio
        </Link>
      </div>

      <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800/50">
          <h3 className="text-lg font-semibold text-white">Todos os Anúncios ({anuncios?.length || 0})</h3>
        </div>
        
        {anuncios && anuncios.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {anuncios.map((anuncio) => (
              <div key={anuncio.id} className="p-6 hover:bg-zinc-900/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-zinc-800 rounded-xl overflow-hidden relative shrink-0">
                    {anuncio.fotos && anuncio.fotos.length > 0 ? (
                      <img 
                        src={anuncio.fotos[0]} 
                        alt={anuncio.titulo}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-zinc-500" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-lg">{anuncio.titulo}</h4>
                    <p className="text-zinc-500 text-sm">
                      {anuncio.categoria} • {new Date(anuncio.criado_em).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 sm:text-right">
                  <div>
                    <div className="text-white font-medium text-lg">
                      R$ {anuncio.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block
                      ${anuncio.status === 'ativo' ? 'text-emerald-400 bg-emerald-400/10' : 
                        anuncio.status === 'rascunho' ? 'text-amber-400 bg-amber-400/10' : 
                        'text-zinc-400 bg-zinc-400/10'}`}
                    >
                      {anuncio.status.toUpperCase()}
                    </span>
                  </div>
                  <Link href={`/admin/novo-anuncio?id=${anuncio.id}`} className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors">
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <Package className="h-12 w-12 text-zinc-600 mb-4" />
            <h3 className="text-white font-medium mb-2">Nenhum anúncio encontrado</h3>
            <p className="text-zinc-500 text-sm max-w-md mx-auto">
              Você ainda não criou nenhum anúncio. Clique no botão "Novo Anúncio" para começar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
