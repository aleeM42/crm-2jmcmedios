// ==============================================
// controller/cliente.controller.js — Lógica de negocio CLIENTE
// ==============================================

import * as ClienteModel from '../model/cliente.model.js';

export const getAll = async (req, res) => {
  try {
    const clientes = await ClienteModel.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes', detalle: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const cliente = await ClienteModel.findById(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cliente', detalle: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { razonSocial } = req.body;
    if (!razonSocial) return res.status(400).json({ error: 'razonSocial es obligatorio' });

    const cliente = await ClienteModel.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente', detalle: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const cliente = await ClienteModel.update(req.params.id, req.body);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente', detalle: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await ClienteModel.remove(req.params.id);
    res.json({ message: 'Cliente desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente', detalle: error.message });
  }
};
