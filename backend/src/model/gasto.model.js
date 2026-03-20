// ==============================================
// model/gasto.model.js — SQL para GASTOS_VISITAS (alineado a init.sql)
// ==============================================

import pool from '../config/db.js';

/**
 * Lista gastos de visitas con JOIN a visita/vendedor.
 * RBAC: si vendedorId no es null, filtra gastos cuya visita pertenezca al vendedor.
 * @param {string|null} vendedorId
 */
export const findAll = async (vendedorId = null) => {
  let where = '';
  const params = [];

  if (vendedorId) {
    where = 'WHERE vi.fk_vendedor = $1';
    params.push(vendedorId);
  }

  const query = `
    SELECT g.*,
           vi.fecha AS visita_fecha,
           vi.objetivo_visita,
           vi.lugar AS visita_lugar,
           u.primer_nombre AS vendedor_nombre,
           u.primer_apellido AS vendedor_apellido
    FROM GASTOS_VISITAS g
    JOIN VISITAS vi ON g.fk_visita = vi.id
    LEFT JOIN USUARIOS u ON vi.fk_vendedor = u.id
    ${where}
    ORDER BY g.fecha DESC
  `;
  const result = await pool.query(query, params);
  return result.rows;
};

/**
 * Detalle de un gasto por ID.
 * @param {number} id
 * @param {string|null} vendedorId - RBAC filter
 */
export const findById = async (id, vendedorId = null) => {
  let where = 'WHERE g.id = $1';
  const params = [id];

  if (vendedorId) {
    where += ' AND vi.fk_vendedor = $2';
    params.push(vendedorId);
  }

  const query = `
    SELECT g.*,
           vi.fecha AS visita_fecha,
           vi.objetivo_visita,
           vi.lugar AS visita_lugar,
           u.primer_nombre AS vendedor_nombre,
           u.primer_apellido AS vendedor_apellido
    FROM GASTOS_VISITAS g
    JOIN VISITAS vi ON g.fk_visita = vi.id
    LEFT JOIN USUARIOS u ON vi.fk_vendedor = u.id
    ${where}
  `;
  const result = await pool.query(query, params);
  return result.rows[0];
};

/**
 * Crea un gasto de visita.
 */
export const create = async (data) => {
  const { fecha, concepto, monto, categoria, fk_visita } = data;
  const query = `
    INSERT INTO GASTOS_VISITAS (fecha, concepto, monto, categoria, fk_visita)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [fecha, concepto, monto, categoria, fk_visita];
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Actualiza un gasto por ID.
 * RBAC: vendedorId filtra a través de la visita asociada.
 */
export const update = async (id, data, vendedorId = null) => {
  const { fecha, concepto, monto, categoria } = data;

  // Primero verificar ownership si es vendedor
  if (vendedorId) {
    const check = await findById(id, vendedorId);
    if (!check) return null;
  }

  const query = `
    UPDATE GASTOS_VISITAS
    SET fecha = COALESCE($1, fecha),
        concepto = COALESCE($2, concepto),
        monto = COALESCE($3, monto),
        categoria = COALESCE($4, categoria)
    WHERE id = $5
    RETURNING *
  `;
  const values = [fecha, concepto, monto, categoria, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Elimina un gasto por ID.
 * RBAC: vendedorId filtra a través de la visita asociada.
 */
export const remove = async (id, vendedorId = null) => {
  if (vendedorId) {
    const check = await findById(id, vendedorId);
    if (!check) return null;
  }

  const query = `DELETE FROM GASTOS_VISITAS WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
