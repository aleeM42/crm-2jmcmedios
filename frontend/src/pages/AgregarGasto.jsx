// ==============================================
// AgregarGasto.jsx — Formulario para Agregar Gasto
// ==============================================
import { Link } from 'react-router-dom';

export default function AgregarGasto() {
  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/actividad-comercial/gastos">Gastos</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">Nuevo Gasto</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 font-display">Registrar Gasto de Marketing</h2>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link to="/actividad-comercial/gastos" className="flex-1 sm:flex-initial text-center px-6 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Cancelar</Link>
          <button className="flex-1 sm:flex-initial px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Guardar Gasto</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MAIN FORM */}
        <div className="lg:col-span-8 space-y-8">
          {/* DATOS DEL GASTO */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">receipt_long</span>
              Datos del Gasto
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Vendedor</label>
                <select name="vendedor_id" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option>Seleccionar vendedor...</option>
                  <option>Carlos Pérez</option>
                  <option>María González</option>
                  <option>Ana Torres</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tipo de Gasto<span className="text-red-500 ml-0.5">*</span></label>
                <select name="categoria" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="">Seleccionar tipo...</option>
                  <option value="campaña">Campaña</option>
                  <option value="remota">Remota</option>
                  <option value="regalosCorporativos">Regalos Coroporativos</option>

                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha del Gasto<span className="text-red-500 ml-0.5">*</span></label>
                <input name="fecha" type="date" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Monto ($)<span className="text-red-500 ml-0.5">*</span></label>
                <input name="monto" type="number" placeholder="0.00" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Concepto / Descripción<span className="text-red-500 ml-0.5">*</span></label>
                <textarea name="concepto" rows={3} placeholder="Describir el gasto realizado..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" />
              </div>
            </div>
          </section>

          {/* VISITA RELACIONADA */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">link</span>
              Visita Relacionada (Opcional)
            </h3>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Vincular a una Visita</label>
              <select name="visita_id" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                <option>Sin vincular</option>
                <option>12/03 - Alimentos Polar (Carlos Pérez)</option>
                <option>11/03 - PepsiCo Venezuela (María González)</option>
              </select>
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-8">

          {/* RESUMEN */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">summarize</span>
              Resumen
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Vendedor</span>
                <span className="text-xs font-medium text-slate-400">—</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Categoría</span>
                <span className="text-xs font-medium text-slate-400">—</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Fecha</span>
                <span className="text-xs font-medium text-slate-400">—</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-xs font-bold text-slate-700">Monto</span>
                <span className="text-sm font-black text-primary">$0.00</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
