import { AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

type ErrorToastProps = {
  message: string;
  onClose?: () => void;
};

export default function ErrorToast({ message, onClose }: ErrorToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="w-full mb-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900/50">

        <div className="flex items-center gap-3 p-4 pl-6">
          <div className="shrink-0 text-red-600">
            <AlertCircle size={20} strokeWidth={2.5} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-bold text-red-800 dark:text-red-400">
              {message}
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
