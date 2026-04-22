'use client';

import { useEffect, useState } from 'react';

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
      className={`fixed top-6 right-6 px-6 py-4 rounded-lg font-mono text-sm font-bold shadow-lg shadow-cyan-500/50 border border-cyan-500/50 notification ${
        isRemoving ? 'removing' : ''
      } bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-100 backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg animate-pulse-glow">✓</span>
        <span>{message}</span>
      </div>
    </div>
  );
}
