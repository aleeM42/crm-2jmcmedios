// ==============================================
// ReporteTopEmisorasClientes.jsx — Top Emisoras por Clientes
// ==============================================
import { Link } from 'react-router-dom';

const EMISORAS = [
  { nombre: 'Éxitos FM 99.9', clientes: 18, pautas: 42, monto: '$28,500', region: 'Capital', pct: 100 },
  { nombre: 'Unión Radio 92.1', clientes: 15, pautas: 35, monto: '$22,400', region: 'Capital', pct: 83 },
  { nombre: 'RCN Radio 93.9', clientes: 14, pautas: 30, monto: '$17,200', region: 'Central', pct: 78 },
  { nombre: 'Caracol Radio 100.5', clientes: 12, pautas: 28, monto: '$19,800', region: 'Capital', pct: 67 },
  { nombre: 'La Mega 107.3', clientes: 10, pautas: 22, monto: '$14,600', region: 'Central', pct: 56 },
  { nombre: 'Radio Tiempo 95.1', clientes: 9, pautas: 18, monto: '$13,100', region: 'Oriente', pct: 50 },
  { nombre: 'Onda La Superestación', clientes: 8, pautas: 15, monto: '$11,500', region: 'Capital', pct: 44 },
  { nombre: 'Planeta FM 104.7', clientes: 7, pautas: 12, monto: '$9,800', region: 'Occidente', pct: 39 },
  { nombre: 'Hot 94 FM', clientes: 6, pautas: 10, monto: '$8,200', region: 'Los Andes', pct: 33 },
  { nombre: 'Rumbera Network', clientes: 5, pautas: 8, monto: '$6,900', region: 'Zulia', pct: 28 },
];

export default function ReporteTopEmisorasClientes() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Top Emisoras por Clientes</span>
      </nav>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Top Emisoras por Cantidad de Clientes</h2>
          <p className="text-slate-500 text-sm mt-1">Ranking de emisoras según número de anunciantes activos</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF</button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">table_view</span>Excel</button>
        </div>
      </header>

      {/* CHART */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Top 10 Emisoras</h3>
        <div className="space-y-4">
          {EMISORAS.map((e, i) => (
            <div key={e.nombre} className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 w-6 text-right">{i + 1}</span>
              <span className="text-sm font-semibold text-slate-900 w-48 truncate">{e.nombre}</span>
              <div className="flex-1 h-8 bg-slate-50 rounded-lg overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent-green rounded-lg flex items-center justify-end pr-3" style={{ width: `${e.pct}%` }}>
                  <span className="text-[10px] font-bold text-white">{e.clientes} clientes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-lg font-bold font-display text-slate-900">Detalle Completo</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">#</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Emisora</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Clientes</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pautas</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Región</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {EMISORAS.map((e, i) => (
                <tr key={e.nombre} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{i + 1}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{e.nombre}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{e.clientes}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{e.pautas}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{e.monto}</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase">{e.region}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
