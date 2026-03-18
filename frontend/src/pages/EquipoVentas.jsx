// ==============================================
// EquipoVentas.jsx — Equipo de Ventas (conectado al backend)
// ==============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVendedores } from '../services/vendedor.service.js';
import { getCurrentUser } from '../services/auth.service.js';

const CARD_COLORS = ['primary', 'accent-green', 'secondary', 'primary'];

export default function EquipoVentas() {
  const [vendedores, setVendedores] = useState([]);
  const [kpis, setKpis] = useState({ total: 0, vendedores: 0, directores: 0, activos: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.rol === 'Administrador';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getVendedores();
        if (result.success) {
          setVendedores(result.data.vendedores);
          setKpis(result.data.kpis);
        }
      } catch (err) {
        setError(err.message || 'Error al cargar vendedores');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = vendedores.filter(v => {
    if (!search) return true;
    const full = `${v.primer_nombre} ${v.primer_apellido}`.toLowerCase();
    return full.includes(search.toLowerCase());
  });

  return (
    <>
      {/* HEADER */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-display">Equipo de Ventas</h2>
          <p className="text-slate-500 text-sm mt-1">Gestiona tu equipo y revisa su rendimiento</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input
              className="pl-10 pr-4 py-2.5 bg-[#F4FAFB] border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all w-64"
              placeholder="Buscar vendedor..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {isAdmin && (
            <Link to="/equipo-ventas/agregar" className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">person_add</span>
              Agregar Vendedor
            </Link>
          )}
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#F4FAFB] p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Equipo</p>
          <h3 className="text-3xl font-bold text-slate-900">{kpis.total}</h3>
        </div>
        <div className="bg-[#F4FAFB] p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Vendedores</p>
          <h3 className="text-3xl font-bold text-slate-900">{kpis.vendedores}</h3>
        </div>
        <div className="bg-[#F4FAFB] p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Directores</p>
          <h3 className="text-3xl font-bold text-slate-900">{kpis.directores}</h3>
        </div>
        <div className="bg-[#F4FAFB] p-5 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Activos</p>
          <h3 className="text-3xl font-bold text-accent-green">{kpis.activos}</h3>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <span className="material-symbols-outlined text-red-500">error</span>
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center py-16">
          <span className="material-symbols-outlined text-3xl text-primary animate-spin">progress_activity</span>
          <p className="text-sm text-slate-400 mt-3">Cargando equipo...</p>
        </div>
      ) : (
        /* VENDEDORES GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full flex flex-col items-center py-16">
              <span className="material-symbols-outlined text-3xl text-slate-300">group_off</span>
              <p className="text-sm text-slate-400 mt-3">No se encontraron vendedores</p>
            </div>
          ) : (
            filtered.map((v, i) => {
              const initials = `${v.primer_nombre[0]}${v.primer_apellido[0]}`;
              const color = CARD_COLORS[i % CARD_COLORS.length];
              return (
                <Link key={v.id} to={`/equipo-ventas/${v.id}`} className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-${color} flex items-center justify-center text-white font-bold text-sm border-2 border-${color}/20`}>
                      {initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">
                        {v.primer_nombre} {v.primer_apellido}
                      </h4>
                      <p className="text-xs text-slate-500 capitalize">{v.tipo}</p>
                    </div>
                    <span className={`ml-auto px-2 py-0.5 text-[9px] font-bold uppercase rounded-full ${v.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {v.estado}
                    </span>
                  </div>

                  {/* Progress bar — meta */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Meta</span>
                      <span className="text-xs font-bold text-slate-700">${v.meta?.toLocaleString() || 0}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: '0%' }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Correo</p>
                      <p className="text-xs text-slate-600 truncate">{v.correo}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Jefe</p>
                      <p className="text-xs text-slate-600 truncate">
                        {v.jefe_nombre ? `${v.jefe_nombre} ${v.jefe_apellido}` : '—'}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </>
  );
}
