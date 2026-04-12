// ==============================================
// ReporteEmisorasActivasRegion.jsx — Emisoras Activas por Región
// ==============================================
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { reporteService } from '../services/reporte.service';
import { exportToExcel, exportToPDF } from '../services/ExportService';
import { toast } from 'sonner';

export default function ReporteEmisorasActivasRegion() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const chartRef = useRef(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const res = await reporteService.getReporte('emisoras-activas-region');
      setData(res.listData || []);
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar reporte');
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
    try {
      toast.info('Generando Excel...');
      await exportToExcel({
        reportName: 'Emisoras por Región',
        columns: ['Región', 'Activas', 'Inactivas', 'Total', '% Activas'],
        rows: data.map(r => ({
           'Región': r.nombre,
           Activas: r.activas,
           Inactivas: r.inactivas,
           Total: r.total,
           '% Activas': r.pct
        })),
        columnTypes: { '% Activas': 'number' }
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
        reportName: 'Estado de Emisoras por Región',
        subtitle: 'Proporción de Emisoras Activas vs Inactivas a Nivel Nacional',
        chartElement: chartRef.current,
        columns: ['Región', 'Activas', 'Inactivas', 'Total', '% Activas'],
        rows: data.map(r => ({
           'Región': r.nombre,
           Activas: r.activas,
           Inactivas: r.inactivas,
           Total: r.total,
           '% Activas': `${r.pct}%`
        })),
      });
      toast.success('PDF descargado con éxito');
    } catch (e) {
      toast.error('Error al exportar PDF');
    }
  };

  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Emisoras Activas por Región</span>
      </nav>

      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Emisoras Activas por Región</h2>
          <p className="text-slate-500 text-sm mt-1">Estado operativo de emisoras aliadas por zona geográfica</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF
          </button>
          <button onClick={handleExportExcel} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-lg">table_view</span>Excel
          </button>
        </div>
      </header>

      {/* STACKED BAR CHART */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Proporción Activas vs. Inactivas</h3>
        {loading ? (
          <div className="w-full h-[320px] flex items-center justify-center">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary/30">autorenew</span>
          </div>
        ) : data.length === 0 ? (
          <div className="w-full h-[320px] flex items-center justify-center text-slate-400">
            No hay regiones registradas en el directorio.
          </div>
        ) : (
          <div ref={chartRef} style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="nombre" tick={{ fontSize: 12, fill: '#1F2937', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }} cursor={{ fill: '#f8fafc' }} />
                <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 700 }} />
                <Bar dataKey="activas" name="Activas" stackId="a" fill="#16B1B8" radius={[0, 0, 0, 0]} barSize={32} />
                <Bar dataKey="inactivas" name="Inactivas (o Cerradas)" stackId="a" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold font-display text-slate-900">Detalle por Región</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[150px]">Región</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center min-w-[100px]">Activas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center min-w-[100px]">Inactivas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center min-w-[100px]">Total</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[150px]">Tasa de Operatividad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                   <td colSpan="5" className="px-6 py-12 text-center text-slate-400 text-sm">Cargando...</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                   <td colSpan="5" className="px-6 py-12 text-center text-slate-400 text-sm">No existen datos.</td>
                </tr>
              ) : data.map((r) => (
                <tr key={r.nombre} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase">{r.nombre}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-accent-green text-center">{r.activas}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 text-center">{r.inactivas}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 text-center">{r.total}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-green rounded-full" style={{ width: `${r.pct}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-accent-green">{r.pct}%</span>
                    </div>
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
