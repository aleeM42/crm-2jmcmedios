// ==============================================
// aliado.controller.js — Controlador de Aliados
// ==============================================
import * as AliadoModel from '../model/aliado.model.js';

export async function getAll(req, res, next) {
  try {
    const aliados = await AliadoModel.getAllAliados();
    res.json({ success: true, data: aliados });
  } catch (error) {
    next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const aliado = await AliadoModel.getAliadoById(id);
    if (!aliado) return res.status(404).json({ success: false, error: 'Aliado no encontrado' });
    res.json({ success: true, data: aliado });
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const nuevoAliado = await AliadoModel.createAliado(req.body);
    res.status(201).json({ success: true, data: nuevoAliado });
  } catch (error) {
    next(error);
  }
}
