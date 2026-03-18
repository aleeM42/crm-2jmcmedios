// ==============================================
// Clientes.jsx — Directorio de Clientes (conectado al backend)
// ==============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClientes } from '../services/cliente.service.js';

function getInitials(nombre) {
  return nombre.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

const INITIALS_COLORS = ['primary', 'accent-green', 'slate', 'secondary'];

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [kpis, setKpis] = useState({ total: 0, activos: 0, inactivos: 0 });
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtros
  const [filters, setFilters] = useState({
    sector: '',
    estado: '',
    clasificacion: '',
    search: '',
  });

  const fetchClientes = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const result = await getClientes({ ...filters, page, limit: 20 });
      if (result.success) {
        setClientes(result.data.clientes);
        setKpis(result.data.kpis);
        setPagination(result.data.pagination);
      }
    } catch (err) {
      setError(err.message || 'Error al cargar clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [filters]);

  const handleFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Clientes</h2>
          <p className="text-slate-500 text-sm mt-1">Gestión integral de cartera de clientes</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-lg">file_download</span>
            <span className="text-xs font-bold uppercase tracking-wider">Exportar</span>
          </button>
          <Link to="/clientes/agregar" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2 flex-1 sm:flex-initial justify-center">
            <span className="material-symbols-outlined">add</span>Agregar Cliente
          </Link>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100/50">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Clientes</p>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">groups</span>
          </div>
          <h3 className="text-4xl font-bold text-slate-900 mt-4">{kpis.total}</h3>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100/50">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Activos</p>
            <span className="material-symbols-outlined text-accent-green bg-accent-green/10 p-2 rounded-lg">check_circle</span>
          </div>
          <h3 className="text-4xl font-bold text-slate-900 mt-4">{kpis.activos}</h3>
          <p className="text-[11px] text-slate-400 mt-2">
            {kpis.total > 0 ? `${((kpis.activos / kpis.total) * 100).toFixed(1)}% de la cartera total` : '—'}
          </p>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100/50">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Inactivos</p>
            <span className="material-symbols-outlined text-slate-400 bg-slate-100 p-2 rounded-lg">block</span>
          </div>
          <h3 className="text-4xl font-bold text-slate-900 mt-4">{kpis.inactivos}</h3>
          <p className="text-[11px] text-slate-400 mt-2">Requieren seguimiento comercial</p>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100/50">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Página</p>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">pages</span>
          </div>
          <h3 className="text-4xl font-bold text-slate-900 mt-4">{pagination.page}/{pagination.totalPages || 1}</h3>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-[#F4FAFB] p-4 rounded-xl shadow-sm mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-0 sm:min-w-[300px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-200 text-sm focus:ring-primary focus:border-primary transition-all"
            placeholder="Buscar por nombre, RIF fiscal o razón social..."
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilter}
          />
        </div>
        <select name="sector" value={filters.sector} onChange={handleFilter} className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 focus:ring-primary">
          <option value="">Sector: Todos</option>
          <option value="Salud">Salud</option>
          <option value="Alimentacion">Alimentación</option>
          <option value="Telematica">Telemática</option>
          <option value="Fabricacion">Fabricación</option>
          <option value="Bancario">Bancario</option>
          <option value="Aerolinea">Aerolínea</option>
          <option value="Otro">Otro</option>
        </select>
        <select name="estado" value={filters.estado} onChange={handleFilter} className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 focus:ring-primary">
          <option value="">Estado: Todos</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <select name="clasificacion" value={filters.clasificacion} onChange={handleFilter} className="bg-slate-50 border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 focus:ring-primary">
          <option value="">Clasificación: Todas</option>
          <option value="Agencia">Agencia</option>
          <option value="Cliente directo">Cliente Directo</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <span className="material-symbols-outlined text-red-500">error</span>
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Table */}
      <div className="bg-[#F4FAFB] rounded-xl shadow-sm overflow-hidden border border-slate-100">
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
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-3xl text-primary animate-spin">progress_activity</span>
                      <span className="text-sm text-slate-400">Cargando clientes...</span>
                    </div>
                  </td>
                </tr>
              ) : clientes.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-3xl text-slate-300">folder_off</span>
                      <span className="text-sm text-slate-400">No se encontraron clientes</span>
                    </div>
                  </td>
                </tr>
              ) : (
                clientes.map((c, i) => {
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
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Mostrando <span className="font-bold">{clientes.length}</span> de <span className="font-bold">{pagination.total}</span> clientes
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => fetchClientes(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition-colors disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <span className="px-3 py-1 text-xs font-bold text-slate-600">
              {pagination.page} / {pagination.totalPages || 1}
            </span>
            <button
              onClick={() => fetchClientes(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 transition-colors disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
