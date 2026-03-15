// ==============================================
// EquipoVentas.jsx — Equipo de Ventas (Directora Comercial)
// ==============================================
import { Link } from 'react-router-dom';

const VENDEDORES = [
  { initials: 'MG', name: 'María González', role: 'Representante Senior', meta: 85, pautas: 8, logro: '$10,950', color: 'primary' },
  { initials: 'CJ', name: 'Carlos Jaramillo', role: 'Representante', meta: 72, pautas: 6, logro: '$8,640', color: 'accent-green' },
  { initials: 'AR', name: 'Andrés F. Rojas', role: 'Representante', meta: 65, pautas: 5, logro: '$7,800', color: 'secondary' },
  { initials: 'SG', name: 'Sandra Gómez', role: 'Junior', meta: 58, pautas: 4, logro: '$5,220', color: 'primary' },
  { initials: 'ML', name: 'Marta Lucía R.', role: 'Representante Senior', meta: 90, pautas: 10, logro: '$13,500', color: 'accent-green' },
];

function EquipoVentas() {
  return (
    <>
      {/* HEADER */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-display">Equipo de Ventas</h2>
          <p className="text-slate-500 text-sm mt-1">Gestiona tu equipo y revisa su rendimiento</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all w-64" placeholder="Buscar vendedor..." type="text" />
          </div>
          <Link to="/equipo-ventas/agregar" className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">person_add</span>
            Agregar Vendedor
          </Link>
        </div>
      </header>

      {/* VENDEDORES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {VENDEDORES.map((v) => (
          <Link key={v.initials} to={`/equipo-ventas/${v.initials.toLowerCase()}`} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full bg-${v.color} flex items-center justify-center text-white font-bold text-sm border-2 border-${v.color}/20`}>
                {v.initials}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">{v.name}</h4>
                <p className="text-xs text-slate-500">{v.role}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Meta Mensual</span>
                <span className="text-xs font-bold text-slate-700">{v.meta}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${v.meta}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Pautas</p>
                <p className="text-lg font-bold text-slate-800">{v.pautas}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Logro</p>
                <p className="text-lg font-bold text-accent-green">{v.logro}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default EquipoVentas;
