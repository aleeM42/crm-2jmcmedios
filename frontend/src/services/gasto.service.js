// ==============================================
// services/gasto.service.js — CRUD gastos de marketing
// ==============================================

import api from './api.js';

/**
 * Crea un gasto de marketing.
 * @param {object} data - { fecha, concepto, monto, tipo, fk_cliente, fk_aliado_c }
 */
export const crearGastoMarketing = async (data) => {
  return api.post('/gastos-marketing', data);
};

/**
 * Lista clientes para el select.
 */
export const getClientes = async () => {
  return api.get('/clientes');
};

/**
 * Lista aliados comerciales para el select.
 */
export const getAliados = async () => {
  return api.get('/aliados');
};

/**
 * Modifica un gasto de marketing.
 */
export const modificarGastoMarketing = async (id, data) => {
  return api.put(`/gastos-marketing/${id}`, data);
};

/**
 * Elimina un gasto de marketing.
 */
export const eliminarGastoMarketing = async (id) => {
  return api.delete(`/gastos-marketing/${id}`);
};
