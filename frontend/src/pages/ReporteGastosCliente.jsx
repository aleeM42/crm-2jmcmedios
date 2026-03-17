// ==============================================
// ReporteGastosCliente.jsx — Lista de Gastos por Cliente
// ==============================================
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const TOP_CLIENTES = [
  { nombre: 'Alimentos Polar', gasto: '$12,500', pct: 100 },
  { nombre: 'Farmatodo', gasto: '$9,800', pct: 78 },
  { nombre: 'Procter & Gamble', gasto: '$8,400', pct: 67 },
  { nombre: 'Coca-Cola FEMSA', gasto: '$7,200', pct: 58 },
  { nombre: 'Nestlé', gasto: '$6,500', pct: 52 },
  { nombre: 'Banco Mercantil', gasto: '$5,800', pct: 46 },
  { nombre: 'Banesco', gasto: '$5,200', pct: 42 },
  { nombre: 'Movistar', gasto: '$4,600', pct: 37 },
  { nombre: 'Digitel', gasto: '$3,900', pct: 31 },
  { nombre: 'Toyota', gasto: '$3,100', pct: 25 },
];

const TABLE_DATA = [
  { fecha: '2026-03-01', cliente: 'Alimentos Polar', concepto: 'Reunión cliente', categoria: 'Viáticos', monto: '$450', vendedor: 'Carlos Jaramillo' },
  { fecha: '2026-03-03', cliente: 'Farmatodo', concepto: 'Presentación propuesta', categoria: 'Transporte', monto: '$180', vendedor: 'Marta Lucía R.' },
  { fecha: '2026-03-05', cliente: 'Banco Mercantil', concepto: 'Almuerzo de negocios', categoria: 'Alimentación', monto: '$320', vendedor: 'Andrés F. Rojas' },
  { fecha: '2026-03-07', cliente: 'Coca-Cola FEMSA', concepto: 'Visita planta', categoria: 'Transporte', monto: '$250', vendedor: 'Sandra Gómez' },
  { fecha: '2026-03-10', cliente: 'Nestlé', concepto: 'Material POP', categoria: 'Marketing', monto: '$890', vendedor: 'Carlos Jaramillo' },
  { fecha: '2026-03-12', cliente: 'Procter & Gamble', concepto: 'Evento lanzamiento', categoria: 'Marketing', monto: '$1,200', vendedor: 'Marta Lucía R.' },
];

export default function ReporteGastosCliente() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Gastos en inversión de atención comercial</span>
      </nav>

      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Lista de Gastos por Cliente</h2>
          <p className="text-slate-500 text-sm mt-1">Detalle de inversión publicitaria desglosado por cada cuenta</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-lg">table_view</span>Excel
          </button>
        </div>
      </header>

      {/* TOP CLIENTES CHART */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Top Clientes por Gasto Total</h3>
        <div style={{ width: '100%', height: 420 }}>
          <ResponsiveContainer>
            <BarChart data={TOP_CLIENTES} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
              <defs>
                <linearGradient id="gastoGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#16B1B8" />
                  <stop offset="100%" stopColor="#8DC63F" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="nombre" tick={{ fontSize: 11, fill: '#1F2937', fontWeight: 600, angle: -35, textAnchor: 'end' }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }} formatter={(value, name, props) => [props.payload.gasto, 'Gasto']} cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="pct" fill="url(#gastoGradient)" radius={[6, 6, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold font-display text-slate-900">Detalle Individual de Gastos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Concepto</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Categoría</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Vendedor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {TABLE_DATA.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600">{r.fecha}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.cliente}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{r.concepto}</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">{r.categoria}</span></td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{r.monto}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{r.vendedor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/30 flex justify-between items-center border-t border-slate-100">
          <p className="text-xs text-slate-500">Mostrando <span className="font-bold">1-6</span> de <span className="font-bold">245</span> gastos</p>
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
