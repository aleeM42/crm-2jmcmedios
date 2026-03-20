// ==============================================
// AgregarCliente.jsx — Formulario Agregar Cliente (conectado al backend)
// Campos mapeados 1:1 con entidades CLIENTE, CONTACTO, TELEFONO, MARCA_INTER del CSV ER
// ==============================================
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { crearCliente, getEmpresas, getLugares, getVendedores } from '../services/cliente.service.js';

export default function AgregarCliente() {
  const navigate = useNavigate();

  // --- CLIENTE (DB fields) ---
  const [cliente, setCliente] = useState({
    nombre: '',
    razon_social: '',
    tipo: 'Empresa',
    direccion: '',
    rif_fiscal: '',
    clasificacion: '',
    sector: '',
    estado: 'Activo',
    nombre_agencia: '',
    observacion: '',
    fk_lugar: '',
    fk_vendedor: '',
  });

  // --- CONTACTOS (DB fields) ---
  const [contactos, setContactos] = useState([{
    pri_nombre: '',
    seg_nombre: '',
    pri_apellido: '',
    departamento: '',
    correo: '',
    fecha_nac: '',
    anotac_especiales: '',
    rol: '',
    tipo: 'cliente',
  }]);

  // --- TELEFONOS (PK compuesta: codigo_area + numero) ---
  const [telefonos, setTelefonos] = useState([{ codigo_area: '', numero: '' }]);

  // --- MARCAS_INTER ---
  const [marcas, setMarcas] = useState([]);
  const [nuevaMarca, setNuevaMarca] = useState('');

  // --- Sub-empresa vinculación ---
  const [isSubEmpresa, setIsSubEmpresa] = useState(false);

  // --- Lookups ---
  const [empresas, setEmpresas] = useState([]);
  const [lugares, setLugares] = useState([]);
  const [vendedores, setVendedores] = useState([]);

  // --- UI State ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cargar lookups
  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [empRes, lugRes, venRes] = await Promise.all([
          getEmpresas().catch(() => ({ success: false })),
          getLugares({ tipo: 'Estado' }).catch(() => ({ success: false })),
          getVendedores().catch(() => ({ success: false })),
        ]);
        if (empRes.success) {
          const data = empRes.data;
          setEmpresas(Array.isArray(data) ? data : (data?.empresas || []));
        }
        if (lugRes.success) {
          const data = lugRes.data;
          setLugares(Array.isArray(data) ? data : (data?.lugares || []));
        }
        if (venRes.success) {
          const data = venRes.data;
          setVendedores(Array.isArray(data) ? data : (data?.vendedores || []));
        }
      } catch {
        // Silently handle — lookups may fail if endpoints don't exist yet
      }
    };
    loadLookups();
  }, []);

  const handleCliente = (e) => {
    let { name, value } = e.target;
    if (name === 'rif_fiscal') {
      let raw = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (raw.length > 0) {
        let firstChar = raw[0];
        if (['J', 'G', 'V', 'P'].includes(firstChar)) {
          const digits = raw.slice(1).replace(/\D/g, '').slice(0, 9);
          value = firstChar + digits;
        } else {
          value = ''; // Fuerza a que el primer caracter sea J, G, V o P
        }
      } else {
        value = '';
      }
    }
    setCliente({ ...cliente, [name]: value });
  };
  const handleContactoChange = (index, e) => {
    const { name, value } = e.target;
    setContactos((prev) => {
      const actualizados = [...prev];
      actualizados[index] = { ...actualizados[index], [name]: value };
      return actualizados;
    });
  };

  const agregarContacto = () => {
    setContactos((prev) => [
      ...prev,
      {
        pri_nombre: '', seg_nombre: '', pri_apellido: '',
        departamento: '', correo: '', fecha_nac: '',
        anotac_especiales: '', rol: '', tipo: 'cliente'
      }
    ]);
  };

  const eliminarContacto = (index) => {
    setContactos((prev) => prev.filter((_, i) => i !== index));
  };

  const addTelefono = () => setTelefonos([...telefonos, { codigo_area: '', numero: '' }]);
  const removeTelefono = (i) => setTelefonos(telefonos.filter((_, idx) => idx !== i));
  const handleTelefono = (i, field, val) => {
    // Solo permitir números
    let numericVal = val.replace(/\D/g, '');

    // Aplicar límites
    if (field === 'codigo_area') {
      numericVal = numericVal.slice(0, 4);
    } else if (field === 'numero') {
      numericVal = numericVal.slice(0, 7);
    }

    const copy = [...telefonos];
    copy[i][field] = numericVal;
    setTelefonos(copy);
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
      const payload = {
        cliente: {
          ...cliente,
          fk_cliente_padre: isSubEmpresa ? (cliente.fk_cliente_padre || null) : null,
          nombre_agencia: cliente.clasificacion === 'Agencia' ? cliente.nombre_agencia : null,
          fk_lugar: parseInt(cliente.fk_lugar, 10) || null,
        },
        contactos: contactos.filter(c => c.pri_nombre),
        telefonos: telefonos.filter(t => t.codigo_area && t.numero),
        marcas: marcas.filter(m => m.nombre),
      };

      const result = await crearCliente(payload);
      if (result.success) {
        setSuccess('Cliente creado exitosamente');
        setTimeout(() => navigate('/clientes'), 1500);
      }
    } catch (err) {
      setError(err.data?.error || err.message || 'Error al crear cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <nav className="flex text-[10px] font-bold text-slate-400 mb-1 gap-2 uppercase tracking-[0.1em]">
            <Link to="/clientes" className="hover:text-primary transition-colors">Clientes</Link>
            <span>/</span>
            <span className="text-slate-600">Agregar Cliente</span>
          </nav>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Agregar Cliente</h2>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <Link to="/clientes" className="flex-1 sm:flex-initial text-center px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all">Cancelar</Link>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 sm:flex-initial px-8 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-60"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </header>

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

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* ═══ Vinculación ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
            <span className="material-symbols-outlined text-primary">link</span>
            <h3 className="text-lg font-bold font-display">Vinculación</h3>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">¿Es una sub-empresa de una empresa existente?</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="w-4 h-4 text-primary border-slate-300 focus:ring-primary" checked={!isSubEmpresa} onChange={() => { setIsSubEmpresa(false); setCliente({ ...cliente, tipo: 'Empresa' }); }} type="radio" name="is_sub_empresa" value="no" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">No</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="w-4 h-4 text-primary border-slate-300 focus:ring-primary" checked={isSubEmpresa} onChange={() => { setIsSubEmpresa(true); setCliente({ ...cliente, tipo: 'Subempresa' }); }} type="radio" name="is_sub_empresa" value="si" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">Sí</span>
                </label>
              </div>
            </div>
            {isSubEmpresa && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Seleccionar Empresa Padre <span className="text-red-500">*</span></label>
                <select name="fk_cliente_padre" value={cliente.fk_cliente_padre || ''} onChange={handleCliente} className="w-full rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                  <option value="">Buscar empresa...</option>
                  {empresas.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.razon_social}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </section>

        {/* ═══ Datos de la Empresa — CLIENTE entity ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
            <span className="material-symbols-outlined text-primary">corporate_fare</span>
            <h3 className="text-lg font-bold font-display">Datos de la Empresa</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nombre <span className="text-red-500">*</span></label>
              <input name="nombre" value={cliente.nombre} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Nombre Comercial" type="text" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Razón Social <span className="text-red-500">*</span></label>
              <input name="razon_social" value={cliente.razon_social} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Nombre Legal Completo" type="text" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">RIF Fiscal <span className="text-red-500">*</span></label>
              <input name="rif_fiscal" value={cliente.rif_fiscal} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="J123456789" type="text" maxLength="10" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ubicación (Estado) <span className="text-red-500">*</span></label>
              <select name="fk_lugar" value={cliente.fk_lugar} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" required>
                <option value="">Seleccione estado</option>
                {lugares.map(l => (
                  <option key={l.id} value={l.id}>{l.nombre}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Dirección <span className="text-red-500">*</span></label>
              <input name="direccion" value={cliente.direccion} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Dirección completa del cliente" type="text" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Clasificación <span className="text-red-500">*</span></label>
              <select name="clasificacion" value={cliente.clasificacion} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" required>
                <option value="">Seleccione</option>
                <option value="Cliente directo">Cliente Directo</option>
                <option value="Agencia">Agencia</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nombre de Agencia {cliente.clasificacion === 'Agencia' && <span className="text-red-500">*</span>}</label>
              <input name="nombre_agencia" value={cliente.nombre_agencia} onChange={handleCliente} disabled={cliente.clasificacion !== 'Agencia'} className={`rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary ${cliente.clasificacion !== 'Agencia' ? 'bg-slate-50 opacity-60' : ''}`} placeholder="Solo si clasificación es Agencia" type="text" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sector <span className="text-red-500">*</span></label>
              <select name="sector" value={cliente.sector} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" required>
                <option value="">Seleccione sector</option>
                <option value="Salud">Salud</option>
                <option value="Alimentacion">Alimentación</option>
                <option value="Telematica">Telemática</option>
                <option value="Fabricacion">Fabricación</option>
                <option value="Bancario">Bancario</option>
                <option value="Aerolinea">Aerolínea</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Estado <span className="text-red-500">*</span></label>
              <select name="estado" value={cliente.estado} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Observación</label>
              <textarea name="observacion" value={cliente.observacion} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Comentarios generales sobre la empresa..." rows="3"></textarea>
            </div>
          </div>
        </section>

        {/* ═══ Gestión de Marcas — MARCA_INTER entity ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
            <span className="material-symbols-outlined text-accent-green">account_tree</span>
            <h3 className="text-lg font-bold font-display">Gestión de Marcas</h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-lg min-h-[60px]">
              {marcas.length === 0 && <span className="text-xs text-slate-400 italic">Agregue al menos una marca</span>}
              {marcas.map((m, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/30 text-primary border border-primary/20 gap-2">
                  {m.nombre}
                  <button type="button" onClick={() => removeMarca(i)} className="hover:text-red-600">
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <input type="text" value={nuevaMarca} onChange={(e) => setNuevaMarca(e.target.value)} placeholder="Nombre de la marca" className="flex-1 rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMarca())} />
              <button type="button" onClick={addMarca} className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">add_circle</span>Agregar
              </button>
            </div>
          </div>
        </section>

        {/* ═══ Contacto Principal + Teléfonos + Asignación ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* --- CONTACTOS entity --- */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">person_add</span>
                <h3 className="text-lg font-bold font-display">Contactos</h3>
              </div>
              <button
                type="button"
                onClick={agregarContacto}
                className="flex items-center text-primary font-bold text-sm hover:text-secondary transition-all"
              >
                <span className="material-symbols-outlined mr-1">add_circle</span>Añadir contacto
              </button>
            </div>

            <div className="space-y-8">
              {contactos.map((contacto, index) => (
                <div key={index} className="space-y-4 relative">

                  {/* Encabezado con botón de eliminar (solo si hay más de 1 contacto) */}
                  {contactos.length > 1 && (
                    <div className="flex justify-between items-center pt-2">
                      <h4 className="text-sm font-bold text-slate-600">Contacto {index + 1} {index === 0 && <span className="text-primary/70 text-xs font-normal ml-1">(Principal)</span>}</h4>
                      <button
                        type="button"
                        onClick={() => eliminarContacto(index)}
                        className="p-1 text-slate-300 hover:text-red-400 transition-colors flex items-center justify-center -mr-2"
                        title="Eliminar contacto"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Primer Nombre <span className="text-red-500">*</span></label>
                      <input name="pri_nombre" value={contacto.pri_nombre} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" type="text" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Segundo Nombre</label>
                      <input name="seg_nombre" value={contacto.seg_nombre} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" type="text" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Primer Apellido <span className="text-red-500">*</span></label>
                    <input name="pri_apellido" value={contacto.pri_apellido} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" type="text" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Departamento <span className="text-red-500">*</span></label>
                      <input name="departamento" value={contacto.departamento} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Mercadeo" type="text" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Rol <span className="text-red-500">*</span></label>
                      <input name="rol" value={contacto.rol} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Decisor, Operativo..." type="text" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Correo <span className="text-red-500">*</span></label>
                    <input name="correo" value={contacto.correo} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="email@dominio.com" type="email" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fecha de Nacimiento</label>
                    <input name="fecha_nac" value={contacto.fecha_nac} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" type="date" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Anotaciones Especiales</label>
                    <textarea name="anotac_especiales" value={contacto.anotac_especiales} onChange={(e) => handleContactoChange(index, e)} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Preferencias de contacto..." rows="2"></textarea>
                  </div>

                  {/* Divisoria entre contactos múltiples */}
                  {contactos.length > 1 && index < contactos.length - 1 && (
                    <div className="border-b-2 border-dashed border-slate-200 pt-8 pb-2"></div>
                  )}

                </div>
              ))}
            </div>
          </section>

          <div className="space-y-8">
            {/* --- TELEFONO entity --- */}
            <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
                <span className="material-symbols-outlined text-primary">call</span>
                <h3 className="text-lg font-bold font-display">Teléfonos</h3>
              </div>
              <div className="space-y-4">
                {telefonos.map((tel, i) => (
                  <div key={i} className="flex gap-3 items-end">
                    <div className="w-24 flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Cód. Área <span className="text-red-500">*</span></label>
                      <input value={tel.codigo_area} onChange={(e) => handleTelefono(i, 'codigo_area', e.target.value)} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="0212" type="tel" maxLength="4" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Número <span className="text-red-500">*</span></label>
                      <input value={tel.numero} onChange={(e) => handleTelefono(i, 'numero', e.target.value)} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="0000000" type="tel" maxLength="7" />
                    </div>
                    <button type="button" onClick={() => removeTelefono(i)} className="bg-slate-50 border border-slate-200 p-3 rounded-lg hover:bg-slate-100 text-primary">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addTelefono} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 mt-4">
                  <span className="material-symbols-outlined text-lg">add_call</span>Agregar Teléfono
                </button>
              </div>
            </section>

            {/* Asignación vendedor */}
            <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
                <span className="material-symbols-outlined text-accent-green">assignment_ind</span>
                <h3 className="text-lg font-bold font-display">Asignación</h3>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Vendedor Asignado <span className="text-red-500">*</span></label>
                <select name="fk_vendedor" value={cliente.fk_vendedor} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" required>
                  <option value="">Seleccione un vendedor</option>
                  {vendedores.map(v => (
                    <option key={v.usuario_id || v.id} value={v.usuario_id || v.id}>
                      {v.primer_nombre || v.nombre} {v.primer_apellido || v.apellido}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-1 italic">El cliente formará parte de la cartera comercial de este vendedor.</p>
              </div>
            </section>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 py-8">
          <Link to="/clientes" className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">Cancelar Cambios</Link>
          <button
            className="px-12 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Cliente'}
          </button>
        </div>
      </form>
    </>
  );
}
