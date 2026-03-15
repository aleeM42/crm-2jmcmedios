// ==============================================
// DetalleVendedor.jsx — Detalle de Vendedor
// ==============================================
import { Link } from 'react-router-dom';

function DetalleVendedor() {
  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <nav className="flex text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">
            <Link to="/equipo-ventas" className="hover:text-primary transition-colors">Equipo de Ventas</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">María González</span>
          </nav>
          <h2 className="text-3xl font-bold text-slate-800 font-display">Detalle de Vendedor</h2>
        </div>
        <div className="flex gap-3">
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">edit</span>Editar
          </button>
          <button className="border border-red-500 text-red-500 hover:bg-red-50 px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">delete</span>Eliminar
          </button>
        </div>
      </div>

      {/* PROFILE HEADER */}
      <div className="bg-white rounded-xl p-8 mb-8 shadow-sm border border-slate-100 flex items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold border-4 border-primary/20">MG</div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-2xl font-bold text-slate-800">María González</h3>
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">Vendedor</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">mail</span>m.gonzalez@2jmcmedios.com
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">call</span>+58 412-1234567
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">location_on</span>Caracas, Venezuela
            </div>
          </div>
        </div>
      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Meta Mensual</p>
            <h4 className="text-2xl font-bold text-slate-800">$15.000</h4>
          </div>
          <div className="relative flex items-center justify-center">
            <svg className="w-16 h-16">
              <circle className="text-slate-100" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
              <circle className="text-primary" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset="47.5" strokeLinecap="round" strokeWidth="4" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}></circle>
            </svg>
            <span className="absolute text-[10px] font-bold">73%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Pautas Cerradas</p>
          <div className="flex items-end gap-2">
            <h4 className="text-2xl font-bold text-slate-800">8</h4>
            <span className="text-accent-green text-xs font-bold mb-1">+2 este mes</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Visitas del Mes</p>
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold text-slate-800">24</h4>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Efectividad</p>
              <p className="text-sm font-bold text-primary">75%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Gastos del Mes</p>
          <h4 className="text-2xl font-bold text-slate-800">$890</h4>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-accent-green h-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      {/* TWO COLUMNS LAYOUT */}
      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-8 space-y-8">
          {/* Clientes Asignados */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h5 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">groups</span>Clientes Asignados
              </h5>
              <button className="text-primary text-xs font-bold uppercase hover:underline">Ver todos</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Empresa</th>
                    <th className="px-6 py-4">Sector</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4 text-right">Última Interacción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: 'Alimentos Polar', sector: 'Consumo Masivo', estado: 'Activo', badgeClass: 'bg-green-100 text-green-700', time: 'Hace 2 horas' },
                    { name: 'Farmatodo', sector: 'Retail', estado: 'Negociación', badgeClass: 'bg-primary/10 text-primary', time: 'Ayer' },
                    { name: 'Toyota Venezuela', sector: 'Automotriz', estado: 'Pendiente', badgeClass: 'bg-yellow-100 text-yellow-700', time: '12/10/2023' },
                  ].map((c) => (
                    <tr key={c.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">{c.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{c.sector}</td>
                      <td className="px-6 py-4"><span className={`px-2.5 py-1 ${c.badgeClass} text-[10px] font-bold rounded-full`}>{c.estado}</span></td>
                      <td className="px-6 py-4 text-sm text-slate-500 text-right">{c.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Histórico de Pautas */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h5 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history_edu</span>Histórico de Pautas
              </h5>
              <button className="text-primary text-xs font-bold uppercase hover:underline">Ver Reporte</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Nro OT</th>
                    <th className="px-6 py-4">Cliente</th>
                    <th className="px-6 py-4">Marca</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4 text-right">Monto OC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-primary">OT-2023-085</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">Nestlé</td>
                    <td className="px-6 py-4 text-sm text-slate-500">Savoy</td>
                    <td className="px-6 py-4"><span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">Facturado</span></td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700 text-right">$4.200,00</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-primary">OT-2023-091</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">PepsiCo</td>
                    <td className="px-6 py-4 text-sm text-slate-500">Gatorade</td>
                    <td className="px-6 py-4"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full">Ejecución</span></td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700 text-right">$2.850,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-4 space-y-8">
          {/* Información Personal */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h5 className="font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
              <span className="material-symbols-outlined text-primary">info</span>Información Personal
            </h5>
            <div className="space-y-4">
              {[
                { label: 'Cédula / ID', value: 'V-12.345.678' },
                { label: 'Fecha de Ingreso', value: '15 de Marzo, 2021' },
                { label: 'Supervisor Directo', value: 'Ricardo Mendez' },
                { label: 'Zona Asignada', value: 'Gran Caracas / Miranda' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-slate-700">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actividad Reciente */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h5 className="font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
              <span className="material-symbols-outlined text-primary">history</span>Actividad Reciente
            </h5>
            <div className="relative space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {[
                { icon: 'mail', color: 'primary', time: 'Hoy, 10:45 AM', text: <>Envió propuesta técnica a <span className="text-primary font-bold">Empresas Polar</span>.</> },
                { icon: 'event', color: 'accent-green', time: 'Ayer, 03:20 PM', text: <>Reunión presencial con Gerente de Mercadeo en <span className="text-primary font-bold">Farmatodo</span>.</> },
                { icon: 'task_alt', color: 'primary', time: '18 Oct, 09:00 AM', text: <>Cerró pauta publicitaria <span className="text-primary font-bold">savoy-85</span>.</> },
              ].map((e) => (
                <div key={e.time} className="relative pl-8">
                  <span className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-${e.color}/20 flex items-center justify-center`}>
                    <span className={`material-symbols-outlined text-${e.color} text-xs font-bold`}>{e.icon}</span>
                  </span>
                  <p className="text-xs text-slate-400 font-bold mb-0.5">{e.time}</p>
                  <p className="text-sm text-slate-700 font-medium leading-tight">{e.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen de Gastos */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h5 className="font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
              <span className="material-symbols-outlined text-primary">pie_chart</span>Resumen de Gastos
            </h5>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 relative flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle className="text-slate-100" cx="18" cy="18" fill="transparent" r="16" stroke="currentColor" strokeWidth="4"></circle>
                  <circle className="text-primary" cx="18" cy="18" fill="transparent" r="16" stroke="currentColor" strokeDasharray="60, 100" strokeLinecap="round" strokeWidth="4"></circle>
                  <circle className="text-accent-green" cx="18" cy="18" fill="transparent" r="16" stroke="currentColor" strokeDasharray="25, 100" strokeDashoffset="-60" strokeLinecap="round" strokeWidth="4"></circle>
                  <circle className="text-accent-light" cx="18" cy="18" fill="transparent" r="16" stroke="currentColor" strokeDasharray="15, 100" strokeDashoffset="-85" strokeLinecap="round" strokeWidth="4"></circle>
                </svg>
                <div className="absolute text-[10px] font-bold text-slate-400">OCT</div>
              </div>
              <div className="flex-1 space-y-2">
                {[
                  { color: 'bg-primary', label: 'Transporte', value: '$534' },
                  { color: 'bg-accent-green', label: 'Alimentación', value: '$222' },
                  { color: 'bg-accent-light', label: 'Estacionam.', value: '$134' },
                ].map((g) => (
                  <div key={g.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${g.color}`}></span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{g.label}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">{g.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetalleVendedor;
