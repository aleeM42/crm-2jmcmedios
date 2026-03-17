// ==============================================
// AgregarLead.jsx — Formulario para Agregar Lead al Pipeline
// ==============================================
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AgregarLead() {
  const [lead, setLead] = useState({
    nombre_empresa: '',
    nombre_contacto: '',
  });

  const handleChange = (e) => setLead({ ...lead, [e.target.name]: e.target.value });

  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <nav className="flex text-[10px] font-bold text-slate-400 mb-1 gap-2 uppercase tracking-[0.1em]">
            <Link to="/pipeline" className="hover:text-primary transition-colors">Pipeline</Link>
            <span>/</span>
            <span className="text-slate-600">Nuevo Lead</span>
          </nav>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Agregar Lead</h2>
        </div>
      </header>

      <form className="space-y-8">
        {/* ═══ Datos del Lead ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
            <span className="material-symbols-outlined text-primary">person_add</span>
            <h3 className="text-lg font-bold font-display">Datos del Lead</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nombre de la Empresa <span className="text-red-500">*</span></label>
              <input name="nombre_empresa" value={lead.nombre_empresa} onChange={handleChange} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Ej: Alimentos Polar C.A." type="text" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nombre del Contacto <span className="text-red-500">*</span></label>
              <input name="nombre_contacto" value={lead.nombre_contacto} onChange={handleChange} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Ej: Juan Pérez" type="text" />
            </div>
          </div>
        </section>

        {/* ═══ Leads Registrados ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
            <span className="material-symbols-outlined text-primary">list_alt</span>
            <h3 className="text-lg font-bold font-display">Leads Registrados</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-4">Nombre del Cliente</th>
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-4">Nombre del Contacto</th>
                  <th className="text-[10px] font-bold text-slate-400 uppercase tracking-widest py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { empresa: 'TechNova Solutions', contacto: 'Ana Martínez' },
                  { empresa: 'Alimentos del Sur', contacto: 'Roberto Gómez' },
                  { empresa: 'Moda Urbana S.A.', contacto: 'Elena Ruiz' },
                  { empresa: 'Green Energy Group', contacto: 'Daniel Castro' },
                  { empresa: 'Inmobiliaria Central', contacto: 'Sofía López' },
                ].map((item) => (
                  <tr key={item.empresa} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-800">{item.empresa}</td>
                    <td className="py-3 px-4 text-slate-600">{item.contacto}</td>
                    <td className="py-3 px-4 text-right">
                      <button type="button" className="text-slate-300 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row justify-end gap-4 py-8">
          <Link to="/pipeline" className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">Cancelar</Link>
          <button className="px-12 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all" type="submit">Guardar Lead</button>
        </div>
      </form>
    </>
  );
}
