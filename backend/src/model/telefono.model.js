// ==============================================
// model/telefono.model.js — Queries para TELEFONOS
// ==============================================

import pool from '../config/db.js';

/**
 * Inserta múltiples teléfonos para un contacto dentro de una transacción.
 * @param {number} contactoId - ID del contacto
 * @param {string} usuarioId - UUID del usuario que registra
 * @param {Array<{codigo_area: string, numero: string}>} telefonos
 * @param {object} client - pg client de transacción
 */
export const createBatch = async (contactoId, usuarioId, telefonos, client) => {
  const dbClient = client || pool;
  const results = [];

  for (const tel of telefonos) {
    const query = `
      INSERT INTO TELEFONOS (codigo_area, numero, fk_usuario, fk_contacto)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [tel.codigo_area, tel.numero, usuarioId, contactoId];
    await dbClient.query(query, values);
    results.push({ codigo_area: tel.codigo_area, numero: tel.numero });
  }

  return results;
};

/**
 * Obtiene todos los teléfonos de un contacto.
 */
export const findByContactoId = async (contactoId) => {
  const query = `
    SELECT codigo_area, numero, fk_contacto
    FROM TELEFONOS
    WHERE fk_contacto = $1
  `;
  const result = await pool.query(query, [contactoId]);
  return result.rows;
};
