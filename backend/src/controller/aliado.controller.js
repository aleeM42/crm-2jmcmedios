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
