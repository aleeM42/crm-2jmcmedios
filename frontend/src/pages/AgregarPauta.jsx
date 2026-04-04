// ==============================================
// AgregarPauta.jsx — Formulario para Agregar Pauta
// ==============================================
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'sonner';
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

export default function AgregarPauta() {
  const navigate = useNavigate();

  // Estados de carga y listas de opciones
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [aliados, setAliados] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [loadingMarcas, setLoadingMarcas] = useState(false);

  // Datos generales
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

  // Vigencia y Cuñas
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [cantidadCunas, setCantidadCunas] = useState('');
  const [costoCuna, setCostoCuna] = useState('');
  const [duracionCuna, setDuracionCuna] = useState('');
  const [programa, setPrograma] = useState('');
  const [presentadora, setPresentadora] = useState('');
  const [horario, setHorario] = useState('');
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);

  // Montos
  const [montoOC, setMontoOC] = useState('');
  const [montoOT, setMontoOT] = useState('');

  // Emisora (una sola)
  const [aliadoId, setAliadoId] = useState('');

  // Distribución OC
  const [distribucionOC, setDistribucionOC] = useState(null);
  const [loadingDistribucion, setLoadingDistribucion] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resClientes, resVendedores, resAliados] = await Promise.all([
          api.get('/clientes'),
          api.get('/vendedores'),
          api.get('/aliados')
        ]);

        if (resClientes.success) {
          const data = resClientes.data;
          setClientes(Array.isArray(data) ? data : (data?.clientes || []));
        }
        if (resVendedores.success) {
          const data = resVendedores.data;
          setVendedores(Array.isArray(data) ? data : (data?.vendedores || []));
        }
        if (resAliados.success) {
          const data = resAliados.data;
          setAliados(Array.isArray(data) ? data : (data?.aliados || []));
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Consultar distribución de monto cuando cambia el numero OC
  const fetchDistribucionOC = useCallback(async (oc) => {
    if (!oc || oc.trim() === '') {
      setDistribucionOC(null);
      return;
    }
    setLoadingDistribucion(true);
    try {
      const res = await api.get(`/pautas/oc/${encodeURIComponent(oc)}/monto`);
      if (res.success && res.data.emisoras.length > 0) {
        setDistribucionOC(res.data);
        // Auto-rellenar monto OC si ya existe
        if (res.data.montoOC > 0 && !montoOC) {
          setMontoOC(res.data.montoOC.toString());
        }
      } else {
        setDistribucionOC(null);
      }
    } catch {
      setDistribucionOC(null);
    } finally {
      setLoadingDistribucion(false);
    }
  }, [montoOC]);

  // Debounce para la consulta OC
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDistribucionOC(numeroOc);
    }, 500);
    return () => clearTimeout(timer);
  }, [numeroOc, fetchDistribucionOC]);

  // Auto-rellenar vendedor y cargar marcas al cambiar cliente
  const handleClienteChange = async (newClienteId) => {
    setClienteId(newClienteId);
    setMarca('');
    setMarcas([]);

    if (!newClienteId) {
      setVendedorId('');
      return;
    }

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
    } catch (err) {
      console.error('Error fetching marcas:', err);
    } finally {
      setLoadingMarcas(false);
    }
  };

  const handleCoordinadoraSelect = (nombre) => {
    setCoordinadora(nombre);
  };

  const toggleDia = (dia) => {
    setDiasSeleccionados(prev =>
      prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
    );
  };

  const esEnVivo = tipoCompra === 'en_vivo' || tipoCompra === 'en vivo';

  const selectedCliente = clientes.find((c) => c.id.toString() === clienteId) || null;
  const nombreAgencia = selectedCliente?.clasificacion === 'Agencia' ? selectedCliente.nombre_agencia : 'Cliente directo';
  const selectedVendedor = vendedores.find((v) => v.id.toString() === vendedorId) || null;
  const selectedAliado = aliados.find((a) => a.id.toString() === aliadoId) || null;

  const handleSave = async (e) => {
    e.preventDefault();

    // ── Validaciones de negocio ────────────────────────────
    if (!aliadoId) {
      toast.error('Debe seleccionar una emisora.');
      return;
    }

    if (!fechaEmision) {
      toast.error('La fecha de emisión de la pauta es obligatoria.');
      return;
    }

    if (!fechaInicio || !fechaFin) {
      toast.error('Las fechas de inicio y fin de las cuñas son obligatorias.');
      return;
    }

    if (new Date(fechaInicio) < new Date(fechaEmision)) {
      toast.error('La fecha de inicio de la cuña debe ser igual o posterior a la fecha de emisión de la pauta.');
      return;
    }

    if (new Date(fechaInicio) > new Date(fechaFin)) {
      toast.error('La fecha de inicio no puede ser posterior a la fecha de fin de la cuña.');
      return;
    }

    if (Number(montoOC) <= 0) {
      toast.error('El monto OC debe ser un valor positivo mayor a cero.');
      return;
    }
    if (Number(montoOT) <= 0) {
      toast.error('El monto OT debe ser un valor positivo mayor a cero.');
      return;
    }

    // Monto OC debe ser mayor al monto OT
    if (Number(montoOC) <= Number(montoOT)) {
      toast.error('El monto OC debe ser mayor al monto OT.');
      return;
    }

    // Validar monto disponible si la OC ya existe
    if (distribucionOC && distribucionOC.emisoras.length > 0) {
      if (Number(montoOT) > distribucionOC.montoDisponible) {
        toast.error(`El monto OT supera el disponible de esta OC ($${distribucionOC.montoDisponible.toFixed(2)}).`);
        return;
      }
    }

    if (Number(cantidadCunas) <= 0) {
      toast.error('La cantidad de cuñas debe ser mayor a cero.');
      return;
    }
    if (Number(costoCuna) <= 0) {
      toast.error('El costo por cuña debe ser un valor positivo mayor a cero.');
      return;
    }

    if (!coordinadora) {
      toast.error('Debe seleccionar una coordinadora.');
      return;
    }

    if (!numeroOt) {
      toast.error('El número OT es obligatorio.');
      return;
    }

    if (!numeroOc) {
      toast.error('El número OC es obligatorio.');
      return;
    }

    if (diasSeleccionados.length === 0) {
      toast.error('Debe seleccionar al menos un día de la semana.');
      return;
    }

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
      aliadoId
    };

    try {
      const response = await api.post('/pautas', payload);
      if (response.success) {
        toast.success('Pauta guardada exitosamente');
        navigate('/pautas');
      } else {
        toast.error(resolveErrorMessage(response, 'pautas'));
      }
    } catch (err) {
      console.error(err);
      toast.error(resolveErrorMessage(err, 'pautas'));
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Cargando formulario...</div>;
  }

  return (
    <form onSubmit={handleSave}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/pautas">Pautas</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">Nueva Pauta</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 font-display">Registrar Pauta</h2>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link to="/pautas" className="flex-1 sm:flex-initial text-center px-6 py-2.5 border border-red-400 text-red-500 rounded-lg text-sm bg-red-50 font-bold shadow-lg shadow-red-400/10 hover:shadow-red-400/40 transition-colors">Cancelar</Link>
          <button type="submit" className="flex-1 sm:flex-initial px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Guardar Pauta</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {/* DATOS GENERALES */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">description</span>
              Datos Generales
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Cliente */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cliente<span className="text-red-500 ml-0.5">*</span></label>
                <select
                  value={clienteId} onChange={(e) => handleClienteChange(e.target.value)} required
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="">Seleccionar cliente...</option>
                  {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>

              {/* Marca */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Marca<span className="text-red-500 ml-0.5">*</span></label>
                {loadingMarcas ? (
                  <div className="w-full h-12 px-4 bg-slate-100 border border-slate-200 rounded-lg flex items-center text-sm text-slate-400">
                    Cargando marcas...
                  </div>
                ) : !clienteId ? (
                  <div className="w-full h-12 px-4 bg-slate-100 border border-slate-200 rounded-lg flex items-center text-sm text-slate-400">
                    Seleccione un cliente primero
                  </div>
                ) : marcas.length === 0 ? (
                  <div className="w-full h-12 px-4 bg-slate-100 border border-slate-200 rounded-lg flex items-center text-sm text-slate-400">
                    Sin marcas registradas
                  </div>
                ) : (
                  <select
                    value={marca} onChange={(e) => setMarca(e.target.value)} required
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                    <option value="">Seleccionar marca...</option>
                    {marcas.map(m => <option key={m.id} value={m.nombre}>{m.nombre}</option>)}
                  </select>
                )}
              </div>

              {/* Tipo de Compra */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tipo de Compra<span className="text-red-500 ml-0.5">*</span></label>
                <select name="tipo_compra" value={tipoCompra} onChange={(e) => setTipoCompra(e.target.value)} required className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="">Seleccionar...</option>
                  <option value="rotativa">Rotativa</option>
                  <option value="en_vivo">En Vivo</option>
                </select>
              </div>

              {/* Vendedor */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Vendedor<span className="text-red-500 ml-0.5">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={selectedVendedor ? `${selectedVendedor.primer_nombre} ${selectedVendedor.primer_apellido}` : ''}
                    placeholder="Se asigna al seleccionar el cliente"
                    className="w-full h-12 px-4 pr-10 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600 cursor-not-allowed"
                  />
                  {selectedVendedor && (
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-primary">check_circle</span>
                  )}
                </div>
                <input type="hidden" value={vendedorId} required />
              </div>

              {selectedCliente?.clasificacion === 'Agencia' && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nombre Agencia</label>
                  <input
                    type="text" value={nombreAgencia} readOnly
                    placeholder="Se asigna según clasificación del cliente"
                    className="w-full h-12 px-4 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500" />
                </div>
              )}

              {/* Número OC */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Número OC<span className="text-red-500 ml-0.5">*</span></label>
                <input
                  type="text" value={numeroOc} onChange={(e) => setNumeroOc(e.target.value)} required
                  placeholder="Ej: OC-00100" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>

              {/* Número OT */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Número OT<span className="text-red-500 ml-0.5">*</span></label>
                <input
                  type="text" value={numeroOt} onChange={(e) => setNumeroOt(e.target.value)} required
                  placeholder="Ej: OT-00125" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>

              {/* Coordinadora */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Coordinadora<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex flex-col gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg min-h-[48px]">
                  {COORDINADORAS.map((nombre) => {
                    const selected = coordinadora === nombre;
                    return (
                      <label
                        key={nombre}
                        onClick={() => handleCoordinadoraSelect(nombre)}
                        className={`flex items-center gap-3 cursor-pointer select-none rounded-md px-2 py-1.5 transition-colors ${selected ? 'bg-primary/10' : 'hover:bg-slate-100'}`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? 'border-primary' : 'border-slate-300 bg-white'
                            }`}
                        >
                          {selected && (
                            <span className="w-2.5 h-2.5 rounded-full bg-primary block" />
                          )}
                        </span>
                        <span
                          className={`text-sm font-medium transition-colors ${selected ? 'text-primary' : 'text-slate-600'}`}
                        >
                          {nombre}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Fecha de Emisión */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha de Emisión<span className="text-red-500 ml-0.5">*</span></label>
                <input
                  type="date" value={fechaEmision} onChange={(e) => setFechaEmision(e.target.value)} required
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>

              {/* Estado */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Estado<span className="text-red-500 ml-0.5">*</span></label>
                <select
                  value={estado} onChange={(e) => setEstado(e.target.value)} required
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="programada">Programada</option>
                  <option value="en transmision">En transmisión</option>
                  <option value="finalizada">Finalizada</option>
                  <option value="suspendida">Suspendida</option>
                </select>
              </div>

              {/* Observaciones */}
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Observaciones</label>
                <textarea
                  value={observaciones} onChange={(e) => setObservaciones(e.target.value)}
                  rows={2} placeholder="Notas sobre la pauta..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" />
              </div>
            </div>
          </section>

          {/* VIGENCIA Y CUÑAS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">schedule</span>
              Vigencia y Cuñas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha Inicio<span className="text-red-500 ml-0.5">*</span></label>
                <input
                  type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha Fin<span className="text-red-500 ml-0.5">*</span></label>
                <input
                  type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cantidad de Cuñas<span className="text-red-500 ml-0.5">*</span></label>
                <input
                  type="number" min="1" value={cantidadCunas} onChange={(e) => setCantidadCunas(e.target.value)} required
                  placeholder="0" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Costo por Cuña ($)<span className="text-red-500 ml-0.5">*</span></label>
                <input
                  type="number" step="0.01" min="0" value={costoCuna} onChange={(e) => setCostoCuna(e.target.value)} required
                  placeholder="0.00" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Duración de Cuña<span className="text-red-500 ml-0.5">*</span></label>
                <select
                  value={duracionCuna} onChange={(e) => setDuracionCuna(e.target.value)} required
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="">Seleccionar...</option>
                  <option value="10">10 segundos</option>
                  <option value="20">20 segundos</option>
                  <option value="30">30 segundos</option>
                  <option value="40">40 segundos</option>
                  <option value="60">60 segundos</option>
                </select>
              </div>

              {/* DÍAS DE LA SEMANA */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Días de Emisión<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIAS_SEMANA.map(({ key, label }) => {
                    const isActive = diasSeleccionados.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleDia(key)}
                        className={`w-11 h-11 rounded-lg text-xs font-bold border-2 transition-all ${isActive
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

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Programa{esEnVivo && <span className="text-red-500 ml-0.5">*</span>}</label>
                <input
                  type="text" value={programa} onChange={(e) => setPrograma(e.target.value)} required={esEnVivo}
                  placeholder="Nombre del programa" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Presentadora{esEnVivo && <span className="text-red-500 ml-0.5">*</span>}</label>
                <input
                  type="text" value={presentadora} onChange={(e) => setPresentadora(e.target.value)} required={esEnVivo}
                  placeholder="Nombre de la presentadora" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Horario{esEnVivo && <span className="text-red-500 ml-0.5">*</span>}</label>
                <input
                  type="text" value={horario} onChange={(e) => setHorario(e.target.value)} required={esEnVivo}
                  placeholder="Ej: 06:00 - 10:00 AM" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* MONTOS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-accent-green">payments</span>
              Montos
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Monto OC ($)<span className="text-red-500 ml-0.5">*</span></label>
                <input
                  type="number" step="0.01" min="0" value={montoOC} onChange={(e) => setMontoOC(e.target.value)} required
                  readOnly={distribucionOC?.emisoras.length > 0}
                  placeholder="0.00" className={`w-full h-12 px-4 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none ${distribucionOC?.emisoras.length > 0 ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`} />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Monto OT ($)<span className="text-red-500 ml-0.5">*</span></label>
                <input
                  type="number" step="0.01" min="0" value={montoOT} onChange={(e) => setMontoOT(e.target.value)} required
                  placeholder="0.00" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>

              {/* Panel de distribución OC */}
              {loadingDistribucion && (
                <div className="text-xs text-slate-400 text-center py-2">Consultando distribución OC...</div>
              )}
              {distribucionOC && distribucionOC.emisoras.length > 0 && (
                <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Distribución OC</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Monto OC Total</span>
                    <span className="font-bold text-slate-800">${distribucionOC.montoOC.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Ya asignado</span>
                    <span className="font-bold text-amber-600">${distribucionOC.montoAsignado.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-xs border-t border-slate-100 pt-2">
                    <span className="text-slate-500 font-bold">Disponible</span>
                    <span className="font-black text-accent-green">${distribucionOC.montoDisponible.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="space-y-1 mt-2">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Emisoras asignadas:</p>
                    {distribucionOC.emisoras.map((em, i) => (
                      <div key={i} className="flex justify-between text-[11px] text-slate-500">
                        <span>{em.nombreEmisora} ({em.numeroOt})</span>
                        <span className="font-bold">${em.montoOt.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* EMISORA ASOCIADA */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-accent-green">radio</span>
              Emisora
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Seleccionar Emisora<span className="text-red-500 ml-0.5">*</span></label>
                <select
                  value={aliadoId} onChange={(e) => setAliadoId(e.target.value)} required
                  className="w-full h-12 px-4 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="">Selecciona emisora...</option>
                  {aliados.map(a => <option key={a.id} value={a.id}>{a.nombre_emisora}</option>)}
                </select>
              </div>

              {/* Detalle de la emisora seleccionada */}
              {selectedAliado && (
                <div className="p-4 bg-[#F4FAFB] rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-sm font-bold text-slate-800 block mb-2">{selectedAliado.nombre_emisora}</span>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium text-slate-500">
                    <span className="bg-accent-green/10 px-2 py-1 rounded border border-slate-200">{selectedAliado.region_nombre || 'Sin Región'}</span>
                    <span className="bg-accent-green/10 px-2 py-1 rounded border border-slate-200">{selectedAliado.estado_nombre || 'Sin Estado'}</span>
                    <span className="bg-accent-green/10 px-2 py-1 rounded border border-slate-200">{selectedAliado.ciudad_nombre || 'Sin Ciudad'}</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
