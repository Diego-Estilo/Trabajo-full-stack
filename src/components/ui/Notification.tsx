'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
}

export default function Notification({
  message,
  isVisible,
}: NotificationProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsRemoving(false);
      const timer = setTimeout(() => {
        setIsRemoving(true);
      }, 2700);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-24 right-6 z-[100] transition-all duration-500 transform ${
        isRemoving ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      }`}
    >
      <div className="glass border-neon/30 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px]">
        <div className="bg-neon/20 p-2 rounded-xl">
          <CheckCircle2 className="text-neon w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black text-neon uppercase tracking-widest mb-0.5">Sistemas</p>
          <p className="text-sm font-bold text-white/90">{message}</p>
        </div>
        <button className="text-white/20 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
