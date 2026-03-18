// ==============================================
// controller/lugar.controller.js — Queries de LUGAR
// ==============================================

import * as LugarModel from '../model/lugar.model.js';

/**
 * GET /api/lugares
 * Retorna todos los lugares. Si se pasa ?tipo=estado, filtra.
 */
export const getAll = async (req, res, next) => {
  try {
    const { tipo, padre_id } = req.query;
    let lugares;

    if (padre_id) {
      lugares = await LugarModel.findByPadre(padre_id);
    } else if (tipo) {
      lugares = await LugarModel.findByTipo(tipo);
    } else {
      lugares = await LugarModel.findAll();
    }

    return res.json({ success: true, data: lugares });
  } catch (err) {
    next(err);
  }
};
