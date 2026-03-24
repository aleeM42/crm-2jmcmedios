// ==============================================
// controller/categoria.controller.js — API Categorias
// ==============================================

import * as CategoriaModel from '../model/categoria.model.js';

export const getAll = async (req, res, next) => {
  try {
    const categorias = await CategoriaModel.findAllCategorias();
    return res.json({ success: true, data: categorias });
  } catch (err) {
    next(err);
  }
};
