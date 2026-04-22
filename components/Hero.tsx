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
      className="relative min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center overflow-hidden"
    >
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Círculos decorativos con glow */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl animate-pulse-glow"></div>
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: '1s' }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-20"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* Etiqueta superior */}
        <div className="mb-6 inline-block">
          <span className="px-4 py-2 border border-cyan-500/50 rounded-full text-cyan-400 text-sm font-mono animate-flicker">
            ⚡ NEXT GENERATION GAMING STORE
          </span>
        </div>

        {/* Título principal */}
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight glow-text">
          GAME
          <span className="block glow-text-pink mt-2">HUB</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl mb-8 text-cyan-200 font-mono">
          {'> '} La plataforma más futurista para videojuegos exclusivos {' <'}
        </p>

        {/* Descripción */}
        <p className="text-lg md:text-xl mb-12 text-purple-300/80 max-w-2xl mx-auto">
          Descubre una nueva dimensión en las compras de videojuegos.
          Experiencia inmersiva, precios increíbles y tecnología del futuro.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => scrollToSection('juegos')}
            className="btn-neon btn-neon-cyan text-lg px-8 py-4 rounded-lg font-bold relative group overflow-hidden"
          >
            <span className="relative z-10">EXPLORAR JUEGOS</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 transition"></div>
          </button>

          <button className="btn-neon btn-neon-pink text-lg px-8 py-4 rounded-lg font-bold relative group overflow-hidden">
            <span className="relative z-10">VER OFERTAS</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition"></div>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 pt-12 border-t border-cyan-500/30">
          {[
            { num: '2.5K+', label: 'Juegos' },
            { num: '50K+', label: 'Usuarios' },
            { num: '24/7', label: 'Soporte' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-cyan-400 glow-text">
                {stat.num}
              </div>
              <div className="text-sm md:text-base text-purple-300 font-mono mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Efecto de líneas de escaneo */}
      <div
        className="absolute inset-0 pointer-events-none bg-repeat-y"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(100, 200, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '100% 2px',
        }}
      ></div>
    </section>
  );
}
