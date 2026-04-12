// ==============================================
// ReporteGastosDetalleVendedor.jsx — Lista de Gastos por Vendedor
// ==============================================
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { reporteService } from '../services/reporte.service';
import { exportToExcel, exportToPDF } from '../services/ExportService';
import { toast } from 'sonner';

const CHART_COLORS = ['#16B1B8', '#8DC63F', '#55CCD3', '#A1DEE5', '#334155', '#E2E8F0'];

const MESES = [
  { id: 1, name: 'Enero' }, { id: 2, name: 'Febrero' }, { id: 3, name: 'Marzo' },
  { id: 4, name: 'Abril' }, { id: 5, name: 'Mayo' }, { id: 6, name: 'Junio' },
  { id: 7, name: 'Julio' }, { id: 8, name: 'Agosto' }, { id: 9, name: 'Septiembre' },
  { id: 10, name: 'Octubre' }, { id: 11, name: 'Noviembre' }, { id: 12, name: 'Diciembre' },
];

export default function ReporteGastosDetalleVendedor() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [aniosDisp, setAniosDisp] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroAnio, setFiltroAnio] = useState('');

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  const chartRef = useRef(null);

  useEffect(() => {
    cargarDatos();
  }, [filtroMes, filtroAnio]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filtroMes && filtroAnio) {
        params.mes = filtroMes;
        params.anio = filtroAnio;
      }
      const res = await reporteService.getReporte('gastos-detalle-vendedor', params);
      
      setData(res.listData || []);
      
      let accumulatedPct = 0;
      const mappedChartData = (res.chartData || []).map((c, i) => {
        const offset = accumulatedPct; // el stroke-dashoffset funciona al reves
        accumulatedPct += c.pct;
        return {
          ...c,
          color: CHART_COLORS[i % CHART_COLORS.length],
          offset: offset === 0 ? 0 : 100 - offset // hack for SVG circle strokeDashoffset starting pos
        };
      });
      setChartData(mappedChartData);
      
      if (aniosDisp.length === 0 && res.aniosDisponibles) {
        setAniosDisp(res.aniosDisponibles);
      }
      setPage(1);
    } catch (error) {
      toast.error('Error al cargar reporte de gastos');
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fechaDb) => {
    if (!fechaDb) return '—';
    const d = new Date(fechaDb);
    // Para no perder el día por zona horaria agregamos offset
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    return d.toLocaleDateString('es-VE');
  };

  const handleExportExcel = async () => {
    try {
      toast.info('Generando Excel...');
      await exportToExcel({
        reportName: 'Gastos por Vendedor',
        columns: ['Fecha', 'Vendedor', 'Concepto', 'Categoría', 'Cliente', 'Monto'],
        rows: data.map(r => ({
           Fecha: formatearFecha(r.fecha),
           Vendedor: r.vendedor,
           Concepto: r.concepto,
           'Categoría': r.categoria,
           Cliente: r.cliente || '—',
           Monto: r.monto
        })),
        columnTypes: { Monto: 'currency' }
      });
      toast.success('Excel descargado con éxito');
    } catch (e) {
      toast.error('Error al exportar Excel');
    }
  };

  const handleExportPDF = async () => {
    try {
      toast.info('Generando PDF...');
      await exportToPDF({
        reportName: 'Gastos por Vendedor',
        subtitle: (filtroMes && filtroAnio) ? `Filtro: Mes ${filtroMes} | Año ${filtroAnio}` : 'Período: Histórico Global',
        chartElement: chartRef.current,
        columns: ['Fecha', 'Vendedor', 'Concepto', 'Categoría', 'Cliente', 'Monto'],
        rows: data.map(r => ({
           Fecha: formatearFecha(r.fecha),
           Vendedor: r.vendedor,
           Concepto: r.concepto,
           'Categoría': r.categoria,
           Cliente: r.cliente || '—',
           Monto: r.monto
        })),
        columnTypes: { Monto: 'currency' }
      });
      toast.success('PDF descargado con éxito');
    } catch (e) {
      toast.error('Error al exportar PDF');
    }
  };

  const handlePeriodoChange = (tipo, valor) => {
    if (tipo === 'mes') {
      setFiltroMes(valor);
      if (valor !== '' && filtroAnio === '' && aniosDisp.length > 0) {
        setFiltroAnio(aniosDisp[0]);
      }
    } else {
      setFiltroAnio(valor);
      if (valor === '') setFiltroMes('');
    }
  };

  const formatearMoneda = (val) => {
    return new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD' }).format(val);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Gastos por Vendedor</span>
      </nav>

      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Lista de Gastos por Vendedor</h2>
          <p className="text-slate-500 text-sm mt-1">Listado detallado de viáticos y recursos asignados por visita</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Selectores de Periodo */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
             <select 
               value={filtroMes} 
               onChange={(e) => handlePeriodoChange('mes', e.target.value)}
               className="text-sm border-none bg-white focus:ring-0 text-slate-700 py-1.5 pl-3 pr-8"
             >
               <option value="">Todo el año</option>
               {MESES.map(m => (
                 <option key={m.id} value={m.id}>{m.name}</option>
               ))}
             </select>
             <div className="w-px h-6 bg-slate-200"></div>
             <select 
               value={filtroAnio} 
               onChange={(e) => handlePeriodoChange('anio', e.target.value)}
               className="text-sm border-none bg-white focus:ring-0 text-slate-700 py-1.5 pl-3 pr-8"
             >
               <option value="">Histórico total</option>
               {aniosDisp.map(a => (
                 <option key={a} value={a}>{a}</option>
               ))}
             </select>
          </div>

          <button onClick={handleExportPDF} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-base">picture_as_pdf</span>PDF
          </button>
          <button onClick={handleExportExcel} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-base">table_view</span>Excel
          </button>
        </div>
      </header>

      {/* DONUT */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8" ref={chartRef}>
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Distribución por Categoría</h3>
        {loading ? (
          <div className="w-full h-48 flex items-center justify-center">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary/30">autorenew</span>
          </div>
        ) : chartData.length === 0 ? (
          <div className="w-full h-48 flex items-center justify-center text-slate-400">
            No hay gastos registrados.
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#f1f5f9" strokeWidth="3"></circle>
                {chartData.map((c) => (
                  <circle 
                    key={c.nombre} 
                    cx="18" cy="18" fill="transparent" r="15.915" 
                    stroke={c.color} 
                    strokeDasharray={`${c.pct} ${100 - c.pct}`} 
                    strokeDashoffset={c.offset} 
                    strokeWidth="3.5"
                    className="transition-all duration-500 ease-out"
                  ></circle>
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">100%</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Categorías</span>
              </div>
            </div>
            <div className="space-y-3 min-w-[200px]">
              {chartData.map((c) => (
                <div key={c.nombre} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }}></div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 capitalize">{c.nombre}</p>
                      <p className="text-xs text-slate-500">{c.pct}%</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{formatearMoneda(c.total)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900">Desglose de Gastos</h3>
            <p className="text-xs text-slate-400 mt-1">Mostrando {paginatedData.length > 0 ? (page - 1) * itemsPerPage + 1 : 0} a {Math.min(page * itemsPerPage, data.length)} de {data.length} registros</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[100px]">Fecha</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[150px]">Vendedor</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[180px]">Concepto</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[120px]">Categoría</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[100px]">Monto</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[150px]">Cliente (Visita)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                   <td colSpan="6" className="px-6 py-12 text-center text-slate-400 text-sm">Cargando datos...</td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                   <td colSpan="6" className="px-6 py-12 text-center text-slate-400 text-sm">No se encontraron gastos en este período.</td>
                </tr>
              ) : (
                paginatedData.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">{formatearFecha(r.fecha)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.vendedor}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{r.concepto}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">
                        {r.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{formatearMoneda(r.monto)}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{r.cliente || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Rules */}
        {!loading && data.length > 0 && (
          <div className="px-6 py-4 bg-slate-50/30 flex justify-between items-center border-t border-slate-100">
            <p className="text-xs text-slate-500">Mostrando página <span className="font-bold">{page}</span> de <span className="font-bold">{totalPages}</span></p>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              
              <span className="text-xs font-bold px-3 text-slate-600">{page}</span>
              
              <button 
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
