// ==============================================
// services/visita.service.js — CRUD de visitas + lookups
// ==============================================

import api from './api.js';

/** Crea una visita. */
export const crearVisita = async (data) => api.post('/visitas', data);

/** Crea un gasto de visita (GASTOS_VISITAS). */
export const crearGastoVisita = async (data) => api.post('/gastos', data);

/** Lista clientes para select. */
export const getClientes = async () => api.get('/clientes');

/** Lista aliados comerciales para select. */
export const getAliados = async () => api.get('/aliados');

/** Lista vendedores para select (Admin/Director). */
export const getVendedores = async () => api.get('/vendedores');

/** Contactos de un cliente. */
export const getContactosByCliente = async (clienteId) => api.get(`/contactos/cliente/${clienteId}`);

/** Contactos de un aliado (vía A_CONTACT). */
export const getContactosByAliado = async (aliadoId) => api.get(`/contactos/aliado/${aliadoId}`);

/** Modifica una visita existente. */
export const modificarVisita = async (id, data) => api.put(`/visitas/${id}`, data);

/** Elimina una visita existente. */
export const eliminarVisita = async (id) => api.delete(`/visitas/${id}`);
