// ==============================================
// ReporteEmisorasActivasRegion.jsx — Emisoras Activas por Región
// ==============================================
import { Link } from 'react-router-dom';

const REGIONES = [
  { nombre: 'Capital', activas: 10, inactivas: 2, total: 12, pct: 83 },
  { nombre: 'Central', activas: 7, inactivas: 2, total: 9, pct: 78 },
  { nombre: 'Oriente', activas: 5, inactivas: 2, total: 7, pct: 71 },
  { nombre: 'Occidente', activas: 5, inactivas: 1, total: 6, pct: 83 },
  { nombre: 'Los Andes', activas: 3, inactivas: 2, total: 5, pct: 60 },
  { nombre: 'Zulia', activas: 3, inactivas: 1, total: 4, pct: 75 },
  { nombre: 'Los Llanos', activas: 2, inactivas: 1, total: 3, pct: 67 },
];

const MAX_TOTAL = 12;

export default function ReporteEmisorasActivasRegion() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Emisoras Activas por Región</span>
      </nav>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Emisoras Activas por Región</h2>
          <p className="text-slate-500 text-sm mt-1">Estado operativo de emisoras aliadas por zona geográfica</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF</button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">table_view</span>Excel</button>
        </div>
      </header>

      {/* STACKED BAR CHART */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-2">Activas vs. Inactivas</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary"></div><span className="text-xs text-slate-500">Activas</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-200"></div><span className="text-xs text-slate-500">Inactivas</span></div>
        </div>
        <div className="space-y-4">
          {REGIONES.map((r) => (
            <div key={r.nombre} className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-900 w-28 truncate">{r.nombre}</span>
              <div className="flex-1 h-8 bg-slate-50 rounded-lg overflow-hidden flex">
                <div className="h-full bg-primary rounded-l-lg flex items-center justify-center" style={{ width: `${(r.activas / MAX_TOTAL) * 100}%` }}>
                  <span className="text-[10px] font-bold text-white">{r.activas}</span>
                </div>
                <div className="h-full bg-slate-200 flex items-center justify-center" style={{ width: `${(r.inactivas / MAX_TOTAL) * 100}%` }}>
                  <span className="text-[10px] font-bold text-slate-500">{r.inactivas}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-accent-green w-10 text-right">{r.pct}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-lg font-bold font-display text-slate-900">Detalle por Región</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Región</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Activas</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Inactivas</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">% Activas</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {REGIONES.map((r) => (
                <tr key={r.nombre} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4"><span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase">{r.nombre}</span></td>
                  <td className="px-6 py-4 text-sm font-bold text-accent-green">{r.activas}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{r.inactivas}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{r.total}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-accent-green rounded-full" style={{ width: `${r.pct}%` }}></div></div>
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
