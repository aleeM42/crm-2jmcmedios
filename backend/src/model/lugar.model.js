// ==============================================
// model/lugar.model.js — Queries READ-ONLY para LUGAR
// ==============================================

import pool from '../config/db.js';

/**
 * Retorna todos los lugares ordenados jerárquicamente.
 * Incluye el nombre del lugar padre si existe.
 */
export const findAll = async () => {
  const query = `
    SELECT l.id, l.nombre, l.tipo, l.descripcion, l.fk_lugar,
           p.nombre AS nombre_padre
    FROM LUGAR l
    LEFT JOIN LUGAR p ON l.fk_lugar = p.id
    ORDER BY l.tipo, l.nombre
  `;
  const result = await pool.query(query);
  return result.rows;
};

/**
 * Retorna un lugar por ID.
 */
export const findById = async (id) => {
  const query = `
    SELECT l.id, l.nombre, l.tipo, l.descripcion, l.fk_lugar,
           p.nombre AS nombre_padre
    FROM LUGAR l
    LEFT JOIN LUGAR p ON l.fk_lugar = p.id
    WHERE l.id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

/**
 * Retorna lugares filtrados por tipo (pais, estado, ciudad).
 */
export const findByTipo = async (tipo) => {
  const query = `
    SELECT id, nombre, tipo, fk_lugar
    FROM LUGAR
    WHERE tipo = $1
    ORDER BY nombre
  `;
  const result = await pool.query(query, [tipo]);
  return result.rows;
};

/**
 * Retorna hijos de un lugar (ej: ciudades de un estado).
 */
export const findByPadre = async (padreId) => {
  const query = `
    SELECT id, nombre, tipo, descripcion
    FROM LUGAR
    WHERE fk_lugar = $1
    ORDER BY nombre
  `;
  const result = await pool.query(query, [padreId]);
  return result.rows;
};
