// ==============================================
// DetallePauta.jsx — Detalle de Pauta Publicitaria
// ==============================================
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import { getCurrentUser } from '../services/auth.service';
import { calcularProgresoPauta } from '../utils/pautasUtils';
import EditarPautaModal from '../components/EditarPautaModal';

const STATUS_STYLE = {
  'en transmision': 'bg-primary/10 text-primary',
  'programada': 'bg-blue-100 text-blue-600',
  'finalizada': 'bg-accent-green/10 text-accent-green',
  'suspendida': 'bg-red-100 text-red-500',
};

const DIAS_MAP = {
  L: 'Lun', M: 'Mar', X: 'Mié', J: 'Jue', V: 'Vie', S: 'Sáb', D: 'Dom'
};

export default function DetallePauta() {
  const { id } = useParams();
  const [pauta, setPauta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const user = getCurrentUser();
  const rol = user?.rol || '';

  const fetchPauta = useCallback(async () => {
    try {
      const response = await api.get(`/pautas/${id}`);
      if (response.success) {
        setPauta(response.data);
      }
    } catch (error) {
      console.error('Error fetching pauta details:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPauta();
  }, [fetchPauta]);

  const handleEditSuccess = useCallback(() => {
    setShowEdit(false);
    setSuccessMsg('Pauta actualizada exitosamente');
    fetchPauta();
  }, [fetchPauta]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Cargando detalles de la pauta...</div>;
  }

  if (!pauta) {
    return <div className="p-8 text-center text-red-500">No se encontró la pauta.</div>;
  }

  const formatCurrency = (monto) => {
    return Number(monto).toLocaleString('es-VE', { minimumFractionDigits: 2 });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const [y, m, d] = dateString.split('T')[0].split('-');
    return new Date(y, m - 1, d).toLocaleDateString();
  };

  const { cuñasEmitidas, progresoPorcentaje: progresoCunas } = calcularProgresoPauta(pauta);

  const montoOC = Number(pauta.monto_oc) || 0;
  const montoOT = Number(pauta.monto_ot) || 0;
  const totalNegociacion = Number(pauta.monto_total_negociacion) || 0;

  const progresoOC = totalNegociacion > 0 ? Math.min(Math.round((montoOC / totalNegociacion) * 100), 100) : 0;

  // Días de semana
  const diasSemana = pauta.dias_semana ? pauta.dias_semana.split(',') : [];

  // Distribución OC — sumar monto OT de todas las emisoras de la misma OC
  const otrasEmisoras = pauta.otras_emisoras_oc || [];
  const montoAsignadoTotal = montoOT + otrasEmisoras.reduce((sum, e) => sum + Number(e.monto_ot || 0), 0);
  const montoDisponibleOC = montoOC - montoAsignadoTotal;

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/pautas">Pautas</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">{pauta.numero_ot}</span>
          </nav>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-900 font-display">{pauta.numero_ot}</h2>
            <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${STATUS_STYLE[pauta.estado] || 'bg-slate-100 text-slate-600'}`}>
              {pauta.estado}
            </span>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
          {/* Solo Admin, Director General y Gestor de Pautas pueden editar/eliminar pautas */}
          {(rol === 'Administrador' || rol === 'Director General' || rol === 'Gestor de Pautas') && (
            <>
              <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-red-500/20 text-red-500 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors">
                <span className="material-symbols-outlined text-lg">delete</span> Eliminar
              </button>
              <button onClick={() => setShowEdit(true)} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-lg">edit</span> Editar
              </button>
            </>
          )}

          <button className="px-4 py-2 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span> PDF
          </button>
        </div>
      </div>

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
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">info</span>
              Información General
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
              {[
                { label: 'Cliente', value: pauta.cliente_nombre },
                { label: 'Marca', value: pauta.marca },
                { label: 'Agencia', value: pauta.cliente_agencia || 'Directo' },
                { label: 'Coordinadora', value: pauta.coordinadora },
                { label: 'Número OC', value: pauta.numero_oc },
                { label: 'Tipo de Compra', value: pauta.tipo_compra },
                { label: 'Fecha de Emisión', value: formatDate(pauta.fecha_emision) },
                { label: 'Programa', value: pauta.programa || 'N/A' },
                { label: 'Presentadora', value: pauta.presentadora || 'N/A' },
                { label: 'Horario', value: pauta.horario || 'N/A' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-slate-700">{item.value}</p>
                </div>
              ))}

              {/* Días de emisión */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Días de Emisión</p>
                <div className="flex flex-wrap gap-1.5">
                  {diasSemana.length > 0 ? diasSemana.map(d => (
                    <span key={d} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md">
                      {DIAS_MAP[d] || d}
                    </span>
                  )) : (
                    <span className="text-sm text-slate-400 italic">No especificado</span>
                  )}
                </div>
              </div>

              {/* Observaciones */}
              <div className="col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Observaciones</p>
                <p className="text-sm font-medium text-slate-700">{pauta.observaciones || '---'}</p>
              </div>
            </div>
          </section>

          {/* PROGRESO DE CONSUMO */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">donut_large</span>
              Progreso de Consumo
            </h3>

            {/* CUÑAS */}
            <div className="flex items-center gap-8 mb-6">
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-600">Cuñas Emitidas: {cuñasEmitidas} / {pauta.cantidad_cunas}</span>
                  <span className="text-primary">{progresoCunas}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progresoCunas}%` }}></div>
                </div>
              </div>
            </div>

            {/* MONTO OC */}
            <div className="flex items-center gap-8 mb-6">
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-600">Monto OC: ${formatCurrency(montoOC)} / Total Negociado: ${formatCurrency(totalNegociacion)}</span>
                  <span className="text-[#8DC63F]">{progresoOC}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8DC63F] rounded-full transition-all" style={{ width: `${progresoOC}%` }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Cuñas</p>
                <p className="text-2xl font-black text-slate-900 font-display">{pauta.cantidad_cunas}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Costo por Cuña</p>
                <p className="text-2xl font-black text-slate-900 font-display">${formatCurrency(pauta.costo_cunas)}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cuñas Restantes</p>
                <p className="text-2xl font-black text-slate-900 font-display">{Math.max(pauta.cantidad_cunas - cuñasEmitidas, 0)}</p>
              </div>
            </div>
          </section>

          {/* EMISORA ASOCIADA */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">radio</span>
              Emisora Asociada
            </h3>
            {pauta.nombre_emisora ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 flex-1">
                  <span className="material-symbols-outlined text-primary">radio</span>
                  <div>
                    <span className="text-sm font-bold text-slate-800 block mb-1">{pauta.nombre_emisora}</span>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium text-slate-500">
                      <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{pauta.region_nombre || 'Sin Región'}</span>
                      <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{pauta.estado_nombre || 'Sin Estado'}</span>
                      <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{pauta.ciudad_nombre || 'Sin Ciudad'}</span>
                    </div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-accent-green"></span>
              </div>
            ) : (
              <div className="text-sm text-slate-500 italic">No hay emisora asociada registrada.</div>
            )}
          </section>

          {/* OTRAS EMISORAS EN ESTA OC */}
          {otrasEmisoras.length > 0 && (
            <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">hub</span>
                Otras Emisoras en OC: {pauta.numero_oc}
              </h3>
              <div className="space-y-3">
                {otrasEmisoras.map((e) => (
                  <Link
                    key={e.id}
                    to={`/pautas/${e.id}`}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="material-symbols-outlined text-slate-400">radio</span>
                      <div>
                        <span className="text-sm font-bold text-slate-800 block">{e.nombre_emisora || 'Sin emisora'}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">OT: {e.numero_ot}</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-700">${formatCurrency(e.monto_ot)}</span>
                  </Link>
                ))}
              </div>

              {/* Resumen distribución OC */}
              <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Total asignado ({otrasEmisoras.length + 1} emisoras)</span>
                  <span className="font-bold text-slate-800">${formatCurrency(montoAsignadoTotal)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Monto OC</span>
                  <span className="font-bold text-slate-800">${formatCurrency(montoOC)}</span>
                </div>
                <div className="flex justify-between text-xs mt-2 pt-2 border-t border-slate-100">
                  <span className="text-slate-500 font-bold">Disponible</span>
                  <span className={`font-black ${montoDisponibleOC >= 0 ? 'text-accent-green' : 'text-red-500'}`}>
                    ${formatCurrency(montoDisponibleOC)}
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* VIGENCIA */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-accent-green">date_range</span>
              Vigencia
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Fecha Inicio</span>
                <span className="text-xs font-bold text-slate-700">{formatDate(pauta.fecha_inicio)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Fecha Fin</span>
                <span className="text-xs font-bold text-slate-700">{formatDate(pauta.fecha_fin)}</span>
              </div>
            </div>
          </section>

          {/* MONTOS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-accent-green">payments</span>
              Montos
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Monto OC</span>
                <span className="text-sm font-black text-[#8DC63F]">${formatCurrency(montoOC)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Monto OT</span>
                <span className="text-sm font-black text-[#A1DEE5]">${formatCurrency(montoOT)}</span>
              </div>

              <div className="flex justify-between py-2 pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-800">Total Negociación</span>
                <span className="text-sm font-black text-primary">${formatCurrency(totalNegociacion)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Modal Editar Pauta */}
      {showEdit && (
        <EditarPautaModal
          pauta={pauta}
          onClose={() => setShowEdit(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
}
