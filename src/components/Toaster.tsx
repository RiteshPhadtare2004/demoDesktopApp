import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

const toasts: Toast[] = [];
const listeners: ((toasts: Toast[]) => void)[] = [];

export const addToast = (toast: Omit<Toast, 'id'>) => {
  const newToast: Toast = {
    ...toast,
    id: Math.random().toString(36).substr(2, 9),
    duration: toast.duration || 5000,
  };
  
  toasts.push(newToast);
  listeners.forEach(listener => listener([...toasts]));
  
  setTimeout(() => {
    removeToast(newToast.id);
  }, newToast.duration);
};

export const removeToast = (id: string) => {
  const index = toasts.findIndex(toast => toast.id === id);
  if (index > -1) {
    toasts.splice(index, 1);
    listeners.forEach(listener => listener([...toasts]));
  }
};

export const Toaster: React.FC = () => {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setCurrentToasts(newToasts);
    };
    
    listeners.push(listener);
    
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getColors = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {currentToasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm w-full border rounded-lg p-4 shadow-lg animate-slide-in ${getColors(toast.type)}`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getIcon(toast.type)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{toast.title}</p>
              {toast.message && (
                <p className="mt-1 text-sm opacity-90">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 flex-shrink-0 rounded-md p-1.5 hover:bg-black hover:bg-opacity-10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};