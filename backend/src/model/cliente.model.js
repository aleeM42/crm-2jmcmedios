// ==============================================
// model/cliente.model.js — SQL para CLIENTE (alineado a init.sql)
// ==============================================

import pool from '../config/db.js';

/**
 * Lista de clientes con filtros opcionales, paginación, y JOINs.
 * @param {object} filters - { sector, estado, clasificacion, search, page, limit }
 */
export const findAll = async (filters = {}, vendedorId = null) => {
  const { sector, estado, clasificacion, search, page = 1, limit = 20 } = filters;
  const offset = (page - 1) * limit;

  let where = 'WHERE 1=1';
  const params = [];
  let paramIndex = 1;

  if (sector) {
    where += ` AND c.sector = $${paramIndex++}`;
    params.push(sector);
  }
  if (estado) {
    where += ` AND c.estado = $${paramIndex++}`;
    params.push(estado);
  }
  if (clasificacion) {
    where += ` AND c.clasificacion = $${paramIndex++}`;
    params.push(clasificacion);
  }
  if (search) {
    where += ` AND (
      c.nombre ILIKE $${paramIndex} OR 
      c.razon_social ILIKE $${paramIndex} OR 
      c.rif_fiscal ILIKE $${paramIndex}
    )`;
    params.push(`%${search}%`);
    paramIndex++;
  }
  if (vendedorId) {
    where += ` AND c.fk_vendedor = $${paramIndex++}`;
    params.push(vendedorId);
  }

  // Query principal con JOINs
  const query = `
    SELECT c.id, c.nombre, c.razon_social, c.tipo, c.direccion,
           c.rif_fiscal, c.clasificacion, c.sector, c.estado,
           c.nombre_agencia, c.observacion, c.fk_lugar, c.fk_cliente_padre,
           c.fk_vendedor,
           u.primer_nombre AS vendedor_nombre,
           u.primer_apellido AS vendedor_apellido,
           l.nombre AS lugar_nombre
    FROM CLIENTE c
    LEFT JOIN VENDEDORES v ON c.fk_vendedor = v.usuario_id
    LEFT JOIN USUARIOS u ON v.usuario_id = u.id
    LEFT JOIN LUGAR l ON c.fk_lugar = l.id
    ${where}
    ORDER BY c.id DESC
    LIMIT $${paramIndex++} OFFSET $${paramIndex++}
  `;
  params.push(limit, offset);

  // Query de conteo total (para paginación)
  const countQuery = `SELECT COUNT(*) AS total FROM CLIENTE c ${where}`;
  const countParams = params.slice(0, -2); // sin limit/offset

  const [dataResult, countResult] = await Promise.all([
    pool.query(query, params),
    pool.query(countQuery, countParams),
  ]);

  return {
    clientes: dataResult.rows,
    total: parseInt(countResult.rows[0].total, 10),
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };
};

/**
 * Detalle completo de un cliente por ID.
 * Incluye vendedor, lugar, sub-empresas, marcas, contactos (con teléfonos).
 */
