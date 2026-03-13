// ==============================================
// AgregarAliado.jsx — Formulario Agregar Aliado Comercial
// ==============================================
import { Link } from 'react-router-dom';

function AgregarAliado() {
  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
            <Link to="/aliados-comerciales" className="hover:text-primary transition-colors">Aliados Comerciales</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-900">Nuevo Aliado</span>
          </nav>
          <h2 className="text-3xl font-bold text-slate-900 font-display">Agregar Aliado Comercial</h2>
        </div>
        <div className="flex gap-3">
          <Link to="/aliados-comerciales" className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all">Cancelar</Link>
          <button className="px-8 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all">Guardar</button>
        </div>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <form className="p-8 space-y-12">
          {/* Section 1: Datos de la Emisora */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <span className="material-symbols-outlined text-primary">radio</span>
              <h3 className="text-lg font-bold font-display uppercase tracking-tight text-slate-800">Datos de la Emisora</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Razón Social<span className="text-red-500 ml-0.5">*</span></label>
                <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: Circuito Radiofonico Nacional C.A." type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nombre de la Emisora<span className="text-red-500 ml-0.5">*</span></label>
                <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: La Mega 107.3" type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">RIF<span className="text-red-500 ml-0.5">*</span></label>
                <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="J-12345678-9" type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Frecuencia<span className="text-red-500 ml-0.5">*</span></label>
                <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: 107.3 FM" type="text" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Dirección<span className="text-red-500 ml-0.5">*</span></label>
                <textarea className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Av. Principal de las Mercedes..." rows="2"></textarea>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Categoría<span className="text-red-500 ml-0.5">*</span></label>
                <select className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary">
                  <option>Seleccione una categoría</option><option>Musical</option><option>Informativa</option><option>Deportiva</option><option>Variedades</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Estado<span className="text-red-500 ml-0.5">*</span></label>
                <select className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary">
                  <option>Activo</option><option>Inactivo</option><option>Cerrado</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Cobertura */}
          <section>
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">broadcast_on_home</span>
                <h3 className="text-lg font-bold font-display uppercase tracking-tight text-slate-800">Cobertura</h3>
              </div>
              <button className="flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary transition-colors" type="button">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>Agregar Cobertura
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Caracas - Los Teques', 'Valles del Tuy', 'Guarenas - Guatire'].map((c) => (
                <div key={c} className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full text-primary text-sm font-semibold">
                  {c}
                  <button className="material-symbols-outlined text-[16px] hover:text-red-500" type="button">close</button>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Ubicación */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <h3 className="text-lg font-bold font-display uppercase tracking-tight text-slate-800">Ubicación</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Región<span className="text-red-500 ml-0.5">*</span></label>
                <select className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary">
                  <option>Central</option><option>Occidente</option><option>Oriente</option><option>Andina</option><option>Guayana</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Estado (Geográfico)</label>
                <select className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary">
                  <option>Miranda</option><option>Distrito Capital</option><option>Aragua</option><option>Carabobo</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Ciudad</label>
                <select className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary">
                  <option>Caracas</option><option>Los Teques</option><option>Guarenas</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 4: Contacto */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <span className="material-symbols-outlined text-primary">person</span>
              <h3 className="text-lg font-bold font-display uppercase tracking-tight text-slate-800">Contacto de la Emisora</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Primer Nombre<span className="text-red-500 ml-0.5">*</span></label>
                <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: Juan" type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Segundo Nombre</label>
                <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: Alberto" type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Primer Apellido<span className="text-red-500 ml-0.5">*</span></label>
                <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: Pérez" type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Departamento<span className="text-red-500 ml-0.5">*</span></label>
                <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Ej: Ventas" type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Correo Electrónico<span className="text-red-500 ml-0.5">*</span></label>
                <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="ejemplo@correo.com" type="email" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Rol en la Emisora<span className="text-red-500 ml-0.5">*</span></label>
                <select className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary">
                  <option>Gerente General</option><option>Director de Programación</option><option>Coordinador de Ventas</option><option>Técnico</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Fecha de Nacimiento</label>
                <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" type="date" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Anotaciones Especiales</label>
                <textarea className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="Información adicional sobre el contacto..." rows="1"></textarea>
              </div>
            </div>
          </section>

          {/* Section 5: Teléfonos */}
          <section>
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">call</span>
                <h3 className="text-lg font-bold font-display uppercase tracking-tight text-slate-800">Teléfonos</h3>
              </div>
              <button className="flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary transition-colors" type="button">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>Agregar Teléfono
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-1.5 col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Cód.*</label>
                  <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="0412" type="text" />
                </div>
                <div className="space-y-1.5 col-span-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Número de Teléfono<span className="text-red-500 ml-0.5">*</span></label>
                  <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="1234567" type="text" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid grid-cols-4 gap-4 flex-1">
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Cód.</label>
                    <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="0212" type="text" />
                  </div>
                  <div className="space-y-1.5 col-span-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Número Fijo</label>
                    <input className="w-full rounded-lg border-slate-200 bg-slate-50 p-2.5 text-sm focus:ring-primary focus:border-primary" placeholder="9876543" type="text" />
                  </div>
                </div>
                <button className="mb-1 text-slate-300 hover:text-red-500 transition-colors" type="button">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </section>

          {/* Action Footer */}
          <div className="pt-8 flex justify-end gap-4 border-t border-slate-100">
            <button className="px-6 py-2.5 text-slate-600 font-bold text-sm hover:underline" type="button">Restaurar formulario</button>
            <button className="px-10 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all" type="submit">Finalizar Registro</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AgregarAliado;
