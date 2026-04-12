// ==============================================
// ReportesDirectorio.jsx — Directorio de Reportes
// ==============================================
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    title: 'Reportes de Clientes y Pautas',
    icon: 'person_search',
    color: 'primary',
    reports: [
      { name: 'Ranking Clientes por Pautas', desc: 'Visualización de clientes con mayor volumen de pautas publicitarias.', to: '/reportes/ranking-clientes-pautas', icon: 'leaderboard' },
      { name: 'Clientes por Sector', desc: 'Distribución de cartera de clientes según industria y sector comercial.', to: '/reportes/clientes-sector', icon: 'pie_chart' },
      { name: 'Regiones por Cliente', desc: 'Análisis geográfico de la presencia de clientes en el territorio nacional.', to: '/reportes/regiones-cliente', icon: 'map' },
      { name: 'Ingresos Mensuales', desc: 'Seguimiento histórico de facturación y proyecciones mensuales.', to: '/reportes/ingresos-mensuales', icon: 'payments' },
      { name: 'Pautas por Filtro', desc: 'Búsqueda avanzada de pautas por fecha, categoría o estado.', to: '/reportes/pautas-filtro', icon: 'filter_alt' },
      { name: 'Gastos en inversión de atención comercial', desc: 'Detalle de inversión publicitaria desglosado por cada cuenta.', to: '/reportes/gastos-cliente', icon: 'receipt_long' },
    ],
  },
  {
    title: 'Reportes de Vendedores',
    icon: 'groups',
    color: 'accent-green',
    reports: [
      { name: 'Ranking por Efectividad', desc: 'Comparativa de cierre de ventas y cumplimiento de objetivos.', to: '/reportes/efectividad-vendedores', icon: 'trending_up' },
      { name: 'Gastos por Vendedor', desc: 'Listado detallado de viáticos y recursos asignados por ejecutivo.', to: '/reportes/gastos-detalle-vendedor', icon: 'credit_card' },
    ],
  },
  {
    title: 'Reportes de Emisoras',
    icon: 'cell_tower',
    color: 'secondary',
    reports: [
      { name: 'Top 10 Emisoras por Cuñas', desc: 'Las emisoras con mayor frecuencia de transmisión publicitaria.', to: '/reportes/top-emisoras-cunas', icon: 'radio' },
      { name: 'Emisoras por Región', desc: 'Clasificación de medios radiales según cobertura geográfica.', to: '/reportes/emisoras-region', icon: 'location_on' },
      { name: 'Marcas por Región', desc: 'Impacto de marcas específicas en las diferentes regiones.', to: '/reportes/marcas-region', icon: 'branding_watermark' },
      { name: 'Clientes por Emisora', desc: 'Cartera de anunciantes activa por cada estación de radio.', to: '/reportes/clientes-emisora', icon: 'contacts' },
      { name: 'Emisoras Activas por Región', desc: 'Estado actual de la red de emisoras aliadas por zona.', to: '/reportes/emisoras-activas-region', icon: 'sensors' },
      { name: 'Top Emisoras por Clientes', desc: 'Emisoras preferidas por el volumen total de anunciantes.', to: '/reportes/top-emisoras-clientes', icon: 'star' },
    ],
  },
];

export default function ReportesDirectorio() {
  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-display">Reportes</h2>
          <p className="text-slate-500 text-sm mt-1">Centro de inteligencia comercial y análisis de datos</p>
        </div>
        <div className="flex items-center gap-4">
          {/*<button className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-[#F4FAFB] text-slate-600 hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-lg">file_download</span>
            <span className="text-xs font-bold uppercase tracking-wider">Exportar Todo</span>
          </button>*/}
        </div>
      </header>

      {CATEGORIES.map((cat) => (
        <section key={cat.title} className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 bg-${cat.color}/10 rounded-lg`}>
              <span className={`material-symbols-outlined text-${cat.color}`}>{cat.icon}</span>
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900">{cat.title}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cat.reports.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="group bg-[#F4FAFB] p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 bg-${cat.color}/10 rounded-lg group-hover:bg-${cat.color}/20 transition-colors`}>
                    <span className={`material-symbols-outlined text-${cat.color}`}>{r.icon}</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{r.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
