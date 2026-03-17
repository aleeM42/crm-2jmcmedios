// ==============================================
// ReporteGastosVendedores.jsx — Ranking de Vendedores por Gastos
// ==============================================
import { Link } from 'react-router-dom';

const VENDEDORES = [
  { nombre: 'Carlos Jaramillo', gasto: '$8,200', viajes: 12, pct: 100 },
  { nombre: 'Marta Lucía R.', gasto: '$6,800', viajes: 10, pct: 83 },
  { nombre: 'Sandra Gómez', gasto: '$5,400', viajes: 8, pct: 66 },
  { nombre: 'Andrés F. Rojas', gasto: '$4,100', viajes: 7, pct: 50 },
];

export default function ReporteGastosVendedores() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Gastos Vendedores</span>
      </nav>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Ranking de Vendedores por Gastos</h2>
          <p className="text-slate-500 text-sm mt-1">Control de gastos operativos asociados a la gestión comercial</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF</button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">table_view</span>Excel</button>
        </div>
      </header>
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Gastos Totales por Vendedor</h3>
        <div className="space-y-4">
          {VENDEDORES.map((v, i) => (
            <div key={v.nombre} className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 w-6 text-right">{i + 1}</span>
              <span className="text-sm font-semibold text-slate-900 w-40 truncate">{v.nombre}</span>
              <div className="flex-1 h-8 bg-slate-50 rounded-lg overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-end pr-3" style={{ width: `${v.pct}%` }}>
                  <span className="text-[10px] font-bold text-white">{v.gasto}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-lg font-bold font-display text-slate-900">Detalle de Gastos por Vendedor</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">#</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Vendedor</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Gasto Total</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Viajes</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {VENDEDORES.map((v, i) => (
                <tr key={v.nombre} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{i + 1}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{v.nombre}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{v.gasto}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{v.viajes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
