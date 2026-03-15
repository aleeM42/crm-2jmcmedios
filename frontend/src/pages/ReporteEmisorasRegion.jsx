// ==============================================
// ReporteEmisorasRegion.jsx — Emisoras por Región
// ==============================================
import { Link } from 'react-router-dom';

const REGIONES = [
  { nombre: 'Capital', emisoras: 12, pautas: 145, monto: '$85,000', pct: 100 },
  { nombre: 'Central', emisoras: 9, pautas: 110, monto: '$62,000', pct: 73 },
  { nombre: 'Oriente', emisoras: 7, pautas: 78, monto: '$45,000', pct: 54 },
  { nombre: 'Occidente', emisoras: 6, pautas: 65, monto: '$38,000', pct: 45 },
  { nombre: 'Los Andes', emisoras: 5, pautas: 52, monto: '$29,000', pct: 34 },
  { nombre: 'Zulia', emisoras: 4, pautas: 40, monto: '$22,000', pct: 28 },
  { nombre: 'Los Llanos', emisoras: 3, pautas: 28, monto: '$15,000', pct: 20 },
];

export default function ReporteEmisorasRegion() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Emisoras por Región</span>
      </nav>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Emisoras por Región</h2>
          <p className="text-slate-500 text-sm mt-1">Distribución geográfica de emisoras aliadas y su actividad</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF</button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">table_view</span>Excel</button>
        </div>
      </header>

      {/* CHART */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Emisoras por Región</h3>
        <div className="flex items-end justify-between gap-3 px-4" style={{ height: '200px' }}>
          {REGIONES.map((r) => (
            <div key={r.nombre} className="flex flex-col items-center justify-end gap-2 group flex-1 h-full">
              <span className="text-[10px] font-bold text-slate-600">{r.emisoras}</span>
              <div className="w-10 bg-gradient-to-t from-primary to-secondary rounded-t-md group-hover:opacity-80 transition-opacity" style={{ height: `${r.pct * 1.6}px` }}></div>
              <span className="text-[10px] font-bold text-slate-400">{r.nombre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-lg font-bold font-display text-slate-900">Detalle Regional</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Región</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Emisoras</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pautas</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto Total</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {REGIONES.map((r) => (
                <tr key={r.nombre} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4"><span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase">{r.nombre}</span></td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{r.emisoras}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{r.pautas}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{r.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
