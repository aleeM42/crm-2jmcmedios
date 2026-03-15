// ==============================================
// PautasLista.jsx — Lista de Pautas con filtros
// ==============================================
import { Link } from 'react-router-dom';

const PAUTAS = [
  { ot: 'OT-2024-042', cliente: 'Alimentos Polar', marca: 'Harina PAN', emisoras: 12, inicio: '01/05/2024', fin: '31/05/2024', estado: 'EN TRANSMISIÓN', estadoClass: 'bg-accent-green/10 text-accent-green', dotClass: 'bg-accent-green', progW: 65, progColor: 'bg-primary', cunas: '455 / 700', monto: '$12,450.00' },
  { ot: 'OT-2024-048', cliente: 'Farmatodo', marca: 'Jornada de Salud', emisoras: 8, inicio: '15/05/2024', fin: '30/05/2024', estado: 'PROGRAMADA', estadoClass: 'bg-amber-100 text-amber-600', dotClass: 'bg-amber-600', progW: 0, progColor: 'bg-primary', cunas: '0 / 320', monto: '$4,800.00' },
  { ot: 'OT-2024-035', cliente: 'Empresas PMC', marca: 'Lanzamiento Corporativo', emisoras: 5, inicio: '01/04/2024', fin: '30/04/2024', estado: 'FINALIZADA', estadoClass: 'bg-slate-100 text-slate-500', dotClass: 'bg-slate-400', progW: 100, progColor: 'bg-slate-400', cunas: '200 / 200', monto: '$8,900.00' },
  { ot: 'OT-2024-045', cliente: 'Banesco', marca: 'Puntos de Venta', emisoras: 15, inicio: '20/05/2024', fin: '20/06/2024', estado: 'SUSPENDIDA', estadoClass: 'bg-red-50 text-red-500', dotClass: 'bg-red-500', progW: 12, progColor: 'bg-red-400', cunas: '54 / 450', monto: '$18,200.00' },
];

function PautasLista() {
  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 font-display">Pautas</h2>
        <div className="flex items-center gap-3">
          <Link to="/pautas/agregar" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all shadow-sm shadow-primary/20">
            <span className="material-symbols-outlined text-[20px]">add</span>Agregar Pauta
          </Link>
          <button className="bg-white border border-slate-200 text-slate-600 p-2.5 rounded-lg hover:bg-slate-50 transition-colors" title="Exportar PDF">
            <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
          </button>
          <button className="bg-white border border-slate-200 text-slate-600 p-2.5 rounded-lg hover:bg-slate-50 transition-colors" title="Exportar Excel">
            <span className="material-symbols-outlined text-[20px]">table_view</span>
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Pautas Activas</p>
          <p className="text-3xl font-bold text-slate-800">24</p>
          <p className="text-xs text-slate-400 mt-2">Mes actual</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-accent-green">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">En Transmisión</p>
          <p className="text-3xl font-bold text-slate-800">18</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="material-symbols-outlined text-accent-green text-sm">trending_up</span>
            <span className="text-xs text-accent-green font-medium">75% del total</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Cuñas Transmitidas</p>
          <p className="text-3xl font-bold text-slate-800">1,250</p>
          <p className="text-xs text-slate-400 mt-2">Acumulado mensual</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Monto Total OC</p>
          <p className="text-3xl font-bold text-slate-800">$89,400</p>
          <p className="text-xs text-primary font-medium mt-2">8 órdenes pendientes</p>
        </div>
      </div>

      {/* Filters + Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 mb-6 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button className="px-8 py-4 text-sm font-semibold border-b-2 border-primary text-primary bg-primary/5">Lista</button>
          <button className="px-8 py-4 text-sm font-semibold border-b-2 border-transparent text-slate-400 hover:text-slate-600 transition-colors">Kanban</button>
          <button className="px-8 py-4 text-sm font-semibold border-b-2 border-transparent text-slate-400 hover:text-slate-600 transition-colors">Calendario</button>
        </div>
        <div className="p-4 flex flex-wrap gap-4 items-center bg-slate-50/50">
          <div className="relative flex-1 min-w-[240px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Buscar por cliente, marca u OT..." type="text" />
          </div>
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-w-[140px]">
            <option>Estado</option><option>En transmisión</option><option>Programada</option><option>Suspendida</option><option>Finalizada</option>
          </select>
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-w-[140px]">
            <option>Cliente</option><option>Alimentos Polar</option><option>Farmatodo</option><option>Empresas PMC</option>
          </select>
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-w-[140px]">
            <option>Región</option><option>Gran Caracas</option><option>Occidente</option><option>Oriente</option><option>Centro</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
                <th className="px-6 py-4">Nro OT</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Marca</th>
                <th className="px-6 py-4">Emisoras</th>
                <th className="px-6 py-4">Vigencia</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Progreso</th>
                <th className="px-6 py-4 text-right">Monto OC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PAUTAS.map((p) => (
                <tr key={p.ot} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{p.ot}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">{p.cliente}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{p.marca}</td>
                  <td className="px-6 py-4"><span className="bg-accent-light/30 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">{p.emisoras} Emisoras</span></td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-800">{p.inicio}</span>
                      <span className="text-[10px] text-slate-400">{p.fin}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 ${p.estadoClass} px-3 py-1 rounded-full text-[10px] font-bold`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.dotClass}`}></span>{p.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 w-[140px]">
                    <div className="flex flex-col gap-1.5">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${p.progColor}`} style={{ width: `${p.progW}%` }}></div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{p.cunas} cuñas</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-slate-800">{p.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
          <p className="text-xs text-slate-500 font-medium">Mostrando 1 a 4 de 24 pautas</p>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:text-primary transition-all">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white text-xs font-bold transition-all">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white text-xs font-bold transition-all">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:text-primary transition-all">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PautasLista;
