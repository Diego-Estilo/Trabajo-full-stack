'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import GamesSection from '@/components/GamesSection';
import PromoSection from '@/components/PromoSection';
import FeaturesSection from '@/components/FeaturesSection';
import NewsletterSection from '@/components/NewsletterSection';
import CartModal from '@/components/CartModal';
import CheckoutModal from '@/components/CheckoutModal';
import OrdersModal from '@/components/OrdersModal';
import Footer from '@/components/Footer';
import Notification from '@/components/Notification';
import AuthPage from '@/components/AuthPage';
import { juegos } from '@/app/data';
import { CartItem } from '@/app/types';
import { useAuth } from '@/app/auth-context';

export default function Home() {
  const { isLoggedIn, addOrder } = useAuth();
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  if (!isLoggedIn) {
    return <AuthPage onAuthSuccess={() => {}} />;
  }

  const cartCount = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const handleAddToCart = (gameId: number) => {
    const game = juegos.find((j) => j.id === gameId);
    if (!game) return;

    setCarrito((prev) => {
      const existingItem = prev.find((item) => item.id === gameId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === gameId ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...game, cantidad: 1 }];
    });

    showNotification(`${game.titulo} agregado al carrito!`);
  };

  const handleRemoveFromCart = (gameId: number) => {
    setCarrito((prev) => prev.filter((item) => item.id !== gameId));
    showNotification('Juego eliminado del carrito');
  };

  const handleCheckoutConfirm = (paymentInfo: any) => {
    // Agregar orden al historial
    const total = carrito.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
    addOrder(carrito, total);

    showNotification(
      `✓ ¡Compra exitosa! Tarjeta terminada en ${paymentInfo.cardNumber}`
    );
    setCarrito([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const handleSubscribe = (email: string) => {
    showNotification(`¡Suscripción exitosa! Revisa tu email en ${email}`);
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setIsNotificationVisible(true);
    setTimeout(() => setIsNotificationVisible(false), 3000);
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
      <NewsletterSection onSubscribe={handleSubscribe} />
      <Footer />

      {/* Modales */}
      <CartModal
        isOpen={isCartOpen}
        items={carrito}
        onClose={() => setIsCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={carrito}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleCheckoutConfirm}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />

      <Notification message={notification} isVisible={isNotificationVisible} />
    </main>
  );
}
