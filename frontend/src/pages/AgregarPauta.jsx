// ==============================================
// AgregarPauta.jsx — Formulario para Agregar Pauta
// ==============================================
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AgregarPauta() {
  const [tipoCompra, setTipoCompra] = useState('');
  const esEnVivo = tipoCompra === 'en_vivo';
  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/pautas">Pautas</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">Nueva Pauta</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 font-display">Registrar Pauta</h2>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link to="/pautas" className="flex-1 sm:flex-initial text-center px-6 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Cancelar</Link>
          <button className="flex-1 sm:flex-initial px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Guardar Pauta</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {/* DATOS GENERALES */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">description</span>
              Datos Generales
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cliente<span className="text-red-500 ml-0.5">*</span></label>
                <select name="cliente_id" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option>Seleccionar cliente...</option>
                  <option>Alimentos Polar</option>
                  <option>PepsiCo Venezuela</option>
                  <option>Banesco</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Marca<span className="text-red-500 ml-0.5">*</span></label>
                <select name="marca_id" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option>Seleccionar marca...</option>
                  <option>Harina PAN</option>
                  <option>Pepsi</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tipo de Compra<span className="text-red-500 ml-0.5">*</span></label>
                <select name="tipo_compra" value={tipoCompra} onChange={(e) => setTipoCompra(e.target.value)} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="">Seleccionar...</option>
                  <option value="rotativa">Rotativa</option>
                  <option value="en_vivo">En Vivo</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Vendedor<span className="text-red-500 ml-0.5">*</span></label>
                <select name="vendedor_id" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option>Seleccionar vendedor...</option>
                  <option>Carlos Pérez</option>
                  <option>María González</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nombre Agencia</label>
                <input name="nombre_agencia" type="text" placeholder="Se asigna según clasificación del cliente" readOnly className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Número OT<span className="text-red-500 ml-0.5">*</span></label>
                <input name="numero_ot" type="text" placeholder="Ej: OT-00125" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Coordinadora</label>
                <input name="coordinadora" type="text" placeholder="Nombre de la coordinadora" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha de Emisión<span className="text-red-500 ml-0.5">*</span></label>
                <input name="fecha_emision" type="date" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Estado<span className="text-red-500 ml-0.5">*</span></label>
                <select name="estado" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="programada">Programada</option>
                  <option value="en_transmision">En transmisión</option>
                  <option value="finalizada">Finalizada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Observaciones</label>
                <textarea name="observaciones" rows={2} placeholder="Notas sobre la pauta..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" />
              </div>
            </div>
          </section>

          {/* VIGENCIA Y CUÑAS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">schedule</span>
              Vigencia y Cuñas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha Inicio<span className="text-red-500 ml-0.5">*</span></label>
                <input name="fecha_inicio" type="date" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha Fin<span className="text-red-500 ml-0.5">*</span></label>
                <input name="fecha_fin" type="date" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cantidad de Cuñas<span className="text-red-500 ml-0.5">*</span></label>
                <input name="cantidad_cuñas" type="number" placeholder="0" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Costo por Cuña ($)<span className="text-red-500 ml-0.5">*</span></label>
                <input name="costo_cuña" type="number" placeholder="0.00" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Duración de Cuña<span className="text-red-500 ml-0.5">*</span></label>
                <select name="duracion_cuña" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="">Seleccionar...</option>
                  <option value="15">15 segundos</option>
                  <option value="20">20 segundos</option>
                  <option value="30">30 segundos</option>
                  <option value="45">45 segundos</option>
                  <option value="60">60 segundos</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Programa{esEnVivo && <span className="text-red-500 ml-0.5">*</span>}</label>
                <input name="programa" type="text" placeholder="Nombre del programa" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Presentadora{esEnVivo && <span className="text-red-500 ml-0.5">*</span>}</label>
                <input name="presentadora" type="text" placeholder="Nombre de la presentadora" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Horario{esEnVivo && <span className="text-red-500 ml-0.5">*</span>}</label>
                <input name="horario" type="text" placeholder="Ej: 06:00 - 10:00 AM" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* MONTOS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">payments</span>
              Montos
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Monto OC ($)<span className="text-red-500 ml-0.5">*</span></label>
                <input name="monto_OC" type="number" placeholder="0.00" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Monto OT ($)<span className="text-red-500 ml-0.5">*</span></label>
                <input name="monto_OT" type="number" placeholder="0.00" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
            </div>
          </section>

          {/* EMISORAS ASOCIADAS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">radio</span>
              Emisoras Asociadas
            </h3>
            <div className="space-y-3">
              {['La Romántica 88.9', 'Éxitos 99.9'].map((e) => (
                <div key={e} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-sm font-medium text-slate-700">{e}</span>
                  <button className="text-slate-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[18px]">close</span></button>
                </div>
              ))}
              <button className="w-full py-2.5 flex items-center justify-center gap-2 border border-dashed border-slate-200 hover:border-primary text-slate-400 hover:text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors" type="button">
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                Agregar Emisora
              </button>
            </div>
            {/* Ubicación dinámica según emisora seleccionada */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Ubicación de la Emisora</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Región</label>
                  <input name="region" type="text" placeholder="Se asigna según emisora" readOnly className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Estado</label>
                  <input name="estado_emisora" type="text" placeholder="Se asigna según emisora" readOnly className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Ciudad</label>
                  <input name="ciudad" type="text" placeholder="Se asigna según emisora" readOnly className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
