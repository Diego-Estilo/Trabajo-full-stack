'use client';

import { useState, useCallback } from 'react';

interface UseNotificationReturn {
  notification: string;
  isVisible: boolean;
  showNotification: (message: string) => void;
  hideNotification: () => void;
}

export function useNotification(duration: number = 3000): UseNotificationReturn {
  const [notification, setNotification] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const showNotification = useCallback((message: string) => {
    setNotification(message);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), duration);
  }, [duration]);

  const hideNotification = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    notification,
    isVisible,
    showNotification,
    hideNotification,
  };
}