// ==============================================
// AliadosComerciales.jsx — Directorio de Emisoras
// ==============================================
import { Link } from 'react-router-dom';

const EMISORAS = [
  { id: '1', razon_social: 'Circuitos Románticos de Venezuela C.A.', nombre_emisora: 'La Romántica 88.9', rif: 'J-30492834-1', frecuencia: '88.9 FM', categoria: 'Musical', direccion: 'Av. Principal Las Mercedes', estado: 'Activo' },
  { id: '2', razon_social: 'Grupo Éxitos C.A.', nombre_emisora: 'Éxitos 99.9', rif: 'J-40129834-5', frecuencia: '99.9 FM', categoria: 'Musical', direccion: 'Caracas Centro', estado: 'Activo' },
  { id: '3', razon_social: 'Corporación Onda C.A.', nombre_emisora: 'Onda 107.9', rif: 'J-20384756-3', frecuencia: '107.9 FM', categoria: 'Informativa', direccion: 'Caracas Central', estado: 'Inactivo' },
  { id: '4', razon_social: 'Radio Tiempo C.A.', nombre_emisora: 'Radio Tiempo 95.1', rif: 'J-50123456-7', frecuencia: '95.1 FM', categoria: 'Deportiva', direccion: 'Av. Bolívar, Valencia', estado: 'Activo' },
  { id: '5', razon_social: 'Mágica Broadcasting C.A.', nombre_emisora: 'Mágica 99.1', rif: 'J-10987654-2', frecuencia: '99.1 FM', categoria: 'Variedades', direccion: 'Caracas Este', estado: 'Cerrado' },
  { id: '6', razon_social: 'Unión Radio C.A.', nombre_emisora: 'Unión Radio 90.3', rif: 'J-60543210-8', frecuencia: '90.3 FM', categoria: 'Informativa', direccion: 'Nivel Nacional', estado: 'Activo' },
];

const STATUS_DOT = {
  Activo: 'bg-accent-green',
  Inactivo: 'bg-slate-300',
  Cerrado: 'bg-red-500',
};

function AliadosComerciales() {
  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Aliados Comerciales</h2>
          <p className="text-slate-500 text-sm mt-1">Directorio de emisoras y aliados</p>
        </div>
        <Link to="/aliados-comerciales/agregar" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>Agregar Aliado
        </Link>
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
          <option>Categoría</option><option>Musical</option><option>Informativa</option><option>Deportiva</option><option>Variedades</option>
        </select>
        <select className="bg-background-light border-none rounded-lg text-sm py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary/50 cursor-pointer">
          <option>Estado</option><option>Activo</option><option>Inactivo</option><option>Cerrado</option>
        </select>
      </div>

      {/* Station Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {EMISORAS.map((e) => (
          <div key={e.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-slate-800">{e.nombre_emisora}</h3>
              <div className={`h-2.5 w-2.5 rounded-full ${STATUS_DOT[e.estado] || 'bg-slate-300'}`} title={e.estado}></div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{e.frecuencia}</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">{e.categoria}</span>
            </div>
            <div className="flex items-center gap-2 mb-4 text-slate-600">
              <span className="material-symbols-outlined text-base">business</span>
              <span className="text-sm font-medium">{e.razon_social}</span>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">RIF: {e.rif}</span>
              <Link to={`/aliados-comerciales/${e.id}`} className="text-primary text-xs font-bold hover:underline">Ver Detalle</Link>
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
