'use client';

import { X } from 'lucide-react';
import AuthPage from './AuthPage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-[2.5rem]">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 z-20 p-2 glass rounded-full text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <AuthPage onAuthSuccess={onClose} />
      </div>
    </div>
  );
}
