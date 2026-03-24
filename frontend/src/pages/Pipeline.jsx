// ==============================================
// Pipeline.jsx — Kanban Board de Ventas (Dinámico)
// ==============================================
import { useState, useEffect, useCallback } from 'react';
import api from '../services/api.js';

const ESTADOS = [
  { key: 'Contacto inicial', color: '#A1DEE5', label: 'Contacto Inicial' },
  { key: 'Por firmar', color: '#16B1B8', label: 'Por Firmar' },
  { key: 'Negociado', color: '#8DC63F', label: 'Negociado' },
];

export default function Pipeline() {
  const [oportunidades, setOportunidades] = useState([]);
  const [kpis, setKpis] = useState({ total_leads: 0, valor_total: 0, negociados: 0, activos: 0 });
  const user = JSON.parse(localStorage.getItem('crm_user') || '{}');
  const isAdmin = user.rol === 'Administrador';
  const [loading, setLoading] = useState(true);
  const [vendedores, setVendedores] = useState([]);
  const [filtroVendedor, setFiltroVendedor] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({
    nombre_cliente: '', nombre_contacto: '', descripcion: '', monto_estimado: '', estado: 'Contacto inicial',
  });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get('/oportunidades');
      if (res.success) {
        setOportunidades(res.data.oportunidades);
        setKpis(res.data.kpis);
      }
    } catch (err) {
      console.error('Error fetching oportunidades:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    if (isAdmin) {
      api.get('/vendedores').then(res => {
        if (res.success) setVendedores(res.data.vendedores || res.data || []);
      }).catch(() => {});
    }
  }, [fetchData]);

  // --- MODAL HANDLERS ---
  const openCreateModal = (estado = 'Contacto inicial') => {
    setEditingLead(null);
    setFormData({ nombre_cliente: '', nombre_contacto: '', descripcion: '', monto_estimado: '', estado });
    setShowModal(true);
  };

  const openEditModal = (lead) => {
    setEditingLead(lead);
    setFormData({
      nombre_cliente: lead.nombre_cliente,
      nombre_contacto: lead.nombre_contacto,
      descripcion: lead.descripcion || '',
      monto_estimado: lead.monto_estimado || '',
      estado: lead.estado,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...formData, monto_estimado: formData.monto_estimado || 0 };
      if (editingLead) {
        await api.put(`/oportunidades/${editingLead.id}`, payload);
      } else {
        await api.post('/oportunidades', payload);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChangeEstado = async (lead, nuevoEstado) => {
    try {
      await api.put(`/oportunidades/${lead.id}`, { estado: nuevoEstado });
      fetchData();
    } catch (err) {
      console.error('Error cambiando estado:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta oportunidad?')) return;
    try {
      await api.delete(`/oportunidades/${id}`);
      fetchData();
    } catch (err) {
      console.error('Error eliminando:', err);
    }
  };

  // --- DERIVED DATA ---
  const filtered = filtroVendedor
    ? oportunidades.filter(o => o.fk_usuario === filtroVendedor)
    : oportunidades;

  const tasaConversion = kpis.activos > 0
    ? Math.round((Number(kpis.negociados) / Number(kpis.activos)) * 100)
    : 0;

  const formatCurrency = (v) => Number(v || 0).toLocaleString('es-VE', { minimumFractionDigits: 2 });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
        <p className="mt-4 text-slate-400 text-sm">Cargando pipeline...</p>
      </div>
    );
  }

  return (
    <>
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-800 font-display">Pipeline de Ventas</h2>
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          {isAdmin && (
            <select
              value={filtroVendedor}
              onChange={(e) => setFiltroVendedor(e.target.value)}
              className="bg-[#F4FAFB] border-none rounded-lg px-4 py-2 pr-10 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-primary outline-none cursor-pointer flex-1 sm:flex-initial"
            >
              <option value="">Todos los Vendedores</option>
              {vendedores.map(v => (
                <option key={v.usuario_id} value={v.usuario_id}>{v.primer_nombre} {v.primer_apellido}</option>
              ))}
            </select>
          )}
          <button
            onClick={() => openCreateModal()}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm flex-1 sm:flex-initial"
          >
            <span className="material-symbols-outlined text-lg">add</span>Nuevo Lead
          </button>
        </div>
      </header>

      {/* KPI BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#F4FAFB] p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Leads</span>
          <span className="text-3xl font-bold text-slate-800">{kpis.total_leads}</span>
        </div>
        <div className="bg-[#F4FAFB] p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Valor Estimado Total</span>
          <span className="text-3xl font-bold text-slate-800">${formatCurrency(kpis.valor_total)}</span>
        </div>
        <div className="bg-[#F4FAFB] p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Tasa de Conversión</span>
          <span className="text-3xl font-bold text-slate-800">{tasaConversion}%</span>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {ESTADOS.map((col) => {
          const cards = filtered.filter(o => o.estado === col.key);
          return (
            <div key={col.key} className="flex flex-col w-[340px] flex-shrink-0 bg-slate-100/50 rounded-xl p-3 border border-slate-200/50">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 rounded-full" style={{ backgroundColor: col.color }}></div>
                  <h3 className="font-bold text-slate-700">{col.label}</h3>
                </div>
                <span className="text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${col.color}30` }}>{cards.length}</span>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                {cards.map((card) => (
                  <div key={card.id} className="bg-[#F4FAFB] p-4 rounded-xl shadow-sm border-l-4 hover:shadow-md transition-shadow group relative" style={{ borderColor: col.color }}>
                    <div className="absolute right-3 top-3 flex items-center gap-1">
                      {card.estado === 'Negociado' && <span className="material-symbols-outlined text-[#8DC63F] text-lg">check_circle</span>}
                      <button onClick={() => openEditModal(card)} className="material-symbols-outlined text-slate-300 text-[16px] group-hover:text-primary cursor-pointer" title="Editar">edit</button>
                      <button onClick={() => handleDelete(card.id)} className="material-symbols-outlined text-slate-300 text-[16px] group-hover:text-red-400 cursor-pointer" title="Eliminar">delete</button>
                    </div>
                    <h4 className="font-bold text-slate-800 pr-16">{card.nombre_cliente}</h4>
                    <p className="text-xs text-slate-500 mt-1">{card.nombre_contacto}</p>
                    <div className="mt-4 flex items-center justify-between">
                      {Number(card.monto_estimado) > 0 && (
                        <span className="text-sm font-bold text-primary">${formatCurrency(card.monto_estimado)}</span>
                      )}
                      <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-medium ml-auto">
                        {new Date(card.fecha_creacion).toLocaleDateString('es-VE', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                          {card.vendedor_nombre?.[0]}{card.vendedor_apellido?.[0]}
                        </div>
                        <span className="text-[11px] text-slate-400">{card.vendedor_nombre} {card.vendedor_apellido}</span>
                      </div>
                      {/* Move buttons */}
                      <div className="flex gap-1">
                        {col.key !== 'Contacto inicial' && (
                          <button onClick={() => handleChangeEstado(card, ESTADOS[ESTADOS.findIndex(e => e.key === col.key) - 1].key)}
                            className="text-[10px] px-1.5 py-0.5 bg-slate-200 rounded text-slate-500 hover:bg-slate-300 transition-colors" title="Mover atrás">←</button>
                        )}
                        {col.key !== 'Negociado' && (
                          <button onClick={() => handleChangeEstado(card, ESTADOS[ESTADOS.findIndex(e => e.key === col.key) + 1].key)}
                            className="text-[10px] px-1.5 py-0.5 bg-primary/20 rounded text-primary hover:bg-primary/30 transition-colors" title="Mover adelante">→</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => openCreateModal(col.key)} className="mt-2 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2 text-sm font-medium">
                  <span className="material-symbols-outlined text-lg">add_circle</span>Agregar Lead
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══ MODAL ═══ */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">rocket_launch</span>
                {editingLead ? 'Editar Lead' : 'Nuevo Lead'}
              </h3>
              <button onClick={() => setShowModal(false)} className="material-symbols-outlined text-slate-400 hover:text-slate-600 transition-colors text-xl cursor-pointer">close</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nombre del Cliente <span className="text-red-500">*</span></label>
                  <input name="nombre_cliente" value={formData.nombre_cliente} onChange={handleChange} required className="rounded-lg border border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Ej: TechNova Solutions" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nombre del Contacto <span className="text-red-500">*</span></label>
                  <input name="nombre_contacto" value={formData.nombre_contacto} onChange={handleChange} required className="rounded-lg border border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="Ej: Ana Martínez" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Etapa</label>
                  <select name="estado" value={formData.estado} onChange={handleChange} className="rounded-lg border border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary">
                    {ESTADOS.map(e => <option key={e.key} value={e.key}>{e.label}</option>)}
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                {/* Monto estimado: solo en Por firmar / Negociado / editing */}
                {(editingLead || formData.estado === 'Por firmar' || formData.estado === 'Negociado') && (
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Monto Estimado</label>
                    <input name="monto_estimado" value={formData.monto_estimado} onChange={handleChange} className="rounded-lg border border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary" placeholder="0.00" type="number" step="0.01" min="0" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Descripción / Notas</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows={3} className="rounded-lg border border-slate-200 text-sm p-3 focus:ring-primary focus:border-primary resize-none" placeholder="Notas adicionales sobre la oportunidad..." />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">Cancelar</button>
                <button type="submit" disabled={saving} className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-60">
                  {saving ? 'Guardando...' : (editingLead ? 'Actualizar' : 'Crear Lead')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
