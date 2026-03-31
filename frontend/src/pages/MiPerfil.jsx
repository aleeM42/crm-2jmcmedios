// ==============================================
// MiPerfil.jsx — Perfil dinámico del usuario logueado
// ==============================================

import { useState, useEffect } from 'react';
import api from '../services/api';

export default function MiPerfil() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchPerfil();
  }, []);

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
          <h2 className="text-2xl font-bold text-slate-800 font-display">Mi Perfil</h2>
          <nav className="flex text-xs text-slate-400 mt-1">
            <span className="hover:text-primary cursor-pointer transition-colors">CRM 2JMC</span>
            <span className="mx-2">/</span>
            <span className="text-slate-600">Perfil de {rolLabel}</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">{fullName}</p>
            <p className="text-xs text-slate-500">{rolLabel}</p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">{initials}</div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent-green rounded-full border-2 border-white"></div>
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
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-200 text-sm text-slate-700">
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
    </>
  );
}
