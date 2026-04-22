'use client';

import { CartItem } from '@/app/types';

interface CartModalProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (gameId: number) => void;
  onCheckout?: () => void;
}

export default function CartModal({
  isOpen,
  items,
  onClose,
  onRemove,
  onCheckout,
}: CartModalProps) {
  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="card-neon rounded-xl max-w-md w-full max-h-[90vh] flex flex-col relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-cyan-400 hover:text-pink-400 transition z-10"
          >
            ✕
          </button>

          <div className="p-6 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <h2 className="text-3xl font-black mb-6 glow-text flex-shrink-0">
              MI <span className="glow-text-pink">CARRITO</span>
            </h2>

            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-3xl mb-3">🛒</p>
                <p className="text-purple-300/70">Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                {/* Items - Scrollable */}
                <div className="space-y-3 mb-6 overflow-y-auto flex-1 pr-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-slate-800/50 border border-cyan-500/30 rounded-lg hover:border-cyan-400 transition flex-shrink-0"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="font-bold text-cyan-100">
                            {item.titulo}
                          </div>
                          <div className="text-xs text-purple-400 font-mono mt-1">
                            Cantidad: x{item.cantidad}
                          </div>
                        </div>
                        <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                          ${(item.precio * item.cantidad).toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-xs btn-neon btn-neon-pink px-3 py-1 rounded w-full"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 my-6 flex-shrink-0"></div>

                {/* Total - Fixed at bottom */}
                <div className="mb-6 flex-shrink-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-purple-300/70 font-mono">
                      Subtotal:
                    </span>
                    <span className="text-cyan-100">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-cyan-100">Total:</h3>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </h3>
                  </div>
                </div>

                {/* Checkout buttons - Fixed at bottom */}
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <button
                    onClick={onCheckout}
                    className="btn-neon btn-neon-cyan w-full py-3 rounded-lg font-black text-lg"
                  >
                    PROCEDER AL PAGO
                  </button>

                  <button
                    onClick={onClose}
                    className="btn-neon btn-neon-pink w-full py-3 rounded-lg font-black text-sm"
                  >
                    Seguir Comprando
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
