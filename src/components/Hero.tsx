'use client';

import { ArrowRight, Play, Star } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
        <Image
          src="/images/hero_bg.png"
          alt="Gaming Background"
          fill
          className="object-cover object-right"
          priority
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-neon/20 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-neon animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neon">
              Lanzamiento Exclusivo v2.0
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter">
            DOMINA EL <br />
            <span className="text-gradient underline decoration-accent decoration-8 underline-offset-8">FUTURO</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed font-medium">
            La plataforma definitiva para coleccionistas de videojuegos.
            Acceso inmediato a títulos triple A, indies revolucionarios y
            experiencias únicas en una interfaz diseñada para el mañana.
          </p>

          <div className="flex flex-wrap gap-5">
            <button
              onClick={() => scrollToSection('juegos')}
              className="btn-premium group flex items-center gap-3"
            >
              EXPLORAR CATÁLOGO
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

          {/* Social Proof */}
          <div className="mt-16 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-accent flex items-center justify-center text-[10px] font-bold">
                  U{i}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-black bg-neon text-black flex items-center justify-center text-[10px] font-bold">
                +15k
              </div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="flex items-center gap-1 text-neon">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs text-white/40 mt-1 font-bold tracking-wider uppercase">
                4.9/5 Calificación Global
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-neon/10 blur-[120px] rounded-full -z-10" />
    </section>
  );
}
