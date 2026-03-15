// ==============================================
// ReporteClientesEmisora.jsx — Clientes por Emisora
// ==============================================
import { Link } from 'react-router-dom';

const EMISORAS_DATA = [
  {
    emisora: 'Éxitos FM 99.9', region: 'Capital', totalClientes: 18,
    clientes: [
      { nombre: 'Alimentos Polar', pautas: 8, monto: '$4,200', estado: 'Activo' },
      { nombre: 'Farmatodo', pautas: 5, monto: '$3,100', estado: 'Activo' },
      { nombre: 'Banco Mercantil', pautas: 4, monto: '$2,800', estado: 'Activo' },
      { nombre: 'Coca-Cola FEMSA', pautas: 3, monto: '$2,500', estado: 'Inactivo' },
    ]
  },
  {
    emisora: 'Unión Radio 92.1', region: 'Capital', totalClientes: 15,
    clientes: [
      { nombre: 'Nestlé', pautas: 6, monto: '$3,600', estado: 'Activo' },
      { nombre: 'Movistar', pautas: 4, monto: '$2,400', estado: 'Activo' },
      { nombre: 'Digitel', pautas: 3, monto: '$1,800', estado: 'Activo' },
    ]
  },
];

export default function ReporteClientesEmisora() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Clientes por Emisora</span>
      </nav>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Clientes por Emisora</h2>
          <p className="text-slate-500 text-sm mt-1">Relación de clientes asociados a cada emisora aliada</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-slate-50 border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-2.5 focus:ring-primary">
            <option>Emisora: Todas</option>
            <option>Éxitos FM 99.9</option>
            <option>Unión Radio 92.1</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF</button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"><span className="material-symbols-outlined text-lg">table_view</span>Excel</button>
        </div>
      </header>

      {EMISORAS_DATA.map((e) => (
        <section key={e.emisora} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900">{e.emisora}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{e.region} · {e.totalClientes} clientes</p>
            </div>
            <span className="material-symbols-outlined text-primary text-2xl">radio</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead><tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pautas</th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto</th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-50">
                {e.clientes.map((c) => (
                  <tr key={c.nombre} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3 text-sm font-semibold text-slate-900">{c.nombre}</td>
                    <td className="px-6 py-3 text-sm text-slate-600">{c.pautas}</td>
                    <td className="px-6 py-3 text-sm font-medium text-slate-700">{c.monto}</td>
                    <td className="px-6 py-3"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${c.estado === 'Activo' ? 'bg-accent-green/10 text-accent-green' : 'bg-slate-100 text-slate-500'}`}>{c.estado}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </>
  );
}
