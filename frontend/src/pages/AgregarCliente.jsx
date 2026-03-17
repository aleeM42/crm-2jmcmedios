// ==============================================
// AgregarCliente.jsx — Formulario Agregar Cliente
// Campos mapeados 1:1 con entidades CLIENTE, CONTACTO, TELEFONO, MARCA_INTER del CSV ER
// ==============================================
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AgregarCliente() {
  // --- CLIENTE (DB fields) ---
  const [cliente, setCliente] = useState({
    nombre: '',
    razon_social: '',
    tipo: 'empresa',           // ENUM: empresa | sub empresa
    direccion: '',
    rif_fiscal: '',
    clasificacion: '',         // ENUM: Agencia | Cliente Directo
    sector: '',                // ENUM: Salud | Alimentación | Telemática | Fabricación | Bancario
    estado: 'Activo',          // ENUM: Activo | Inactivo
    nombre_agencia: '',        // NOT NULL si clasificacion === 'Agencia'
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
    tipo: 'cliente',           // ENUM: emisora | cliente
  });

  // --- TELEFONOS (PK compuesta: codigo_area + cuerpo) ---
  const [telefonos, setTelefonos] = useState([{ codigo_area: '', cuerpo: '' }]);

  // --- MARCAS_INTER ---
  const [marcas, setMarcas] = useState([{ nombre: '', observaciones: '' }]);
  const [nuevaMarca, setNuevaMarca] = useState('');

  // --- Vinculación sub-empresa ---
  const [isSubEmpresa, setIsSubEmpresa] = useState(false);
  const [empresaPadreId, setEmpresaPadreId] = useState('');

  const handleCliente = (e) => setCliente({ ...cliente, [e.target.name]: e.target.value });
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
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <nav className="flex text-[10px] font-bold text-slate-400 mb-1 gap-2 uppercase tracking-[0.1em]">
            <Link to="/clientes" className="hover:text-primary transition-colors">Clientes</Link>
            <span>/</span>
            <span className="text-slate-600">Agregar Cliente</span>
          </nav>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Agregar Cliente</h2>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <Link to="/clientes" className="flex-1 sm:flex-initial text-center px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all">Cancelar</Link>
          <button className="flex-1 sm:flex-initial px-8 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all">Guardar</button>
        </div>
      </header>

      <form className="space-y-8">
        {/* ═══ Vinculación ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
            <span className="material-symbols-outlined text-primary">link</span>
            <h3 className="text-lg font-bold font-display">Vinculación</h3>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">¿Es una sub-empresa de una empresa existente?</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="w-4 h-4 text-primary border-slate-300 focus:ring-primary" checked={!isSubEmpresa} onChange={() => { setIsSubEmpresa(false); setCliente({ ...cliente, tipo: 'empresa' }); }} type="radio" name="is_sub_empresa" value="no" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">No</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="w-4 h-4 text-primary border-slate-300 focus:ring-primary" checked={isSubEmpresa} onChange={() => { setIsSubEmpresa(true); setCliente({ ...cliente, tipo: 'sub empresa' }); }} type="radio" name="is_sub_empresa" value="si" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">Sí</span>
                </label>
              </div>
            </div>
            {isSubEmpresa && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Seleccionar Empresa Padre <span className="text-red-500">*</span></label>
                  <select name="empresa_padre_id" value={empresaPadreId} onChange={(e) => setEmpresaPadreId(e.target.value)} className="w-full rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                    <option value="">Buscar empresa...</option>
                    <option value="c1">Alimentos Polar C.A.</option>
                    <option value="c2">Farmatodo C.A.</option>
                  </select>
                </div>
                {empresaPadreId && (
                  <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">verified</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Empresa Seleccionada</p>
                      <p className="text-sm font-bold text-slate-800">{empresaPadreId === 'c1' ? 'Alimentos Polar C.A.' : 'Farmatodo C.A.'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ═══ Datos de la Empresa — CLIENTE entity ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
            <span className="material-symbols-outlined text-primary">corporate_fare</span>
            <h3 className="text-lg font-bold font-display">Datos de la Empresa</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* tipo — ENUM */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tipo <span className="text-red-500">*</span></label>
              <select name="tipo" value={cliente.tipo} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                <option value="empresa">Empresa</option>
                <option value="sub empresa">Sub Empresa</option>
              </select>
            </div>
            {/* nombre */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nombre <span className="text-red-500">*</span></label>
              <input name="nombre" value={cliente.nombre} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Nombre Comercial" type="text" />
            </div>
            {/* razon_social */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Razón Social <span className="text-red-500">*</span></label>
              <input name="razon_social" value={cliente.razon_social} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Nombre Legal Completo" type="text" />
            </div>
            {/* rif_fiscal */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">RIF Fiscal <span className="text-red-500">*</span></label>
              <input name="rif_fiscal" value={cliente.rif_fiscal} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="J-00000000-0" type="text" />
            </div>
            {/* direccion */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Dirección <span className="text-red-500">*</span></label>
              <input name="direccion" value={cliente.direccion} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Dirección completa del cliente" type="text" />
            </div>
            {/* clasificacion — ENUM */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Clasificación <span className="text-red-500">*</span></label>
              <select name="clasificacion" value={cliente.clasificacion} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                <option value="">Seleccione</option>
                <option value="Cliente Directo">Cliente Directo</option>
                <option value="Agencia">Agencia</option>
              </select>
            </div>
            {/* nombre_agencia — condicional */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nombre de Agencia {cliente.clasificacion === 'Agencia' && <span className="text-red-500">*</span>}</label>
              <input name="nombre_agencia" value={cliente.nombre_agencia} onChange={handleCliente} disabled={cliente.clasificacion !== 'Agencia'} className={`rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary ${cliente.clasificacion !== 'Agencia' ? 'bg-slate-50 opacity-60' : ''}`} placeholder="Solo si clasificación es Agencia" type="text" />
            </div>
            {/* sector — ENUM */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sector <span className="text-red-500">*</span></label>
              <select name="sector" value={cliente.sector} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                <option value="">Seleccione sector</option>
                <option value="Salud">Salud</option>
                <option value="Alimentación">Alimentación</option>
                <option value="Telemática">Telemática</option>
                <option value="Fabricación">Fabricación</option>
                <option value="Bancario">Bancario</option>
              </select>
            </div>
            {/* estado — ENUM */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Estado <span className="text-red-500">*</span></label>
              <select name="estado" value={cliente.estado} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            {/* observacion */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Observación</label>
              <textarea name="observacion" value={cliente.observacion} onChange={handleCliente} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Comentarios generales sobre la empresa..." rows="3"></textarea>
            </div>
          </div>
        </section>

        {/* ═══ Estructura Corporativa — MARCA_INTER entity ═══ */}
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
            <span className="material-symbols-outlined text-accent-green">account_tree</span>
            <h3 className="text-lg font-bold font-display">Gestión de Marcas</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400 text-lg">sell</span>Marcas Asociadas <span className="text-red-500">*</span>
                </h4>
                <p className="text-xs text-slate-400 font-medium">(mínimo 1 marca requerida)</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-lg min-h-[60px]">
              {marcas.map((m, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/30 text-primary border border-primary/20 gap-2">
                  {m.nombre}
                  <button type="button" onClick={() => removeMarca(i)} className="hover:text-red-600">
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <input type="text" name="marca_nombre" value={nuevaMarca} onChange={(e) => setNuevaMarca(e.target.value)} placeholder="Nombre de la marca" className="flex-1 rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMarca())} />
              <button type="button" onClick={addMarca} className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">add_circle</span>Agregar
              </button>
            </div>
            <div className="bg-accent-light p-4 rounded-lg flex items-center gap-3 text-slate-800 text-sm font-medium mt-2">
              <span className="material-symbols-outlined text-primary">info</span>
              <span>Nota: Toda empresa (padre o sub-empresa) debe tener al menos una marca asociada.</span>
            </div>
          </div>
        </section>

        {/* ═══ Contacto Principal + Teléfonos + Asignación ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* --- CONTACTO entity --- */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4 text-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">person_add</span>
                <h3 className="text-lg font-bold font-display">Contacto Principal</h3>
              </div>
              <button className="flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary transition-colors" type="button">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>Agregar Contacto
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* primer_nombre */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Primer Nombre <span className="text-red-500">*</span></label>
                  <input name="primer_nombre" value={contacto.primer_nombre} onChange={handleContacto} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" type="text" />
                </div>
                {/* segundo_nombre */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Segundo Nombre</label>
                  <input name="segundo_nombre" value={contacto.segundo_nombre} onChange={handleContacto} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" type="text" />
                </div>
              </div>
              {/* primer_apellido */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Primer Apellido <span className="text-red-500">*</span></label>
                <input name="primer_apellido" value={contacto.primer_apellido} onChange={handleContacto} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" type="text" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* departamento */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Departamento <span className="text-red-500">*</span></label>
                  <input name="departamento" value={contacto.departamento} onChange={handleContacto} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Mercadeo" type="text" />
                </div>
                {/* rol */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Rol <span className="text-red-500">*</span></label>
                  <input name="rol" value={contacto.rol} onChange={handleContacto} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Decisor, Operativo..." type="text" />
                </div>
              </div>
              {/* correo */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Correo <span className="text-red-500">*</span></label>
                <input name="correo" value={contacto.correo} onChange={handleContacto} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="email@dominio.com" type="email" />
              </div>
              {/* fecha_nacimiento */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fecha de Nacimiento</label>
                <input name="fecha_nacimiento" value={contacto.fecha_nacimiento} onChange={handleContacto} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" type="date" />
              </div>
              {/* anotaciones_especiales */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Anotaciones Especiales</label>
                <textarea name="anotaciones_especiales" value={contacto.anotaciones_especiales} onChange={handleContacto} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Preferencias de contacto..." rows="2"></textarea>
              </div>
              {/* tipo (hidden — siempre 'cliente') */}
              <input type="hidden" name="tipo" value="cliente" />
            </div>
          </section>

          <div className="space-y-8">
            {/* --- TELEFONO entity (PK compuesta) --- */}
            <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
                <span className="material-symbols-outlined text-primary">call</span>
                <h3 className="text-lg font-bold font-display">Teléfonos</h3>
              </div>
              <div className="space-y-4">
                {telefonos.map((tel, i) => (
                  <div key={i} className="flex gap-3 items-end">
                    <div className="w-24 flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Cód. Área <span className="text-red-500">*</span></label>
                      <input name="codigo_area" value={tel.codigo_area} onChange={(e) => handleTelefono(i, 'codigo_area', e.target.value)} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="0212" type="tel" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Número <span className="text-red-500">*</span></label>
                      <input name="cuerpo" value={tel.cuerpo} onChange={(e) => handleTelefono(i, 'cuerpo', e.target.value)} className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="000 0000" type="tel" />
                    </div>
                    <button type="button" onClick={() => removeTelefono(i)} className="bg-slate-50 border border-slate-200 p-3 rounded-lg hover:bg-slate-100 text-primary">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addTelefono} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 mt-4">
                  <span className="material-symbols-outlined text-lg">add_call</span>Agregar Teléfono
                </button>
              </div>
            </section>

            {/* Asignación vendedor (relación FK vendedor_id) */}
            <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 text-slate-800">
                <span className="material-symbols-outlined text-accent-green">assignment_ind</span>
                <h3 className="text-lg font-bold font-display">Asignación</h3>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Vendedor Asignado <span className="text-red-500">*</span></label>
                <select name="vendedor_id" className="rounded-lg border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                  <option value="">Seleccione un vendedor</option>
                  <option value="v1">Alejandro Pérez</option>
                  <option value="v2">Mariana Gómez</option>
                  <option value="v3">Roberto Silva</option>
                </select>
                <p className="text-[10px] text-slate-400 mt-1 italic">El cliente será visible en el pipeline de este usuario.</p>
              </div>
            </section>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 py-8">
          <Link to="/clientes" className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">Cancelar Cambios</Link>
          <button className="px-12 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all" type="submit">Guardar Cliente</button>
        </div>
      </form>
    </>
  );
}
