// ==============================================
// App.jsx — Enrutador principal del Frontend
// ==============================================
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Auth
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MiPerfil from './pages/MiPerfil';
import EquipoVentas from './pages/EquipoVentas';
import AgregarVendedor from './pages/AgregarVendedor';
import DetalleVendedor from './pages/DetalleVendedor';
import PautasLista from './pages/PautasLista';
import PautasKanban from './pages/PautasKanban';
import PautasCalendario from './pages/PautasCalendario';
import AgregarPauta from './pages/AgregarPauta';
import DetallePauta from './pages/DetallePauta';
import AliadosComerciales from './pages/AliadosComerciales';
import AgregarAliado from './pages/AgregarAliado';
import DetalleEmisora from './pages/DetalleEmisora';
import ActividadComercial from './pages/ActividadComercial';
import AgregarVisita from './pages/AgregarVisita';
import Pipeline from './pages/Pipeline';
import Clientes from './pages/Clientes';
import AgregarCliente from './pages/AgregarCliente';
import DetalleCliente from './pages/DetalleCliente';
import AgregarSubEmpresa from './pages/AgregarSubEmpresa';
import AgregarMarca from './pages/AgregarMarca';
import GastosLista from './pages/GastosLista';
import AgregarGasto from './pages/AgregarGasto';
import ReportesDirectorio from './pages/ReportesDirectorio';
import ReporteRankingClientesPautas from './pages/ReporteRankingClientesPautas';
import ReporteClientesSector from './pages/ReporteClientesSector';
import ReporteRegionesCliente from './pages/ReporteRegionesCliente';
import ReporteIngresosMensuales from './pages/ReporteIngresosMensuales';
import ReportePautasFiltro from './pages/ReportePautasFiltro';
import ReporteGastosCliente from './pages/ReporteGastosCliente';
import ReporteEfectividadVendedores from './pages/ReporteEfectividadVendedores';
import ReporteGastosDetalleVendedor from './pages/ReporteGastosDetalleVendedor';
import ReporteTopEmisorasCunas from './pages/ReporteTopEmisorasCunas';
import ReporteEmisorasRegion from './pages/ReporteEmisorasRegion';
import ReporteMarcasRegion from './pages/ReporteMarcasRegion';
import ReporteClientesEmisora from './pages/ReporteClientesEmisora';
import ReporteEmisorasActivasRegion from './pages/ReporteEmisorasActivasRegion';
import ReporteTopEmisorasClientes from './pages/ReporteTopEmisorasClientes';
import AgregarLead from './pages/AgregarLead';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===================== PUBLIC ===================== */}
        <Route path="/login" element={<Login />} />

        {/* ===================== DASHBOARD (protegido + sidebar) ===================== */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mi-perfil" element={<ProtectedRoute allowedRoles={['Director General', 'Director', 'Vendedor', 'Gestor de Pautas', 'Invitado']}><MiPerfil /></ProtectedRoute>} />

          {/* Equipo de Ventas */}
          <Route path="/equipo-ventas" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor', 'Invitado']}><EquipoVentas /></ProtectedRoute>} />
          <Route path="/equipo-ventas/agregar" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director']}><AgregarVendedor /></ProtectedRoute>} />
          <Route path="/equipo-ventas/:id" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Invitado']}><DetalleVendedor /></ProtectedRoute>} />

          {/* Pautas */}
          <Route path="/pautas" element={<PautasLista />} />
          <Route path="/pautas/kanban" element={<PautasKanban />} />
          <Route path="/pautas/calendario" element={<PautasCalendario />} />
          <Route path="/pautas/agregar" element={<ProtectedRoute allowedRoles={['Administrador', 'Gestor de Pautas']}><AgregarPauta /></ProtectedRoute>} />
          <Route path="/pautas/:id" element={<DetallePauta />} />

          {/* Aliados Comerciales */}
          <Route path="/aliados-comerciales" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor', 'Invitado']}><AliadosComerciales /></ProtectedRoute>} />
          <Route path="/aliados-comerciales/agregar" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director']}><AgregarAliado /></ProtectedRoute>} />
          <Route path="/aliados-comerciales/:id" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor', 'Invitado', 'Gestor de Pautas']}><DetalleEmisora /></ProtectedRoute>} />

          {/* Actividad Comercial */}
          <Route path="/actividad-comercial" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor', 'Invitado']}><ActividadComercial /></ProtectedRoute>} />
          <Route path="/actividad-comercial/visita" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor']}><AgregarVisita /></ProtectedRoute>} />
          <Route path="/actividad-comercial/gastos" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor']}><GastosLista /></ProtectedRoute>} />
          <Route path="/actividad-comercial/gastos/agregar" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor']}><AgregarGasto /></ProtectedRoute>} />

          {/* Pipeline */}
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/pipeline/agregar" element={<AgregarLead />} />

          {/* Clientes */}
          <Route path="/clientes" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor', 'Invitado']}><Clientes /></ProtectedRoute>} />
          <Route path="/clientes/agregar" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor']}><AgregarCliente /></ProtectedRoute>} />
          <Route path="/clientes/:id" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor', 'Invitado']}><DetalleCliente /></ProtectedRoute>} />
          <Route path="/clientes/:clienteId/sub-empresa" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor']}><AgregarSubEmpresa /></ProtectedRoute>} />
          <Route path="/clientes/:clienteId/marca" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor']}><AgregarMarca /></ProtectedRoute>} />

          {/* Reportes */}
          <Route path="/reportes" element={<ProtectedRoute allowedRoles={['Administrador', 'Director General', 'Director', 'Vendedor', 'Invitado']}><ReportesDirectorio /></ProtectedRoute>} />
          <Route path="/reportes/ranking-clientes-pautas" element={<ReporteRankingClientesPautas />} />
          <Route path="/reportes/clientes-sector" element={<ReporteClientesSector />} />
          <Route path="/reportes/regiones-cliente" element={<ReporteRegionesCliente />} />
          <Route path="/reportes/ingresos-mensuales" element={<ReporteIngresosMensuales />} />
          <Route path="/reportes/pautas-filtro" element={<ReportePautasFiltro />} />
          <Route path="/reportes/gastos-cliente" element={<ReporteGastosCliente />} />
          <Route path="/reportes/efectividad-vendedores" element={<ReporteEfectividadVendedores />} />
          <Route path="/reportes/gastos-detalle-vendedor" element={<ReporteGastosDetalleVendedor />} />
          <Route path="/reportes/top-emisoras-cunas" element={<ReporteTopEmisorasCunas />} />
          <Route path="/reportes/emisoras-region" element={<ReporteEmisorasRegion />} />
          <Route path="/reportes/marcas-region" element={<ReporteMarcasRegion />} />
          <Route path="/reportes/clientes-emisora" element={<ReporteClientesEmisora />} />
          <Route path="/reportes/emisoras-activas-region" element={<ReporteEmisorasActivasRegion />} />
          <Route path="/reportes/top-emisoras-clientes" element={<ReporteTopEmisorasClientes />} />
        </Route>

        {/* ===================== REDIRECT ===================== */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
