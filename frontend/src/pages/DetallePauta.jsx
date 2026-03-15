// ==============================================
// DetallePauta.jsx — Detalle de Pauta Publicitaria
// ==============================================
import { Link, useParams } from 'react-router-dom';

const STATUS_STYLE = {
  'En transmisión': 'bg-primary/10 text-primary',
  'Programada': 'bg-blue-100 text-blue-600',
  'Finalizada': 'bg-accent-green/10 text-accent-green',
  'Cancelada': 'bg-red-100 text-red-500',
};

export default function DetallePauta() {
  const { id } = useParams();

  const pauta = {
    numero_OT: id || 'OT-001',
    cliente: 'Alimentos Polar',
    marca: 'Harina PAN',
    vendedor: 'Carlos Pérez',
    coordinadora: 'Laura Méndez',
    tipo_compra: 'Directo',
    fecha_emision: '2023-10-01',
    fecha_inicio: '2023-10-15',
    fecha_fin: '2023-12-15',
    estado: 'En transmisión',
    cantidad_cuñas: 180,
    cuñas_emitidas: 130,
    costo_cuña: 65,
    monto_OC: 12500,
    monto_OT: 11800,
    programa: 'La Mañana Romántica',
    presentadora: 'Ana María López',
    horario: '06:00 - 10:00 AM',
    observaciones: 'Pauta confirmada por cliente. Prioridad alta.',
  };

  const progreso = Math.round((pauta.cuñas_emitidas / pauta.cantidad_cuñas) * 100);

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" to="/pautas">Pautas</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-slate-600">{pauta.numero_OT}</span>
          </nav>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-900 font-display">{pauta.numero_OT}</h2>
            <span className={`px-4 py-1 rounded-full text-xs font-bold ${STATUS_STYLE[pauta.estado]}`}>{pauta.estado}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">edit</span> Editar
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span> PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-8 space-y-8">
          {/* INFORMACIÓN GENERAL */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">info</span>
              Información General
            </h3>
            <div className="grid grid-cols-2 gap-y-5 gap-x-10">
              {[
                { label: 'Cliente', value: pauta.cliente },
                { label: 'Marca', value: pauta.marca },
                { label: 'Vendedor', value: pauta.vendedor },
                { label: 'Coordinadora', value: pauta.coordinadora },
                { label: 'Tipo de Compra', value: pauta.tipo_compra },
                { label: 'Fecha de Emisión', value: pauta.fecha_emision },
                { label: 'Programa', value: pauta.programa },
                { label: 'Presentadora', value: pauta.presentadora },
                { label: 'Horario', value: pauta.horario },
                { label: 'Observaciones', value: pauta.observaciones },
              ].map((item) => (
                <div key={item.label} className={item.label === 'Observaciones' ? 'col-span-2' : ''}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-slate-700">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PROGRESO DE CONSUMO */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">donut_large</span>
              Progreso de Consumo
            </h3>
            <div className="flex items-center gap-8 mb-6">
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-600">Cuñas Emitidas: {pauta.cuñas_emitidas} / {pauta.cantidad_cuñas}</span>
                  <span className="text-primary">{progreso}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progreso}%` }}></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Cuñas</p>
                <p className="text-2xl font-black text-slate-900 font-display">{pauta.cantidad_cuñas}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Costo por Cuña</p>
                <p className="text-2xl font-black text-slate-900 font-display">${pauta.costo_cuña}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Restantes</p>
                <p className="text-2xl font-black text-slate-900 font-display">{pauta.cantidad_cuñas - pauta.cuñas_emitidas}</p>
              </div>
            </div>
          </section>

          {/* EMISORAS ASOCIADAS */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">radio</span>
              Emisoras Asociadas
            </h3>
            <div className="space-y-3">
              {[
                { nombre_emisora: 'La Romántica 88.9', frecuencia: '88.9 FM', cuñas: 90, estado: 'Activo' },
                { nombre_emisora: 'Éxitos 99.9', frecuencia: '99.9 FM', cuñas: 60, estado: 'Activo' },
                { nombre_emisora: 'Onda 107.9', frecuencia: '107.9 FM', cuñas: 30, estado: 'Inactivo' },
              ].map((e) => (
                <div key={e.nombre_emisora} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary">radio</span>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{e.nombre_emisora}</p>
                      <p className="text-xs text-slate-400">{e.frecuencia}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-medium text-slate-500">{e.cuñas} cuñas</span>
                    <span className={`w-2 h-2 rounded-full ${e.estado === 'Activo' ? 'bg-accent-green' : 'bg-slate-300'}`}></span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-4 space-y-8">
          {/* VIGENCIA */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">date_range</span>
              Vigencia
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Fecha Inicio</span>
                <span className="text-xs font-bold text-slate-700">{pauta.fecha_inicio}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Fecha Fin</span>
                <span className="text-xs font-bold text-slate-700">{pauta.fecha_fin}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-xs text-slate-500">Duración</span>
                <span className="text-xs font-bold text-slate-700">62 días</span>
              </div>
            </div>
          </section>

          {/* MONTOS */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">payments</span>
              Montos
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Monto OC</span>
                <span className="text-sm font-black text-primary">${pauta.monto_OC.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Monto OT</span>
                <span className="text-sm font-black text-slate-800">${pauta.monto_OT.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-xs text-slate-500">Diferencia</span>
                <span className="text-sm font-bold text-accent-green">${(pauta.monto_OC - pauta.monto_OT).toLocaleString()}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
