'use client';

import { Game } from '@/types';
import { Star, ShoppingCart, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

interface GameCardProps {
  juego: Game;
  onAddToCart: (id: number) => void;
}

export default function GameCard({ juego, onAddToCart }: GameCardProps) {
  return (
    <div className="group relative glass rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/5 hover:border-neon/30">
      {/* Target area for hover effect */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10 pointer-events-none" />
      
      {/* Genre Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1 glass rounded-full text-[10px] font-black uppercase tracking-widest text-white/80 border-white/10 group-hover:border-neon/40 group-hover:text-neon transition-colors">
          {juego.genero}
        </span>
      </div>

      {/* Main Image */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={juego.imagen}
          alt={juego.titulo}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-black text-white leading-tight group-hover:text-neon transition-colors uppercase italic tracking-tighter">
              {juego.titulo}
            </h3>
            <div className="p-2 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <ArrowUpRight size={18} className="text-neon" />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-neon">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < juego.calificacion ? 'currentColor' : 'none'}
                  className={i < juego.calificacion ? '' : 'text-white/20'}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-white/40 tracking-wider">
              {juego.calificacion}.0
            </span>
          </div>

          <p className="text-sm text-white/60 mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 transform translate-y-4 group-hover:translate-y-0">
            {juego.descripcion}
          </p>

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Precio Final</span>
              <span className="text-2xl font-black text-neon tracking-tighter">
                ${juego.precio.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => onAddToCart(juego.id)}
              className="glass p-4 rounded-2xl hover:bg-neon hover:text-black transition-all duration-300 transform group-hover:scale-110 shadow-xl border-white/10 hover:border-neon"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative inner glow */}
      <div className="absolute inset-0 border-[1px] border-white/5 rounded-[2rem] pointer-events-none group-hover:border-neon/20 transition-colors" />
    </div>
  );
}
