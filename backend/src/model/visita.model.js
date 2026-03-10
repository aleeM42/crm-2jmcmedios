// ==============================================
// model/visita.model.js — SQL puro para VISITA
// ==============================================

import pool from '../config/db.js';

export const findAll = async () => {
  const query = `
    SELECT v.*, 
           c.razon_social as cliente_nombre, 
           ve.nombre as vendedor_nombre, ve.apellido as vendedor_apellido
    FROM visitas v
    JOIN clientes c ON v.cliente_id = c.id
    JOIN vendedores ve ON v.vendedor_id = ve.id
    ORDER BY v.fecha DESC
  `;
  const result = await pool.query(query);
  return result.rows;
};

export const findById = async (id) => {
  const query = `
    SELECT v.*, 
           c.razon_social as cliente_nombre, 
           ve.nombre as vendedor_nombre, ve.apellido as vendedor_apellido
    FROM visitas v
    JOIN clientes c ON v.cliente_id = c.id
    JOIN vendedores ve ON v.vendedor_id = ve.id
    WHERE v.id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const findByVendedorId = async (vendedorId) => {
  const query = `
    SELECT v.*, c.razon_social as cliente_nombre
    FROM visitas v
    JOIN clientes c ON v.cliente_id = c.id
    WHERE v.vendedor_id = $1
    ORDER BY v.fecha DESC
  `;
  const result = await pool.query(query, [vendedorId]);
  return result.rows;
};

export const findByClienteId = async (clienteId) => {
  const query = `
    SELECT v.*, ve.nombre as vendedor_nombre, ve.apellido as vendedor_apellido
    FROM visitas v
    JOIN vendedores ve ON v.vendedor_id = ve.id
    WHERE v.cliente_id = $1
    ORDER BY v.fecha DESC
  `;
  const result = await pool.query(query, [clienteId]);
  return result.rows;
};

export const create = async (data) => {
  const { clienteId, vendedorId, fecha, motivo, observaciones, estado, resultado } = data;
  const query = `
    INSERT INTO visitas (cliente_id, vendedor_id, fecha, motivo, observaciones, estado, resultado)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [clienteId, vendedorId, fecha, motivo, observaciones, estado || 'programada', resultado];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const update = async (id, data) => {
  const { clienteId, vendedorId, fecha, motivo, observaciones, estado, resultado } = data;
  const query = `
    UPDATE visitas 
    SET cliente_id = COALESCE($1, cliente_id),
        vendedor_id = COALESCE($2, vendedor_id),
        fecha = COALESCE($3, fecha),
        motivo = COALESCE($4, motivo),
        observaciones = COALESCE($5, observaciones),
        estado = COALESCE($6, estado),
        resultado = COALESCE($7, resultado),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $8
    RETURNING *
  `;
  const values = [clienteId, vendedorId, fecha, motivo, observaciones, estado, resultado, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const remove = async (id) => {
  const query = `DELETE FROM visitas WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
