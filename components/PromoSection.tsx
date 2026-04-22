export default function PromoSection() {
  const promos = [
    {
      id: 1,
      title: 'Oferta de Semana',
      description: 'Descuento en juegos AAA seleccionados',
      badge: '-30%',
      icon: '⚡',
    },
    {
      id: 2,
      title: 'Bundle Especial',
      description: 'Compra 2 juegos y obtén descuento adicional',
      badge: '-50%',
      icon: '🎯',
    },
    {
      id: 3,
      title: 'Juego del Mes',
      description: 'Descarga un juego completamente gratis',
      badge: 'Gratis',
      icon: '🎁',
    },
  ];

  return (
    <section id="promociones" className="py-24 relative">
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="text-pink-400 text-sm font-mono mb-4 block">
            {'// PROMOCIONES LIMITADAS'}
          </span>
          <h2 className="text-5xl md:text-6xl font-black mb-4 glow-text-pink">
            OFERTAS <span className="glow-text">ESPECIALES</span>
          </h2>
        </div>

        {/* Grid de promociones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="card-neon rounded-xl p-8 relative group overflow-hidden"
            >
              {/* Badge */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-pink-500/50 transform group-hover:scale-110 transition">
                {promo.badge}
              </div>

              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                {promo.icon}
              </div>

              {/* Contenido */}
              <h3 className="text-2xl font-black mb-2 text-cyan-100 group-hover:glow-text transition">
                {promo.title}
              </h3>
              <p className="text-purple-300/80 mb-4">{promo.description}</p>

              {/* Botón */}
              <button className="btn-neon btn-neon-pink text-sm px-6 py-2 rounded-lg font-bold w-full mt-6">
                Ver Oferta
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
