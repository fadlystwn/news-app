'use client';

import { useToast } from './ToastContext';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => {
        const bgColor =
          toast.type === 'error'
            ? 'bg-red-600'
            : toast.type === 'success'
            ? 'bg-green-600'
            : 'bg-blue-600';

        return (
          <div
            key={toast.id}
            className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[280px] max-w-[400px] animate-slide-in`}
            role="alert"
          >
            <span className="flex-1 text-sm">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/80 hover:text-white text-lg leading-none"
              aria-label="Close toast"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
