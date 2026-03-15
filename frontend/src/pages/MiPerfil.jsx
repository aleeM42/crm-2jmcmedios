// ==============================================
// MiPerfil.jsx — Perfil del Vendedor
// ==============================================

function MiPerfil() {
  const clientes = [
    { initials: 'AP', name: 'Alimentos Polar', contacto: 'Juan Pérez', fecha: '25 Oct, 2023', estado: 'Activo', estadoColor: 'accent-green' },
    { initials: 'FT', name: 'Farmatodo', contacto: 'Elena Rivas', fecha: '24 Oct, 2023', estado: 'Activo', estadoColor: 'accent-green' },
    { initials: 'TY', name: 'Toyota', contacto: 'Carlos Sosa', fecha: '22 Oct, 2023', estado: 'Inactivo', estadoColor: 'slate' },
    { initials: 'NT', name: 'Nestlé', contacto: 'Ana Martínez', fecha: '20 Oct, 2023', estado: 'Activo', estadoColor: 'accent-green' },
    { initials: 'BN', name: 'Banesco', contacto: 'Luis Blanco', fecha: '18 Oct, 2023', estado: 'Inactivo', estadoColor: 'slate' },
  ];

  const actividades = [
    { icon: 'visibility', title: 'Visita a Alimentos Polar', time: 'Hoy, 10:30 AM' },
    { icon: 'receipt_long', title: 'Gasto registrado: Almuerzo cliente', time: 'Hoy, 02:15 PM' },
    { icon: 'call', title: 'Llamada: Farmatodo', time: 'Ayer, 11:20 AM' },
    { icon: 'edit_note', title: 'Pauta actualizada: Nestlé', time: '25 Oct, 2023' },
    { icon: 'check_circle', title: 'Cierre de negocio: Toyota', time: '24 Oct, 2023' },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-display">Mi Perfil</h2>
          <nav className="flex text-xs text-slate-400 mt-1">
            <span className="hover:text-primary cursor-pointer transition-colors">CRM 2JMC</span>
            <span className="mx-2">/</span>
            <span className="text-slate-600">Perfil del Vendedor</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800">María González</p>
            <p className="text-xs text-slate-500">Representante de Ventas Senior</p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">MG</div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent-green rounded-full border-2 border-white"></div>
          </div>
        </div>
      </header>

      {/* KPI CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Meta Mensual */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Meta Mensual</p>
            <h3 className="text-2xl font-bold text-slate-800">$15,000</h3>
            <p className="text-xs text-primary font-medium mt-1">+73% alcanzado</p>
          </div>
          <div className="relative w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle className="text-slate-100 stroke-current" cx="50" cy="50" fill="transparent" r="40" strokeWidth="8"></circle>
              <circle className="text-primary stroke-current" cx="50" cy="50" fill="transparent" r="40" strokeLinecap="round" strokeWidth="8" style={{ strokeDasharray: '251.2', strokeDashoffset: '67.8', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary">73%</div>
          </div>
        </div>
        {/* Pautas del Mes */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent-light/30 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">assignment</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pautas del Mes</p>
              <h3 className="text-2xl font-bold text-slate-800">8</h3>
            </div>
          </div>
        </div>
        {/* Visitas Totales */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center text-accent-green">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Visitas Totales</p>
              <h3 className="text-2xl font-bold text-slate-800">24</h3>
            </div>
          </div>
        </div>
        {/* Gastos del Mes */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-400">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gastos del Mes</p>
              <h3 className="text-2xl font-bold text-slate-800">$890</h3>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cartera de Clientes */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Mi Cartera de Clientes</h3>
            <button className="text-primary text-sm font-semibold hover:underline">Ver todos</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Empresa</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Contacto principal</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Última Interacción</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clientes.map((c) => (
                  <tr key={c.initials}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs">{c.initials}</div>
                        <span className="text-sm font-semibold text-slate-800">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.contacto}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.fecha}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${c.estadoColor === 'accent-green' ? 'bg-accent-green/10 text-accent-green' : 'bg-slate-100 text-slate-400'}`}>
                        {c.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a className="text-primary text-xs font-bold hover:text-secondary transition-colors cursor-pointer">Ver Detalle</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Actividad Reciente</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-6 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {actividades.map((a) => (
                <li key={a.icon + a.title} className="relative pl-8">
                  <span className="absolute left-0 top-0 w-6 h-6 bg-white border-2 border-primary rounded-full flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-[14px] text-primary">{a.icon}</span>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{a.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default MiPerfil;
