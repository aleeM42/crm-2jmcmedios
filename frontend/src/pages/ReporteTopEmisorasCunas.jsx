// ==============================================
// ReporteTopEmisorasCunas.jsx — Top Emisoras por Cuñas (datos reales)
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

// ── Helpers ──────────────────────────────────────────────────────────────────
const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const fmt = (n) =>
  new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

// ── Export config ─────────────────────────────────────────────────────────────
const EXCEL_COLS  = ['#', 'Emisora', 'Cuñas', 'Clientes', 'Monto OT'];
const EXCEL_TYPES = { 'Monto OT': 'currency', 'Cuñas': 'number', 'Clientes': 'number' };

// ── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-b border-slate-100 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-3 rounded bg-slate-200" style={{ width: i === 1 ? '60%' : '40%' }} />
        </td>
      ))}
    </tr>
  );
}

// ── Skeleton chart ────────────────────────────────────────────────────────────
function SkeletonChart() {
  return (
    <div className="flex items-end gap-3 h-64 px-4 animate-pulse">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-slate-200"
          style={{ height: `${Math.random() * 60 + 30}%` }}
        />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ReporteTopEmisorasCunas() {
  const now = new Date();
  const [mes, setMes] = useState(now.getMonth() + 1);   // 1-12
  const [anio, setAnio] = useState(now.getFullYear());

  const [chartData, setChartData] = useState([]);
  const [listData, setListData] = useState([]);
  const [aniosDisponibles, setAniosDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(null); // 'pdf' | 'excel' | null

  const chartRef = useRef(null);

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(
        `/reportes/top-emisoras-cunas?mes=${mes}&anio=${anio}`
      );
      setChartData(res.data.chartData ?? []);
      setListData(res.data.listData ?? []);
      setAniosDisponibles(res.data.aniosDisponibles ?? [anio]);
    } catch (err) {
      console.error('[ReporteTopEmisorasCunas] Error al cargar datos:', err);
      setError('No se pudo cargar la información. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [mes, anio]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Derived ───────────────────────────────────────────────────────────────
  const yearOptions = aniosDisponibles.length ? aniosDisponibles : [anio];
  const isEmpty     = !loading && listData.length === 0;
  const reportTitle = `Top_Emisoras_Cunas_${MESES[mes - 1]}_${anio}`;

  const buildRows = () =>
    listData.map((e, i) => ({
      '#':        i + 1,
      'Emisora':  e.nombre,
      'Cuñas':    Number(e.cunas),
      'Clientes': Number(e.clientes),
      'Monto OT': parseFloat(e.monto_total) || 0,
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
        sheetName:   'Top Emisoras Cuñas',
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
        subtitle:     `${MESES[mes - 1]} ${anio}`,
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
        <span className="text-slate-900 font-semibold">Top Emisoras por Cuñas</span>
      </nav>

      {/* Header */}
      <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">
            Top Emisoras por Cuñas
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Ranking de emisoras con mayor volumen de cuñas transmitidas
          </p>
        </div>

        {/* Filtros mes / año + exportación */}
        <div className="flex items-center gap-3">
          <select
            value={mes}
            onChange={e => setMes(Number(e.target.value))}
            className="text-xs font-semibold border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {MESES.map((m, i) => (
              <option key={i + 1} value={i + 1}>{m}</option>
            ))}
          </select>

          <select
            value={anio}
            onChange={e => setAnio(Number(e.target.value))}
            className="text-xs font-semibold border border-slate-200 rounded-lg px-8 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {yearOptions.map(y => (
              <option key={y} value={y}>{y}</option>
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

      {/* CHART */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">
          Top 10 Emisoras — {MESES[mes - 1]} {anio}
        </h3>

        {loading ? (
          <SkeletonChart />
        ) : chartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <span className="material-symbols-outlined text-5xl mb-2">bar_chart</span>
            <p className="text-sm font-medium">Sin datos para el período seleccionado</p>
          </div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: 420 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 70 }}>
                <defs>
                  <linearGradient id="emisoraGradient" x1="0" y1="1" x2="0" y2="0">
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
                <YAxis
                  tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }}
                  axisLine={false} tickLine={false}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
                  formatter={(value, name) => [
                    name === 'cunas' ? `${value} cuñas` : fmt(value),
                    name === 'cunas' ? 'Cuñas' : 'Monto OT',
                  ]}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Bar dataKey="cunas" fill="url(#emisoraGradient)" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold font-display text-slate-900">Detalle por Emisora</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">#</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Emisora</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cuñas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Clientes</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto OT</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [...Array(8)].map((_, i) => <SkeletonRow key={i} />)
              ) : listData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-400">
                    No hay registros para {MESES[mes - 1]} {anio}.
                  </td>
                </tr>
              ) : (
                listData.map((e, i) => (
                  <tr key={e.nombre} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-primary">{i + 1}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{e.nombre}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{e.cunas.toLocaleString('es-VE')}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{e.clientes}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{fmt(e.monto_total)}</td>
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
