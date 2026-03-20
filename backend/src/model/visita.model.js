// ==============================================
// model/visita.model.js — SQL para VISITAS (alineado a init.sql)
// ==============================================

import pool from '../config/db.js';

/**
 * Lista de visitas con JOIN a contacto/cliente/vendedor.
 * @param {string|null} vendedorId - UUID del vendedor (RBAC filter)
 */
export const findAll = async (vendedorId = null) => {
  let where = '';
  const params = [];

  if (vendedorId) {
    where = 'WHERE v.fk_vendedor = $1';
    params.push(vendedorId);
  }

  const query = `
    SELECT v.*,
           ct.pri_nombre AS contacto_nombre,
           ct.pri_apellido AS contacto_apellido,
           c.nombre AS cliente_nombre,
           u.primer_nombre AS vendedor_nombre,
           u.primer_apellido AS vendedor_apellido
    FROM VISITAS v
    LEFT JOIN CONTACTOS ct ON v.fk_contacto = ct.id
    LEFT JOIN CLIENTE c ON ct.fk_cliente = c.id
    LEFT JOIN USUARIOS u ON v.fk_vendedor = u.id
    ${where}
    ORDER BY v.fecha DESC, v.hora DESC
  `;
  const result = await pool.query(query, params);
  return result.rows;
};

/**
 * Detalle de una visita por ID.
 * @param {number} id
 * @param {string|null} vendedorId - UUID del vendedor (RBAC filter)
 */
export const findById = async (id, vendedorId = null) => {
  let where = 'WHERE v.id = $1';
  const params = [id];

  if (vendedorId) {
    where += ' AND v.fk_vendedor = $2';
    params.push(vendedorId);
  }

  const query = `
    SELECT v.*,
           ct.pri_nombre AS contacto_nombre,
           ct.pri_apellido AS contacto_apellido,
           c.nombre AS cliente_nombre,
           u.primer_nombre AS vendedor_nombre,
           u.primer_apellido AS vendedor_apellido
    FROM VISITAS v
    LEFT JOIN CONTACTOS ct ON v.fk_contacto = ct.id
    LEFT JOIN CLIENTE c ON ct.fk_cliente = c.id
    LEFT JOIN USUARIOS u ON v.fk_vendedor = u.id
    ${where}
  `;
  const result = await pool.query(query, params);
  return result.rows[0];
};

/**
 * Visitas de un vendedor específico.
 */
export const findByVendedorId = async (vendedorId) => {
  const query = `
    SELECT v.*,
           ct.pri_nombre AS contacto_nombre,
           ct.pri_apellido AS contacto_apellido,
           c.nombre AS cliente_nombre
    FROM VISITAS v
    LEFT JOIN CONTACTOS ct ON v.fk_contacto = ct.id
    LEFT JOIN CLIENTE c ON ct.fk_cliente = c.id
    WHERE v.fk_vendedor = $1
    ORDER BY v.fecha DESC, v.hora DESC
  `;
  const result = await pool.query(query, [vendedorId]);
  return result.rows;
};

/**
 * Crea una visita.
 */
export const create = async (data) => {
  const { fecha, hora, objetivo_visita, efectiva, tipo, detalle, lugar, fk_contacto, fk_vendedor } = data;
  const query = `
    INSERT INTO VISITAS (fecha, hora, objetivo_visita, efectiva, tipo, detalle, lugar, fk_contacto, fk_vendedor)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;
  const values = [fecha, hora, objetivo_visita, efectiva, tipo, detalle || null, lugar, fk_contacto, fk_vendedor];
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Actualiza una visita por ID.
 * @param {number} id
 * @param {object} data
 * @param {string|null} vendedorId - RBAC: si no es null, solo puede editar sus propias visitas
 */
export const update = async (id, data, vendedorId = null) => {
  const { fecha, hora, objetivo_visita, efectiva, tipo, detalle, lugar, fk_contacto } = data;

  let where = 'WHERE id = $9';
  const values = [fecha, hora, objetivo_visita, efectiva, tipo, detalle, lugar, fk_contacto, id];

  if (vendedorId) {
    where += ` AND fk_vendedor = $${values.length + 1}`;
    values.push(vendedorId);
  }

  const query = `
    UPDATE VISITAS
    SET fecha = COALESCE($1, fecha),
        hora = COALESCE($2, hora),
        objetivo_visita = COALESCE($3, objetivo_visita),
        efectiva = COALESCE($4, efectiva),
        tipo = COALESCE($5, tipo),
        detalle = COALESCE($6, detalle),
        lugar = COALESCE($7, lugar),
        fk_contacto = COALESCE($8, fk_contacto)
    ${where}
    RETURNING *
  `;
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Elimina una visita por ID.
 * @param {number} id
 * @param {string|null} vendedorId - RBAC: si no es null, solo puede borrar sus propias visitas
 */
export const remove = async (id, vendedorId = null) => {
  let where = 'WHERE id = $1';
  const params = [id];

  if (vendedorId) {
    where += ' AND fk_vendedor = $2';
    params.push(vendedorId);
  }

  const query = `DELETE FROM VISITAS ${where} RETURNING *`;
  const result = await pool.query(query, params);
  return result.rows[0];
};
