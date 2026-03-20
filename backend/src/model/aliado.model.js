// ==============================================
// aliado.model.js — Consultas a la BD para Aliados/Emisoras
// ==============================================
import pool from '../config/db.js';

export async function getAllAliados() {
  const query = `
    SELECT 
      ac.*,
      l.nombre as ciudad_nombre,
      lp.nombre as estado_nombre,
      r.nombre as region_nombre
    FROM ALIADOS_COMERCIALES ac
    LEFT JOIN LUGAR l ON ac.fk_lugar = l.id
    LEFT JOIN LUGAR lp ON l.fk_lugar = lp.id
    LEFT JOIN LUGAR r ON ac.fk_region = r.id
    ORDER BY ac.nombre_emisora ASC
  `;
  const result = await pool.query(query);
  return result.rows;
}
