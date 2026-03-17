// ==============================================
// PautasKanban.jsx — Vista Kanban de Pautas
// ==============================================
import { Link } from 'react-router-dom';

const COLUMNS = [
  {
    estado: 'Programada',
    color: 'bg-blue-500',
    items: [
      { numero_OT: 'OT-002', cliente: 'PepsiCo Venezuela', marca: 'Pepsi', cantidad_cuñas: 240, monto_OC: '$18,000', tipo_compra: 'Agencia' },
      { numero_OT: 'OT-006', cliente: 'Nestlé', marca: 'Nescafé', cantidad_cuñas: 150, monto_OC: '$9,500', tipo_compra: 'Directo' },
    ],
  },
  {
    estado: 'En transmisión',
    color: 'bg-primary',
    items: [
      { numero_OT: 'OT-001', cliente: 'Alimentos Polar', marca: 'Harina PAN', cantidad_cuñas: 180, monto_OC: '$12,500', tipo_compra: 'Directo', progreso: 72 },
      { numero_OT: 'OT-004', cliente: 'Toyota Venezuela', marca: 'Hilux 2024', cantidad_cuñas: 320, monto_OC: '$22,000', tipo_compra: 'Agencia', progreso: 45 },
      { numero_OT: 'OT-007', cliente: 'Banesco', marca: 'Cuenta Joven', cantidad_cuñas: 100, monto_OC: '$7,200', tipo_compra: 'Directo', progreso: 60 },
    ],
  },
  {
    estado: 'Finalizada',
    color: 'bg-accent-green',
    items: [
      { numero_OT: 'OT-003', cliente: 'Banesco', marca: 'Cuenta Digital', cantidad_cuñas: 120, monto_OC: '$8,400', tipo_compra: 'Directo', progreso: 100 },
    ],
  },
  {
    estado: 'Cancelada',
    color: 'bg-red-500',
    items: [
      { numero_OT: 'OT-005', cliente: 'Nestlé', marca: 'Nescafé', cantidad_cuñas: 80, monto_OC: '$6,200', tipo_compra: 'Directo', progreso: 30 },
    ],
  },
];

export default function PautasKanban() {
  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 font-display">Pautas — Kanban</h2>
          <p className="text-sm text-slate-400 mt-1">Vista por estado</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1 bg-[#F4FAFB] rounded-lg border border-slate-200 p-1 shadow-sm">
            <Link to="/pautas" className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">Lista</Link>
            <button className="px-3 py-1.5 rounded-md bg-primary text-white text-xs font-bold">Kanban</button>
            <Link to="/pautas/calendario" className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">Calendario</Link>
          </div>
          <Link to="/pautas/agregar" className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[18px]">add</span> Nueva Pauta
          </Link>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 -mx-2 px-2">
        {COLUMNS.map((col) => (
          <div key={col.estado} className="flex-shrink-0 w-72 sm:w-80">
            {/* Column header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
              <h3 className="text-sm font-bold text-slate-700">{col.estado}</h3>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-bold">{col.items.length}</span>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {col.items.map((p) => (
                <Link key={p.numero_OT} to={`/pautas/${p.numero_OT}`} className="block bg-[#F4FAFB] rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-primary">{p.numero_OT}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{p.tipo_compra}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 mb-1">{p.cliente}</p>
                  <p className="text-xs text-slate-500 mb-3">{p.marca}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{p.cantidad_cuñas} cuñas</span>
                    <span className="font-bold text-slate-700">{p.monto_OC}</span>
                  </div>
                  {p.progreso !== undefined && (
                    <div className="mt-3">
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${p.progreso}%` }}></div>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 text-right">{p.progreso}%</p>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
