export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-[#050c1a] text-white flex items-center justify-center overflow-hidden"
    >
      {/* Blobs de fondo */}
      <div className="absolute -top-32 -left-40 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-pink-500/8 rounded-full blur-[100px] animate-pulse [animation-delay:1.5s]" />
      <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 animate-pulse [animation-delay:.8s]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,.04) 1px,transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Líneas de escaneo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,229,255,.012) 2px,rgba(0,229,255,.012) 4px)',
        }}
      />

      {/* Badge de teléfono */}
      <div className="absolute top-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-[#0a1628]/80 border border-cyan-500/20 rounded-xl px-4 py-2 text-sm text-cyan-100/70 backdrop-blur-md">
        <span>📞</span>
        <span>+51 999 888 777 &nbsp;|&nbsp; Atención 24/7</span>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-6 max-w-4xl w-full">

        {/* Badge superior */}
        <div className="mb-8 inline-flex items-center gap-2 border border-cyan-500/40 rounded-full px-5 py-2 text-cyan-400 text-sm tracking-widest bg-cyan-500/5 font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          TIENDA DE VIDEOJUEGOS LÍDER EN PERÚ
        </div>

        {/* Título */}
        <h1 className="font-black leading-none mb-6 text-7xl md:text-9xl tracking-tight">
          GAME
          <span className="block bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            HUB
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-blue-100/70 mb-4 font-medium max-w-2xl mx-auto">
          La plataforma más completa para comprar videojuegos en Perú.<br />
          Envíos a todo el país · Pago en soles · Garantía real.
        </p>

        {/* Barra de precios */}
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-cyan-500/8 to-pink-500/8 border border-yellow-400/20 rounded-xl px-6 py-3 mb-10 text-sm text-white/80">
          <span>🎮 Juegos desde</span>
          <span className="text-yellow-400 font-black text-xl">S/ 19.90</span>
          <div className="w-px h-6 bg-white/10" />
          <span>💳 Acepta Yape, Plin y tarjetas</span>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <button
            onClick={() => scrollToSection('juegos')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-[0_0_24px_rgba(0,229,255,.3)] hover:shadow-[0_0_36px_rgba(0,229,255,.5)] hover:-translate-y-0.5 transition-all"
          >
            🕹️ EXPLORAR JUEGOS
          </button>
          <button className="px-8 py-4 border border-pink-500/50 rounded-xl font-bold text-white hover:border-pink-400 hover:shadow-[0_0_24px_rgba(255,45,120,.3)] hover:-translate-y-0.5 transition-all">
            🔥 VER OFERTAS
          </button>
          <button className="px-6 py-4 border border-white/15 rounded-xl font-semibold text-white/70 hover:border-white/30 hover:text-white transition-all text-sm">
            📞 Contáctanos
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-cyan-500/15">
          {[
            { num: '2,500+', label: 'Títulos disponibles' },
            { num: '50K+', label: 'Clientes satisfechos' },
            { num: '24/7', label: 'Soporte en línea' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-cyan-400 drop-shadow-[0_0_12px_rgba(0,229,255,.4)]">
                {stat.num}
              </div>
              <div className="text-xs text-blue-300/50 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
