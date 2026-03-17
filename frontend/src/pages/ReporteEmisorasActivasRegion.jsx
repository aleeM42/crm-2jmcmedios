// ==============================================
// ReporteEmisorasActivasRegion.jsx — Emisoras Activas por Región
// ==============================================
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

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
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF</button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">table_view</span>Excel</button>
        </div>
      </header>

      {/* STACKED BAR CHART */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Activas vs. Inactivas</h3>
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={REGIONES} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="nombre" tick={{ fontSize: 12, fill: '#1F2937', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }} cursor={{ fill: '#f8fafc' }} />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 700 }} />
              <Bar dataKey="activas" name="Activas" stackId="a" fill="#16B1B8" radius={[0, 0, 0, 0]} barSize={28} />
              <Bar dataKey="inactivas" name="Inactivas" stackId="a" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
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
