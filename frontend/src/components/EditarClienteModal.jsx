// ==============================================
// EditarClienteModal.jsx — Modal de edición de cliente (datos + contactos + teléfonos)
// ==============================================
import { useState, useEffect, useCallback } from 'react';
import AlertError from './AlertError.jsx';
import { resolveErrorMessage } from '../utils/errorMessages.js';
import { actualizarCliente, getLugares, getVendedores } from '../services/cliente.service.js';

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RIF_RE = /^[JGVP]\d{9}$/;
const PHONE_RE = /^\d{7}$/;

export default function EditarClienteModal({ cliente: clienteOriginal, onClose, onSuccess }) {
  // ── State: datos del cliente ─────────────────────────────
  const [cliente, setCliente] = useState({
    nombre: '',
    razon_social: '',
    direccion: '',
    rif_fiscal: '',
    clasificacion: '',
    sector: '',
    estado: 'Activo',
    nombre_agencia: '',
    observacion: '',
    fk_lugar: '',
    fk_vendedor: '',
    archivo_adjunto: null,
  });

  const [archivoAdjuntoTemp, setArchivoAdjuntoTemp] = useState(null);

  // ── State: contactos ────────────────────────────────────
  const [contactos, setContactos] = useState([]);

  // ── State: Negociación ──────────────────────────────────
  const [negociacion, setNegociacion] = useState({
    id: null,
    monto_negociacion: '',
    total_cunas: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  // ── Lookups ──────────────────────────────────────────────
  const [lugares, setLugares] = useState([]);
  const [vendedores, setVendedores] = useState([]);

  // ── UI ───────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Pre-llenar datos al montar ──────────────────────────
  useEffect(() => {
    if (!clienteOriginal) return;

    setCliente({
      nombre: clienteOriginal.nombre || '',
      razon_social: clienteOriginal.razon_social || '',
      direccion: clienteOriginal.direccion || '',
      rif_fiscal: clienteOriginal.rif_fiscal || '',
      clasificacion: clienteOriginal.clasificacion || '',
      sector: clienteOriginal.sector || '',
      estado: clienteOriginal.estado || 'Activo',
      nombre_agencia: clienteOriginal.nombre_agencia || '',
      observacion: clienteOriginal.observacion || '',
      fk_lugar: clienteOriginal.fk_lugar || '',
      fk_vendedor: clienteOriginal.fk_vendedor || '',
      archivo_adjunto: clienteOriginal.archivo_adjunto || null,
    });

    // Pre-llenar contactos con sus teléfonos incorporados
    const contactosData = (clienteOriginal.contactos || []).map(c => ({
      id: c.id,
      pri_nombre: c.pri_nombre || '',
      seg_nombre: c.seg_nombre || '',
      pri_apellido: c.pri_apellido || '',
      departamento: c.departamento || '',
      correo: c.correo || '',
      fecha_nac: c.fecha_nac ? c.fecha_nac.split('T')[0] : '',
      anotac_especiales: c.anotac_especiales || '',
      rol: c.rol || '',
      tipo: c.tipo || 'cliente',
      telefonos: (c.telefonos || []).map(t => ({
        codigo_area: t.codigo_area || '',
        numero: t.numero || '',
      })),
    }));
    setContactos(contactosData.length > 0 ? contactosData : [{
      pri_nombre: '', seg_nombre: '', pri_apellido: '',
      departamento: '', correo: '', fecha_nac: '',
      anotac_especiales: '', rol: '', tipo: 'cliente',
      telefonos: [{ codigo_area: '', numero: '' }],
    }]);

    const currentNegociacion = (clienteOriginal.negociaciones || [])[0];
    if (currentNegociacion) {
      setNegociacion({
        id: currentNegociacion.id,
        monto_negociacion: currentNegociacion.monto_negociacion || '',
        total_cunas: currentNegociacion.total_cunas || '',
        fecha_inicio: currentNegociacion.fecha_inicio ? currentNegociacion.fecha_inicio.split('T')[0] : '',
        fecha_fin: currentNegociacion.fecha_fin ? currentNegociacion.fecha_fin.split('T')[0] : '',
      });
    } else {
      setNegociacion({
        id: null,
        monto_negociacion: '',
        total_cunas: '',
        fecha_inicio: '',
        fecha_fin: '',
      });
    }
  }, [clienteOriginal]);

  // ── Cargar lookups ──────────────────────────────────────
  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [lugRes, venRes] = await Promise.all([
          getLugares({ tipo: 'Estado' }).catch(() => ({ success: false })),
          getVendedores().catch(() => ({ success: false })),
        ]);
        if (lugRes.success) {
          const data = lugRes.data;
          setLugares(Array.isArray(data) ? data : (data?.lugares || []));
        }
        if (venRes.success) {
          const data = venRes.data;
          setVendedores(Array.isArray(data) ? data : (data?.vendedores || []));
        }
      } catch { /* silently ignore */ }
    };
    loadLookups();
  }, []);

  // ── Cerrar con ESC ──────────────────────────────────────
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleNegociacion = useCallback((e) => {
    const { name, value } = e.target;
    setNegociacion((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleArchivoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setArchivoAdjuntoTemp(e.target.files[0]);
    }
  };

  // ── Handlers: Cliente ───────────────────────────────────
  const handleCliente = useCallback((e) => {
    let { name, value } = e.target;
    if (name === 'rif_fiscal') {
      let raw = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (raw.length > 0) {
        let firstChar = raw[0];
        if (['J', 'G', 'V', 'P'].includes(firstChar)) {
          const digits = raw.slice(1).replace(/\D/g, '').slice(0, 9);
          value = firstChar + digits;
        } else {
          value = '';
        }
      } else {
        value = '';
      }
    }
    setCliente(prev => ({ ...prev, [name]: value }));
  }, []);

  // ── Handlers: Contactos ─────────────────────────────────
  const handleContactoChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setContactos(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  }, []);

  const agregarContacto = useCallback(() => {
    setContactos(prev => [...prev, {
      pri_nombre: '', seg_nombre: '', pri_apellido: '',
      departamento: '', correo: '', fecha_nac: '',
      anotac_especiales: '', rol: '', tipo: 'cliente',
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

    // Validar cliente
    if (!cliente.nombre?.trim()) return setError('El nombre comercial es obligatorio.');
    if (!cliente.razon_social?.trim()) return setError('La razón social es obligatoria.');
    if (!cliente.rif_fiscal?.trim()) return setError('El RIF fiscal es obligatorio.');
    if (!RIF_RE.test(cliente.rif_fiscal))
      return setError('El RIF debe comenzar con J, G, V o P seguido de 9 dígitos (ej: J123456789).');
    if (!cliente.fk_lugar) return setError('Debe seleccionar la ubicación (estado).');
    if (!cliente.clasificacion) return setError('Debe seleccionar la clasificación.');
    if (cliente.clasificacion === 'Agencia' && !cliente.nombre_agencia?.trim())
      return setError('El nombre de la agencia es obligatorio cuando la clasificación es Agencia.');
    if (!cliente.sector) return setError('Debe seleccionar el sector.');
    if (!cliente.fk_vendedor) return setError('Debe seleccionar un vendedor asignado.');

    if (negociacion.total_cunas !== '' && Number(negociacion.total_cunas) < 0)
      return setError('El total de cuñas no puede ser un valor negativo.');

    // Validar contactos
    const contactosActivos = contactos.filter(c => c.pri_nombre);
    for (let i = 0; i < contactosActivos.length; i++) {
      const c = contactosActivos[i];
      const label = `Contacto ${i + 1}`;
      if (!c.pri_nombre?.trim()) return setError(`${label}: el primer nombre es obligatorio.`);
      if (!c.pri_apellido?.trim()) return setError(`${label}: el primer apellido es obligatorio.`);
      if (!c.departamento?.trim()) return setError(`${label}: el departamento es obligatorio.`);
      if (!c.rol?.trim()) return setError(`${label}: el rol es obligatorio.`);
      if (c.correo && !EMAIL_RE.test(c.correo))
        return setError(`${label}: el correo "${c.correo}" no es válido.`);

      // Validar teléfonos del contacto
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
      // Ensamblar contactos con sus teléfonos embebidos
      const contactosPayload = contactosActivos.map(c => ({
        ...c,
        telefonos: (c.telefonos || []).filter(t => t.codigo_area && t.numero),
      }));

      const payload = {
        cliente: {
          ...cliente,
          rif_fiscal: cliente.rif_fiscal.toUpperCase(),
          nombre_agencia: cliente.clasificacion === 'Agencia' ? cliente.nombre_agencia : null,
          fk_lugar: parseInt(cliente.fk_lugar, 10) || null,
          fk_vendedor: cliente.fk_vendedor,
          archivo_adjunto: archivoAdjuntoTemp ? archivoAdjuntoTemp.name : cliente.archivo_adjunto,
        },
        contactos: contactosPayload,
        telefonos: [], // teléfonos van embebidos en cada contacto
        negociacion: negociacion.monto_negociacion && negociacion.fecha_inicio ? negociacion : null,
      };

      const result = await actualizarCliente(clienteOriginal.id, payload);
      if (result.success) {
        onSuccess(result.data);
      }
    } catch (err) {
      console.error('[EditarCliente] Error:', err?.data || err);
      setError(resolveErrorMessage(err, 'clientes'));
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
              <h3 className="font-bold text-slate-800 font-display text-base">Editar Cliente</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{clienteOriginal?.nombre}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-slate-500 text-lg">close</span>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <form id="editar-cliente-form" className="p-6 space-y-6" onSubmit={handleSubmit}>
            {error && <AlertError message={error} onClose={() => setError('')} />}

            {/* ═══ Datos de la Empresa ═══ */}
            <section>
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 text-slate-800">
                <span className="material-symbols-outlined text-primary text-lg">corporate_fare</span>
                <h4 className="text-sm font-bold font-display">Datos de la Empresa</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nombre <span className="text-red-500">*</span></label>
                  <input name="nombre" value={cliente.nombre} onChange={handleCliente} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="text" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Razón Social <span className="text-red-500">*</span></label>
                  <input name="razon_social" value={cliente.razon_social} onChange={handleCliente} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="text" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">RIF Fiscal <span className="text-red-500">*</span></label>
                  <input name="rif_fiscal" value={cliente.rif_fiscal} onChange={handleCliente} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="J123456789" type="text" maxLength="10" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ubicación (Estado) <span className="text-red-500">*</span></label>
                  <select name="fk_lugar" value={cliente.fk_lugar} onChange={handleCliente} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required>
                    <option value="">Seleccione estado</option>
                    {lugares.map(l => <option key={l.id} value={l.id}>{l.nombre}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dirección <span className="text-red-500">*</span></label>
                  <input name="direccion" value={cliente.direccion} onChange={handleCliente} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="Dirección completa" type="text" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Clasificación <span className="text-red-500">*</span></label>
                  <select name="clasificacion" value={cliente.clasificacion} onChange={handleCliente} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required>
                    <option value="">Seleccione</option>
                    <option value="Cliente directo">Cliente Directo</option>
                    <option value="Agencia">Agencia</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nombre de Agencia {cliente.clasificacion === 'Agencia' && <span className="text-red-500">*</span>}</label>
                  <input name="nombre_agencia" value={cliente.nombre_agencia} onChange={handleCliente} disabled={cliente.clasificacion !== 'Agencia'} className={`rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary ${cliente.clasificacion !== 'Agencia' ? 'opacity-60' : ''}`} type="text" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sector <span className="text-red-500">*</span></label>
                  <select name="sector" value={cliente.sector} onChange={handleCliente} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required>
                    <option value="">Seleccione sector</option>
                    <option value="Salud">Salud</option>
                    <option value="Alimentación">Alimentación</option>
                    <option value="Telemática">Telemática</option>
                    <option value="Ferretería">Ferretería</option>
                    <option value="Bancario">Bancario</option>
                    <option value="Aerolínea">Aerolínea</option>
                    <option value="Moda">Moda</option>
                    <option value="Automotriz">Automotriz</option>
                    <option value="Envíos">Envíos</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Estado <span className="text-red-500">*</span></label>
                  <select name="estado" value={cliente.estado} onChange={handleCliente} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Vendedor Asignado <span className="text-red-500">*</span></label>
                  <select name="fk_vendedor" value={cliente.fk_vendedor} onChange={handleCliente} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" required>
                    <option value="">Seleccione vendedor</option>
                    {vendedores.map(v => (
                      <option key={v.usuario_id || v.id} value={v.usuario_id || v.id}>
                        {v.primer_nombre || v.nombre} {v.primer_apellido || v.apellido}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Observación</label>
                  <textarea name="observacion" value={cliente.observacion} onChange={handleCliente} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="Comentarios..." rows="2" />
                </div>
              </div>
            </section>

            {/* ═══ Contactos ═══ */}
            <section>
              <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3 text-slate-800">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-lg">person_add</span>
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
                        <input name="pri_nombre" value={contacto.pri_nombre} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="text" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Segundo Nombre</label>
                        <input name="seg_nombre" value={contacto.seg_nombre} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="text" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Primer Apellido <span className="text-red-500">*</span></label>
                      <input name="pri_apellido" value={contacto.pri_apellido} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="text" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Departamento <span className="text-red-500">*</span></label>
                        <input name="departamento" value={contacto.departamento} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="Mercadeo" type="text" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rol <span className="text-red-500">*</span></label>
                        <input name="rol" value={contacto.rol} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="Decisor, Operativo..." type="text" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Correo</label>
                      <input name="correo" value={contacto.correo} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="email@dominio.com" type="email" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fecha de Nacimiento</label>
                        <input name="fecha_nac" value={contacto.fecha_nac} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="date" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Anotaciones Especiales</label>
                        <input name="anotac_especiales" value={contacto.anotac_especiales} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg bg-white border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="Preferencias..." type="text" />
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

            {/* ═══ Negociación Comercial ═══ */}
            <section>
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 text-slate-800">
                <span className="material-symbols-outlined text-primary text-lg">handshake</span>
                <h4 className="text-sm font-bold font-display">Negociación Comercial</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Monto de Negociación <span className="text-red-500">*</span></label>
                  <input name="monto_negociacion" value={negociacion.monto_negociacion} onChange={handleNegociacion} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="0.00" type="number" step="0.01" min="0" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total de Cuñas <span className="text-red-500">*</span></label>
                  <input name="total_cunas" value={negociacion.total_cunas} onChange={handleNegociacion} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" placeholder="0" type="number" min="0" step="1" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fecha de Inicio <span className="text-red-500">*</span></label>
                  <input name="fecha_inicio" value={negociacion.fecha_inicio} onChange={handleNegociacion} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="date" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fecha Fin</label>
                  <input name="fecha_fin" value={negociacion.fecha_fin} onChange={handleNegociacion} className="rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary" type="date" />
                </div>
              </div>
            </section>

            {/* ═══ Archivo Adjunto ═══ */}
            <section>
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 text-slate-800">
                <span className="material-symbols-outlined text-primary text-lg">attach_file</span>
                <h4 className="text-sm font-bold font-display">Archivo Adjunto</h4>
                <span className="text-[10px] text-slate-400 ml-auto italic">Opcional — .pdf o .docx (máx. 5 MB)</span>
              </div>
              <div className="flex flex-col gap-3">
                <label className="flex flex-col items-center justify-center gap-3 p-4 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group">
                  <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-primary transition-colors">cloud_upload</span>
                  <span className="text-xs font-medium text-slate-500 group-hover:text-primary transition-colors">
                    {archivoAdjuntoTemp ? archivoAdjuntoTemp.name : (cliente.archivo_adjunto ? `Actual: ${cliente.archivo_adjunto}` : 'Haz clic para seleccionar un archivo')}
                  </span>
                  <input type="file" accept=".pdf,.docx" onChange={handleArchivoChange} className="hidden" />
                </label>
                {(archivoAdjuntoTemp || cliente.archivo_adjunto) && (
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <span className="material-symbols-outlined text-primary">description</span>
                    <span className="text-xs font-medium text-slate-700 flex-1 truncate">{archivoAdjuntoTemp ? archivoAdjuntoTemp.name : cliente.archivo_adjunto}</span>
                    <button type="button" onClick={() => { setArchivoAdjuntoTemp(null); setCliente(prev => ({ ...prev, archivo_adjunto: null })); }} className="text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                )}
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
            form="editar-cliente-form"
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
