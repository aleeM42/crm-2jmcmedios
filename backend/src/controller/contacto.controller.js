// ==============================================
// controller/contacto.controller.js — Lógica de negocio CONTACTO
// ==============================================

import * as ContactoModel from '../model/contacto.model.js';

export const getAll = async (req, res) => {
  try {
    const contactos = await ContactoModel.findAll();
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contactos', detalle: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const contacto = await ContactoModel.findById(req.params.id);
    if (!contacto) return res.status(404).json({ error: 'Contacto no encontrado' });
    res.json(contacto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contacto', detalle: error.message });
  }
};

export const getByCliente = async (req, res) => {
  try {
    const contactos = await ContactoModel.findByClienteId(req.params.clienteId);
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contactos del cliente', detalle: error.message });
  }
};

export const getByAliado = async (req, res) => {
  try {
    const contactos = await ContactoModel.findByAliadoId(req.params.aliadoId);
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contactos del aliado', detalle: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { nombre, apellido, clienteId } = req.body;
    if (!nombre || !apellido || !clienteId) {
      return res.status(400).json({ error: 'nombre, apellido y clienteId son obligatorios' });
    }
    const contacto = await ContactoModel.create(req.body);
    res.status(201).json(contacto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear contacto', detalle: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const contacto = await ContactoModel.update(req.params.id, req.body);
    res.json(contacto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar contacto', detalle: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await ContactoModel.remove(req.params.id);
    res.json({ message: 'Contacto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar contacto', detalle: error.message });
  }
};
