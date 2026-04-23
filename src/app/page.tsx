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
import Footer from '@/components/layout/Footer';
import Notification from '@/components/ui/Notification';
import AuthPage from '@/features/auth/AuthPage';
import { useCart, useNotification } from '@/hooks';
import { useAuth } from '@/features/auth/AuthContext';
import { PaymentInfo } from '@/types';
import { juegos } from '@/features/games/data';

export default function Home() {
  const { isLoggedIn, addOrder } = useAuth();
  const { cart, cartCount, cartTotal, addToCart, removeFromCart, clearCart } = useCart();
  const { notification, isVisible, showNotification } = useNotification();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  if (!isLoggedIn) {
    return <AuthPage onAuthSuccess={() => {}} />;
  }

  const handleAddToCart = (gameId: number) => {
    addToCart(gameId);
  };

  const handleCheckoutConfirm = (paymentInfo: PaymentInfo) => {
    addOrder(cart, cartTotal);
    showNotification(
      `✓ ¡Compra exitosa! Tarjeta terminada en ${paymentInfo.cardNumber}`
    );
    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const handleRemoveFromCart = (gameId: number) => {
    removeFromCart(gameId);
    showNotification('Juego eliminado del carrito');
  };

  return (
    <main>
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onOrdersClick={() => setIsOrdersOpen(true)}
      />
      <Hero />
      <GamesSection games={juegos} onAddToCart={handleAddToCart} />
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
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
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

      <Notification message={notification} isVisible={isVisible} />
    </main>
  );
}