export const findById = async (id) => {
  // Cliente principal
  const clienteQuery = `
    SELECT c.*,
           u.primer_nombre AS vendedor_nombre,
           u.primer_apellido AS vendedor_apellido,
           u.correo AS vendedor_correo,
           l.nombre AS lugar_nombre,
           p.nombre AS empresa_padre_nombre
    FROM CLIENTE c
    LEFT JOIN VENDEDORES v ON c.fk_vendedor = v.usuario_id
    LEFT JOIN USUARIOS u ON v.usuario_id = u.id
    LEFT JOIN LUGAR l ON c.fk_lugar = l.id
    LEFT JOIN CLIENTE p ON c.fk_cliente_padre = p.id
    WHERE c.id = $1
  `;
  const clienteResult = await pool.query(clienteQuery, [id]);
  if (clienteResult.rows.length === 0) return null;

  const cliente = clienteResult.rows[0];

  // Sub-empresas
  const subEmpresasQuery = `
    SELECT id, nombre, razon_social, rif_fiscal, direccion, estado
    FROM CLIENTE
    WHERE fk_cliente_padre = $1
    ORDER BY nombre
  `;
  const subEmpresasResult = await pool.query(subEmpresasQuery, [id]);

  // Marcas de cada sub-empresa + del cliente principal
  const allClienteIds = [id, ...subEmpresasResult.rows.map(se => se.id)];
  const marcasQuery = `
    SELECT id, nombre, observaciones, fk_cliente
    FROM MARCA_INTER
    WHERE fk_cliente = ANY($1)
    ORDER BY fk_cliente, nombre
  `;
  const marcasResult = await pool.query(marcasQuery, [allClienteIds]);

  // Contactos del cliente principal + sub-empresas
  const contactosQuery = `
    SELECT ct.id, ct.pri_nombre, ct.seg_nombre, ct.pri_apellido,
           ct.departamento, ct.correo, ct.rol, ct.tipo,
           ct.anotac_especiales, ct.fecha_nac, ct.fk_cliente
    FROM CONTACTOS ct
    WHERE ct.fk_cliente = ANY($1)
    ORDER BY ct.fk_cliente, ct.id
  `;
  const contactosResult = await pool.query(contactosQuery, [allClienteIds]);

  // Teléfonos de todos los contactos
  const contactoIds = contactosResult.rows.map(c => c.id);
  let telefonos = [];
  if (contactoIds.length > 0) {
    const telQuery = `
      SELECT codigo_area, numero, fk_contacto
      FROM TELEFONOS
      WHERE fk_contacto = ANY($1)
    `;
    const telResult = await pool.query(telQuery, [contactoIds]);
    telefonos = telResult.rows;
  }

  // KPIs
  const kpisQuery = `
    SELECT
      (SELECT COUNT(*) FROM PAUTAS WHERE fk_cliente = $1 AND estado NOT IN ('finalizada', 'suspendida')) AS pautas_activas,
      (SELECT SUM(hn.monto_negociacion) FROM HISTORICO_NEGOCIACIONES hn WHERE hn.fk_cliente = $1) AS monto_total,
      (SELECT MAX(v.fecha) FROM VISITAS v JOIN CONTACTOS c ON v.fk_contacto = c.id WHERE c.fk_cliente = $1) AS ultima_visita,
      (SELECT COUNT(DISTINCT dp.fk_aliado) FROM DETALLE_PAUTA dp JOIN PAUTAS p ON dp.fk_pauta = p.id WHERE p.fk_cliente = $1) AS emisoras_presencia
  `;
  const kpisResult = await pool.query(kpisQuery, [id]);

  // Pautas asociadas
  const pautasQuery = `
    SELECT id, numero_ot, fecha_inicio, fecha_fin, marca, monto_ot, estado
    FROM PAUTAS
    WHERE fk_cliente = $1
    ORDER BY fecha_inicio DESC
  `;
  const pautasResult = await pool.query(pautasQuery, [id]);

  // Historial de Visitas (Actividad)
  const visitasQuery = `
    SELECT v.id, v.fecha, v.hora, v.objetivo_visita, v.efectiva, v.tipo, v.detalle, v.lugar,
           c.pri_nombre AS contacto_nombre, c.pri_apellido AS contacto_apellido,
           u.primer_nombre AS vendedor_nombre, u.primer_apellido AS vendedor_apellido
    FROM VISITAS v
    JOIN CONTACTOS c ON v.fk_contacto = c.id
    JOIN VENDEDORES ven ON v.fk_vendedor = ven.usuario_id
    JOIN USUARIOS u ON ven.usuario_id = u.id
    WHERE c.fk_cliente = $1
    ORDER BY v.fecha DESC, v.hora DESC
  `;
  const visitasResult = await pool.query(visitasQuery, [id]);
  // Historial de Negociaciones
  const negociacionesQuery = `
    SELECT id, fecha_inicio, fecha_fin, monto_negociacion, total_cunas, fk_cliente
    FROM HISTORICO_NEGOCIACIONES
    WHERE fk_cliente = $1
    ORDER BY fecha_inicio DESC
  `;
  const negociacionesResult = await pool.query(negociacionesQuery, [id]);

  // Ensamblar respuesta
  const marcasByCliente = {};
  for (const m of marcasResult.rows) {
    if (!marcasByCliente[m.fk_cliente]) marcasByCliente[m.fk_cliente] = [];
    marcasByCliente[m.fk_cliente].push(m);
  }

  const telefonosByContacto = {};
  for (const t of telefonos) {
    if (!telefonosByContacto[t.fk_contacto]) telefonosByContacto[t.fk_contacto] = [];
    telefonosByContacto[t.fk_contacto].push(t);
  }

  const contactosByCliente = {};
  for (const ct of contactosResult.rows) {
    const key = ct.fk_cliente;
    if (!contactosByCliente[key]) contactosByCliente[key] = [];
    contactosByCliente[key].push({
      ...ct,
      telefonos: telefonosByContacto[ct.id] || [],
    });
  }

  return {
    ...cliente,
    kpis: kpisResult.rows[0],
    pautas: pautasResult.rows,
    visitas: visitasResult.rows,
    negociaciones: negociacionesResult.rows,
    marcas: marcasByCliente[id] || [],
    sub_empresas: subEmpresasResult.rows.map(se => ({
      ...se,
      marcas: marcasByCliente[se.id] || [],
      contactos: contactosByCliente[se.id] || [],
    })),
    contactos: (contactosByCliente[id] || []),
  };
};

