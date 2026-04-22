'use client';

import { Game } from '@/app/types';

interface GameCardProps {
  game: Game;
  onAddToCart: (gameId: number) => void;
}

export default function GameCard({ game, onAddToCart }: GameCardProps) {
  return (
    <div className="card-neon rounded-xl overflow-hidden group">
      {/* Imagen */}
      <div className="h-48 bg-gradient-to-br from-cyan-600/40 to-purple-600/40 flex items-center justify-center text-6xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <span className="relative z-10 group-hover:scale-125 transition-transform duration-300">
          {game.imagen}
        </span>

        {/* Overlay glow en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-pink-500/0 group-hover:from-cyan-500/20 group-hover:to-pink-500/20 transition-all duration-300"></div>
      </div>

      {/* Contenido */}
      <div className="p-5 space-y-3">
        {/* Género */}
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-full font-mono">
            {game.genero.toUpperCase()}
          </span>
        </div>

        {/* Título */}
        <h3 className="font-bold text-lg text-cyan-100 group-hover:glow-text transition">
          {game.titulo}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-purple-300/70 line-clamp-2">
          {game.descripcion}
        </p>

        {/* Calificación */}
        <div className="text-yellow-400 text-sm font-mono">
          {game.calificacion}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"></div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            ${game.precio.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(game.id)}
            className="btn-neon btn-neon-cyan px-4 py-2 rounded-lg text-sm font-bold overflow-hidden"
          >
            <span className="relative z-10">COMPRAR</span>
          </button>
        </div>
      </div>
    </div>
  );
}
