// ==============================================
// model/contacto.model.js — SQL puro para CONTACTO
// ==============================================

import pool from '../config/db.js';

export const findAll = async () => {
  const query = `SELECT * FROM contactos ORDER BY created_at DESC`;
  const result = await pool.query(query);
  return result.rows;
};

export const findById = async (id) => {
  const query = `SELECT * FROM contactos WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const findByClienteId = async (clienteId) => {
  const query = `SELECT * FROM contactos WHERE cliente_id = $1 ORDER BY es_principal DESC`;
  const result = await pool.query(query, [clienteId]);
  return result.rows;
};

export const create = async (data) => {
  const { clienteId, nombre, apellido, email, telefono, cargo, esPrincipal } = data;
  const query = `
    INSERT INTO contactos (cliente_id, nombre, apellido, email, telefono, cargo, es_principal)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [clienteId, nombre, apellido, email, telefono, cargo, esPrincipal || false];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const update = async (id, data) => {
  const { nombre, apellido, email, telefono, cargo, esPrincipal } = data;
  const query = `
    UPDATE contactos 
    SET nombre = COALESCE($1, nombre),
        apellido = COALESCE($2, apellido),
        email = COALESCE($3, email),
        telefono = COALESCE($4, telefono),
        cargo = COALESCE($5, cargo),
        es_principal = COALESCE($6, es_principal),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
    RETURNING *
  `;
  const values = [nombre, apellido, email, telefono, cargo, esPrincipal, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const remove = async (id) => {
  // Hard delete para contactos
  const query = `DELETE FROM contactos WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
