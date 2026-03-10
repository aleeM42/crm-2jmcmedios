// ==============================================
// model/vendedor.model.js — SQL puro para VENDEDOR
// ==============================================

import pool from '../config/db.js';

export const findAll = async () => {
  const query = `SELECT * FROM vendedores ORDER BY created_at DESC`;
  const result = await pool.query(query);
  return result.rows;
};

export const findById = async (id) => {
  const query = `SELECT * FROM vendedores WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const create = async (data) => {
  const { nombre, apellido, email, telefono, cargo } = data;
  const query = `
    INSERT INTO vendedores (nombre, apellido, email, telefono, cargo)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [nombre, apellido, email, telefono, cargo];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const update = async (id, data) => {
  const { nombre, apellido, email, telefono, cargo, activo } = data;
  const query = `
    UPDATE vendedores 
    SET nombre = COALESCE($1, nombre),
        apellido = COALESCE($2, apellido),
        email = COALESCE($3, email),
        telefono = COALESCE($4, telefono),
        cargo = COALESCE($5, cargo),
        activo = COALESCE($6, activo),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
    RETURNING *
  `;
  const values = [nombre, apellido, email, telefono, cargo, activo, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const remove = async (id) => {
  // Soft delete
  const query = `UPDATE vendedores SET activo = false WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
