import { Link } from 'react-router-dom';

export default function DetalleCliente() {
  return (
    <>
      {/* HEADER */}
      <header className="flex flex-col mb-8">
        <div className="flex items-center justify-between mb-2">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/clientes">Clientes</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">Alimentos Polar</span>
          </nav>
          <div className="flex items-center gap-2 px-3 py-1 bg-accent-green/10 text-accent-green rounded-full text-xs font-bold uppercase tracking-wide">
            <span className="w-1.5 h-1.5 bg-accent-green rounded-full mr-1"></span>
            Activo
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-900 font-display">Detalle de Cliente</h2>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-50 transition-colors rounded-lg text-sm font-bold font-display">Eliminar</button>
            <button className="px-6 py-2 bg-primary text-white hover:bg-primary/90 transition-shadow shadow-lg shadow-primary/20 rounded-lg text-sm font-bold font-display">Editar</button>
          </div>
        </div>
      </header>

      {/* KPI ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-slate-400 text-xs font-bold uppercase mb-1 tracking-wide">Pautas Activas</span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 font-display leading-none">5</span>
            <span className="text-primary text-sm font-bold mb-1 material-symbols-outlined">campaign</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-slate-400 text-xs font-bold uppercase mb-1 tracking-wide">Inversión Total</span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 font-display leading-none">$45,000</span>
            <span className="text-accent-green text-sm font-bold mb-1 material-symbols-outlined">payments</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-slate-400 text-xs font-bold uppercase mb-1 tracking-wide">Emisoras con Presencia</span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 font-display leading-none">12</span>
            <span className="text-secondary text-sm font-bold mb-1 material-symbols-outlined">radio</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-8 space-y-8">
          {/* INFORMACION GENERAL */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Información General
              </h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Tipo</p>
                <p className="text-sm font-semibold text-slate-700">Empresa</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Nombre</p>
                <p className="text-sm font-semibold text-slate-700">Alimentos Polar</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Razón Social</p>
                <p className="text-sm font-semibold text-slate-700">Alimentos Polar C.A.</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">RIF Fiscal</p>
                <p className="text-sm font-semibold text-slate-700">J-00041318-1</p>
              </div>
              <div className="space-y-1 col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Dirección</p>
                <p className="text-sm font-semibold text-slate-700">Av. Principal de Los Cortijos de Lourdes, Caracas.</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Clasificación</p>
                <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded uppercase">Tier A+</span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Sector</p>
                <p className="text-sm font-semibold text-slate-700">Alimentación</p>
              </div>
              <div className="space-y-1 col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Vendedor Asignado</p>
                <Link className="text-sm font-bold text-primary hover:underline flex items-center gap-1" to="#">
                  María González
                  <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                </Link>
              </div>
            </div>
          </section>

          {/* SUB-EMPRESAS Y MARCAS */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">corporate_fare</span>
                Sub-Empresas y Marcas
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Hierarchical Row 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="w-px h-full bg-slate-100"></div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 font-display">Distribuidora Polar Oriente</h4>
                      <p className="text-[10px] text-slate-400 font-medium">RIF: J-30459201-0 • Barcelona, Edo. Anzoátegui</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-accent-light/30 text-slate-600 text-[10px] font-bold rounded-lg border border-accent-light/50">Harina PAN</span>
                    <span className="px-2 py-1 bg-accent-light/30 text-slate-600 text-[10px] font-bold rounded-lg border border-accent-light/50">Mavesa</span>
                    <span className="px-2 py-1 bg-accent-light/30 text-slate-600 text-[10px] font-bold rounded-lg border border-accent-light/50">Toddy</span>
                  </div>
                </div>
              </div>
              {/* Hierarchical Row 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 font-display">Pepsi-Cola Venezuela</h4>
                      <p className="text-[10px] text-slate-400 font-medium">RIF: J-00012345-6 • Caracas, Miranda</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-accent-light/30 text-slate-600 text-[10px] font-bold rounded-lg border border-accent-light/50">Pepsi</span>
                    <span className="px-2 py-1 bg-accent-light/30 text-slate-600 text-[10px] font-bold rounded-lg border border-accent-light/50">Gatorade</span>
                    <span className="px-2 py-1 bg-accent-light/30 text-slate-600 text-[10px] font-bold rounded-lg border border-accent-light/50">7-Up</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PAUTAS ASOCIADAS */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                Pautas Asociadas
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
                    <th className="px-6 py-4">Nro OT</th>
                    <th className="px-6 py-4">Marca</th>
                    <th className="px-6 py-4">Emisoras</th>
                    <th className="px-6 py-4">Vigencia</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4 text-right">Progreso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-xs font-bold text-primary">OT-2023-45</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">Harina PAN</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">8</span>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-semibold text-slate-500">01/10 - 31/12</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-accent-green/10 text-accent-green text-[10px] font-black rounded uppercase">En Aire</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-1 bg-slate-100 rounded-full ml-auto">
                        <div className="w-3/4 h-full bg-accent-green rounded-full"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-xs font-bold text-primary">OT-2023-92</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">Pepsi</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">4</span>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-semibold text-slate-500">15/11 - 15/12</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded uppercase">Pendiente</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-1 bg-slate-100 rounded-full ml-auto">
                        <div className="w-0 h-full bg-primary rounded-full"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-4 space-y-8">
          {/* CONTACTO PRINCIPAL */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">contact_page</span>
                Contacto Principal
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-accent-light/20 flex items-center justify-center text-primary font-black text-xl font-display">RM</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 font-display">Ricardo Mendoza</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gerente de Mercadeo</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Correo</span>
                  <span className="text-xs font-semibold text-slate-700">r.mendoza@alimentos-polar.com</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Teléfono</span>
                  <span className="text-xs font-semibold text-slate-700">+58 412 123 4567</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Rol</span>
                  <div className="mt-1">
                    <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-black rounded uppercase">Decisor</span>
                  </div>
                </div>
                <div className="flex flex-col p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Anotaciones Especiales</span>
                  <p className="text-[10px] italic text-slate-500">Prefiere contacto vía correo electrónico antes de llamadas directas. Disponible solo lunes y miércoles.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACTOS ADICIONALES */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2 text-sm">
                Contactos Adicionales
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <div>
                  <p className="text-xs font-bold text-slate-700">Ana Silva</p>
                  <p className="text-[10px] text-slate-400">Coordinadora de Medios</p>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold rounded uppercase">Influenciador</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-700">Carlos Perez</p>
                  <p className="text-[10px] text-slate-400">Asistente Administrativo</p>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold rounded uppercase">Operativo</span>
              </div>
              <button className="w-full py-2 flex items-center justify-center gap-2 border border-dashed border-slate-200 hover:border-primary hover:text-primary transition-all rounded-lg text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                Agregar Contacto
              </button>
            </div>
          </section>

          {/* OBSERVACIONES & HISTORIAL */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display text-sm">Observaciones y Actividad</h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Notas Generales</label>
                <textarea
                  className="w-full h-24 p-3 text-xs bg-slate-50 border-none rounded-lg focus:ring-1 focus:ring-primary text-slate-600 resize-none"
                  placeholder="Escribir observaciones aquí..."
                  defaultValue="Cliente corporativo con alto volumen estacional en Q4."
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Historial Reciente</label>
                <div className="space-y-4 relative">
                  <div className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-100"></div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white bg-primary"></div>
                    <p className="text-[10px] font-bold text-slate-800">Reunión de Planificación</p>
                    <p className="text-[9px] text-slate-400">Hace 2 días • por María González</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white bg-accent-green"></div>
                    <p className="text-[10px] font-bold text-slate-800">Nueva OT Aprobada (Pepsi)</p>
                    <p className="text-[9px] text-slate-400">15 de Nov • Automático</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white bg-slate-300"></div>
                    <p className="text-[10px] font-bold text-slate-800">Envío de Tarifario 2024</p>
                    <p className="text-[9px] text-slate-400">10 de Nov • por Ricardo Mendoza</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
