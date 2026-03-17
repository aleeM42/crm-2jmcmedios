// ==============================================
// ReporteRegionesCliente.jsx — Regiones en donde está un Cliente
// ==============================================
import { Link } from 'react-router-dom';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const REGIONES = [
  { nombre: 'Capital', emisoras: 8, pautas: 14, monto: '$28,000', pct: 100 },
  { nombre: 'Central', emisoras: 6, pautas: 10, monto: '$20,000', pct: 71 },
  { nombre: 'Oriente', emisoras: 5, pautas: 8, monto: '$16,000', pct: 57 },
  { nombre: 'Occidente', emisoras: 4, pautas: 6, monto: '$12,000', pct: 43 },
  { nombre: 'Los Andes', emisoras: 3, pautas: 4, monto: '$8,000', pct: 29 },
  { nombre: 'Zulia', emisoras: 2, pautas: 3, monto: '$6,000', pct: 21 },
];

export default function ReporteRegionesCliente() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Regiones por Cliente</span>
      </nav>

      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Regiones en donde está un Cliente</h2>
          <p className="text-slate-500 text-sm mt-1">Análisis geográfico de presencia de clientes en el territorio nacional</p>
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

      {/* CLIENT SELECTOR */}
      <div className="bg-[#F4FAFB] p-4 rounded-xl shadow-sm border border-slate-100 mb-8 flex items-center gap-4">
        <span className="text-sm font-semibold text-slate-700">Cliente Seleccionado</span>
        <select className="flex-1 bg-slate-50 border-slate-200 rounded-lg text-sm font-semibold text-slate-900 py-2.5 focus:ring-primary">
          <option>Alimentos Polar</option>
          <option>Farmatodo</option>
          <option>Banco Mercantil</option>
          <option>Procter & Gamble</option>
          <option>Coca-Cola FEMSA</option>
        </select>
      </div>

      {/* CHART */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary">hub</span>
          <h3 className="text-lg font-bold font-display text-slate-900">Presencia por Región</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">Datos actualizados a las 09:45 AM</p>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <RadarChart data={REGIONES} outerRadius="75%">
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="nombre" tick={{ fontSize: 12, fontWeight: 600, fill: '#1F2937' }} />
              <PolarRadiusAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} />
              <Radar name="Emisoras" dataKey="emisoras" stroke="#16B1B8" fill="#16B1B8" fillOpacity={0.25} strokeWidth={2} />
              <Radar name="Pautas" dataKey="pautas" stroke="#8DC63F" fill="#8DC63F" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
                itemStyle={{ fontWeight: 700 }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 700 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">table_rows</span>
          <h3 className="text-lg font-bold font-display text-slate-900">Métricas Regionales Detalladas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Región</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Emisoras</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pautas</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto Invertido</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Participación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {REGIONES.map((r) => (
                <tr key={r.nombre} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.nombre}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{r.emisoras}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{r.pautas}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{r.monto}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${r.pct}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-600">{r.pct}%</span>
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
