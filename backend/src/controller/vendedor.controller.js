// ==============================================
// controller/vendedor.controller.js — Lógica de negocio VENDEDOR
// ==============================================

import * as VendedorModel from '../model/vendedor.model.js';

export const getAll = async (req, res) => {
  try {
    const vendedores = await VendedorModel.findAll();
    res.json(vendedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vendedores', detalle: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const vendedor = await VendedorModel.findById(req.params.id);
    if (!vendedor) return res.status(404).json({ error: 'Vendedor no encontrado' });
    res.json(vendedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vendedor', detalle: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { nombre, apellido, email } = req.body;
    if (!nombre || !apellido || !email) {
      return res.status(400).json({ error: 'nombre, apellido y email son obligatorios' });
    }
    const vendedor = await VendedorModel.create(req.body);
    res.status(201).json(vendedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear vendedor', detalle: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const vendedor = await VendedorModel.update(req.params.id, req.body);
    res.json(vendedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar vendedor', detalle: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await VendedorModel.remove(req.params.id);
    res.json({ message: 'Vendedor desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar vendedor', detalle: error.message });
  }
};
