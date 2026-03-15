// ==============================================
// ReporteEfectividadVendedores.jsx — Ranking de Vendedores por Efectividad
// ==============================================
import { Link } from 'react-router-dom';

const VENDEDORES = [
  { nombre: 'Carlos Jaramillo', visitas: 48, efectivas: 42, pct: 87.5, meta: '$45,000', cumplido: '$42,300' },
  { nombre: 'Marta Lucía Rodríguez', visitas: 52, efectivas: 44, pct: 84.6, meta: '$40,000', cumplido: '$38,500' },
  { nombre: 'Andrés F. Rojas', visitas: 38, efectivas: 30, pct: 78.9, meta: '$35,000', cumplido: '$31,200' },
  { nombre: 'Sandra Gómez', visitas: 44, efectivas: 33, pct: 75.0, meta: '$38,000', cumplido: '$28,900' },
];

const MAX_PCT = 87.5;

export default function ReporteEfectividadVendedores() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Efectividad Vendedores</span>
      </nav>

      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Ranking de Vendedores por Efectividad</h2>
          <p className="text-slate-500 text-sm mt-1">Comparativa de cierre de ventas y cumplimiento de objetivos</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-lg">table_view</span>Excel
          </button>
        </div>
      </header>

      {/* CHART */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Efectividad de Visitas (%)</h3>
        <div className="space-y-5">
          {VENDEDORES.map((v, i) => (
            <div key={v.nombre} className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 w-6 text-right">{i + 1}</span>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-xs">{v.nombre.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 w-44 truncate">{v.nombre}</span>
              <div className="flex-1 h-8 bg-slate-50 rounded-lg overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent-green rounded-lg flex items-center justify-end pr-3 transition-all" style={{ width: `${(v.pct / MAX_PCT) * 100}%` }}>
                  <span className="text-[10px] font-bold text-white">{v.pct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold font-display text-slate-900">Listado Completo</h3>
          <p className="text-xs text-slate-400 mt-1">Mostrando {VENDEDORES.length} de 12 vendedores</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">#</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Vendedor</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Visitas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Efectivas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Efectividad</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Meta</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cumplido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {VENDEDORES.map((v, i) => (
                <tr key={v.nombre} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{i + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-xs">{v.nombre.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{v.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{v.visitas}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{v.efectivas}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-green rounded-full" style={{ width: `${v.pct}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-accent-green">{v.pct}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{v.meta}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{v.cumplido}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
