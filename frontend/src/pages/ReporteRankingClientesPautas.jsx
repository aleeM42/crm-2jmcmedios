// ==============================================
// ReporteRankingClientesPautas.jsx — Ranking de Clientes por Pautas Contratadas
// ==============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api from '../services/api';

const COLORS = ['#16B1B8', '#8DC63F', '#A1DEE5', '#1F2937', '#6B7280'];

export default function ReporteRankingClientesPautas() {
  const [chartData, setChartData] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get('/reportes/ranking-clientes-pautas');
        if (response.success) {
          setChartData(response.data.chartData || []);
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

  if (loading) {
    return <div className="p-10 text-center text-slate-500 font-medium">Cargando reporte...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500 font-medium">{error}</div>;
  }

  // Helper formatting if necessary (e.g., currency)
  const formatCurrency = (val) => val ? `$${Number(val).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '$0.00';

  return (
    <>
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Ranking Clientes por Pautas</span>
      </nav>

      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Ranking de Clientes por Pautas Contratadas</h2>
          <p className="text-slate-500 text-sm mt-1">Visualización de clientes con mayor volumen de pautas publicitarias</p>
        </div>
      </header>

      {/* TOP CHART */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Top 5 Clientes en Inversión</h3>
        <div style={{ width: '100%', height: 420 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#1F2937', fontWeight: 600, angle: -35, textAnchor: 'end' }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
                formatter={(value, name) => [name === 'monto' ? formatCurrency(value) : value, name === 'monto' ? 'Inversión' : name]}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="monto" radius={[6, 6, 0, 0]} barSize={40}>
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
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold font-display text-slate-900">Listado Completo de Pautas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">#</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">RIF</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tot. Pautas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Inversión Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {listData.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{i + 1}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.nombre}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{r.rif_fiscal}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{r.total_pautas || 0}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{formatCurrency(r.monto_total)}</td>
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
