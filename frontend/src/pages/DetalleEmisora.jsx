// ==============================================
// DetalleEmisora.jsx — Detalle de Aliado Comercial
// ==============================================
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { getCurrentUser } from '../services/auth.service';
import EditarAliadoModal from '../components/EditarAliadoModal';

const STATUS_DOT = {
  Activo: 'bg-accent-green',
  Inactivo: 'bg-slate-300',
  Cerrado: 'bg-red-500',
};

export default function DetalleEmisora() {
  const { id } = useParams();
  const [emisora, setEmisora] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const user = getCurrentUser();
  const rol = user?.rol || '';

  const handleEditSuccess = useCallback(async () => {
    try {
      const response = await api.get(`/aliados/${id}`);
      if (response.success) {
        setEmisora(response.data);
        setSuccessMsg('Aliado actualizado exitosamente');
      }
    } catch { /* keep current state on error */ }
    setShowEdit(false);
  }, [id]);

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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`/aliados/${id}`);
      if (response.success) {
        setSuccessMsg('Aliado eliminado exitosamente. Redirigiendo...');
        setShowDelete(false);
        setTimeout(() => {
          navigate('/aliados-comerciales');
        }, 1500);
      } else {
        alert(response.error || 'Error al eliminar el aliado');
      }
    } catch (error) {
      console.error('Error deleting aliado:', error);
      alert('Error de conexión al intentar eliminar');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Cargando...</div>;
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
              <span className="bg-accent-green/10 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-secondary/20">
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
          {/* Solo Admin, Director General y Director pueden eliminar aliados */}
          {(rol === 'Administrador' || rol === 'Director General' || rol === 'Director') && (
            <button
              onClick={() => setShowDelete(true)}
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-red-500/20 text-red-500 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">delete</span> Eliminar
            </button>
          )}

          {/* Invitado y Gestor de Pautas no pueden editar aliados. Vendedor sí puede (según feedback). */}
          {(rol !== 'Invitado' && rol !== 'Gestor de Pautas') && (
            <button onClick={() => setShowEdit(true)} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-lg">edit</span> Editar
            </button>
          )}
        </div>
      </header>

      {successMsg && (
        <div className="mb-6 animate-[fadeIn_0.3s_ease-out] p-4 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-green-500 text-xl">check_circle</span>
            <p className="text-sm text-green-700 font-semibold">{successMsg}</p>
          </div>
          <button onClick={() => setSuccessMsg('')} className="text-green-500 hover:text-green-700 flex items-center justify-center p-1 rounded-full hover:bg-green-100 transition-colors">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {/* INFORMACIÓN GENERAL */}
          <section className="bg-[#F4FAFB] rounded-2xl p-6 shadow-sm border border-slate-100">
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
            <section className="bg-[#F4FAFB] rounded-2xl p-6 shadow-sm border border-slate-100">
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

            <section className="bg-[#F4FAFB] rounded-2xl p-6 shadow-sm border border-slate-100">
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
          <section className="bg-[#F4FAFB] rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">list_alt</span>
                <h3 className="text-lg font-bold text-slate-800 font-display">Pautas Asociadas</h3>
              </div>
              <Link to="/pautas" className="text-primary text-xs font-bold hover:underline">Ver todas</Link>
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
          <section className="bg-[#F4FAFB] rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-accent-green">person</span>
              <h3 className="text-lg font-bold text-slate-800 font-display">Contacto Principal</h3>
            </div>
            {emisora.contactos && emisora.contactos.length > 0 ? (
              <div className="space-y-8">
                {emisora.contactos.map((contacto, idx) => {
                  const initials = `${contacto.pri_nombre?.charAt(0) || ''}${contacto.pri_apellido?.charAt(0) || ''}`.toUpperCase();
                  return (
                    <div key={contacto.id} className={idx > 0 ? 'pt-6 border-t border-slate-100' : ''}>
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-accent-green/10 mx-auto mb-3 flex items-center justify-center border-2 border-accent-green/20 text-accent-green font-bold text-2xl tracking-tighter">
                          {initials}
                        </div>
                        <h4 className="font-bold text-lg text-slate-800">{contacto.pri_nombre} {contacto.pri_apellido}</h4>
                        <span className="inline-block mt-1 px-3 py-0.5 bg-accent-green/10 text-accent-green text-[10px] font-black rounded-lg uppercase tracking-widest border border-primary/10">{contacto.rol || 'Contacto'}</span>
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
                          <div className="p-3 bg-accent-green/100 rounded-xl mt-4">
                            <p className="text-[10px] font-bold text-slate-100 uppercase tracking-widest mb-1">Notas de Contacto</p>
                            <p className="text-xs italic text-slate-100 dark:text-slate-100">{contacto.anotac_especiales}</p>
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
          <section className="bg-[#F4FAFB] rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-accent-green">analytics</span>
              <h3 className="text-lg font-bold text-slate-800 font-display">Estadísticas</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Facturación Aprox.</p>
                  <p className="text-2xl font-black text-slate-900">${facturacionTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                </div>
                <span className="material-symbols-outlined text-accent-green text-3xl">payments</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pautas Históricas</p>
                  <p className="text-2xl font-black text-slate-900">{emisora.pautas?.length || 0}</p>
                </div>
                <span className="material-symbols-outlined text-accent-green text-3xl">receipt_long</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pautas Activas</p>
                  <p className="text-2xl font-black text-slate-900">{pautasActivasCount}</p>
                </div>
                <span className="material-symbols-outlined text-accent-green text-3xl">pending_actions</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Modal de edición */}
      {showEdit && (
        <EditarAliadoModal
          emisora={emisora}
          onClose={() => setShowEdit(false)}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {showDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 animate-[zoomIn_0.2s_ease-out]">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 text-center mb-2 font-display">Confirmar eliminación</h3>
            <p className="text-slate-500 text-center text-sm mb-8 leading-relaxed">
              ¿Estás seguro de que deseas eliminar a <span className="font-bold text-slate-800">{emisora.nombre_emisora || emisora.razon_social}</span>? Esta acción no se puede deshacer.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full py-3 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Eliminando...
                  </>
                ) : (
                  'Sí, eliminar definitivamente'
                )}
              </button>
              <button
                onClick={() => setShowDelete(false)}
                disabled={isDeleting}
                className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
