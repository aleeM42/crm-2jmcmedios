// ==============================================
// EditarAliadoModal.jsx — Modal de edición de aliado comercial (emisora)
// ==============================================
import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import AlertError from './AlertError.jsx';
import { resolveErrorMessage } from '../utils/errorMessages.js';

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^\d{7}$/;
const today = new Date().toISOString().split('T')[0];

const CATEGORIAS_DEFAULT = [
  { id: 'multitarget', nombre: 'Multitarget' },
  { id: 'comunitaria', nombre: 'Comunitaria' },
  { id: 'juvenil', nombre: 'Juvenil' },
  { id: 'adulto joven', nombre: 'Adulto joven' },
  { id: 'popular', nombre: 'Popular' },
  { id: 'adulto', nombre: 'Adulto' },
  { id: 'deportiva', nombre: 'Deportiva' },
];

export default function EditarAliadoModal({ emisora: emisoraOriginal, onClose, onSuccess }) {
  // ── State: datos del aliado ──────────────────────────────
  const [aliado, setAliado] = useState({
    razon_social: '',
    nombre_emisora: '',
    rif: '',
    frecuencia: '',
    categoria: '',
    estado: 'activo',
    direccion: '',
    fk_lugar: '',
    fk_region: '',
    fk_cobertura: '',
  });

  // ── State: contactos (con teléfonos embebidos) ───────────
  const [contactos, setContactos] = useState([]);

  // ── Lookups ──────────────────────────────────────────────
  const [regiones, setRegiones] = useState([]);
  const [estados, setEstados] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [coberturas, setCoberturas] = useState([]);
  const [categorias, setCategorias] = useState(CATEGORIAS_DEFAULT);

  // ── UI ───────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rifError, setRifError] = useState('');
  const [frecuenciaError, setFrecuenciaError] = useState('');

  // ── Pre-llenar datos al montar ──────────────────────────
  useEffect(() => {
    if (!emisoraOriginal) return;

    setAliado({
      razon_social: emisoraOriginal.razon_social || '',
      nombre_emisora: emisoraOriginal.nombre_emisora || '',
      rif: emisoraOriginal.rif || '',
      frecuencia: emisoraOriginal.frecuencia || '',
      categoria: emisoraOriginal.categoria || '',
      estado: emisoraOriginal.estado || 'activo',
      direccion: emisoraOriginal.direccion || '',
      fk_lugar: emisoraOriginal.fk_lugar || emisoraOriginal.fk_ciudad || '',
      fk_region: emisoraOriginal.fk_region || '',
      fk_cobertura: emisoraOriginal.fk_cobertura || '',
    });

    // Encontrar el estado padre para pre-cargar ciudades
    if (emisoraOriginal.fk_lugar) {
      // fk_lugar apunta a fk_lugar(estado) en el modelo de creación, pero en BD
      // es posible que apunte a la ciudad. Necesitamos el estado geográfico.
      // Si hay fk_ciudad, el estado se infiere del padre.
      // Usamos un estado temporal que se resuelve al cargar lookups.
    }

    // Pre-llenar contactos
    const contactosData = (emisoraOriginal.contactos || []).map(c => ({
      id: c.id,
      primer_nombre: c.pri_nombre || c.primer_nombre || '',
      segundo_nombre: c.seg_nombre || c.segundo_nombre || '',
      primer_apellido: c.pri_apellido || c.primer_apellido || '',
      departamento: c.departamento || '',
      correo: c.correo || '',
      rol: c.rol || '',
      fecha_nacimiento: c.fecha_nac ? c.fecha_nac.split('T')[0] : '',
      anotaciones_especiales: c.anotac_especiales || c.anotaciones_especiales || '',
      telefonos: (c.telefonos || []).map(t => ({
        codigo_area: t.codigo_area || '',
        numero: t.numero || '',
      })),
    }));
    setContactos(contactosData.length > 0 ? contactosData : [{
      primer_nombre: '', segundo_nombre: '', primer_apellido: '',
      departamento: '', correo: '', rol: '', fecha_nacimiento: '',
      anotaciones_especiales: '',
      telefonos: [{ codigo_area: '', numero: '' }],
    }]);
  }, [emisoraOriginal]);

  // ── Cargar lookups ──────────────────────────────────────
  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [resRegiones, resEstados, resCoberturas, resCategorias] = await Promise.all([
          api.get('/lugares?tipo=Region').catch(() => ({ success: false })),
          api.get('/lugares?tipo=Estado').catch(() => ({ success: false })),
          api.get('/coberturas').catch(() => ({ success: false })),
          api.get('/categorias').catch(() => ({ success: false })),
        ]);

        if (resRegiones.success) setRegiones(Array.isArray(resRegiones.data) ? resRegiones.data : []);
        if (resEstados.success) {
          const estadosList = Array.isArray(resEstados.data) ? resEstados.data : [];
          setEstados(estadosList);

          // Intentar resolver el estado geográfico desde la ciudad pre-cargada
          if (emisoraOriginal?.fk_lugar && estadosList.length > 0) {
            // El fk_lugar del aliado apunta a la ciudad. Buscamos su padre (estado).
            try {
              const resCiudad = await api.get(`/lugares/${emisoraOriginal.fk_lugar}`);
              if (resCiudad.success && resCiudad.data?.padre_id) {
                setSelectedEstado(String(resCiudad.data.padre_id));
              }
            } catch {
              // Si no podemos resolver, dejamos vacío
            }
          }
        }
        if (resCoberturas.success) setCoberturas(Array.isArray(resCoberturas.data) ? resCoberturas.data : []);
        if (resCategorias.success && resCategorias.data?.length > 0) {
          setCategorias(resCategorias.data);
        }
      } catch { /* silently ignore */ }
    };
    loadLookups();
  }, [emisoraOriginal]);

  // ── Cargar ciudades cuando cambia el estado ─────────────
  useEffect(() => {
    if (!selectedEstado) { setCiudades([]); return; }
    const fetchCiudades = async () => {
      try {
        const res = await api.get(`/lugares?padre_id=${selectedEstado}`);
        if (res.success) setCiudades(Array.isArray(res.data) ? res.data : []);
      } catch { /* silently ignore */ }
    };
    fetchCiudades();
  }, [selectedEstado]);

  // ── Cerrar con ESC ──────────────────────────────────────
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // ── Handlers: Aliado ────────────────────────────────────
  const handleAliado = useCallback((e) => {
    const { name, value } = e.target;
    setAliado(prev => ({ ...prev, [name]: value }));
  }, []);

  // ── RIF controlado ──────────────────────────────────────
  const handleRifChange = useCallback((rawValue) => {
    let val = rawValue.replace(/-/g, '').replace(/\s/g, '');
    if (val.length === 0) { setAliado(prev => ({ ...prev, rif: '' })); setRifError(''); return; }
    const firstChar = val[0].toUpperCase();
    if (!['J', 'G', 'V', 'P'].includes(firstChar)) {
      setRifError('El RIF debe comenzar con J, G, V o P');
      return;
    }
    const digits = val.slice(1).replace(/\D/g, '').slice(0, 9);
    const formatted = firstChar + digits;
    setAliado(prev => ({ ...prev, rif: formatted }));
    if (digits.length > 0 && digits.length < 9) {
      setRifError('El RIF debe tener exactamente 9 dígitos después de la letra');
    } else {
      setRifError('');
    }
  }, []);

  // ── Frecuencia controlada ───────────────────────────────
  const handleFrecuenciaChange = useCallback((val) => {
    setAliado(prev => ({ ...prev, frecuencia: val }));
    if (val && !/\b(FM|AM)$/i.test(val.trim())) {
      setFrecuenciaError('La frecuencia debe terminar en FM o AM (ej: 107.3 FM)');
    } else {
      setFrecuenciaError('');
    }
  }, []);

  // ── Handlers: Contactos ─────────────────────────────────
  const handleContactoChange = useCallback((index, field, value) => {
    if (field === 'fecha_nacimiento' && value && value > today) return;
    setContactos(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }, []);

  const agregarContacto = useCallback(() => {
    setContactos(prev => [...prev, {
      primer_nombre: '', segundo_nombre: '', primer_apellido: '',
      departamento: '', correo: '', rol: '', fecha_nacimiento: '',
      anotaciones_especiales: '',
      telefonos: [{ codigo_area: '', numero: '' }],
    }]);
  }, []);

  const eliminarContacto = useCallback((index) => {
    setContactos(prev => prev.filter((_, i) => i !== index));
  }, []);

  // ── Handlers: Teléfonos (por contacto) ──────────────────
  const handleTelefono = useCallback((contactoIdx, telIdx, field, val) => {
    let numericVal = val.replace(/\D/g, '');
    if (field === 'codigo_area') numericVal = numericVal.slice(0, 4);
    else if (field === 'numero') numericVal = numericVal.slice(0, 7);
    setContactos(prev => {
      const copy = [...prev];
      const tels = [...(copy[contactoIdx].telefonos || [])];
      tels[telIdx] = { ...tels[telIdx], [field]: numericVal };
      copy[contactoIdx] = { ...copy[contactoIdx], telefonos: tels };
      return copy;
    });
  }, []);

  const addTelefono = useCallback((contactoIdx) => {
    setContactos(prev => {
      const copy = [...prev];
      copy[contactoIdx] = {
        ...copy[contactoIdx],
        telefonos: [...(copy[contactoIdx].telefonos || []), { codigo_area: '', numero: '' }],
      };
      return copy;
    });
  }, []);

  const removeTelefono = useCallback((contactoIdx, telIdx) => {
    setContactos(prev => {
      const copy = [...prev];
      copy[contactoIdx] = {
        ...copy[contactoIdx],
        telefonos: (copy[contactoIdx].telefonos || []).filter((_, i) => i !== telIdx),
      };
      return copy;
    });
  }, []);

  // ── Submit ──────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar aliado
    if (!aliado.razon_social?.trim()) return setError('La razón social es obligatoria.');
    if (!aliado.nombre_emisora?.trim()) return setError('El nombre de la emisora es obligatorio.');
    if (!aliado.rif || aliado.rif.slice(1).replace(/\D/g, '').length !== 9) {
      setRifError('El RIF debe tener la letra (J/G/V/P) + exactamente 9 dígitos');
      return;
    }
    if (!aliado.frecuencia?.trim()) return setError('La frecuencia es obligatoria.');
    if (!/\b(FM|AM)$/i.test(aliado.frecuencia.trim())) {
      setFrecuenciaError('La frecuencia debe terminar en FM o AM (ej: 107.3 FM)');
      return;
    }
    if (!aliado.categoria) return setError('Debe seleccionar una categoría.');

    // Validar contactos
    const contactosActivos = contactos.filter(c => c.primer_nombre && c.primer_apellido);
    for (let i = 0; i < contactosActivos.length; i++) {
      const c = contactosActivos[i];
      const label = `Contacto ${i + 1}`;
      if (!c.primer_nombre?.trim()) return setError(`${label}: el primer nombre es obligatorio.`);
      if (!c.primer_apellido?.trim()) return setError(`${label}: el primer apellido es obligatorio.`);
      if (c.correo && !EMAIL_RE.test(c.correo))
        return setError(`${label}: el correo "${c.correo}" no es válido.`);

      const tels = c.telefonos || [];
      for (let j = 0; j < tels.length; j++) {
        const t = tels[j];
        if (t.codigo_area || t.numero) {
          if (!t.codigo_area) return setError(`${label}, Teléfono ${j + 1}: seleccione el código de área.`);
          if (!PHONE_RE.test(t.numero)) return setError(`${label}, Teléfono ${j + 1}: el número debe tener 7 dígitos.`);
        }
      }
    }

    setLoading(true);
    try {
      const contactosPayload = contactosActivos.map(c => ({
        ...c,
        telefonos: (c.telefonos || []).filter(t => t.codigo_area && t.numero),
      }));

      const payload = {
        razon_social: aliado.razon_social,
        nombre_emisora: aliado.nombre_emisora,
        rif: aliado.rif.toUpperCase(),
        frecuencia: aliado.frecuencia.trim().toUpperCase(),
        categoria: aliado.categoria,
        estado: aliado.estado || 'activo',
        direccion: aliado.direccion,
        fk_ciudad: parseInt(aliado.fk_lugar, 10) || null, // Ciudad (en el estado se llama fk_lugar)
        fk_lugar: parseInt(selectedEstado, 10) || null,  // Estado (valor del select superior)
        fk_region: parseInt(aliado.fk_region, 10) || null,
        fk_cobertura: parseInt(aliado.fk_cobertura, 10) || null,
        contactos: contactosPayload,
      };

      const result = await api.put(`/aliados/${emisoraOriginal.id}`, payload);
      if (result.success) {
        onSuccess(result.data);
      }
    } catch (err) {
      console.error('[EditarAliado] Error:', err?.data || err);
      setError(resolveErrorMessage(err, 'aliados'));
    } finally {
      setLoading(false);
    }
  };

  // ═══════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-[fadeIn_0.2s_ease-out] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">edit</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 font-display text-base">Editar Aliado Comercial</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{emisoraOriginal?.nombre_emisora}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-slate-500 text-lg">close</span>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <form id="editar-aliado-form" className="p-6 space-y-6" onSubmit={handleSubmit}>
            {error && <AlertError message={error} onClose={() => setError('')} />}

            {/* ═══ Datos de la Emisora ═══ */}
            <section>
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 text-slate-800">
                <span className="material-symbols-outlined text-primary text-lg">radio</span>
                <h4 className="text-sm font-bold font-display">Datos de la Emisora</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Razón Social <span className="text-red-500">*</span></label>
                  <input name="razon_social" value={aliado.razon_social} onChange={handleAliado} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="text" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nombre de la Emisora <span className="text-red-500">*</span></label>
                  <input name="nombre_emisora" value={aliado.nombre_emisora} onChange={handleAliado} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="text" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">RIF <span className="text-red-500">*</span></label>
                  <input
                    name="rif"
                    value={aliado.rif}
                    onChange={(e) => handleRifChange(e.target.value)}
                    className={`rounded-lg bg-[#F4FAFB] text-sm p-2.5 focus:ring-primary focus:border-primary ${rifError ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200'}`}
                    placeholder="J123456789" type="text" maxLength={10} required
                  />
                  {rifError && <p className="text-xs text-red-500 mt-0.5">{rifError}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Frecuencia <span className="text-red-500">*</span></label>
                  <input
                    name="frecuencia"
                    value={aliado.frecuencia}
                    onChange={(e) => handleFrecuenciaChange(e.target.value)}
                    className={`rounded-lg bg-[#F4FAFB] text-sm p-2.5 focus:ring-primary focus:border-primary ${frecuenciaError ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200'}`}
                    placeholder="107.3 FM" type="text" required
                  />
                  {frecuenciaError && <p className="text-xs text-red-500 mt-0.5">{frecuenciaError}</p>}
                </div>

                {/* Categoría */}
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Categoría <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {categorias.map(cat => (
                      <label key={cat.id || cat.nombre} className="flex items-center gap-2 text-sm bg-white border border-slate-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                        <input
                          type="radio"
                          name="categoria"
                          value={cat.nombre.toLowerCase()}
                          checked={aliado.categoria?.toLowerCase() === cat.nombre.toLowerCase()}
                          onChange={(e) => setAliado(prev => ({ ...prev, categoria: e.target.value }))}
                          className="text-primary rounded-full border-slate-300 focus:ring-primary w-4 h-4"
                        />
                        <span className="text-slate-700 font-medium">{cat.nombre}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Estado <span className="text-red-500">*</span></label>
                  <select name="estado" value={aliado.estado} onChange={handleAliado} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary">
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="cerrado">Cerrado</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dirección <span className="text-red-500">*</span></label>
                  <textarea name="direccion" value={aliado.direccion} onChange={handleAliado} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="Av. Principal..." rows="2" required />
                </div>
              </div>
            </section>

            {/* ═══ Ubicación ═══ */}
            <section>
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 text-slate-800">
                <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                <h4 className="text-sm font-bold font-display">Ubicación y Cobertura</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Región</label>
                  <select name="fk_region" value={aliado.fk_region} onChange={handleAliado} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary">
                    <option value="">Seleccione una región</option>
                    {regiones.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Estado Geográfico</label>
                  <select value={selectedEstado} onChange={(e) => { setSelectedEstado(e.target.value); setAliado(prev => ({ ...prev, fk_lugar: '' })); }} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary">
                    <option value="">Seleccione el estado</option>
                    {estados.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ciudad</label>
                  <select name="fk_lugar" value={aliado.fk_lugar} onChange={handleAliado} disabled={!selectedEstado} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary disabled:opacity-50">
                    <option value="">Seleccione la ciudad</option>
                    {ciudades.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cobertura</label>
                  <select name="fk_cobertura" value={aliado.fk_cobertura} onChange={handleAliado} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary">
                    <option value="">Seleccione cobertura</option>
                    {coberturas.map(c => <option key={c.id} value={c.id}>{c.descripcion}</option>)}
                  </select>
                </div>
              </div>
            </section>

            {/* ═══ Contactos ═══ */}
            <section>
              <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3 text-slate-800">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-lg">person</span>
                  <h4 className="text-sm font-bold font-display">Contactos</h4>
                </div>
                <button type="button" onClick={agregarContacto} className="flex items-center text-primary font-bold text-xs hover:text-secondary transition-all">
                  <span className="material-symbols-outlined mr-1 text-sm">add_circle</span>Añadir
                </button>
              </div>

              <div className="space-y-6">
                {contactos.map((contacto, index) => (
                  <div key={contacto.id || `new-${index}`} className="space-y-3 bg-slate-50/50 rounded-lg p-4 border border-slate-100">
                    {/* Header del contacto */}
                    <div className="flex justify-between items-center">
                      <h5 className="text-xs font-bold text-slate-600">
                        Contacto {index + 1} {index === 0 && <span className="text-primary/70 text-[10px] font-normal ml-1">(Principal)</span>}
                      </h5>
                      {contactos.length > 1 && (
                        <button type="button" onClick={() => eliminarContacto(index)} className="p-1 text-slate-300 hover:text-red-400 transition-colors" title="Eliminar contacto">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Primer Nombre <span className="text-red-500">*</span></label>
                        <input value={contacto.primer_nombre} onChange={(e) => handleContactoChange(index, 'primer_nombre', e.target.value)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="text" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Segundo Nombre</label>
                        <input value={contacto.segundo_nombre} onChange={(e) => handleContactoChange(index, 'segundo_nombre', e.target.value)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="text" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Primer Apellido <span className="text-red-500">*</span></label>
                      <input value={contacto.primer_apellido} onChange={(e) => handleContactoChange(index, 'primer_apellido', e.target.value)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="text" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Departamento</label>
                        <input value={contacto.departamento} onChange={(e) => handleContactoChange(index, 'departamento', e.target.value)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="Mercadeo" type="text" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rol</label>
                        <input value={contacto.rol} onChange={(e) => handleContactoChange(index, 'rol', e.target.value)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="Decisor, Operativo..." type="text" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Correo</label>
                      <input value={contacto.correo} onChange={(e) => handleContactoChange(index, 'correo', e.target.value)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="email@dominio.com" type="email" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fecha de Nacimiento</label>
                        <input value={contacto.fecha_nacimiento} onChange={(e) => handleContactoChange(index, 'fecha_nacimiento', e.target.value)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="date" max={today} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Anotaciones Especiales</label>
                        <input value={contacto.anotaciones_especiales} onChange={(e) => handleContactoChange(index, 'anotaciones_especiales', e.target.value)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="Preferencias..." type="text" />
                      </div>
                    </div>

                    {/* Teléfonos del contacto */}
                    <div className="pt-2 border-t border-slate-100 mt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Teléfonos</span>
                        <button type="button" onClick={() => addTelefono(index)} className="text-[10px] text-primary font-bold flex items-center gap-0.5 hover:text-secondary transition-colors">
                          <span className="material-symbols-outlined text-[14px]">add</span>Agregar
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(contacto.telefonos || []).map((tel, tIdx) => (
                          <div key={tIdx} className="flex gap-2 items-end">
                            <div className="w-20">
                              <select value={tel.codigo_area} onChange={(e) => handleTelefono(index, tIdx, 'codigo_area', e.target.value)} className="w-full rounded-lg bg-white border-slate-200 text-xs p-2 focus:ring-primary focus:border-primary">
                                <option value="">—</option>
                                <option value="0412">0412</option>
                                <option value="0422">0422</option>
                                <option value="0414">0414</option>
                                <option value="0424">0424</option>
                                <option value="0416">0416</option>
                                <option value="0426">0426</option>
                              </select>
                            </div>
                            <div className="flex-1">
                              <input value={tel.numero} onChange={(e) => handleTelefono(index, tIdx, 'numero', e.target.value)} className="w-full rounded-lg bg-white border-slate-200 text-xs p-2 focus:ring-primary focus:border-primary" placeholder="0000000" type="tel" maxLength="7" />
                            </div>
                            <button type="button" onClick={() => removeTelefono(index, tIdx)} className="p-2 text-slate-300 hover:text-red-400 transition-colors">
                              <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
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
            form="editar-aliado-form"
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
