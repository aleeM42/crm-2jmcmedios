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

export const createCobertura = async (descripcion, fkLugar) => {
  const query = `
    INSERT INTO COBERTURA (descripcion, fk_lugar)
    VALUES ($1, $2)
    RETURNING *
  `;
  const result = await pool.query(query, [descripcion.trim(), fkLugar]);
  return result.rows[0];
};
