// ==============================================
// DetallePauta.jsx — Detalle de Pauta Publicitaria
// ==============================================
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import { calcularProgresoPauta } from '../utils/pautasUtils';

const STATUS_STYLE = {
  'en transmision': 'bg-primary/10 text-primary',
  'programada': 'bg-blue-100 text-blue-600',
  'finalizada': 'bg-accent-green/10 text-accent-green',
  'suspendida': 'bg-red-100 text-red-500',
};

export default function DetallePauta() {
  const { id } = useParams();
  const [pauta, setPauta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPauta = async () => {
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
    };
    fetchPauta();
  }, [id]);

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
    // Evitar desfase horario al mostrar la fecha
    const [y, m, d] = dateString.split('T')[0].split('-');
    return new Date(y, m - 1, d).toLocaleDateString();
  };

  const { cuñasEmitidas, progresoPorcentaje: progresoCunas } = calcularProgresoPauta(pauta);
  
  const montoOC = Number(pauta.monto_oc) || 0;
  const montoOT = Number(pauta.monto_ot) || 0;
  const totalNegociacion = Number(pauta.monto_total_negociacion) || 0;
  
  const progresoOC = totalNegociacion > 0 ? Math.min(Math.round((montoOC / totalNegociacion) * 100), 100) : 0;

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
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="px-4 py-2 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">edit</span> Editar
          </button>
          <button className="px-4 py-2 bg-[#F4FAFB] border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span> PDF
          </button>
        </div>
      </div>

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
                { label: 'Tipo de Compra', value: pauta.tipo_compra },
                { label: 'Fecha de Emisión', value: formatDate(pauta.fecha_emision) },
                { label: 'Programa', value: pauta.programa || 'N/A' },
                { label: 'Presentadora', value: pauta.presentadora || 'N/A' },
                { label: 'Horario', value: pauta.horario || 'N/A' },
                { label: 'Observaciones', value: pauta.observaciones || '---' },
              ].map((item) => (
                <div key={item.label} className={item.label === 'Observaciones' ? 'col-span-2' : ''}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-slate-700">{item.value}</p>
                </div>
              ))}
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

          {/* EMISORAS ASOCIADAS */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">radio</span>
              Emisoras Asociadas
            </h3>
            <div className="space-y-3">
              {pauta.emisoras?.length > 0 ? (
                pauta.emisoras.map((e, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="material-symbols-outlined text-primary">radio</span>
                      <div>
                        <span className="text-sm font-bold text-slate-800 block mb-1">{e.nombre_emisora}</span>
                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium text-slate-500">
                          <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{e.region_nombre || 'Sin Región'}</span>
                          <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{e.estado_nombre || 'Sin Estado'}</span>
                          <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{e.ciudad_nombre || 'Sin Ciudad'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="w-2 h-2 rounded-full bg-accent-green"></span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500 italic">No hay emisoras asociadas registradas.</div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* VIGENCIA */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">date_range</span>
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

          {/* MONTOS ADICIONALES */}
          <section className="bg-[#F4FAFB] rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">payments</span>
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
              <div className="flex justify-between py-2">
                <span className="text-xs text-slate-500">Diferencia OC-OT</span>
                <span className="text-sm font-bold text-slate-700">${formatCurrency(montoOC - montoOT)}</span>
              </div>
              <div className="flex justify-between py-2 pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-800">Total Negociación</span>
                <span className="text-sm font-black text-primary">${formatCurrency(totalNegociacion)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

