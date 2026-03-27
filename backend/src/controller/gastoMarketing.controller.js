// ==============================================
// controller/gastoMarketing.controller.js — Lógica GASTOS_MARKETING
// ==============================================

import * as GastoMktModel from '../model/gastoMarketing.model.js';

/**
 * GET /api/gastos-marketing
 */
export const getAll = async (req, res, next) => {
  try {
    const gastos = await GastoMktModel.findAll();
    res.json({ success: true, data: gastos });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/gastos-marketing/:id
 */
export const getById = async (req, res, next) => {
  try {
    const gasto = await GastoMktModel.findById(req.params.id);
    if (!gasto) {
      return res.status(404).json({ success: false, error: 'Gasto de marketing no encontrado' });
    }
    res.json({ success: true, data: gasto });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/gastos-marketing
 */
export const create = async (req, res, next) => {
  try {
    const { fecha, concepto, monto, tipo, fk_cliente, fk_aliado_c } = req.body;

    // Validar campos obligatorios
    if (!fecha || !concepto || !monto || !tipo) {
      return res.status(400).json({
        success: false,
        error: 'fecha, concepto, monto y tipo son obligatorios',
      });
    }

    // Validar arco exclusivo: exactamente uno de fk_cliente o fk_aliado_c
    const tieneCliente = fk_cliente != null && fk_cliente !== '';
    const tieneAliado  = fk_aliado_c != null && fk_aliado_c !== '';

    if (!tieneCliente && !tieneAliado) {
      return res.status(400).json({
        success: false,
        error: 'Debe asociar el gasto a un Cliente o a un Aliado Comercial',
      });
    }
    if (tieneCliente && tieneAliado) {
      return res.status(400).json({
        success: false,
        error: 'El gasto solo puede asociarse a un Cliente O a un Aliado Comercial, no ambos',
      });
    }

    const gasto = await GastoMktModel.create({
      fecha,
      concepto,
      monto,
      tipo,
      fk_cliente: tieneCliente ? fk_cliente : null,
      fk_aliado_c: tieneAliado ? fk_aliado_c : null,
    });

    res.status(201).json({ success: true, data: gasto });
  } catch (err) {
    next(err);
  }
};
