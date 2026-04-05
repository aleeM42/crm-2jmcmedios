// ==============================================
// AgregarVisita.jsx — Formulario para Agregar Visita (conectado al backend)
// Tablas: VISITAS + GASTOS_VISITAS
// ==============================================
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  crearVisita,
  crearGastoVisita,
  getClientes,
  getAliados,
  getVendedores,
  getContactosByCliente,
  getContactosByAliado,
} from '../services/visita.service.js';
import { resolveErrorMessage } from '../utils/errorMessages.js';
import { getCurrentUser } from '../services/auth.service.js';

export default function AgregarVisita() {
  const navigate = useNavigate();

  // Usuario autenticado y restricción de rol
  const currentUser = getCurrentUser();
  const isVendedor = currentUser?.rol === 'Vendedor';

  // --- Form state (mapeo a VISITAS) ---
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    objetivo_visita: '',
    tipo: '',
    lugar: '',
    efectiva: '',
    detalle: '',
  });

  // Visitado: Cliente o Aliado → luego seleccionar Contacto
  const [tipoVisitado, setTipoVisitado] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');   // id del cliente o aliado
  const [fkContacto, setFkContacto] = useState('');           // id del contacto
  const [fkVendedor, setFkVendedor] = useState('');            // UUID vendedor

  // --- Lookups ---
  const [clientes, setClientes] = useState([]);
  const [aliados, setAliados] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [contactos, setContactos] = useState([]);

  // --- Gastos inline (GASTOS_VISITAS) ---
  const [gastos, setGastos] = useState([]);
  const [gastoTemp, setGastoTemp] = useState({ concepto: '', monto: '', categoria: '' });

  // --- UI ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cargar lookups iniciales
  useEffect(() => {
    const load = async () => {
      try {
        const [cliRes, aliRes, venRes] = await Promise.all([
          getClientes().catch(() => ({ success: false })),
          getAliados().catch(() => ({ success: false })),
          getVendedores().catch(() => ({ success: false })),
        ]);
        if (cliRes.success) {
          const d = cliRes.data;
          setClientes(Array.isArray(d) ? d : (d?.clientes || []));
        }
        if (aliRes.success) {
          const d = aliRes.data;
          setAliados(Array.isArray(d) ? d : (d?.aliados || []));
        }
        if (venRes.success) {
          const d = venRes.data;
          const lista = Array.isArray(d) ? d : (d?.vendedores || []);
          setVendedores(lista);
          // Si es Vendedor, preseleccionar su propio ID
          if (isVendedor && currentUser?.id) {
            setFkVendedor(currentUser.id);
          }
        }
      } catch { /* silently handle */ }
    };
    load();
  }, []);

  // Cargar contactos cuando cambia cliente/aliado seleccionado
  useEffect(() => {
    if (!selectedEntity) { setContactos([]); setFkContacto(''); return; }
    const loadContactos = async () => {
      try {
        let res;
        if (tipoVisitado === 'cliente') {
          res = await getContactosByCliente(selectedEntity);
        } else {
          res = await getContactosByAliado(selectedEntity);
        }
        // contacto endpoints return array directly (no {success, data} wrapper)
        setContactos(Array.isArray(res) ? res : (res?.data || []));
        setFkContacto('');
      } catch { setContactos([]); }
    };
    loadContactos();
  }, [selectedEntity, tipoVisitado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Gastos inline ---
  const addGasto = () => {
    if (!gastoTemp.concepto || !gastoTemp.monto || !gastoTemp.categoria) return;
    setGastos((prev) => [...prev, { ...gastoTemp, monto: parseFloat(gastoTemp.monto) }]);
    setGastoTemp({ concepto: '', monto: '', categoria: '' });
  };

  const removeGasto = (idx) => {
    setGastos((prev) => prev.filter((_, i) => i !== idx));
  };

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // 1. Crear la visita
      const visitaPayload = {
        ...formData,
        fk_contacto: parseInt(fkContacto, 10),
        fk_vendedor: fkVendedor || undefined, // backend usará req.user.id si undefined
      };

      const visitaRes = await crearVisita(visitaPayload);
      if (!visitaRes.success) throw new Error(visitaRes.error || 'Error creando visita');

      const visitaId = visitaRes.data.id;

      // 2. Crear gastos asociados
      if (gastos.length > 0) {
        const hoy = formData.fecha || new Date().toISOString().split('T')[0];
        await Promise.all(
          gastos.map((g) =>
            crearGastoVisita({
              fecha: hoy,
              concepto: g.concepto,
              monto: g.monto,
              categoria: g.categoria,
              fk_visita: visitaId,
            })
          )
        );
      }

      setSuccess('Visita registrada exitosamente');
      setTimeout(() => navigate('/actividad-comercial'), 1500);
    } catch (err) {
      setError(resolveErrorMessage(err, 'visitas'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/actividad-comercial">Actividad Comercial</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">Nueva Visita</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 font-display">Registrar Visita</h2>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link to="/actividad-comercial" className="flex-1 sm:flex-initial text-center px-6 py-2.5 border border-red-400 text-red-500 rounded-lg text-sm bg-red-50 font-bold shadow-lg shadow-red-400/10 hover:shadow-red-400/40 transition-colors">Cancelar</Link>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 sm:flex-initial px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:shadow-primary/40 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-60"
          >
            {loading ? 'Guardando...' : 'Guardar Visita'}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {/* DATOS DE LA VISITA */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">location_on</span>
              Datos de la Visita
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Vendedor */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Vendedor{isVendedor && <span className="ml-2 text-[9px] font-bold text-primary/70 normal-case tracking-normal bg-primary/10 px-1.5 py-0.5 rounded">Asignado automáticamente</span>}
                </label>
                {isVendedor ? (
                  // Para rol Vendedor: campo bloqueado sólo con su nombre
                  <div className="w-full h-12 px-4 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 flex items-center gap-2 cursor-not-allowed select-none">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">lock</span>
                    <span className="font-medium">
                      {currentUser?.primer_nombre || currentUser?.nombre} {currentUser?.primer_apellido || currentUser?.apellido}
                    </span>
                  </div>
                ) : (
                  // Para Director/Administrador: selector completo
                  <select
                    value={fkVendedor}
                    onChange={(e) => setFkVendedor(e.target.value)}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  >
                    <option value="">Seleccionar vendedor...</option>
                    {vendedores.map((v) => (
                      <option key={v.usuario_id || v.id} value={v.usuario_id || v.id}>
                        {v.primer_nombre || v.nombre} {v.primer_apellido || v.apellido}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Visitado: radio */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Visitado<span className="text-red-500 ml-0.5">*</span></label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 p-3 px-6 rounded-lg border border-slate-200 cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" name="tipo_visitado" value="cliente" checked={tipoVisitado === 'cliente'} onChange={(e) => { setTipoVisitado(e.target.value); setSelectedEntity(''); setFkContacto(''); }} className="text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-slate-700">Cliente</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 px-6 rounded-lg border border-slate-200 cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" name="tipo_visitado" value="aliado" checked={tipoVisitado === 'aliado'} onChange={(e) => { setTipoVisitado(e.target.value); setSelectedEntity(''); setFkContacto(''); }} className="text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-slate-700">Aliado Comercial</span>
                  </label>
                </div>
              </div>

              {/* Select Cliente o Aliado */}
              {tipoVisitado === 'cliente' && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cliente<span className="text-red-500 ml-0.5">*</span></label>
                  <select value={selectedEntity} onChange={(e) => setSelectedEntity(e.target.value)} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                    <option value="">Seleccionar cliente...</option>
                    {clientes.map((c) => (
                      <option key={c.id} value={c.id}>{c.nombre} — {c.razon_social}</option>
                    ))}
                  </select>
                </div>
              )}
              {tipoVisitado === 'aliado' && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Aliado Comercial<span className="text-red-500 ml-0.5">*</span></label>
                  <select value={selectedEntity} onChange={(e) => setSelectedEntity(e.target.value)} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                    <option value="">Seleccionar emisora...</option>
                    {aliados.map((a) => (
                      <option key={a.id} value={a.id}>{a.nombre_emisora}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Lista Contactos (dependiente del cliente/aliado seleccionado) */}
              {selectedEntity && (
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Contacto<span className="text-red-500 ml-0.5">*</span></label>
                  {contactos.length === 0 ? (
                    <p className="text-xs text-slate-400 mt-1">Sin contactos registrados</p>
                  ) : (
                    <div className="max-h-48 overflow-y-auto bg-slate-50 border border-slate-200 rounded-lg divide-y divide-slate-100">
                      {contactos.map((ct) => {
                        const isSelected = String(fkContacto) === String(ct.id);
                        return (
                          <label
                            key={ct.id}
                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${isSelected ? 'bg-primary/5 border-l-2 border-primary' : 'hover:bg-slate-100 border-l-2 border-transparent'}`}
                          >
                            <input
                              type="radio"
                              name="contacto_select"
                              value={ct.id}
                              checked={isSelected}
                              onChange={() => setFkContacto(String(ct.id))}
                              className="text-primary focus:ring-primary shrink-0"
                            />
                            <div className="min-w-0">
                              <p className={`text-sm font-medium truncate ${isSelected ? 'text-primary' : 'text-slate-700'}`}>
                                {ct.pri_nombre} {ct.pri_apellido}
                              </p>
                              {ct.departamento && (
                                <p className="text-[11px] text-slate-400 truncate">{ct.departamento}</p>
                              )}
                              {ct.correo && (
                                <p className="text-[11px] text-slate-400 truncate">{ct.correo}</p>
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Fecha */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha<span className="text-red-500 ml-0.5">*</span></label>
                <input name="fecha" type="date" value={formData.fecha} onChange={handleChange} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
              </div>
              {/* Hora */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Hora<span className="text-red-500 ml-0.5">*</span></label>
                <input name="hora" type="time" value={formData.hora} onChange={handleChange} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
              </div>
              {/* Tipo */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tipo<span className="text-red-500 ml-0.5">*</span></label>
                <select name="tipo" value={formData.tipo} onChange={handleChange} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required>
                  <option value="">Seleccionar tipo...</option>
                  <option value="llamada">Llamada</option>
                  <option value="presencial">Presencial</option>
                </select>
              </div>
              {/* Lugar */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Lugar<span className="text-red-500 ml-0.5">*</span></label>
                <input name="lugar" type="text" value={formData.lugar} onChange={handleChange} placeholder="Dirección o nombre del lugar" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
              </div>
              {/* Objetivo */}
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Objetivo de la Visita<span className="text-red-500 ml-0.5">*</span></label>
                <input name="objetivo_visita" type="text" value={formData.objetivo_visita} onChange={handleChange} placeholder="Describir el objetivo de la visita..." className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
              </div>
            </div>
          </section>

          {/* RESULTADO */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">fact_check</span>
              Resultado de la Visita
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">¿Fue efectiva?<span className="text-red-500 ml-0.5">*</span></label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 p-3 px-6 rounded-lg border border-slate-200 cursor-pointer hover:border-accent-green transition-colors">
                    <input type="radio" name="efectiva" value="si" checked={formData.efectiva === 'si'} onChange={handleChange} className="text-accent-green focus:ring-accent-green" />
                    <span className="text-sm font-medium text-slate-700">Sí</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 px-6 rounded-lg border border-slate-200 cursor-pointer hover:border-red-300 transition-colors">
                    <input type="radio" name="efectiva" value="no" checked={formData.efectiva === 'no'} onChange={handleChange} className="text-red-500 focus:ring-red-500" />
                    <span className="text-sm font-medium text-slate-700">No</span>
                  </label>
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Detalle</label>
                <textarea name="detalle" rows={4} value={formData.detalle} onChange={handleChange} placeholder="Describir el resultado de la visita..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* GASTOS ASOCIADOS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-accent-green">receipt_long</span>
              Gastos Asociados
            </h3>
            <div className="space-y-3">
              {/* Lista de gastos agregados */}
              {gastos.map((g, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{g.concepto}</p>
                    <p className="text-xs text-slate-400 capitalize">{g.categoria}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-accent-green">${g.monto.toFixed(2)}</span>
                    <button type="button" onClick={() => removeGasto(i)} className="text-red-400 hover:text-red-600 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Formulario inline para agregar gasto */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text" placeholder="Concepto" value={gastoTemp.concepto}
                  onChange={(e) => setGastoTemp((p) => ({ ...p, concepto: e.target.value }))}
                  className="flex-1 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-accent-green focus:border-accent-green outline-none"
                />
                <input
                  type="number" placeholder="$0" step="0.01" min="0" value={gastoTemp.monto}
                  onChange={(e) => setGastoTemp((p) => ({ ...p, monto: e.target.value }))}
                  className="w-full sm:w-28 shrink-0 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-accent-green focus:border-accent-green outline-none"
                />
              </div>
              <select
                value={gastoTemp.categoria}
                onChange={(e) => setGastoTemp((p) => ({ ...p, categoria: e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-accent-green focus:border-accent-green outline-none"
              >
                <option value="">Categoría del gasto...</option>
                <option value="transporte">Transporte</option>
                <option value="alimentacion">Alimentación</option>
                <option value="peaje">Peaje</option>
                <option value="estacionamiento">Estacionamiento</option>
                <option value="regalos">Regalos</option>
                <option value="atencion">Atención</option>
                <option value="otros">Otros</option>
              </select>
              <button type="button" onClick={addGasto} className="w-full py-2.5 flex items-center justify-center gap-2 border border-dashed border-slate-200 hover:border-accent-green text-slate-400 hover:text-accent-green rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors">
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                Agregar Gasto
              </button>

              {/* Total */}
              {gastos.length > 0 && (
                <div className="flex justify-between pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-600">Total Gastos</span>
                  <span className="text-sm font-black text-accent-green">${gastos.reduce((s, g) => s + g.monto, 0).toFixed(2)}</span>
                </div>
              )}
            </div>
          </section>

          {/* ARCHIVOS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-accent-green">attach_file</span>
              Archivos Adjuntos
            </h3>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-accent-green transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-3">cloud_upload</span>
              <p className="text-xs font-medium text-slate-400">Arrastra o selecciona archivos</p>
              <p className="text-[10px] text-slate-300 mt-1">PDF, JPG, PNG hasta 10MB</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
