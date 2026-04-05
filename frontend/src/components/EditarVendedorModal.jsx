// ==============================================
// EditarVendedorModal.jsx — Modal de edición de Vendedor
// Entidades: USUARIO + VENDEDOR + TELEFONOS
// ==============================================
import { useState, useEffect } from 'react';
import { actualizarVendedor, getDirectores } from '../services/vendedor.service.js';
import { resolveErrorMessage } from '../utils/errorMessages.js';
import AlertError from './AlertError.jsx';

export default function EditarVendedorModal({ vendedorOriginal, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    // --- USUARIO ---
    primer_nombre: '',
    primer_apellido: '',
    correo: '',
    nombre_usuario: '',
    password: '',
    estado: 'Activo',
    // --- VENDEDOR ---
    tipo: 'Vendedor',
    meta: '',
    fk_vendedor_jefe: '',
    // --- TELEFONOS ---
    telefonos: [{ codigo_area: '', numero: '' }],
  });
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Esc key close
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    getDirectores()
      .then(res => { if (res.success) setDirectores(res.data); })
      .catch(() => { });
      
    if (vendedorOriginal) {
      // Normalize telefonos ensuring there's at least one empty entry if they have none
      let tels = [{ codigo_area: '', numero: '' }];
      if (vendedorOriginal.telefonos && vendedorOriginal.telefonos.length > 0) {
        tels = vendedorOriginal.telefonos.map(t => ({
          codigo_area: t.codigo_area || '',
          numero: t.numero || ''
        }));
      }

      setFormData({
        primer_nombre: vendedorOriginal.primer_nombre || '',
        primer_apellido: vendedorOriginal.primer_apellido || '',
        correo: vendedorOriginal.correo || '',
        nombre_usuario: vendedorOriginal.nombre_usuario || '',
        password: '', // Empty password by default on edit
        estado: vendedorOriginal.estado || 'Activo',
        tipo: vendedorOriginal.tipo || 'Vendedor',
        meta: vendedorOriginal.meta ? vendedorOriginal.meta.toString() : '0',
        fk_vendedor_jefe: vendedorOriginal.fk_vendedor_jefe ? vendedorOriginal.fk_vendedor_jefe.toString() : '',
        telefonos: tels,
      });
      setLoadingData(false);
    }
  }, [vendedorOriginal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTelChange = (index, field, value) => {
    let newVal = value;
    if (field === 'numero') {
      newVal = newVal.replace(/\D/g, '').slice(0, 7);
    }
    setFormData((prev) => {
      const telefonos = [...prev.telefonos];
      telefonos[index] = { ...telefonos[index], [field]: newVal };
      return { ...prev, telefonos };
    });
  };

  const addTelefono = () =>
    setFormData((prev) => ({
      ...prev,
      telefonos: [...prev.telefonos, { codigo_area: '', numero: '' }],
    }));

  const removeTelefono = (index) =>
    setFormData((prev) => ({
      ...prev,
      telefonos: prev.telefonos.filter((_, i) => i !== index),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ── Validaciones locales ─────────────────────────────
    const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    const PHONE_RE = /^\d{7}$/;
    const NAME_RE = /^[A-Za-zÁ-Úá-úñÑ\s]+$/;

    if (!formData.primer_nombre?.trim())
      return setError('El primer nombre es obligatorio.');
    if (!NAME_RE.test(formData.primer_nombre.trim()))
      return setError('El primer nombre debe contener únicamente letras, sin números ni caracteres especiales.');

    if (!formData.primer_apellido?.trim())
      return setError('El primer apellido es obligatorio.');
    if (!NAME_RE.test(formData.primer_apellido.trim()))
      return setError('El primer apellido debe contener únicamente letras, sin números ni caracteres especiales.');

    if (!formData.correo?.trim())
      return setError('El correo electrónico es obligatorio.');
    if (!EMAIL_RE.test(formData.correo.trim()))
      return setError('El correo electrónico no tiene un formato válido (debe ser del tipo usuario@dominio.com).');

    if (!formData.nombre_usuario?.trim())
      return setError('El nombre de usuario es obligatorio.');

    const metaNum = parseFloat(formData.meta);
    if (formData.meta !== '' && (isNaN(metaNum) || metaNum < 0))
      return setError('La meta anual debe ser un valor numérico mayor o igual a cero.');

    // Teléfonos: todos los que se hayan iniciado deben estar completos
    for (let i = 0; i < formData.telefonos.length; i++) {
      const tel = formData.telefonos[i];
      if (tel.codigo_area || tel.numero) {
        if (!tel.codigo_area)
          return setError(`Teléfono ${i + 1}: Por favor, seleccione un código de área.`);
        if (!tel.numero)
          return setError(`Teléfono ${i + 1}: El cuerpo del teléfono es obligatorio.`);
        if (!PHONE_RE.test(tel.numero))
          return setError(`Teléfono ${i + 1}: El número telefónico debe tener exactamente 7 dígitos numéricos, sin letras ni espacios.`);
      }
    }

    setLoading(true);
    try {
      const payload = {
        usuario: {
          primer_nombre: formData.primer_nombre,
          primer_apellido: formData.primer_apellido,
          correo: formData.correo,
          nombre_usuario: formData.nombre_usuario,
          password: formData.password, // Podría estar vacío si no lo cambia
          rol: formData.tipo,
          estado: formData.estado,
        },
        vendedor: {
          meta: parseInt(formData.meta, 10) || 0,
          tipo: formData.tipo,
          fk_vendedor_jefe: formData.fk_vendedor_jefe || null,
        },
        telefonos: formData.telefonos.filter(t => t.codigo_area && t.numero),
      };

      const result = await actualizarVendedor(vendedorOriginal.id, payload);
      if (result.success) {
        onSuccess(result.data);
      }
    } catch (err) {
      setError(resolveErrorMessage(err, 'vendedores'));
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
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden animate-[fadeIn_0.2s_ease-out] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">edit</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 font-display text-base">Editar Vendedor</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{vendedorOriginal?.nombre_usuario}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-slate-500 text-lg">close</span>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {loadingData ? (
            <div className="p-12 text-center text-slate-400">Cargando datos...</div>
          ) : (
            <form id="editar-vendedor-form" className="p-8 space-y-10" onSubmit={handleSubmit}>
              {error && <AlertError message={error} onClose={() => setError('')} />}

              {/* SECCIÓN 1 — Datos Personales */}
              <section>
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3 text-slate-800">
                  <span className="material-symbols-outlined text-primary text-lg">person</span>
                  <h4 className="text-sm font-bold font-display">Datos Personales</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wide uppercase">
                      Primer Nombre<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="primer_nombre" value={formData.primer_nombre} onChange={handleChange}
                      className="w-full rounded-xl bg-[#F4FAFB] border-slate-200 focus:ring-primary focus:border-primary px-4 py-2.5 text-sm"
                      placeholder="Ej: María" type="text" required />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wide uppercase">
                      Primer Apellido<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="primer_apellido" value={formData.primer_apellido} onChange={handleChange}
                      className="w-full rounded-xl bg-[#F4FAFB] border-slate-200 focus:ring-primary focus:border-primary px-4 py-2.5 text-sm"
                      placeholder="Ej: González" type="text" required />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wide uppercase">
                      Correo<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="correo" value={formData.correo} onChange={handleChange}
                      className="w-full rounded-xl bg-[#F4FAFB] border-slate-200 focus:ring-primary focus:border-primary px-4 py-2.5 text-sm"
                      placeholder="vendedor@2jmcmedios.com" type="email" pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$" required />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wide uppercase">
                      Meta Anual ($)<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                      <input name="meta" value={formData.meta} onChange={handleChange}
                        className="w-full rounded-xl bg-[#F4FAFB] border-slate-200 focus:ring-primary focus:border-primary pl-9 pr-4 py-2.5 text-sm"
                        placeholder="0" step="1" type="number" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wide uppercase">
                      Tipo de Perfil / Rol<span className="text-red-500 ml-1">*</span>
                    </label>
                    <select name="tipo" value={formData.tipo} onChange={handleChange}
                      className="w-full rounded-xl bg-[#F4FAFB] border-slate-200 focus:ring-primary focus:border-primary px-4 py-2.5 text-sm" required>
                      <option value="Vendedor">Vendedor</option>
                      <option value="Director">Director</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wide uppercase">
                      Estado<span className="text-red-500 ml-1">*</span>
                    </label>
                    <select name="estado" value={formData.estado} onChange={handleChange}
                      className="w-full rounded-xl bg-[#F4FAFB] border-slate-200 focus:ring-primary focus:border-primary px-4 py-2.5 text-sm" required>
                      <option value="Activo">Activo</option>
                      <option value="Suspendido">Suspendido</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wide uppercase">
                      Director Jefe
                    </label>
                    <select name="fk_vendedor_jefe" value={formData.fk_vendedor_jefe} onChange={handleChange}
                      className="w-full rounded-xl bg-[#F4FAFB] border-slate-200 focus:ring-primary focus:border-primary px-4 py-2.5 text-sm">
                      <option value="">Sin jefe asignado</option>
                      {directores.map(d => (
                        <option key={d.id} value={d.id}>{d.primer_nombre} {d.primer_apellido}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* SECCIÓN 2 — Teléfonos */}
              <section>
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3 text-slate-800">
                  <span className="material-symbols-outlined text-accent-green text-lg">call</span>
                  <h4 className="text-sm font-bold font-display">Teléfonos</h4>
                </div>

                <div className="space-y-4">
                  {formData.telefonos.map((tel, idx) => (
                    <div key={idx} className="flex gap-4 items-end">
                      <div className="w-24 space-y-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Cód.<span className="text-red-500 ml-1">*</span></label>
                        <select name="codigo_area" value={tel.codigo_area}
                          onChange={(e) => handleTelChange(idx, 'codigo_area', e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-[#F4FAFB] focus:ring-primary focus:border-primary pl-4 pr-5 py-2.5 text-sm"
                          required>
                          <option value="">Cod</option>
                          <option value="0414">0414</option>
                          <option value="0426">0426</option>
                          <option value="0412">0412</option>
                          <option value="0422">0422</option>
                          <option value="0424">0424</option>
                          <option value="0416">0416</option>
                        </select>
                      </div>
                      <div className="flex-1 space-y-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Número<span className="text-red-500 ml-1">*</span></label>
                        <input name="numero" value={tel.numero}
                          onChange={(e) => handleTelChange(idx, 'numero', e.target.value)}
                          className="w-full rounded-xl bg-[#F4FAFB] border-slate-200 focus:ring-primary focus:border-primary px-4 py-2.5 text-sm"
                          placeholder="1234567" type="text" minLength="7" maxLength="7" pattern="\d{7}" title="Debe contener exactamente 7 números" required />
                      </div>
                      {formData.telefonos.length > 1 && (
                        <button className="p-2.5 mb-0.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" type="button" onClick={() => removeTelefono(idx)}>
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button className="mt-4 flex items-center text-primary font-medium text-sm hover:text-secondary opacity-90 transition-colors" type="button" onClick={addTelefono}>
                  <span className="material-symbols-outlined mr-1 text-[18px]">add_circle</span>Nuevo Teléfono
                </button>
              </section>

              {/* SECCIÓN 3 — Credenciales */}
              <section>
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3 text-slate-800">
                  <span className="material-symbols-outlined text-slate-500 text-lg">key</span>
                  <h4 className="text-sm font-bold font-display">Credenciales de Acceso</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wide uppercase">
                      Nombre de Usuario<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="nombre_usuario" value={formData.nombre_usuario} onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 focus:ring-primary focus:border-primary px-4 py-2.5 text-sm bg-[#F4FAFB]"
                      placeholder="Ej: mgonzalez2jmc" type="text" required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-[11px] font-bold text-slate-500 tracking-wide uppercase">
                        Contraseña
                      </label>
                      <span className="text-[10px] text-slate-400">Opcional (Dejar en blanco para mantener)</span>
                    </div>
                    <div className="relative">
                      <input name="password" value={formData.password} onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 focus:ring-primary focus:border-primary pl-4 pr-12 py-2.5 text-sm bg-[#F4FAFB]"
                        placeholder="••••••••" type={showPassword ? "text" : "password"} />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors flex items-center justify-center p-1"
                        tabIndex="-1"
                      >
                        <span className="material-symbols-outlined select-none text-[18px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-colors">
            Cancelar
          </button>
          <button
            type="submit"
            form="editar-vendedor-form"
            disabled={loading || loadingData}
            className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-60"
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
