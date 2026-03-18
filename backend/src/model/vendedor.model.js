// ==============================================
// model/vendedor.model.js — SQL real para USUARIOS + VENDEDORES
// ==============================================

import pool from '../config/db.js';

/**
 * Lista de vendedores con datos básicos (JOIN USUARIOS + VENDEDORES).
 * Datos públicos visibles para todos los roles.
 */
export const findAll = async () => {
  const query = `
    SELECT u.id, u.primer_nombre, u.primer_apellido, u.correo,
           u.estado, u.created_at,
           v.meta, v.tipo, v.fk_vendedor_jefe,
           j.primer_nombre AS jefe_nombre,
           j.primer_apellido AS jefe_apellido
    FROM VENDEDORES v
    INNER JOIN USUARIOS u ON v.usuario_id = u.id
    LEFT JOIN USUARIOS j ON v.fk_vendedor_jefe = j.id
    ORDER BY u.primer_nombre, u.primer_apellido
  `;
  const result = await pool.query(query);
  return result.rows;
};

/**
 * Detalle completo de un vendedor por usuario_id.
 * Incluye datos de usuario, vendedor, teléfonos, y clientes asignados.
 */
export const findById = async (id) => {
  // Vendedor + Usuario
  const vendedorQuery = `
    SELECT u.id, u.primer_nombre, u.primer_apellido, u.correo,
           u.nombre_usuario, u.rol, u.estado, u.ultimo_acceso, u.created_at,
           v.meta, v.tipo, v.fk_vendedor_jefe,
           j.primer_nombre AS jefe_nombre,
           j.primer_apellido AS jefe_apellido
    FROM VENDEDORES v
    INNER JOIN USUARIOS u ON v.usuario_id = u.id
    LEFT JOIN USUARIOS j ON v.fk_vendedor_jefe = j.id
    WHERE v.usuario_id = $1
  `;
  const vendedorResult = await pool.query(vendedorQuery, [id]);
  if (vendedorResult.rows.length === 0) return null;

  const vendedor = vendedorResult.rows[0];

  // Teléfonos (vinculados vía fk_usuario en TELEFONOS)
  const telefonosQuery = `
    SELECT codigo_area, numero
    FROM TELEFONOS
    WHERE fk_usuario = $1
  `;
  const telefonosResult = await pool.query(telefonosQuery, [id]);

  // Clientes asignados
  const clientesQuery = `
    SELECT c.id, c.nombre, c.razon_social, c.sector, c.estado, c.clasificacion
    FROM CLIENTE c
    WHERE c.fk_vendedor = $1
    ORDER BY c.nombre
  `;
  const clientesResult = await pool.query(clientesQuery, [id]);

  return {
    ...vendedor,
    telefonos: telefonosResult.rows,
    clientes_asignados: clientesResult.rows,
  };
};

/**
 * Crea vendedor: INSERT USUARIOS + INSERT VENDEDORES (transacción).
 * @param {object} userData - { primer_nombre, primer_apellido, correo, nombre_usuario, password_hash, rol, estado }
 * @param {object} vendedorData - { meta, tipo, fk_vendedor_jefe? }
 * @param {object} client - pg client de transacción
 */
export const create = async (userData, vendedorData, client) => {
  // 1. Insertar en USUARIOS
  const userQuery = `
    INSERT INTO USUARIOS (
      primer_nombre, primer_apellido, correo, nombre_usuario,
      password_hash, rol, estado
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, primer_nombre, primer_apellido, correo, nombre_usuario, rol, estado, created_at
  `;
  const userValues = [
    userData.primer_nombre,
    userData.primer_apellido,
    userData.correo,
    userData.nombre_usuario,
    userData.password_hash,
    userData.rol,
    userData.estado || 'Activo',
  ];
  const userResult = await client.query(userQuery, userValues);
  const newUser = userResult.rows[0];

  // 2. Insertar en VENDEDORES
  const vendedorQuery = `
    INSERT INTO VENDEDORES (usuario_id, meta, tipo, fk_vendedor_jefe)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const vendedorValues = [
    newUser.id,
    vendedorData.meta,
    vendedorData.tipo,
    vendedorData.fk_vendedor_jefe || null,
  ];
  const vendedorResult = await client.query(vendedorQuery, vendedorValues);

  return {
    ...newUser,
    ...vendedorResult.rows[0],
  };
};

/**
 * KPIs: totales por tipo y estado.
 */
export const countByTipo = async () => {
  const query = `
    SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE v.tipo = 'Vendedor') AS vendedores,
      COUNT(*) FILTER (WHERE v.tipo = 'Director') AS directores,
      COUNT(*) FILTER (WHERE u.estado = 'Activo') AS activos
    FROM VENDEDORES v
    INNER JOIN USUARIOS u ON v.usuario_id = u.id
  `;
  const result = await pool.query(query);
  return result.rows[0];
};

/**
 * Lista de directores para el select de "jefe vendedor".
 */
export const findDirectores = async () => {
  const query = `
    SELECT u.id, u.primer_nombre, u.primer_apellido
    FROM VENDEDORES v
    INNER JOIN USUARIOS u ON v.usuario_id = u.id
    WHERE v.tipo = 'Director'
    ORDER BY u.primer_nombre
  `;
  const result = await pool.query(query);
  return result.rows;
};
