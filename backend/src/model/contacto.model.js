// ==============================================
// model/contacto.model.js — SQL para CONTACTOS (alineado a init.sql)
// ==============================================

import pool from '../config/db.js';

/**
 * Contactos de un cliente, con teléfonos.
 */
export const findByClienteId = async (clienteId) => {
  const query = `
    SELECT ct.id, ct.pri_nombre, ct.seg_nombre, ct.pri_apellido,
           ct.departamento, ct.correo, ct.rol, ct.tipo,
           ct.anotac_especiales, ct.fecha_nac, ct.fk_cliente
    FROM CONTACTOS ct
    WHERE ct.fk_cliente = $1
    ORDER BY ct.id
  `;
  const result = await pool.query(query, [clienteId]);
  return result.rows;
};

/**
 * Contactos de un aliado comercial, vía tabla pivote A_CONTACT.
 */
export const findByAliadoId = async (aliadoId) => {
  const query = `
    SELECT ct.id, ct.pri_nombre, ct.seg_nombre, ct.pri_apellido,
           ct.departamento, ct.correo, ct.rol, ct.tipo,
           ct.anotac_especiales, ct.fecha_nac
    FROM CONTACTOS ct
    JOIN A_CONTACT ac_rel ON ct.id = ac_rel.fk_contacto
    WHERE ac_rel.fk_a_c = $1
    ORDER BY ct.id
  `;
  const result = await pool.query(query, [aliadoId]);
  return result.rows;
};

/**
 * Un contacto por ID.
 */
export const findById = async (id) => {
  const query = `
    SELECT id, pri_nombre, seg_nombre, pri_apellido,
           departamento, correo, rol, tipo,
           anotac_especiales, fecha_nac, fk_cliente
    FROM CONTACTOS
    WHERE id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

/**
 * Inserta un contacto. Usado dentro de una transacción.
 * @param {object} data - campos de CONTACTOS
 * @param {object} client - pg client de transacción
 */
export const create = async (data, client) => {
  const dbClient = client || pool;
  const query = `
    INSERT INTO CONTACTOS (
      pri_nombre, seg_nombre, pri_apellido,
      departamento, correo, rol, tipo,
      anotac_especiales, fecha_nac, fk_cliente
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `;
  const values = [
    data.pri_nombre,
    data.seg_nombre || null,
    data.pri_apellido,
    data.departamento,
    data.correo,
    data.rol,
    data.tipo || 'cliente',
    data.anotac_especiales || null,
    data.fecha_nac || null,
    data.fk_cliente,
  ];
  const result = await dbClient.query(query, values);
  return result.rows[0];
};
