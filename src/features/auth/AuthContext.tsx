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
import { createClient } from '@/utils/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  isLoggedIn: boolean;
  orders: Order[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  addOrder: (items: CartItem[], total: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User'
        });
        fetchOrders(session.user.id);
      }
      setIsLoading(false);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User'
        });
        fetchOrders(session.user.id);
      } else {
        setUser(null);
        setOrders([]);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const fetchOrders = async (userId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const formattedOrders: Order[] = data.map((o: any) => ({
        id: o.id,
        date: new Date(o.created_at).toLocaleDateString('es-ES'),
        total: parseFloat(o.total_amount),
        items: o.order_items.map((oi: any) => ({
          titulo: oi.product_name || 'Producto', // We might need to join with products or store name in order_items
          precio: parseFloat(oi.price_at_purchase),
          cantidad: oi.quantity
        }))
      }));
      setOrders(formattedOrders);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  }, [supabase]);

  const register = useCallback(async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });
    if (error) throw error;
  }, [supabase]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, [supabase]);

  const addOrder = useCallback(async (items: CartItem[], total: number) => {
    if (!supabaseUser) return;

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: supabaseUser.id,
        total_amount: total,
        status: 'completed'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = items.map(item => ({
      order_id: orderData.id,
      product_id: item.id.toString(),
      product_name: item.titulo,
      quantity: item.cantidad,
      price_at_purchase: item.precio
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;
    
    fetchOrders(supabaseUser.id);
  }, [supabase, supabaseUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        isLoggedIn: !!supabaseUser,
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