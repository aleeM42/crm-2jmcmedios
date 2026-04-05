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

export async function updateAliado(id, data) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ── 1. Actualizar datos del aliado ────────────────────
    const queryAliado = `
      UPDATE ALIADOS_COMERCIALES SET
        razon_social = $1, nombre_emisora = $2, rif = $3, frecuencia = $4,
        categoria = $5, estado = $6, direccion = $7,
        fk_lugar = $8, fk_region = $9, fk_cobertura = $10
      WHERE id = $11
      RETURNING *
    `;
    const valoresAliado = [
      data.razon_social, data.nombre_emisora, data.rif, data.frecuencia,
      data.categoria, data.estado || 'activo', data.direccion,
      data.fk_lugar || null, data.fk_region || null, data.fk_cobertura || null,
      id
    ];
    const resAliado = await client.query(queryAliado, valoresAliado);
    if (resAliado.rows.length === 0) {
      await client.query('ROLLBACK');
      return null;
    }
    const aliadoActualizado = resAliado.rows[0];

    // ── 2. Sincronizar contactos ─────────────────────────
    const contactosEnviados = Array.isArray(data.contactos) ? data.contactos : [];
    const contactosActivos = contactosEnviados.filter(c => c.primer_nombre || c.pri_nombre);

    // IDs actuales en BD (via A_CONTACT)
    const resActuales = await client.query(
      'SELECT fk_contacto FROM A_CONTACT WHERE fk_a_c = $1', [id]
    );
    const idsActuales = resActuales.rows.map(r => r.fk_contacto);

    // Separar contactos con ID (actualizar) y sin ID (crear)
    const contactosConId = contactosActivos.filter(c => c.id);
    const contactosSinId = contactosActivos.filter(c => !c.id);
    const idsEnviados = contactosConId.map(c => c.id);

    // Eliminar contactos que ya no vienen (y sus teléfonos por CASCADE o manual)
    const idsAEliminar = idsActuales.filter(cid => !idsEnviados.includes(cid));
    for (const cid of idsAEliminar) {
      await client.query('DELETE FROM TELEFONOS WHERE fk_contacto = $1', [cid]);
      await client.query('DELETE FROM A_CONTACT WHERE fk_a_c = $1 AND fk_contacto = $2', [id, cid]);
      await client.query('DELETE FROM CONTACTOS WHERE id = $1', [cid]);
    }

    // Obtener usuario para FK de teléfonos
    const userRes = await client.query('SELECT id FROM USUARIOS LIMIT 1');
    const usuarioId = userRes.rows.length > 0 ? userRes.rows[0].id : null;

    let contactosResultado = [];

    // Actualizar contactos existentes
    for (const c of contactosConId) {
      const priNombre = c.primer_nombre || c.pri_nombre;
      const segNombre = c.segundo_nombre || c.seg_nombre || null;
      const priApellido = c.primer_apellido || c.pri_apellido;
      const fechaNac = c.fecha_nacimiento || c.fecha_nac || null;
      const anotaciones = c.anotaciones_especiales || c.anotac_especiales || null;

      await client.query(
        `UPDATE CONTACTOS SET
          pri_nombre = $1, seg_nombre = $2, pri_apellido = $3,
          departamento = $4, correo = $5, rol = $6,
          anotac_especiales = $7, fecha_nac = $8
        WHERE id = $9`,
        [priNombre, segNombre, priApellido,
         c.departamento || null, c.correo || null, c.rol || null,
         anotaciones, fechaNac, c.id]
      );

      // Sincronizar teléfonos: delete + re-insert
      await client.query('DELETE FROM TELEFONOS WHERE fk_contacto = $1', [c.id]);
      const tels = (c.telefonos || []).filter(t => t.codigo_area && t.numero);
      for (const t of tels) {
        if (usuarioId) {
          await client.query(
            'INSERT INTO TELEFONOS (codigo_area, numero, fk_usuario, fk_contacto) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
            [t.codigo_area, t.numero, usuarioId, c.id]
          );
        }
      }

      contactosResultado.push({ id: c.id, pri_nombre: priNombre, pri_apellido: priApellido, telefonos: tels });
    }

    // Crear contactos nuevos
    for (const c of contactosSinId) {
      const priNombre = c.primer_nombre || c.pri_nombre;
      const segNombre = c.segundo_nombre || c.seg_nombre || null;
      const priApellido = c.primer_apellido || c.pri_apellido;
      const fechaNac = c.fecha_nacimiento || c.fecha_nac || null;
      const anotaciones = c.anotaciones_especiales || c.anotac_especiales || null;

      if (!priNombre || !priApellido) continue;

      const resC = await client.query(
        `INSERT INTO CONTACTOS (pri_nombre, seg_nombre, pri_apellido, departamento, correo, rol, tipo, anotac_especiales, fecha_nac)
         VALUES ($1, $2, $3, $4, $5, $6, 'emisora', $7, $8) RETURNING id`,
        [priNombre, segNombre, priApellido,
         c.departamento || null, c.correo || null, c.rol || null,
         anotaciones, fechaNac]
      );
      const nuevoContactoId = resC.rows[0].id;

      // Vincular al aliado
      await client.query(
        'INSERT INTO A_CONTACT (fk_a_c, fk_contacto) VALUES ($1, $2)',
        [id, nuevoContactoId]
      );

      // Insertar teléfonos
      const tels = (c.telefonos || []).filter(t => t.codigo_area && t.numero);
      for (const t of tels) {
        if (usuarioId) {
          await client.query(
            'INSERT INTO TELEFONOS (codigo_area, numero, fk_usuario, fk_contacto) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
            [t.codigo_area, t.numero, usuarioId, nuevoContactoId]
          );
        }
      }

      contactosResultado.push({ id: nuevoContactoId, pri_nombre: priNombre, pri_apellido: priApellido, telefonos: tels });
    }

    await client.query('COMMIT');
    return { ...aliadoActualizado, contactos: contactosResultado };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