/**
 * Inserta un cliente. Usado dentro de una transacción.
 * @param {object} data - campos de CLIENTE
 * @param {object} client - pg client de transacción
 */
export const create = async (data, client) => {
  const dbClient = client || pool;
  const query = `
    INSERT INTO CLIENTE (
      nombre, razon_social, tipo, direccion, rif_fiscal,
      clasificacion, sector, estado, nombre_agencia, observacion,
      fk_lugar, fk_cliente_padre, fk_vendedor, archivo_adjunto
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *
  `;
  const values = [
    data.nombre,
    data.razon_social,
    data.tipo,
    data.direccion,
    data.rif_fiscal,
    data.clasificacion,
    data.sector,
    data.estado,
    data.nombre_agencia || null,
    data.observacion || null,
    data.fk_lugar,
    data.fk_cliente_padre || null,
    data.fk_vendedor,
    data.archivo_adjunto || null,
  ];
  const result = await dbClient.query(query, values);
  return result.rows[0];
};

/**
 * KPIs: conteos por estado para la página de clientes.
 */
export const countByEstado = async (vendedorId = null) => {
  let where = '';
  const params = [];
  if (vendedorId) {
    where = 'WHERE fk_vendedor = $1';
    params.push(vendedorId);
  }
  const query = `
    SELECT 
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE estado = 'Activo') AS activos,
      COUNT(*) FILTER (WHERE estado = 'Inactivo') AS inactivos
    FROM CLIENTE
    ${where}
  `;
  const result = await pool.query(query, params);
  return result.rows[0];
};

/**
 * Lista empresas padre para select de sub-empresas.
 */
export const findEmpresas = async () => {
  const query = `
    SELECT id, nombre, razon_social
    FROM CLIENTE
    WHERE tipo = 'Empresa'
    ORDER BY nombre
  `;
  const result = await pool.query(query);
  return result.rows;
};

/**
 * Actualiza los campos mutables de un cliente.
 * No toca: tipo, fk_cliente_padre (inmutables post-creación).
 * @param {number} id - ID del cliente
 * @param {object} data - campos a actualizar
 * @param {object} client - pg client de transacción (opcional)
 */
export const update = async (id, data, client) => {
  const dbClient = client || pool;
  const query = `
    UPDATE CLIENTE SET
      nombre = $1,
      razon_social = $2,
      direccion = $3,
      rif_fiscal = $4,
      clasificacion = $5,
      sector = $6,
      estado = $7,
      nombre_agencia = $8,
      observacion = $9,
      fk_lugar = $10,
      fk_vendedor = $11,
      archivo_adjunto = $12
    WHERE id = $13
    RETURNING *
  `;
  const values = [
    data.nombre,
    data.razon_social,
    data.direccion,
    data.rif_fiscal,
    data.clasificacion,
    data.sector,
    data.estado,
    data.nombre_agencia || null,
    data.observacion || null,
    data.fk_lugar,
    data.fk_vendedor,
    data.archivo_adjunto || null,
    id,
  ];
  const result = await dbClient.query(query, values);
  return result.rows[0];
};

/**
 * Elimina un cliente por ID.
 * Las tablas dependientes (MARCA_INTER, TELEFONOS, etc.) usan ON DELETE CASCADE.
 * @param {number} id - ID del cliente
 */
export const deleteById = async (id) => {
  const query = `DELETE FROM CLIENTE WHERE id = $1 RETURNING id`;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};
