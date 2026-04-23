'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { User, Order, CartItem } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  orders: Order[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  addOrder: (items: CartItem[], total: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'gamehub_user',
  ORDERS: 'gamehub_orders',
} as const;

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function loadFromStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = loadFromStorage<User>(STORAGE_KEYS.USER);
    const savedOrders = loadFromStorage<Order[]>(STORAGE_KEYS.ORDERS);

    if (savedUser) setUser(savedUser);
    if (savedOrders) setOrders(savedOrders);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email y contraseña requeridos');
    }

    const newUser: User = {
      id: generateId(),
      email,
      name: email.split('@')[0],
    };

    setUser(newUser);
    saveToStorage(STORAGE_KEYS.USER, newUser);
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error('Todos los campos son requeridos');
    }

    const newUser: User = {
      id: generateId(),
      email,
      name,
    };

    setUser(newUser);
    saveToStorage(STORAGE_KEYS.USER, newUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    removeFromStorage(STORAGE_KEYS.USER);
  }, []);

  const addOrder = useCallback((items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: generateId(),
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
    saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders);
  }, [orders]);

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
        isLoading,
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