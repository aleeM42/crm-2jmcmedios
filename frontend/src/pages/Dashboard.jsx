// ==============================================
// Dashboard.jsx — Panel General 
// ==============================================
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth.service.js';
import api from '../services/api.js';
import { toast } from 'sonner';

const ESTADO_COLORS = {
  // Estados de pauta
  'programada': '#A1DEE5',
  'en transmision': '#16B1B8',
  'suspendida': '#F59E0B',
  'finalizada': '#8DC63F',
  // Etapas del Pipeline (OPORTUNIDADES)
  'Contacto inicial': '#A1DEE5',
  'Por firmar': '#16B1B8',
  'Negociado': '#8DC63F',
};

function Dashboard() {
  const navigate = useNavigate();
  const [metricas, setMetricas] = useState({
    totalClientes: 0,
    totalVentas: 0,
    pautasEnTransmision: 0,
    totalEmisoras: 0,
    variacionVentas: null,
    pipeline: [],
    ingresosMensuales: [],
    topClientes: [],
  });

  const user = getCurrentUser();
  const usuarioLocal = {
    nombre: user ? (`${user.primer_nombre || ''} ${user.primer_apellido || ''}`.trim() || user.nombre_usuario || 'Usuario') : '',
    rol: user?.rol || 'Rol no definido',
    inicial: user?.primer_nombre ? user.primer_nombre.charAt(0).toUpperCase() : (user?.nombre_usuario ? user.nombre_usuario.charAt(0).toUpperCase() : 'U')
  };

  useEffect(() => {
    if (user?.rol === 'Gestor de Pautas') {
      navigate('/pautas', { replace: true });
      return;
    }

    api.get('/dashboard/resumen')
      .then((res) => { if (res.success) setMetricas(res.data); })
      .catch(() => { });

    // Cargar notificaciones
    api.get('/notificaciones')
      .then((res) => {
        if (res.success && res.data) {
          const notifs = res.data;
          notifs.forEach((notif, idx) => {
            setTimeout(() => {
              if (notif.tipo === 'CUMPLEAÑOS') {
                toast.success(notif.titulo, { description: notif.mensaje, icon: '🎂' });
              } else if (notif.tipo === 'INACTIVO' || notif.tipo === 'SIN_VISITAS') {
                toast.warning(notif.titulo, { description: notif.mensaje });
              } else if (notif.tipo === 'PAUTA_VENCIMIENTO') {
                toast.error(notif.titulo, { description: notif.mensaje });
              } else {
                toast.info(notif.titulo, { description: notif.mensaje });
              }
            }, idx * 1000); // 1s staggered
          });
        }
      })
      .catch(() => {});

  }, [navigate]);

  return (
    <>
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-800">Dashboard General</h2>
          <p className="text-slate-500 text-sm mt-1">Resumen de métricas y rendimiento comercial</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[28px]">notifications</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">{usuarioLocal.nombre}</p>
              <p className="text-xs text-slate-500">{usuarioLocal.rol}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-primary/20 flex-shrink-0">
              <span className="text-white font-bold text-sm">{usuarioLocal.inicial}</span>
            </div>
          </div>
        </div>
      </header>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Ingresos Totales</p>
            <h3 className="text-2xl font-bold text-slate-900">${metricas.totalVentas.toLocaleString()}</h3>
            {metricas.variacionVentas !== null && (
              <div className={`flex items-center gap-1 mt-2 ${metricas.variacionVentas >= 0 ? 'text-primary' : 'text-red-500'}`}>
                <span className="material-symbols-outlined text-sm">{metricas.variacionVentas >= 0 ? 'trending_up' : 'trending_down'}</span>
                <span className="text-xs font-bold">{metricas.variacionVentas}% vs mes anterior</span>
              </div>
            )}
          </div>
          <div className="p-2 bg-primary/10 rounded-lg">
            <span className="material-symbols-outlined text-primary">payments</span>
          </div>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Clientes Activos</p>
            <h3 className="text-2xl font-bold text-slate-900">{metricas.totalClientes}</h3>
            <div className="flex items-center gap-1 mt-2 text-accent-green">
              <span className="material-symbols-outlined text-sm">group</span>
              <span className="text-xs font-bold">Registrados</span>
            </div>
          </div>
          <div className="p-2 bg-accent-green/10 rounded-lg">
            <span className="material-symbols-outlined text-accent-green">person</span>
          </div>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Pautas en Transmisión</p>
            <h3 className="text-2xl font-bold text-slate-900">{metricas.pautasEnTransmision}</h3>
            <div className="flex items-center gap-1 mt-2 text-secondary">
              <span className="material-symbols-outlined text-sm">radio</span>
              <span className="text-xs font-bold">En vivo ahora</span>
            </div>
          </div>
          <div className="p-2 bg-secondary/10 rounded-lg">
            <span className="material-symbols-outlined text-secondary">sensors</span>
          </div>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Emisoras Activas</p>
            <h3 className="text-2xl font-bold text-slate-900">{metricas.totalEmisoras}</h3>
            <div className="flex items-center gap-1 mt-2 text-slate-400">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span className="text-xs font-bold">Cobertura Nacional</span>
            </div>
          </div>
          <div className="p-2 bg-slate-100 rounded-lg">
            <span className="material-symbols-outlined text-slate-500">cell_tower</span>
          </div>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Donut Chart — Pipeline de Ventas */}
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-bold font-display text-slate-900">Pipeline de Ventas</h4>
            <button className="material-symbols-outlined text-slate-400">more_vert</button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 sm:h-[240px]">
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metricas.pipeline}
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {metricas.pipeline.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ESTADO_COLORS[entry.name] || '#94a3b8'} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}`}
                    contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-slate-900">{metricas.pipeline.reduce((s, i) => s + i.value, 0)}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total</span>
              </div>
            </div>
            <div className="space-y-4">
              {metricas.pipeline.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ESTADO_COLORS[item.name] || '#94a3b8' }}></div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium capitalize">{item.name}</p>
                    <p className="text-sm font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart — Ingresos Mensuales (Horizontal) */}
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-bold font-display text-slate-900">Ingresos Mensuales</h4>
            <select className="bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-500 py-1 pl-2 pr-8 cursor-pointer focus:ring-1 focus:ring-primary">
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metricas.ingresosMensuales} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIngresoDash" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#16B1B8" />
                    <stop offset="100%" stopColor="#55CCD3" />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value}k`, 'Ingresos']}
                />
                <Bar dataKey="value" fill="url(#colorIngresoDash)" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TOP CLIENTES TABLE */}
      <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h4 className="text-lg font-bold font-display text-slate-900">Top 5 Clientes por Inversión</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Inversión</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Pautas Activas</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Región</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Vendedor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {metricas.topClientes.map((c) => (
                <tr key={c.nombre} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400">business</span>
                      </div>
                      <span className="text-sm font-bold">{c.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">${c.inversion.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">{c.pautasActivas}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-[10px] font-bold bg-primary/10 text-primary rounded-full uppercase">{c.region || '—'}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{c.vendedor || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
