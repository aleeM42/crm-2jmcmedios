// ==============================================
// model/cobertura.model.js — Consultas a la BD para Coberturas
// ==============================================

import pool from '../config/db.js';

export const findAllCoberturas = async () => {
  const query = `
    SELECT *
    FROM COBERTURA
    ORDER BY descripcion ASC
  `;
  const result = await pool.query(query);
  return result.rows;
};
