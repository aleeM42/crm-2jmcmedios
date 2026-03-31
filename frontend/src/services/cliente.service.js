// ==============================================
// services/cliente.service.js — CRUD de clientes
// ==============================================

import api from './api.js';

/**
 * Lista de clientes con filtros opcionales.
 * @param {object} params - { sector, estado, clasificacion, search, page, limit }
 */
export const getClientes = async (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      query.append(key, val);
    }
  });
  const qs = query.toString();
  return api.get(`/clientes${qs ? `?${qs}` : ''}`);
};

/**
 * Detalle completo de un cliente.
 */
export const getClienteById = async (id) => {
  return api.get(`/clientes/${id}`);
};

/**
 * Crea un cliente (transacción: cliente + marcas + contacto + teléfonos).
 * @param {object} data - { cliente, contacto, telefonos, marcas }
 */
export const crearCliente = async (data) => {
  return api.post('/clientes', data);
};

/**
 * Lista de empresas para select de sub-empresas.
 */
export const getEmpresas = async () => {
  return api.get('/clientes/empresas');
};

/**
 * Lista de lugares (estados, ciudades).
 * @param {object} params - { tipo, padre_id }
 */
export const getLugares = async (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) query.append(key, val);
  });
  const qs = query.toString();
  return api.get(`/lugares${qs ? `?${qs}` : ''}`);
};

/**
 * Lista de vendedores para asignación.
 */
export const getVendedores = async () => {
  return api.get('/vendedores');
};

/**
 * Crea una marca para un cliente existente.
 * @param {number} clienteId - ID del cliente
 * @param {{ nombre: string, observaciones?: string }} data
 */
export const crearMarca = async (clienteId, data) => {
  return api.post(`/clientes/${clienteId}/marcas`, data);
};
