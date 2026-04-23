'use client';

import { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Gamepad2, Mail, Lock, Loader2, Rocket, AlertTriangle, Check, User, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-[1000px] grid md:grid-cols-2 glass rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl border-white/5">
        {/* Left Side: Brand/Info */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-neon/10 to-transparent border-r border-white/5">
          <div className="flex items-center gap-3">
            <Gamepad2 className="text-neon w-10 h-10" />
            <span className="text-2xl font-black tracking-tighter">GAMEHUB</span>
          </div>

          <div>
            <h2 className="text-4xl font-black leading-tight mb-6">
              BIENVENIDO AL <span className="text-neon">SIGUIENTE NIVEL</span> DEL GAMING
            </h2>
            <p className="text-white/50 font-medium">
              Únete a miles de jugadores y accede a los títulos más exclusivos del mercado con beneficios únicos.
            </p>
          </div>

          <div className="flex items-center gap-4 py-4 px-6 glass rounded-2xl border-white/5">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-accent border-2 border-black flex items-center justify-center text-[10px] font-bold">U{i}</div>
              ))}
            </div>
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">+15K USUARIOS ACTIVOS</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-3xl font-black mb-2 uppercase italic tracking-tighter">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h1>
            <p className="text-white/40 text-sm font-medium">
              {isLogin ? 'Ingresa tus credenciales para continuar' : 'Completa los datos para unirte a la plataforma'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Nombre Completo</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Contraseña</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold flex items-center gap-3">
                <AlertTriangle size={16} /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-premium w-full flex items-center justify-center gap-3 py-4 mt-4"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : isLogin ? (
                <>CONTINUAR <ArrowRight size={20} /></>
              ) : (
                <>CREAR CUENTA <Check size={20} /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-sm font-bold text-white/40 hover:text-neon transition-colors"
            >
              {isLogin ? '¿No tienes cuenta? Registrate' : '¿Ya tienes cuenta? Ingresa'}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-10 p-4 border border-white/5 bg-white/[0.02] rounded-2xl">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest text-center mb-2">Credenciales Demo</p>
            <div className="flex justify-between text-[10px] font-bold text-white/40 px-2">
              <span>demo@gamehub.com</span>
              <span>demo1234</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
