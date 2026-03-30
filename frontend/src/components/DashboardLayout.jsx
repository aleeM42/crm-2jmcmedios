// ==============================================
// DashboardLayout.jsx — Layout compartido (Sidebar + Header)
// ==============================================
import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../services/auth.service';
import { Toaster } from 'sonner';
import HelpModal from './HelpModal';

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
  const user = getCurrentUser();
  const rol = user?.rol?.toLowerCase() || '';
  const [showHelp, setShowHelp] = useState(false);

  // Filtrar NAV_ITEMS según el rol
  const filteredNavItems = NAV_ITEMS.filter((item) => {
    const rolAuth = rol.toLowerCase();

    // Director General / Director: Ve todo
    if (rolAuth === 'director general' || rolAuth === 'director') return true;

    // Pauta: Solo ve su módulo y reportes/dashboard
    if (rolAuth === 'pauta') {
      return item.to === '/dashboard' || item.to === '/pautas' || item.to === '/reportes';
    }

    // Invitado: Solo ve Dashboard y lectura general si se le habilita
    if (rolAuth === 'invitado') {
      return item.to === '/dashboard' || item.to === '/reportes';
    }

    // Administrador: Todo excepto mi-perfil
    if (rolAuth === 'administrador') {
      return item.to !== '/mi-perfil';
    }

    return true;
  });

  return (
    <div className="flex h-screen bg-[#EBF6F7] text-slate-900 antialiased overflow-hidden">
      <Toaster position="top-right" richColors toastOptions={{ className: 'font-display' }} />
      {/* ===================== SIDEBAR ===================== */}
      <aside className="w-[240px] bg-[#F4FAFB] border-r border-[#E0F0F2] flex flex-col fixed h-full z-10">
        <div className="p-6">
          <h1 className="text-primary text-xl font-bold leading-tight tracking-tight font-display">CRM 2JMC</h1>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">{user?.rol || 'Director'}</p>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {filteredNavItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive || location.pathname.startsWith(to + '/')
                  ? 'flex items-center gap-3 px-4 py-2.5 bg-primary/10 text-primary rounded-lg font-bold transition-all'
                  : 'flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:bg-[#E0F0F2] hover:text-slate-900 rounded-lg font-medium transition-all'
              }
            >
              <span className="material-symbols-outlined text-[22px]">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-[#E0F0F2] space-y-1">
          {/* Ayuda */}
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-[#16B1B8] hover:bg-[#E0F0F2] rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">help</span>
            <span className="text-sm font-medium">Ayuda</span>
          </button>

          {/* Cerrar Sesión */}
          <NavLink
            to="/login"
            className="flex items-center gap-3 w-full px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">logout</span>
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </NavLink>
        </div>

        {/* Modal de Ayuda */}
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      </aside>

      {/* ===================== MAIN CONTENT ===================== */}
      <main className="flex-1 ml-[240px] p-8 overflow-y-auto min-h-0 min-w-0 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
