// ==============================================
// AgregarGasto.jsx — Formulario para Agregar Gasto de Marketing (conectado al backend)
// Tabla: GASTOS_MARKETING — Arco exclusivo: fk_cliente XOR fk_aliado_c
// ==============================================
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { crearGastoMarketing, getClientes, getAliados } from '../services/gasto.service.js';

export default function AgregarGasto() {
  const navigate = useNavigate();

  // --- Form state (mapeo 1:1 con GASTOS_MARKETING) ---
  const [formData, setFormData] = useState({
    fecha: '',
    concepto: '',
    monto: '',
    tipo: '',
  });

  // Arco exclusivo: asociar a cliente O aliado
  const [asociarA, setAsociarA] = useState('cliente'); // 'cliente' | 'aliado'
  const [fkCliente, setFkCliente] = useState('');
  const [fkAliado, setFkAliado] = useState('');

  // --- Lookups ---
  const [clientes, setClientes] = useState([]);
  const [aliados, setAliados] = useState([]);

  // --- UI State ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cargar lookups
  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [cliRes, aliRes] = await Promise.all([
          getClientes().catch(() => ({ success: false })),
          getAliados().catch(() => ({ success: false })),
        ]);
        if (cliRes.success) {
          const data = cliRes.data;
          setClientes(Array.isArray(data) ? data : (data?.clientes || []));
        }
        if (aliRes.success) {
          const data = aliRes.data;
          setAliados(Array.isArray(data) ? data : (data?.aliados || []));
        }
      } catch {
        // Silently handle — lookups may fail
      }
    };
    loadLookups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        fecha: formData.fecha,
        concepto: formData.concepto,
        monto: parseFloat(formData.monto),
        tipo: formData.tipo,
        fk_cliente: asociarA === 'cliente' ? (parseInt(fkCliente, 10) || null) : null,
        fk_aliado_c: asociarA === 'aliado' ? (parseInt(fkAliado, 10) || null) : null,
      };

      const result = await crearGastoMarketing(payload);
      if (result.success) {
        setSuccess('Gasto de marketing registrado exitosamente');
        setTimeout(() => navigate('/actividad-comercial/gastos'), 1500);
      }
    } catch (err) {
      setError(err.data?.error || err.message || 'Error al registrar gasto');
    } finally {
      setLoading(false);
    }
  };

  // Nombre legible para el resumen
  const selectedCliente = clientes.find((c) => c.id?.toString() === fkCliente);
  const selectedAliado = aliados.find((a) => a.id?.toString() === fkAliado);
  const asociadoNombre = asociarA === 'cliente'
    ? (selectedCliente?.nombre || '—')
    : (selectedAliado?.nombre_emisora || '—');

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/actividad-comercial/gastos">Gastos</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">Nuevo Gasto</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 font-display">Registrar Gasto de Marketing</h2>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link to="/actividad-comercial/gastos" className="flex-1 sm:flex-initial text-center px-6 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Cancelar</Link>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 sm:flex-initial px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-60"
          >
            {loading ? 'Guardando...' : 'Guardar Gasto'}
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
        {/* MAIN FORM */}
        <div className="lg:col-span-8 space-y-8">
          {/* DATOS DEL GASTO */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">receipt_long</span>
              Datos del Gasto
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tipo de Gasto<span className="text-red-500 ml-0.5">*</span></label>
                <select name="tipo" value={formData.tipo} onChange={handleChange} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required>
                  <option value="">Seleccionar tipo...</option>
                  <option value="campaña">Campaña</option>
                  <option value="remota">Remota</option>
                  <option value="regalos corporativos">Regalos Corporativos</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha del Gasto<span className="text-red-500 ml-0.5">*</span></label>
                <input name="fecha" type="date" value={formData.fecha} onChange={handleChange} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Monto ($)<span className="text-red-500 ml-0.5">*</span></label>
                <input name="monto" type="number" step="0.01" min="0" value={formData.monto} onChange={handleChange} placeholder="0.00" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Concepto / Descripción<span className="text-red-500 ml-0.5">*</span></label>
                <textarea name="concepto" rows={3} value={formData.concepto} onChange={handleChange} placeholder="Describir el gasto realizado..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" required />
              </div>
            </div>
          </section>

          {/* ASOCIAR A CLIENTE O ALIADO (Arco exclusivo) */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">link</span>
              Asociar Gasto<span className="text-red-500 ml-0.5">*</span>
            </h3>

            {/* Radio: Cliente o Aliado */}
            <div className="flex gap-6 mb-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  className="w-4 h-4 text-primary border-slate-300 focus:ring-primary"
                  type="radio" name="asociar_a" value="cliente"
                  checked={asociarA === 'cliente'}
                  onChange={() => { setAsociarA('cliente'); setFkAliado(''); }}
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">Cliente</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  className="w-4 h-4 text-primary border-slate-300 focus:ring-primary"
                  type="radio" name="asociar_a" value="aliado"
                  checked={asociarA === 'aliado'}
                  onChange={() => { setAsociarA('aliado'); setFkCliente(''); }}
                />
                <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">Aliado Comercial (Emisora)</span>
              </label>
            </div>

            {asociarA === 'cliente' ? (
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Seleccionar Cliente</label>
                <select value={fkCliente} onChange={(e) => setFkCliente(e.target.value)} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required>
                  <option value="">Seleccionar cliente...</option>
                  {clientes.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre} — {c.razon_social}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Seleccionar Aliado Comercial</label>
                <select value={fkAliado} onChange={(e) => setFkAliado(e.target.value)} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required>
                  <option value="">Seleccionar emisora...</option>
                  {aliados.map((a) => (
                    <option key={a.id} value={a.id}>{a.nombre_emisora}</option>
                  ))}
                </select>
              </div>
            )}
          </section>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-8">

          {/* RESUMEN */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">summarize</span>
              Resumen
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Asociado a</span>
                <span className="text-xs font-medium text-slate-700 truncate max-w-[140px]">{asociadoNombre}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Tipo</span>
                <span className="text-xs font-medium text-slate-700 capitalize">{formData.tipo || '—'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Fecha</span>
                <span className="text-xs font-medium text-slate-700">{formData.fecha || '—'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-xs font-bold text-slate-700">Monto</span>
                <span className="text-sm font-black text-primary">${formData.monto ? parseFloat(formData.monto).toFixed(2) : '0.00'}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
