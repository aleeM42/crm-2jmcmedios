// ==============================================
// ReporteEmisorasRegion.jsx — Emisoras por Región (datos reales)
// ==============================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Tooltip, ResponsiveContainer,
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
const EXCEL_COLS  = ['Región', 'Emisoras', 'Pautas', 'Monto OT'];
const EXCEL_TYPES = { 'Monto OT': 'currency', 'Emisoras': 'number', 'Pautas': 'number' };

// ── Skeleton row ──────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-b border-slate-100 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-3 rounded bg-slate-200" style={{ width: i === 0 ? '55%' : '35%' }} />
        </td>
      ))}
    </tr>
  );
}

// ── Skeleton radar ────────────────────────────────────────────────────────────
function SkeletonRadar() {
  return (
    <div className="flex items-center justify-center h-64 animate-pulse">
      <div className="w-48 h-48 rounded-full border-4 border-slate-200" />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ReporteEmisorasRegion() {
  const [chartData, setChartData] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(null); // 'pdf' | 'excel' | null

  const chartRef = useRef(null);

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/reportes/emisoras-region');
      setChartData(res.data.chartData ?? []);
      setListData(res.data.listData   ?? []);
    } catch (err) {
      console.error('[ReporteEmisorasRegion] Error al cargar datos:', err);
      setError('No se pudo cargar la información. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const isEmpty     = !loading && listData.length === 0;
  const reportTitle = 'Emisoras_por_Región';

  const buildRows = () =>
    listData.map((r) => ({
      'Región':   r.nombre,
      'Emisoras': Number(r.emisoras),
      'Pautas':   Number(r.pautas),
      'Monto OT': parseFloat(r.monto_total) || 0,
    }));

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
        sheetName:   'Emisoras por Región',
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

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">
          Reportes
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Emisoras por Región</span>
      </nav>

      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">
            Emisoras por Región
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Distribución geográfica de todas las emisoras aliadas registradas
          </p>
        </div>
        <div className="flex items-center gap-3">
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

      {/* CHART */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">
          Distribución de Emisoras por Región
        </h3>

        {loading ? (
          <SkeletonRadar />
        ) : chartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <span className="material-symbols-outlined text-5xl mb-2">radar</span>
            <p className="text-sm font-medium">Sin datos de emisoras con pautas</p>
          </div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: 340 }}>
            <ResponsiveContainer>
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="nombre"
                  tick={{ fontSize: 12, fill: '#1F2937', fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  tick={{ fontSize: 10, fill: '#6B7280' }}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Radar
                  name="Emisoras"
                  dataKey="emisoras"
                  stroke="#16B1B8"
                  fill="#16B1B8"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
                  formatter={(value) => [`${value} emisoras`, 'Emisoras activas']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold font-display text-slate-900">Detalle Regional</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Región</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Emisoras</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pautas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto OT</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : listData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-400">
                    No hay emisoras con pautas registradas.
                  </td>
                </tr>
              ) : (
                listData.map((r) => (
                  <tr key={r.nombre} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase">
                        {r.nombre}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">
                      {r.emisoras}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {r.pautas.toLocaleString('es-VE')}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      {fmt(r.monto_total)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
