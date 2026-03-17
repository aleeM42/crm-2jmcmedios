// ==============================================
// AgregarSubEmpresa.jsx — Formulario para Agregar Sub-Empresa
// Campos mapeados 1:1 con entidades CLIENTE (tipo=sub empresa), CONTACTO, TELEFONO, MARCA_INTER del CSV ER
// ==============================================
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function AgregarSubEmpresa() {
  const { clienteId } = useParams();

  // --- CLIENTE (DB fields — tipo forzado a 'sub empresa') ---
  const [subEmpresa, setSubEmpresa] = useState({
    nombre: '',
    razon_social: '',
    tipo: 'sub empresa',
    direccion: '',
    rif_fiscal: '',
    clasificacion: '',         // ENUM: Agencia | Cliente Directo
    sector: '',                // ENUM: Salud | Alimentación | Telemática | Fabricación | Bancario
    estado: 'Activo',          // ENUM: Activo | Inactivo
    nombre_agencia: '',
    observacion: '',
  });

  // --- CONTACTO principal (DB fields) ---
  const [contacto, setContacto] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    departamento: '',
    correo: '',
    fecha_nacimiento: '',
    anotaciones_especiales: '',
    rol: '',
    tipo: 'cliente',
  });

  // --- TELEFONOS (PK compuesta) ---
  const [telefonos, setTelefonos] = useState([{ codigo_area: '', cuerpo: '' }]);

  // --- MARCAS_INTER ---
  const [marcas, setMarcas] = useState([]);
  const [nuevaMarca, setNuevaMarca] = useState('');

  const handleSubEmpresa = (e) => setSubEmpresa({ ...subEmpresa, [e.target.name]: e.target.value });
  const handleContacto = (e) => setContacto({ ...contacto, [e.target.name]: e.target.value });

  const addTelefono = () => setTelefonos([...telefonos, { codigo_area: '', cuerpo: '' }]);
  const removeTelefono = (i) => setTelefonos(telefonos.filter((_, idx) => idx !== i));
  const handleTelefono = (i, field, val) => {
    const copy = [...telefonos];
    copy[i][field] = val;
    setTelefonos(copy);
  };

  const addMarca = () => {
    if (!nuevaMarca.trim()) return;
    setMarcas([...marcas, { nombre: nuevaMarca.trim(), observaciones: '' }]);
    setNuevaMarca('');
  };
  const removeMarca = (i) => setMarcas(marcas.filter((_, idx) => idx !== i));

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/clientes">Clientes</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link className="hover:text-primary transition-colors" to={`/clientes/${clienteId || ''}`}>Detalle</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">Nueva Sub-Empresa</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 font-display">Agregar Sub-Empresa</h2>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link to={`/clientes/${clienteId || ''}`} className="flex-1 sm:flex-initial text-center px-6 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Cancelar</Link>
          <button className="flex-1 sm:flex-initial px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Guardar Sub-Empresa</button>
        </div>
      </div>

      <form className="max-w-3xl space-y-8">
        {/* ═══ DATOS SUB-EMPRESA — CLIENTE entity ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">business</span>
            Datos de la Sub-Empresa
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* nombre */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nombre <span className="text-red-500">*</span></label>
              <input type="text" name="nombre" value={subEmpresa.nombre} onChange={handleSubEmpresa} placeholder="Nombre comercial" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            {/* razon_social */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Razón Social <span className="text-red-500">*</span></label>
              <input type="text" name="razon_social" value={subEmpresa.razon_social} onChange={handleSubEmpresa} placeholder="Nombre legal completo" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            {/* rif_fiscal */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">RIF Fiscal <span className="text-red-500">*</span></label>
              <input type="text" name="rif_fiscal" value={subEmpresa.rif_fiscal} onChange={handleSubEmpresa} placeholder="J-12345678-0" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            {/* sector — ENUM */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Sector <span className="text-red-500">*</span></label>
              <select name="sector" value={subEmpresa.sector} onChange={handleSubEmpresa} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                <option value="">Seleccionar sector...</option>
                <option value="Salud">Salud</option>
                <option value="Alimentación">Alimentación</option>
                <option value="Telemática">Telemática</option>
                <option value="Fabricación">Fabricación</option>
                <option value="Bancario">Bancario</option>
              </select>
            </div>
            {/* clasificacion — ENUM */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Clasificación <span className="text-red-500">*</span></label>
              <select name="clasificacion" value={subEmpresa.clasificacion} onChange={handleSubEmpresa} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                <option value="">Seleccione</option>
                <option value="Cliente Directo">Cliente Directo</option>
                <option value="Agencia">Agencia</option>
              </select>
            </div>
            {/* estado — ENUM */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Estado <span className="text-red-500">*</span></label>
              <select name="estado" value={subEmpresa.estado} onChange={handleSubEmpresa} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            {/* direccion */}
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Dirección <span className="text-red-500">*</span></label>
              <input type="text" name="direccion" value={subEmpresa.direccion} onChange={handleSubEmpresa} placeholder="Dirección fiscal" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            {/* observacion */}
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Observación</label>
              <textarea name="observacion" value={subEmpresa.observacion} onChange={handleSubEmpresa} placeholder="Notas adicionales..." rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"></textarea>
            </div>
          </div>
        </section>

        {/* ═══ CONTACTO PRINCIPAL — CONTACTO entity ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">contact_phone</span>
            Contacto Principal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* primer_nombre */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Primer Nombre <span className="text-red-500">*</span></label>
              <input type="text" name="primer_nombre" value={contacto.primer_nombre} onChange={handleContacto} placeholder="Primer nombre" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            {/* segundo_nombre */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Segundo Nombre</label>
              <input type="text" name="segundo_nombre" value={contacto.segundo_nombre} onChange={handleContacto} placeholder="Segundo nombre" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            {/* primer_apellido */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Primer Apellido <span className="text-red-500">*</span></label>
              <input type="text" name="primer_apellido" value={contacto.primer_apellido} onChange={handleContacto} placeholder="Primer apellido" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            {/* departamento */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Departamento <span className="text-red-500">*</span></label>
              <input type="text" name="departamento" value={contacto.departamento} onChange={handleContacto} placeholder="Mercadeo, Ventas..." className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            {/* correo */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Correo <span className="text-red-500">*</span></label>
              <input type="email" name="correo" value={contacto.correo} onChange={handleContacto} placeholder="correo@ejemplo.com" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            {/* rol */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Rol <span className="text-red-500">*</span></label>
              <input type="text" name="rol" value={contacto.rol} onChange={handleContacto} placeholder="Decisor, Operativo..." className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            {/* fecha_nacimiento */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha de Nacimiento</label>
              <input type="date" name="fecha_nacimiento" value={contacto.fecha_nacimiento} onChange={handleContacto} className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
            </div>
            {/* anotaciones_especiales */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Anotaciones Especiales</label>
              <textarea name="anotaciones_especiales" value={contacto.anotaciones_especiales} onChange={handleContacto} placeholder="Preferencias de contacto..." rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"></textarea>
            </div>
            {/* Teléfono — TELEFONO PK compuesta */}
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Teléfonos</label>
              <div className="space-y-3">
                {telefonos.map((tel, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input type="tel" name="codigo_area" value={tel.codigo_area} onChange={(e) => handleTelefono(i, 'codigo_area', e.target.value)} placeholder="0212" className="w-20 h-12 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-center" />
                    <input type="tel" name="cuerpo" value={tel.cuerpo} onChange={(e) => handleTelefono(i, 'cuerpo', e.target.value)} placeholder="1234567" className="flex-1 h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                    <button type="button" onClick={() => removeTelefono(i)} className="h-12 w-12 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-primary hover:bg-slate-100">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addTelefono} className="w-full py-2.5 flex items-center justify-center gap-2 border border-dashed border-slate-200 hover:border-primary text-slate-400 hover:text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors">
                  <span className="material-symbols-outlined text-[16px]">add_call</span>
                  Agregar Teléfono
                </button>
              </div>
            </div>
            <input type="hidden" name="tipo" value="cliente" />
          </div>
        </section>

        {/* ═══ MARCAS — MARCA_INTER entity ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">loyalty</span>
            Marcas Asociadas <span className="text-red-500">*</span>
          </h3>
          <div className="space-y-3">
            {marcas.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg">
                {marcas.map((m, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/30 text-primary border border-primary/20 gap-2">
                    {m.nombre}
                    <button type="button" onClick={() => removeMarca(i)} className="hover:text-red-600">
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-3">
              <input type="text" name="marca_nombre" value={nuevaMarca} onChange={(e) => setNuevaMarca(e.target.value)} placeholder="Nombre de la marca" className="flex-1 h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMarca())} />
              <button type="button" onClick={addMarca} className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
