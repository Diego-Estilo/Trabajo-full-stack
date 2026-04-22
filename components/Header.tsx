'use client';

import { CartItem } from '@/app/types';
import { useState } from 'react';
import { useAuth } from '@/app/auth-context';

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
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-cyan-500/30 bg-gradient-to-b from-slate-900/90 via-purple-900/50 to-transparent shadow-lg shadow-cyan-500/20">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="text-4xl animate-pulse-glow">🎮</div>
            <h1 className="text-3xl font-black glow-text hidden sm:block">
              GAME<span className="glow-text-pink">HUB</span>
            </h1>
            <div className="hidden sm:block text-xs text-cyan-400 border-l border-cyan-500/50 pl-3">
              <div>v2.0</div>
              <div className="text-purple-400">NEXT GEN</div>
            </div>
          </div>

          {/* Menu Desktop */}
          <ul className="hidden md:flex gap-8">
            {['Inicio', 'Juegos', 'Promociones', 'Contacto'].map(
              (item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="relative group text-cyan-300 hover:text-cyan-100 transition font-semibold"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              )
            )}
          </ul>

          {/* Carrito, Órdenes y Menu Button */}
          <div className="flex items-center gap-4">
            {/* Botón de órdenes */}
            <button
              onClick={onOrdersClick}
              className="relative text-2xl hover:scale-110 transition-transform"
              title="Mis Compras"
            >
              📦
            </button>

            {/* Carrito */}
            <button
              onClick={onCartClick}
              className="relative text-3xl hover:scale-125 transition-transform animate-pulse-glow"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-black rounded-full w-6 h-6 flex items-center justify-center shadow-lg shadow-pink-500/50 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User menu */}
            <div className="relative group">
              <button className="text-2xl hover:scale-110 transition-transform">
                👤
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-slate-900/90 border border-cyan-500/30 rounded-lg shadow-lg shadow-cyan-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all backdrop-blur-md">
                <div className="p-4 border-b border-cyan-500/30">
                  <p className="text-xs text-cyan-400 font-mono">
                    {user?.name}
                  </p>
                  <p className="text-xs text-purple-400/70 font-mono">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-cyan-300 hover:text-pink-400 font-mono text-sm transition hover:bg-slate-800"
                >
                  {'> '} Cerrar Sesión
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-2xl text-cyan-400 hover:text-cyan-200 transition"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-cyan-500/30 space-y-3">
            {['Inicio', 'Juegos', 'Promociones', 'Contacto'].map(
              (item, idx) => (
                <a
                  key={idx}
                  href={`#${item.toLowerCase()}`}
                  className="block text-cyan-300 hover:text-pink-400 transition py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              )
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
