// ==============================================
// AgregarSubEmpresa.jsx — Formulario para Agregar Sub-Empresa (conectado al backend)
// Campos mapeados 1:1 con entidades CLIENTE (tipo=Subempresa), CONTACTO, TELEFONO, MARCA_INTER del CSV ER
// ==============================================
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { crearCliente, getClienteById, getLugares, getVendedores } from '../services/cliente.service.js';
import { resolveErrorMessage } from '../utils/errorMessages.js';

export default function AgregarSubEmpresa() {
  const { clienteId } = useParams();
  const navigate = useNavigate();

  // --- Datos de la empresa padre ---
  const [padreData, setPadreData] = useState(null);

  // --- CLIENTE (DB fields — tipo forzado a 'Subempresa') ---
  const [subEmpresa, setSubEmpresa] = useState({
    nombre: '',
    razon_social: '',
    tipo: 'Subempresa',
    direccion: '',
    rif_fiscal: '',
    clasificacion: '',
    sector: '',
    estado: 'Activo',
    nombre_agencia: '',
    observacion: '',
    fk_lugar: '',
    fk_vendedor: '',
    fk_cliente_padre: clienteId ? parseInt(clienteId, 10) : null,
  });

  // --- CONTACTOS (array — permite múltiples) ---
  const CONTACTO_VACIO = {
    pri_nombre: '', seg_nombre: '', pri_apellido: '',
    departamento: '', correo: '', fecha_nac: '',
    anotac_especiales: '', rol: '', tipo: 'cliente',
  };
  const [contactos, setContactos] = useState([{ ...CONTACTO_VACIO }]);
  const [usarContactoPadre, setUsarContactoPadre] = useState(false);

  // --- TELEFONOS por contacto (indexado) ---
  const [telefonosPorContacto, setTelefonosPorContacto] = useState({ 0: [{ codigo_area: '', numero: '' }] });

  // Códigos de área fijos
  const CODIGOS_AREA = ['0412', '0422', '0414', '0424', '0416', '0426'];

  // --- MARCAS_INTER ---
  const [marcas, setMarcas] = useState([]);
  const [nuevaMarca, setNuevaMarca] = useState('');

  // --- Lookups ---
  const [lugares, setLugares] = useState([]);
  const [vendedores, setVendedores] = useState([]);

  // --- UI State ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // --- NEGOCIACIÓN (HISTORICO_NEGOCIACIONES) ---
  const [negociacion, setNegociacion] = useState({
    monto_negociacion: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  const handleNegociacion = (e) => {
    const { name, value } = e.target;
    setNegociacion({ ...negociacion, [name]: value });
  };

  // Cargar lookups y datos de la empresa padre
  useEffect(() => {
    const loadData = async () => {
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

        // Cargar empresa padre para heredar clasificación y contactos
        if (clienteId) {
          const padreRes = await getClienteById(clienteId).catch(() => ({ success: false }));
          if (padreRes.success && padreRes.data) {
            setPadreData(padreRes.data);
            setSubEmpresa(prev => ({
              ...prev,
              clasificacion: padreRes.data.clasificacion || '',
              nombre_agencia: padreRes.data.nombre_agencia || '',
            }));
          }
        }
      } catch {
        // Silently handle
      }
    };
    loadData();
  }, [clienteId]);

  const handleSubEmpresa = (e) => {
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
    setSubEmpresa({ ...subEmpresa, [name]: value });
  };

  // --- Manejo de contactos múltiples ---
  const handleContacto = (idx, e) => {
    const updated = [...contactos];
    updated[idx] = { ...updated[idx], [e.target.name]: e.target.value };
    setContactos(updated);
  };

  const addContacto = () => {
    const newIdx = contactos.length;
    setContactos([...contactos, { ...CONTACTO_VACIO }]);
    setTelefonosPorContacto(prev => ({ ...prev, [newIdx]: [{ codigo_area: '', numero: '' }] }));
  };

  const removeContacto = (idx) => {
    if (contactos.length <= 1) return;
    setContactos(contactos.filter((_, i) => i !== idx));
    // Reindexar teléfonos
    const newTels = {};
    Object.keys(telefonosPorContacto).forEach(k => {
      const ki = parseInt(k, 10);
      if (ki < idx) newTels[ki] = telefonosPorContacto[ki];
      else if (ki > idx) newTels[ki - 1] = telefonosPorContacto[ki];
    });
    setTelefonosPorContacto(newTels);
  };

  // Toggle usar contacto de la empresa padre
  const toggleContactoPadre = (checked) => {
    setUsarContactoPadre(checked);
    if (checked && padreData?.contactos?.length > 0) {
      const pc = padreData.contactos[0];
      setContactos([{
        pri_nombre: pc?.pri_nombre || '',
        seg_nombre: pc?.seg_nombre || '',
        pri_apellido: pc?.pri_apellido || '',
        departamento: pc?.departamento || '',
        correo: pc?.correo || '',
        fecha_nac: (pc?.fecha_nac && typeof pc.fecha_nac === 'string') ? pc.fecha_nac.split('T')[0] : '',
        anotac_especiales: pc?.anotac_especiales || '',
        rol: pc?.rol || '',
        tipo: 'cliente',
      }]);
      // Copiar teléfonos del contacto padre
      const padrePhones = (pc?.telefonos && Array.isArray(pc.telefonos) && pc.telefonos.length > 0)
        ? pc.telefonos.map(t => ({ codigo_area: t?.codigo_area || '', numero: t?.numero || '' }))
        : [{ codigo_area: '', numero: '' }];
      setTelefonosPorContacto({ 0: padrePhones });
    } else {
      setContactos([{ ...CONTACTO_VACIO }]);
      setTelefonosPorContacto({ 0: [{ codigo_area: '', numero: '' }] });
    }
  };

  // --- Manejo de teléfonos por contacto ---
  const addTelefono = (cIdx) => {
    setTelefonosPorContacto(prev => ({
      ...prev,
      [cIdx]: [...(prev[cIdx] || []), { codigo_area: '', numero: '' }],
    }));
  };
  const removeTelefono = (cIdx, tIdx) => {
    setTelefonosPorContacto(prev => ({
      ...prev,
      [cIdx]: (prev[cIdx] || []).filter((_, i) => i !== tIdx),
    }));
  };
  const handleTelefono = (cIdx, tIdx, field, val) => {
    let cleanVal = field === 'numero' ? val.replace(/\D/g, '').slice(0, 7) : val;
    setTelefonosPorContacto(prev => {
      const copy = [...(prev[cIdx] || [])];
      copy[tIdx] = { ...copy[tIdx], [field]: cleanVal };
      return { ...prev, [cIdx]: copy };
    });
  };

  const addMarca = () => {
    if (!nuevaMarca.trim()) return;
    setMarcas([...marcas, { nombre: nuevaMarca.trim(), observaciones: '' }]);
    setNuevaMarca('');
  };
  const removeMarca = (i) => setMarcas(marcas.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Reunir todos los contactos válidos
      const validContactos = contactos.filter(c => c.pri_nombre);
      // Solo enviar teléfonos del primer contacto (el controller los asocia al primero)
      const firstContactPhones = (telefonosPorContacto[0] || []).filter(t => t.codigo_area && t.numero);

      const payload = {
        cliente: {
          ...subEmpresa,
          nombre_agencia: subEmpresa.clasificacion === 'Agencia' ? subEmpresa.nombre_agencia : null,
          fk_lugar: parseInt(subEmpresa.fk_lugar, 10) || null,
          fk_cliente_padre: clienteId ? parseInt(clienteId, 10) : null,
        },
        contactos: validContactos,
        telefonos: firstContactPhones,
        marcas: marcas.filter(m => m.nombre),
        negociacion: negociacion.monto_negociacion && negociacion.fecha_inicio
          ? negociacion
          : null,
      };

      const result = await crearCliente(payload);
      if (result.success) {
        setSuccess('Sub-empresa creada exitosamente');
        setTimeout(() => navigate(`/clientes/${clienteId}`), 1500);
      }
    } catch (err) {
      setError(resolveErrorMessage(err, 'clientes'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-96 min-h-[300vh] w-full block">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/clientes">Clientes</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link className="hover:text-primary transition-colors" to={`/clientes/${clienteId || ''}`}>Detalle</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">Nueva Sub-Empresa</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 font-display">Agregar Sub-Empresa</h2>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link to={`/clientes/${clienteId || ''}`} className="flex-1 sm:flex-initial text-center px-6 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Cancelar</Link>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 sm:flex-initial px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-60"
          >
            {loading ? 'Guardando...' : 'Guardar Sub-Empresa'}
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <span className="material-symbols-outlined text-red-500">error</span>
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
          <span className="material-symbols-outlined text-green-500">check_circle</span>
          <p className="text-sm text-green-600 font-medium">{success}</p>
        </div>
      )}

      <form className="max-w-5xl space-y-8" onSubmit={handleSubmit}>
        {/* ═══ DATOS SUB-EMPRESA — CLIENTE entity ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">business</span>
            Datos de la Sub-Empresa
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* nombre */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nombre <span className="text-red-500">*</span></label>
              <input type="text" name="nombre" value={subEmpresa.nombre} onChange={handleSubEmpresa} placeholder="Nombre comercial" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
            </div>
            {/* razon_social */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Razón Social <span className="text-red-500">*</span></label>
              <input type="text" name="razon_social" value={subEmpresa.razon_social} onChange={handleSubEmpresa} placeholder="Nombre legal completo" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
            </div>
            {/* rif_fiscal */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">RIF Fiscal <span className="text-red-500">*</span></label>
              <input type="text" name="rif_fiscal" value={subEmpresa.rif_fiscal} onChange={handleSubEmpresa} placeholder="J123456789" maxLength="10" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
            </div>
            {/* fk_lugar */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Ubicación (Estado) <span className="text-red-500">*</span></label>
              <select name="fk_lugar" value={subEmpresa.fk_lugar} onChange={handleSubEmpresa} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required>
                <option value="">Seleccione estado</option>
                {lugares.map(l => (
                  <option key={l.id} value={l.id}>{l.nombre}</option>
                ))}
              </select>
            </div>
            {/* sector — ENUM */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Sector <span className="text-red-500">*</span></label>
              <select name="sector" value={subEmpresa.sector} onChange={handleSubEmpresa} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required>
                <option value="">Seleccionar sector...</option>
                <option value="Salud">Salud</option>
                <option value="Alimentacion">Alimentación</option>
                <option value="Telematica">Telemática</option>
                <option value="Fabricacion">Fabricación</option>
                <option value="Bancario">Bancario</option>
                <option value="Aerolinea">Aerolínea</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            {/* clasificacion — heredada de la empresa padre (solo lectura) */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Clasificación <span className="text-xs text-primary font-normal">(heredada)</span></label>
              <div className="w-full h-12 px-4 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 flex items-center gap-2 cursor-not-allowed">
                <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                {subEmpresa.clasificacion || 'Cargando...'}
              </div>
              <input type="hidden" name="clasificacion" value={subEmpresa.clasificacion} />
            </div>
            {/* nombre_agencia — solo si es Agencia */}
            {subEmpresa.clasificacion === 'Agencia' && (
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nombre de Agencia <span className="text-red-500">*</span></label>
                <input type="text" name="nombre_agencia" value={subEmpresa.nombre_agencia} onChange={handleSubEmpresa} placeholder="Nombre de la agencia" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
            )}
            {/* estado — ENUM */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Estado <span className="text-red-500">*</span></label>
              <select name="estado" value={subEmpresa.estado} onChange={handleSubEmpresa} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            {/* fk_vendedor */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Vendedor Asignado <span className="text-red-500">*</span></label>
              <select name="fk_vendedor" value={subEmpresa.fk_vendedor} onChange={handleSubEmpresa} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required>
                <option value="">Seleccione un vendedor</option>
                {vendedores.map(v => (
                  <option key={v.usuario_id || v.id} value={v.usuario_id || v.id}>
                    {v.primer_nombre || v.nombre} {v.primer_apellido || v.apellido}
                  </option>
                ))}
              </select>
            </div>
            {/* direccion */}
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Dirección <span className="text-red-500">*</span></label>
              <input type="text" name="direccion" value={subEmpresa.direccion} onChange={handleSubEmpresa} placeholder="Dirección fiscal" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
            </div>
            {/* observacion */}
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Observación</label>
              <textarea name="observacion" value={subEmpresa.observacion} onChange={handleSubEmpresa} placeholder="Notas adicionales..." rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"></textarea>
            </div>
          </div>
        </section>

        {/* ═══ CONTACTOS — CONTACTO entity (múltiples) ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">contact_phone</span>
              Contactos
            </h3>
            {/* Toggle: usar contacto de empresa padre */}
            {padreData?.contactos?.length > 0 && (
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={usarContactoPadre}
                  onChange={(e) => toggleContactoPadre(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-10 h-5 bg-slate-200 rounded-full peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                <span className="text-xs font-semibold text-slate-500">Usar contacto de empresa padre</span>
              </label>
            )}
          </div>

          {contactos.map((ct, cIdx) => (
            <div key={cIdx} className={`${cIdx > 0 ? 'mt-6 pt-6 border-t border-slate-200' : ''}`}>
              {/* Header del contacto con botón eliminar */}
              {contactos.length > 1 && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-slate-600">Contacto {cIdx + 1}</span>
                  <button type="button" onClick={() => removeContacto(cIdx)} className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-600 transition-colors">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                    Eliminar
                  </button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Primer Nombre <span className="text-red-500">*</span></label>
                  <input type="text" name="pri_nombre" value={ct.pri_nombre} onChange={(e) => handleContacto(cIdx, e)} placeholder="Primer nombre" readOnly={usarContactoPadre} className={`w-full h-12 px-4 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${usarContactoPadre ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Segundo Nombre</label>
                  <input type="text" name="seg_nombre" value={ct.seg_nombre} onChange={(e) => handleContacto(cIdx, e)} placeholder="Segundo nombre" readOnly={usarContactoPadre} className={`w-full h-12 px-4 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${usarContactoPadre ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Primer Apellido <span className="text-red-500">*</span></label>
                  <input type="text" name="pri_apellido" value={ct.pri_apellido} onChange={(e) => handleContacto(cIdx, e)} placeholder="Primer apellido" readOnly={usarContactoPadre} className={`w-full h-12 px-4 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${usarContactoPadre ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Departamento <span className="text-red-500">*</span></label>
                  <input type="text" name="departamento" value={ct.departamento} onChange={(e) => handleContacto(cIdx, e)} placeholder="Mercadeo, Ventas..." readOnly={usarContactoPadre} className={`w-full h-12 px-4 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${usarContactoPadre ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Correo <span className="text-red-500">*</span></label>
                  <input type="email" name="correo" value={ct.correo} onChange={(e) => handleContacto(cIdx, e)} placeholder="correo@ejemplo.com" readOnly={usarContactoPadre} className={`w-full h-12 px-4 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${usarContactoPadre ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Rol <span className="text-red-500">*</span></label>
                  <input type="text" name="rol" value={ct.rol} onChange={(e) => handleContacto(cIdx, e)} placeholder="Decisor, Operativo..." readOnly={usarContactoPadre} className={`w-full h-12 px-4 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${usarContactoPadre ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha de Nacimiento</label>
                  <input type="date" name="fecha_nac" value={ct.fecha_nac} onChange={(e) => handleContacto(cIdx, e)} readOnly={usarContactoPadre} className={`w-full h-12 px-4 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${usarContactoPadre ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Anotaciones Especiales</label>
                  <textarea name="anotac_especiales" value={ct.anotac_especiales} onChange={(e) => handleContacto(cIdx, e)} placeholder="Preferencias de contacto..." rows="2" readOnly={usarContactoPadre} className={`w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${usarContactoPadre ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`}></textarea>
                </div>
                {/* Teléfonos de este contacto */}
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Teléfonos</label>
                  <div className="space-y-3">
                    {(telefonosPorContacto[cIdx] || []).map((tel, tIdx) => (
                      <div key={tIdx} className="flex gap-2 items-center">
                        <select
                          value={tel.codigo_area}
                          onChange={(e) => handleTelefono(cIdx, tIdx, 'codigo_area', e.target.value)}
                          className="w-24 h-12 px-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-center"
                        >
                          <option value="">Código</option>
                          {CODIGOS_AREA.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <input type="tel" value={tel.numero} onChange={(e) => handleTelefono(cIdx, tIdx, 'numero', e.target.value)} placeholder="1234567" maxLength="7" className="flex-1 h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                        <button type="button" onClick={() => removeTelefono(cIdx, tIdx)} className="h-12 w-12 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-primary hover:bg-slate-100">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addTelefono(cIdx)} className="w-full py-2.5 flex items-center justify-center gap-2 border border-dashed border-slate-200 hover:border-primary text-slate-400 hover:text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors">
                      <span className="material-symbols-outlined text-[16px]">add_call</span>
                      Agregar Teléfono
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Botón añadir otro contacto */}
          <button
            type="button"
            onClick={addContacto}
            className="mt-6 w-full py-3 flex items-center justify-center gap-2 border-2 border-dashed border-primary/30 hover:border-primary text-primary/60 hover:text-primary rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:bg-primary/5"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Añadir Otro Contacto
          </button>
        </section>

        {/* ═══ MARCAS — MARCA_INTER entity ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">loyalty</span>
            Marcas Asociadas
          </h3>
          <div className="space-y-3">
            {marcas.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg">
                {marcas.map((m, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/30 text-primary border border-primary/20 gap-2">
                    {m.nombre}
                    <button type="button" onClick={() => removeMarca(i)} className="hover:text-red-600">
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-3">
              <input type="text" value={nuevaMarca} onChange={(e) => setNuevaMarca(e.target.value)} placeholder="Nombre de la marca" className="flex-1 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMarca())} />
              <button type="button" onClick={addMarca} className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        </section>

        {/* ═══ NEGOCIACIÓN COMERCIAL — HISTORICO_NEGOCIACIONES entity ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">handshake</span>
            Negociación Comercial
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Monto de Negociación <span className="text-red-500">*</span></label>
              <input type="number" name="monto_negociacion" value={negociacion.monto_negociacion} onChange={handleNegociacion} placeholder="0.00" step="0.01" min="0" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha de Inicio <span className="text-red-500">*</span></label>
              <input type="date" name="fecha_inicio" value={negociacion.fecha_inicio} onChange={handleNegociacion} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha Fin</label>
              <input type="date" name="fecha_fin" value={negociacion.fecha_fin} onChange={handleNegociacion} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 italic">Los campos marcados con * son obligatorios para registrar la negociación. Este monto alimenta la barra de progreso de pautas (Monto OC vs Monto Negociado). Si se dejan vacíos, no se creará un registro de negociación.</p>
        </section>

        {/* Footer buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 pb-16 shrink-0 mt-8">
          <Link to={`/clientes/${clienteId || ''}`} className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all text-center">Cancelar</Link>
          <button
            className="px-12 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Sub-Empresa'}
          </button>
        </div>
      </form>
    </div>
  );
}
