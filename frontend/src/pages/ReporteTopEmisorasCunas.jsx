// ==============================================
// ReporteTopEmisorasCunas.jsx — Top Emisoras por Cuñas
// ==============================================
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const EMISORAS = [
  { nombre: 'Éxitos FM 99.9', cunas: 245, clientes: 18, monto: '$28,500', pct: 100 },
  { nombre: 'Unión Radio 92.1', cunas: 198, clientes: 15, monto: '$22,400', pct: 81 },
  { nombre: 'Caracol Radio 100.5', cunas: 175, clientes: 12, monto: '$19,800', pct: 71 },
  { nombre: 'RCN Radio 93.9', cunas: 152, clientes: 14, monto: '$17,200', pct: 62 },
  { nombre: 'La Mega 107.3', cunas: 130, clientes: 10, monto: '$14,600', pct: 53 },
  { nombre: 'Radio Tiempo 95.1', cunas: 118, clientes: 9, monto: '$13,100', pct: 48 },
  { nombre: 'Onda La Superestación', cunas: 105, clientes: 8, monto: '$11,500', pct: 43 },
  { nombre: 'Planeta FM 104.7', cunas: 92, clientes: 7, monto: '$9,800', pct: 38 },
  { nombre: 'Hot 94 FM', cunas: 78, clientes: 6, monto: '$8,200', pct: 32 },
  { nombre: 'Rumbera Network', cunas: 65, clientes: 5, monto: '$6,900', pct: 27 },
];

export default function ReporteTopEmisorasCunas() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Top Emisoras por Cuñas</span>
      </nav>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Top Emisoras por Cuñas</h2>
          <p className="text-slate-500 text-sm mt-1">Ranking de emisoras con mayor volumen de cuñas transmitidas</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF</button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">table_view</span>Excel</button>
        </div>
      </header>

      {/* CHART */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Top 10 Emisoras</h3>
        <div style={{ width: '100%', height: 420 }}>
          <ResponsiveContainer>
            <BarChart data={EMISORAS} margin={{ top: 5, right: 20, left: 0, bottom: 70 }}>
              <defs>
                <linearGradient id="emisoraGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#16B1B8" />
                  <stop offset="100%" stopColor="#8DC63F" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="nombre" tick={{ fontSize: 11, fill: '#1F2937', fontWeight: 600, angle: -40, textAnchor: 'end' }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }} formatter={(value) => [`${value} cuñas`, 'Cuñas']} cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="cunas" fill="url(#emisoraGradient)" radius={[6, 6, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-lg font-bold font-display text-slate-900">Detalle por Emisora</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">#</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Emisora</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cuñas</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Clientes</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto Total</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-50">
              {EMISORAS.map((e, i) => (
                <tr key={e.nombre} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{i + 1}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{e.nombre}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{e.cunas}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{e.clientes}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{e.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
