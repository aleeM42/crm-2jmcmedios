// ==============================================
// controller/visita.controller.js — Lógica de negocio VISITA (con RBAC)
// ==============================================

import * as VisitaModel from '../model/visita.model.js';

/**
 * GET /api/visitas
 * RBAC: vendedor solo ve sus visitas.
 */
export const getAll = async (req, res, next) => {
  try {
    const vendedorId = req.user.rol === 'Vendedor' ? req.user.id : null;
    const visitas = await VisitaModel.findAll(vendedorId);
    res.json({ success: true, data: visitas });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/visitas/:id
 * RBAC: vendedor solo puede ver sus visitas.
 */
export const getById = async (req, res, next) => {
  try {
    const vendedorId = req.user.rol === 'Vendedor' ? req.user.id : null;
    const visita = await VisitaModel.findById(req.params.id, vendedorId);
    if (!visita) {
      return res.status(404).json({ success: false, error: 'Visita no encontrada' });
    }
    res.json({ success: true, data: visita });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/visitas
 */
export const create = async (req, res, next) => {
  try {
    const { fecha, hora, objetivo_visita, efectiva, tipo, lugar, fk_contacto, fk_vendedor } = req.body;

    if (!fecha || !objetivo_visita || !fk_contacto || !fk_vendedor) {
      return res.status(400).json({
        success: false,
        error: 'fecha, objetivo_visita, fk_contacto y fk_vendedor son obligatorios',
      });
    }

    const visita = await VisitaModel.create(req.body);
    res.status(201).json({ success: true, data: visita });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/visitas/:id
 * RBAC: vendedor solo puede editar sus visitas.
 */
export const update = async (req, res, next) => {
  try {
    const vendedorId = req.user.rol === 'Vendedor' ? req.user.id : null;
    const visita = await VisitaModel.update(req.params.id, req.body, vendedorId);
    if (!visita) {
      return res.status(404).json({ success: false, error: 'Visita no encontrada o sin permiso' });
    }
    res.json({ success: true, data: visita });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/visitas/:id
 * RBAC: vendedor solo puede eliminar sus visitas.
 */
export const remove = async (req, res, next) => {
  try {
    const vendedorId = req.user.rol === 'Vendedor' ? req.user.id : null;
    const visita = await VisitaModel.remove(req.params.id, vendedorId);
    if (!visita) {
      return res.status(404).json({ success: false, error: 'Visita no encontrada o sin permiso' });
    }
    res.json({ success: true, data: { message: 'Visita eliminada correctamente' } });
  } catch (err) {
    next(err);
  }
};
