// ==============================================
// ReporteMarcasRegion.jsx — Marcas por Región (datos reales)
// ==============================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { toast } from 'sonner';
import api from '../services/api.js';
import { exportToExcel, exportToPDF } from '../services/ExportService.js';

const RADAR_COLORS = ['#16B1B8', '#8DC63F', '#55CCD3', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#A1DEE5'];

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

// ── Skeletons ─────────────────────────────────────────────────────────────────
function SkeletonRow({ cols }) {
  return (
    <tr className="border-b border-slate-100 animate-pulse">
      <td className="px-6 py-4"><div className="h-3 rounded bg-slate-200 w-32" /></td>
      {[...Array(cols)].map((_, i) => (
        <td key={i} className="px-4 py-4"><div className="h-3 rounded bg-slate-200 w-8 mx-auto" /></td>
      ))}
      <td className="px-6 py-4"><div className="h-3 rounded bg-slate-200 w-10" /></td>
    </tr>
  );
}

function SkeletonRadar() {
  return (
    <div className="flex items-center justify-center h-80 animate-pulse">
      <div className="w-56 h-56 rounded-full border-4 border-slate-200" />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ReporteMarcasRegion() {
  const now = new Date();
  const [mes, setMes]   = useState(now.getMonth() + 1);
  const [anio, setAnio] = useState(now.getFullYear());

  const [chartData, setChartData]               = useState([]);
  const [listData, setListData]                 = useState([]);
  const [regiones, setRegiones]                 = useState([]);
  const [marcas, setMarcas]                     = useState([]);
  const [aniosDisponibles, setAniosDisponibles] = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState(null);
  const [exporting, setExporting]               = useState(null); // 'pdf' | 'excel' | null

  const chartRef = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/reportes/marcas-region?mes=${mes}&anio=${anio}`);
      setChartData(res.data.chartData          ?? []);
      setListData(res.data.listData            ?? []);
      setRegiones(res.data.regiones            ?? []);
      setMarcas(res.data.marcas                ?? []);
      setAniosDisponibles(res.data.aniosDisponibles ?? [anio]);
    } catch (err) {
      console.error('[ReporteMarcasRegion] Error al cargar datos:', err);
      setError('No se pudo cargar la información. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [mes, anio]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const yearOptions = aniosDisponibles.length ? aniosDisponibles : [anio];
  const isEmpty     = !loading && chartData.length === 0;

  // ── Export handlers ───────────────────────────────────────────────────────
  const reportTitle = `Marcas_por_Región_${MESES[mes - 1]}_${anio}`;

  const handleExportExcel = async () => {
    if (exporting || loading || isEmpty) return;
    setExporting('excel');
    const toastId = toast.loading('Generando Excel…', { description: '0%' });
    try {
      // Construir filas planas: { Marca, Región1, Región2, ..., Total }
      const flatRows = listData.map(m => {
        const row = { Marca: m.nombre };
        regiones.forEach(r => { row[r] = m[r] ?? 0; });
        row['Total'] = m.total;
        return row;
      });
      const cols = ['Marca', ...regiones, 'Total'];
      const types = {};
      regiones.forEach(r => { types[r] = 'number'; });
      types['Total'] = 'number';

      await exportToExcel({
        reportName:  reportTitle,
        columns:     cols,
        rows:        flatRows,
        columnTypes: types,
        sheetName:   'Marcas por Región',
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
      const flatRows = listData.map(m => {
        const row = { Marca: m.nombre };
        regiones.forEach(r => { row[r] = m[r] ?? 0; });
        row['Total'] = m.total;
        return row;
      });
      const cols = ['Marca', ...regiones, 'Total'];

      await exportToPDF({
        reportName:   reportTitle,
        chartElement: chartRef.current,
        columns:      cols,
        rows:         flatRows,
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

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">
          Reportes
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Marcas por Región</span>
      </nav>

      {/* Header */}
      <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">
            Marcas por Región
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Presencia de marcas en pautas activas por zona geográfica
          </p>
        </div>

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
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-lg">{exporting === 'pdf' ? 'hourglass_top' : 'picture_as_pdf'}</span>
            {exporting === 'pdf' ? 'Generando…' : 'PDF'}
          </button>
          <button
            onClick={handleExportExcel}
            disabled={!!exporting || loading || isEmpty}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-lg">{exporting === 'excel' ? 'hourglass_top' : 'table_view'}</span>
            {exporting === 'excel' ? 'Generando…' : 'Excel'}
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
      <section ref={chartRef} className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">
          Presencia por Región (Radar) — {MESES[mes - 1]} {anio}
        </h3>

        {loading ? (
          <SkeletonRadar />
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center h-80 text-slate-400">
            <span className="material-symbols-outlined text-5xl mb-2">radar</span>
            <p className="text-sm font-medium">Sin marcas activas para el período seleccionado</p>
          </div>
        ) : (
          <div style={{ width: '100%', height: 420 }}>
            <ResponsiveContainer>
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="region"
                  tick={{ fontSize: 12, fill: '#1F2937', fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  tick={{ fontSize: 10, fill: '#6B7280' }}
                  axisLine={false}
                  allowDecimals={false}
                />
                {marcas.map((nombre, i) => (
                  <Radar
                    key={nombre}
                    name={nombre}
                    dataKey={nombre}
                    stroke={RADAR_COLORS[i % RADAR_COLORS.length]}
                    fill={RADAR_COLORS[i % RADAR_COLORS.length]}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                ))}
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold font-display text-slate-900">Desglose por Región</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Marca</th>
                {loading
                  ? [...Array(3)].map((_, i) => (
                    <th key={i} className="px-4 py-4"><div className="h-3 rounded bg-slate-200 w-16 animate-pulse" /></th>
                  ))
                  : regiones.map(r => (
                    <th key={r} className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{r}</th>
                  ))
                }
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [...Array(6)].map((_, i) => <SkeletonRow key={i} cols={3} />)
              ) : listData.length === 0 ? (
                <tr>
                  <td colSpan={regiones.length + 2} className="px-6 py-10 text-center text-sm text-slate-400">
                    No hay marcas en pautas activas para {MESES[mes - 1]} {anio}.
                  </td>
                </tr>
              ) : (
                listData.map((m) => (
                  <tr key={m.nombre} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{m.nombre}</td>
                    {regiones.map(r => (
                      <td key={r} className="px-4 py-4 text-sm text-slate-600 text-center">
                        {m[r] ?? 0}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-sm font-bold text-primary">{m.total}</td>
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
