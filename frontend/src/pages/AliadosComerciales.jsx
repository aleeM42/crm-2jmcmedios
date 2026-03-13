// ==============================================
// AliadosComerciales.jsx — Directorio de Emisoras
// ==============================================
import { Link } from 'react-router-dom';

const EMISORAS = [
  { name: 'La Romántica 88.9', freq: '88.9 FM', region: 'Caracas', contacto: 'Ricardo Pérez', cobertura: 'Caracas - Los Teques', status: 'accent-green' },
  { name: 'Éxitos 99.9', freq: '99.9 FM', region: 'Caracas', contacto: 'Mariana García', cobertura: 'Gran Caracas', status: 'accent-green' },
  { name: 'Onda 107.9', freq: '107.9 FM', region: 'Caracas', contacto: 'Carlos Méndez', cobertura: 'Caracas Central', status: 'slate-300' },
  { name: 'Radio Tiempo 95.1', freq: '95.1 FM', region: 'Valencia', contacto: 'José Gregorio', cobertura: 'Carabobo - Aragua', status: 'accent-green' },
  { name: 'Mágica 99.1', freq: '99.1 FM', region: 'Caracas', contacto: 'Elena Rodríguez', cobertura: 'Caracas Este', status: 'red-500' },
  { name: 'Unión Radio 90.3', freq: '90.3 FM', region: 'Nacional', contacto: 'Luisa Martínez', cobertura: 'Todo el país', status: 'accent-green' },
];

function AliadosComerciales() {
  return (
    <>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight font-display">Aliados Comerciales</h2>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-semibold mb-1">Total Emisoras</p>
          <p className="text-3xl font-bold text-slate-800">32</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-semibold mb-1">Emisoras Activas</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-accent-green">28</p>
            <span className="text-xs font-medium text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-full">87.5%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-semibold mb-1">Regiones Cubiertas</p>
          <p className="text-3xl font-bold text-slate-800">8</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap items-center gap-4 mb-8">
        <div className="flex-1 min-w-[300px] relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input className="w-full pl-10 pr-4 py-2 bg-background-light border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400" placeholder="Buscar emisora o frecuencia..." type="text" />
        </div>
        <select className="bg-background-light border-none rounded-lg text-sm py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary/50 cursor-pointer">
          <option>Región</option><option>Caracas</option><option>Valencia</option><option>Maracaibo</option>
        </select>
        <select className="bg-background-light border-none rounded-lg text-sm py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary/50 cursor-pointer">
          <option>Categoría</option><option>Musical</option><option>Informativa</option><option>Deportiva</option>
        </select>
        <select className="bg-background-light border-none rounded-lg text-sm py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary/50 cursor-pointer">
          <option>Estado</option><option>Activa</option><option>Inactiva</option><option>Cerrada</option>
        </select>
      </div>

      {/* Station Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {EMISORAS.map((e) => (
          <div key={e.name} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-slate-800">{e.name}</h3>
              <div className={`h-2.5 w-2.5 rounded-full bg-${e.status}`} title={e.status === 'accent-green' ? 'Activa' : e.status === 'red-500' ? 'Cerrada' : 'Inactiva'}></div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{e.freq}</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">{e.region}</span>
            </div>
            <div className="flex items-center gap-2 mb-4 text-slate-600">
              <span className="material-symbols-outlined text-base">person</span>
              <span className="text-sm font-medium">{e.contacto}</span>
              <span className="material-symbols-outlined text-base ml-auto text-primary cursor-pointer">call</span>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Cobertura: {e.cobertura}</span>
              <Link to={`/aliados-comerciales/${e.freq.replace(/\s/g, '')}`} className="text-primary text-xs font-bold hover:underline">Ver Detalle</Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">2</button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">3</button>
        <span className="px-2 text-slate-400">...</span>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">8</button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
      </div>
    </>
  );
}

export default AliadosComerciales;
