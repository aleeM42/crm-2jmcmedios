// ==============================================
// MiPerfil.jsx — Perfil dinámico del usuario logueado
// ==============================================

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../services/api';
import EditarMiPerfilModal from '../components/EditarMiPerfilModal.jsx';
import { eliminarVendedor } from '../services/vendedor.service.js';

export default function MiPerfil() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const fetchPerfil = async () => {
    try {
      const res = await api.get('/perfil');
      setPerfil(res.data);
    } catch (err) {
      console.error('Error al cargar perfil:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfil();
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    setErrorMsg('');
    try {
      const res = await eliminarVendedor(perfil.id);
      if (res.success) {
        // Al eliminarse a sí mismo lo ideal es sacarlo del sistema (cerrar sesión)
        navigate('/login', { state: { successMsg: 'Tu perfil ha sido eliminado exitosamente.' } });
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Hubo un error al eliminar tu perfil. Es posible que tengas clientes asignados u otras restricciones activas.');
    } finally {
      setDeleting(false);
      setDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="text-center py-16 text-slate-400">
        <span className="material-symbols-outlined text-5xl mb-2 block">error</span>
        <p className="text-lg font-semibold">No se pudo cargar el perfil</p>
      </div>
    );
  }

  const initials = `${(perfil.primer_nombre || '')[0] || ''}${(perfil.primer_apellido || '')[0] || ''}`.toUpperCase();
  const fullName = `${perfil.primer_nombre || ''} ${perfil.primer_apellido || ''}`.trim();
  const rolLabel = perfil.tipo === 'Director' ? 'Director de Ventas' : 'Representante de Ventas';
  const meta = perfil.meta || 0;
  const clientes = perfil.clientes_asignados || [];

  return (
    <>
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/dashboard">CRM 2JMC</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">Mi Perfil</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 font-display">Mi Perfil</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">{fullName}</p>
            <p className="text-xs text-slate-500">{rolLabel}</p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-primary shadow-sm">{initials}</div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent-green rounded-full "></div>
          </div>
        </div>
      </header>



      {/* INFO CARD */}
      <section className="bg-[#F4FAFB] rounded-xl p-6 shadow-sm border border-slate-100 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Correo</p>
            <p className="text-sm font-semibold text-slate-800">{perfil.correo}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Rol</p>
            <p className="text-sm font-semibold text-slate-800">{perfil.rol}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Estado</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${perfil.estado === 'Activo' ? 'bg-accent-green/10 text-accent-green' : 'bg-slate-100 text-slate-400'
              }`}>
              {perfil.estado}
            </span>
          </div>
          <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0 sm:justify-self-end">
            <button onClick={() => setShowEdit(true)} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-lg">edit</span> Editar Perfil
            </button>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Último Acceso</p>
            <p className="text-sm font-semibold text-slate-800">
              {perfil.ultimo_acceso ? new Date(perfil.ultimo_acceso).toLocaleString('es-VE') : '—'}
            </p>
          </div>
        </div>
        {perfil.telefonos && perfil.telefonos.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Teléfonos</p>
            <div className="flex flex-wrap gap-3">
              {perfil.telefonos.map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#F4FAFB] border border-slate-200 text-sm text-slate-700">
                  <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                  ({t.codigo_area}) {t.numero}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* KPI CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Meta Mensual */}
        <div className="bg-[#F4FAFB] rounded-xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Meta Anual</p>
            <h3 className="text-2xl font-bold text-slate-800">${meta.toLocaleString()}</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-accent-light/30 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">flag</span>
          </div>
        </div>
        {/* Clientes Asignados */}
        <div className="bg-[#F4FAFB] rounded-xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Clientes Asignados</p>
            <h3 className="text-2xl font-bold text-slate-800">{clientes.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center text-accent-green">
            <span className="material-symbols-outlined">group</span>
          </div>
        </div>
        {/* Tipo */}
        <div className="bg-[#F4FAFB] rounded-xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Tipo</p>
            <h3 className="text-2xl font-bold text-slate-800">{perfil.tipo || perfil.rol}</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">badge</span>
          </div>
        </div>
      </section>

      {/* CARTERA DE CLIENTES */}
      {clientes.length > 0 && (
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Mi Cartera de Clientes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Empresa</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Razón Social</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Sector</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Clasificación</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clientes.map((c) => (
                  <tr key={c.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs">
                          {(c.nombre || '').substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{c.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.razon_social}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.sector}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.clasificacion}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${c.estado === 'Activo' ? 'bg-accent-green/10 text-accent-green' : 'bg-slate-100 text-slate-400'
                        }`}>
                        {c.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* MODAL DE CONFIRMACIÓN DE ELIMINAR PERFIL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(false)}></div>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative z-10 animate-[scaleIn_0.2s_ease-out]">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-4">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Eliminar Perfil</h3>
              <p className="text-sm text-slate-500 mb-6">
                ¿Estás seguro de que deseas eliminar tu perfil de vendedor? Esta acción no se puede deshacer y borrará permanentemente todos tus datos y tu acceso al CRM.
              </p>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {errorMsg}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(false)}
                  disabled={deleting}
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {deleting ? (
                    <><span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Eliminando...</>
                  ) : (
                    <><span className="material-symbols-outlined text-[18px]">delete</span> Sí, Eliminar</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <EditarMiPerfilModal
          perfilOriginal={perfil}
          onClose={() => setShowEdit(false)}
          onSuccess={() => {
            setShowEdit(false);
            toast.success('Tu perfil ha sido actualizado correctamente.');
            fetchPerfil();
          }}
        />
      )}
    </>
  );
}
