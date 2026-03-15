// ==============================================
// ActividadComercial.jsx — Registro de Visitas/Gastos
// ==============================================
import { Link } from 'react-router-dom';

const VISITAS = [
  { fecha: '24 Oct 2023', hora: '09:30 AM', vendedor: 'Carlos Mendoza', cliente: 'Supermercados Rey', tipo: 'Presencial', tipoClass: 'bg-primary/10 text-primary', objetivo: 'Presentación Plan de Medios Q4', efectiva: true, proximo: 'Enviar propuesta ajustada' },
  { fecha: '24 Oct 2023', hora: '11:15 AM', vendedor: 'Lucía Fernández', cliente: 'Banco General', tipo: 'Llamada', tipoClass: 'bg-accent-light/30 text-secondary', objetivo: 'Seguimiento a pauta digital', efectiva: false, proximo: 'Re-agendar para el lunes' },
  { fecha: '23 Oct 2023', hora: '02:00 PM', vendedor: 'Ricardo Silva', cliente: 'Toyota Panamá', tipo: 'Presencial', tipoClass: 'bg-primary/10 text-primary', objetivo: 'Cierre de contrato anual', efectiva: true, proximo: 'Solicitar firmas finales' },
  { fecha: '23 Oct 2023', hora: '04:30 PM', vendedor: 'Carlos Mendoza', cliente: 'Farmacias Arrocha', tipo: 'Llamada', tipoClass: 'bg-accent-light/30 text-secondary', objetivo: 'Primer contacto prospecto', efectiva: true, proximo: 'Enviar broshure corporativo' },
];

function ActividadComercial() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 font-display">Actividad Comercial</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700">
            <span className="material-symbols-outlined text-sm">table_view</span>Excel
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Visitas del Mes</p>
          <p className="text-3xl font-bold text-slate-900">48</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Visitas Efectivas</p>
              <p className="text-3xl font-bold text-slate-900">36</p>
            </div>
            <span className="bg-accent-green/10 text-accent-green px-2 py-1 rounded text-xs font-bold">75%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Gastos del Mes</p>
          <p className="text-3xl font-bold text-slate-900">$3,450</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Llamadas Registradas</p>
          <p className="text-3xl font-bold text-slate-900">22</p>
        </div>
      </div>

      {/* View toggle + filters */}
      <div className="space-y-6">
        <div className="flex items-center border-b border-slate-200 gap-8">
          <button className="pb-4 text-sm font-bold border-b-2 border-primary text-primary">Visitas</button>
          <button className="pb-4 text-sm font-bold border-b-2 border-transparent text-slate-400 hover:text-slate-600 transition-colors">Gastos</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Rango de Fecha</label>
            <input className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary" type="date" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Vendedor</label>
            <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary">
              <option>Todos los vendedores</option><option>Carlos Mendoza</option><option>Lucía Fernández</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Cliente</label>
            <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary">
              <option>Todos los clientes</option><option>Supermercados Rey</option><option>Banco General</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Tipo</label>
            <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary">
              <option>Cualquiera</option><option>Presencial</option><option>Llamada</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Efectiva</label>
            <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary">
              <option>Ambos</option><option>Sí</option><option>No</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 font-display">Registro de Visitas</h3>
            <div className="flex gap-3">
              <Link to="/actividad-comercial/agregar-gasto" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all border border-slate-200">Agregar Gasto</Link>
              <Link to="/actividad-comercial/agregar-visita" className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-bold hover:opacity-90 shadow-md transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-base">add</span>Agregar Visita
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Hora</th>
                  <th className="px-6 py-4">Vendedor</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Tipo</th>
                  <th className="px-6 py-4">Objetivo</th>
                  <th className="px-6 py-4 text-center">Efectiva</th>
                  <th className="px-6 py-4">Próximo Paso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {VISITAS.map((v, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">{v.fecha}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{v.hora}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">{v.vendedor}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{v.cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`${v.tipoClass} px-3 py-1 rounded-full text-[11px] font-bold uppercase`}>{v.tipo}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 line-clamp-1 max-w-[200px]">{v.objetivo}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`material-symbols-outlined ${v.efectiva ? 'text-accent-green' : 'text-red-400'}`}>
                        {v.efectiva ? 'check_circle' : 'cancel'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 italic whitespace-nowrap">{v.proximo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Mostrando 1 a 4 de 48 resultados</span>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActividadComercial;
