'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Gamepad2, Package, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onOrdersClick?: () => void;
}

export default function Header({
  cartCount,
  onCartClick,
  onOrdersClick,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <nav className={`max-w-7xl mx-auto px-6 transition-all duration-500 ${
        scrolled ? 'glass rounded-full mx-4 shadow-2xl overflow-visible' : 'bg-transparent'
      }`}>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-neon blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <Gamepad2 className="w-8 h-8 text-neon relative" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter glow-text">
              GAME<span className="text-white">HUB</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {['Inicio', 'Juegos', 'Promociones', 'Comunidad'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-semibold text-white/70 hover:text-neon transition-colors uppercase tracking-widest"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOrdersClick}
              className="p-2.5 rounded-full hover:bg-white/5 text-white/80 hover:text-neon transition-all"
              title="Mis Pedidos"
            >
              <Package size={22} />
            </button>

            <button
              onClick={onCartClick}
              className="p-2.5 rounded-full hover:bg-white/5 text-white/80 hover:text-neon transition-all relative"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-neon text-black text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block"></div>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-white/5 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon to-accent flex items-center justify-center text-black font-bold text-xs">
                  {user?.name?.[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium hidden lg:block text-white/90">{user?.name}</span>
              </button>
              
              <div className="absolute right-0 mt-3 w-56 glass rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 p-2 shadow-2xl">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-xs text-white/50 mb-1">Conectado como</p>
                  <p className="text-sm font-bold truncate">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-semibold mt-1"
                >
                  <LogOut size={18} />
                  Cerrar Sesión
                </button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-64 py-4 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col gap-4 px-2">
            {['Inicio', 'Juegos', 'Promociones', 'Comunidad'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-lg font-bold hover:text-neon transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
