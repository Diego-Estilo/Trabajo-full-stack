'use client';

import { CartItem } from '@/app/types';
import { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onConfirm: (paymentInfo: any) => void;
}

export default function CheckoutModal({
  isOpen,
  items,
  onClose,
  onConfirm,
}: CheckoutModalProps) {
  const [step, setStep] = useState(1); // 1: Resumen, 2: Pago
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const handleConfirmPay = async () => {
    setIsProcessing(true);
    // Simulamos el procesamiento del pago
    await new Promise((resolve) => setTimeout(resolve, 2000));

    onConfirm({
      cardNumber: cardNumber.slice(-4),
      amount: total,
      items: items.map((i) => ({
        titulo: i.titulo,
        precio: i.precio,
        cantidad: i.cantidad,
      })),
    });

    setIsProcessing(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="card-neon rounded-2xl max-w-md w-full relative overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-cyan-400 hover:text-pink-400 transition z-10"
          >
            ✕
          </button>

          <div className="p-8">
            {step === 1 ? (
              <>
                {/* Resumen de compra */}
                <h2 className="text-3xl font-black mb-6 glow-text">
                  RESUMEN <span className="glow-text-pink">COMPRA</span>
                </h2>

                <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <div className="font-bold text-cyan-100 text-sm">
                          {item.titulo}
                        </div>
                        <div className="text-xs text-purple-400 font-mono">
                          x{item.cantidad}
                        </div>
                      </div>
                      <span className="font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent text-sm">
                        ${(item.precio * item.cantidad).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 my-6"></div>

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-300 font-mono">TOTAL:</span>
                    <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </h3>
                  </div>
                </div>

                {/* Botones */}
                <div className="space-y-3">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-neon btn-neon-cyan w-full py-3 rounded-lg font-black"
                  >
                    CONTINUAR AL PAGO
                  </button>
                  <button
                    onClick={onClose}
                    className="btn-neon btn-neon-pink w-full py-3 rounded-lg font-black text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Forma de pago */}
                <h2 className="text-3xl font-black mb-6 glow-text-pink">
                  PAGO <span className="glow-text">SEGURO</span>
                </h2>

                <form className="space-y-4 mb-6">
                  {/* Nombre titular */}
                  <div>
                    <label className="block text-cyan-300 font-mono text-sm mb-2">
                      {'> NOMBRE TITULAR'}
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Diego García"
                      className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition backdrop-blur-sm font-mono text-sm"
                      required
                    />
                  </div>

                  {/* Número de tarjeta */}
                  <div>
                    <label className="block text-cyan-300 font-mono text-sm mb-2">
                      {'> N° TARJETA'}
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s+/g, '');
                        if (value.length <= 16) {
                          setCardNumber(
                            value.replace(/(\d{4})/g, '$1 ').trim()
                          );
                        }
                      }}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition backdrop-blur-sm font-mono text-sm"
                      required
                    />
                  </div>

                  {/* Expiración y CVC */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cyan-300 font-mono text-xs mb-1">
                        {'> VENCE'}
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 4) {
                            setCardExpiry(
                              value.length >= 2
                                ? `${value.slice(0, 2)}/${value.slice(2)}`
                                : value
                            );
                          }
                        }}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition backdrop-blur-sm font-mono text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-cyan-300 font-mono text-xs mb-1">
                        {'> CVC'}
                      </label>
                      <input
                        type="text"
                        value={cardCVC}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 3) setCardCVC(value);
                        }}
                        placeholder="123"
                        className="w-full px-3 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition backdrop-blur-sm font-mono text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Resumen */}
                  <div className="p-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg">
                    <div className="text-xs text-purple-400 font-mono mb-1">
                      TOTAL A PAGAR
                    </div>
                    <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </div>
                  </div>
                </form>

                {/* Botones */}
                <div className="space-y-3">
                  <button
                    onClick={handleConfirmPay}
                    disabled={
                      isProcessing ||
                      !cardNumber ||
                      !cardName ||
                      !cardExpiry ||
                      !cardCVC
                    }
                    className="btn-neon btn-neon-cyan w-full py-3 rounded-lg font-black disabled:opacity-50"
                  >
                    {isProcessing ? '⏳ PROCESANDO...' : '✓ CONFIRMAR PAGO'}
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="btn-neon btn-neon-pink w-full py-3 rounded-lg font-black text-sm"
                  >
                    Atrás
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
