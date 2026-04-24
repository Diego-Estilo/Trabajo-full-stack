'use client';

import { useState, useCallback } from 'react';
import { CartItem, Game } from '@/types';

interface UseCartReturn {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string | number) => void;
  clearCart: () => void;
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((game: Game) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === game.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === game.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...game, cantidad: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((gameId: string | number) => {
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