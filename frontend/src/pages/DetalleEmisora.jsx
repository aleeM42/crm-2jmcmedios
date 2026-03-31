// ==============================================
// DetalleEmisora.jsx — Detalle de Aliado Comercial
// ==============================================
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';

const STATUS_DOT = {
  Activo: 'bg-accent-green',
  Inactivo: 'bg-slate-300',
  Cerrado: 'bg-red-500',
};

export default function DetalleEmisora() {
  const { id } = useParams();
  const [emisora, setEmisora] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmisora() {
      try {
        const response = await api.get(`/aliados/${id}`);
        if (response.success) {
          setEmisora(response.data);
        }
      } catch (error) {
        console.error('Error fetching emisora detail:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEmisora();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-slate-500">Cargando...</div>;
  if (!emisora) return <div className="p-8 text-center text-slate-500">Emisora no encontrada</div>;

  const STATUS_STYLE = {
    'programada': 'bg-blue-100 text-blue-700',
    'en transmision': 'bg-primary/10 text-primary',
    'finalizada': 'bg-accent-green/10 text-accent-green',
    'suspendida': 'bg-red-100 text-red-700',
  };

  // Cálculos rápidos para KPIs a partir de las pautas asociadas
  const pautasActivasCount = emisora.kpis?.campanas_activas || 0;
  const facturacionTotal = emisora.pautas?.reduce((sum, p) => sum + Number(p.monto_ot), 0) || 0;
  
  // Estado dinámico: Es Activa si su estado en BD es Activa Y además tiene pautas asociadas
  const esActivaEnBD = emisora.estado?.toLowerCase() === 'activo' || emisora.estado?.toLowerCase() === 'activa';
  const estadoMostrar = (esActivaEnBD && emisora.pautas?.length > 0) ? 'Activo' : 'Inactivo';

  return (
    <>
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/aliados-comerciales">Aliados Comerciales</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">{emisora.nombre_emisora}</span>
          </nav>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-900 font-display">{emisora.nombre_emisora || emisora.razon_social || 'Detalle de Aliado'}</h2>
            {estadoMostrar === 'Activo' ? (
              <span className="bg-secondary/10 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-secondary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Activa
              </span>
            ) : (
              <span className="bg-slate-100 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-slate-200" title={esActivaEnBD ? 'Inactiva por no tener pautas asociadas' : ''}>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Inactiva {esActivaEnBD && (!emisora.pautas || emisora.pautas.length === 0) ? '(Sin Pautas)' : ''}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
          <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-red-500/20 text-red-500 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors">
            <span className="material-symbols-outlined text-lg">delete</span> Eliminar
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-lg">edit</span> Editar
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {/* INFORMACIÓN GENERAL */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">info</span>
              <h3 className="text-lg font-bold text-slate-800 font-display">Información General</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Razón Social</p>
                <p className="text-sm font-semibold text-slate-700">{emisora.razon_social || '-'}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nombre Emisora</p>
                <p className="text-sm font-semibold text-slate-700">{emisora.nombre_emisora || '-'}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">RIF</p>
                <p className="text-sm font-semibold text-slate-700">{emisora.rif || '-'}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Frecuencia</p>
                <span className="inline-block mt-1 px-3 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-lg border border-primary/20">{emisora.frecuencia || '-'}</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Categoría</p>
                <p className="text-sm font-semibold text-slate-700 capitalize">{emisora.categoria || '-'}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dirección</p>
                <p className="text-sm font-semibold text-slate-700">{emisora.direccion || '-'}</p>
              </div>
            </div>
          </section>

          {/* COBERTURA Y UBICACIÓN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">radar</span>
                <h3 className="text-lg font-bold text-slate-800 font-display">Cobertura</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {emisora.cobertura_nombre ? (
                  <span className="px-3 py-1 border-2 border-primary/30 text-primary text-xs font-bold rounded-full">{emisora.cobertura_nombre}</span>
                ) : (
                  <span className="text-sm text-slate-500 font-medium">No definida</span>
                )}
              </div>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <h3 className="text-lg font-bold text-slate-800 font-display">Ubicación</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Región</span>
                  <span className="text-sm font-semibold text-slate-700">{emisora.region_nombre || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Estado</span>
                  <span className="text-sm font-semibold text-slate-700">{emisora.estado_nombre || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Ciudad</span>
                  <span className="text-sm font-semibold text-slate-700">{emisora.ciudad_nombre || '-'}</span>
                </div>
              </div>
            </section>
          </div>

          {/* PAUTAS ASOCIADAS */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">list_alt</span>
                <h3 className="text-lg font-bold text-slate-800 font-display">Pautas Asociadas</h3>
              </div>
              <button className="text-primary text-xs font-bold hover:underline">Ver todas</button>
            </div>
            {emisora.pautas && emisora.pautas.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      <th className="pb-3 px-2">Nro OT</th>
                      <th className="pb-3 px-2">Marca</th>
                      <th className="pb-3 px-2 text-center">Estado</th>
                      <th className="pb-3 px-2 text-right">Monto OT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 ">
                    {emisora.pautas.map((p) => (
                      <tr key={p.id} className="text-sm hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-2 font-bold text-primary">
                          <Link to={`/pautas/${p.id}`} className="hover:underline">{p.numero_ot}</Link>
                        </td>
                        <td className="py-4 px-2 font-semibold text-slate-700">{p.marca}</td>
                        <td className="py-4 px-2 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${STATUS_STYLE[p.estado?.toLowerCase()] || 'bg-slate-100 text-slate-500'}`}>{p.estado}</span>
                        </td>
                        <td className="py-4 px-2 text-right font-bold text-slate-800">${Number(p.monto_ot).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-lg border border-slate-100 border-dashed">No hay pautas asociadas a esta emisora.</p>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* CONTACTOS */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">person</span>
              <h3 className="text-lg font-bold text-slate-800 font-display">Contacto Principal</h3>
            </div>
            {emisora.contactos && emisora.contactos.length > 0 ? (
              <div className="space-y-8">
                {emisora.contactos.map((contacto, idx) => {
                  const initials = `${contacto.pri_nombre?.charAt(0) || ''}${contacto.pri_apellido?.charAt(0) || ''}`.toUpperCase();
                  return (
                    <div key={contacto.id} className={idx > 0 ? 'pt-6 border-t border-slate-100' : ''}>
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-3 flex items-center justify-center border-2 border-primary/20 text-white font-bold text-2xl tracking-tighter">
                          {initials}
                        </div>
                        <h4 className="font-bold text-lg text-slate-800">{contacto.pri_nombre} {contacto.pri_apellido}</h4>
                        <span className="inline-block mt-1 px-3 py-0.5 bg-accent-light/30 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest border border-primary/10">{contacto.rol || 'Contacto'}</span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-400 text-lg">mail</span>
                          <a href={`mailto:${contacto.correo}`} className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors">{contacto.correo}</a>
                        </div>
                        {contacto.telefonos && contacto.telefonos.length > 0 && (
                          <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-slate-400 text-lg">call</span>
                            <div className="flex flex-col gap-1">
                              {contacto.telefonos.map(t => (
                                <p key={`${t.codigo_area}-${t.numero}`} className="text-sm font-semibold text-slate-700">
                                  {t.codigo_area}-{t.numero}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                        {contacto.anotac_especiales && (
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl mt-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Notas de Contacto</p>
                            <p className="text-xs italic text-slate-600 dark:text-slate-400">{contacto.anotac_especiales}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-lg border border-slate-100 border-dashed">No hay contactos registrados.</p>
            )}
          </section>

          {/* ESTADÍSTICAS */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <h3 className="text-lg font-bold text-slate-800 font-display">Estadísticas</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Facturación Aprox.</p>
                  <p className="text-2xl font-black text-slate-900">${facturacionTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                </div>
                <span className="material-symbols-outlined text-secondary text-3xl">payments</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pautas Históricas</p>
                  <p className="text-2xl font-black text-slate-900">{emisora.pautas?.length || 0}</p>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl">receipt_long</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pautas Activas</p>
                  <p className="text-2xl font-black text-slate-900">{pautasActivasCount}</p>
                </div>
                <span className="material-symbols-outlined text-accent-medium text-3xl">pending_actions</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
