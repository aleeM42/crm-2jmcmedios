// ==============================================
// AgregarVendedor.jsx — Formulario Nuevo Vendedor
// ==============================================
import { Link } from 'react-router-dom';

function AgregarVendedor() {
  return (
    <>
      {/* HEADER */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <nav className="flex items-center text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-[0.1em]">
            <Link to="/equipo-ventas" className="hover:text-primary transition-colors">Equipo de Ventas</Link>
            <span className="material-symbols-outlined text-[14px] mx-2">chevron_right</span>
            <span className="text-slate-600">Nuevo Vendedor</span>
          </nav>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Agregar Vendedor</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/equipo-ventas" className="px-6 py-2.5 rounded-full border border-slate-300 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all">
            Cancelar
          </Link>
          <button className="px-8 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
            Guardar
          </button>
        </div>
      </header>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <form className="p-10">
          <div className="space-y-12">
            {/* Datos Personales */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined font-bold">person</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Datos Personales</h3>
                  <p className="text-xs text-slate-400 font-medium italic">Entidad: Vendedor</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">Nombre<span className="text-red-500 ml-1">*</span></label>
                  <input className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm" placeholder="Ej: Juan" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Segundo Nombre <span className="text-slate-400 font-normal lowercase tracking-normal">(opcional)</span>
                  </label>
                  <input className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm" placeholder="Ej: Alberto" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">Apellido<span className="text-red-500 ml-1">*</span></label>
                  <input className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm" placeholder="Ej: Pérez" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">Segundo Apellido<span className="text-red-500 ml-1">*</span></label>
                  <input className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm" placeholder="Ej: Rodríguez" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">Correo Electrónico<span className="text-red-500 ml-1">*</span></label>
                  <input className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm" placeholder="juan.perez@ejemplo.com" type="email" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">Meta Mensual ($)<span className="text-red-500 ml-1">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary pl-9 pr-4 py-3 text-sm" placeholder="0.00" step="0.01" type="number" />
                  </div>
                </div>
                <div className="md:col-span-2 pt-4">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase mb-4">Tipo de Perfil</label>
                  <div className="flex gap-10">
                    <label className="flex items-center cursor-pointer group">
                      <input className="w-5 h-5 text-primary border-slate-300 focus:ring-primary transition-all" defaultChecked name="tipo_vendedor" type="radio" value="vendedor" />
                      <span className="ml-3 text-sm font-semibold text-slate-600 group-hover:text-primary">Vendedor</span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input className="w-5 h-5 text-primary border-slate-300 focus:ring-primary transition-all" name="tipo_vendedor" type="radio" value="intermediario" />
                      <span className="ml-3 text-sm font-semibold text-slate-600 group-hover:text-primary">Intermediario</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Teléfonos */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent-green/10 text-accent-green flex items-center justify-center">
                  <span className="material-symbols-outlined font-bold">call</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Teléfonos</h3>
                  <p className="text-xs text-slate-400 font-medium italic">Entidad: Teléfono</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-end">
                  <div className="w-32 space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase">Cód. Área<span className="text-red-500 ml-1">*</span></label>
                    <input className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm text-center" maxLength="4" placeholder="0412" type="text" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase">Número<span className="text-red-500 ml-1">*</span></label>
                    <input className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm" placeholder="1234567" type="text" />
                  </div>
                  <button className="p-3 text-slate-300 hover:text-red-400 transition-colors" type="button">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              <button className="mt-6 flex items-center text-primary font-bold text-sm hover:text-secondary transition-all" type="button">
                <span className="material-symbols-outlined mr-1">add_circle</span>
                Agregar Teléfono
              </button>
            </section>

            {/* Credenciales */}
            <section className="bg-slate-50/50 -mx-10 px-10 py-10 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center">
                  <span className="material-symbols-outlined font-bold">key</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Credenciales de Acceso</h3>
                  <p className="text-xs text-slate-400 font-medium italic">Entidad: Usuario</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">Nombre de Cuenta<span className="text-red-500 ml-1">*</span></label>
                  <input className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm bg-white" placeholder="Ej: jperez2jmc" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">Contraseña<span className="text-red-500 ml-1">*</span></label>
                  <div className="relative">
                    <input className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm bg-white" placeholder="••••••••" type="password" />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" type="button">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* FOOTER */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[12px] text-slate-400 font-medium">
              <span className="text-red-500 font-bold">*</span> Campos obligatorios para el registro en el sistema
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors" type="reset">Limpiar</button>
              <button className="px-10 py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-secondary transition-all flex items-center" type="submit">
                <span className="material-symbols-outlined mr-2">save_as</span>
                Finalizar Registro
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* INFO CARDS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/60 border border-slate-200 rounded-2xl flex items-start gap-4">
          <div className="text-accent-green"><span className="material-symbols-outlined">shield_person</span></div>
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-tight mb-1">Privacidad</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">Los datos personales están protegidos bajo las políticas de seguridad de la empresa.</p>
          </div>
        </div>
        <div className="p-6 bg-white/60 border border-slate-200 rounded-2xl flex items-start gap-4">
          <div className="text-primary"><span className="material-symbols-outlined">info</span></div>
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-tight mb-1">Asignación</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">Al guardar, el usuario recibirá un correo de bienvenida con sus accesos.</p>
          </div>
        </div>
        <div className="p-6 bg-white/60 border border-slate-200 rounded-2xl flex items-start gap-4">
          <div className="text-secondary"><span className="material-symbols-outlined">monitoring</span></div>
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-tight mb-1">Metas</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">Las metas configuradas se utilizarán para el cálculo de comisiones mensuales.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgregarVendedor;
