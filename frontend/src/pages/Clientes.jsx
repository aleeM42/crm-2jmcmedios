// ==============================================
// Clientes.jsx — Directorio de Clientes
// ==============================================
import { Link } from 'react-router-dom';

const CLIENTES_MOCK = [
  {
    id: 'c1',
    nombre: 'Alimentos Polar',
    razon_social: 'Alimentos Polar C.A.',
    rif_fiscal: 'J-00041318-1',
    tipo: 'empresa',
    clasificacion: 'Cliente Directo',
    sector: 'Alimentación',
    estado: 'Activo',
    nombre_agencia: null,
  },
  {
    id: 'c2',
    nombre: 'Farmatodo',
    razon_social: 'Farmatodo C.A.',
    rif_fiscal: 'J-00014523-1',
    tipo: 'empresa',
    clasificacion: 'Agencia',
    sector: 'Salud',
    estado: 'Activo',
    nombre_agencia: 'Publicis Venezuela',
  },
  {
    id: 'c3',
    nombre: 'Banco Provincial',
    razon_social: 'BBVA Provincial S.A.',
    rif_fiscal: 'J-00000123-0',
    tipo: 'empresa',
    clasificacion: 'Cliente Directo',
    sector: 'Bancario',
    estado: 'Inactivo',
    nombre_agencia: null,
  },
  {
    id: 'c4',
    nombre: 'Cervecería Regional',
    razon_social: 'Cervecería Regional C.A.',
    rif_fiscal: 'J-30123456-7',
    tipo: 'empresa',
    clasificacion: 'Cliente Directo',
    sector: 'Fabricación',
    estado: 'Activo',
    nombre_agencia: null,
  },
  {
    id: 'c5',
    nombre: 'Digitel',
    razon_social: 'Corporación Digitel C.A.',
    rif_fiscal: 'J-30045123-9',
    tipo: 'empresa',
    clasificacion: 'Agencia',
    sector: 'Telemática',
    estado: 'Activo',
    nombre_agencia: 'MindShare VE',
  },
];

function getInitials(nombre) {
  return nombre.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

const INITIALS_COLORS = ['primary', 'accent-green', 'slate', 'secondary'];

export default function Clientes() {
  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Clientes</h2>
          <p className="text-slate-500 text-sm mt-1">Gestión integral de cartera de clientes</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-lg">file_download</span>
            <span className="text-xs font-bold uppercase tracking-wider">Exportar</span>
          </button>
          <Link to="/clientes/agregar" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">add</span>Agregar Cliente
          </Link>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100/50">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Clientes</p>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">groups</span>
          </div>
          <h3 className="text-4xl font-bold text-slate-900 mt-4">87</h3>
          <p className="text-[11px] text-slate-400 mt-2"><span className="text-accent-green font-bold">↑ 4%</span> vs mes anterior</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100/50 border-b-4 border-b">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Activos</p>
            <span className="material-symbols-outlined text-accent-green bg-accent-green/10 p-2 rounded-lg">check_circle</span>
          </div>
          <h3 className="text-4xl font-bold text-slate-900 mt-4">72</h3>
          <p className="text-[11px] text-slate-400 mt-2">82.7% de la cartera total</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100/50">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Inactivos</p>
            <span className="material-symbols-outlined text-slate-400 bg-slate-100 p-2 rounded-lg">block</span>
          </div>
          <h3 className="text-4xl font-bold text-slate-900 mt-4">15</h3>
          <p className="text-[11px] text-slate-400 mt-2">Requieren seguimiento comercial</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100/50 border-b-4 border-b">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Nuevos Mes</p>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">person_add</span>
          </div>
          <h3 className="text-4xl font-bold text-slate-900 mt-4">5</h3>
          <p className="text-[11px] text-primary font-bold mt-2">Meta mensual: 8</p>
        </div>
      </div>

      {/* Filter bar — ENUMs del CSV: clasificacion, estado, sector */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-200 text-sm focus:ring-primary focus:border-primary transition-all" placeholder="Buscar por nombre, RIF fiscal o razón social..." type="text" />
        </div>
        <select name="sector" className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 focus:ring-primary">
          <option value="">Sector: Todos</option>
          <option value="Salud">Salud</option>
          <option value="Alimentación">Alimentación</option>
          <option value="Telemática">Telemática</option>
          <option value="Fabricación">Fabricación</option>
          <option value="Bancario">Bancario</option>
        </select>
        <select name="estado" className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 focus:ring-primary">
          <option value="">Estado: Todos</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <select name="clasificacion" className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 focus:ring-primary">
          <option value="">Clasificación: Todas</option>
          <option value="Agencia">Agencia</option>
          <option value="Cliente Directo">Cliente Directo</option>
        </select>
      </div>

      {/* Table — columnas mapeadas a atributos CLIENTE del CSV */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Nombre</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Razón Social</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">RIF Fiscal</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sector</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Clasificación</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tipo</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {CLIENTES_MOCK.map((c, i) => {
                const initials = getInitials(c.nombre);
                const color = INITIALS_COLORS[i % INITIALS_COLORS.length];
                return (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-${color}/10 flex items-center justify-center text-${color} font-bold text-xs`}>{initials}</div>
                        <span className="text-sm font-semibold text-slate-900">{c.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.razon_social}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{c.rif_fiscal}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.sector}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${c.clasificacion === 'Agencia' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                        {c.clasificacion}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {c.estado === 'Activo'
                        ? <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent-green/10 text-accent-green uppercase"><span className="w-1.5 h-1.5 rounded-full bg-accent-green"></span>Activo</span>
                        : <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 uppercase"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Inactivo</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 capitalize">{c.tipo}</td>
                    <td className="px-6 py-4">
                      <Link to={`/clientes/${c.id}`} className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
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
            <span className="text-slate-400 px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 font-medium text-xs">9</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition-colors"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
          </div>
        </div>
      </div>
    </>
  );
}
