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

  // Estado para la navegación de meses
  const actualDate = new Date();
  const [viewDate, setViewDate] = useState(new Date(actualDate.getFullYear(), actualDate.getMonth(), 1));

  useEffect(() => {
    const fetchPautas = async () => {
      try {
        const response = await api.get('/pautas');
        if (response.success) {
          setPautas(response.data);
        }
      } catch (error) {
        console.error('Error al cargar pautas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPautas();
  }, []);

  const today = actualDate.getDate();
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const isActualMonth = actualDate.getMonth() === currentMonth && actualDate.getFullYear() === currentYear;

  const handlePrevMonth = () => setViewDate(new Date(currentYear, currentMonth - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(currentYear, currentMonth + 1, 1));
  
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
      // Ajustar la fecha asegurando que usamos la fecha local para no desfasarnos por timezone
      const [sYear, sMonth, sDay] = pauta.fecha_inicio.split('T')[0].split('-');
      const startDate = new Date(sYear, sMonth - 1, sDay);
      
      let endDate = startDate;
      if (pauta.fecha_fin) {
        const [eYear, eMonth, eDay] = pauta.fecha_fin.split('T')[0].split('-');
        endDate = new Date(eYear, eMonth - 1, eDay);
      }
      
      let color = 'bg-slate-400';
      if (pauta.tipo_compra === 'rotativa') color = 'bg-[#55CCD3]';
      if (pauta.tipo_compra === 'en vivo') color = 'bg-[#8DC63F]';

      const label = pauta.cliente_nombre ? `OT-${pauta.numero_ot} - ${pauta.cliente_nombre.substring(0, 10)}${pauta.cliente_nombre.length > 10 ? '...' : ''}` : `OT-${pauta.numero_ot}`;

      // Recorrer los días desde inicio hasta fin
      let currentDate = new Date(startDate);
      // Solo iterar si las fechas son coherentes
      if (startDate <= endDate) {
        while (currentDate <= endDate) {
          if (currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear) {
            const pDay = currentDate.getDate();
            if (!EVENTS[pDay]) EVENTS[pDay] = [];
            
            let displayLabel = label;
            if (startDate.getTime() !== endDate.getTime()) {
              if (currentDate.getTime() === startDate.getTime()) {
                displayLabel = `(Inicio) ${label}`;
              } else if (currentDate.getTime() === endDate.getTime()) {
                displayLabel = `(Fin) ${label}`;
              }
            }
            EVENTS[pDay].push({ label: displayLabel, color });
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
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
                <button onClick={handlePrevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                  <span className="material-symbols-outlined text-slate-700">chevron_left</span>
                </button>
                <h3 className="text-lg font-bold text-slate-800 font-display capitalize min-w-[150px] text-center">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                <button onClick={handleNextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                  <span className="material-symbols-outlined text-slate-700">chevron_right</span>
                </button>
              </div>
              <button onClick={() => setViewDate(new Date(actualDate.getFullYear(), actualDate.getMonth(), 1))} className="text-xs font-bold text-primary hover:underline">
                Hoy: {actualDate.getDate()} {monthNames[actualDate.getMonth()].slice(0, 3)}
              </button>
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
                  className={`min-h-[100px] border-b border-r border-slate-50 p-2 ${day === today && isActualMonth ? 'bg-primary/5' : ''} ${!day ? 'bg-slate-50/50' : ''}`}
                >
                  {day && (
                    <>
                      <span className={`text-xs font-bold ${day === today && isActualMonth ? 'text-white bg-primary w-6 h-6 rounded-full flex items-center justify-center' : 'text-slate-500'}`}>
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
                    <div className={`w-1 h-10 ${pauta.tipo_compra === 'en vivo' ? 'bg-[#8DC63F]' : 'bg-[#55CCD3]'} rounded-full`}></div>
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

