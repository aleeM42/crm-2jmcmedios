// ==============================================
// reporte.service.js — Conexión con endpoints de Reportes
// ==============================================
import api from './api';

export const reporteService = {
  /**
   * Obtiene la data de un reporte por su nombre y query params.
   * @param {string} nombreReporte 
   * @param {object} params Filtros opcionales (mes, anio, etc.)
   */
  getReporte: async (nombreReporte, params = {}) => {
    const searchParams = new URLSearchParams(params).toString();
    const qs = searchParams ? `?${searchParams}` : '';
    const res = await api.get(`/reportes/${nombreReporte}${qs}`);
    return res.data;
  }
};

export default reporteService;
