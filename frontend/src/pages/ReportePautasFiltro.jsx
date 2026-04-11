// ==============================================
// ReportePautasFiltro.jsx — Pautas por Región, Marca, Cliente
// ==============================================
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const CHART_COLORS = ['#16B1B8', '#8DC63F', '#55CCD3', '#A1DEE5', '#d1d5db', '#F59E0B', '#EF4444', '#8B5CF6'];

const ESTADO_STYLE = {
  'en transmision': 'bg-accent-green/10 text-accent-green',
  'programada': 'bg-primary/10 text-primary',
  'finalizada': 'bg-slate-100 text-slate-500',
  'suspendida': 'bg-red-50 text-red-500',
};

const ESTADO_LABEL = {
  'en transmision': 'En transmisión',
  'programada': 'Programada',
  'finalizada': 'Finalizada',
  'suspendida': 'Suspendida',
};

function fmt(num) {
  if (!num && num !== 0) return '—';
  return `$${Number(num).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function ReportePautasFiltro() {
  // ── Filter state ──
  const [region, setRegion] = useState('');
  const [marca, setMarca] = useState('');
  const [cliente, setCliente] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');

  // ── Data state ──
  const [listData, setListData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filterOptions, setFilterOptions] = useState({ regiones: [], marcas: [], clientes: [], estados: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch data ──
  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (region) params.set('region', region);
    if (marca) params.set('marca', marca);
    if (cliente) params.set('cliente', cliente);
    if (estado) params.set('estado', estado);
    if (fechaDesde) params.set('fechaDesde', fechaDesde);
    if (fechaHasta) params.set('fechaHasta', fechaHasta);

    const qs = params.toString();
    const endpoint = `/reportes/pautas-filtro${qs ? `?${qs}` : ''}`;

    api.get(endpoint)
      .then((res) => {
        const d = res.data;
        setListData(d.listData || []);
        setChartData(d.chartData || []);
        setTotalCount(d.totalCount || 0);
        if (d.filterOptions) setFilterOptions(d.filterOptions);
      })
      .catch((err) => {
        setError(err.message || 'Error al cargar el reporte');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [region, marca, cliente, estado, fechaDesde, fechaHasta]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Derived: total pautas for donut center ──
  const totalPautasChart = chartData.reduce((s, d) => s + d.pautas, 0);

  // ── Clear all filters ──
  const clearFilters = () => {
    setRegion('');
    setMarca('');
    setCliente('');
    setEstado('');
    setFechaDesde('');
    setFechaHasta('');
  };

  const hasFilters = region || marca || cliente || estado || fechaDesde || fechaHasta;

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
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold">
            <span className="material-symbols-outlined text-lg">table_view</span>Excel
          </button>
        </div>
      </header>

      {/* Error state */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          <span className="material-symbols-outlined align-middle text-base mr-1">error</span>
          {error}
        </div>
      )}

      {/* FILTERS */}
      <div className="bg-[#F4FAFB] p-4 rounded-xl shadow-sm border border-slate-100 mb-8 flex flex-wrap items-center gap-4">
        <select
          id="filtro-region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 px-3 focus:ring-primary focus:outline-none"
        >
          <option value="">Región: Todas</option>
          {filterOptions.regiones.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select
          id="filtro-marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 px-3 focus:ring-primary focus:outline-none"
        >
          <option value="">Marca: Todas</option>
          {filterOptions.marcas.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          id="filtro-cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 px-3 focus:ring-primary focus:outline-none"
        >
          <option value="">Cliente: Todos</option>
          {filterOptions.clientes.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <select
          id="filtro-estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 px-3 focus:ring-primary focus:outline-none"
        >
          <option value="">Estado: Todos</option>
          {filterOptions.estados.map((e) => (
            <option key={e} value={e}>{ESTADO_LABEL[e] || e}</option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Desde</label>
          <input
            type="date"
            id="filtro-fecha-desde"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 px-3 focus:ring-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hasta</label>
          <input
            type="date"
            id="filtro-fecha-hasta"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 py-2.5 px-3 focus:ring-primary focus:outline-none"
          />
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all text-xs font-bold"
          >
            <span className="material-symbols-outlined text-sm">close</span>
            Limpiar
          </button>
        )}
      </div>

      {/* DONUT */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold font-display text-slate-900 mb-6">Distribución de Pautas por Región</h3>
        {loading ? (
          <div className="h-48 flex items-center justify-center text-slate-400 text-sm font-medium">
            <span className="animate-spin material-symbols-outlined mr-2">autorenew</span> Cargando datos…
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-slate-400 text-sm font-medium">
            No hay datos para mostrar
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
            <div className="relative w-48 h-48">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="pautas"
                    nameKey="nombre"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="85%"
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {chartData.map((d, i) => (
                      <Cell key={d.nombre} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
                    formatter={(value, name) => [`${value} pautas`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-slate-900">{totalPautasChart}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Pautas</span>
              </div>
            </div>
            <div className="space-y-3">
              {chartData.map((d, i) => (
                <div key={d.nombre} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{d.nombre}</p>
                    <p className="text-xs text-slate-500">
                      {d.pautas} pauta{d.pautas !== 1 ? 's' : ''}
                      {totalPautasChart > 0 ? ` (${((d.pautas / totalPautasChart) * 100).toFixed(1)}%)` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
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
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-slate-400 font-medium">
                    <span className="animate-spin material-symbols-outlined align-middle mr-2">autorenew</span>
                    Cargando…
                  </td>
                </tr>
              ) : listData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-slate-400 font-medium">
                    No se encontraron pautas con los filtros seleccionados
                  </td>
                </tr>
              ) : (
                listData.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-primary">{r.numero_ot}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{r.cliente_nombre || '—'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{r.marca || '—'}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">
                        {r.region || 'Sin región'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{r.emisora || '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${ESTADO_STYLE[r.estado] || 'bg-slate-100 text-slate-500'}`}>
                        {ESTADO_LABEL[r.estado] || r.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{fmt(r.monto_ot)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/30 flex justify-between items-center border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Mostrando <span className="font-bold">{listData.length}</span> de <span className="font-bold">{totalCount}</span> pautas
          </p>
        </div>
      </section>
    </>
  );
}
