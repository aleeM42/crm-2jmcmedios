// ==============================================
// GastosLista.jsx — Listado de Gastos de Vendedores
// ==============================================
import { Link } from 'react-router-dom';

const GASTOS = [
  { id: 1, vendedor: 'Carlos Pérez', initials: 'CP', concepto: 'Gasolina - Ruta Capital', fecha: '2026-03-12', monto: '$45.00', categoria: 'Transporte' },
  { id: 2, vendedor: 'María González', initials: 'MG', concepto: 'Almuerzo con cliente', fecha: '2026-03-11', monto: '$28.50', categoria: 'Alimentación' },
  { id: 3, vendedor: 'Ana Torres', initials: 'AT', concepto: 'Peaje Autopista Regional', fecha: '2026-03-10', monto: '$12.00', categoria: 'Peaje' },
  { id: 4, vendedor: 'Luis Ramírez', initials: 'LR', concepto: 'Regalos Corporativos', fecha: '2026-03-09', monto: '$85.00', categoria: 'Regalos' },
  { id: 5, vendedor: 'Carlos Pérez', initials: 'CP', concepto: 'Estacionamiento Centro', fecha: '2026-03-08', monto: '$8.00', categoria: 'Estacionamiento' },
  { id: 6, vendedor: 'María González', initials: 'MG', concepto: 'Taxi - Reunión alterna', fecha: '2026-03-07', monto: '$22.00', categoria: 'Transporte' },
];

const CATEGORIA_STYLE = {
  Transporte: 'bg-blue-100 text-blue-600',
  Alimentación: 'bg-amber-100 text-amber-600',
  Peaje: 'bg-purple-100 text-purple-600',
  Estacionamiento: 'bg-slate-100 text-slate-600',
  Regalos: 'bg-pink-100 text-pink-600',
  Otros: 'bg-slate-100 text-slate-500',
};

export default function GastosLista() {
  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 font-display">Gastos</h2>
          <p className="text-sm text-slate-400 mt-1">Control de gastos de vendedores</p>
        </div>
        <Link to="/actividad-comercial/gastos/agregar" className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-[18px]">add</span> Nuevo Gasto
        </Link>
      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Gastos Mes', value: '$1,240', icon: 'payments', color: 'text-primary' },
          { label: 'Transporte', value: '$520', icon: 'directions_car', color: 'text-blue-500' },
          { label: 'Alimentación', value: '$380', icon: 'restaurant', color: 'text-amber-500' },
          { label: 'Otros Gastos', value: '$340', icon: 'receipt_long', color: 'text-slate-500' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <span className={`material-symbols-outlined text-3xl ${kpi.color}`}>{kpi.icon}</span>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
              <p className="text-2xl font-black text-slate-900 font-display">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input type="text" placeholder="Buscar gasto..." className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
        </div>
        <select className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
          <option>Todas las categorías</option>
          <option>Transporte</option>
          <option>Alimentación</option>
          <option>Peaje</option>
          <option>Estacionamiento</option>
          <option>Regalos</option>
          <option>Otros</option>
        </select>
        <select className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
          <option>Todos los vendedores</option>
          <option>Carlos Pérez</option>
          <option>María González</option>
          <option>Ana Torres</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Vendedor</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Concepto</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Fecha</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Monto</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6">Categoría</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {GASTOS.map((g) => (
              <tr key={g.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-black">{g.initials}</div>
                    <span className="font-medium text-slate-700">{g.vendedor}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-slate-600">{g.concepto}</td>
                <td className="py-3 px-6 text-slate-500">{g.fecha}</td>
                <td className="py-3 px-6 font-bold text-slate-800">{g.monto}</td>
                <td className="py-3 px-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${CATEGORIA_STYLE[g.categoria] || CATEGORIA_STYLE.Otros}`}>{g.categoria}</span>
                </td>
                <td className="py-3 px-6 text-right">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
