import { Link } from 'react-router-dom';

export default function DetalleEmisora() {
  return (
    <>
      {/* HEADER */}
      <header className="flex justify-between items-start mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <Link className="hover:text-primary transition-colors" to="/aliados">Aliados Comerciales</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-primary">La Romántica 88.9</span>
          </nav>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-800 font-display">Detalle de Aliado</h2>
            <span className="bg-accent-green/10 text-accent-green px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-accent-green/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green"></span>
              Activa
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-red-500/20 text-red-500 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors">
            <span className="material-symbols-outlined text-lg">delete</span>
            Eliminar
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-lg">edit</span>
            Editar
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-8 space-y-8">
          {/* INFORMACIÓN GENERAL */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">info</span>
              <h3 className="text-lg font-bold font-display">Información General</h3>
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Razón Social</p>
                <p className="text-sm font-semibold">Circuitos Románticos de Venezuela C.A.</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nombre Emisora</p>
                <p className="text-sm font-semibold">La Romántica 88.9 FM</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">RIF</p>
                <p className="text-sm font-semibold">J-30492834-1</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Frecuencia</p>
                <span className="inline-block mt-1 px-3 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-lg border border-primary/20">88.9 MHz</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Categoría</p>
                <p className="text-sm font-semibold">Música Romántica / Adulto Contemporáneo</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dirección</p>
                <p className="text-sm font-semibold">Av. Principal de Las Mercedes, Edif. Torre Las Mercedes, Piso 4.</p>
              </div>
            </div>
          </section>

          {/* COBERTURA & UBICACIÓN */}
          <div className="grid grid-cols-2 gap-8">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">radar</span>
                <h3 className="text-lg font-bold font-display">Cobertura</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Caracas', 'Los Teques', 'Guarenas', 'Guatire'].map((city) => (
                  <span key={city} className="px-3 py-1 border-2 border-primary/30 text-primary text-xs font-bold rounded-full">{city}</span>
                ))}
              </div>
            </section>
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <h3 className="text-lg font-bold font-display">Ubicación</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Región</span>
                  <span className="text-sm font-semibold">Capital</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Estado</span>
                  <span className="text-sm font-semibold">Miranda</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Ciudad</span>
                  <span className="text-sm font-semibold">Caracas</span>
                </div>
              </div>
            </section>
          </div>

          {/* PAUTAS ASOCIADAS */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">list_alt</span>
                <h3 className="text-lg font-bold font-display">Pautas Asociadas</h3>
              </div>
              <button className="text-primary text-xs font-bold hover:underline">Ver todas</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="pb-3">Nro OT</th>
                    <th className="pb-3">Cliente</th>
                    <th className="pb-3">Marca</th>
                    <th className="pb-3 text-center">Estado</th>
                    <th className="pb-3">Progreso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="text-sm">
                    <td className="py-4 font-bold text-primary">#OT-4522</td>
                    <td className="py-4 font-semibold">PepsiCo Venezuela</td>
                    <td className="py-4 font-semibold">Pepsi Black</td>
                    <td className="py-4 text-center">
                      <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Al Aire</span>
                    </td>
                    <td className="py-4 w-32">
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: '65%' }}></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-sm">
                    <td className="py-4 font-bold text-primary">#OT-4589</td>
                    <td className="py-4 font-semibold">Banco Mercantil</td>
                    <td className="py-4 font-semibold">Mercantil Móvil</td>
                    <td className="py-4 text-center">
                      <span className="bg-yellow-100 text-yellow-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Pendiente</span>
                    </td>
                    <td className="py-4 w-32">
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-slate-300 h-full" style={{ width: '10%' }}></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-sm">
                    <td className="py-4 font-bold text-primary">#OT-4601</td>
                    <td className="py-4 font-semibold">Farmatodo</td>
                    <td className="py-4 font-semibold">Día de la Madre</td>
                    <td className="py-4 text-center">
                      <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Completada</span>
                    </td>
                    <td className="py-4 w-32">
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-accent-green h-full" style={{ width: '100%' }}></div>
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
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">person</span>
              <h3 className="text-lg font-bold font-display">Contacto Principal</h3>
            </div>
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-3 flex items-center justify-center border-2 border-primary/20 text-white font-bold text-2xl tracking-tighter">CM</div>
              <h4 className="font-bold text-lg font-display">Carlos Mendoza</h4>
              <span className="inline-block mt-1 px-3 py-0.5 bg-accent-light/30 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest border border-primary/10">Decisor</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 text-lg">mail</span>
                <p className="text-sm font-semibold">c.mendoza@laromantica.com</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 text-lg">call</span>
                <p className="text-sm font-semibold">+58 (412) 555-0123</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl mt-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Notas de Contacto</p>
                <p className="text-xs italic text-slate-600">Prefiere llamadas en la mañana. No usa WhatsApp para pautas oficiales.</p>
              </div>
            </div>
          </section>

          {/* ESTADÍSTICAS */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <h3 className="text-lg font-bold font-display">Estadísticas</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cuñas Transmitidas</p>
                  <p className="text-2xl font-black text-slate-800">4,500</p>
                </div>
                <span className="material-symbols-outlined text-accent-green text-3xl">record_voice_over</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clientes Activos</p>
                  <p className="text-2xl font-black text-slate-800">8</p>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl">groups</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pautas Activas</p>
                  <p className="text-2xl font-black text-slate-800">5</p>
                </div>
                <span className="material-symbols-outlined text-secondary text-3xl">pending_actions</span>
              </div>
            </div>
          </section>

          {/* HISTORIAL */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">history</span>
              <h3 className="text-lg font-bold font-display">Historial</h3>
            </div>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative pl-8">
                <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-4 border-white z-10"></span>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Hoy, 10:45 AM</p>
                <p className="text-xs font-semibold mt-1">Se actualizó la tarifa de cuña prime-time.</p>
              </div>
              <div className="relative pl-8">
                <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center border-4 border-white z-10"></span>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Ayer, 3:20 PM</p>
                <p className="text-xs font-semibold mt-1">Carga masiva de certificados de transmisión.</p>
              </div>
              <div className="relative pl-8">
                <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center border-4 border-white z-10"></span>
                <p className="text-[10px] font-bold text-slate-400 uppercase">12 May 2024</p>
                <p className="text-xs font-semibold mt-1">Renovación de alianza comercial anual.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
