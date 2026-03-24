// ==============================================
// model/oportunidad.model.js — SQL para OPORTUNIDADES
// ==============================================

import pool from '../config/db.js';

/**
 * Lista todas las oportunidades con datos del vendedor.
 * Filtra por vendedor si se pasa vendedorId (RBAC).
 */
export const findAll = async (vendedorId = null) => {
  let where = '';
  const params = [];
  if (vendedorId) {
    where = 'WHERE o.fk_usuario = $1';
    params.push(vendedorId);
  }

  const query = `
    SELECT o.*,
           u.primer_nombre AS vendedor_nombre,
           u.primer_apellido AS vendedor_apellido
    FROM OPORTUNIDADES o
    JOIN VENDEDORES v ON o.fk_usuario = v.usuario_id
    JOIN USUARIOS u ON v.usuario_id = u.id
    ${where}
    ORDER BY o.fecha_creacion DESC
  `;
  const result = await pool.query(query, params);
  return result.rows;
};

/**
 * Busca una oportunidad por ID.
 */
export const findById = async (id) => {
  const query = `
    SELECT o.*,
           u.primer_nombre AS vendedor_nombre,
           u.primer_apellido AS vendedor_apellido
    FROM OPORTUNIDADES o
    JOIN VENDEDORES v ON o.fk_usuario = v.usuario_id
    JOIN USUARIOS u ON v.usuario_id = u.id
    WHERE o.id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

/**
 * Crea una nueva oportunidad.
 */
export const create = async (data) => {
  const query = `
    INSERT INTO OPORTUNIDADES (nombre_cliente, nombre_contacto, descripcion, monto_estimado, estado, fk_usuario)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [
    data.nombre_cliente,
    data.nombre_contacto,
    data.descripcion || null,
    data.monto_estimado || 0,
    data.estado || 'Contacto inicial',
    data.fk_usuario,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Actualiza una oportunidad (estado, monto, etc.).
 */
export const update = async (id, data) => {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.nombre_cliente !== undefined) { fields.push(`nombre_cliente = $${idx++}`); values.push(data.nombre_cliente); }
  if (data.nombre_contacto !== undefined) { fields.push(`nombre_contacto = $${idx++}`); values.push(data.nombre_contacto); }
  if (data.descripcion !== undefined) { fields.push(`descripcion = $${idx++}`); values.push(data.descripcion); }
  if (data.monto_estimado !== undefined) { fields.push(`monto_estimado = $${idx++}`); values.push(data.monto_estimado); }
  if (data.estado !== undefined) { fields.push(`estado = $${idx++}`); values.push(data.estado); }

  if (fields.length === 0) return findById(id);

  fields.push(`fecha_actualizacion = CURRENT_TIMESTAMP`);
  values.push(id);

  const query = `UPDATE OPORTUNIDADES SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Elimina una oportunidad.
 */
export const remove = async (id) => {
  const result = await pool.query('DELETE FROM OPORTUNIDADES WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

/**
 * KPIs para el pipeline.
 */
export const getKpis = async (vendedorId = null) => {
  let where = '';
  const params = [];
  if (vendedorId) {
    where = 'WHERE fk_usuario = $1';
    params.push(vendedorId);
  }
  const query = `
    SELECT
      COUNT(*) AS total_leads,
      COALESCE(SUM(monto_estimado), 0) AS valor_total,
      COUNT(*) FILTER (WHERE estado = 'Negociado') AS negociados,
      COUNT(*) FILTER (WHERE estado != 'Cancelado') AS activos
    FROM OPORTUNIDADES
    ${where}
  `;
  const result = await pool.query(query, params);
  return result.rows[0];
};
