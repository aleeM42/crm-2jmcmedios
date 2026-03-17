// ==============================================
// ReporteRankingClientesPautas.jsx — Ranking de Clientes por Pautas Contratadas
// ==============================================
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLOR_MAP = {
  primary: '#16B1B8',
  secondary: '#8DC63F',
  'accent-green': '#8DC63F',
};

const TOP_CLIENTES = [
  { nombre: 'Alimentos Polar', pautas: 24, monto: '$48,000', region: 'Capital', color: 'primary' },
  { nombre: 'Farmatodo', pautas: 19, monto: '$38,500', region: 'Central', color: 'secondary' },
  { nombre: 'Banco Mercantil', pautas: 16, monto: '$32,000', region: 'Capital', color: 'accent-green' },
  { nombre: 'Procter & Gamble', pautas: 14, monto: '$28,000', region: 'Nacional', color: 'primary' },
  { nombre: 'Coca-Cola FEMSA', pautas: 12, monto: '$24,500', region: 'Oriente', color: 'secondary' },
  { nombre: 'Nestlé', pautas: 11, monto: '$22,000', region: 'Central', color: 'accent-green' },
  { nombre: 'Banesco', pautas: 10, monto: '$20,000', region: 'Capital', color: 'primary' },
  { nombre: 'Movistar', pautas: 9, monto: '$18,000', region: 'Nacional', color: 'secondary' },
  { nombre: 'Digitel', pautas: 8, monto: '$16,000', region: 'Nacional', color: 'accent-green' },
  { nombre: 'Toyota', pautas: 7, monto: '$14,000', region: 'Capital', color: 'primary' },
];

const TABLE_DATA = [
  { pos: 1, nombre: 'Alimentos Polar', sector: 'Alimentación', pautas: 24, monto: '$48,000', region: 'Capital', estado: 'Activo' },
  { pos: 2, nombre: 'Farmatodo', sector: 'Salud', pautas: 19, monto: '$38,500', region: 'Central', estado: 'Activo' },
  { pos: 3, nombre: 'Banco Mercantil', sector: 'Bancario', pautas: 16, monto: '$32,000', region: 'Capital', estado: 'Activo' },
  { pos: 4, nombre: 'Procter & Gamble', sector: 'Manufactura', pautas: 14, monto: '$28,000', region: 'Nacional', estado: 'Activo' },
  { pos: 5, nombre: 'Coca-Cola FEMSA', sector: 'Alimentación', pautas: 12, monto: '$24,500', region: 'Oriente', estado: 'Activo' },
  { pos: 6, nombre: 'Nestlé', sector: 'Alimentación', pautas: 11, monto: '$22,000', region: 'Central', estado: 'Activo' },
  { pos: 7, nombre: 'Banesco', sector: 'Bancario', pautas: 10, monto: '$20,000', region: 'Capital', estado: 'Activo' },
  { pos: 8, nombre: 'Movistar', sector: 'Telemática', pautas: 9, monto: '$18,000', region: 'Nacional', estado: 'Activo' },
  { pos: 9, nombre: 'Digitel', sector: 'Telemática', pautas: 8, monto: '$16,000', region: 'Nacional', estado: 'Activo' },
  { pos: 10, nombre: 'Toyota', sector: 'Automotriz', pautas: 7, monto: '$14,000', region: 'Capital', estado: 'Activo' },
];

const MAX_PAUTAS = 24;

export default function ReporteRankingClientesPautas() {
  return (
    <>
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Ranking Clientes por Pautas</span>
      </nav>

      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Ranking de Clientes por Pautas Contratadas</h2>
          <p className="text-slate-500 text-sm mt-1">Visualización de clientes con mayor volumen de pautas publicitarias</p>
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

      {/* TOP 10 CHART */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Top 10 Clientes</h3>
        <div style={{ width: '100%', height: 420 }}>
          <ResponsiveContainer>
            <BarChart data={TOP_CLIENTES} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
              <XAxis dataKey="nombre" tick={{ fontSize: 11, fill: '#1F2937', fontWeight: 600, angle: -35, textAnchor: 'end' }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
                formatter={(value) => [`${value} pautas`, 'Pautas']}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="pautas" radius={[6, 6, 0, 0]} barSize={28}>
                {TOP_CLIENTES.map((entry, index) => (
                  <Cell key={index} fill={COLOR_MAP[entry.color] || '#16B1B8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold font-display text-slate-900">Listado Completo</h3>
          <div className="flex items-center gap-3">
            <select className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2 focus:ring-primary">
              <option>Región: Todas</option>
              <option>Capital</option>
              <option>Central</option>
              <option>Oriente</option>
              <option>Nacional</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">#</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sector</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pautas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto Total</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Región</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {TABLE_DATA.map((r) => (
                <tr key={r.pos} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{r.pos}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.nombre}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{r.sector}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{r.pautas}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{r.monto}</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">{r.region}</span></td>
                  <td className="px-6 py-4"><span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent-green/10 text-accent-green uppercase"><span className="w-1.5 h-1.5 rounded-full bg-accent-green"></span>{r.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/30 flex justify-between items-center border-t border-slate-100">
          <p className="text-xs text-slate-500">Mostrando <span className="font-bold">1-10</span> de <span className="font-bold">87</span> clientes</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition-colors"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 font-medium text-xs">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 font-medium text-xs">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition-colors"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
          </div>
        </div>
      </section>
    </>
  );
}
