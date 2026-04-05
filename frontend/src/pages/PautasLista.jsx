// ==============================================
// PautasLista.jsx — Listado de Pautas Publicitarias
// ==============================================
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api.js';
import { calcularProgresoPauta } from '../utils/pautasUtils';
import { getCurrentUser } from '../services/auth.service';

const STATUS_STYLE = {
  'en transmision': 'bg-primary/10 text-primary',
  'programada': 'bg-blue-100 text-blue-600',
  'finalizada': 'bg-accent-green/10 text-accent-green',
  'suspendida': 'bg-amber-100 text-amber-600',
};

export default function PautasLista() {
  const [pautas, setPautas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  const [tipoCompraFilter, setTipoCompraFilter] = useState('');
  const [vendedorFilter, setVendedorFilter] = useState('');

  const user = getCurrentUser();
  const canCreatePauta = ['Administrador', 'Director General', 'Gestor de Pautas'].includes(user?.rol);

  useEffect(() => {
    api.get('/pautas')
      .then(res => {
        if (res.success) setPautas(res.data);
      })
      .finally(() => setLoading(false));
  }, []);


  // Compute unique filters
  const vendedoresOpciones = [...new Set(pautas.map(p => p.vendedor_nombre).filter(Boolean))].sort();

  // Apply filters
  const filteredPautas = pautas.filter(p => {
    // 1. Search text
    if (search) {
      const sTerm = search.toLowerCase();
      const matchSearch =
        (p.numero_ot?.toLowerCase().includes(sTerm)) ||
        (p.numero_oc?.toLowerCase().includes(sTerm)) ||
        (p.cliente_nombre?.toLowerCase().includes(sTerm)) ||
        (p.marca?.toLowerCase().includes(sTerm)) ||
        (p.emisora_nombre?.toLowerCase().includes(sTerm));
      if (!matchSearch) return false;
    }

    // 2. Estado
    if (estadoFilter) {
      if (p.estado !== estadoFilter) return false;
    }

    // 3. Tipo compra
    if (tipoCompraFilter) {
      if (p.tipo_compra !== tipoCompraFilter) return false;
    }

    // 4. Vendedor
    if (vendedorFilter) {
      if (p.vendedor_nombre !== vendedorFilter) return false;
    }

    return true;
  });

  const totalPautas = filteredPautas.length;
  const enTransmision = filteredPautas.filter(p => p.estado === 'en transmision').length;
  const montoOC = filteredPautas.reduce((sum, p) => sum + Number(p.monto_oc || 0), 0);
  const montoOT = filteredPautas.reduce((sum, p) => sum + Number(p.monto_ot || 0), 0);

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 font-display">Pautas</h2>
          <p className="text-sm text-slate-400 mt-1">Gestión de órdenes de transmisión</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1 bg-[#F4FAFB] rounded-lg border border-slate-200 p-1 shadow-sm">
            <button className="px-3 py-1.5 rounded-md bg-accent-green text-white text-xs font-bold">Lista</button>
            <Link to="/pautas/kanban" className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">Kanban</Link>
            <Link to="/pautas/calendario" className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">Calendario</Link>
          </div>
          {canCreatePauta && (
            <Link to="/pautas/agregar" className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex-1 sm:flex-initial justify-center">
              <span className="material-symbols-outlined text-[18px]">add</span> Nueva Pauta
            </Link>
          )}
        </div>
      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Pautas', value: totalPautas.toString(), sub: 'registradas' },
          { label: 'En Transmisión', value: enTransmision.toString(), dot: 'bg-accent-green' },
          { label: 'Monto OC Total', value: `$${montoOC.toLocaleString()}`, sub: 'facturado' },
          { label: 'Monto OT Total', value: `$${montoOT.toLocaleString()}`, sub: 'comprometido' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#F4FAFB] p-5 rounded-xl shadow-sm border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{kpi.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-slate-900 font-display">{kpi.value}</p>
              {kpi.sub && <span className="text-xs text-slate-400">{kpi.sub}</span>}
              {kpi.dot && <span className={`w-2 h-2 rounded-full ${kpi.dot}`}></span>}
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-0 max-w-full sm:max-w-xs">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Buscar por OT, cliente, marca..."
            className="w-full h-10 pl-10 pr-4 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="h-10 px-4 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-primary outline-none"
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
        >
          <option value="">Estado</option>
          <option value="en transmision">En transmisión</option>
          <option value="programada">Programada</option>
          <option value="finalizada">Finalizada</option>
          <option value="suspendida">Suspendida</option>
        </select>
        <select
          className="h-10 pr-8 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-primary outline-none"
          value={tipoCompraFilter}
          onChange={(e) => setTipoCompraFilter(e.target.value)}
        >
          <option value="">Tipo de compra</option>
          <option value="rotativa">Rotativa</option>
          <option value="en vivo">En vivo</option>
        </select>
        <select
          className="h-10 pr-8 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-primary outline-none"
          value={vendedorFilter}
          onChange={(e) => setVendedorFilter(e.target.value)}
        >
          <option value="">Vendedor</option>
          {vendedoresOpciones.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-100">
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Nro OT</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Nro OC</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Cliente</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Emisora</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Marca</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Tipo</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Vigencia</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Estado</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Progreso</th>
                <th className="text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Monto OC</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="10" className="text-center py-4 text-slate-500">Cargando pautas...</td></tr>
              ) : filteredPautas.length === 0 ? (
                <tr><td colSpan="10" className="text-center py-4 text-slate-500">No hay pautas que coincidan con los filtros.</td></tr>
              ) : (
                filteredPautas.map((p) => {
                  // Calcular progreso real basado en fechas
                  const { progresoPorcentaje: progreso } = calcularProgresoPauta(p);

                  return (
                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-5">
                        <Link to={`/pautas/${p.id}`} className="font-bold text-primary hover:underline">{p.numero_ot}</Link>
                      </td>
                      <td className="py-3 px-6 text-xs font-medium text-slate-500">{p.numero_oc}</td>
                      <td className="py-3 px-5 font-medium text-slate-700">{p.cliente_nombre || 'Sin cliente'}</td>
                      <td className="py-3 px-5 text-slate-600 text-xs">{p.emisora_nombre || '—'}</td>
                      <td className="py-3 px-5 text-slate-600">{p.marca}</td>
                      <td className="py-3 px-5 text-slate-600 capitalize text-xs">{p.tipo_compra}</td>
                      <td className="py-3 px-5 text-xs text-slate-500 whitespace-nowrap">
                        {new Date(p.fecha_inicio).toLocaleDateString()} → {new Date(p.fecha_fin).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold capitalize ${STATUS_STYLE[p.estado] || 'bg-slate-100 text-slate-500'}`}>{p.estado}</span>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progreso}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-600 w-8">{progreso}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-right font-bold text-slate-800">${Number(p.monto_oc).toLocaleString()}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">Mostrando {filteredPautas.length} resultados</span>
        </div>
      </div>
    </>
  );
}
