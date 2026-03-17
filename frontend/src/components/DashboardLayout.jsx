// ==============================================
// DashboardLayout.jsx — Layout compartido (Sidebar + Header)
// ==============================================
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/mi-perfil', icon: 'person', label: 'Mi Perfil' },
  { to: '/equipo-ventas', icon: 'group', label: 'Equipo de Ventas' },
  { to: '/pautas', icon: 'description', label: 'Pautas' },
  { to: '/aliados-comerciales', icon: 'handshake', label: 'Aliados Comerciales' },
  { to: '/actividad-comercial', icon: 'monitoring', label: 'Actividad Comercial' },
  { to: '/pipeline', icon: 'account_tree', label: 'Pipeline' },
  { to: '/clientes', icon: 'group_add', label: 'Clientes' },
  { to: '/reportes', icon: 'bar_chart', label: 'Reportes' },
];

function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#EBF6F7] text-slate-900 antialiased">
      {/* ===================== SIDEBAR ===================== */}
      <aside className="w-[240px] bg-[#F4FAFB] border-r border-[#E0F0F2] flex flex-col fixed h-full z-10">
        <div className="p-6">
          <h1 className="text-primary text-xl font-bold leading-tight tracking-tight font-display">CRM 2JMC</h1>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">Directora Comercial</p>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive || location.pathname.startsWith(to + '/')
                  ? 'flex items-center gap-3 px-3 py-2.5 bg-primary/10 text-primary border-l-4 border-primary rounded-r-lg transition-colors'
                  : 'flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-[#E0F0F2] rounded-lg transition-colors border-l-4 border-transparent'
              }
            >
              <span className="material-symbols-outlined text-[22px]">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-[#E0F0F2]">
          <NavLink
            to="/login"
            className="flex items-center gap-3 w-full px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">logout</span>
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </NavLink>
        </div>
      </aside>

      {/* ===================== MAIN CONTENT ===================== */}
      <main className="flex-1 ml-[240px] p-8 max-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
