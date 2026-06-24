import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

type SuccessToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};

export default function SuccessToast({
  message,
  onClose,
  duration = 5000,
}: SuccessToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className=" animate-in fade-in slide-in-from-top-4 duration-300 mb-6">
      <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/50 shadow-lg shadow-emerald-900/5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm shadow-emerald-500/20">
            <CheckCircle2 size={18} />
          </div>

          <div className="flex flex-col">
            <p className="text-md font-bold text-emerald-900 dark:text-emerald-100">
              Success
            </p>
            <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80">
              {message}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="ml-2 p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
