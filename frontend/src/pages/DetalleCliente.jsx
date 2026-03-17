// ==============================================
// DetalleCliente.jsx — Vista Detalle de Cliente
// Labels y datos mapeados 1:1 con entidades CLIENTE, CONTACTO, TELEFONO del CSV ER
// ==============================================
import { Link } from 'react-router-dom';

// Mock — campos exactos de la entidad CLIENTE
const CLIENTE_MOCK = {
  id: 'c1',
  nombre: 'Alimentos Polar',
  razon_social: 'Alimentos Polar C.A.',
  tipo: 'empresa',
  direccion: 'Av. Principal de Los Cortijos de Lourdes, Caracas.',
  rif_fiscal: 'J-00041318-1',
  clasificacion: 'Cliente Directo',
  sector: 'Alimentación',
  estado: 'Activo',
  nombre_agencia: null,
  observacion: 'Cliente corporativo con alto volumen estacional en Q4.',
};

// Mock — campos exactos de CONTACTO
const CONTACTO_PRINCIPAL = {
  id: 'ct1',
  primer_nombre: 'Ricardo',
  segundo_nombre: null,
  primer_apellido: 'Mendoza',
  departamento: 'Mercadeo',
  correo: 'r.mendoza@alimentos-polar.com',
  fecha_nacimiento: '1985-03-15',
  anotaciones_especiales: 'Prefiere contacto vía correo electrónico antes de llamadas directas. Disponible solo lunes y miércoles.',
  rol: 'Decisor',
  tipo: 'cliente',
};

// Mock — TELEFONO (PK compuesta)
const TELEFONOS_MOCK = [
  { codigo_area: '0412', cuerpo: '1234567' },
];

// Mock — contactos adicionales
const CONTACTOS_ADICIONALES = [
  { id: 'ct2', primer_nombre: 'Ana', primer_apellido: 'Silva', departamento: 'Medios', rol: 'Influenciador' },
  { id: 'ct3', primer_nombre: 'Carlos', primer_apellido: 'Perez', departamento: 'Administración', rol: 'Operativo' },
];

// Mock — sub-empresas con marcas
const SUB_EMPRESAS = [
  {
    id: 'se1',
    nombre: 'Distribuidora Polar Oriente',
    rif_fiscal: 'J-30459201-0',
    direccion: 'Barcelona, Edo. Anzoátegui',
    marcas: [{ nombre: 'Harina PAN' }, { nombre: 'Mavesa' }, { nombre: 'Toddy' }],
  },
  {
    id: 'se2',
    nombre: 'Pepsi-Cola Venezuela',
    rif_fiscal: 'J-00012345-6',
    direccion: 'Caracas, Miranda',
    marcas: [{ nombre: 'Pepsi' }, { nombre: 'Gatorade' }, { nombre: '7-Up' }],
  },
];

// Mock — pautas asociadas (campos de PAUTA)
const PAUTAS_MOCK = [
  { numero_ot: 'OT-2023-45', marca: 'Harina PAN', cantidad_emisoras: 8, fecha_inicio: '2023-10-01', fecha_fin: '2023-12-31', estado: 'En transmisión' },
  { numero_ot: 'OT-2023-92', marca: 'Pepsi', cantidad_emisoras: 4, fecha_inicio: '2023-11-15', fecha_fin: '2023-12-15', estado: 'Programada' },
];

