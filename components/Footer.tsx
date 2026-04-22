export default function Footer() {
  return (
    <footer
      id="contacto"
      className="relative border-t border-cyan-500/30 pt-16 pb-8"
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/50 to-slate-900 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Grid de contenido */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo y descripción */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🎮</span>
              <h4 className="text-2xl font-black glow-text">GameHub</h4>
            </div>
            <p className="text-purple-300/70 font-mono text-sm">
              La plataforma de videojuegos del futuro. Experiencia gaming sin
              límites.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-bold text-cyan-100 mb-4 glow-text">
              Navegación
            </h4>
            <ul className="space-y-2">
              {['Inicio', 'Juegos', 'Promociones', 'Soporte'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-purple-300/70 hover:text-cyan-400 transition font-mono text-sm"
                  >
                    {'>'} {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-bold text-pink-300/80 mb-4 glow-text-pink">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-purple-300/70">
                <span className="font-mono">📧</span> info@gamehub.com
              </li>
              <li className="text-purple-300/70">
                <span className="font-mono">📱</span> +34 911 234 567
              </li>
              <li className="text-purple-300/70">
                <span className="font-mono">📍</span> Madrid, España
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h4 className="text-lg font-bold text-cyan-100 mb-4 glow-text">
              Comunidad
            </h4>
            <div className="flex gap-3">
              {[
                { icon: 'f', label: 'Facebook' },
                { icon: '𝕏', label: 'Twitter' },
                { icon: '📷', label: 'Instagram' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 hover:from-cyan-500/40 hover:to-pink-500/40 border border-cyan-500/50 rounded-lg flex items-center justify-center transition transform hover:scale-110 text-sm"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 mb-8"></div>

        {/* Footer bottom */}
        <div className="text-center">
          <p className="text-purple-400/60 text-sm font-mono mb-2">
            {'<>'} Desarrollado con Next.js y Tailwind CSS {'>'}
          </p>
          <p className="text-purple-300/50 text-xs">
            &copy; 2026 GameHub. Todos los derechos reservados. | Política de
            privacidad | Términos de servicio
          </p>
        </div>
      </div>
    </footer>
  );
}
