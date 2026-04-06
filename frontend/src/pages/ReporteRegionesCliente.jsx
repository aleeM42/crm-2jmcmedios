// ==============================================
// ReporteRegionesCliente.jsx — Clientes por Región
// ==============================================
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import api from '../services/api';

const COLORS = ['#16B1B8', '#8DC63F', '#55CCD3', '#A1DEE5', '#d1d5db'];

export default function ReporteRegionesCliente() {
  const [chartDataRaw, setChartDataRaw] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get('/reportes/regiones-cliente');
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

  const chartData = useMemo(() => {
    // Sort descending by value
    const sorted = [...chartDataRaw].sort((a, b) => Number(b.value) - Number(a.value));
    const total = sorted.reduce((acc, curr) => acc + Number(curr.value || 0), 0);
    return sorted.map(item => ({
      ...item,
      pct: total > 0 ? Math.round((Number(item.value) / total) * 100) : 0,
      clientes: Number(item.value)
    }));
  }, [chartDataRaw]);

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
        <span className="text-slate-900 font-semibold">Clientes por Región</span>
      </nav>

      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Distribución Geográfica de Clientes</h2>
          <p className="text-slate-500 text-sm mt-1">Análisis de la presencia de clientes en el territorio nacional por región</p>
        </div>
      </header>

      {/* CHART */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary">public</span>
          <h3 className="text-lg font-bold font-display text-slate-900">Concentración de Clientes</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">Totales por región geográfica principal</p>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#1F2937', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
                formatter={(value) => [`${value} clientes`, 'Cantidad']}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="clientes" radius={[0, 6, 6, 0]} barSize={32}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">table_rows</span>
          <h3 className="text-lg font-bold font-display text-slate-900">Detalle de Clientes por Región</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Región</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Estado (Prov.)</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">RIF Fiscal</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sector</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {listData.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{r.region || 'Sin asignar'}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">{r.estado_lugar || '—'}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.nombre}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{r.rif_fiscal}</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-200 text-slate-700 uppercase">{r.sector || 'N/A'}</span></td>
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
