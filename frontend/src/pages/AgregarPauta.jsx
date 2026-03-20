// ==============================================
// AgregarPauta.jsx — Formulario para Agregar Pauta
// ==============================================
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'sonner';

export default function AgregarPauta() {
  const navigate = useNavigate();

  // Estados de carga y listas de opciones
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [aliados, setAliados] = useState([]);

  // Estados del formulario general
  const [clienteId, setClienteId] = useState('');
  const [vendedorId, setVendedorId] = useState('');
  const [tipoCompra, setTipoCompra] = useState('');
  const [estado, setEstado] = useState('programada');
  const [marca, setMarca] = useState('');
  const [numeroOt, setNumeroOt] = useState('');
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

  // Montos
  const [montoOC, setMontoOC] = useState('');
  const [montoOT, setMontoOT] = useState('');

  // Emisoras Asociadas
  const [selectedAliadoId, setSelectedAliadoId] = useState('');
  const [emisorasAsoc, setEmisorasAsoc] = useState([]);
  const [cantidadEmisoras, setCantidadEmisoras] = useState(1);

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

  const esEnVivo = tipoCompra === 'en_vivo' || tipoCompra === 'en vivo';

  // Computed data based on selections
  const selectedCliente = clientes.find((c) => c.id.toString() === clienteId) || null;
  const nombreAgencia = selectedCliente?.clasificacion === 'Agencia' ? selectedCliente.nombre_agencia : 'Cliente directo';

  const selectedAliado = aliados.find((a) => a.id.toString() === selectedAliadoId) || null;

  const handleAddEmisora = () => {
    if (!selectedAliado) return;
    if (emisorasAsoc.some(e => e.id === selectedAliado.id)) {
      alert('Esta emisora ya está agregada.');
      return;
    }
    const newAddition = {
      ...selectedAliado,
      cantidad_emisoras: cantidadEmisoras
    };
    setEmisorasAsoc([...emisorasAsoc, newAddition]);
    setSelectedAliadoId('');
    setCantidadEmisoras(1);
  };

  const handleRemoveEmisora = (idToRemove) => {
    setEmisorasAsoc(emisorasAsoc.filter(e => e.id !== idToRemove));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (emisorasAsoc.length === 0) {
      toast.error('Debe agregar al menos una emisora asociada.');
      return;
    }

    if (new Date(fechaInicio) > new Date(fechaFin)) {
      toast.error('La fecha de inicio no puede ser posterior a la fecha de fin.');
      return;
    }

    if (Number(cantidadCunas) <= 0 || Number(costoCuna) <= 0 || Number(montoOC) <= 0 || Number(montoOT) <= 0) {
      toast.error('Todos los montos y cantidades deben ser mayores a cero.');
      return;
    }

    const payload = {
      clienteId,
      vendedorId,
      tipoCompra,
      estado,
      marca,
      numeroOt,
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
      montoOC,
      montoOT,
      emisorasAsoc
    };

    try {
      const response = await api.post('/pautas', payload);
      if (response.success) {
        toast.success('Pauta guardada exitosamente');
        navigate('/pautas');
      } else {
        toast.error(response.error || 'Error al guardar');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al comunicarse con el servidor.');
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
          <Link to="/pautas" className="flex-1 sm:flex-initial text-center px-6 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Cancelar</Link>
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
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cliente<span className="text-red-500 ml-0.5">*</span></label>
                <select 
                  value={clienteId} onChange={(e) => setClienteId(e.target.value)} required
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="">Seleccionar cliente...</option>
                  {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Marca<span className="text-red-500 ml-0.5">*</span></label>
                <input 
                  type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required
                  placeholder="Ej: Marca del producto"
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tipo de Compra<span className="text-red-500 ml-0.5">*</span></label>
                <select name="tipo_compra" value={tipoCompra} onChange={(e) => setTipoCompra(e.target.value)} required className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="">Seleccionar...</option>
                  <option value="rotativa">Rotativa</option>
                  <option value="en_vivo">En Vivo</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Vendedor<span className="text-red-500 ml-0.5">*</span></label>
                <select 
                  value={vendedorId} onChange={(e) => setVendedorId(e.target.value)} required
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="">Seleccionar vendedor...</option>
                  {vendedores.map(v => <option key={v.id} value={v.id}>{v.primer_nombre} {v.primer_apellido}</option>)}
                </select>
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
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Número OT<span className="text-red-500 ml-0.5">*</span></label>
                <input 
                  type="text" value={numeroOt} onChange={(e) => setNumeroOt(e.target.value)} required
                  placeholder="Ej: OT-00125" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Coordinadora<span className="text-red-500 ml-0.5">*</span></label>
                <input 
                  type="text" value={coordinadora} onChange={(e) => setCoordinadora(e.target.value)} required
                  placeholder="Nombre de la coordinadora" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fecha de Emisión<span className="text-red-500 ml-0.5">*</span></label>
                <input 
                  type="date" value={fechaEmision} onChange={(e) => setFechaEmision(e.target.value)} required
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
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
                  <option value="15">15 segundos</option>
                  <option value="20">20 segundos</option>
                  <option value="30">30 segundos</option>
                  <option value="45">45 segundos</option>
                  <option value="60">60 segundos</option>
                </select>
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
              <span className="material-symbols-outlined text-primary">payments</span>
              Montos
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Monto OC ($)<span className="text-red-500 ml-0.5">*</span></label>
                <input 
                  type="number" step="0.01" min="0" value={montoOC} onChange={(e) => setMontoOC(e.target.value)} required
                  placeholder="0.00" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Monto OT ($)<span className="text-red-500 ml-0.5">*</span></label>
                <input 
                  type="number" step="0.01" min="0" value={montoOT} onChange={(e) => setMontoOT(e.target.value)} required
                  placeholder="0.00" className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
            </div>
          </section>

          {/* EMISORAS ASOCIADAS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">radio</span>
              Añadir Emisoras
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <select 
                  value={selectedAliadoId} onChange={(e) => setSelectedAliadoId(e.target.value)}
                  className="w-full h-12 px-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="">Selecciona emisora...</option>
                  {aliados.map(a => <option key={a.id} value={a.id}>{a.nombre_emisora}</option>)}
                </select>
                <input type="number" min="1" placeholder="Pautas por emisora" value={cantidadEmisoras} onChange={(e) => setCantidadEmisoras(e.target.value)} className="w-full h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm outline-none" />
                <button onClick={handleAddEmisora} type="button" className="w-full py-2.5 flex items-center justify-center gap-2 border border-dashed border-slate-200 hover:border-primary text-slate-400 hover:text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors mb-2">
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  Agregar Emisora
                </button>
              </div>

              {/* Lista de emisoras asociadas */}
              {emisorasAsoc.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Emisoras agregadas:</p>
                  {emisorasAsoc.map((e) => (
                    <div key={e.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-sm gap-2">
                      <div>
                        <span className="text-sm font-bold text-slate-700 block">{e.nombre_emisora}</span>
                        <span className="text-xs text-slate-500 block">{e.cantidad_emisoras} pautas assignadas</span>
                      </div>
                      <button type="button" onClick={() => handleRemoveEmisora(e.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Ubicación dinámica según emisora seleccionada */}
              {selectedAliado && (
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Ubicación de Emisora Actual</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Región</label>
                      <input type="text" value={selectedAliado.region_nombre || ''} readOnly className="w-full h-10 px-3 bg-slate-100 border border-slate-200 rounded-md text-sm text-slate-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estado</label>
                      <input type="text" value={selectedAliado.estado_nombre || ''} readOnly className="w-full h-10 px-3 bg-slate-100 border border-slate-200 rounded-md text-sm text-slate-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ciudad</label>
                      <input type="text" value={selectedAliado.ciudad_nombre || ''} readOnly className="w-full h-10 px-3 bg-slate-100 border border-slate-200 rounded-md text-sm text-slate-500" />
                    </div>
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

