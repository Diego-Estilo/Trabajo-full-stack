'use client';

import { FormEvent } from 'react';

interface NewsletterProps {
  onSubscribe: (email: string) => void;
}

export default function NewsletterSection({ onSubscribe }: NewsletterProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    onSubscribe(email);
    e.currentTarget.reset();
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fondo futurista */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 animate-pulse-glow"></div>
        <div
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -translate-y-1/2 animate-pulse-glow"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        {/* Etiqueta */}
        <span className="text-cyan-400 text-sm font-mono mb-4 block">
          {'// MANTENTE ACTUALIZADO'}
        </span>

        {/* Título */}
        <h2 className="text-5xl md:text-6xl font-black mb-4 glow-text">
          Suscríbete<span className="glow-text-pink"> al Newsletter</span>
        </h2>

        {/* Descripción */}
        <p className="text-purple-300/80 text-lg mb-12 max-w-2xl mx-auto">
          Recibe acceso exclusivo a las mejores ofertas, lanzamientos premium y
          noticias de la industria gaming
        </p>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            name="email"
            placeholder="tu@correo.com"
            className="flex-1 px-6 py-4 rounded-lg bg-slate-800/50 border border-cyan-500/30 text-cyan-100 placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition backdrop-blur-sm"
            required
          />
          <button
            type="submit"
            className="btn-neon btn-neon-pink px-8 py-4 rounded-lg font-black whitespace-nowrap"
          >
            SUSCRIBIRSE
          </button>
        </form>

        {/* Info adicional */}
        <p className="text-xs text-purple-400/60 mt-6 font-mono">
          No compartimos tu email. Puedes desuscribirse en cualquier momento.
        </p>
      </div>
    </section>
  );
}
