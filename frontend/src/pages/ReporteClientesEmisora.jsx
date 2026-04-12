// ==============================================
// ReporteClientesEmisora.jsx — Clientes por Emisora (datos reales)
// ==============================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { toast } from 'sonner';
import api from '../services/api.js';
import { exportToExcel, exportToPDF } from '../services/ExportService.js';

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat('es-VE', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(n);

// ── Export config ─────────────────────────────────────────────────────────────
// listData es anidado → aplanamos en buildRows: 1 fila por cliente
const EXCEL_COLS  = ['Emisora', 'Región', 'Frecuencia', 'Cliente', 'Pautas', 'Monto OT', 'Estado'];
const EXCEL_TYPES = { 'Monto OT': 'currency', 'Pautas': 'number' };

// ── Skeletons ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6 animate-pulse">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 rounded bg-slate-200 w-48" />
          <div className="h-3 rounded bg-slate-200 w-32" />
        </div>
        <div className="h-6 w-6 rounded-full bg-slate-200" />
      </div>
      <div className="p-6 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-3 rounded bg-slate-200 w-40" />
            <div className="h-3 rounded bg-slate-200 w-12" />
            <div className="h-3 rounded bg-slate-200 w-20" />
            <div className="h-3 rounded bg-slate-200 w-14" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ReporteClientesEmisora() {
  const [emisoraFiltro, setEmisoraFiltro] = useState('');

  const [chartData, setChartData] = useState([]);
  const [listData, setListData]   = useState([]);
  const [emisoras, setEmisoras]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [exporting, setExporting] = useState(null); // 'pdf' | 'excel' | null

  const chartRef = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const qs  = emisoraFiltro ? `?emisoraId=${emisoraFiltro}` : '';
      const res = await api.get(`/reportes/clientes-emisora${qs}`);
      setChartData(res.data.chartData ?? []);
      setListData(res.data.listData   ?? []);
      // Solo poblar el selector en la primera carga (sin filtro aplicado)
      if (!emisoraFiltro) setEmisoras(res.data.emisoras ?? []);
    } catch (err) {
      console.error('[ReporteClientesEmisora] Error al cargar datos:', err);
      setError('No se pudo cargar la información. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [emisoraFiltro]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const isEmpty     = !loading && listData.length === 0;
  const reportTitle = emisoraFiltro
    ? `Clientes_Emisora_${emisoras.find(e => String(e.id) === String(emisoraFiltro))?.nombre ?? emisoraFiltro}`
    : 'Clientes_por_Emisora';

  // Aplana estructura anidada → 1 fila por cliente
  const buildRows = () => {
    const rows = [];
    listData.forEach((e) => {
      (e.clientes ?? []).forEach((c) => {
        rows.push({
          'Emisora':    e.emisora,
          'Región':     e.region,
          'Frecuencia': e.frecuencia,
          'Cliente':    c.nombre,
          'Pautas':     Number(c.pautas),
          'Monto OT':   parseFloat(c.monto_total) || 0,
          'Estado':     c.estado,
        });
      });
    });
    return rows;
  };

  // ── Export handlers ───────────────────────────────────────────────────────
  const handleExportExcel = async () => {
    if (exporting || loading || isEmpty) return;
    setExporting('excel');
    const toastId = toast.loading('Generando Excel…', { description: '0%' });
    try {
      await exportToExcel({
        reportName:  reportTitle,
        columns:     EXCEL_COLS,
        rows:        buildRows(),
        columnTypes: EXCEL_TYPES,
        sheetName:   'Clientes por Emisora',
        onProgress:  (p) => toast.loading('Generando Excel…', { id: toastId, description: `${p}%` }),
      });
      toast.success('Excel descargado', { id: toastId, description: reportTitle });
    } catch (err) {
      console.error('[Export Excel]', err);
      toast.error('Error al exportar Excel', { id: toastId, description: err.message });
    } finally {
      setExporting(null);
    }
  };

  const handleExportPDF = async () => {
    if (exporting || loading || isEmpty) return;
    setExporting('pdf');
    const toastId = toast.loading('Generando PDF…', { description: '0%' });
    try {
      await exportToPDF({
        reportName:   reportTitle,
        chartElement: chartRef.current,
        columns:      EXCEL_COLS,
        rows:         buildRows(),
        columnTypes:  EXCEL_TYPES,
        onProgress:   (p) => toast.loading('Generando PDF…', { id: toastId, description: `${p}%` }),
      });
      toast.success('PDF descargado', { id: toastId, description: reportTitle });
    } catch (err) {
      console.error('[Export PDF]', err);
      toast.error('Error al exportar PDF', { id: toastId, description: err.message });
    } finally {
      setExporting(null);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">
          Reportes
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Clientes por Emisora</span>
      </nav>

      {/* Header */}
      <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">
            Clientes por Emisora
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Relación de clientes asociados a cada emisora aliada
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={emisoraFiltro}
            onChange={e => setEmisoraFiltro(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-2.5 px-3 focus:ring-primary focus:outline-none"
          >
            <option value="">Emisora: Todas</option>
            {emisoras.map(e => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
          <button
            onClick={handleExportPDF}
            disabled={!!exporting || loading || isEmpty}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-lg">
              {exporting === 'pdf' ? 'hourglass_top' : 'picture_as_pdf'}
            </span>
            PDF
          </button>
          <button
            onClick={handleExportExcel}
            disabled={!!exporting || loading || isEmpty}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-lg">
              {exporting === 'excel' ? 'hourglass_top' : 'table_view'}
            </span>
            Excel
          </button>
        </div>
      </header>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          <span className="material-symbols-outlined text-lg">error</span>
          {error}
          <button onClick={fetchData} className="ml-auto underline text-xs">Reintentar</button>
        </div>
      )}

      {/* CHART — Top emisoras por clientes */}
      {!emisoraFiltro && (
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
          <h3 className="text-lg font-bold font-display text-slate-900 mb-6">
            Top 10 Emisoras por Clientes
          </h3>
          {loading ? (
            <div className="flex items-end gap-3 h-48 px-4 animate-pulse">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex-1 rounded-t bg-slate-200" style={{ height: `${Math.random() * 60 + 30}%` }} />
              ))}
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400">
              <span className="material-symbols-outlined text-5xl mb-2">bar_chart</span>
              <p className="text-sm font-medium">Sin datos disponibles</p>
            </div>
          ) : (
            <div ref={chartRef} style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 80 }}>
                  <defs>
                    <linearGradient id="clientesGradient" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#16B1B8" />
                      <stop offset="100%" stopColor="#8DC63F" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="nombre"
                    tick={{ fontSize: 11, fill: '#1F2937', fontWeight: 600, angle: -40, textAnchor: 'end' }}
                    axisLine={false} tickLine={false} interval={0}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
                    formatter={(value) => [`${value} clientes`, 'Clientes']}
                    cursor={{ fill: '#f1f5f9' }}
                  />
                  <Bar dataKey="clientes" fill="url(#clientesGradient)" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      )}

      {/* CARDS por emisora */}
      {loading ? (
        [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
      ) : listData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <span className="material-symbols-outlined text-5xl mb-2">radio</span>
          <p className="text-sm font-medium">No hay datos de clientes para la emisora seleccionada.</p>
        </div>
      ) : (
        listData.map((e) => (
          <section
            key={e.emisora_id}
            className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6"
          >
            {/* Card header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">{e.emisora}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {e.region} · {e.frecuencia} · {e.totalClientes} {e.totalClientes === 1 ? 'cliente' : 'clientes'}
                </p>
              </div>
              <span className="material-symbols-outlined text-primary text-2xl">radio</span>
            </div>

            {/* Client table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                    <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pautas</th>
                    <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto OT</th>
                    <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {e.clientes.map((c) => (
                    <tr key={c.cliente_id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3 text-sm font-semibold text-slate-900">{c.nombre}</td>
                      <td className="px-6 py-3 text-sm text-slate-600">{c.pautas}</td>
                      <td className="px-6 py-3 text-sm font-medium text-slate-700">{fmt(c.monto_total)}</td>
                      <td className="px-6 py-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                          c.estado === 'Activo'
                            ? 'bg-accent-green/10 text-accent-green'
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {c.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))
      )}
    </>
  );
}
