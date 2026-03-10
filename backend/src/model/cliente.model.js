// ==============================================
// model/cliente.model.js — SQL puro para CLIENTE
// ==============================================

import pool from '../config/db.js';

export const findAll = async () => {
  // JOIN con vendedores
  const query = `
    SELECT c.*, v.nombre as vendedor_nombre, v.apellido as vendedor_apellido 
    FROM clientes c
    LEFT JOIN vendedores v ON c.vendedor_id = v.id
    ORDER BY c.created_at DESC
  `;
  const result = await pool.query(query);
  return result.rows;
};

export const findById = async (id) => {
  const query = `
    SELECT c.*, v.nombre as vendedor_nombre, v.apellido as vendedor_apellido 
    FROM clientes c
    LEFT JOIN vendedores v ON c.vendedor_id = v.id
    WHERE c.id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const create = async (data) => {
  const { razonSocial, ruc, direccion, ciudad, sector, tipoCliente, vendedorId } = data;
  const query = `
    INSERT INTO clientes (razon_social, ruc, direccion, ciudad, sector, tipo_cliente, vendedor_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [razonSocial, ruc, direccion, ciudad, sector, tipoCliente, vendedorId || null];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const update = async (id, data) => {
  // Actualización dinámica simple (asumiendo que vienen los campos)
  // En la vida real se iteran las llaves, por simplicidad actualizamos los principales.
  const { razonSocial, ruc, direccion, ciudad, sector, tipoCliente, vendedorId, activo } = data;
  const query = `
    UPDATE clientes 
    SET razon_social = COALESCE($1, razon_social),
        ruc = COALESCE($2, ruc),
        direccion = COALESCE($3, direccion),
        ciudad = COALESCE($4, ciudad),
        sector = COALESCE($5, sector),
        tipo_cliente = COALESCE($6, tipo_cliente),
        vendedor_id = COALESCE($7, vendedor_id),
        activo = COALESCE($8, activo),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $9
    RETURNING *
  `;
  const values = [razonSocial, ruc, direccion, ciudad, sector, tipoCliente, vendedorId, activo, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const remove = async (id) => {
  // Soft delete
  const query = `UPDATE clientes SET activo = false WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
