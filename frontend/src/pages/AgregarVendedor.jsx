// ==============================================
// AgregarVendedor.jsx — Formulario Nuevo Vendedor
// Entidades: USUARIO + VENDEDOR + TELEFONO (CSV)
// ==============================================
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const INITIAL_FORM = {
  // --- USUARIO ---
  primer_nombre: '',
  primer_apellido: '',
  correo: '',
  nombre_usuario: '',
  contraseña: '',
  rol: 'vendedor',
  estado: 'activo',
  // --- VENDEDOR ---
  tipo: 'vendedor',
  meta: '',
  // --- TELEFONOS ---
  telefonos: [{ codigo_area: '', cuerpo: '' }],
};

export default function AgregarVendedor() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const navigate = useNavigate();

  /* ── helpers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTelChange = (index, field, value) => {
    setFormData((prev) => {
      const telefonos = [...prev.telefonos];
      telefonos[index] = { ...telefonos[index], [field]: value };
      return { ...prev, telefonos };
    });
  };

  const addTelefono = () =>
    setFormData((prev) => ({
      ...prev,
      telefonos: [...prev.telefonos, { codigo_area: '', cuerpo: '' }],
    }));

  const removeTelefono = (index) =>
    setFormData((prev) => ({
      ...prev,
      telefonos: prev.telefonos.filter((_, i) => i !== index),
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: enviar formData al backend
    console.log('submit', formData);
  };

  const handleReset = () => setFormData(INITIAL_FORM);

  return (
    <>
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <nav className="flex items-center text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-[0.1em]">
            <Link to="/equipo-ventas" className="hover:text-primary transition-colors">Equipo de Ventas</Link>
            <span className="material-symbols-outlined text-[14px] mx-2">chevron_right</span>
            <span className="text-slate-600">Nuevo Vendedor</span>
          </nav>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Agregar Vendedor</h2>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Link to="/equipo-ventas" className="flex-1 sm:flex-initial text-center px-6 py-2.5 rounded-full border border-slate-300 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all">
            Cancelar
          </Link>
          <button onClick={handleSubmit} className="flex-1 sm:flex-initial px-8 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
            Guardar
          </button>
        </div>
      </header>

      {/* FORM CARD */}
      <div className="bg-[#F4FAFB] rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <form onSubmit={handleSubmit} onReset={handleReset} className="p-10">
          <div className="space-y-12">
            {/* ════════════════════════════════
                SECCIÓN 1 — Datos Personales (USUARIO + VENDEDOR)
               ════════════════════════════════ */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined font-bold">person</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Datos Personales</h3>
                  <p className="text-xs text-slate-400 font-medium italic">Entidades: Usuario + Vendedor</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                {/* primer_nombre */}
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Primer Nombre<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    name="primer_nombre"
                    value={formData.primer_nombre}
                    onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                    placeholder="Ej: María"
                    type="text"
                    required
                  />
                </div>

                {/* primer_apellido */}
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Primer Apellido<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    name="primer_apellido"
                    value={formData.primer_apellido}
                    onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                    placeholder="Ej: González"
                    type="text"
                    required
                  />
                </div>

                {/* correo */}
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Correo<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                    placeholder="vendedor@2jmcmedios.com"
                    type="email"
                    required
                  />
                </div>

                {/* meta */}
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Meta Mensual ($)<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input
                      name="meta"
                      value={formData.meta}
                      onChange={handleChange}
                      className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary pl-9 pr-4 py-3 text-sm"
                      placeholder="0.00"
                      step="0.01"
                      type="number"
                      required
                    />
                  </div>
                </div>

                {/* tipo (VENDEDOR entity) */}
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Tipo<span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm bg-[#F4FAFB]"
                    required
                  >
                    <option value="vendedor">Vendedor</option>
                    <option value="director">Director</option>
                  </select>
                </div>

                {/* rol (USUARIO entity) */}
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Rol<span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm bg-[#F4FAFB]"
                    required
                  >
                    <option value="invitado">Invitado</option>
                    <option value="gestor_pautas">Gestor de Pautas</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="director">Director</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* estado (USUARIO entity) */}
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Estado<span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm bg-[#F4FAFB]"
                    required
                  >
                    <option value="activo">Activo</option>
                    <option value="suspendido">Suspendido</option>
                  </select>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════
                SECCIÓN 2 — Teléfonos (TELEFONO)
               ════════════════════════════════ */}
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
                {formData.telefonos.map((tel, idx) => (
                  <div key={idx} className="flex gap-4 items-end">
                    <div className="w-32 space-y-2">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase">
                        Cód. Área<span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        name="codigo_area"
                        value={tel.codigo_area}
                        onChange={(e) => handleTelChange(idx, 'codigo_area', e.target.value)}
                        className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm text-center"
                        maxLength="4"
                        placeholder="0412"
                        type="text"
                        required
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase">
                        Cuerpo<span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        name="cuerpo"
                        value={tel.cuerpo}
                        onChange={(e) => handleTelChange(idx, 'cuerpo', e.target.value)}
                        className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                        placeholder="1234567"
                        type="text"
                        required
                      />
                    </div>
                    {formData.telefonos.length > 1 && (
                      <button className="p-3 text-slate-300 hover:text-red-400 transition-colors" type="button" onClick={() => removeTelefono(idx)}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button className="mt-6 flex items-center text-primary font-bold text-sm hover:text-secondary transition-all" type="button" onClick={addTelefono}>
                <span className="material-symbols-outlined mr-1">add_circle</span>
                Agregar Teléfono
              </button>
            </section>

            {/* ════════════════════════════════
                SECCIÓN 3 — Credenciales (USUARIO)
               ════════════════════════════════ */}
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
                {/* nombre_usuario */}
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Nombre de Usuario<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    name="nombre_usuario"
                    value={formData.nombre_usuario}
                    onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm bg-[#F4FAFB]"
                    placeholder="Ej: mgonzalez2jmc"
                    type="text"
                    required
                  />
                </div>

                {/* contraseña */}
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Contraseña<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="contraseña"
                      value={formData.contraseña}
                      onChange={handleChange}
                      className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm bg-[#F4FAFB]"
                      placeholder="••••••••"
                      type="password"
                      required
                    />

                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* FOOTER */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
        <div className="p-6 bg-[#F4FAFB]/60 border border-slate-200 rounded-2xl flex items-start gap-4">
          <div className="text-accent-green"><span className="material-symbols-outlined">shield_person</span></div>
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-tight mb-1">Privacidad</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">Los datos personales están protegidos bajo las políticas de seguridad de la empresa.</p>
          </div>
        </div>
        <div className="p-6 bg-[#F4FAFB]/60 border border-slate-200 rounded-2xl flex items-start gap-4">
          <div className="text-primary"><span className="material-symbols-outlined">info</span></div>
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-tight mb-1">Asignación</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">Al guardar, el usuario recibirá un correo de bienvenida con sus accesos.</p>
          </div>
        </div>
        <div className="p-6 bg-[#F4FAFB]/60 border border-slate-200 rounded-2xl flex items-start gap-4">
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
