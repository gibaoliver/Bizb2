'use client';

import { useState } from 'react';
import { Tag, Sparkles } from 'lucide-react';

interface AdGalleryProps {
  images: string[];
  title: string;
  category: string;
  condition: string;
}

export default function AdGallery({ images, title, category, condition }: AdGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=600&auto=format&fit=crop');

  return (
    <div className="space-y-3">
      {/* Imagem Principal */}
      <div className="relative h-[380px] sm:h-[460px] md:h-[500px] w-full rounded-3xl overflow-hidden bg-slate-950 flex items-center justify-center shadow-lg border border-slate-800/30 group">
        {/* Background ambiental com blur da própria foto */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-2xl scale-110 pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url(${selectedImage})` }}
        />
        
        {/* Imagem nítida centralizada */}
        <img 
          src={selectedImage} 
          alt={title} 
          className="relative z-10 max-h-full max-w-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.01]" 
        />

        {/* Badges Flutuantes */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          <span className="bg-white/90 backdrop-blur-md text-blue-700 font-semibold px-3 py-1.5 rounded-full text-xs shadow-sm flex items-center gap-1.5 capitalize">
            <Tag className="w-3.5 h-3.5" />
            {category}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md text-slate-100 font-medium px-3 py-1.5 rounded-full text-xs shadow-sm flex items-center gap-1 capitalize">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {condition === 'novo' ? 'Novo' : 'Usado'}
          </span>
        </div>
      </div>

      {/* Miniaturas de fotos se houver mais de 1 */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-2 px-1">
          {images.map((img, idx) => {
            const isCurrent = img === selectedImage;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                  isCurrent 
                    ? 'border-blue-600 ring-2 ring-blue-500/30 shadow-md scale-105' 
                    : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
