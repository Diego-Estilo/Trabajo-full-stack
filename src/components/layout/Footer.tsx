import { Gamepad2, Mail, Phone, MapPin, Video, Send, Camera, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="relative pt-24 pb-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0a0a0a] -z-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <Gamepad2 className="w-8 h-8 text-neon" />
              <h4 className="text-2xl font-black tracking-tighter">GAME<span className="text-neon">HUB</span></h4>
            </div>
            <p className="text-white/40 font-medium leading-relaxed mb-8 max-w-sm">
              Estamos redefiniendo la forma en que los jugadores adquieren y experimentan 
              sus títulos favoritos. Únete a la comunidad de élite.
            </p>
            <div className="flex gap-4">
              {[Video, Send, Camera, Code2].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-xl glass border-white/5 hover:border-neon hover:text-neon flex items-center justify-center transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="lg:col-span-2">
            <h5 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white/90">Navegación</h5>
            <ul className="space-y-4">
              {['Inicio', 'Juegos', 'Promociones', 'Soporte'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm font-medium text-white/40 hover:text-neon transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white/90">Categorías</h5>
            <ul className="space-y-4">
              {['Acción', 'RPG', 'Aventura', 'Indie'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-medium text-white/40 hover:text-neon transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h5 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white/90">Sede Central</h5>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl glass border-white/5">
                  <MapPin size={20} className="text-neon" />
                </div>
                <div>
                  <p className="text-sm font-bold">Madrid Tech District</p>
                  <p className="text-xs text-white/40 mt-1">Calle de la Tecnología 404, 28001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl glass border-white/5">
                  <Mail size={20} className="text-neon" />
                </div>
                <div>
                  <p className="text-sm font-bold">info@gamehub.com</p>
                  <p className="text-xs text-white/40 mt-1">Soporte 24/7 disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
            &copy; 2026 GameHub Corp. All rights reserved.
          </p>
          <div className="flex gap-8">
            {['Privacidad', 'Términos', 'Cookies'].map(i => (
              <a key={i} href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition">
                {i}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-1/4 h-1/2 bg-neon/5 blur-[120px] -z-10 rounded-full" />
    </footer>
  );
}
