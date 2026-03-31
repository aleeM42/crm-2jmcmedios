// ==============================================
// model/marca.model.js — Queries para MARCA_INTER
// ==============================================

import pool from '../config/db.js';

/**
 * Inserta múltiples marcas para un cliente dentro de una transacción.
 * @param {number} clienteId - ID del cliente
 * @param {Array<{nombre: string, observaciones?: string}>} marcas
 * @param {object} client - pg client de transacción (pool.connect())
 */
export const createBatch = async (clienteId, marcas, client) => {
  const dbClient = client || pool;
  const results = [];

  for (const marca of marcas) {
    const query = `
      INSERT INTO MARCA_INTER (nombre, observaciones, fk_cliente)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [marca.nombre, marca.observaciones || null, clienteId];
    const result = await dbClient.query(query, values);
    results.push(result.rows[0]);
  }

  return results;
};

/**
 * Obtiene todas las marcas de un cliente.
 */
export const findByClienteId = async (clienteId) => {
  const query = `
    SELECT id, nombre, observaciones, fk_cliente
    FROM MARCA_INTER
    WHERE fk_cliente = $1
    ORDER BY nombre
  `;
  const result = await pool.query(query, [clienteId]);
  return result.rows;
};

/**
 * Inserta una marca individual para un cliente.
 * @param {number} clienteId - ID del cliente
 * @param {{ nombre: string, observaciones?: string }} marca
 */
export const createOne = async (clienteId, marca) => {
  const query = `
    INSERT INTO MARCA_INTER (nombre, observaciones, fk_cliente)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [marca.nombre, marca.observaciones || null, clienteId];
  const result = await pool.query(query, values);
  return result.rows[0];
};
