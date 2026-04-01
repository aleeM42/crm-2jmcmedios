// ==============================================
// model/categoria.model.js — Categorías de Emisoras
// ==============================================

import pool from '../config/db.js';

export const findAllCategorias = async () => {
  // En el esquema actual, las categorías están definidas como un CHECK constraint
  // en la tabla ALIADOS_COMERCIALES. Podríamos obtenerlas dinámicamente:
  const query = `
    SELECT DISTINCT categoria as nombre
    FROM ALIADOS_COMERCIALES
    WHERE categoria IS NOT NULL
    ORDER BY categoria ASC
  `;
  
  const result = await pool.query(query);
  
  // Si la tabla está vacía, devolvemos las categorías por defecto del CHECK constraint
  if (result.rows.length === 0) {
    return [
      { nombre: 'deportiva' },
      { nombre: 'multitarget' },
      { nombre: 'popular' },
      { nombre: 'juvenil' },
      { nombre: 'comunitaria' },
      { nombre: 'adulto' },
      { nombre: 'adulto joven' }
    ];
  }
  
  return result.rows;
};
