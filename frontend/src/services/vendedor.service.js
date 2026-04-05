// ==============================================
// services/vendedor.service.js — CRUD de vendedores
// ==============================================

import api from './api.js';

/**
 * Lista de vendedores con KPIs.
 */
export const getVendedores = async () => {
  return api.get('/vendedores');
};

/**
 * Detalle completo de un vendedor.
 */
export const getVendedorById = async (id) => {
  return api.get(`/vendedores/${id}`);
};

/**
 * Crea un vendedor (transacción: usuario + vendedor + teléfonos).
 * @param {object} data - { usuario, vendedor, telefonos }
 */
export const crearVendedor = async (data) => {
  return api.post('/vendedores', data);
};

/**
 * Lista de directores para select de "jefe vendedor".
 */
export const getDirectores = async () => {
  return api.get('/vendedores/directores');
};

/**
 * Actualiza un vendedor (usuario, vendedor, telefonos).
 * @param {string} id - UUID del usuario_id
 * @param {object} data - { usuario, vendedor, telefonos }
 */
export const actualizarVendedor = async (id, data) => {
  return api.put(`/vendedores/${id}`, data);
};

/**
 * Elimina un vendedor.
 */
export const eliminarVendedor = async (id) => {
  return api.delete(`/vendedores/${id}`);
};
