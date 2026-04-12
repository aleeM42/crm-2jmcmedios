// ==============================================
// ReporteGastosCliente.jsx — Lista de Gastos por Cliente
// ==============================================
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { toast } from 'sonner';
import api from '../services/api';
import { exportToExcel, exportToPDF } from '../services/ExportService.js';

const CATEGORIA_STYLE = {
  transporte: 'bg-blue-100 text-blue-600',
  alimentacion: 'bg-amber-100 text-amber-600',
  peaje: 'bg-purple-100 text-purple-600',
  estacionamiento: 'bg-pink-100 text-pink-600',
  regalos: 'bg-rose-100 text-rose-600',
  atencion: 'bg-cyan-100 text-cyan-600',
  otros: 'bg-slate-100 text-slate-500',
  'campaña': 'bg-green-100 text-green-600',
  remota: 'bg-indigo-100 text-indigo-600',
  'regalos corporativos': 'bg-rose-100 text-rose-600',
};

function fmt(num) {
  if (!num && num !== 0) return '—';
  return `$${Number(num).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function ReporteGastosCliente() {
  const [listData, setListData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [kpi, setKpi] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(null);

  const chartRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api.get('/reportes/gastos-cliente')
      .then((res) => {
        if (cancelled) return;
        const d = res.data;
        setListData(d.listData || []);
        setChartData(d.chartData || []);
        setKpi(d.kpi || null);
        setTotalCount(d.totalCount || 0);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Error al cargar el reporte');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  // ── Export handlers ──────────────────────────────────────────────────────
  const isEmpty = !loading && listData.length === 0;
  const EXCEL_COLS  = ['Fecha', 'Cliente', 'Concepto', 'Categoría', 'Monto', 'Vendedor'];
  const EXCEL_TYPES = { 'Monto': 'currency' };

  const buildRows = () => listData.map(r => ({
    'Fecha':    r.fecha?.slice(0, 10) || '—',
    'Cliente':  r.cliente_nombre || '—',
    'Concepto': r.concepto,
    'Categoría':r.categoria,
    'Monto':    parseFloat(r.monto) || 0,
    'Vendedor': r.vendedor_nombre || '—',
  }));

  const handleExportExcel = async () => {
    if (exporting || loading || isEmpty) return;
    setExporting('excel');
    const toastId = toast.loading('Generando Excel…', { description: '0%' });
    try {
      await exportToExcel({
        reportName:  'Gastos_por_Cliente',
        columns:     EXCEL_COLS,
        rows:        buildRows(),
        columnTypes: EXCEL_TYPES,
        sheetName:   'Gastos',
        onProgress:  (p) => toast.loading('Generando Excel…', { id: toastId, description: `${p}%` }),
      });
      toast.success('Excel descargado', { id: toastId });
    } catch (err) {
      toast.error('Error al exportar Excel', { id: toastId, description: err.message });
    } finally { setExporting(null); }
  };

  const handleExportPDF = async () => {
    if (exporting || loading || isEmpty) return;
    setExporting('pdf');
    const toastId = toast.loading('Generando PDF…', { description: '0%' });
    try {
      await exportToPDF({
        reportName:   'Gastos_por_Cliente',
        chartElement: chartRef.current,
        columns:      EXCEL_COLS,
        rows:         buildRows(),
        columnTypes:  EXCEL_TYPES,
        onProgress:   (p) => toast.loading('Generando PDF…', { id: toastId, description: `${p}%` }),
      });
      toast.success('PDF descargado', { id: toastId });
    } catch (err) {
      toast.error('Error al exportar PDF', { id: toastId, description: err.message });
    } finally { setExporting(null); }
  };

  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Gastos en inversión de atención comercial</span>
      </nav>

      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Lista de Gastos por Cliente</h2>
          <p className="text-slate-500 text-sm mt-1">Detalle de inversión publicitaria desglosado por cada cuenta</p>
        </div>
        <div className="flex items-center gap-3">
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

      {/* Error state */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          <span className="material-symbols-outlined align-middle text-base mr-1">error</span>
          {error}
        </div>
      )}

      {/* KPI CARDS */}
      {kpi && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Inversión</p>
              <h3 className="text-3xl font-bold text-slate-900">{fmt(kpi.grandTotal)}</h3>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-primary">payments</span>
            </div>
          </div>
          <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Registros</p>
              <h3 className="text-3xl font-bold text-slate-900">{totalCount}</h3>
            </div>
            <div className="p-2 bg-accent-green/10 rounded-lg">
              <span className="material-symbols-outlined text-accent-green">receipt_long</span>
            </div>
          </div>
          <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Desglose por Categoría</p>
            <div className="space-y-2">
              {kpi.byCategoria.map((c) => (
                <div key={c.categoria} className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${CATEGORIA_STYLE[c.categoria?.toLowerCase()] || CATEGORIA_STYLE.otros}`}>
                    {c.categoria}
                  </span>
                  <span className="text-sm font-bold text-slate-700">{fmt(c.total)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOP CLIENTES CHART */}
      <section ref={chartRef} className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Top Clientes por Gasto Total</h3>
        {loading ? (
          <div className="h-[420px] flex items-center justify-center text-slate-400 text-sm font-medium">
            <span className="animate-spin material-symbols-outlined mr-2">autorenew</span> Cargando datos…
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-[420px] flex items-center justify-center text-slate-400 text-sm font-medium">
            No hay datos de gastos registrados
          </div>
        ) : (
          <div style={{ width: '100%', height: 420 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
                <defs>
                  <linearGradient id="gastoGradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#16B1B8" />
                    <stop offset="100%" stopColor="#8DC63F" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="nombre"
                  tick={{ fontSize: 11, fill: '#1F2937', fontWeight: 600, angle: -35, textAnchor: 'end' }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
                  formatter={(value, name, props) => [fmt(props.payload.gasto_total), 'Gasto Total']}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Bar dataKey="gasto_total" fill="url(#gastoGradient)" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold font-display text-slate-900">Detalle Individual de Gastos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Concepto</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Categoría</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Vendedor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-400 font-medium">
                    <span className="animate-spin material-symbols-outlined align-middle mr-2">autorenew</span>
                    Cargando…
                  </td>
                </tr>
              ) : listData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-400 font-medium">
                    No se encontraron gastos registrados
                  </td>
                </tr>
              ) : (
                listData.map((r, i) => (
                  <tr key={`${r.origen}-${r.id}-${i}`} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">{r.fecha?.slice(0, 10)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.cliente_nombre || '—'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{r.concepto}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${CATEGORIA_STYLE[r.categoria?.toLowerCase()] || CATEGORIA_STYLE.otros}`}>
                        {r.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{fmt(r.monto)}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{r.vendedor_nombre || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/30 flex justify-between items-center border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Mostrando <span className="font-bold">{listData.length}</span> de <span className="font-bold">{totalCount}</span> gastos
          </p>
        </div>
      </section>
    </>
  );
}
