// ==============================================
// ReporteTopEmisorasClientes.jsx — Top Emisoras por Clientes
// ==============================================
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { reporteService } from '../services/reporte.service';
import { exportToExcel, exportToPDF } from '../services/ExportService';
import { toast } from 'sonner';

const MESES = [
  { id: 1, name: 'Enero' }, { id: 2, name: 'Febrero' }, { id: 3, name: 'Marzo' },
  { id: 4, name: 'Abril' }, { id: 5, name: 'Mayo' }, { id: 6, name: 'Junio' },
  { id: 7, name: 'Julio' }, { id: 8, name: 'Agosto' }, { id: 9, name: 'Septiembre' },
  { id: 10, name: 'Octubre' }, { id: 11, name: 'Noviembre' }, { id: 12, name: 'Diciembre' },
];

export default function ReporteTopEmisorasClientes() {
  const [data, setData] = useState([]);
  const [aniosDisp, setAniosDisp] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroAnio, setFiltroAnio] = useState('');

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
      const res = await reporteService.getReporte('top-emisoras-clientes', params);
      
      setData(res.listData || []);
      
      if (aniosDisp.length === 0 && res.aniosDisponibles) {
        setAniosDisp(res.aniosDisponibles);
      }
    } catch (error) {
      toast.error('Error al cargar top emisoras');
    } finally {
      setLoading(false);
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

  const handleExportExcel = async () => {
    try {
      toast.info('Generando Excel...');
      await exportToExcel({
        reportName: 'Top Emisoras por Clientes',
        columns: ['Ranking', 'Emisora', 'Clientes', 'Pautas', 'Monto Facturado', 'Región'],
        rows: data.map((r, i) => ({
           Ranking: i + 1,
           Emisora: r.nombre,
           Clientes: r.clientes,
           Pautas: r.pautas,
           'Monto Facturado': r.monto,
           'Región': r.region
        })),
        columnTypes: { 'Monto Facturado': 'currency' }
      });
      toast.success('Excel exportado correctamente');
    } catch(e) {
      toast.error('Error exportando excel');
    }
  };

  const handleExportPDF = async () => {
    try {
      toast.info('Generando PDF...');
      await exportToPDF({
        reportName: 'Top Emisoras por Clientes',
        subtitle: (filtroMes && filtroAnio) ? `Filtro: Mes ${filtroMes} | Año ${filtroAnio}` : 'Período: Histórico Institucional',
        chartElement: chartRef.current,
        columns: ['Ranking', 'Emisora', 'Clientes', 'Pautas', 'Monto Facturado', 'Región'],
        rows: data.map((r, i) => ({
           Ranking: i + 1,
           Emisora: r.nombre,
           Clientes: r.clientes,
           Pautas: r.pautas,
           'Monto Facturado': r.monto,
           'Región': r.region
        })),
        columnTypes: { 'Monto Facturado': 'currency' }
      });
      toast.success('PDF exportado correctamente');
    } catch(e) {
      toast.error('Error exportando PDF');
    }
  };

  const formatearMoneda = (val) => {
    return new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Top Emisoras por Clientes</span>
      </nav>

      <header className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Top Emisoras por Cantidad de Clientes</h2>
          <p className="text-slate-500 text-sm mt-1">Ranking de emisoras según volumen de anunciantes activos e ingresos</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Selectores de Periodo */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
             <select 
               value={filtroMes} 
               onChange={(e) => handlePeriodoChange('mes', e.target.value)}
               className="text-sm border-none bg-transparent focus:ring-0 text-slate-700 py-1.5 pl-3 pr-8"
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
               className="text-sm border-none bg-transparent focus:ring-0 text-slate-700 py-1.5 pl-3 pr-8"
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

      {/* CHART */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Top 10 Emisoras (Volumen Clientes)</h3>
        {loading ? (
          <div className="w-full h-[420px] flex items-center justify-center">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary/30">autorenew</span>
          </div>
        ) : data.length === 0 ? (
          <div className="w-full h-[420px] flex items-center justify-center text-slate-400">
            No se encontraron pautas en el periodo seleccionado.
          </div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: 420 }}>
            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 70 }}>
                <defs>
                  <linearGradient id="clienteGradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#16B1B8" />
                    <stop offset="100%" stopColor="#8DC63F" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="nombre" tick={{ fontSize: 11, fill: '#1F2937', fontWeight: 600, angle: -40, textAnchor: 'end' }} axisLine={false} tickLine={false} interval={0} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }} formatter={(value, name, props) => [`${value} clientes (Total: ${formatearMoneda(props.payload.monto)})`, 'Clientes Distintos']} cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="clientes" fill="url(#clienteGradient)" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold font-display text-slate-900">Detalle Completo</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[50px]">#</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[200px]">Emisora</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center min-w-[100px]">Clientes</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center min-w-[100px]">Pautas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[150px]">Monto Generado</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[120px]">Región</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-400 text-sm">Cargando...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-400 text-sm">Sin datos para este periodo.</td></tr>
              ) : data.map((e, i) => (
                <tr key={e.nombre} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{i + 1}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{e.nombre}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 text-center">{e.clientes}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-center">{e.pautas}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{formatearMoneda(e.monto)}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase">{e.region}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
