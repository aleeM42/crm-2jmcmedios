// ==============================================
// ActividadComercial.jsx — Registro de Visitas/Gastos (dinámico)
// ==============================================
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import { eliminarVisita } from '../services/visita.service.js';
import EditarVisitaModal from '../components/EditarVisitaModal.jsx';
import { getCurrentUser } from '../services/auth.service.js';
import { toast } from 'sonner';
import { exportToExcel, exportToPDF } from '../services/ExportService.js';

// ── Columnas del reporte de visitas ────────────────────────────────────────────
const EXCEL_COLS = ['Fecha', 'Hora', 'Vendedor', 'Visitado', 'Tipo', 'Objetivo', 'Efectiva', 'Gasto ($)', 'Detalle'];

function ActividadComercial() {
  const user = getCurrentUser();
  const userRole = user?.rol;
  const isInvitado = userRole === 'Invitado';
  // --- Data ---
  const [visitas, setVisitas] = useState([]);
  const [gastosVisitas, setGastosVisitas] = useState([]); // lista de GASTOS_VISITAS
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

  // --- Modals State ---
  const [editModalVisita, setEditModalVisita] = useState(null);
  const [deleteConfirmVisita, setDeleteConfirmVisita] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(null); // 'pdf' | 'excel' | null

  const fetchActividad = async () => {
    setLoadingData(true);
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
          // Guardar lista de gastos de visitas para cruzar con la tabla
          setGastosVisitas(arrVis);
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

  useEffect(() => {
    fetchActividad();
  }, []);

  const handleDeleteVisita = async () => {
    if (!deleteConfirmVisita) return;
    setDeleting(true);
    try {
      await eliminarVisita(deleteConfirmVisita.id);
      toast.success('Visita eliminada exitosamente');
      setDeleteConfirmVisita(null);
      fetchActividad(); // reload
    } catch (err) {
      toast.error(err.message || 'Error al eliminar visita');
      setDeleteConfirmVisita(null);
    } finally {
      setDeleting(false);
    }
  };

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

  // ── Export helpers ────────────────────────────────────────────────────────
  // Índice de gastos por visita para O(1) lookup
  const gastosPorVisita = useMemo(() => {
    const map = {};
    gastosVisitas.forEach((g) => {
      const vid = g.fk_visita;
      if (!map[vid]) map[vid] = 0;
      map[vid] += parseFloat(g.monto || 0);
    });
    return map;
  }, [gastosVisitas]);

  const buildRows = () =>
    filtered.map((v) => ({
      'Fecha':    v.fecha?.slice(0, 10) ?? '',
      'Hora':     v.hora?.slice(0, 5)  ?? '',
      'Vendedor': `${v.vendedor_nombre ?? ''} ${v.vendedor_apellido ?? ''}`.trim(),
      'Visitado': v.cliente_nombre || v.aliado_nombre || '—',
      'Tipo':     v.tipo ?? '',
      'Objetivo': v.objetivo_visita ?? '',
      'Efectiva': v.efectiva === 'si' ? 'Sí' : 'No',
      'Gasto ($)': gastosPorVisita[v.id] ?? 0,
      'Detalle':  v.detalle ?? '',
    }));

  const buildSubtitle = () => {
    const parts = [];
    if (filterFecha)    parts.push(`Fecha: ${filterFecha}`);
    if (filterVendedor) parts.push(`Vendedor ID: ${filterVendedor}`);
    if (filterCliente)  parts.push(`Cliente: ${filterCliente}`);
    if (filterTipo)     parts.push(`Tipo: ${filterTipo}`);
    if (filterEfectiva) parts.push(`Efectiva: ${filterEfectiva === 'si' ? 'Sí' : 'No'}`);
    return parts.length ? parts.join('  •  ') : 'Todas las visitas';
  };

  const handleExportExcel = async () => {
    if (exporting || loadingData || filtered.length === 0) return;
    setExporting('excel');
    const toastId = toast.loading('Generando Excel…', { description: '0%' });
    try {
      await exportToExcel({
        reportName:  'Actividad_Comercial_Visitas',
        columns:     EXCEL_COLS,
        rows:        buildRows(),
        columnTypes: { 'Gasto ($)': 'currency' },
        sheetName:   'Visitas',
        onProgress:  (p) => toast.loading('Generando Excel…', { id: toastId, description: `${p}%` }),
      });
      toast.success('Excel descargado', { id: toastId });
    } catch (err) {
      console.error('[Export Excel]', err);
      toast.error('Error al exportar Excel', { id: toastId, description: err.message });
    } finally {
      setExporting(null);
    }
  };

  const handleExportPDF = async () => {
    if (exporting || loadingData || filtered.length === 0) return;
    setExporting('pdf');
    const toastId = toast.loading('Generando PDF…', { description: '0%' });
    try {
      await exportToPDF({
        reportName:   'Actividad_Comercial_Visitas',
        chartElement: null,
        columns:      EXCEL_COLS,
        rows:         buildRows(),
        columnTypes:  { 'Gasto ($)': 'currency' },
        subtitle:     buildSubtitle(),
        onProgress:   (p) => toast.loading('Generando PDF…', { id: toastId, description: `${p}%` }),
      });
      toast.success('PDF descargado', { id: toastId });
    } catch (err) {
      console.error('[Export PDF]', err);
      toast.error('Error al exportar PDF', { id: toastId, description: err.message });
    } finally {
      setExporting(null);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 font-display">Actividad Comercial</h2>
        <div className="flex gap-3">
          <button
            onClick={handleExportPDF}
            disabled={!!exporting || loadingData || filtered.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[#F4FAFB] border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">
              {exporting === 'pdf' ? 'hourglass_top' : 'picture_as_pdf'}
            </span>PDF
          </button>
          <button
            onClick={handleExportExcel}
            disabled={!!exporting || loadingData || filtered.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[#F4FAFB] border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">
              {exporting === 'excel' ? 'hourglass_top' : 'table_view'}
            </span>Excel
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
              {!isInvitado && (
                <Link to="/actividad-comercial/visita" className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-bold hover:opacity-90 shadow-md transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial">
                  <span className="material-symbols-outlined text-base">add</span>Agregar Visita
                </Link>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Hora</th>
                  <th className="px-6 py-4">Vendedor</th>
                  <th className="px-6 py-4">Visitado</th>
                  <th className="px-6 py-4">Tipo</th>
                  <th className="px-6 py-4">Objetivo Visita</th>
                  <th className="px-6 py-4 text-center">Efectiva</th>
                  <th className="px-6 py-4">Detalle</th>
                  <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loadingData ? (
                  <tr><td colSpan={9} className="px-6 py-12 text-center text-sm text-slate-400">Cargando visitas...</td></tr>
                ) : paginated.length === 0 ? (
                  <tr><td colSpan={9} className="px-6 py-12 text-center text-sm text-slate-400">No se encontraron visitas</td></tr>
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
                        <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">
                          {v.cliente_nombre || v.aliado_nombre || '—'}
                          {v.aliado_nombre ? (
                            <span className="ml-2 px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded text-[9px] uppercase tracking-wider font-bold">Aliado</span>
                          ) : v.cliente_nombre ? (
                            <span className="ml-2 px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded text-[9px] uppercase tracking-wider font-bold">Cliente</span>
                          ) : null}
                        </td>
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
                        <td className="px-6 py-4 text-center">
                          {!isInvitado && (
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => setEditModalVisita(v)}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-primary/10 text-slate-500 hover:text-primary flex items-center justify-center transition-colors"
                                title="Editar"
                              >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </button>
                              <button
                                onClick={() => setDeleteConfirmVisita(v)}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 flex items-center justify-center transition-colors"
                                title="Eliminar"
                              >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                          )}
                        </td>
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

      {/* ═══ MODAL MODIFICAR VISITA ═══ */}
      {editModalVisita && (
        <EditarVisitaModal
          visita={editModalVisita}
          onClose={() => setEditModalVisita(null)}
          onSuccess={() => {
            setEditModalVisita(null);
            toast.success('Visita actualizada exitosamente');
            fetchActividad();
          }}
        />
      )}

      {/* ═══ MODAL CONFIRMAR ELIMINACIÓN ═══ */}
      {deleteConfirmVisita && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => !deleting && setDeleteConfirmVisita(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-[fadeIn_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3 bg-red-50/50">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-500">warning</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 font-display text-base">Eliminar Visita</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Acción irreversible</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                ¿Estás seguro de que deseas eliminar la visita con objetivo: <span className="font-bold text-slate-800">"{deleteConfirmVisita.objetivo_visita}"</span> del <span className="font-bold text-slate-800">{deleteConfirmVisita.fecha?.slice(0, 10)}</span>?
              </p>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmVisita(null)}
                disabled={deleting}
                className="px-5 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteVisita}
                disabled={deleting}
                className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors shadow-sm shadow-red-500/20 flex items-center gap-2 disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">delete_forever</span>
                    Sí, eliminar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActividadComercial;
