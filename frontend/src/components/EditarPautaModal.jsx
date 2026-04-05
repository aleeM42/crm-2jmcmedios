// ==============================================
// EditarPautaModal.jsx — Modal de edición de Pauta
// ==============================================
import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import AlertError from './AlertError.jsx';
import { resolveErrorMessage } from '../utils/errorMessages.js';

const COORDINADORAS = ['Oriana Mendoza', 'Ysabel Pérez'];

const DIAS_SEMANA = [
  { key: 'L', label: 'Lun' },
  { key: 'M', label: 'Mar' },
  { key: 'X', label: 'Mié' },
  { key: 'J', label: 'Jue' },
  { key: 'V', label: 'Vie' },
  { key: 'S', label: 'Sáb' },
  { key: 'D', label: 'Dom' },
];

export default function EditarPautaModal({ pauta: pautaOriginal, onClose, onSuccess }) {
  // ── Listas de opciones ──────────────────────────────────
  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [aliados, setAliados] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [loadingMarcas, setLoadingMarcas] = useState(false);

  // ── Datos del formulario ────────────────────────────────
  const [clienteId, setClienteId] = useState('');
  const [vendedorId, setVendedorId] = useState('');
  const [tipoCompra, setTipoCompra] = useState('');
  const [estado, setEstado] = useState('programada');
  const [marca, setMarca] = useState('');
  const [numeroOt, setNumeroOt] = useState('');
  const [numeroOc, setNumeroOc] = useState('');
  const [coordinadora, setCoordinadora] = useState('');
  const [fechaEmision, setFechaEmision] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [cantidadCunas, setCantidadCunas] = useState('');
  const [costoCuna, setCostoCuna] = useState('');
  const [duracionCuna, setDuracionCuna] = useState('');
  const [programa, setPrograma] = useState('');
  const [presentadora, setPresentadora] = useState('');
  const [horario, setHorario] = useState('');
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [montoOC, setMontoOC] = useState('');
  const [montoOT, setMontoOT] = useState('');
  const [aliadoId, setAliadoId] = useState('');

  // ── UI ───────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');

  // ── Helpers ──────────────────────────────────────────────
  const formatDateField = (d) => {
    if (!d) return '';
    return d.split('T')[0];
  };

  // Normalizar tipo_compra de la BD ("en vivo") al valor del select ("en_vivo")
  const normalizeTC = (tc) => {
    if (!tc) return '';
    if (tc === 'en vivo') return 'en_vivo';
    return tc;
  };

  // ── Cargar listas + pre-llenar ──────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resClientes, resVendedores, resAliados] = await Promise.all([
          api.get('/clientes'),
          api.get('/vendedores'),
          api.get('/aliados'),
        ]);

        const clientesList = resClientes.success
          ? (Array.isArray(resClientes.data) ? resClientes.data : (resClientes.data?.clientes || []))
          : [];
        const vendedoresList = resVendedores.success
          ? (Array.isArray(resVendedores.data) ? resVendedores.data : (resVendedores.data?.vendedores || []))
          : [];
        const aliadosList = resAliados.success
          ? (Array.isArray(resAliados.data) ? resAliados.data : (resAliados.data?.aliados || []))
          : [];

        setClientes(clientesList);
        setVendedores(vendedoresList);
        setAliados(aliadosList);

        // Pre-llenar campos con los datos actuales
        if (pautaOriginal) {
          const cId = pautaOriginal.fk_cliente?.toString() || '';
          setClienteId(cId);
          setVendedorId(pautaOriginal.fk_vendedor?.toString() || '');
          setTipoCompra(normalizeTC(pautaOriginal.tipo_compra));
          setEstado(pautaOriginal.estado || 'programada');
          setMarca(pautaOriginal.marca || '');
          setNumeroOt(pautaOriginal.numero_ot || '');
          setNumeroOc(pautaOriginal.numero_oc || '');
          setCoordinadora(pautaOriginal.coordinadora || '');
          setFechaEmision(formatDateField(pautaOriginal.fecha_emision));
          setObservaciones(pautaOriginal.observaciones || '');
          setFechaInicio(formatDateField(pautaOriginal.fecha_inicio));
          setFechaFin(formatDateField(pautaOriginal.fecha_fin));
          setCantidadCunas(pautaOriginal.cantidad_cunas?.toString() || '');
          setCostoCuna(pautaOriginal.costo_cunas?.toString() || '');
          setDuracionCuna(''); // Se cargará abajo si hay cuñas
          setPrograma(pautaOriginal.programa || '');
          setPresentadora(pautaOriginal.presentadora || '');
          setHorario(pautaOriginal.horario || '');
          setDiasSeleccionados(pautaOriginal.dias_semana ? pautaOriginal.dias_semana.split(',') : []);
          setMontoOC(pautaOriginal.monto_oc?.toString() || '');
          setMontoOT(pautaOriginal.monto_ot?.toString() || '');
          setAliadoId(pautaOriginal.aliado_id?.toString() || '');

          // Cargar marcas del cliente
          if (cId) {
            try {
              const resMarcas = await api.get(`/clientes/${cId}/marcas`);
              if (resMarcas.success) {
                setMarcas(Array.isArray(resMarcas.data) ? resMarcas.data : []);
              }
            } catch { /* ignore */ }
          }
        }
      } catch (err) {
        console.error('Error fetching data for edit modal:', err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, [pautaOriginal]);

  // ── Cerrar con ESC ──────────────────────────────────────
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // ── Cambio de cliente → cargar marcas + auto-vendedor ──
  const handleClienteChange = async (newClienteId) => {
    setClienteId(newClienteId);
    setMarca('');
    setMarcas([]);

    if (!newClienteId) { setVendedorId(''); return; }

    const clienteObj = clientes.find((c) => c.id.toString() === newClienteId);
    if (clienteObj?.fk_vendedor) {
      setVendedorId(clienteObj.fk_vendedor.toString());
    } else {
      setVendedorId('');
    }

    setLoadingMarcas(true);
    try {
      const res = await api.get(`/clientes/${newClienteId}/marcas`);
      if (res.success) {
        setMarcas(Array.isArray(res.data) ? res.data : []);
      }
    } catch { /* ignore */ } finally {
      setLoadingMarcas(false);
    }
  };

  const toggleDia = (dia) => {
    setDiasSeleccionados(prev =>
      prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
    );
  };

  const esEnVivo = tipoCompra === 'en_vivo' || tipoCompra === 'en vivo';

  const selectedCliente = clientes.find((c) => c.id.toString() === clienteId) || null;
  const selectedVendedor = vendedores.find((v) => v.id.toString() === vendedorId) || null;

  // ── Submit ──────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!aliadoId) return setError('Debe seleccionar una emisora.');
    if (!fechaEmision) return setError('La fecha de emisión es obligatoria.');
    if (!fechaInicio || !fechaFin) return setError('Las fechas de inicio y fin son obligatorias.');
    if (new Date(fechaInicio) > new Date(fechaFin)) return setError('La fecha de inicio no puede ser posterior a la de fin.');
    if (Number(montoOC) <= 0) return setError('El monto OC debe ser mayor a cero.');
    if (Number(montoOT) <= 0) return setError('El monto OT debe ser mayor a cero.');
    if (Number(montoOC) <= Number(montoOT)) return setError('El monto OC debe ser mayor al monto OT.');
    if (Number(cantidadCunas) <= 0) return setError('La cantidad de cuñas debe ser mayor a cero.');
    if (Number(costoCuna) <= 0) return setError('El costo por cuña debe ser mayor a cero.');
    if (!coordinadora) return setError('Debe seleccionar una coordinadora.');
    if (!numeroOt) return setError('El número OT es obligatorio.');
    if (!numeroOc) return setError('El número OC es obligatorio.');
    if (diasSeleccionados.length === 0) return setError('Debe seleccionar al menos un día de la semana.');

    const payload = {
      clienteId,
      vendedorId,
      tipoCompra,
      estado,
      marca,
      numeroOt,
      numeroOc,
      coordinadora,
      fechaEmision,
      observaciones,
      fechaInicio,
      fechaFin,
      cantidadCunas,
      costoCuna,
      duracionCuna,
      programa: tipoCompra === 'en_vivo' ? programa : null,
      presentadora: tipoCompra === 'en_vivo' ? presentadora : null,
      horario: tipoCompra === 'en_vivo' ? horario : null,
      diasSemana: diasSeleccionados.join(','),
      montoOC,
      montoOT,
      aliadoId,
    };

    setLoading(true);
    try {
      const result = await api.put(`/pautas/${pautaOriginal.id}`, payload);
      if (result.success) {
        onSuccess(result.data);
      }
    } catch (err) {
      console.error('[EditarPauta] Error:', err?.data || err);
      setError(resolveErrorMessage(err, 'pautas'));
    } finally {
      setLoading(false);
    }
  };

  // ═══════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════
  const labelCls = 'text-[10px] font-bold text-slate-500 uppercase tracking-wider';
  const inputCls = 'w-full rounded-lg bg-[#F4FAFB] border-slate-200 text-sm p-2.5 focus:ring-primary focus:border-primary';
  const selectCls = inputCls;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden animate-[fadeIn_0.2s_ease-out] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">edit</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 font-display text-base">Editar Pauta</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{pautaOriginal?.numero_ot}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-slate-500 text-lg">close</span>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {loadingData ? (
            <div className="p-12 text-center text-slate-400">Cargando datos...</div>
          ) : (
            <form id="editar-pauta-form" className="p-6 space-y-6" onSubmit={handleSubmit}>
              {error && <AlertError message={error} onClose={() => setError('')} />}

              {/* ═══ Datos Generales ═══ */}
              <section>
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 text-slate-800">
                  <span className="material-symbols-outlined text-primary text-lg">description</span>
                  <h4 className="text-sm font-bold font-display">Datos Generales</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Cliente */}
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Cliente <span className="text-red-500">*</span></label>
                    <select value={clienteId} onChange={(e) => handleClienteChange(e.target.value)} required className={selectCls}>
                      <option value="">Seleccionar cliente...</option>
                      {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                    </select>
                  </div>

                  {/* Marca */}
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Marca <span className="text-red-500">*</span></label>
                    {loadingMarcas ? (
                      <div className="h-[42px] px-4 bg-slate-100 border border-slate-200 rounded-lg flex items-center text-sm text-slate-400">Cargando marcas...</div>
                    ) : !clienteId ? (
                      <div className="h-[42px] px-4 bg-slate-100 border border-slate-200 rounded-lg flex items-center text-sm text-slate-400">Seleccione un cliente primero</div>
                    ) : marcas.length === 0 ? (
                      <div className="flex flex-col gap-1">
                        <div className="h-[42px] px-4 bg-slate-100 border border-slate-200 rounded-lg flex items-center text-sm text-slate-400">Sin marcas registradas</div>
                        <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Ingrese marca manualmente" className={inputCls} />
                      </div>
                    ) : (
                      <select value={marca} onChange={(e) => setMarca(e.target.value)} required className={selectCls}>
                        <option value="">Seleccionar marca...</option>
                        {marcas.map(m => <option key={m.id} value={m.nombre}>{m.nombre}</option>)}
                      </select>
                    )}
                  </div>

                  {/* Tipo de Compra */}
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Tipo de Compra <span className="text-red-500">*</span></label>
                    <select value={tipoCompra} onChange={(e) => setTipoCompra(e.target.value)} required className={selectCls}>
                      <option value="">Seleccionar...</option>
                      <option value="rotativa">Rotativa</option>
                      <option value="en_vivo">En Vivo</option>
                    </select>
                  </div>

                  {/* Vendedor (read-only) */}
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Vendedor <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="text" readOnly
                        value={selectedVendedor ? `${selectedVendedor.primer_nombre} ${selectedVendedor.primer_apellido}` : ''}
                        placeholder="Se asigna al seleccionar el cliente"
                        className="w-full rounded-lg bg-slate-100 border-slate-200 text-sm p-2.5 cursor-not-allowed text-slate-600"
                      />
                      {selectedVendedor && (
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-primary">check_circle</span>
                      )}
                    </div>
                  </div>

                  {/* Número OC */}
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Número OC <span className="text-red-500">*</span></label>
                    <input type="text" value={numeroOc} onChange={(e) => setNumeroOc(e.target.value)} required placeholder="Ej: OC-00100" className={inputCls} />
                  </div>

                  {/* Número OT */}
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Número OT <span className="text-red-500">*</span></label>
                    <input type="text" value={numeroOt} onChange={(e) => setNumeroOt(e.target.value)} required placeholder="Ej: OT-00125" className={inputCls} />
                  </div>

                  {/* Coordinadora */}
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Coordinadora <span className="text-red-500">*</span></label>
                    <div className="flex flex-col gap-2 px-3 py-2.5 bg-[#F4FAFB] border border-slate-200 rounded-lg">
                      {COORDINADORAS.map((nombre) => {
                        const selected = coordinadora === nombre;
                        return (
                          <label
                            key={nombre}
                            onClick={() => setCoordinadora(nombre)}
                            className={`flex items-center gap-3 cursor-pointer select-none rounded-md px-2 py-1.5 transition-colors ${selected ? 'bg-primary/10' : 'hover:bg-slate-100'}`}
                          >
                            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? 'border-primary' : 'border-slate-300 bg-white'}`}>
                              {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary block" />}
                            </span>
                            <span className={`text-sm font-medium transition-colors ${selected ? 'text-primary' : 'text-slate-600'}`}>{nombre}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fecha de Emisión */}
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Fecha de Emisión <span className="text-red-500">*</span></label>
                    <input type="date" value={fechaEmision} onChange={(e) => setFechaEmision(e.target.value)} required className={inputCls} />
                  </div>

                  {/* Estado */}
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Estado <span className="text-red-500">*</span></label>
                    <select value={estado} onChange={(e) => setEstado(e.target.value)} required className={selectCls}>
                      <option value="programada">Programada</option>
                      <option value="en transmision">En transmisión</option>
                      <option value="finalizada">Finalizada</option>
                      <option value="suspendida">Suspendida</option>
                    </select>
                  </div>

                  {/* Emisora */}
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Emisora <span className="text-red-500">*</span></label>
                    <select value={aliadoId} onChange={(e) => setAliadoId(e.target.value)} required className={selectCls}>
                      <option value="">Selecciona emisora...</option>
                      {aliados.map(a => <option key={a.id} value={a.id}>{a.nombre_emisora}</option>)}
                    </select>
                  </div>

                  {/* Observaciones */}
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className={labelCls}>Observaciones</label>
                    <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} rows={2} placeholder="Notas sobre la pauta..." className={`${inputCls} resize-none`} />
                  </div>
                </div>
              </section>

              {/* ═══ Vigencia y Cuñas ═══ */}
              <section>
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 text-slate-800">
                  <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                  <h4 className="text-sm font-bold font-display">Vigencia y Cuñas</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Fecha Inicio <span className="text-red-500">*</span></label>
                    <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Fecha Fin <span className="text-red-500">*</span></label>
                    <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Cantidad de Cuñas <span className="text-red-500">*</span></label>
                    <input type="number" min="1" value={cantidadCunas} onChange={(e) => setCantidadCunas(e.target.value)} required placeholder="0" className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Costo por Cuña ($) <span className="text-red-500">*</span></label>
                    <input type="number" step="0.01" min="0" value={costoCuna} onChange={(e) => setCostoCuna(e.target.value)} required placeholder="0.00" className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Duración de Cuña</label>
                    <select value={duracionCuna} onChange={(e) => setDuracionCuna(e.target.value)} className={selectCls}>
                      <option value="">Seleccionar...</option>
                      <option value="10">10 segundos</option>
                      <option value="20">20 segundos</option>
                      <option value="30">30 segundos</option>
                      <option value="40">40 segundos</option>
                      <option value="60">60 segundos</option>
                    </select>
                  </div>

                  {/* Días de Emisión */}
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Días de Emisión <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {DIAS_SEMANA.map(({ key, label }) => {
                        const isActive = diasSeleccionados.includes(key);
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => toggleDia(key)}
                            className={`w-10 h-10 rounded-lg text-xs font-bold border-2 transition-all ${isActive
                              ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                              : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-primary/40 hover:text-primary'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Campos condicionales: En Vivo */}
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Programa{esEnVivo && <span className="text-red-500 ml-0.5">*</span>}</label>
                    <input type="text" value={programa} onChange={(e) => setPrograma(e.target.value)} required={esEnVivo} placeholder="Nombre del programa" className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Presentadora{esEnVivo && <span className="text-red-500 ml-0.5">*</span>}</label>
                    <input type="text" value={presentadora} onChange={(e) => setPresentadora(e.target.value)} required={esEnVivo} placeholder="Nombre de la presentadora" className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className={labelCls}>Horario{esEnVivo && <span className="text-red-500 ml-0.5">*</span>}</label>
                    <input type="text" value={horario} onChange={(e) => setHorario(e.target.value)} required={esEnVivo} placeholder="Ej: 06:00 - 10:00 AM" className={inputCls} />
                  </div>
                </div>
              </section>

              {/* ═══ Montos ═══ */}
              <section>
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 text-slate-800">
                  <span className="material-symbols-outlined text-accent-green text-lg">payments</span>
                  <h4 className="text-sm font-bold font-display">Montos</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Monto OC ($) <span className="text-red-500">*</span></label>
                    <input type="number" step="0.01" min="0" value={montoOC} onChange={(e) => setMontoOC(e.target.value)} required placeholder="0.00" className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className={labelCls}>Monto OT ($) <span className="text-red-500">*</span></label>
                    <input type="number" step="0.01" min="0" value={montoOT} onChange={(e) => setMontoOT(e.target.value)} required placeholder="0.00" className={inputCls} />
                  </div>
                </div>
              </section>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-colors">
            Cancelar
          </button>
          <button
            type="submit"
            form="editar-pauta-form"
            disabled={loading || loadingData}
            className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                Guardando...
              </span>
            ) : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}
