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
