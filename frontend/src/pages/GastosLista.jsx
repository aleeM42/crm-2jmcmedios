// ==============================================
// GastosLista.jsx — Listado de Gastos de Marketing (dinámico)
// ==============================================
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';

const TIPO_STYLE = {
  publicidad: 'bg-blue-100 text-blue-600',
  evento: 'bg-amber-100 text-amber-600',
  'material pop': 'bg-purple-100 text-purple-600',
  patrocinio: 'bg-pink-100 text-pink-600',
  'regalos corporativos': 'bg-rose-100 text-rose-600',
  digital: 'bg-cyan-100 text-cyan-600',
  otro: 'bg-slate-100 text-slate-500',
};

export default function GastosLista() {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [filterTipo, setFilterTipo] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/gastos-marketing');
        if (res.success) setGastos(Array.isArray(res.data) ? res.data : []);
      } catch { /* silently handle */ }
      setLoading(false);
    };
    load();
  }, []);

  // Filtered
  const filtered = useMemo(() => {
    return gastos.filter((g) => {
      if (filterTipo && g.tipo?.toLowerCase() !== filterTipo) return false;
      if (search) {
        const q = search.toLowerCase();
        const match = [g.concepto, g.cliente_nombre, g.aliado_nombre]
          .filter(Boolean)
          .some((f) => f.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [gastos, search, filterTipo]);

  // KPIs
  const totalMes = gastos.reduce((s, g) => s + parseFloat(g.monto || 0), 0);
  const byTipo = gastos.reduce((acc, g) => {
    const t = g.tipo?.toLowerCase() || 'otro';
    acc[t] = (acc[t] || 0) + parseFloat(g.monto || 0);
    return acc;
  }, {});

  const kpis = [
    { label: 'Total Gastos Mes', value: `$${totalMes.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: 'payments', color: 'text-primary' },
    { label: 'Publicidad', value: `$${(byTipo['publicidad'] || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: 'campaign', color: 'text-blue-500' },
    { label: 'Eventos', value: `$${(byTipo['evento'] || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: 'celebration', color: 'text-amber-500' },
    { label: 'Otros Gastos', value: `$${(totalMes - (byTipo['publicidad'] || 0) - (byTipo['evento'] || 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: 'receipt_long', color: 'text-slate-500' },
  ];

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/actividad-comercial">Actividad Comercial</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">Gastos de Marketing</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 font-display">Gastos de Marketing</h2>
          <p className="text-sm text-slate-400 mt-1">Control de gastos de marketing del departamento de ventas</p>
        </div>
        <Link to="/actividad-comercial/gastos/agregar" className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-[18px]">add</span> Nuevo Gasto
        </Link>
      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-[#F4FAFB] p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <span className={`material-symbols-outlined text-3xl ${kpi.color}`}>{kpi.icon}</span>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
              <p className="text-2xl font-black text-slate-900 font-display">{loading ? '...' : kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar gasto..." className="w-full h-10 pl-10 pr-4 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
        </div>
        <select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)} className="h-10 pr-10 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
          <option value="">Todas las categorías</option>
          <option value="publicidad">Publicidad</option>
          <option value="evento">Evento</option>
          <option value="material pop">Material POP</option>
          <option value="patrocinio">Patrocinio</option>
          <option value="regalos corporativos">Regalos Corporativos</option>
          <option value="digital">Digital</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-100">
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Asociado a</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Concepto</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Fecha</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Monto</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Tipo</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="py-12 text-center text-sm text-slate-400">Cargando gastos...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="py-12 text-center text-sm text-slate-400">No se encontraron gastos</td></tr>
            ) : (
              filtered.map((g) => {
                const entityName = g.cliente_nombre || g.aliado_nombre || '—';
                const entityType = g.cliente_nombre ? 'Cliente' : g.aliado_nombre ? 'Aliado' : '';
                return (
                  <tr key={g.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-black">{getInitials(entityName)}</div>
                        <div>
                          <span className="font-medium text-slate-700">{entityName}</span>
                          {entityType && <p className="text-[10px] text-slate-400">{entityType}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-slate-600">{g.concepto}</td>
                    <td className="py-3 px-6 text-slate-500">{g.fecha?.slice(0, 10)}</td>
                    <td className="py-3 px-6 font-bold text-slate-800">${parseFloat(g.monto || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="py-3 px-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold capitalize ${TIPO_STYLE[g.tipo?.toLowerCase()] || TIPO_STYLE.otro}`}>{g.tipo}</span>
                    </td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/actividad-comercial/gastos/${g.id}/editar`} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors" title="Editar">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </Link>
                        <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Eliminar">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
