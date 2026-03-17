// ==============================================
// PautasLista.jsx — Listado de Pautas Publicitarias
// ==============================================
import { Link } from 'react-router-dom';

const PAUTAS = [
  { numero_OT: 'OT-001', cliente: 'Alimentos Polar', marca: 'Harina PAN', monto_OC: '$12,500', monto_OT: '$11,800', tipo_compra: 'Directo', fecha_inicio: '2023-10-01', fecha_fin: '2023-12-15', estado: 'En transmisión', cantidad_cuñas: 180, costo_cuña: '$65', progreso: 72 },
  { numero_OT: 'OT-002', cliente: 'PepsiCo Venezuela', marca: 'Pepsi', monto_OC: '$18,000', monto_OT: '$17,200', tipo_compra: 'Agencia', fecha_inicio: '2023-11-01', fecha_fin: '2024-01-31', estado: 'Programada', cantidad_cuñas: 240, costo_cuña: '$72', progreso: 0 },
  { numero_OT: 'OT-003', cliente: 'Banesco', marca: 'Cuenta Digital', monto_OC: '$8,400', monto_OT: '$8,000', tipo_compra: 'Directo', fecha_inicio: '2023-09-01', fecha_fin: '2023-10-30', estado: 'Finalizada', cantidad_cuñas: 120, costo_cuña: '$68', progreso: 100 },
  { numero_OT: 'OT-004', cliente: 'Toyota Venezuela', marca: 'Hilux 2024', monto_OC: '$22,000', monto_OT: '$21,500', tipo_compra: 'Agencia', fecha_inicio: '2023-10-15', fecha_fin: '2024-02-28', estado: 'En transmisión', cantidad_cuñas: 320, costo_cuña: '$55', progreso: 45 },
  { numero_OT: 'OT-005', cliente: 'Nestlé', marca: 'Nescafé', monto_OC: '$6,200', monto_OT: '$5,800', tipo_compra: 'Directo', fecha_inicio: '2023-10-20', fecha_fin: '2023-11-30', estado: 'Cancelada', cantidad_cuñas: 80, costo_cuña: '$72', progreso: 30 },
];

const STATUS_STYLE = {
  'En transmisión': 'bg-primary/10 text-primary',
  'Programada': 'bg-blue-100 text-blue-600',
  'Finalizada': 'bg-accent-green/10 text-accent-green',
  'Cancelada': 'bg-red-100 text-red-500',
};

export default function PautasLista() {
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
            <button className="px-3 py-1.5 rounded-md bg-primary text-white text-xs font-bold">Lista</button>
            <Link to="/pautas/kanban" className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">Kanban</Link>
            <Link to="/pautas/calendario" className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">Calendario</Link>
          </div>
          <Link to="/pautas/agregar" className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex-1 sm:flex-initial justify-center">
            <span className="material-symbols-outlined text-[18px]">add</span> Nueva Pauta
          </Link>
        </div>
      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Pautas', value: '24', sub: 'activas este mes' },
          { label: 'En Transmisión', value: '12', dot: 'bg-primary' },
          { label: 'Monto OC Total', value: '$145K', sub: 'facturado' },
          { label: 'Monto OT Total', value: '$138K', sub: 'comprometido' },
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
          <input type="text" placeholder="Buscar por OT, cliente, marca..." className="w-full h-10 pl-10 pr-4 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none" />
        </div>
        <select className="h-10 px-4 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-primary outline-none">
          <option>Estado</option><option>En transmisión</option><option>Programada</option><option>Finalizada</option><option>Cancelada</option>
        </select>
        <select className="h-10 px-4 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-primary outline-none">
          <option>Tipo de compra</option><option>Directo</option><option>Agencia</option>
        </select>
        <select className="h-10 px-4 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-primary outline-none">
          <option>Vendedor</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Nro OT</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Cliente</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Marca</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Tipo Compra</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Vigencia</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Estado</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Cuñas</th>
                <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-5">Progreso</th>
                <th className="text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Monto OC</th>
              </tr>
            </thead>
            <tbody>
              {PAUTAS.map((p) => (
                <tr key={p.numero_OT} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-6">
                    <Link to={`/pautas/${p.numero_OT}`} className="font-bold text-primary hover:underline">{p.numero_OT}</Link>
                  </td>
                  <td className="py-3 px-5 font-medium text-slate-700">{p.cliente}</td>
                  <td className="py-3 px-5 text-slate-600">{p.marca}</td>
                  <td className="py-3 px-5 text-slate-600">{p.tipo_compra}</td>
                  <td className="py-3 px-5 text-xs text-slate-500 whitespace-nowrap">{p.fecha_inicio} → {p.fecha_fin}</td>
                  <td className="py-3 px-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${STATUS_STYLE[p.estado] || 'bg-slate-100 text-slate-500'}`}>{p.estado}</span>
                  </td>
                  <td className="py-3 px-5 text-slate-600">{p.cantidad_cuñas}</td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${p.progreso}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-600 w-8">{p.progreso}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-right font-bold text-slate-800">{p.monto_OC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">Mostrando 1 a 5 de 24 resultados</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-xs font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
          </div>
        </div>
      </div>
    </>
  );
}
