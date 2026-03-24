// ==============================================
// controller/oportunidad.controller.js — Lógica de negocio OPORTUNIDADES
// ==============================================

import * as OportunidadModel from '../model/oportunidad.model.js';

/**
 * GET /api/oportunidades
 */
export const getAll = async (req, res, next) => {
  try {
    const vendedorId = req.user.rol === 'Administrador' ? null : req.user.id;
    const [oportunidades, kpis] = await Promise.all([
      OportunidadModel.findAll(vendedorId),
      OportunidadModel.getKpis(vendedorId),
    ]);
    return res.json({ success: true, data: { oportunidades, kpis } });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/oportunidades/:id
 */
export const getById = async (req, res, next) => {
  try {
    const oportunidad = await OportunidadModel.findById(req.params.id);
    if (!oportunidad) {
      return res.status(404).json({ success: false, error: 'Oportunidad no encontrada' });
    }
    return res.json({ success: true, data: oportunidad });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/oportunidades
 */
export const create = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      fk_usuario: req.user.id,
    };
    const oportunidad = await OportunidadModel.create(data);
    return res.status(201).json({ success: true, data: oportunidad });
  } catch (err) {
    if (err.code && ['23505', '23503', '23502', '23514'].includes(err.code)) {
      return res.status(400).json({
        success: false,
        error: `Error de BD: ${err.detail || err.message}`,
      });
    }
    next(err);
  }
};

/**
 * PUT /api/oportunidades/:id
 */
export const update = async (req, res, next) => {
  try {
    const oportunidad = await OportunidadModel.update(req.params.id, req.body);
    if (!oportunidad) {
      return res.status(404).json({ success: false, error: 'Oportunidad no encontrada' });
    }
    return res.json({ success: true, data: oportunidad });
  } catch (err) {
    if (err.code && ['23514'].includes(err.code)) {
      return res.status(400).json({
        success: false,
        error: `Estado inválido. Valores permitidos: Contacto inicial, Por firmar, Negociado, Cancelado`,
      });
    }
    next(err);
  }
};

/**
 * DELETE /api/oportunidades/:id
 */
export const remove = async (req, res, next) => {
  try {
    const oportunidad = await OportunidadModel.remove(req.params.id);
    if (!oportunidad) {
      return res.status(404).json({ success: false, error: 'Oportunidad no encontrada' });
    }
    return res.json({ success: true, data: oportunidad });
  } catch (err) {
    next(err);
  }
};
