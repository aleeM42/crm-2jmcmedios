// ==============================================
// PautasCalendario.jsx — Vista Calendario de Pautas
// ==============================================
import { Link } from 'react-router-dom';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const EVENTS = {
  3: [{ label: 'Harina PAN', color: 'bg-primary' }],
  5: [{ label: 'Pepsi Black', color: 'bg-accent-green' }],
  8: [{ label: 'Harina PAN', color: 'bg-primary' }, { label: 'Nestlé', color: 'bg-secondary' }],
  12: [{ label: 'Pepsi Black', color: 'bg-accent-green' }],
  15: [{ label: 'Mercantil', color: 'bg-amber-500' }],
  18: [{ label: 'Harina PAN', color: 'bg-primary' }],
  22: [{ label: 'Pepsi Black', color: 'bg-accent-green' }, { label: 'Mercantil', color: 'bg-amber-500' }],
  25: [{ label: 'Harina PAN', color: 'bg-primary' }],
  28: [{ label: 'Nestlé', color: 'bg-secondary' }],
};

export default function PautasCalendario() {
  const today = 14;
  const daysInMonth = 31;
  const startDay = 5; // 0=Lun

  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 font-display">Pautas</h2>
          <p className="text-sm text-slate-400 mt-1">Vista Calendario</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1 bg-[#F4FAFB] rounded-lg border border-slate-200 p-1 shadow-sm">
            <Link to="/pautas" className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">Lista</Link>
            <Link to="/pautas/kanban" className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">Kanban</Link>
            <button className="px-3 py-1.5 rounded-md bg-primary text-white text-xs font-bold">Calendario</button>
          </div>
          <Link to="/pautas/agregar" className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[18px]">add</span> Nueva Pauta
          </Link>
        </div>
      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Pautas Activas', value: '24', icon: 'campaign', color: 'text-primary' },
          { label: 'En Transmisión', value: '18', icon: 'podcasts', color: 'text-accent-green' },
          { label: 'Cuñas Transmitidas Mes', value: '1,250', icon: 'graphic_eq', color: 'text-secondary' },
          { label: 'Monto Total OC', value: '$89,400', icon: 'payments', color: 'text-primary' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#F4FAFB] p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <span className={`material-symbols-outlined text-3xl ${kpi.color}`}>{kpi.icon}</span>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
              <p className="text-2xl font-black text-slate-900 font-display">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CALENDAR */}
      <div className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden overflow-x-auto">
        {/* Month Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-slate-400">chevron_left</span>
            </button>
            <h3 className="text-lg font-bold text-slate-800 font-display">Marzo 2026</h3>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </button>
          </div>
          <button className="text-xs font-bold text-primary hover:underline">Hoy</button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 border-b border-slate-100 min-w-[500px]">
          {DAYS.map((d) => (
            <div key={d} className="py-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 min-w-[500px]">
          {cells.map((day, i) => (
            <div
              key={i}
              className={`min-h-[100px] border-b border-r border-slate-50 p-2 ${day === today ? 'bg-primary/5' : ''} ${!day ? 'bg-slate-50/50' : ''}`}
            >
              {day && (
                <>
                  <span className={`text-xs font-bold ${day === today ? 'text-white bg-primary w-6 h-6 rounded-full flex items-center justify-center' : 'text-slate-500'}`}>
                    {day}
                  </span>
                  <div className="mt-1 space-y-1">
                    {(EVENTS[day] || []).map((evt, j) => (
                      <div key={j} className={`${evt.color} text-white text-[9px] font-bold px-1.5 py-0.5 rounded truncate`}>
                        {evt.label}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* UPCOMING SIDEBAR */}
      <div className="mt-8 bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-sm font-bold text-slate-800 font-display mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">upcoming</span>
          Próximas Pautas
        </h3>
        <div className="space-y-3">
          <Link to="/pautas/OT-2026-0034" className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="w-1 h-10 bg-primary rounded-full"></div>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-700">OT-2026-0034 — Alimentos Polar</p>
              <p className="text-[10px] text-slate-400">Avance: 850/1200 cuñas</p>
            </div>
            <div className="w-20 bg-slate-100 rounded-full h-1.5">
              <div className="bg-primary h-full rounded-full" style={{ width: '71%' }}></div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
