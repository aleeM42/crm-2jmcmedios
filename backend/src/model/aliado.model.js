// ==============================================
// aliado.model.js — Consultas a la BD para Aliados/Emisoras
// ==============================================
import pool from '../config/db.js';

export async function getAllAliados() {
  const query = `
    SELECT 
      ac.*,
      c.nombre as ciudad_nombre,
      e.nombre as estado_nombre,
      r.nombre as region_nombre
    FROM ALIADOS_COMERCIALES ac
    LEFT JOIN LUGAR c ON ac.fk_ciudad = c.id
    LEFT JOIN LUGAR e ON ac.fk_lugar = e.id
    LEFT JOIN LUGAR r ON ac.fk_region = r.id
    ORDER BY ac.nombre_emisora ASC
  `;
  const result = await pool.query(query);
  return result.rows;
}

export async function getAliadoById(id) {
  const query = `
    SELECT 
      ac.*,
      c.nombre as ciudad_nombre,
      e.nombre as estado_nombre,
      r.nombre as region_nombre,
      cob.descripcion as cobertura_nombre
    FROM ALIADOS_COMERCIALES ac
    LEFT JOIN LUGAR c ON ac.fk_ciudad = c.id
    LEFT JOIN LUGAR e ON ac.fk_lugar = e.id
    LEFT JOIN LUGAR r ON ac.fk_region = r.id
    LEFT JOIN COBERTURA cob ON ac.fk_cobertura = cob.id
    WHERE ac.id = $1
  `;
  const result = await pool.query(query, [id]);
  if (result.rows.length === 0) return null;
  const aliado = result.rows[0];

  // Contactos del aliado
  const contactosQuery = `
    SELECT ct.id, ct.pri_nombre, ct.seg_nombre, ct.pri_apellido,
           ct.departamento, ct.correo, ct.rol, ct.tipo,
           ct.anotac_especiales, ct.fecha_nac
    FROM CONTACTOS ct
    JOIN A_CONTACT ac_rel ON ct.id = ac_rel.fk_contacto
    WHERE ac_rel.fk_a_c = $1
    ORDER BY ct.id
  `;
  const contactosResult = await pool.query(contactosQuery, [id]);

  // Teléfonos de los contactos
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
      (SELECT COUNT(*) FROM DETALLE_PAUTA dp JOIN PAUTAS p ON dp.fk_pauta = p.id WHERE dp.fk_aliado = $1 AND p.estado IN ('programada', 'en transmision')) AS campanas_activas,
      (SELECT COUNT(*) FROM A_CONTACT WHERE fk_a_c = $1) AS total_contactos
  `;
  const kpisResult = await pool.query(kpisQuery, [id]);

  // Pautas asociadas
  const pautasQuery = `
    SELECT p.id, p.numero_ot as numero_ot, p.fecha_inicio, p.fecha_fin, p.marca, p.monto_ot, p.estado, dp.cantidad_emisoras
    FROM PAUTAS p
    JOIN DETALLE_PAUTA dp ON p.id = dp.fk_pauta
    WHERE dp.fk_aliado = $1
    ORDER BY p.fecha_inicio DESC
  `;
  const pautasResult = await pool.query(pautasQuery, [id]);

  // Ensamblar respuesta
  const telefonosByContacto = {};
  for (const t of telefonos) {
    if (!telefonosByContacto[t.fk_contacto]) telefonosByContacto[t.fk_contacto] = [];
    telefonosByContacto[t.fk_contacto].push(t);
  }

  return {
    ...aliado,
    kpis: kpisResult.rows[0],
    pautas: pautasResult.rows,
    contactos: contactosResult.rows.map(ct => ({
      ...ct,
      telefonos: telefonosByContacto[ct.id] || [],
    })),
  };
}

export async function createAliado(data) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const query = `
      INSERT INTO ALIADOS_COMERCIALES (
        razon_social, nombre_emisora, rif, frecuencia, categoria,
        estado, direccion, fk_lugar, fk_region, fk_cobertura
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const values = [
      data.razon_social, data.nombre_emisora, data.rif, data.frecuencia,
      data.categoria, data.estado || 'activo', data.direccion,
      data.fk_lugar, data.fk_region, data.fk_cobertura
    ];
    const result = await client.query(query, values);
    const nuevoAliado = result.rows[0];

    // Obtener usuario para FK de teléfonos
    const userRes = await client.query('SELECT id FROM USUARIOS LIMIT 1');
    const usuarioId = userRes.rows.length > 0 ? userRes.rows[0].id : null;

    // Guardar cada contacto del array enviado por el frontend
    const contactosArray = Array.isArray(data.contactos) ? data.contactos : [];
    let primerContactoId = null;

    for (const contacto of contactosArray) {
      if (!contacto.primer_nombre || !contacto.primer_apellido) continue;

      const qContacto = `
        INSERT INTO CONTACTOS (
          pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac
        ) VALUES ($1, $2, $3, $4, $5, $6, 'emisora', $7, $8)
        RETURNING id
      `;
      const fechanac = contacto.fecha_nacimiento || null;
      const valContacto = [
        contacto.primer_nombre,
        contacto.segundo_nombre || null,
        contacto.primer_apellido,
        contacto.departamento || null,
        contacto.correo || null,
        contacto.rol || null,
        contacto.anotaciones_especiales || null,
        fechanac
      ];
      const resContacto = await client.query(qContacto, valContacto);
      const contactoId = resContacto.rows[0].id;

      // Vincular contacto al aliado
      await client.query(
        'INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES ($1, $2)',
        [nuevoAliado.id, contactoId]
      );

      if (!primerContactoId) primerContactoId = contactoId;
    }

    // Guardar teléfonos (vinculados al primer contacto)
    if (primerContactoId && usuarioId) {
      const telefonosArray = Array.isArray(data.telefonos) ? data.telefonos : [];
      for (const tel of telefonosArray) {
        if (!tel.codigo_area || !tel.numero || tel.numero.length !== 7) continue;
        await client.query(
          'INSERT INTO TELEFONOS (codigo_area, numero, fk_usuario, fk_contacto) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
          [tel.codigo_area, tel.numero, usuarioId, primerContactoId]
        );
      }
    }

    await client.query('COMMIT');
    return nuevoAliado;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
