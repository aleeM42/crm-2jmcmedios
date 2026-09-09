// ==============================================
// controller/cobertura.controller.js — API Coberturas
// ==============================================

import * as CoberturaModel from '../model/cobertura.model.js';

export const getAll = async (req, res, next) => {
  try {
    const coberturas = await CoberturaModel.findAllCoberturas();
    return res.json({ success: true, data: coberturas });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const { descripcion, fk_lugar } = req.body;
    if (!descripcion?.trim()) {
      return res.status(400).json({ success: false, error: 'La descripción de la cobertura es obligatoria.' });
    }
    if (!fk_lugar) {
      return res.status(400).json({ success: false, error: 'Campo obligatorio faltante: fk_lugar' });
    }
    const nueva = await CoberturaModel.createCobertura(descripcion, parseInt(fk_lugar, 10));
    return res.status(201).json({ success: true, data: nueva });
  } catch (err) {
    next(err);
  }
};
