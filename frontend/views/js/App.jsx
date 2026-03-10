// ==============================================
// App.jsx — Componente Raíz CRM 2jmcMedios
// ==============================================

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">2J</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">CRM 2jmcMedios</h1>
              <p className="text-xs text-slate-500">Sistema de Gestión Comercial</p>
            </div>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Clientes</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Vendedores</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Visitas</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contactos</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashCard title="Clientes" value="—" icon="👥" color="blue" />
          <DashCard title="Vendedores" value="—" icon="💼" color="violet" />
          <DashCard title="Visitas" value="—" icon="📋" color="amber" />
          <DashCard title="Contactos" value="—" icon="📇" color="emerald" />
        </div>

        {/* Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">🚀 Sistema Activo</h2>
          <p className="text-slate-600 text-sm">
            El CRM 2jmcMedios está configurado y listo. 
            Conecta la base de datos PostgreSQL para comenzar a gestionar clientes, 
            vendedores y visitas.
          </p>
        </div>
      </main>
    </div>
  );
}

/**
 * DashCard — Tarjeta de dashboard reutilizable
 */
function DashCard({ title, value, icon, color }) {
  const colorMap = {
    blue:    'from-blue-500 to-blue-600',
    violet:  'from-violet-500 to-violet-600',
    amber:   'from-amber-500 to-amber-600',
    emerald: 'from-emerald-500 to-emerald-600',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${colorMap[color]} text-white text-xs font-semibold`}>
          {value}
        </div>
      </div>
      <h3 className="text-sm font-medium text-slate-600">{title}</h3>
    </div>
  );
}

export default App;
