// ==============================================
// ReporteClientesSector.jsx — Clientes por Sector
// ==============================================
import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import api from '../services/api';
import { exportToExcel, exportToPDF } from '../services/ExportService.js';

const COLORS = ['#16B1B8', '#8DC63F', '#55CCD3', '#A1DEE5', '#d1d5db', '#8B5CF6', '#F59E0B', '#EF4444', '#10B981', '#3B82F6'];

export default function ReporteClientesSector() {
  const [chartDataRaw, setChartDataRaw] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(null);

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get('/reportes/clientes-sector');
        if (response.success) {
          setChartDataRaw(response.data.chartData || []);
          setListData(response.data.listData || []);
        } else {
          setError('No se pudo cargar la información del reporte.');
        }
      } catch (err) {
        console.error(err);
        setError('Error de conexión.');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const { totalClientes, chartData } = useMemo(() => {
    if (!chartDataRaw) return { totalClientes: 0, chartData: [] };
    const total = chartDataRaw.reduce((acc, curr) => acc + Number(curr.value || 0), 0);
    const data = chartDataRaw.map((item, index) => ({
      nombre: item.name || 'Sin Sector',
      clientes: Number(item.value),
      pct: total > 0 ? Math.round((Number(item.value) / total) * 100) : 0,
      color: COLORS[index % COLORS.length]
    }));
    return { totalClientes: total, chartData: data };
  }, [chartDataRaw]);

  // ── Export handlers ──────────────────────────────────────────────────────
  const isEmpty = !loading && chartData.length === 0;

  const buildChartRows = () => chartData.map(s => ({
    'Sector':   s.nombre,
    'Clientes': s.clientes,
    '%':        s.pct,
  }));
  const buildListRows = () => listData.map(r => ({
    'RIF Fiscal':      r.rif_fiscal,
    'Razón Social':    r.razon_social,
    'Nombre Comercial':r.nombre,
    'Sector':          r.sector || 'N/A',
    'Estado':          r.estado,
  }));

  const handleExportExcel = async () => {
    if (exporting || loading || isEmpty) return;
    setExporting('excel');
    const toastId = toast.loading('Generando Excel…', { description: '0%' });
    try {
      await exportToExcel({
        reportName:  'Clientes_por_Sector',
        columns:     ['RIF Fiscal', 'Razón Social', 'Nombre Comercial', 'Sector', 'Estado'],
        rows:        buildListRows(),
        columnTypes: {},
        sheetName:   'Clientes por Sector',
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
        reportName:   'Clientes_por_Sector',
        chartElement: chartRef.current,
        columns:      ['RIF Fiscal', 'Razón Social', 'Nombre Comercial', 'Sector', 'Estado'],
        rows:         buildListRows(),
        onProgress:   (p) => toast.loading('Generando PDF…', { id: toastId, description: `${p}%` }),
      });
      toast.success('PDF descargado', { id: toastId });
    } catch (err) {
      toast.error('Error al exportar PDF', { id: toastId, description: err.message });
    } finally { setExporting(null); }
  };

  if (loading) {
    return <div className="p-10 text-center text-slate-500 font-medium">Cargando reporte...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500 font-medium">{error}</div>;
  }

  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Clientes por Sector</span>
      </nav>

      <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Clientes por Sector</h2>
          <p className="text-slate-500 text-sm mt-1">Distribución de cartera de clientes según industria y sector comercial</p>
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

      {/* DONUT + LEGEND */}
      <section ref={chartRef} className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-2">Distribución de Mercado</h3>
        <p className="text-xs text-slate-400 mb-6">Representación visual por sectores comerciales (Estado: Activo)</p>
        <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
          <div className="relative w-56 h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={chartData} dataKey="clientes" nameKey="nombre" cx="50%" cy="50%" innerRadius="60%" outerRadius="85%" paddingAngle={2} strokeWidth={0}>
                  {chartData.map((s) => (
                    <Cell key={s.nombre} fill={s.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }} formatter={(value, name) => [`${value} clientes`, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-900">{totalClientes}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Clientes</span>
            </div>
          </div>
          <div className="space-y-4 max-h-[250px] overflow-y-auto pr-4">
            {chartData.map((s) => (
              <div key={s.nombre} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }}></div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{s.nombre}</p>
                  <p className="text-xs text-slate-500">{s.pct}% ({s.clientes} clientes)</p>
                </div>
              </div>
            ))}
            {chartData.length === 0 && (
              <p className="text-xs text-slate-500">Sin datos registrados</p>
            )}
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold font-display text-slate-900">Listado Completo</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">RIF Fiscal</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Razón Social</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Nombre Comercial</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sector</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {listData.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{r.rif_fiscal}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{r.razon_social}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{r.nombre}</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">{r.sector || 'N/A'}</span></td>
                  <td className="px-6 py-4"><span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent-green/10 text-accent-green uppercase"><span className="w-1.5 h-1.5 rounded-full bg-accent-green"></span>{r.estado}</span></td>
                </tr>
              ))}
              {listData.length === 0 && (
                <tr><td colSpan="5" className="px-6 py-4 text-center text-sm text-slate-500">No hay información disponible.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
