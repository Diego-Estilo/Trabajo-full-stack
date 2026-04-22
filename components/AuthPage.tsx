'use client';

import { useState } from 'react';
import { useAuth } from '@/app/auth-context';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

export default function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      onAuthSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: '1s' }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float"></div>
      </div>

      {/* Card */}
      <div className="card-neon rounded-2xl p-8 md:p-12 w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4 animate-pulse-glow">🎮</div>
          <h1 className="text-4xl font-black glow-text mb-2">
            GAME<span className="glow-text-pink">HUB</span>
          </h1>
          <p className="text-cyan-400/70 font-mono text-sm">
            {isLogin ? '> Iniciando sesión...' : '> Creando nueva cuenta...'}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {/* Nombre (solo en registro) */}
          {!isLogin && (
            <div>
              <label className="block text-cyan-300 font-mono text-sm mb-2">
                {'> NOMBRE'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition backdrop-blur-sm font-mono"
                required={!isLogin}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-cyan-300 font-mono text-sm mb-2">
              {'> EMAIL'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition backdrop-blur-sm font-mono"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-cyan-300 font-mono text-sm mb-2">
              {'> CONTRASEÑA'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition backdrop-blur-sm font-mono"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm font-mono">
              ⚠️ {error}
            </div>
          )}

          {/* Botón submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-neon btn-neon-cyan w-full py-3 rounded-lg font-black text-lg mt-6 disabled:opacity-50"
          >
            {isLoading
              ? '⏳ PROCESANDO...'
              : isLogin
                ? '🚀 INGRESAR'
                : '✨ REGISTRARSE'}
          </button>
        </form>

        {/* Toggle entre login y registro */}
        <div className="text-center">
          <p className="text-purple-300/70 font-mono text-sm mb-4">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="btn-neon btn-neon-pink px-6 py-2 rounded-lg font-bold text-sm"
          >
            {isLogin ? 'Crear Cuenta' : 'Inicia Sesión'}
          </button>
        </div>

        {/* Demo info */}
        <div className="mt-8 pt-6 border-t border-cyan-500/30">
          <p className="text-cyan-400/50 font-mono text-xs text-center mb-3">
            {'// DEMO MODE'}
          </p>
          <div className="bg-slate-800/30 p-3 rounded border border-cyan-500/20 text-cyan-400/70 text-xs font-mono space-y-1">
            <p>📧 Demo: demo@gamehub.com</p>
            <p>🔐 Pass: demo1234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
