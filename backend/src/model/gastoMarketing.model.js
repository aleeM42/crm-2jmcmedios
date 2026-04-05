// ==============================================
// model/gastoMarketing.model.js — SQL para GASTOS_MARKETING (alineado a init.sql)
// ==============================================

import pool from '../config/db.js';

/**
 * Lista gastos de marketing con JOINs a cliente y aliado comercial.
 */
export const findAll = async () => {
  const query = `
    SELECT gm.*,
           c.nombre  AS cliente_nombre,
           ac.nombre_emisora AS aliado_nombre
    FROM GASTOS_MARKETING gm
    LEFT JOIN CLIENTE c             ON gm.fk_cliente  = c.id
    LEFT JOIN ALIADOS_COMERCIALES ac ON gm.fk_aliado_c = ac.id
    ORDER BY gm.fecha DESC
  `;
  const result = await pool.query(query);
  return result.rows;
};

/**
 * Detalle de un gasto de marketing por ID.
 */
export const findById = async (id) => {
  const query = `
    SELECT gm.*,
           c.nombre  AS cliente_nombre,
           ac.nombre_emisora AS aliado_nombre
    FROM GASTOS_MARKETING gm
    LEFT JOIN CLIENTE c             ON gm.fk_cliente  = c.id
    LEFT JOIN ALIADOS_COMERCIALES ac ON gm.fk_aliado_c = ac.id
    WHERE gm.id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

/**
 * Crea un gasto de marketing.
 * Arco exclusivo: fk_cliente XOR fk_aliado_c.
 */
export const create = async (data) => {
  const { fecha, concepto, monto, tipo, fk_cliente, fk_aliado_c } = data;
  const query = `
    INSERT INTO GASTOS_MARKETING (fecha, concepto, monto, tipo, fk_cliente, fk_aliado_c)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [fecha, concepto, monto, tipo, fk_cliente || null, fk_aliado_c || null];
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Actualiza un gasto de marketing.
 * Arco exclusivo: fk_cliente XOR fk_aliado_c.
 */
export const update = async (id, data) => {
  const { fecha, concepto, monto, tipo, fk_cliente, fk_aliado_c } = data;
  const query = `
    UPDATE GASTOS_MARKETING 
    SET fecha = COALESCE($1, fecha),
        concepto = COALESCE($2, concepto),
        monto = COALESCE($3, monto),
        tipo = COALESCE($4, tipo),
        fk_cliente = $5,
        fk_aliado_c = $6
    WHERE id = $7
    RETURNING *
  `;
  const values = [fecha, concepto, monto, tipo, fk_cliente || null, fk_aliado_c || null, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Elimina un gasto de marketing.
 */
export const remove = async (id) => {
  const query = `
    DELETE FROM GASTOS_MARKETING
    WHERE id = $1
    RETURNING *
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
