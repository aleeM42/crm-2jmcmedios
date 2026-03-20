// ==============================================
// pauta.controller.js — Controlador de Pautas
// ==============================================
import * as PautaModel from '../model/pauta.model.js';

export async function getAll(req, res, next) {
  try {
    const pautas = await PautaModel.getAllPautas();
    res.json({ success: true, data: pautas });
  } catch (error) {
    next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const pauta = await PautaModel.getPautaById(id);
    if (!pauta) {
      return res.status(404).json({ success: false, error: 'Pauta no encontrada' });
    }
    res.json({ success: true, data: pauta });
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const data = req.body;
    const nuevaPautaId = await PautaModel.createPauta(data);
    res.status(201).json({ success: true, message: 'Pauta creada exitosamente', data: { id: nuevaPautaId } });
  } catch (error) {
    next(error);
  }
}
