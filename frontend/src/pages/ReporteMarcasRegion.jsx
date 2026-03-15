// ==============================================
// ReporteMarcasRegion.jsx — Marcas por Región
// ==============================================
import { Link } from 'react-router-dom';

const REGIONES = ['Capital', 'Central', 'Oriente', 'Occidente', 'Los Andes'];
const MARCAS = [
  { nombre: 'Harina PAN', Capital: 12, Central: 8, Oriente: 5, Occidente: 3, 'Los Andes': 2, total: 30 },
  { nombre: 'Coca-Cola', Capital: 10, Central: 9, Oriente: 6, Occidente: 4, 'Los Andes': 3, total: 32 },
  { nombre: 'Movistar Plus', Capital: 8, Central: 6, Oriente: 4, Occidente: 3, 'Los Andes': 2, total: 23 },
  { nombre: 'Tarjeta Mercantil', Capital: 7, Central: 5, Oriente: 3, Occidente: 2, 'Los Andes': 1, total: 18 },
  { nombre: 'Nestlé Purina', Capital: 6, Central: 4, Oriente: 4, Occidente: 2, 'Los Andes': 2, total: 18 },
  { nombre: 'Digitel 4G', Capital: 5, Central: 5, Oriente: 3, Occidente: 3, 'Los Andes': 2, total: 18 },
  { nombre: 'Toyota Hilux', Capital: 4, Central: 3, Oriente: 2, Occidente: 2, 'Los Andes': 1, total: 12 },
  { nombre: 'Farmatodo Express', Capital: 6, Central: 4, Oriente: 3, Occidente: 1, 'Los Andes': 1, total: 15 },
];

const MAX = 32;

export default function ReporteMarcasRegion() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Marcas por Región</span>
      </nav>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Marcas por Región</h2>
          <p className="text-slate-500 text-sm mt-1">Presencia de marcas publicitarias en cada zona geográfica</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF</button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">table_view</span>Excel</button>
        </div>
      </header>

      {/* CHART */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Pautas por Marca (Total)</h3>
        <div className="space-y-4">
          {MARCAS.map((m, i) => (
            <div key={m.nombre} className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 w-6 text-right">{i + 1}</span>
              <span className="text-sm font-semibold text-slate-900 w-40 truncate">{m.nombre}</span>
              <div className="flex-1 h-8 bg-slate-50 rounded-lg overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-end pr-3" style={{ width: `${(m.total / MAX) * 100}%` }}>
                  <span className="text-[10px] font-bold text-white">{m.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-lg font-bold font-display text-slate-900">Desglose por Región</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Marca</th>
              {REGIONES.map(r => <th key={r} className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{r}</th>)}
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {MARCAS.map((m) => (
                <tr key={m.nombre} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{m.nombre}</td>
                  {REGIONES.map(r => <td key={r} className="px-4 py-4 text-sm text-slate-600 text-center">{m[r]}</td>)}
                  <td className="px-6 py-4 text-sm font-bold text-primary">{m.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
