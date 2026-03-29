// ==============================================
// AlertError.jsx — Componente reutilizable de alerta de error
// Diseño moderno con animación fade-in, icono, y botón de cierre.
// ==============================================
import { useState, useEffect } from 'react';

/**
 * @param {string}   message    — Mensaje de error a mostrar.
 * @param {function} onClose    — Callback opcional al cerrar la alerta.
 * @param {number}   autoClose  — Milisegundos para cerrar automáticamente (0 = no cerrar).
 * @param {'error'|'warning'} variant — Variante visual (default: 'error').
 */
export default function AlertError({ message, onClose, autoClose = 0, variant = 'error' }) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setExiting(false);
    }
  }, [message]);

  useEffect(() => {
    if (autoClose > 0 && message) {
      const timer = setTimeout(() => handleClose(), autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, message]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 300);
  };

  if (!message || !visible) return null;

  const isWarning = variant === 'warning';

  const bgColor     = isWarning ? 'bg-amber-50'      : 'bg-red-50';
  const borderColor = isWarning ? 'border-amber-200'  : 'border-red-200';
  const iconColor   = isWarning ? 'text-amber-500'    : 'text-red-500';
  const textColor   = isWarning ? 'text-amber-800'    : 'text-red-700';
  const barColor    = isWarning ? 'bg-amber-400'      : 'bg-red-400';
  const iconName    = isWarning ? 'warning'           : 'error';
  const closeHover  = isWarning ? 'hover:bg-amber-100' : 'hover:bg-red-100';

  return (
    <div
      role="alert"
      className={`
        mb-6 rounded-xl border overflow-hidden shadow-sm
        ${bgColor} ${borderColor}
        transition-all duration-300 ease-out
        ${exiting ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}
      `}
      style={{ animation: exiting ? 'none' : 'alertSlideIn 0.35s cubic-bezier(0.22,1,0.36,1)' }}
    >
      {/* Barra lateral decorativa */}
      <div className="flex">
        <div className={`w-1 ${barColor} shrink-0`} />

        <div className="flex items-start gap-3 p-4 flex-1 min-w-0">
          {/* Icono */}
          <span className={`material-symbols-outlined ${iconColor} text-[22px] mt-0.5 shrink-0`}>
            {iconName}
          </span>

          {/* Texto */}
          <p className={`text-sm font-medium leading-relaxed ${textColor} flex-1 min-w-0`}>
            {message}
          </p>

          {/* Botón cerrar */}
          {onClose && (
            <button
              type="button"
              onClick={handleClose}
              className={`
                shrink-0 w-7 h-7 flex items-center justify-center rounded-lg
                ${iconColor} ${closeHover} transition-colors
              `}
              aria-label="Cerrar alerta"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Inline keyframes — no requiere CSS externo */}
      <style>{`
        @keyframes alertSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
