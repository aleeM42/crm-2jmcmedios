// ==============================================
// AgregarMarca.jsx — Formulario para agregar marca a un cliente existente
// ==============================================
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getClienteById, crearMarca } from '../services/cliente.service.js';
import { resolveErrorMessage } from '../utils/errorMessages.js';

export default function AgregarMarca() {
  const { clienteId } = useParams();
  const navigate = useNavigate();

  const [clienteNombre, setClienteNombre] = useState('');
  const [nombre, setNombre] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await getClienteById(clienteId);
        if (res.success) setClienteNombre(res.data.nombre);
      } catch {
        // silently handle
      }
    };
    fetchCliente();
  }, [clienteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nombre.trim()) {
      setError('El nombre de la marca es obligatorio.');
      return;
    }

    setLoading(true);
    try {
      const result = await crearMarca(clienteId, {
        nombre: nombre.trim(),
        observaciones: observaciones.trim() || null,
      });
      if (result.success) {
        setSuccess('Marca creada exitosamente.');
        setTimeout(() => navigate(`/clientes/${clienteId}`), 1200);
      }
    } catch (err) {
      setError(resolveErrorMessage(err, 'clientes'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24 w-full block">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/clientes">Clientes</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link className="hover:text-primary transition-colors" to={`/clientes/${clienteId}`}>{clienteNombre || 'Detalle'}</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">Nueva Marca</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 font-display">Agregar Marca</h2>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <span className="material-symbols-outlined text-red-500">error</span>
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
          <span className="material-symbols-outlined text-green-500">check_circle</span>
          <p className="text-sm text-green-600 font-medium">{success}</p>
        </div>
      )}

      <form className="max-w-2xl space-y-8" onSubmit={handleSubmit}>
        <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-accent-green">sell</span>
            Datos de la Marca
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Nombre de la Marca <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Coca-Cola, Pepsi..."
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Observaciones
              </label>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Notas adicionales sobre la marca..."
                rows="3"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
          <Link
            to={`/clientes/${clienteId}`}
            className="px-8 py-3 rounded-lg border border-red-400 text-red-500 font-bold text-sm hover:bg-red-50 transition-all text-center"
          >
            Cancelar
          </Link>
          <button
            className="px-12 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Marca'}
          </button>
        </div>
      </form>
    </div>
  );
}
