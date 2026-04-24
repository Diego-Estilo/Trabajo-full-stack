'use client';

import { useAuth } from '@/features/auth/AuthContext';
import { useState } from 'react';
import { Package, Calendar, Check, Download, X, ArrowLeft } from 'lucide-react';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrdersModal({ isOpen, onClose }: OrdersModalProps) {
  const { orders, user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrder = orders.find((o) => o.id === selectedOrder);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="card-neon rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="sticky top-4 right-4 float-right text-2xl text-neon hover:text-muted transition z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8">
            {!selectedOrder ? (
              <>
                {/* Historial de órdenes */}
                <h2 className="text-3xl font-black mb-2 glow-text">
                  HISTORIAL <span className="glow-text-pink">COMPRAS</span>
                </h2>
                <p className="text-gray-400 font-mono text-sm mb-6">
                  {`// Usuario: ${user?.name}`}
                </p>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-muted mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">
                      Aún no tienes compras
                    </p>
                    <button
                      onClick={onClose}
                      className="btn-neon btn-neon-cyan px-6 py-2 rounded-lg font-bold"
                    >
                      Ir a Comprar
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <button
                        key={order.id}
                        onClick={() => setSelectedOrder(order.id)}
                        className="card-neon rounded-xl p-4 w-full text-left hover:border-neon transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="text-sm text-neon font-mono mb-1">
                              {'> ORDEN #' + order.id.slice(0, 8)}
                            </div>
                            <div className="text-xs text-gray-400 font-mono">
                              <Calendar className="w-4 h-4 inline mr-1" />
                              {order.date}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-400 font-mono mb-1">
                              {order.items.length} artículo
                              {order.items.length !== 1 ? 's' : ''}
                            </div>
                            <div className="text-xl font-black bg-gradient-to-r from-neon to-muted bg-clip-text text-transparent">
                              ${order.total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-neon/60 font-mono">
                          {'→ Haz click para ver detalles'}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : currentOrder ? (
              <>
                {/* Detalle de orden */}
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-neon hover:text-muted font-mono text-sm mb-4 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Volver
                </button>

                <h2 className="text-3xl font-black mb-2 glow-text-pink">
                  ORDEN{' '}
                  <span className="glow-text">
                    #{currentOrder.id.slice(0, 8)}
                  </span>
                </h2>

                <div className="space-y-2 mb-6 text-sm text-gray-400 font-mono">
                  <p><Calendar className="w-4 h-4 inline mr-1" />
                              Fecha: {currentOrder.date}</p>
                  <p><Package className="w-4 h-4 inline mr-1" />
                              Estado: <Check className="w-4 h-4 inline text-neon" /> COMPLETADA</p>
                </div>

                {/* Items */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">
                    Productos:
                  </h3>
                  <div className="space-y-2">
                    {currentOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-card/50 border border-neon/30 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold text-white text-sm">
                            {item.titulo}
                          </div>
                          <div className="text-xs text-gray-400 font-mono">
                            Cantidad: {item.cantidad}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400 mb-1">
                            ${item.precio.toFixed(2)} c/u
                          </div>
                          <div className="font-bold bg-gradient-to-r from-neon to-muted bg-clip-text text-transparent">
                            ${(item.precio * item.cantidad).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-neon/0 via-neon/50 to-neon/0 my-6"></div>

                {/* Total */}
                <div className="bg-card/50 border border-neon/30 rounded-xl p-4 mb-6">
                  <div className="text-xs text-gray-400 font-mono mb-2">
                    TOTAL DE LA ORDEN
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-neon to-muted bg-clip-text text-transparent">
                    ${currentOrder.total.toFixed(2)}
                  </div>
                </div>

                {/* Botón descargar recibo */}
                <button className="btn-neon btn-neon-cyan w-full py-3 rounded-lg font-black mb-3 flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> DESCARGAR RECIBO
                </button>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="btn-neon btn-neon-pink w-full py-3 rounded-lg font-black text-sm"
                >
                  Volver
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
