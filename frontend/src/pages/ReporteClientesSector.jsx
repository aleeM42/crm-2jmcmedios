// ==============================================
// ReporteClientesSector.jsx — Clientes por Sector
// ==============================================
import { Link } from 'react-router-dom';

const SECTORES = [
  { nombre: 'Alimentación', clientes: 158, pct: 35, color: '#16B1B8', offset: 0 },
  { nombre: 'Salud', clientes: 99, pct: 22, color: '#8DC63F', offset: 35 },
  { nombre: 'Telemática', clientes: 81, pct: 18, color: '#55CCD3', offset: 57 },
  { nombre: 'Bancario', clientes: 68, pct: 15, color: '#A1DEE5', offset: 75 },
  { nombre: 'Fabricación', clientes: 45, pct: 10, color: '#d1d5db', offset: 90 },
];

const TABLE_DATA = [
  { nombre: 'Alimentos Polar', sector: 'Alimentación', pautas: 24, monto: '$48,000', estado: 'Activo' },
  { nombre: 'Farmatodo', sector: 'Salud', pautas: 19, monto: '$38,500', estado: 'Activo' },
  { nombre: 'Digitel', sector: 'Telemática', pautas: 8, monto: '$16,000', estado: 'Activo' },
  { nombre: 'Banco Mercantil', sector: 'Bancario', pautas: 16, monto: '$32,000', estado: 'Activo' },
  { nombre: 'Cervecería Regional', sector: 'Fabricación', pautas: 6, monto: '$12,000', estado: 'Activo' },
  { nombre: 'Nestlé', sector: 'Alimentación', pautas: 11, monto: '$22,000', estado: 'Activo' },
  { nombre: 'Procter & Gamble', sector: 'Manufactura', pautas: 14, monto: '$28,000', estado: 'Activo' },
  { nombre: 'Movistar', sector: 'Telemática', pautas: 9, monto: '$18,000', estado: 'Activo' },
];

export default function ReporteClientesSector() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Clientes por Sector</span>
      </nav>

      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Clientes por Sector</h2>
          <p className="text-slate-500 text-sm mt-1">Distribución de cartera de clientes según industria y sector comercial</p>
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

      {/* DONUT + LEGEND */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-2">Distribución de Mercado</h3>
        <p className="text-xs text-slate-400 mb-6">Representación visual por sectores comerciales</p>
        <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
          <div className="relative w-56 h-56">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#f1f5f9" strokeWidth="3"></circle>
              {SECTORES.map((s) => (
                <circle key={s.nombre} cx="18" cy="18" fill="transparent" r="15.915" stroke={s.color} strokeDasharray={`${s.pct} ${100 - s.pct}`} strokeDashoffset={`-${s.offset}`} strokeWidth="3.5"></circle>
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-900">451</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Clientes</span>
            </div>
          </div>
          <div className="space-y-4">
            {SECTORES.map((s) => (
              <div key={s.nombre} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }}></div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{s.nombre}</p>
                  <p className="text-xs text-slate-500">{s.pct}% ({s.clientes} clientes)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold font-display text-slate-900">Listado por Sector</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sector</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pautas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {TABLE_DATA.map((r) => (
                <tr key={r.nombre} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.nombre}</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">{r.sector}</span></td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{r.pautas}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{r.monto}</td>
                  <td className="px-6 py-4"><span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent-green/10 text-accent-green uppercase"><span className="w-1.5 h-1.5 rounded-full bg-accent-green"></span>{r.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/30 flex justify-between items-center border-t border-slate-100">
          <p className="text-xs text-slate-500">Mostrando <span className="font-bold">1-8</span> de <span className="font-bold">451</span> clientes</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition-colors"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 font-medium text-xs">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition-colors"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
          </div>
        </div>
      </section>
    </>
  );
}
