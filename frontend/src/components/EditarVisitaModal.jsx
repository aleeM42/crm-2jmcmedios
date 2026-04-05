// ==============================================
// EditarVisitaModal.jsx — Modal para modificar una visita existente
// ==============================================
import { useState, useEffect } from 'react';
import AlertError from './AlertError.jsx';
import { resolveErrorMessage } from '../utils/errorMessages.js';
import { modificarVisita } from '../services/visita.service.js';

export default function EditarVisitaModal({ visita: visitaOriginal, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    objetivo_visita: '',
    tipo: '',
    lugar: '',
    efectiva: '',
    detalle: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Pre-llenar datos al montar ──────────────────────────
  useEffect(() => {
    if (!visitaOriginal) return;

    setFormData({
      fecha: visitaOriginal.fecha ? visitaOriginal.fecha.split('T')[0] : '',
      hora: visitaOriginal.hora || '',
      objetivo_visita: visitaOriginal.objetivo_visita || '',
      tipo: visitaOriginal.tipo?.toLowerCase() || '',
      lugar: visitaOriginal.lugar || '',
      efectiva: visitaOriginal.efectiva?.toLowerCase() || '',
      detalle: visitaOriginal.detalle || '',
    });
  }, [visitaOriginal]);

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
    if (!formData.hora) return setError('La hora es obligatoria.');
    if (!formData.objetivo_visita?.trim()) return setError('El objetivo es obligatorio.');
    if (!formData.tipo) return setError('El tipo de visita es obligatorio.');
    if (!formData.lugar?.trim()) return setError('El lugar es obligatorio.');
    if (!formData.efectiva) return setError('Indique si fue efectiva o no.');

    setLoading(true);
    try {
      const payload = {
        fecha: formData.fecha,
        hora: formData.hora,
        objetivo_visita: formData.objetivo_visita,
        tipo: formData.tipo,
        lugar: formData.lugar,
        efectiva: formData.efectiva,
        detalle: formData.detalle,
      };

      const result = await modificarVisita(visitaOriginal.id, payload);
      if (result.success) {
        onSuccess(result.data);
      }
    } catch (err) {
      setError(resolveErrorMessage(err, 'visitas'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">edit_calendar</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 font-display text-base">Modificar Visita</h3>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest">{visitaOriginal?.cliente_nombre || 'Cliente'}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-slate-500 text-lg">close</span>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <form id="editar-visita-form" className="p-6 space-y-6" onSubmit={handleSubmit}>
            {error && <AlertError message={error} onClose={() => setError('')} />}

            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fecha <span className="text-red-500">*</span></label>
                  <input name="fecha" value={formData.fecha} onChange={handleChange} type="date" className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Hora <span className="text-red-500">*</span></label>
                  <input name="hora" value={formData.hora} onChange={handleChange} type="time" className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tipo <span className="text-red-500">*</span></label>
                  <select name="tipo" value={formData.tipo} onChange={handleChange} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required>
                    <option value="">Seleccionar tipo...</option>
                    <option value="llamada">Llamada</option>
                    <option value="presencial">Presencial</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lugar <span className="text-red-500">*</span></label>
                  <input name="lugar" value={formData.lugar} onChange={handleChange} type="text" placeholder="Oficina, Zoom, etc." className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Objetivo de la Visita <span className="text-red-500">*</span></label>
                  <input name="objetivo_visita" value={formData.objetivo_visita} onChange={handleChange} type="text" className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">¿Fue efectiva? <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-4 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="efectiva" value="si" checked={formData.efectiva === 'si'} onChange={handleChange} className="text-accent-green focus:ring-accent-green w-4 h-4" />
                      <span className="text-sm font-medium text-slate-700">Sí</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="efectiva" value="no" checked={formData.efectiva === 'no'} onChange={handleChange} className="text-red-500 focus:ring-red-500 w-4 h-4" />
                      <span className="text-sm font-medium text-slate-700">No</span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Detalle / Resultado</label>
                  <textarea name="detalle" rows={3} value={formData.detalle} onChange={handleChange} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary resize-none" placeholder="Observaciones de la visita..." />
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-colors">
            Cancelar
          </button>
          <button
            type="submit"
            form="editar-visita-form"
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
