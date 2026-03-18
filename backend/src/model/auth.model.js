// ==============================================
// model/auth.model.js — Queries para autenticación (USUARIOS)
// ==============================================

import pool from '../config/db.js';

/**
 * Busca usuario por correo O nombre_usuario para login.
 * @param {string} identifier - correo electrónico o nombre de usuario
 */
export const findByIdentifier = async (identifier) => {
  const query = `
    SELECT id, primer_nombre, primer_apellido, correo, nombre_usuario,
           password_hash, rol, estado, intentos_fallidos, bloqueado_hasta
    FROM USUARIOS
    WHERE correo = $1 OR nombre_usuario = $1
  `;
  const result = await pool.query(query, [identifier]);
  return result.rows[0];
};

/**
 * Actualiza datos tras login exitoso: resetear intentos, registrar último acceso.
 */
export const updateLoginSuccess = async (id) => {
  const query = `
    UPDATE USUARIOS 
    SET intentos_fallidos = 0,
        bloqueado_hasta = NULL,
        ultimo_acceso = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
  `;
  await pool.query(query, [id]);
};

/**
 * Incrementa intentos fallidos. Bloquea 15 min si alcanza 5 intentos.
 */
export const updateLoginFailure = async (id) => {
  const query = `
    UPDATE USUARIOS
    SET intentos_fallidos = intentos_fallidos + 1,
        bloqueado_hasta = CASE 
          WHEN intentos_fallidos + 1 >= 5 
          THEN CURRENT_TIMESTAMP + INTERVAL '15 minutes'
          ELSE bloqueado_hasta 
        END,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING intentos_fallidos, bloqueado_hasta
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

/**
 * Obtiene datos públicos del usuario por ID (para GET /auth/me).
 */
export const findById = async (id) => {
  const query = `
    SELECT id, primer_nombre, primer_apellido, correo, nombre_usuario,
           rol, estado, ultimo_acceso
    FROM USUARIOS
    WHERE id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
