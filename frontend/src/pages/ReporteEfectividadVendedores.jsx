// ==============================================
// ReporteEfectividadVendedores.jsx — Ranking de Vendedores por Efectividad
// ==============================================
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { reporteService } from '../services/reporte.service';
import { exportToExcel, exportToPDF } from '../services/ExportService';
import { toast } from 'sonner';

const CHART_COLORS = { efectivas: '#16B1B8', noEfectivas: '#e2e8f0' };

const MESES = [
  { id: 1, name: 'Enero' }, { id: 2, name: 'Febrero' }, { id: 3, name: 'Marzo' },
  { id: 4, name: 'Abril' }, { id: 5, name: 'Mayo' }, { id: 6, name: 'Junio' },
  { id: 7, name: 'Julio' }, { id: 8, name: 'Agosto' }, { id: 9, name: 'Septiembre' },
  { id: 10, name: 'Octubre' }, { id: 11, name: 'Noviembre' }, { id: 12, name: 'Diciembre' },
];

export default function ReporteEfectividadVendedores() {
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
      const res = await reporteService.getReporte('efectividad-vendedores', params);
      
      setData(res.listData || []);
      
      if (aniosDisp.length === 0 && res.aniosDisponibles) {
        setAniosDisp(res.aniosDisponibles);
      }
    } catch (error) {
      toast.error('Error al cargar reporte de efectividad');
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
    try {
      toast.info('Generando Excel...');
      await exportToExcel({
        reportName: 'Efectividad de Vendedores',
        columns: ['Vendedor', 'Visitas', 'Efectivas', 'Efectividad (%)', 'Meta', 'Cumplido'],
        rows: data.map(v => ({
           Vendedor: v.nombre,
           Visitas: v.visitas,
           Efectivas: v.efectivas,
           'Efectividad (%)': v.pct,
           Meta: v.meta,
           Cumplido: v.cumplido
        })),
        columnTypes: { Meta: 'currency', Cumplido: 'currency', 'Efectividad (%)': 'number' }
      });
      toast.success('Excel descargado con éxito');
    } catch (e) {
      console.error(e);
      toast.error('Error al exportar Excel');
    }
  };

  const handleExportPDF = async () => {
    try {
      toast.info('Capturando elementos y generando PDF, esto puede tomar unos segundos...');
      await exportToPDF({
        reportName: 'Efectividad de Vendedores',
        subtitle: (filtroMes && filtroAnio) ? `Filtro: Mes ${filtroMes} | Año ${filtroAnio}` : 'Período: Histórico Global',
        chartElement: chartRef.current,
        columns: ['Vendedor', 'Visitas', 'Efectivas', 'Efect%', 'Meta ($)', 'Cumplido ($)'],
        rows: data.map(v => ({
           Vendedor: v.nombre,
           Visitas: v.visitas,
           Efectivas: v.efectivas,
           'Efect%': `${v.pct}%`,
           'Meta ($)': v.meta,
           'Cumplido ($)': v.cumplido
        })),
        columnTypes: { 'Meta ($)': 'currency', 'Cumplido ($)': 'currency' }
      });
      toast.success('PDF descargado con éxito');
    } catch (e) {
      console.error(e);
      toast.error('Error al exportar PDF');
    }
  };

  const handlePeriodoChange = (tipo, valor) => {
    if (tipo === 'mes') {
      setFiltroMes(valor);
      // Si eligen mes pero no tienen año, ponemos el primer año por defecto para que la base de datos lo filtre
      if (valor !== '' && filtroAnio === '' && aniosDisp.length > 0) {
        setFiltroAnio(aniosDisp[0]);
      }
    } else {
      setFiltroAnio(valor);
      // Si eligen historico completo (anio=''; mes tampoco tiene logica)
      if (valor === '') setFiltroMes('');
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
        <span className="text-slate-900 font-semibold">Efectividad Vendedores</span>
      </nav>

      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Ranking de Vendedores</h2>
          <p className="text-slate-500 text-sm mt-1">Comparativa de cierre de ventas y cumplimiento de metas operativas</p>
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
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Efectividad de Visitas (%)</h3>
        {loading ? (
           <div className="w-full h-[280px] flex items-center justify-center">
             <span className="material-symbols-outlined animate-spin text-4xl text-primary/30">autorenew</span>
           </div>
        ) : data.length === 0 ? (
           <div className="w-full h-[280px] flex items-center justify-center text-slate-400">
             No hay datos para el período seleccionado.
           </div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: 280 }} className="bg-white">
            <ResponsiveContainer>
              <BarChart data={data.map((v) => ({ ...v, noEfectivasPct: parseFloat((100 - v.pct).toFixed(1)) }))} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="nombre" type="category" width={140} tick={{ fontSize: 12, fill: '#1F2937', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }} 
                  cursor={{ fill: '#f8fafc' }} 
                  formatter={(value, name) => [`${value}%`, name === 'pct' ? 'Efectivas' : 'No Efectivas']} 
                />
                <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 700 }} payload={[ { value: 'Visitas Efectivas', type: 'rect', color: CHART_COLORS.efectivas }, { value: 'Visitas Fallidas', type: 'rect', color: CHART_COLORS.noEfectivas }]}/>
                <Bar dataKey="pct" stackId="a" fill={CHART_COLORS.efectivas} radius={[0, 0, 0, 0]} barSize={22} />
                <Bar dataKey="noEfectivasPct" stackId="a" fill={CHART_COLORS.noEfectivas} radius={[0, 6, 6, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900">Listado Completo</h3>
            <p className="text-xs text-slate-400 mt-1">Mostrando {data.length} registros</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[50px]">#</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[180px]">Vendedor</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center min-w-[100px]">Visitas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center min-w-[100px]">Efectivas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[150px]">Efectividad</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[120px]">Monto OC (Logrado)</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[120px]">Meta (Mensual)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                   <td colSpan="7" className="px-6 py-12 text-center text-slate-400 text-sm">
                     Cargando datos...
                   </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                   <td colSpan="7" className="px-6 py-12 text-center text-slate-400 text-sm">
                     No se encontraron registros para esta búsqueda.
                   </td>
                </tr>
              ) : (
                data.map((v, i) => (
                  <tr key={v.usuario_id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-primary">{i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-xs">{v.nombre.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{v.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 text-center">{v.visitas}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 text-center">{v.efectivas}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-accent-green rounded-full" style={{ width: `${v.pct}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-accent-green">{v.pct}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{formatearMoneda(v.cumplido)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{formatearMoneda(v.meta)}</td>
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
