// ==============================================
// reporte.controller.js — Controlador de Reportes Analíticos
// ==============================================

import ReporteModel from '../model/reporte.model.js';

class ReporteController {

  static async getReportData(req, res, next) {
    try {
      const { nombreReporte } = req.params;
      let data = { chartData: [], listData: [] };

      switch (nombreReporte) {
        case 'ranking-clientes-pautas':
          data = await ReporteModel.getRankingClientesPautas();
          break;
        case 'clientes-sector':
          data = await ReporteModel.getClientesSector();
          break;
        case 'regiones-cliente':
          data = await ReporteModel.getRegionesCliente();
          break;
        case 'ingresos-mensuales': {
          const anio = req.query.anio || new Date().getFullYear();
          data = await ReporteModel.getIngresosMensuales(anio);
          break;
        }
        case 'pautas-filtro': {
          const { region, marca, cliente, estado, fechaDesde, fechaHasta } = req.query;
          data = await ReporteModel.getPautasFiltro({ region, marca, cliente, estado, fechaDesde, fechaHasta });
          break;
        }
        case 'gastos-cliente':
          data = await ReporteModel.getGastosCliente();
          break;
        case 'top-emisoras-cunas': {
          const mes  = req.query.mes  || new Date().getMonth() + 1;
          const anio = req.query.anio || new Date().getFullYear();
          data = await ReporteModel.getTopEmisorasCunas(mes, anio);
          break;
        }
        case 'emisoras-region':
          data = await ReporteModel.getEmisorasRegion();
          break;
        case 'marcas-region': {
          const mes  = req.query.mes  || new Date().getMonth() + 1;
          const anio = req.query.anio || new Date().getFullYear();
          data = await ReporteModel.getMarcasRegion(mes, anio);
          break;
        }
        case 'clientes-emisora': {
          const { emisoraId } = req.query;
          data = await ReporteModel.getClientesEmisora(emisoraId || null);
          break;
        }
        case 'efectividad-vendedores': {
          const { mes, anio } = req.query;
          data = await ReporteModel.getEfectividadVendedores(mes, anio);
          break;
        }
        case 'gastos-detalle-vendedor': {
          const { mes, anio } = req.query;
          data = await ReporteModel.getGastosDetalleVendedor(mes, anio);
          break;
        }
        case 'emisoras-activas-region': {
          data = await ReporteModel.getEmisorasActivasRegion();
          break;
        }
        case 'top-emisoras-clientes': {
          const { mes, anio } = req.query;
          data = await ReporteModel.getTopEmisorasClientes(mes, anio);
          break;
        }
        default:
          return res.status(404).json({
            success: false,
            error: `Reporte no implementado o no existe: ${nombreReporte}`
          });
      }

      return res.status(200).json({
        success: true,
        data
      });

    } catch (error) {
      console.error(`[ERROR] en ReporteController.getReportData(${req.params.nombreReporte}):`, error);
      res.status(500).json({
        success: false,
        error: 'Error al generar la data del reporte.'
      });
    }
  }

}

export default ReporteController;
