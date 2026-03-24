// ==============================================
// model/categoria.model.js — Consultas a la BD para Categoria Emisora
// ==============================================

import pool from '../config/db.js';

export const findAllCategorias = async () => {
  const query = `
    SELECT id, nombre
    FROM CATEGORIA_EMISORA
    ORDER BY nombre ASC
  `;
  const result = await pool.query(query);
  return result.rows;
};
