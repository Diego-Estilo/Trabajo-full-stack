'use client';

import { Game } from '@/types';
import GameCard from './GameCard';
import { useState, useMemo } from 'react';
import { Sparkles, Trophy, Flame } from 'lucide-react';

interface GamesSectionProps {
  games: Game[];
  onAddToCart: (gameId: number) => void;
}

export default function GamesSection({ games, onAddToCart }: GamesSectionProps) {
  const [activeFilter, setActiveFilter] = useState('todos');

  const categories = [
    { id: 'todos', label: 'Todos', icon: Sparkles },
    { id: 'accion', label: 'Acción', icon: Flame },
    { id: 'rpg', label: 'RPG', icon: Trophy },
    { id: 'aventura', label: 'Aventura', icon: Trophy },
  ];

  const filteredGames = useMemo(() => {
    return activeFilter === 'todos'
      ? games
      : games.filter((g) => g.genero.toLowerCase() === activeFilter);
  }, [activeFilter, games]);

  return (
    <section id="juegos" className="py-32 px-6 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-neon mb-4">
            <div className="h-[1px] w-8 bg-neon" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Catálogo Prime</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-none mb-4">
            LEVEL UP YOUR <br />
            <span className="text-gradient">PLAYLIST</span>
          </h2>
          <p className="text-white/40 font-medium">
            Seleccionamos cuidadosamente cada título para garantizar que solo 
            las mejores experiencias lleguen a tu biblioteca virtual.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 p-1 glass rounded-2xl border-white/5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === cat.id
                    ? 'bg-neon text-black shadow-[0_0_20px_rgba(204,255,0,0.3)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={14} />
                {cat.label.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGames.map((juego, idx) => (
          <div key={juego.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <GameCard juego={juego} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-[150px] -z-10" />
    </section>
  );
}
