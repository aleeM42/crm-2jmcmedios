// ==============================================
// ReporteIngresosMensuales.jsx — Total Ingresos por Pautas Mensual
// ==============================================
import { Link } from 'react-router-dom';

const MESES = [
  { label: 'ENE', monto: 95000, h: 80 },
  { label: 'FEB', monto: 110000, h: 92 },
  { label: 'MAR', monto: 189000, h: 158 },
  { label: 'ABR', monto: 145000, h: 121 },
  { label: 'MAY', monto: 160000, h: 134 },
  { label: 'JUN', monto: 135000, h: 113 },
  { label: 'JUL', monto: 128000, h: 107 },
  { label: 'AGO', monto: 142000, h: 119 },
  { label: 'SEP', monto: 155000, h: 130 },
  { label: 'OCT', monto: 138000, h: 116 },
  { label: 'NOV', monto: 125000, h: 105 },
  { label: 'DIC', monto: 128000, h: 107 },
];

const TABLE_DATA = MESES.map((m, i) => ({
  ...m,
  pos: i + 1,
  montoFmt: `$${m.monto.toLocaleString()}`,
  variacion: i === 0 ? '—' : `${(((m.monto - MESES[i - 1].monto) / MESES[i - 1].monto) * 100).toFixed(1)}%`,
  positivo: i === 0 ? true : m.monto >= MESES[i - 1].monto,
}));

export default function ReporteIngresosMensuales() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Ingresos Mensuales</span>
      </nav>

      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Total Ingresos por Pautas Mensual</h2>
          <p className="text-slate-500 text-sm mt-1">Seguimiento histórico de facturación y proyecciones mensuales</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-slate-50 border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-2.5 focus:ring-primary">
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-lg">table_view</span>Excel
          </button>
        </div>
      </header>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Ingreso Acumulado Año</p>
            <h3 className="text-3xl font-bold text-slate-900">$1,450,000</h3>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg"><span className="material-symbols-outlined text-primary">payments</span></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Promedio Mensual</p>
            <h3 className="text-3xl font-bold text-slate-900">$120,833</h3>
          </div>
          <div className="p-2 bg-accent-green/10 rounded-lg"><span className="material-symbols-outlined text-accent-green">trending_up</span></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Mes con Mayor Ingreso</p>
            <h3 className="text-3xl font-bold text-slate-900">Marzo</h3>
            <p className="text-xs text-primary font-bold mt-1">$189,000</p>
          </div>
          <div className="p-2 bg-secondary/10 rounded-lg"><span className="material-symbols-outlined text-secondary">star</span></div>
        </div>
      </div>

      {/* BAR CHART */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Evolución de Ingresos Mensuales</h3>
        <div className="flex items-end justify-between gap-2 px-4" style={{ height: '200px' }}>
          {MESES.map(({ h, label }) => (
            <div key={label} className="flex flex-col items-center justify-end gap-2 group flex-1 h-full">
              <div className="w-8 bg-gradient-to-t from-primary to-secondary rounded-t-md group-hover:opacity-80 transition-opacity" style={{ height: `${h}px` }}></div>
              <span className="text-[10px] font-bold text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
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
              {TABLE_DATA.map((r) => (
                <tr key={r.label} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.label}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{r.montoFmt}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold ${r.positivo ? 'text-accent-green' : 'text-red-500'}`}>{r.variacion}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-8 text-center">
        <p className="text-xs text-slate-400">© 2026 CRM 2JMC Medios - Reportes Financieros Generados Automáticamente</p>
      </footer>
    </>
  );
}
