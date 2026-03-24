// ==============================================
// DetalleCliente.jsx — Vista Detalle de Cliente (conectada al backend)
// ==============================================
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getClienteById } from '../services/cliente.service.js';

export default function DetalleCliente() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const result = await getClienteById(id);
        if (result.success) {
          setCliente(result.data);
        }
      } catch (err) {
        setError(err.message || 'Error al cargar cliente');
      } finally {
        setLoading(false);
      }
    };
    fetchCliente();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
        <p className="mt-4 text-slate-400 text-sm">Cargando datos del cliente...</p>
      </div>
    );
  }

  if (error || !cliente) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <span className="material-symbols-outlined text-4xl text-red-400">error</span>
        <p className="mt-4 text-red-500 text-sm">{error || 'Cliente no encontrado'}</p>
        <Link to="/clientes" className="mt-4 text-primary hover:underline text-sm font-bold">← Volver a Clientes</Link>
      </div>
    );
  }

  const c = cliente;
  const contactoPrincipal = c.contactos?.[0];
  const contactosAdicionales = c.contactos?.slice(1) || [];

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
        </div>
      </header>

      {/* ═══ KPI CARDS ═══ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#F4FAFB] rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-primary text-2xl relative left-[1px]">campaign</span>
           </div>
           <span className="text-3xl font-black text-slate-800">{c.kpis?.pautas_activas || 0}</span>
           <span className="text-[10px] mt-1 uppercase font-bold text-slate-400 tracking-wider">Pautas Activas</span>
        </div>
        <div className="bg-[#F4FAFB] rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
           <div className="w-12 h-12 bg-accent-green/10 rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-accent-green text-2xl relative left-[1px]">payments</span>
           </div>
           <span className="text-3xl font-black text-slate-800">${parseFloat(c.kpis?.monto_total || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
           <span className="text-[10px] mt-1 uppercase font-bold text-slate-400 tracking-wider">Monto Total</span>
        </div>
        <div className="bg-[#F4FAFB] rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
           <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-purple-600 text-2xl">event_available</span>
           </div>
           <span className="text-xl font-black text-slate-800 mt-2 mb-[3px]">{c.kpis?.ultima_visita ? new Date(c.kpis.ultima_visita).toLocaleDateString() : '--'}</span>
           <span className="text-[10px] mt-1 uppercase font-bold text-slate-400 tracking-wider">Última Visita</span>
        </div>
        <div className="bg-[#F4FAFB] rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
           <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-orange-600 text-2xl">cell_tower</span>
           </div>
           <span className="text-3xl font-black text-slate-800">{c.kpis?.emisoras_presencia || 0}</span>
           <span className="text-[10px] mt-1 uppercase font-bold text-slate-400 tracking-wider">Emisoras c/ Presencia</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {/* ═══ INFORMACIÓN GENERAL ═══ */}
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
              {c.lugar_nombre && (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Ubicación</p>
                  <p className="text-sm font-semibold text-slate-700">{c.lugar_nombre}</p>
                </div>
              )}
              {c.vendedor_nombre && (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Vendedor Asignado</p>
                  <p className="text-sm font-semibold text-slate-700">{c.vendedor_nombre} {c.vendedor_apellido}</p>
                </div>
              )}
            </div>
          </section>

          {/* ═══ MARCAS ═══ */}
          {c.marcas && c.marcas.length > 0 && (
            <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent-green">sell</span>
                  Marcas
                </h3>
              </div>
              <div className="p-6 flex flex-wrap gap-2">
                {c.marcas.map(m => (
                  <span key={m.id} className="px-3 py-1 bg-accent-light/30 text-slate-700 text-xs font-bold rounded-lg border border-accent-light/50">{m.nombre}</span>
                ))}
              </div>
            </section>
          )}

          {/* ═══ SUB-EMPRESAS ═══ */}
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
              {c.sub_empresas && c.sub_empresas.length > 0 ? (
                c.sub_empresas.map((se, i) => (
                  <div key={se.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      {i < c.sub_empresas.length - 1 && <div className="w-px h-full bg-slate-100"></div>}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 font-display">{se.nombre}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">RIF: {se.rif_fiscal} • {se.direccion}</p>
                      </div>
                      {se.marcas && se.marcas.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {se.marcas.map(m => (
                            <span key={m.id} className="px-2 py-1 bg-accent-light/30 text-slate-600 text-[10px] font-bold rounded-lg border border-accent-light/50">{m.nombre}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <span className="material-symbols-outlined text-slate-300 text-4xl mb-2 block">domain_disabled</span>
                  <p className="text-xs font-medium text-slate-500">No hay sub-empresas asociadas a este cliente.</p>
                </div>
              )}
            </div>
          </section>

          {/* ═══ PAUTAS ASOCIADAS ═══ */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">assignment</span>
                Pautas Asociadas
              </h3>
              <Link to="/pautas/agregar" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline bg-primary/10 px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm">add</span>Nueva
              </Link>
            </div>
            <div className="p-0">
              {c.pautas && c.pautas.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-400">
                          <th className="px-6 py-3 font-bold whitespace-nowrap">N° Orden</th>
                          <th className="px-6 py-3 font-bold">Marca</th>
                          <th className="px-6 py-3 font-bold whitespace-nowrap">Periodo</th>
                          <th className="px-6 py-3 font-bold">Monto OT</th>
                          <th className="px-6 py-3 font-bold">Estado</th>
                       </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-slate-50">
                      {c.pautas.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-700 whitespace-nowrap">
                            <Link to={`/pautas/${p.id}`} className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">{p.numero_ot}</Link>
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-600">{p.marca}</td>
                          <td className="px-6 py-4 font-medium text-slate-500 whitespace-nowrap">
                            {new Date(p.fecha_inicio).toLocaleDateString()} - {new Date(p.fecha_fin).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-700 whitespace-nowrap">${parseFloat(p.monto_ot).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${
                              p.estado === 'programada' ? 'bg-blue-100 text-blue-600' :
                              p.estado === 'en transmision' ? 'bg-accent-green/20 text-accent-green' :
                              p.estado === 'suspendida' ? 'bg-orange-100 text-orange-600' : 'bg-slate-200 text-slate-600'
                            }`}>{p.estado}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                   <span className="material-symbols-outlined text-slate-300 text-5xl mb-3 block">assignment_late</span>
                   <p className="text-sm font-medium text-slate-500">No hay pautas asociadas a este cliente.</p>
                </div>
              )}
            </div>
          </section>

          {/* ═══ ACTIVIDAD / VISITAS ═══ */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history</span>
                Actividad Reciente
              </h3>
            </div>
            <div className="p-6 max-h-[500px] overflow-y-auto custom-scrollbar">
              {c.visitas && c.visitas.length > 0 ? (
                <div className="space-y-6">
                  {c.visitas.map((v, i) => (
                    <div key={v.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${v.tipo === 'presencial' ? 'bg-primary' : 'bg-accent-green'}`}>
                          <span className="material-symbols-outlined text-sm">{v.tipo === 'presencial' ? 'directions_walk' : 'call'}</span>
                        </div>
                        {i < c.visitas.length - 1 && <div className="w-px h-full bg-slate-200 mt-2"></div>}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold text-slate-800">{v.objetivo_visita}</h4>
                          <span className="text-[10px] font-bold text-slate-400">{new Date(v.fecha).toLocaleDateString()} {v.hora}</span>
                        </div>
                        <p className="text-xs text-slate-600 mb-2">Con <span className="font-semibold">{v.contacto_nombre} {v.contacto_apellido}</span> en {v.lugar}</p>
                        {v.detalle && <p className="text-xs italic text-slate-500 bg-white border border-slate-100 p-3 rounded-lg">{v.detalle}</p>}
                        <div className="mt-3 flex items-center gap-3">
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded flex items-center gap-1 ${v.efectiva === 'si' ? 'bg-accent-green/20 text-accent-green' : 'bg-red-100 text-red-600'}`}>
                            <span className="material-symbols-outlined text-[12px]">{v.efectiva === 'si' ? 'check_circle' : 'cancel'}</span>
                            Efectiva: {v.efectiva}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">Por: {v.vendedor_nombre} {v.vendedor_apellido}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                   <span className="material-symbols-outlined text-slate-300 text-5xl mb-3 block">pending_actions</span>
                   <p className="text-sm font-medium text-slate-500">No hay registro de actividad con este cliente aún.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* ═══ CONTACTO PRINCIPAL ═══ */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">contact_page</span>
                Contacto Principal
              </h3>
            </div>
            {contactoPrincipal ? (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-accent-light/20 flex items-center justify-center text-primary font-black text-xl font-display">
                    {contactoPrincipal.pri_nombre?.[0]}{contactoPrincipal.pri_apellido?.[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 font-display">{contactoPrincipal.pri_nombre} {contactoPrincipal.pri_apellido}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{contactoPrincipal.departamento}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Correo</span>
                    <span className="text-xs font-semibold text-slate-700 break-all">{contactoPrincipal.correo}</span>
                  </div>
                  {contactoPrincipal.telefonos && contactoPrincipal.telefonos.length > 0 && (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Teléfono</span>
                      <span className="text-xs font-semibold text-slate-700">
                        {contactoPrincipal.telefonos.map(t => `${t.codigo_area}-${t.numero}`).join(', ')}
                      </span>
                    </div>
                  )}
                  {contactoPrincipal.fecha_nac && (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Fecha Nacimiento</span>
                      <span className="text-xs font-semibold text-slate-700">{new Date(contactoPrincipal.fecha_nac).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Rol</span>
                    <div className="mt-1">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded uppercase">{contactoPrincipal.rol}</span>
                    </div>
                  </div>
                  {contactoPrincipal.anotac_especiales && (
                    <div className="flex flex-col p-3 bg-white border border-slate-100 rounded-lg mt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Anotaciones Especiales</span>
                      <p className="text-[10px] italic text-slate-500">{contactoPrincipal.anotac_especiales}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center flex flex-col items-center">
                 <span className="material-symbols-outlined text-slate-300 text-4xl mb-2 block">person_off</span>
                 <p className="text-xs font-medium text-slate-500">No hay contactos registrados.</p>
              </div>
            )}
          </section>

          {/* ═══ CONTACTOS ADICIONALES ═══ */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 font-display text-sm">Contactos Adicionales</h3>
            </div>
            <div className="p-6 space-y-4">
              {contactosAdicionales.length > 0 ? (
                contactosAdicionales.map(ca => (
                  <div key={ca.id} className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-700">{ca.pri_nombre} {ca.pri_apellido}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{ca.departamento}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold rounded uppercase">{ca.rol}</span>
                    </div>
                    {ca.correo && (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <span className="material-symbols-outlined text-[13px] text-slate-400">mail</span>
                        <span className="break-all">{ca.correo}</span>
                      </div>
                    )}
                    {ca.telefonos && ca.telefonos.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <span className="material-symbols-outlined text-[13px] text-slate-400">call</span>
                        <span>{ca.telefonos.map(t => `${t.codigo_area}-${t.numero}`).join(', ')}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-xs font-medium text-slate-500">No hay contactos adicionales.</p>
                </div>
              )}
            </div>
          </section>

          {/* ═══ OBSERVACIÓN ═══ */}
          {c.observacion && (
            <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 font-display text-sm">Observación</h3>
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-600 leading-relaxed">{c.observacion}</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
