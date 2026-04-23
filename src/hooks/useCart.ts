'use client';

import { useState, useCallback } from 'react';
import { CartItem, Game } from '@/types';
import { juegos } from '@/features/games/data';

interface UseCartReturn {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (gameId: number) => void;
  removeFromCart: (gameId: number) => void;
  clearCart: () => void;
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((gameId: number) => {
    const game = juegos.find((j) => j.id === gameId);
    if (!game) return;

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === gameId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === gameId ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...game, cantidad: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((gameId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== gameId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.cantidad, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
  };
}