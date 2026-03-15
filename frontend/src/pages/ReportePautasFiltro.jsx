// ==============================================
// ReportePautasFiltro.jsx — Pautas por Región, Marca, Cliente
// ==============================================
import { Link } from 'react-router-dom';

const DISTRIBUCIONES = [
  { nombre: 'Capital', pautas: 35, color: '#16B1B8', offset: 0 },
  { nombre: 'Central', pautas: 25, color: '#8DC63F', offset: 35 },
  { nombre: 'Oriente', pautas: 18, color: '#55CCD3', offset: 60 },
  { nombre: 'Occidente', pautas: 12, color: '#A1DEE5', offset: 78 },
  { nombre: 'Los Andes', pautas: 10, color: '#d1d5db', offset: 90 },
];

const TABLE_DATA = [
  { ot: '001-2026', cliente: 'Alimentos Polar', marca: 'Harina PAN', region: 'Capital', emisora: 'Éxitos FM', estado: 'En transmisión', monto: '$4,200' },
  { ot: '002-2026', cliente: 'Farmatodo', marca: 'Farmatodo Express', region: 'Central', emisora: 'Unión Radio', estado: 'Programada', monto: '$3,800' },
  { ot: '003-2026', cliente: 'Banco Mercantil', marca: 'Tarjeta Mercantil', region: 'Capital', emisora: 'Caracol Radio', estado: 'En transmisión', monto: '$5,100' },
  { ot: '004-2026', cliente: 'Coca-Cola FEMSA', marca: 'Coca-Cola', region: 'Nacional', emisora: 'RCN Radio', estado: 'Finalizada', monto: '$6,500' },
  { ot: '005-2026', cliente: 'Movistar', marca: 'Movistar Plus', region: 'Oriente', emisora: 'Radio Tiempo', estado: 'En transmisión', monto: '$3,200' },
  { ot: '006-2026', cliente: 'Nestlé', marca: 'Nestlé Purina', region: 'Central', emisora: 'La Mega', estado: 'Programada', monto: '$2,900' },
  { ot: '007-2026', cliente: 'Toyota', marca: 'Hilux', region: 'Occidente', emisora: 'Planeta FM', estado: 'Finalizada', monto: '$4,800' },
  { ot: '008-2026', cliente: 'Digitel', marca: 'Digitel 4G', region: 'Los Andes', emisora: 'Éxitos FM', estado: 'En transmisión', monto: '$2,500' },
];

const ESTADO_STYLE = {
  'En transmisión': 'bg-accent-green/10 text-accent-green',
  'Programada': 'bg-primary/10 text-primary',
  'Finalizada': 'bg-slate-100 text-slate-500',
};

export default function ReportePautasFiltro() {
  return (
    <>
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/reportes" className="hover:text-primary transition-colors font-medium">Reportes</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-semibold">Pautas por Filtro</span>
      </nav>

      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Pautas por Región, Marca, Cliente</h2>
          <p className="text-slate-500 text-sm mt-1">Búsqueda avanzada de pautas por fecha, categoría o estado</p>
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

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-8 flex flex-wrap items-center gap-4">
        <select className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 focus:ring-primary">
          <option>Región: Todas</option>
          <option>Capital</option>
          <option>Central</option>
          <option>Oriente</option>
          <option>Occidente</option>
          <option>Los Andes</option>
        </select>
        <select className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 focus:ring-primary">
          <option>Marca: Todas</option>
          <option>Harina PAN</option>
          <option>Coca-Cola</option>
          <option>Movistar Plus</option>
        </select>
        <select className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 focus:ring-primary">
          <option>Cliente: Todos</option>
          <option>Alimentos Polar</option>
          <option>Farmatodo</option>
          <option>Banco Mercantil</option>
        </select>
        <select className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 focus:ring-primary">
          <option>Estado: Todos</option>
          <option>En transmisión</option>
          <option>Programada</option>
          <option>Finalizada</option>
        </select>
        <input type="date" className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 focus:ring-primary" />
        <input type="date" className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 focus:ring-primary" />
      </div>

      {/* DONUT */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Distribución de Pautas</h3>
        <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#f1f5f9" strokeWidth="3"></circle>
              {DISTRIBUCIONES.map((d) => (
                <circle key={d.nombre} cx="18" cy="18" fill="transparent" r="15.915" stroke={d.color} strokeDasharray={`${d.pautas} ${100 - d.pautas}`} strokeDashoffset={`-${d.offset}`} strokeWidth="3.5"></circle>
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-900">100%</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Regiones</span>
            </div>
          </div>
          <div className="space-y-3">
            {DISTRIBUCIONES.map((d) => (
              <div key={d.nombre} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{d.nombre}</p>
                  <p className="text-xs text-slate-500">{d.pautas}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold font-display text-slate-900">Listado Filtrado</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">OT</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Marca</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Región</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Emisora</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {TABLE_DATA.map((r) => (
                <tr key={r.ot} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-primary">{r.ot}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.cliente}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{r.marca}</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">{r.region}</span></td>
                  <td className="px-6 py-4 text-sm text-slate-600">{r.emisora}</td>
                  <td className="px-6 py-4"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${ESTADO_STYLE[r.estado]}`}>{r.estado}</span></td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{r.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/30 flex justify-between items-center border-t border-slate-100">
          <p className="text-xs text-slate-500">Mostrando <span className="font-bold">1-8</span> de <span className="font-bold">156</span> pautas</p>
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
