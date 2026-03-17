// ==============================================
// AgregarVisita.jsx — Formulario para Agregar Visita
// ==============================================
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AgregarVisita() {
  const [tipoVisitado, setTipoVisitado] = useState('');
  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/actividad-comercial">Actividad Comercial</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">Nueva Visita</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 font-display">Registrar Visita</h2>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link to="/actividad-comercial" className="flex-1 sm:flex-initial text-center px-6 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Cancelar</Link>
          <button className="flex-1 sm:flex-initial px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Guardar Visita</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {/* DATOS DE LA VISITA */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">location_on</span>
              Datos de la Visita
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Vendedor</label>
                <select name="vendedor_id" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option>Seleccionar vendedor...</option>
                  <option>María González</option>
                  <option>Carlos Pérez</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Visitado<span className="text-red-500 ml-0.5">*</span></label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 p-3 px-6 rounded-lg border border-slate-200 cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" name="tipo_visitado" value="cliente" checked={tipoVisitado === 'cliente'} onChange={(e) => setTipoVisitado(e.target.value)} className="text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-slate-700">Cliente</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 px-6 rounded-lg border border-slate-200 cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" name="tipo_visitado" value="aliado" checked={tipoVisitado === 'aliado'} onChange={(e) => setTipoVisitado(e.target.value)} className="text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-slate-700">Aliado Comercial</span>
                  </label>
                </div>
              </div>
              <div>
                {tipoVisitado === 'cliente' && (
                  <>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cliente<span className="text-red-500 ml-0.5">*</span></label>
                    <select name="cliente_id" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                      <option>Seleccionar cliente...</option>
                      <option>Alimentos Polar</option>
                      <option>PepsiCo Venezuela</option>
                    </select>
                  </>
                )}
                {tipoVisitado === 'aliado' && (
                  <>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Aliado Comercial<span className="text-red-500 ml-0.5">*</span></label>
                    <select name="aliado_id" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                      <option>Seleccionar aliado...</option>
                      <option>La Romántica 88.9</option>
                      <option>Éxitos 99.9</option>
                    </select>
                  </>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha<span className="text-red-500 ml-0.5">*</span></label>
                <input name="fecha" type="date" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Hora<span className="text-red-500 ml-0.5">*</span></label>
                <input name="hora" type="time" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tipo<span className="text-red-500 ml-0.5">*</span></label>
                <select name="tipo" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="">Seleccionar tipo...</option>
                  <option value="llamada">Llamada</option>
                  <option value="presencial">Presencial</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Lugar<span className="text-red-500 ml-0.5">*</span></label>
                <input name="lugar" type="text" placeholder="Dirección o nombre del lugar" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Objetivo de la Visita<span className="text-red-500 ml-0.5">*</span></label>
                <input name="objetivo_visita" type="text" placeholder="Describir el objetivo de la visita..." className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
            </div>
          </section>

          {/* RESULTADO */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">fact_check</span>
              Resultado de la Visita
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">¿Fue efectiva?<span className="text-red-500 ml-0.5">*</span></label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 p-3 px-6 rounded-lg border border-slate-200 cursor-pointer hover:border-accent-green transition-colors">
                    <input type="radio" name="efectiva" value="si" className="text-accent-green focus:ring-accent-green" />
                    <span className="text-sm font-medium text-slate-700">Sí</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 px-6 rounded-lg border border-slate-200 cursor-pointer hover:border-red-300 transition-colors">
                    <input type="radio" name="efectiva" value="no" className="text-red-500 focus:ring-red-500" />
                    <span className="text-sm font-medium text-slate-700">No</span>
                  </label>
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Detalle</label>
                <textarea name="detalle" rows={4} placeholder="Describir el resultado de la visita..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* GASTOS ASOCIADOS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">receipt_long</span>
              Gastos Asociados
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <input name="gasto_concepto" type="text" placeholder="Concepto" className="flex-1 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                <input name="gasto_monto" type="number" placeholder="$0" className="w-24 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <select name="gasto_categoria" className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                <option value="">Categoría del gasto...</option>
                <option value="transporte">Transporte</option>
                <option value="alimentacion">Alimentación</option>
                <option value="peaje">Peaje</option>
                <option value="estacionamiento">Estacionamiento</option>
                <option value="regalos">Regalos</option>
                <option value="atencion">Atención</option>
                <option value="otros">Otros</option>
              </select>
              <button className="w-full py-2.5 flex items-center justify-center gap-2 border border-dashed border-slate-200 hover:border-primary text-slate-400 hover:text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors">
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                Agregar Gasto
              </button>
            </div>
          </section>

          {/* ARCHIVOS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">attach_file</span>
              Archivos Adjuntos
            </h3>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-3">cloud_upload</span>
              <p className="text-xs font-medium text-slate-400">Arrastra o selecciona archivos</p>
              <p className="text-[10px] text-slate-300 mt-1">PDF, JPG, PNG hasta 10MB</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
