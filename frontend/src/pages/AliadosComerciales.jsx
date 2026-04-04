// ==============================================
// AliadosComerciales.jsx — Directorio de Emisoras
// ==============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { getCurrentUser } from '../services/auth.service';

const STATUS_DOT = {
  activo: 'bg-accent-green',
  inactivo: 'bg-slate-300',
  cerrado: 'bg-red-500',
  Activo: 'bg-accent-green',
  Inactivo: 'bg-slate-300',
  Cerrado: 'bg-red-500',
};

function AliadosComerciales() {
  const [EMISORAS, setEMISORAS] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const user = getCurrentUser();
  const canCreateAliado = ['Administrador', 'Director General', 'Director'].includes(user?.rol);

  useEffect(() => {
    async function fetchEmisoras() {
      try {
        const response = await api.get('/aliados');
        if (response.success) {
          setEMISORAS(response.data);
        }
      } catch (error) {
        console.error('Error fetching aliados:', error);
      }
    }
    fetchEmisoras();
  }, []);

  // KPIs
  const totalEmisoras = EMISORAS.length;
  const emisorasActivas = EMISORAS.filter(e => e.estado?.toLowerCase() === 'activo').length;
  const porcentajeActivas = totalEmisoras > 0 ? ((emisorasActivas / totalEmisoras) * 100).toFixed(1) : 0;
  const regionesCubiertas = new Set(EMISORAS.map(e => e.fk_region).filter(Boolean)).size;

  // Filtrado
  const filteredEmisoras = EMISORAS.filter(e => {
    const matchesSearch = e.nombre_emisora?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.frecuencia?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? e.categoria?.toLowerCase().includes(categoryFilter.toLowerCase()) : true;
    const matchesStatus = statusFilter ? e.estado === statusFilter : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Aliados Comerciales</h2>
          <p className="text-slate-500 text-sm mt-1">Directorio de emisoras y aliados</p>
        </div>
        {canCreateAliado && (
          <Link to="/aliados-comerciales/agregar" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
            <span className="material-symbols-outlined">add</span>Agregar Aliado
          </Link>
        )}
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-semibold mb-1">Total Emisoras</p>
          <p className="text-3xl font-bold text-slate-800">{totalEmisoras}</p>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-semibold mb-1">Emisoras Activas</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-accent-green">{emisorasActivas}</p>
            <span className="text-xs font-medium text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-full">{porcentajeActivas}%</span>
          </div>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-semibold mb-1">Regiones Cubiertas</p>
          <p className="text-3xl font-bold text-slate-800">{regionesCubiertas}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-0 max-w-full sm:max-w-xs">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input
            className="w-full h-10 pl-10 pr-4 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none placeholder:text-slate-400"
            placeholder="Buscar emisora o frecuencia..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="h-10 px-4 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-primary outline-none cursor-pointer capitalize"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          <option value="multitarget">Multitarget</option>
          <option value="comunitaria">Comunitaria</option>
          <option value="deportiva">Deportiva</option>
          <option value="juvenil">Juvenil</option>
          <option value="adulto contemporáneo">Adulto Contemporáneo</option>
          <option value="popular">Popular</option>
          <option value="adulto">Adulto</option>
        </select>
        <select
          className="h-10 px-4 pr-8 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-primary outline-none cursor-pointer capitalize"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Todos los Estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="cerrado">Cerrado</option>
        </select>
      </div>

      {/* Station Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredEmisoras.map((e) => (
          <div key={e.id} className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-slate-800">{e.nombre_emisora}</h3>
              <div className={`h-2.5 w-2.5 rounded-full ${STATUS_DOT[e.estado] || 'bg-slate-300'}`} title={e.estado}></div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{e.frecuencia}</span>
              <span className="px-3 py-1 bg-accent-green/10 text-accent-green text-xs font-semibold rounded-full capitalize">{e.categoria}</span>
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
        {filteredEmisoras.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No se encontraron emisoras que coincidan con la búsqueda.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
        Mostrando {filteredEmisoras.length} de {EMISORAS.length} Emisoras
      </div>
    </>
  );
}

export default AliadosComerciales;
