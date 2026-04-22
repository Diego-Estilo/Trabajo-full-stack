export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: '⚡',
      title: 'Descarga Rápida',
      description: 'Servidores optimizados para velocidades máximas',
    },
    {
      id: 2,
      icon: '🔒',
      title: '100% Seguro',
      description: 'Tus datos están protegidos con encriptación SSL',
    },
    {
      id: 3,
      icon: '💳',
      title: 'Múltiples Pagos',
      description: 'Tarjeta, PayPal, criptomonedas y más',
    },
    {
      id: 4,
      icon: '🎁',
      title: 'Soporte 24/7',
      description: 'Ayuda disponible en cualquier momento',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900"></div>

      {/* Efectos de luz */}
      <div className="absolute left-1/4 top-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute right-1/4 top-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              className="card-neon rounded-xl p-8 text-center group overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Icon container */}
              <div className="text-6xl mb-4 group-hover:scale-125 group-hover:animate-pulse-glow transition-all duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-black mb-3 text-cyan-100 group-hover:glow-text transition">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-purple-300/70 group-hover:text-purple-200/90 transition">
                {feature.description}
              </p>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 to-transparent opacity-0 group-hover:opacity-20 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
