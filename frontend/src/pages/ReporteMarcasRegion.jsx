// ==============================================
// ReporteMarcasRegion.jsx — Marcas por Región
// ==============================================
import { Link } from 'react-router-dom';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const RADAR_COLORS = ['#16B1B8', '#8DC63F', '#55CCD3', '#A1DEE5', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

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
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF</button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">table_view</span>Excel</button>
        </div>
      </header>

      {/* CHART */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Presencia por Región (Radar)</h3>
        <div style={{ width: '100%', height: 420 }}>
          <ResponsiveContainer>
            <RadarChart data={REGIONES.map(r => { const p = { region: r }; MARCAS.forEach(m => { p[m.nombre] = m[r]; }); return p; })} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="region" tick={{ fontSize: 12, fill: '#1F2937', fontWeight: 600 }} />
              <PolarRadiusAxis tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} />
              {MARCAS.map((m, i) => (
                <Radar key={m.nombre} name={m.nombre} dataKey={m.nombre} stroke={RADAR_COLORS[i]} fill={RADAR_COLORS[i]} fillOpacity={0.1} strokeWidth={2} />
              ))}
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
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
