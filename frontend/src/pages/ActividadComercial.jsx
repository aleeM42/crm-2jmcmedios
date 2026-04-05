// ==============================================
// ActividadComercial.jsx — Registro de Visitas/Gastos (dinámico)
// ==============================================
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';

function ActividadComercial() {
  // --- Data ---
  const [visitas, setVisitas] = useState([]);
  const [gastosTotales, setGastosTotales] = useState(0);
  const [vendedores, setVendedores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // --- Filters ---
  const [filterFecha, setFilterFecha] = useState('');
  const [filterVendedor, setFilterVendedor] = useState('');
  const [filterCliente, setFilterCliente] = useState('');
  const [filterTipo, setFilterTipo] = useState('');
  const [filterEfectiva, setFilterEfectiva] = useState('');

  // --- Pagination ---
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Fetch data on mount
  useEffect(() => {
    const load = async () => {
      try {
        const [visRes, gasVisRes, gasMktRes, venRes, cliRes] = await Promise.all([
          api.get('/visitas').catch(() => ({ success: false })),
          api.get('/gastos').catch(() => ({ success: false })),
          api.get('/gastos-marketing').catch(() => ({ success: false })),
          api.get('/vendedores').catch(() => ({ success: false })),
          api.get('/clientes').catch(() => ({ success: false })),
        ]);

        if (visRes.success) setVisitas(Array.isArray(visRes.data) ? visRes.data : []);
        {
          const arrVis = gasVisRes.success ? (Array.isArray(gasVisRes.data) ? gasVisRes.data : []) : [];
          const arrMkt = gasMktRes.success ? (Array.isArray(gasMktRes.data) ? gasMktRes.data : []) : [];
          const totalVis = arrVis.reduce((s, g) => s + parseFloat(g.monto || 0), 0);
          const totalMkt = arrMkt.reduce((s, g) => s + parseFloat(g.monto || 0), 0);
          setGastosTotales(totalVis + totalMkt);
        }
        if (venRes.success) {
          const d = venRes.data;
          setVendedores(Array.isArray(d) ? d : (d?.vendedores || []));
        }
        if (cliRes.success) {
          const d = cliRes.data;
          setClientes(Array.isArray(d) ? d : (d?.clientes || []));
        }
      } catch { /* silently handle */ }
      setLoadingData(false);
    };
    load();
  }, []);

  // Filtered visitas
  const filtered = useMemo(() => {
    return visitas.filter((v) => {
      if (filterFecha && v.fecha?.slice(0, 10) !== filterFecha) return false;
      if (filterVendedor && v.fk_vendedor !== filterVendedor) return false;
      if (filterCliente && v.cliente_nombre !== filterCliente) return false;
      if (filterTipo && v.tipo?.toLowerCase() !== filterTipo) return false;
      if (filterEfectiva === 'si' && v.efectiva !== 'si') return false;
      if (filterEfectiva === 'no' && v.efectiva !== 'no') return false;
      return true;
    });
  }, [visitas, filterFecha, filterVendedor, filterCliente, filterTipo, filterEfectiva]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // KPIs (computed from full dataset)
  const kpiTotal = visitas.length;
  const kpiEfectivas = visitas.filter((v) => v.efectiva === 'si').length;
  const kpiPct = kpiTotal > 0 ? Math.round((kpiEfectivas / kpiTotal) * 100) : 0;
  const kpiLlamadas = visitas.filter((v) => v.tipo?.toLowerCase() === 'llamada').length;

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [filterFecha, filterVendedor, filterCliente, filterTipo, filterEfectiva]);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 font-display">Actividad Comercial</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#F4FAFB] border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#F4FAFB] border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
            <span className="material-symbols-outlined text-sm">table_view</span>Excel
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#F4FAFB] p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Visitas del Mes</p>
          <p className="text-3xl font-bold text-slate-900">{loadingData ? '...' : kpiTotal}</p>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Visitas Efectivas</p>
              <p className="text-3xl font-bold text-slate-900">{loadingData ? '...' : kpiEfectivas}</p>
            </div>
            <span className="bg-accent-green/10 text-accent-green px-2 py-1 rounded text-xs font-bold">{kpiPct}%</span>
          </div>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Gastos del Mes</p>
          <p className="text-3xl font-bold text-slate-900">{loadingData ? '...' : `$${gastosTotales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Llamadas Registradas</p>
          <p className="text-3xl font-bold text-slate-900">{loadingData ? '...' : kpiLlamadas}</p>
        </div>
      </div>

      {/* View toggle + filters */}
      <div className="space-y-6">
        <div className="flex items-center border-b border-slate-200 gap-8">
          <button className="pb-4 text-sm font-bold border-b-2 border-primary text-primary">Visitas</button>
          <Link to="/actividad-comercial/gastos" className="pb-4 text-sm font-bold border-b-2 border-transparent text-slate-400 hover:text-slate-600 transition-colors">Gastos</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Fecha</label>
            <input value={filterFecha} onChange={(e) => setFilterFecha(e.target.value)} className="w-full bg-[#F4FAFB] border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary" type="date" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Vendedor</label>
            <select value={filterVendedor} onChange={(e) => setFilterVendedor(e.target.value)} className="w-full bg-[#F4FAFB] border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary">
              <option value="">Todos los vendedores</option>
              {vendedores.map((v) => (
                <option key={v.usuario_id || v.id} value={v.usuario_id || v.id}>
                  {v.primer_nombre || v.nombre} {v.primer_apellido || v.apellido}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Cliente</label>
            <select value={filterCliente} onChange={(e) => setFilterCliente(e.target.value)} className="w-full bg-[#F4FAFB] border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary">
              <option value="">Todos los clientes</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.nombre}>{c.nombre}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Tipo</label>
            <select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)} className="w-full bg-[#F4FAFB] border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary">
              <option value="">Cualquiera</option>
              <option value="presencial">Presencial</option>
              <option value="llamada">Llamada</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Efectiva</label>
            <select value={filterEfectiva} onChange={(e) => setFilterEfectiva(e.target.value)} className="w-full bg-[#F4FAFB] border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary">
              <option value="">Ambos</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#F4FAFB] rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 font-display">Registro de Visitas</h3>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <Link to="/actividad-comercial/gastos/agregar" className="px-4 py-2 bg-accent-green text-slate-50 rounded-lg text-sm font-bold shadow-lg shadow-accent-green/20 hover:bg-accent-green/70 transition-all border border-slate-200  text-center  flex items-center justify-center gap-2 flex-1 sm:flex-initial"><span className="material-symbols-outlined text-base">add</span>Agregar Gasto</Link>
              <Link to="/actividad-comercial/visita" className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-bold hover:opacity-90 shadow-md transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial">
                <span className="material-symbols-outlined text-base">add</span>Agregar Visita
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Hora</th>
                  <th className="px-6 py-4">Vendedor</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Tipo</th>
                  <th className="px-6 py-4">Objetivo Visita</th>
                  <th className="px-6 py-4 text-center">Efectiva</th>
                  <th className="px-6 py-4">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loadingData ? (
                  <tr><td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-400">Cargando visitas...</td></tr>
                ) : paginated.length === 0 ? (
                  <tr><td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-400">No se encontraron visitas</td></tr>
                ) : (
                  paginated.map((v) => {
                    const tipoClass = v.tipo?.toLowerCase() === 'presencial'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-accent-light/30 text-secondary';
                    const esEfectiva = v.efectiva === 'si';
                    return (
                      <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">{v.fecha?.slice(0, 10)}</td>
                        <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{v.hora?.slice(0, 5)}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">{v.vendedor_nombre} {v.vendedor_apellido}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{v.cliente_nombre || '—'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`${tipoClass} px-3 py-1 rounded-full text-[11px] font-bold uppercase`}>{v.tipo}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 line-clamp-1 max-w-[200px]">{v.objetivo_visita}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`material-symbols-outlined ${esEfectiva ? 'text-accent-green' : 'text-red-400'}`}>
                            {esEfectiva ? 'check_circle' : 'cancel'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 italic whitespace-nowrap">{v.detalle || '—'}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Mostrando {filtered.length === 0 ? 0 : (page - 1) * perPage + 1} a {Math.min(page * perPage, filtered.length)} de {filtered.length} resultados
            </span>
            <div className="flex gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)} className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold ${page === n ? 'bg-primary text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-40">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActividadComercial;
