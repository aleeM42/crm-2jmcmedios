// ==============================================
// PautasCalendario.jsx — Vista Calendario de Pautas
// ==============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function PautasCalendario() {
  const [pautas, setPautas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPautas = async () => {
      try {
        const response = await api.get('/pautas');
        if (response.data.success) {
          setPautas(response.data.data);
        }
      } catch (error) {
        console.error('Error al cargar pautas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPautas();
  }, []);

  const currentDate = new Date();
  const today = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0(Sun) - 6(Sat)
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // 0(Mon) - 6(Sun)
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const EVENTS = {};
  pautas.forEach(pauta => {
    if (pauta.fecha_inicio) {
      // Ajustar la fecha asegurando que usamos la fecha local para no desfasarnos por timezone si la hora es 00:00:00 UTC
      const [year, month, day] = pauta.fecha_inicio.split('T')[0].split('-');
      const pDate = new Date(year, month - 1, day);
      
      if (pDate.getMonth() === currentMonth && pDate.getFullYear() === currentYear) {
        const pDay = pDate.getDate();
        if (!EVENTS[pDay]) EVENTS[pDay] = [];
        
        let color = 'bg-slate-400';
        if (pauta.estado === 'programada') color = 'bg-primary';
        if (pauta.estado === 'en transmision') color = 'bg-accent-green';
        if (pauta.estado === 'finalizada') color = 'bg-secondary';
        if (pauta.estado === 'suspendida') color = 'bg-amber-500';

        EVENTS[pDay].push({ label: pauta.cliente_nombre || `OT-${pauta.numero_ot}`, color });
      }
    }
  });

  const pautasActivas = pautas.filter(p => !['finalizada', 'suspendida'].includes(p.estado)).length;
  const enTransmision = pautas.filter(p => p.estado === 'en transmision').length;
  const montoTotal = pautas.reduce((acc, curr) => acc + Number(curr.monto_ot), 0);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Próximas pautas (las siguientes 3)
  const proximasPautas = [...pautas]
    .filter(p => p.estado === 'programada' && p.fecha_inicio)
    .sort((a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio))
    .slice(0, 3);

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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin"></div>
        </div>
      ) : (
        <>
          {/* KPI ROW */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Pautas Activas', value: pautasActivas.toString(), icon: 'campaign', color: 'text-primary' },
              { label: 'En Transmisión', value: enTransmision.toString(), icon: 'podcasts', color: 'text-accent-green' },
              { label: 'Pautas Totales', value: pautas.length.toString(), icon: 'graphic_eq', color: 'text-secondary' },
              { label: 'Monto Total OC', value: formatCurrency(montoTotal), icon: 'payments', color: 'text-primary' },
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
                <button disabled className="w-8 h-8 flex items-center justify-center rounded-lg opacity-50 cursor-not-allowed transition-colors">
                  <span className="material-symbols-outlined text-slate-400">chevron_left</span>
                </button>
                <h3 className="text-lg font-bold text-slate-800 font-display capitalize">{monthNames[currentMonth]} {currentYear}</h3>
                <button disabled className="w-8 h-8 flex items-center justify-center rounded-lg opacity-50 cursor-not-allowed transition-colors">
                  <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                </button>
              </div>
              <button className="text-xs font-bold text-primary hover:underline">Hoy: {today}</button>
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
                          <div key={j} className={`${evt.color} text-white text-[9px] font-bold px-1.5 py-0.5 rounded truncate`} title={evt.label}>
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
            
            {proximasPautas.length > 0 ? (
              <div className="space-y-3">
                {proximasPautas.map((pauta) => (
                  <Link key={pauta.id} to={`/pautas/${pauta.id}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="w-1 h-10 bg-primary rounded-full"></div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-bold text-slate-700 truncate">OT-{pauta.numero_ot} — {pauta.cliente_nombre}</p>
                      <p className="text-[10px] text-slate-400 truncate">
                        Inicio: {new Date(pauta.fecha_inicio).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-slate-200 mb-2">event_available</span>
                <p className="text-sm font-bold text-slate-500">No hay pautas programadas</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

