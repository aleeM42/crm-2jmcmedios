// ==============================================
// controller/visita.controller.js — Lógica de negocio VISITA
// ==============================================

import * as VisitaModel from '../model/visita.model.js';

export const getAll = async (req, res) => {
  try {
    const visitas = await VisitaModel.findAll();
    res.json(visitas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener visitas', detalle: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const visita = await VisitaModel.findById(req.params.id);
    if (!visita) return res.status(404).json({ error: 'Visita no encontrada' });
    res.json(visita);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener visita', detalle: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { fecha, motivo, clienteId, vendedorId } = req.body;
    if (!fecha || !motivo || !clienteId || !vendedorId) {
      return res.status(400).json({ error: 'fecha, motivo, clienteId y vendedorId son obligatorios' });
    }
    const data = { ...req.body, fecha: new Date(fecha) };
    const visita = await VisitaModel.create(data);
    res.status(201).json(visita);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear visita', detalle: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.fecha) data.fecha = new Date(data.fecha);
    const visita = await VisitaModel.update(req.params.id, data);
    res.json(visita);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar visita', detalle: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await VisitaModel.remove(req.params.id);
    res.json({ message: 'Visita eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar visita', detalle: error.message });
  }
};
