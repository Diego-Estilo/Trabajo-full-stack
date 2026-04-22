'use client';

import { Game } from '@/app/types';
import GameCard from './GameCard';
import { useState } from 'react';

interface GamesSection {
  games: Game[];
  onAddToCart: (gameId: number) => void;
}

type FilterType = 'todos' | 'accion' | 'rpg' | 'aventura';

export default function GamesSection({ games, onAddToCart }: GamesSection) {
  const [filter, setFilter] = useState<FilterType>('todos');

  const filteredGames =
    filter === 'todos' ? games : games.filter((g) => g.genero === filter);

  return (
    <section id="juegos" className="py-24 relative overflow-hidden">
      {/* Fondo con efectos */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-mono mb-4 block">
            {'// CATALOGO DE JUEGOS'}
          </span>
          <h2 className="text-5xl md:text-6xl font-black mb-4 glow-text">
            JUEGOS <span className="glow-text-pink">DESTACADOS</span>
          </h2>
          <p className="text-purple-300/80 text-lg max-w-2xl mx-auto">
            Descubre nuestra colección premium de videojuegos
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(['todos', 'accion', 'rpg', 'aventura'] as FilterType[]).map(
            (filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-2 rounded-lg font-mono font-bold transition ${
                  filter === filterType
                    ? 'btn-neon btn-neon-cyan'
                    : 'border border-purple-500/50 text-purple-300 hover:border-cyan-500 hover:text-cyan-300'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Grid de juegos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}
