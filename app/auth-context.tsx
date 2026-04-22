'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface Order {
  id: string;
  date: string;
  items: Array<{
    titulo: string;
    precio: number;
    cantidad: number;
  }>;
  total: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  orders: Order[];
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  addOrder: (items: any[], total: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('gamehub_user');
    const savedOrders = localStorage.getItem('gamehub_orders');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulamos login (en producción sería con backend)
    if (!email || !password) throw new Error('Email y contraseña requeridos');

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
    };

    setUser(newUser);
    localStorage.setItem('gamehub_user', JSON.stringify(newUser));
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulamos registro (en producción sería con backend)
    if (!email || !password || !name) {
      throw new Error('Todos los campos son requeridos');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
    };

    setUser(newUser);
    localStorage.setItem('gamehub_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gamehub_user');
  };

  const addOrder = (items: any[], total: number) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('es-ES'),
      items: items.map((item) => ({
        titulo: item.titulo,
        precio: item.precio,
        cantidad: item.cantidad,
      })),
      total,
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('gamehub_orders', JSON.stringify(updatedOrders));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-cyan-400">
        Cargando...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        orders,
        login,
        register,
        logout,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
