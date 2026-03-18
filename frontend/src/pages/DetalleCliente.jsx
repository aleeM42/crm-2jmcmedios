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
          {c.sub_empresas && c.sub_empresas.length > 0 && (
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
                {c.sub_empresas.map((se, i) => (
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
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* ═══ CONTACTO PRINCIPAL ═══ */}
          {contactoPrincipal && (
            <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 font-display flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">contact_page</span>
                  Contacto Principal
                </h3>
              </div>
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
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Correo</span>
                    <span className="text-xs font-semibold text-slate-700">{contactoPrincipal.correo}</span>
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
                      <span className="text-xs font-semibold text-slate-700">{contactoPrincipal.fecha_nac}</span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Rol</span>
                    <div className="mt-1">
                      <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-black rounded uppercase">{contactoPrincipal.rol}</span>
                    </div>
                  </div>
                  {contactoPrincipal.anotac_especiales && (
                    <div className="flex flex-col p-3 bg-slate-50 rounded-lg">
                      <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Anotaciones Especiales</span>
                      <p className="text-[10px] italic text-slate-500">{contactoPrincipal.anotac_especiales}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ═══ CONTACTOS ADICIONALES ═══ */}
          {contactosAdicionales.length > 0 && (
            <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 font-display text-sm">Contactos Adicionales</h3>
              </div>
              <div className="p-6 space-y-4">
                {contactosAdicionales.map(ca => (
                  <div key={ca.id} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-b-0">
                    <div>
                      <p className="text-xs font-bold text-slate-700">{ca.pri_nombre} {ca.pri_apellido}</p>
                      <p className="text-[10px] text-slate-400">{ca.departamento}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold rounded uppercase">{ca.rol}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

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
