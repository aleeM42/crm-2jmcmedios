// ==============================================
// ReporteIngresosMensuales.jsx — Total Ingresos por Pautas Mensual
// ==============================================
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import api from '../services/api';

const MESES_NOMBRES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const CURRENT_YEAR = new Date().getFullYear();
const FALLBACK_YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];

function fmt(num) {
  if (!num && num !== 0) return '—';
  return `$${Number(num).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function ReporteIngresosMensuales() {
  const [anio, setAnio] = useState(CURRENT_YEAR);
  const [aniosDisponibles, setAniosDisponibles] = useState(FALLBACK_YEARS);
  const [chartData, setChartData] = useState([]);
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api.get(`/reportes/ingresos-mensuales?anio=${anio}`)
      .then((res) => {
        if (cancelled) return;
        const { chartData: cd, kpi: k, aniosDisponibles: ad } = res.data;
        setChartData(cd || []);
        setKpi(k || null);
        if (ad && ad.length > 0) setAniosDisponibles(ad);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Error al cargar el reporte');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [anio]);

  // Derived table data from chartData
  const tableData = chartData.map((m, i) => {
    const prev = chartData[i - 1];
    const variacion = i === 0 || !prev || prev.monto === 0
      ? '—'
      : `${(((m.monto - prev.monto) / prev.monto) * 100).toFixed(1)}%`;
    const positivo = i === 0 || !prev ? true : m.monto >= prev.monto;
    return { ...m, variacion, positivo };
  });

  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Ingresos Mensuales</span>
      </nav>

      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">
            Total Ingresos por Pautas Mensual
          </h2>
          <p className="text-slate-500 text-sm mt-1">Seguimiento histórico de facturación mensual</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            id="filtro-anio"
            value={anio}
            onChange={(e) => setAnio(Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-2.5 px-3 focus:ring-primary focus:outline-none"
          >
            {aniosDisponibles.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-lg">table_view</span>Excel
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

      {/* Loading skeleton / KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Ingreso Acumulado */}
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Ingreso Acumulado Año</p>
            <h3 className="text-3xl font-bold text-slate-900">
              {loading ? <span className="animate-pulse text-slate-300">Cargando…</span> : fmt(kpi?.totalAcumulado)}
            </h3>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg">
            <span className="material-symbols-outlined text-primary">payments</span>
          </div>
        </div>

        {/* Promedio Mensual */}
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Promedio Mensual</p>
            <h3 className="text-3xl font-bold text-slate-900">
              {loading ? <span className="animate-pulse text-slate-300">Cargando…</span> : fmt(kpi?.promedioMensual)}
            </h3>
          </div>
          <div className="p-2 bg-accent-green/10 rounded-lg">
            <span className="material-symbols-outlined text-accent-green">trending_up</span>
          </div>
        </div>

        {/* Mes con mayor ingreso */}
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Mes con Mayor Ingreso</p>
            <h3 className="text-3xl font-bold text-slate-900">
              {loading ? <span className="animate-pulse text-slate-300">Cargando…</span> : (kpi?.mesPicoNombre || '—')}
            </h3>
            {!loading && kpi && (
              <p className="text-xs text-primary font-bold mt-1">{fmt(kpi.maxMes)}</p>
            )}
          </div>
          <div className="p-2 bg-secondary/10 rounded-lg">
            <span className="material-symbols-outlined text-secondary">star</span>
          </div>
        </div>
      </div>

      {/* BAR CHART */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">
          Evolución de Ingresos Mensuales — {anio}
        </h3>
        {loading ? (
          <div className="h-[280px] flex items-center justify-center text-slate-400 text-sm font-medium">
            <span className="animate-spin material-symbols-outlined mr-2">autorenew</span> Cargando datos…
          </div>
        ) : (
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#16B1B8" />
                    <stop offset="100%" stopColor="#8DC63F" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 700 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
                  formatter={(value) => [fmt(value), 'Ingreso']}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Bar dataKey="monto" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold font-display text-slate-900">Desglose Mensual</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Mes</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Variación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-sm text-slate-400 font-medium">
                    Cargando…
                  </td>
                </tr>
              ) : tableData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-sm text-slate-400 font-medium">
                    No hay datos para el año {anio}
                  </td>
                </tr>
              ) : (
                tableData.map((r) => (
                  <tr key={r.label} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.label}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{fmt(r.monto)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold ${r.positivo ? 'text-accent-green' : 'text-red-500'}`}>
                        {r.variacion}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-8 text-center">
        <p className="text-xs text-slate-400">© {CURRENT_YEAR} CRM 2JMC Medios - Reportes Financieros Generados Automáticamente</p>
      </footer>
    </>
  );
}