export default function DetalleCliente() {
  const c = CLIENTE_MOCK;
  const ct = CONTACTO_PRINCIPAL;

  return (
    <>
      {/* HEADER */}
      <header className="flex flex-col mb-8">
        <div className="flex items-center justify-between mb-2">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/clientes">Clientes</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">{c.nombre}</span>
          </nav>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${c.estado === 'Activo' ? 'bg-accent-green/10 text-accent-green' : 'bg-slate-100 text-slate-500'}`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1 ${c.estado === 'Activo' ? 'bg-accent-green' : 'bg-slate-400'}`}></span>
            {c.estado}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-black text-slate-900 font-display">Detalle de Cliente</h2>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-50 transition-colors rounded-lg text-sm font-bold font-display">Eliminar</button>
            <button className="px-6 py-2 bg-primary text-white hover:bg-primary/90 transition-shadow shadow-lg shadow-primary/20 rounded-lg text-sm font-bold font-display">Editar</button>
          </div>
        </div>
      </header>

      {/* KPI ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-slate-400 text-xs font-bold uppercase mb-1 tracking-wide">Pautas Activas</span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 font-display leading-none">5</span>
            <span className="text-primary text-sm font-bold mb-1 material-symbols-outlined">campaign</span>
          </div>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-slate-400 text-xs font-bold uppercase mb-1 tracking-wide">Inversión Total</span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 font-display leading-none">$45,000</span>
            <span className="text-accent-green text-sm font-bold mb-1 material-symbols-outlined">payments</span>
          </div>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-slate-400 text-xs font-bold uppercase mb-1 tracking-wide">Emisoras con Presencia</span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 font-display leading-none">12</span>
            <span className="text-secondary text-sm font-bold mb-1 material-symbols-outlined">radio</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {/* ═══ INFORMACIÓN GENERAL — CLIENTE entity ═══ */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Información General
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Tipo</p>
                <p className="text-sm font-semibold text-slate-700 capitalize">{c.tipo}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Nombre</p>
                <p className="text-sm font-semibold text-slate-700">{c.nombre}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Razón Social</p>
                <p className="text-sm font-semibold text-slate-700">{c.razon_social}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">RIF Fiscal</p>
                <p className="text-sm font-semibold text-slate-700">{c.rif_fiscal}</p>
              </div>
              <div className="space-y-1 col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Dirección</p>
                <p className="text-sm font-semibold text-slate-700">{c.direccion}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Clasificación</p>
                <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded uppercase">{c.clasificacion}</span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Sector</p>
                <p className="text-sm font-semibold text-slate-700">{c.sector}</p>
              </div>
              {c.nombre_agencia && (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Nombre Agencia</p>
                  <p className="text-sm font-semibold text-slate-700">{c.nombre_agencia}</p>
                </div>
              )}
            </div>
          </section>

          {/* ═══ SUB-EMPRESAS Y MARCAS — CLIENTE(sub empresa) + MARCA_INTER ═══ */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">corporate_fare</span>
                Sub-Empresas y Marcas
              </h3>
              <Link to={`/clientes/${c.id}/sub-empresa`} className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-sm">add_circle</span>Agregar Sub-Empresa
              </Link>
            </div>
            <div className="p-6 space-y-6">
              {SUB_EMPRESAS.map((se, i) => (
                <div key={se.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    {i < SUB_EMPRESAS.length - 1 && <div className="w-px h-full bg-slate-100"></div>}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 font-display">{se.nombre}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">RIF: {se.rif_fiscal} • {se.direccion}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {se.marcas.map((m) => (
                        <span key={m.nombre} className="px-2 py-1 bg-accent-light/30 text-slate-600 text-[10px] font-bold rounded-lg border border-accent-light/50">{m.nombre}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ PAUTAS ASOCIADAS — PAUTA entity ═══ */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                Pautas Asociadas
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
                    <th className="px-6 py-4">Número OT</th>
                    <th className="px-6 py-4">Marca</th>
                    <th className="px-6 py-4">Emisoras</th>
                    <th className="px-6 py-4">Fecha Inicio</th>
                    <th className="px-6 py-4">Fecha Fin</th>
                    <th className="px-6 py-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {PAUTAS_MOCK.map((p) => (
                    <tr key={p.numero_ot} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold text-primary">{p.numero_ot}</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">{p.marca}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">{p.cantidad_emisoras}</span>
                      </td>
                      <td className="px-6 py-4 text-[10px] font-semibold text-slate-500">{p.fecha_inicio}</td>
                      <td className="px-6 py-4 text-[10px] font-semibold text-slate-500">{p.fecha_fin}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 text-[10px] font-black rounded uppercase ${p.estado === 'En transmisión' ? 'bg-accent-green/10 text-accent-green' : p.estado === 'Programada' ? 'bg-primary/10 text-primary' : p.estado === 'Suspendida' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                          {p.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* ═══ CONTACTO PRINCIPAL — CONTACTO entity ═══ */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">contact_page</span>
                Contacto Principal
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-accent-light/20 flex items-center justify-center text-primary font-black text-xl font-display">
                  {ct.primer_nombre[0]}{ct.primer_apellido[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 font-display">{ct.primer_nombre} {ct.primer_apellido}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ct.departamento}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Correo</span>
                  <span className="text-xs font-semibold text-slate-700">{ct.correo}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Teléfono</span>
                  <span className="text-xs font-semibold text-slate-700">
                    {TELEFONOS_MOCK.map((t) => `${t.codigo_area}-${t.cuerpo}`).join(', ')}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Fecha Nacimiento</span>
                  <span className="text-xs font-semibold text-slate-700">{ct.fecha_nacimiento || '—'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Rol</span>
                  <div className="mt-1">
                    <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-black rounded uppercase">{ct.rol}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Tipo</span>
                  <span className="text-xs font-semibold text-slate-700 capitalize">{ct.tipo}</span>
                </div>
                {ct.anotaciones_especiales && (
                  <div className="flex flex-col p-3 bg-slate-50 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Anotaciones Especiales</span>
                    <p className="text-[10px] italic text-slate-500">{ct.anotaciones_especiales}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ═══ CONTACTOS ADICIONALES ═══ */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2 text-sm">
                Contactos Adicionales
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {CONTACTOS_ADICIONALES.map((ca) => (
                <div key={ca.id} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-b-0">
                  <div>
                    <p className="text-xs font-bold text-slate-700">{ca.primer_nombre} {ca.primer_apellido}</p>
                    <p className="text-[10px] text-slate-400">{ca.departamento}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold rounded uppercase">{ca.rol}</span>
                </div>
              ))}
              <button className="w-full py-2 flex items-center justify-center gap-2 border border-dashed border-slate-200 hover:border-primary hover:text-primary transition-all rounded-lg text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                Agregar Contacto
              </button>
            </div>
          </section>

          {/* ═══ OBSERVACIÓN + HISTORIAL ═══ */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display text-sm">Observación y Actividad</h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Observación</label>
                <textarea
                  name="observacion"
                  className="w-full h-24 p-3 text-xs bg-slate-50 border-none rounded-lg focus:ring-1 focus:ring-primary text-slate-600 resize-none"
                  placeholder="Escribir observaciones aquí..."
                  defaultValue={c.observacion}
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Historial Reciente</label>
                <div className="space-y-4 relative">
                  <div className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-100"></div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white bg-primary"></div>
                    <p className="text-[10px] font-bold text-slate-800">Reunión de Planificación</p>
                    <p className="text-[9px] text-slate-400">Hace 2 días • por María González</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white bg-accent-green"></div>
                    <p className="text-[10px] font-bold text-slate-800">Nueva OT Aprobada (Pepsi)</p>
                    <p className="text-[9px] text-slate-400">15 de Nov • Automático</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white bg-slate-300"></div>
                    <p className="text-[10px] font-bold text-slate-800">Envío de Tarifario 2024</p>
                    <p className="text-[9px] text-slate-400">10 de Nov • por Ricardo Mendoza</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
