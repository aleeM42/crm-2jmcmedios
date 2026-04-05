// ==============================================
// PautasKanban.jsx — Vista Kanban de Pautas
// ==============================================
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api.js';
import { calcularProgresoPauta } from '../utils/pautasUtils';
import { getCurrentUser } from '../services/auth.service';

const COLUMNS_DEF = [
  { estado: 'programada', label: 'Programada', color: 'bg-blue-500' },
  { estado: 'en transmision', label: 'En transmisión', color: 'bg-primary' },
  { estado: 'finalizada', label: 'Finalizada', color: 'bg-accent-green' },
  { estado: 'suspendida', label: 'Suspendida', color: 'bg-amber-500' },
];

export default function PautasKanban() {
  const [pautas, setPautas] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = getCurrentUser();
  const canCreatePauta = ['Administrador', 'Director General', 'Gestor de Pautas'].includes(user?.rol);

  useEffect(() => {
    api.get('/pautas')
      .then(res => {
        if (res.success) setPautas(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Agrupar pautas por estado
  const columnsData = COLUMNS_DEF.map(col => ({
    ...col,
    items: pautas.filter(p => p.estado === col.estado)
  }));

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
            <button className="px-3 py-1.5 rounded-md bg-accent-green text-white text-xs font-bold">Kanban</button>
            <Link to="/pautas/calendario" className="px-3 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">Calendario</Link>
          </div>
          {canCreatePauta && (
            <Link to="/pautas/agregar" className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">add</span> Nueva Pauta
            </Link>
          )}
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 -mx-2 px-2">
        {loading ? (
          <div className="text-slate-500 py-10 w-full text-center">Cargando tablero kanban...</div>
        ) : (
          columnsData.map((col) => (
            <div key={col.estado} className="flex-shrink-0 w-72 sm:w-80">
              {/* Column header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
                <h3 className="text-sm font-bold text-slate-700">{col.label}</h3>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-bold">{col.items.length}</span>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {col.items.length === 0 ? (
                  <div className="text-center py-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-400">Sin pautas en este estado</div>
                ) : (
                  col.items.map((p) => {
                    const { progresoPorcentaje: progreso } = calcularProgresoPauta(p);
                    return (
                      <Link key={p.id} to={`/pautas/${p.id}`} className="block bg-[#F4FAFB] rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-primary">{p.numero_ot}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase capitalize">{p.tipo_compra}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-800 mb-1">{p.cliente_nombre || 'Sin cliente'}</p>
                        <p className="text-xs text-slate-500">{p.marca}</p>
                        {p.emisora_nombre && (
                          <p className="text-[10px] text-primary font-medium mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">radio</span>
                            {p.emisora_nombre}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">{p.cantidad_cunas} cuñas</span>
                          <span className="font-bold text-slate-700">${Number(p.monto_oc).toLocaleString()}</span>
                        </div>
                        <div className="mt-3">
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progreso}%` }}></div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 text-right">{progreso}%</p>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
