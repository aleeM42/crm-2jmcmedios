// ==============================================
// DetalleVendedor.jsx — Detalle de Vendedor (conectado al backend)
// Entidades: USUARIO + VENDEDOR + CLIENTE (CSV)
// ==============================================
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getVendedorById } from '../services/vendedor.service.js';

const ESTADO_CLIENTE_BADGE = {
  Activo: 'bg-green-100 text-green-700',
  Inactivo: 'bg-slate-100 text-slate-500',
};

export default function DetalleVendedor() {
  const { id } = useParams();
  const [vendedor, setVendedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getVendedorById(id);
        if (result.success) {
          setVendedor(result.data);
        }
      } catch (err) {
        if (err.status === 403) {
          setForbidden(true);
        }
        setError(err.data?.error || err.message || 'Error al cargar vendedor');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
        <p className="mt-4 text-slate-400 text-sm">Cargando datos del vendedor...</p>
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <span className="material-symbols-outlined text-5xl text-red-400">lock</span>
        <h3 className="mt-4 text-lg font-bold text-slate-800">Acceso Denegado</h3>
        <p className="mt-2 text-sm text-slate-500 text-center max-w-md">
          Solo puede consultar su propio perfil de vendedor. Si necesita ver los datos de otro vendedor, contacte a un administrador o director.
        </p>
        <Link to="/equipo-ventas" className="mt-6 px-6 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all">
          ← Volver al Equipo
        </Link>
      </div>
    );
  }

  if (error || !vendedor) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <span className="material-symbols-outlined text-4xl text-red-400">error</span>
        <p className="mt-4 text-red-500 text-sm">{error || 'Vendedor no encontrado'}</p>
        <Link to="/equipo-ventas" className="mt-4 text-primary hover:underline text-sm font-bold">← Volver al Equipo</Link>
      </div>
    );
  }

  const v = vendedor;
  const initials = `${v.primer_nombre[0]}${v.primer_apellido[0]}`;

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4 mb-8">
        <div>
          <nav className="flex text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">
            <Link to="/equipo-ventas" className="hover:text-primary transition-colors">Equipo de Ventas</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{v.primer_nombre} {v.primer_apellido}</span>
          </nav>
          <h2 className="text-3xl font-bold text-slate-800 font-display">Detalle de Vendedor</h2>
        </div>
      </div>

      {/* PROFILE HEADER */}
      <div className="bg-[#F4FAFB] rounded-xl p-8 mb-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold border-4 border-primary/20">
          {initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-2xl font-bold text-slate-800">{v.primer_nombre} {v.primer_apellido}</h3>
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
              {v.tipo}
            </span>
            <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${v.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {v.estado}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">mail</span>{v.correo}
            </div>
            {v.telefonos && v.telefonos.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">call</span>
                {v.telefonos.map(t => `${t.codigo_area}-${t.numero}`).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Meta Mensual</p>
          <h4 className="text-2xl font-bold text-slate-800">${v.meta?.toLocaleString() || 0}</h4>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Clientes Asignados</p>
          <h4 className="text-2xl font-bold text-slate-800">{v.clientes_asignados?.length || 0}</h4>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Rol</p>
          <h4 className="text-lg font-bold text-primary capitalize">{v.rol}</h4>
        </div>
        <div className="bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Último Acceso</p>
          <h4 className="text-sm font-bold text-slate-800">
            {v.ultimo_acceso ? new Date(v.ultimo_acceso).toLocaleString('es-VE') : 'Sin registro'}
          </h4>
        </div>
      </div>

      {/* TWO COLUMNS LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {/* Clientes Asignados */}
          <div className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h5 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">groups</span>Clientes Asignados
              </h5>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Nombre</th>
                    <th className="px-6 py-4">Razón Social</th>
                    <th className="px-6 py-4">Sector</th>
                    <th className="px-6 py-4">Clasificación</th>
                    <th className="px-6 py-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {(!v.clientes_asignados || v.clientes_asignados.length === 0) ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-sm text-slate-400">
                        No tiene clientes asignados
                      </td>
                    </tr>
                  ) : (
                    v.clientes_asignados.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                          <Link to={`/clientes/${c.id}`} className="hover:text-primary transition-colors">{c.nombre}</Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{c.razon_social}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{c.sector}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${c.clasificacion === 'Agencia' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                            {c.clasificacion}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 ${ESTADO_CLIENTE_BADGE[c.estado] || 'bg-slate-100 text-slate-500'} text-[10px] font-bold rounded-full`}>
                            {c.estado}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* Información del Vendedor */}
          <div className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h5 className="font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
              <span className="material-symbols-outlined text-primary">info</span>Información del Vendedor
            </h5>
            <div className="space-y-4">
              {[
                { label: 'Correo', value: v.correo },
                { label: 'Nombre de Usuario', value: v.nombre_usuario || '—' },
                { label: 'Rol', value: v.rol },
                { label: 'Estado', value: v.estado },
                { label: 'Meta', value: `$${v.meta?.toLocaleString() || 0}` },
                { label: 'Tipo', value: v.tipo },
                { label: 'Director Jefe', value: v.jefe_nombre ? `${v.jefe_nombre} ${v.jefe_apellido}` : '—' },
                { label: 'Miembro Desde', value: v.created_at ? new Date(v.created_at).toLocaleDateString('es-VE') : '—' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-slate-700">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
