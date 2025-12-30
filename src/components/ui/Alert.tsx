import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  isOpen: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const Alert = ({
  type = 'info',
  title,
  message,
  isOpen,
  onClose,
  autoClose = false,
  autoCloseDelay = 5000,
}: AlertProps) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const styles = {
    success: 'bg-green-50 border-green-500 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    error: 'bg-red-50 border-red-500 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    info: 'bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  };

  useEffect(() => {
    if (autoClose && isOpen && onClose) {
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, isOpen, onClose, autoCloseDelay]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50 max-w-md"
        >
          <div className={cn('rounded-lg border-l-4 p-4 shadow-lg', styles[type])}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">{icons[type]}</div>
              <div className="flex-1">
                {title && <h3 className="font-semibold mb-1">{title}</h3>}
                <p className="text-sm">{message}</p>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="flex-shrink-0 hover:opacity-70 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
