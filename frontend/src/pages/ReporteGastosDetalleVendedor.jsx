// ==============================================
// ReporteGastosDetalleVendedor.jsx — Lista de Gastos por Vendedor
// ==============================================
import { Link } from 'react-router-dom';

const CATEGORÍAS = [
  { nombre: 'Viáticos', pct: 38, color: '#16B1B8', offset: 0 },
  { nombre: 'Transporte', pct: 32, color: '#8DC63F', offset: 38 },
  { nombre: 'Marketing', pct: 22, color: '#55CCD3', offset: 70 },
  { nombre: 'Otros', pct: 8, color: '#A1DEE5', offset: 92 },
];

const TABLE_DATA = [
  { fecha: '2026-03-01', vendedor: 'Carlos Jaramillo', concepto: 'Hospedaje Maracaibo', categoria: 'Viáticos', monto: '$350', cliente: 'Alimentos Polar' },
  { fecha: '2026-03-03', vendedor: 'Marta Lucía R.', concepto: 'Taxi aeropuerto', categoria: 'Transporte', monto: '$85', cliente: 'Farmatodo' },
  { fecha: '2026-03-05', vendedor: 'Andrés F. Rojas', concepto: 'Almuerzo cliente', categoria: 'Viáticos', monto: '$120', cliente: 'Banco Mercantil' },
  { fecha: '2026-03-07', vendedor: 'Sandra Gómez', concepto: 'Material POP', categoria: 'Marketing', monto: '$450', cliente: 'Coca-Cola' },
  { fecha: '2026-03-09', vendedor: 'Carlos Jaramillo', concepto: 'Gasolina', categoria: 'Transporte', monto: '$90', cliente: 'Nestlé' },
  { fecha: '2026-03-11', vendedor: 'Marta Lucía R.', concepto: 'Evento lanzamiento', categoria: 'Marketing', monto: '$800', cliente: 'P&G' },
  { fecha: '2026-03-13', vendedor: 'Sandra Gómez', concepto: 'Peaje autopista', categoria: 'Transporte', monto: '$45', cliente: 'Digitel' },
  { fecha: '2026-03-14', vendedor: 'Andrés F. Rojas', concepto: 'Cena negocios', categoria: 'Viáticos', monto: '$210', cliente: 'Toyota' },
];

export default function ReporteGastosDetalleVendedor() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Gastos por Vendedor</span>
      </nav>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Lista de Gastos por Vendedor</h2>
          <p className="text-slate-500 text-sm mt-1">Listado detallado de viáticos y recursos asignados por ejecutivo</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF</button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">table_view</span>Excel</button>
        </div>
      </header>

      {/* DONUT */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Distribución por Categoría</h3>
        <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#f1f5f9" strokeWidth="3"></circle>
              {CATEGORÍAS.map((c) => (
                <circle key={c.nombre} cx="18" cy="18" fill="transparent" r="15.915" stroke={c.color} strokeDasharray={`${c.pct} ${100 - c.pct}`} strokeDashoffset={`-${c.offset}`} strokeWidth="3.5"></circle>
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-900">100%</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Categorías</span>
            </div>
          </div>
          <div className="space-y-3">
            {CATEGORÍAS.map((c) => (
              <div key={c.nombre} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }}></div>
                <div><p className="text-sm font-semibold text-slate-900">{c.nombre}</p><p className="text-xs text-slate-500">{c.pct}%</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-lg font-bold font-display text-slate-900">Desglose de Gastos</h3><p className="text-xs text-slate-400 mt-1">Mostrando 1 a 10 de 45 registros</p></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Vendedor</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Concepto</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Categoría</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {TABLE_DATA.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600">{r.fecha}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.vendedor}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{r.concepto}</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">{r.categoria}</span></td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{r.monto}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{r.cliente}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/30 flex justify-between items-center border-t border-slate-100">
          <p className="text-xs text-slate-500">Mostrando <span className="font-bold">1-8</span> de <span className="font-bold">45</span></p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 font-medium text-xs">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
          </div>
        </div>
      </section>
    </>
  );
}
