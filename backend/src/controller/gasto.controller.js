// ==============================================
// controller/gasto.controller.js — Lógica de negocio GASTOS_VISITAS (con RBAC)
// ==============================================

import * as GastoModel from '../model/gasto.model.js';

/**
 * GET /api/gastos
 * RBAC: vendedor solo ve gastos de sus visitas.
 */
export const getAll = async (req, res, next) => {
  try {
    const vendedorId = req.user.rol === 'Vendedor' ? req.user.id : null;
    const gastos = await GastoModel.findAll(vendedorId);
    res.json({ success: true, data: gastos });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/gastos/:id
 */
export const getById = async (req, res, next) => {
  try {
    const vendedorId = req.user.rol === 'Vendedor' ? req.user.id : null;
    const gasto = await GastoModel.findById(req.params.id, vendedorId);
    if (!gasto) {
      return res.status(404).json({ success: false, error: 'Gasto no encontrado' });
    }
    res.json({ success: true, data: gasto });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/gastos
 */
export const create = async (req, res, next) => {
  try {
    const { fecha, concepto, monto, categoria, fk_visita } = req.body;
    const errores = [];
    if (!fecha)      errores.push('La fecha del gasto es obligatoria.');
    if (!concepto)   errores.push('El concepto del gasto es obligatorio.');
    if (!monto)      errores.push('El monto del gasto es obligatorio.');
    if (!categoria)  errores.push('La categoría del gasto es obligatoria.');
    if (!fk_visita)  errores.push('Debe asociar el gasto a una visita.');

    const montoNum = parseFloat(monto);
    if (errores.length === 0 && (isNaN(montoNum) || montoNum <= 0)) {
      errores.push('El monto del gasto debe ser un número positivo mayor a cero.');
    }

    if (errores.length > 0) {
      return res.status(400).json({ success: false, error: errores[0], errors: errores });
    }

    const gasto = await GastoModel.create(req.body);
    res.status(201).json({ success: true, data: gasto });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/gastos/:id
 */
export const update = async (req, res, next) => {
  try {
    const vendedorId = req.user.rol === 'Vendedor' ? req.user.id : null;
    const gasto = await GastoModel.update(req.params.id, req.body, vendedorId);
    if (!gasto) {
      return res.status(404).json({ success: false, error: 'Gasto no encontrado o sin permiso' });
    }
    res.json({ success: true, data: gasto });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/gastos/:id
 */
export const remove = async (req, res, next) => {
  try {
    const vendedorId = req.user.rol === 'Vendedor' ? req.user.id : null;
    const gasto = await GastoModel.remove(req.params.id, vendedorId);
    if (!gasto) {
      return res.status(404).json({ success: false, error: 'Gasto no encontrado o sin permiso' });
    }
    res.json({ success: true, data: { message: 'Gasto eliminado correctamente' } });
  } catch (err) {
    next(err);
  }
};
