// ==============================================
// EditarGastoModal.jsx — Modal para modificar un gasto de marketing
// ==============================================
import { useState, useEffect } from 'react';
import AlertError from './AlertError.jsx';
import { resolveErrorMessage } from '../utils/errorMessages.js';
import { modificarGastoMarketing } from '../services/gasto.service.js';

export default function EditarGastoModal({ gasto: gastoOriginal, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    fecha: '',
    concepto: '',
    monto: '',
    tipo: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Pre-llenar datos al montar ──────────────────────────
  useEffect(() => {
    if (!gastoOriginal) return;

    setFormData({
      fecha: gastoOriginal.fecha ? gastoOriginal.fecha.split('T')[0] : '',
      concepto: gastoOriginal.concepto || '',
      monto: gastoOriginal.monto || '',
      tipo: gastoOriginal.tipo?.toLowerCase() || '',
    });
  }, [gastoOriginal]);

  // ── Cerrar con ESC ──────────────────────────────────────
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Submit ──────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.fecha) return setError('La fecha es obligatoria.');
    if (!formData.concepto?.trim()) return setError('El concepto es obligatorio.');
    if (!formData.monto || parseFloat(formData.monto) <= 0) return setError('El monto debe ser mayor a cero.');
    if (!formData.tipo) return setError('La categoría (tipo) es obligatoria.');

    setLoading(true);
    try {
      const payload = {
        fecha: formData.fecha,
        concepto: formData.concepto,
        monto: parseFloat(formData.monto),
        tipo: formData.tipo,
        fk_cliente: gastoOriginal.fk_cliente || null,
        fk_aliado_c: gastoOriginal.fk_aliado_c || null,
      };

      const result = await modificarGastoMarketing(gastoOriginal.id, payload);
      if (result.success) {
        onSuccess(result.data);
      }
    } catch (err) {
      setError(resolveErrorMessage(err, 'gastos'));
    } finally {
      setLoading(false);
    }
  };

  const entityName = gastoOriginal?.cliente_nombre || gastoOriginal?.aliado_nombre || 'Entidad';
  const entityType = gastoOriginal?.cliente_nombre ? 'Cliente' : gastoOriginal?.aliado_nombre ? 'Aliado' : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">edit_square</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 font-display text-base">Modificar Gasto</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{entityName} {entityType && `(${entityType})`}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-slate-500 text-lg">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <form id="editar-gasto-form" className="p-6 space-y-6" onSubmit={handleSubmit}>
            {error && <AlertError message={error} onClose={() => setError('')} />}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fecha <span className="text-red-500">*</span></label>
                <input name="fecha" value={formData.fecha} onChange={handleChange} type="date" className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Categoría <span className="text-red-500">*</span></label>
                <select name="tipo" value={formData.tipo} onChange={handleChange} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required>
                  <option value="">Seleccionar...</option>
                  <option value="campaña">Campaña</option>
                  <option value="remota">Remota</option>
                  <option value="regalos corporativos">Regalos Corporativos</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Concepto / Motivo <span className="text-red-500">*</span></label>
                <input name="concepto" value={formData.concepto} onChange={handleChange} type="text" placeholder="Ej. Flyers para evento" className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required />
              </div>
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Monto Total ($) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">attach_money</span>
                  <input name="monto" value={formData.monto} onChange={handleChange} type="number" step="0.01" min="0.01" placeholder="0.00" className="w-full pl-9 rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-colors">
            Cancelar
          </button>
          <button
            type="submit"
            form="editar-gasto-form"
            disabled={loading}
            className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                Guardando...
              </span>
            ) : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}
