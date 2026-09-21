'use client'

import { Upload, Plus, Image as ImageIcon, CheckCircle2, Loader2, X } from "lucide-react";
import { useState, useTransition, useRef } from "react";
import { createAnuncio } from "./actions";
import Image from "next/image";

export default function NovoAnuncio() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  // Imagens
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      if (files.length + newFiles.length > 10) {
        alert("Máximo de 10 fotos permitido.");
        return;
      }
      setFiles((prev) => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = (status: string) => async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    formData.append('status', status);
    
    // Adicionar as fotos
    files.forEach(file => {
      formData.append('fotos', file);
    });

    startTransition(async () => {
      const result = await createAnuncio(formData);
      if (result?.error) {
        setError(result.error);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Novo Anúncio</h1>
        <p className="text-zinc-400">Preencha os detalhes do produto para publicá-lo na plataforma.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* Como temos dois botões de submit (Publicar vs Rascunho), vamos interceptar via onSubmit condicional. 
          O ideal é capturar qual botão foi clicado. Para simplificar, transformaremos o form global em div e 
          cada seção será gerenciada, mas o mais fácil é um único form e usar formAction ou interceptar o submit. */}
      
      <form id="ad-form" onSubmit={handleSubmit('ativo')} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-zinc-800 pb-4">Informações Básicas</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Título do Anúncio</label>
                <input 
                  type="text" 
                  name="titulo"
                  required
                  placeholder="Ex: iPhone 14 Pro Max 256GB"
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Categoria</label>
                  <select name="categoria" required className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer">
                    <option value="">Selecione uma categoria</option>
                    <option value="veiculos">Veículos</option>
                    <option value="eletronicos">Eletrônicos e Celulares</option>
                    <option value="imoveis">Imóveis</option>
                    <option value="moveis">Móveis e Decoração</option>
                    <option value="empregos">Empregos e Vagas</option>
                    <option value="esportes">Esportes e Lazer</option>
                    <option value="servicos">Serviços</option>
                    <option value="moda">Moda e Beleza</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Condição</label>
                  <select name="condicao" required className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer">
                    <option value="novo">Novo</option>
                    <option value="usado">Usado</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Descrição Detalhada</label>
                <textarea 
                  name="descricao"
                  required
                  rows={5}
                  placeholder="Descreva seu produto com o máximo de detalhes possível..."
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-zinc-800 pb-4">Mídia</h3>
            
            <input 
              type="file" 
              multiple 
              accept="image/*, .png, .jpg, .jpeg, .webp, .gif, .avif, .bmp, .heic, .heif, .svg" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors cursor-pointer group"
            >
              <div className="h-16 w-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-white font-medium mb-1">Clique para enviar fotos</p>
              <p className="text-zinc-500 text-sm">PNG, JPG, WEBP, GIF, AVIF ou qualquer formato (Máx. 10 fotos)</p>
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {previews.map((preview, i) => (
                  <div key={i} className="aspect-square bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800/50 relative overflow-hidden group">
                    <Image src={preview} alt="Preview" fill className="object-cover" />
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                      className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {previews.length < 10 && (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square bg-zinc-900/50 border border-zinc-800 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-zinc-800 transition-colors"
                  >
                    <Plus className="h-8 w-8 text-zinc-600" />
                  </div>
                )}
              </div>
            )}
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
                  name="preco"
                  required
                  placeholder="0,00"
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-xl"
                />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" name="negociavel" id="negociavel" className="w-5 h-5 rounded border-zinc-800 bg-zinc-900 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0" />
                <label htmlFor="negociar" className="text-sm text-zinc-300">Aceito propostas (negociável)</label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Localização</label>
                <input 
                  type="text" 
                  name="localizacao"
                  required
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
              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
              >
                {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
                {isPending ? 'Publicando...' : 'Publicar Anúncio'}
              </button>
              
              {/* Botão de Rascunho intercepta o formulário de uma maneira ligeiramente diferente */}
              <button 
                type="button" 
                disabled={isPending}
                onClick={(e) => {
                  const form = document.getElementById('ad-form') as HTMLFormElement;
                  if(form.reportValidity()) {
                    handleSubmit('rascunho')(e as any);
                  }
                }}
                className="w-full mt-3 bg-transparent hover:bg-zinc-900 disabled:opacity-50 text-zinc-400 font-medium py-3 px-4 rounded-xl transition-colors"
              >
                Salvar como rascunho
              </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
