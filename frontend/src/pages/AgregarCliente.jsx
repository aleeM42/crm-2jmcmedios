// ==============================================
// AgregarCliente.jsx — Formulario Agregar Cliente
// ==============================================
import { Link } from 'react-router-dom';

function AgregarCliente() {
  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <div>
          <nav className="flex text-[10px] font-bold text-slate-400 mb-1 gap-2 uppercase tracking-[0.1em]">
            <Link to="/clientes" className="hover:text-primary transition-colors">Clientes</Link>
            <span>/</span>
            <span className="text-slate-600">Agregar Cliente</span>
          </nav>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Agregar Cliente</h2>
        </div>
        <div className="flex gap-4">
          <Link to="/clientes" className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all">Cancelar</Link>
          <button className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all">Guardar</button>
        </div>
      </header>

      <form className="space-y-8">
        {/* Vinculación */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
            <span className="material-symbols-outlined text-primary">link</span>
            <h3 className="text-lg font-bold font-display">Vinculación</h3>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">¿Es una sub-empresa de una empresa existente?</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="w-4 h-4 text-primary border-slate-300 focus:ring-primary" defaultChecked name="is_subcompany" type="radio" value="no" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">No</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="w-4 h-4 text-primary border-slate-300 focus:ring-primary" name="is_subcompany" type="radio" value="si" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">Sí</span>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Seleccionar Empresa Padre <span className="text-red-500">*</span></label>
                <select className="w-full rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                  <option value="">Buscar empresa...</option><option>Corporación Ejemplo, S.A.</option><option>Inversiones Globales 2024</option>
                </select>
              </div>
              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">verified</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Empresa Seleccionada</p>
                  <p className="text-sm font-bold text-slate-800">Corporación Ejemplo, S.A.</p>
                  <p className="text-xs text-slate-500 font-medium">RIF: J-40291834-5</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Datos de la Empresa */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
            <span className="material-symbols-outlined text-primary">corporate_fare</span>
            <h3 className="text-lg font-bold font-display">Datos de la Empresa (Padre)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tipo <span className="text-red-500">*</span></label>
              <select className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary"><option>Empresa</option><option>Sub Empresa</option></select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nombre <span className="text-red-500">*</span></label>
              <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Nombre Comercial" type="text" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Razón Social <span className="text-red-500">*</span></label>
              <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Nombre Legal Completo" type="text" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">RIF Fiscal <span className="text-red-500">*</span></label>
              <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="J-00000000-0" type="text" />
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Dirección <span className="text-red-500">*</span></label>
              <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Dirección completa del cliente" type="text" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Clasificación <span className="text-red-500">*</span></label>
              <select className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary"><option>Cliente Directo</option><option>Agencia</option></select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nombre de Agencia</label>
              <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary bg-slate-50" placeholder="Solo si clasificación es Agencia" type="text" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sector <span className="text-red-500">*</span></label>
              <select className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                <option>Seleccione sector</option><option>Salud</option><option>Alimentación</option><option>Telemática</option><option>Fabricación</option><option>Bancario</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Estado <span className="text-red-500">*</span></label>
              <select className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary"><option>Activo</option><option>Inactivo</option></select>
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Observaciones</label>
              <textarea className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Comentarios generales sobre la empresa..." rows="3"></textarea>
            </div>
          </div>
        </section>

        {/* Estructura Corporativa */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
            <span className="material-symbols-outlined text-accent-green">account_tree</span>
            <h3 className="text-lg font-bold font-display">Estructura Corporativa</h3>
          </div>
          <div className="space-y-8">
            {/* Sub-Empresas */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400 text-lg">domain_add</span>Sub-Empresas
                </h4>
                <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline" type="button">
                  <span className="material-symbols-outlined text-sm">add_circle</span>Agregar Sub-Empresa
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg relative hover:border-secondary transition-colors">
                  <button className="absolute top-2 right-2 text-slate-400 hover:text-red-500" type="button"><span className="material-symbols-outlined text-sm">close</span></button>
                  <p className="text-sm font-bold text-slate-800">Sede Regional Norte</p>
                  <p className="text-xs text-slate-500">Razón: Inversiones Norte C.A.</p>
                  <p className="text-xs text-slate-500 mt-1 italic">RIF: J-29384812-1</p>
                </div>
              </div>
            </div>
            {/* Marcas */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-lg">sell</span>Gestión de Marcas<span className="text-red-500">*</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">(mínimo 1 marca requerida)</p>
                </div>
                <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline" type="button">
                  <span className="material-symbols-outlined text-sm">add_circle</span>Agregar Marca
                </button>
              </div>
              <div className="flex flex-wrap gap-2 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-lg min-h-[60px]">
                {['MARCA_INTER_1', 'MARCA_INTER_2'].map((m) => (
                  <span key={m} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/30 text-primary border border-primary/20 gap-2">
                    {m}<button className="hover:text-red-600"><span className="material-symbols-outlined text-xs">close</span></button>
                  </span>
                ))}
              </div>
              <div className="bg-accent-light p-4 rounded-lg flex items-center gap-3 text-slate-800 text-sm font-medium mt-4">
                <span className="material-symbols-outlined text-primary">info</span>
                <span>Nota: Toda empresa (padre o sub-empresa) debe tener al menos una marca asociada.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact + Phones + Assignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
              <span className="material-symbols-outlined text-secondary">person_add</span>
              <h3 className="text-lg font-bold font-display">Contacto Principal</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Primer Nombre <span className="text-red-500">*</span></label>
                  <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" type="text" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Segundo Nombre</label>
                  <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" type="text" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Primer Apellido <span className="text-red-500">*</span></label>
                <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" type="text" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Departamento <span className="text-red-500">*</span></label>
                  <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Mercadeo" type="text" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Rol <span className="text-red-500">*</span></label>
                  <select className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                    <option>Decisor</option><option>Operativo</option><option>Facturación</option><option>Otro</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Correo <span className="text-red-500">*</span></label>
                <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="email@dominio.com" type="email" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fecha de Nacimiento</label>
                <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" type="date" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Anotaciones Especiales</label>
                <textarea className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Preferencias de contacto..." rows="2"></textarea>
              </div>
            </div>
          </section>

          <div className="space-y-8">
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
                <span className="material-symbols-outlined text-primary">call</span>
                <h3 className="text-lg font-bold font-display">Teléfonos</h3>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3 items-end">
                  <div className="w-24 flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Cód. Área <span className="text-red-500">*</span></label>
                    <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="0212" type="text" />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Número <span className="text-red-500">*</span></label>
                    <input className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="000 0000" type="text" />
                  </div>
                  <button className="bg-slate-50 border border-slate-200 p-3 rounded-lg hover:bg-slate-100 text-primary" type="button">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 mt-4" type="button">
                  <span className="material-symbols-outlined text-lg">add_call</span>Agregar Teléfono
                </button>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
                <span className="material-symbols-outlined text-accent-green">assignment_ind</span>
                <h3 className="text-lg font-bold font-display">Asignación</h3>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Vendedor Asignado <span className="text-red-500">*</span></label>
                <select className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                  <option value="">Seleccione un vendedor</option><option>Alejandro Pérez</option><option>Mariana Gómez</option><option>Roberto Silva</option>
                </select>
                <p className="text-[10px] text-slate-400 mt-1 italic">El cliente será visible en el pipeline de este usuario.</p>
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-end gap-4 py-8">
          <Link to="/clientes" className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">Cancelar Cambios</Link>
          <button className="px-12 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all" type="submit">Guardar Cliente</button>
        </div>
      </form>
    </>
  );
}

export default AgregarCliente;
