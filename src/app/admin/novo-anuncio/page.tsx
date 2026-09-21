import { Upload, Plus, Image as ImageIcon, CheckCircle2 } from "lucide-react";

export default function NovoAnuncio() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Novo Anúncio</h1>
        <p className="text-zinc-400">Preencha os detalhes do produto para publicá-lo na plataforma.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-zinc-800 pb-4">Informações Básicas</h3>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Título do Anúncio</label>
                <input 
                  type="text" 
                  placeholder="Ex: iPhone 14 Pro Max 256GB"
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Categoria</label>
                  <select className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none">
                    <option value="">Selecione uma categoria</option>
                    <option value="eletronicos">Eletrônicos e Celulares</option>
                    <option value="veiculos">Veículos</option>
                    <option value="imoveis">Imóveis</option>
                    <option value="servicos">Serviços</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Condição</label>
                  <select className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none">
                    <option value="novo">Novo</option>
                    <option value="usado">Usado</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Descrição Detalhada</label>
                <textarea 
                  rows={5}
                  placeholder="Descreva seu produto com o máximo de detalhes possível..."
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                />
              </div>
            </form>
          </div>

          <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-zinc-800 pb-4">Mídia</h3>
            
            <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors cursor-pointer group">
              <div className="h-16 w-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-white font-medium mb-1">Clique para enviar ou arraste os arquivos aqui</p>
              <p className="text-zinc-500 text-sm">PNG, JPG ou WEBP até 10MB (Máx. 10 fotos)</p>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800/50">
                  <ImageIcon className="h-8 w-8 text-zinc-700" />
                </div>
              ))}
              <div className="aspect-square bg-zinc-900/50 border border-zinc-800 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-zinc-800 transition-colors">
                <Plus className="h-8 w-8 text-zinc-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Pricing and Actions */}
        <div className="space-y-6">
          <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-zinc-800 pb-4">Preço e Estoque</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Valor (R$)</label>
                <input 
                  type="text" 
                  placeholder="0,00"
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-xl"
                />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="negociar" className="w-5 h-5 rounded border-zinc-800 bg-zinc-900 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0" />
                <label htmlFor="negociar" className="text-sm text-zinc-300">Aceito propostas (negociável)</label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Localização</label>
                <input 
                  type="text" 
                  placeholder="CEP ou Cidade/Estado"
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 p-6 rounded-2xl">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-white">Anúncio Verificado</h4>
                  <p className="text-xs text-zinc-500 mt-1">Como administrador, seus anúncios recebem selo de verificação automático.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-white">Destaque Premium</h4>
                  <p className="text-xs text-zinc-500 mt-1">Sempre listados no topo dos resultados de busca.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2">
                <Upload className="h-5 w-5" />
                Publicar Anúncio
              </button>
              <button className="w-full mt-3 bg-transparent hover:bg-zinc-900 text-zinc-400 font-medium py-3 px-4 rounded-xl transition-colors">
                Salvar como rascunho
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
