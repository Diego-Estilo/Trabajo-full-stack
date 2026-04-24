import { Zap, Shield, CreditCard, Gift, Headphones } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: Zap,
      title: 'Descarga Rápida',
      description: 'Servidores optimizados para velocidades máximas',
    },
    {
      id: 2,
      icon: Shield,
      title: '100% Seguro',
      description: 'Tus datos están protegidos con encriptación SSL',
    },
    {
      id: 3,
      icon: CreditCard,
      title: 'Múltiples Pagos',
      description: 'Tarjeta, PayPal, criptomonedas y más',
    },
    {
      id: 4,
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Ayuda disponible en cualquier momento',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-base via-card/20 to-base"></div>

      {/* Efectos de luz */}
      <div className="absolute left-1/4 top-1/2 w-96 h-96 bg-neon/10 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute right-1/4 top-1/2 w-96 h-96 bg-muted/10 rounded-full blur-3xl -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              className="card-neon rounded-xl p-8 text-center group overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Icon container */}
              <div className="mb-4 group-hover:scale-125 group-hover:animate-pulse-glow transition-all duration-300">
                <feature.icon className="w-14 h-14 mx-auto text-neon" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-black mb-3 text-white group-hover:glow-text transition">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition">
                {feature.description}
              </p>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-neon/0 to-transparent opacity-0 group-hover:opacity-20 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
