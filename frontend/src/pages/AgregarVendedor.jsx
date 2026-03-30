// ==============================================
// AgregarVendedor.jsx — Formulario Nuevo Vendedor (conectado al backend)
// Entidades: USUARIO + VENDEDOR (CSV)
// ==============================================
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { crearVendedor, getDirectores } from '../services/vendedor.service.js';
import { resolveErrorMessage } from '../utils/errorMessages.js';

const INITIAL_FORM = {
  // --- USUARIO ---
  primer_nombre: '',
  primer_apellido: '',
  correo: '',
  nombre_usuario: '',
  password: '',
  estado: 'Activo',
  // --- VENDEDOR ---
  tipo: 'Vendedor',
  meta: '',
  fk_vendedor_jefe: '',
  // --- TELEFONOS ---
  telefonos: [{ codigo_area: '', numero: '' }],
};

export default function AgregarVendedor() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [directores, setDirectores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDirectores()
      .then(res => { if (res.success) setDirectores(res.data); })
      .catch(() => { });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTelChange = (index, field, value) => {
    let newVal = value;
    if (field === 'numero') {
      newVal = newVal.replace(/\D/g, '').slice(0, 7);
    }
    setFormData((prev) => {
      const telefonos = [...prev.telefonos];
      telefonos[index] = { ...telefonos[index], [field]: newVal };
      return { ...prev, telefonos };
    });
  };

  const addTelefono = () =>
    setFormData((prev) => ({
      ...prev,
      telefonos: [...prev.telefonos, { codigo_area: '', numero: '' }],
    }));

  const removeTelefono = (index) =>
    setFormData((prev) => ({
      ...prev,
      telefonos: prev.telefonos.filter((_, i) => i !== index),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validación estricta de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.correo)) {
      setError('Por favor ingresa un correo electrónico válido. Ej: vendedor@2jmcmedios.com');
      return;
    }

    // Validación estricta de teléfonos (código área elegido y 7 dígitos numéricos)
    for (const tel of formData.telefonos) {
      if (tel.codigo_area || tel.numero) {
        if (!tel.codigo_area || tel.numero.length !== 7) {
          setError('Cada teléfono ingresado debe tener su código de área seleccionado y un número de exactamente 7 dígitos.');
          return;
        }
      }
    }

    setLoading(true);

    try {
      const payload = {
        usuario: {
          primer_nombre: formData.primer_nombre,
          primer_apellido: formData.primer_apellido,
          correo: formData.correo,
          nombre_usuario: formData.nombre_usuario,
          password: formData.password,
          rol: formData.tipo, // Infiere el rol directo del tipo de la tabla vendedor
          estado: formData.estado,
        },
        vendedor: {
          meta: parseInt(formData.meta, 10) || 0,
          tipo: formData.tipo,
          fk_vendedor_jefe: formData.fk_vendedor_jefe || null,
        },
        telefonos: formData.telefonos.filter(t => t.codigo_area && t.numero),
      };

      const result = await crearVendedor(payload);
      if (result.success) {
        setSuccess('Vendedor registrado exitosamente');
        setTimeout(() => navigate('/equipo-ventas'), 1500);
      }
    } catch (err) {
      setError(resolveErrorMessage(err, 'vendedores'));
    } finally {
      setLoading(false);
    }
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
          <button onClick={handleSubmit} disabled={loading} className="flex-1 sm:flex-initial px-8 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-60">
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </header>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <span className="material-symbols-outlined text-red-500">error</span>
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
          <span className="material-symbols-outlined text-green-500">check_circle</span>
          <p className="text-sm text-green-600 font-medium">{success}</p>
        </div>
      )}

      {/* FORM CARD */}
      <div className="bg-[#F4FAFB] rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <form onSubmit={handleSubmit} onReset={handleReset} className="p-10">
          <div className="space-y-12">
            {/* SECCIÓN 1 — Datos Personales */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined font-bold">person</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Datos Personales</h3>

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Primer Nombre<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input name="primer_nombre" value={formData.primer_nombre} onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                    placeholder="Ej: María" type="text" required />
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Primer Apellido<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input name="primer_apellido" value={formData.primer_apellido} onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                    placeholder="Ej: González" type="text" required />
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Correo<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input name="correo" value={formData.correo} onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                    placeholder="vendedor@2jmcmedios.com" type="email" pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$" title="Debe ser un correo electrónico válido. Ej: vendedor@2jmcmedios.com" required />
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Meta Anual ($)<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input name="meta" value={formData.meta} onChange={handleChange}
                      className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary pl-9 pr-4 py-3 text-sm"
                      placeholder="0" step="1" type="number" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Tipo de Perfil / Rol<span className="text-red-500 ml-1">*</span>
                  </label>
                  <select name="tipo" value={formData.tipo} onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm bg-[#F4FAFB]" required>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Director">Director</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Estado<span className="text-red-500 ml-1">*</span>
                  </label>
                  <select name="estado" value={formData.estado} onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm bg-[#F4FAFB]" required>
                    <option value="Activo">Activo</option>
                    <option value="Suspendido">Suspendido</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Director Jefe
                  </label>
                  <select name="fk_vendedor_jefe" value={formData.fk_vendedor_jefe} onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm bg-[#F4FAFB]">
                    <option value="">Sin jefe asignado</option>
                    {directores.map(d => (
                      <option key={d.id} value={d.id}>{d.primer_nombre} {d.primer_apellido}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* SECCIÓN 2 — Teléfonos */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent-green/10 text-accent-green flex items-center justify-center">
                  <span className="material-symbols-outlined font-bold">call</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Teléfonos</h3>
                  <p className="text-xs text-slate-400 font-medium italic">Contacto directo del vendedor</p>
                </div>
              </div>

              <div className="space-y-4">
                {formData.telefonos.map((tel, idx) => (
                  <div key={idx} className="flex gap-4 items-end">
                    <div className="w-24 space-y-2">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase">
                        Cód.<span className="text-red-500 ml-1">*</span>
                      </label>
                      <select name="codigo_area" value={tel.codigo_area}
                        onChange={(e) => handleTelChange(idx, 'codigo_area', e.target.value)}
                        className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary pl-4 pr-5 py-3 text-sm bg-white"
                        required>
                        <option value="">Cod</option>
                        <option value="0414">0414</option>
                        <option value="0426">0426</option>
                        <option value="0412">0412</option>
                        <option value="0422">0422</option>
                        <option value="0424">0424</option>
                        <option value="0416">0416</option>
                      </select>
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase">
                        Número<span className="text-red-500 ml-1">*</span>
                      </label>
                      <input name="numero" value={tel.numero}
                        onChange={(e) => handleTelChange(idx, 'numero', e.target.value)}
                        className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                        placeholder="1234567" type="text" minLength="7" maxLength="7" pattern="\d{7}" title="Debe contener exactamente 7 números" required />
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
                <span className="material-symbols-outlined mr-1">add_circle</span>Agregar Teléfono
              </button>
            </section>

            {/* SECCIÓN 3 — Credenciales */}
            <section className="bg-slate-50/50 -mx-10 px-10 py-10 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center">
                  <span className="material-symbols-outlined font-bold">key</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Credenciales de Acceso</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Nombre de Usuario<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input name="nombre_usuario" value={formData.nombre_usuario} onChange={handleChange}
                    className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 text-sm bg-[#F4FAFB]"
                    placeholder="Ej: mgonzalez2jmc" type="text" required />
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 tracking-wide uppercase">
                    Contraseña<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input name="password" value={formData.password} onChange={handleChange}
                      className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary pl-4 pr-12 py-3 text-sm bg-[#F4FAFB]"
                      placeholder="••••••••" type={showPassword ? "text" : "password"} required />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors flex items-center justify-center p-1"
                      tabIndex="-1"
                    >
                      <span className="material-symbols-outlined select-none text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
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
              <button className="px-10 py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-secondary transition-all flex items-center disabled:opacity-60" type="submit" disabled={loading}>
                <span className="material-symbols-outlined mr-2">save_as</span>
                {loading ? 'Registrando...' : 'Finalizar Registro'}
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
            <p className="text-[11px] text-slate-500 leading-relaxed">La contraseña se encripta automáticamente con bcrypt antes de guardarse.</p>
          </div>
        </div>
      </div>
    </>
  );
}
