'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/Hero';
import GamesSection from '@/features/games/GamesSection';
import PromoSection from '@/components/PromoSection';
import FeaturesSection from '@/components/FeaturesSection';
import NewsletterSection from '@/components/NewsletterSection';
import CartModal from '@/features/checkout/CartModal';
import CheckoutModal from '@/features/checkout/CheckoutModal';
import OrdersModal from '@/features/checkout/OrdersModal';
import AuthModal from '@/features/auth/AuthModal';
import Footer from '@/components/layout/Footer';
import Notification from '@/components/ui/Notification';
import { useCart, useNotification } from '@/hooks';
import { useGames } from '@/hooks/useGames';
import { useAuth } from '@/features/auth/AuthContext';
import { PaymentInfo } from '@/types';

export default function Home() {
  const { isLoggedIn, addOrder } = useAuth();
  const { cart, cartCount, cartTotal, addToCart, removeFromCart, clearCart } = useCart();
  const { games, isLoading: isLoadingGames } = useGames();
  const { notification, isVisible, showNotification } = useNotification();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleAddToCart = (gameId: string | number) => {
    if (!isLoggedIn) {
      showNotification('Inicia sesión para añadir al carrito');
      setIsAuthOpen(true);
      return;
    }
    
    const game = games.find(g => g.id === gameId);
    if (game) {
      addToCart(game);
      showNotification('¡Juego añadido al carrito!');
    }
  };

  const handleCheckoutConfirm = async (paymentInfo: PaymentInfo) => {
    try {
      await addOrder(cart, cartTotal);
      showNotification(
        `✓ ¡Compra exitosa! Tarjeta terminada en ${paymentInfo.cardNumber.slice(-4)}`
      );
      clearCart();
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
    } catch (error) {
      showNotification('Error al procesar la compra cul simulated');
    }
  };

  const handleRemoveFromCart = (gameId: any) => {
    removeFromCart(gameId);
    showNotification('Juego eliminado del carrito');
  };

  return (
    <main>
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onOrdersClick={() => {
          if (!isLoggedIn) {
            setIsAuthOpen(true);
          } else {
            setIsOrdersOpen(true);
          }
        }}
      />
      <Hero />
      <GamesSection games={games} onAddToCart={handleAddToCart} />
      <PromoSection />
      <FeaturesSection />
      <NewsletterSection onSubscribe={showNotification} />
      <Footer />

      <CartModal
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          if (!isLoggedIn) {
            setIsCartOpen(false);
            setIsAuthOpen(true);
          } else {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cart}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleCheckoutConfirm}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />

      <Notification message={notification} isVisible={isVisible} />
    </main>
  );
}