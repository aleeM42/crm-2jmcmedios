// ==============================================
// App.jsx — Enrutador principal del Frontend
// ==============================================
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import DashboardLayout from './components/DashboardLayout';

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
import ReporteGastosVendedores from './pages/ReporteGastosVendedores';
import ReporteGastosDetalleVendedor from './pages/ReporteGastosDetalleVendedor';
import ReporteTopEmisorasCunas from './pages/ReporteTopEmisorasCunas';
import ReporteEmisorasRegion from './pages/ReporteEmisorasRegion';
import ReporteMarcasRegion from './pages/ReporteMarcasRegion';
import ReporteClientesEmisora from './pages/ReporteClientesEmisora';
import ReporteEmisorasActivasRegion from './pages/ReporteEmisorasActivasRegion';
import ReporteTopEmisorasClientes from './pages/ReporteTopEmisorasClientes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===================== PUBLIC ===================== */}
        <Route path="/login" element={<Login />} />

        {/* ===================== DASHBOARD (con sidebar) ===================== */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mi-perfil" element={<MiPerfil />} />

          {/* Equipo de Ventas */}
          <Route path="/equipo-ventas" element={<EquipoVentas />} />
          <Route path="/equipo-ventas/agregar" element={<AgregarVendedor />} />
          <Route path="/equipo-ventas/:id" element={<DetalleVendedor />} />

          {/* Pautas */}
          <Route path="/pautas" element={<PautasLista />} />
          <Route path="/pautas/kanban" element={<PautasKanban />} />
          <Route path="/pautas/calendario" element={<PautasCalendario />} />
          <Route path="/pautas/agregar" element={<AgregarPauta />} />
          <Route path="/pautas/:id" element={<DetallePauta />} />

          {/* Aliados Comerciales */}
          <Route path="/aliados-comerciales" element={<AliadosComerciales />} />
          <Route path="/aliados-comerciales/agregar" element={<AgregarAliado />} />
          <Route path="/aliados-comerciales/:id" element={<DetalleEmisora />} />

          {/* Actividad Comercial */}
          <Route path="/actividad-comercial"                element={<ActividadComercial />} />
          <Route path="/actividad-comercial/visita"         element={<AgregarVisita />} />
          <Route path="/actividad-comercial/gastos"         element={<GastosLista />} />
          <Route path="/actividad-comercial/gastos/agregar" element={<AgregarGasto />} />

          {/* Pipeline */}
          <Route path="/pipeline" element={<Pipeline />} />

          {/* Clientes */}
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/agregar" element={<AgregarCliente />} />
          <Route path="/clientes/:id" element={<DetalleCliente />} />
          <Route path="/clientes/:clienteId/sub-empresa" element={<AgregarSubEmpresa />} />

          {/* Reportes */}
          <Route path="/reportes" element={<ReportesDirectorio />} />
          <Route path="/reportes/ranking-clientes-pautas" element={<ReporteRankingClientesPautas />} />
          <Route path="/reportes/clientes-sector" element={<ReporteClientesSector />} />
          <Route path="/reportes/regiones-cliente" element={<ReporteRegionesCliente />} />
          <Route path="/reportes/ingresos-mensuales" element={<ReporteIngresosMensuales />} />
          <Route path="/reportes/pautas-filtro" element={<ReportePautasFiltro />} />
          <Route path="/reportes/gastos-cliente" element={<ReporteGastosCliente />} />
          <Route path="/reportes/efectividad-vendedores" element={<ReporteEfectividadVendedores />} />
          <Route path="/reportes/gastos-vendedores" element={<ReporteGastosVendedores />} />
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
