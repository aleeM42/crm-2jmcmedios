// ==============================================
// controller/dashboard.controller.js — Métricas del Dashboard
// ==============================================

import * as DashboardModel from '../model/dashboard.model.js';

/**
 * GET /api/dashboard/resumen?anio=2025
 * Resumen general sin filtro por rol.
 */
export const getResumen = async (req, res, next) => {
  try {
    const anio = req.query.anio ? parseInt(req.query.anio) : undefined;
    const data = await DashboardModel.getResumen(anio);
    return res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
