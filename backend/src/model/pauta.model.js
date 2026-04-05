// ==============================================
// pauta.model.js — Consultas a la BD para Pautas
// ==============================================
import pool from '../config/db.js';

/**
 * Sincroniza automáticamente los estados de las pautas basándose en las fechas actuales.
 * Se ejecuta de forma lazy al consultar pautas.
 */
async function syncPautasEstados() {
  const query = `
    UPDATE PAUTAS 
    SET estado = CASE 
      WHEN CURRENT_DATE > fecha_fin THEN 'finalizada'
      WHEN CURRENT_DATE >= fecha_inicio THEN 'en transmision'
      ELSE 'programada'
    END
    WHERE estado != 'suspendida'
      AND estado != CASE 
        WHEN CURRENT_DATE > fecha_fin THEN 'finalizada'
        WHEN CURRENT_DATE >= fecha_inicio THEN 'en transmision'
        ELSE 'programada'
      END
  `;
  try {
    await pool.query(query);
  } catch (error) {
    console.error('[syncPautasEstados] Error sincronizando estados:', error);
  }
}

/**
 * Obtiene todas las pautas con cliente, vendedor y emisora asociada.
 */
export async function getAllPautas() {
  await syncPautasEstados();

  const query = `
    SELECT p.*, 
           c.nombre AS cliente_nombre,
           u.primer_nombre || ' ' || u.primer_apellido AS vendedor_nombre,
           ac.nombre_emisora AS emisora_nombre
    FROM PAUTAS p
    LEFT JOIN CLIENTE c ON p.fk_cliente = c.id
    LEFT JOIN USUARIOS u ON p.fk_vendedor = u.id
    LEFT JOIN DETALLE_PAUTA dp ON dp.fk_pauta = p.id
    LEFT JOIN ALIADOS_COMERCIALES ac ON dp.fk_aliado = ac.id
    ORDER BY p.id DESC
  `;
  const result = await pool.query(query);
  return result.rows;
}

/**
 * Obtiene una pauta por su ID, con datos de la emisora y negociación total.
 */
export async function getPautaById(id) {
  await syncPautasEstados();

  // Pauta principal + emisora asociada
  const queryPauta = `
    SELECT p.*,
           c.nombre AS cliente_nombre,
           c.clasificacion AS cliente_clasificacion,
           c.nombre_agencia AS cliente_agencia,
           ac.id AS aliado_id,
           ac.nombre_emisora,
           ac.frecuencia,
           l.nombre AS ciudad_nombre,
           lp.nombre AS estado_nombre,
           r.nombre AS region_nombre
    FROM PAUTAS p
    LEFT JOIN CLIENTE c ON p.fk_cliente = c.id
    LEFT JOIN DETALLE_PAUTA dp ON dp.fk_pauta = p.id
    LEFT JOIN ALIADOS_COMERCIALES ac ON dp.fk_aliado = ac.id
    LEFT JOIN LUGAR l ON ac.fk_lugar = l.id
    LEFT JOIN LUGAR lp ON l.fk_lugar = lp.id
    LEFT JOIN LUGAR r ON ac.fk_region = r.id
    WHERE p.id = $1
  `;
  const resultPauta = await pool.query(queryPauta, [id]);
  if (resultPauta.rows.length === 0) return null;
  const pauta = resultPauta.rows[0];

  // Otras emisoras con la misma OC (para distribución de monto)
  const queryOtrasEmisoras = `
    SELECT p2.id, p2.numero_ot, p2.monto_ot,
           ac2.nombre_emisora
    FROM PAUTAS p2
    LEFT JOIN DETALLE_PAUTA dp2 ON dp2.fk_pauta = p2.id
    LEFT JOIN ALIADOS_COMERCIALES ac2 ON dp2.fk_aliado = ac2.id
    WHERE p2.numero_oc = $1 AND p2.id != $2
    ORDER BY p2.id
  `;
  const resultOtras = await pool.query(queryOtrasEmisoras, [pauta.numero_oc, id]);
  pauta.otras_emisoras_oc = resultOtras.rows;

  // Histórico de negociaciones total
  const queryHistorico = `
    SELECT COALESCE(SUM(monto_negociacion), 0) AS total_negociacion
    FROM HISTORICO_NEGOCIACIONES
    WHERE fk_cliente = (SELECT fk_cliente FROM PAUTAS WHERE id = $1)
  `;
  const resultHistorico = await pool.query(queryHistorico, [id]);
  pauta.monto_total_negociacion = parseFloat(resultHistorico.rows[0].total_negociacion);

  return pauta;
}

/**
 * Crea una pauta con 1 emisora asociada.
 * Inserta en PAUTAS, CUNAS, DETALLE_PAUTA e HISTORICO_NEGOCIACIONES.
 */
export async function createPauta(data) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const tipoCompraBD = data.tipoCompra === 'en_vivo' ? 'en vivo' : 'rotativa';
    
    const queryPauta = `
      INSERT INTO PAUTAS (
        numero_ot, numero_oc, fecha_emision, marca, coordinadora, fecha_inicio, fecha_fin,
        cantidad_cunas, costo_cunas, monto_oc, monto_ot, tipo_compra, estado,
        observaciones, programa, presentadora, horario, dias_semana, fk_vendedor, fk_cliente
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
      ) RETURNING id
    `;
    
    const valuesPauta = [
      data.numeroOt,
      data.numeroOc,
      data.fechaEmision,
      data.marca,
      data.coordinadora || null,
      data.fechaInicio,
      data.fechaFin,
      data.cantidadCunas,
      data.costoCuna,
      data.montoOC,
      data.montoOT,
      tipoCompraBD,
      data.estado,
      data.observaciones || null,
      data.programa || null,
      data.presentadora || null,
      data.horario || null,
      data.diasSemana || null,
      data.vendedorId,
      data.clienteId
    ];

    const resultPauta = await client.query(queryPauta, valuesPauta);
    const pautaId = resultPauta.rows[0].id;

    // CUNAS
    const queryCuna = `
      INSERT INTO CUNAS (duracion, cortina, mensaje, fk_pauta)
      VALUES ($1, $2, $3, $4)
    `;
    await client.query(queryCuna, [data.duracionCuna, '-', '-', pautaId]);

    // DETALLE_PAUTA — una sola emisora
    if (data.aliadoId) {
      const queryDetalle = `
        INSERT INTO DETALLE_PAUTA (fk_pauta, fk_aliado, cantidad_emisoras)
        VALUES ($1, $2, 1)
      `;
      await client.query(queryDetalle, [pautaId, data.aliadoId]);
    }

    // HISTORICO_NEGOCIACIONES
    const queryHistorico = `
      INSERT INTO HISTORICO_NEGOCIACIONES (fecha_inicio, fecha_fin, monto_negociacion, total_cunas, fk_cliente)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await client.query(queryHistorico, [
      data.fechaInicio,
      data.fechaFin,
      data.montoOT || 0,
      parseInt(data.cantidadCunas, 10) || 0,
      data.clienteId
    ]);

    await client.query('COMMIT');
    return pautaId;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Obtiene todas las pautas que comparten el mismo numero_OC.
 */
export async function getPautasByOC(numeroOC) {
  const query = `
    SELECT p.id, p.numero_ot, p.numero_oc, p.monto_oc, p.monto_ot, p.estado,
           ac.nombre_emisora,
           c.nombre AS cliente_nombre
    FROM PAUTAS p
    LEFT JOIN DETALLE_PAUTA dp ON dp.fk_pauta = p.id
    LEFT JOIN ALIADOS_COMERCIALES ac ON dp.fk_aliado = ac.id
    LEFT JOIN CLIENTE c ON p.fk_cliente = c.id
    WHERE p.numero_oc = $1
    ORDER BY p.id
  `;
  const result = await pool.query(query, [numeroOC]);
  return result.rows;
}

/**
 * Calcula el monto disponible restante de una OC.
 * Retorna: { montoOC, montoAsignado, montoDisponible, emisoras: [] }
 */
export async function getMontoDisponibleOC(numeroOC) {
  const query = `
    SELECT p.monto_oc, p.monto_ot, ac.nombre_emisora, p.numero_ot
    FROM PAUTAS p
    LEFT JOIN DETALLE_PAUTA dp ON dp.fk_pauta = p.id
    LEFT JOIN ALIADOS_COMERCIALES ac ON dp.fk_aliado = ac.id
    WHERE p.numero_oc = $1
    ORDER BY p.id
  `;
  const result = await pool.query(query, [numeroOC]);

  if (result.rows.length === 0) {
    return { montoOC: 0, montoAsignado: 0, montoDisponible: 0, emisoras: [] };
  }

  // El monto_OC es el mismo para todas las pautas con la misma OC
  const montoOC = parseFloat(result.rows[0].monto_oc);
  const montoAsignado = result.rows.reduce((sum, r) => sum + parseFloat(r.monto_ot || 0), 0);
  const montoDisponible = montoOC - montoAsignado;

  return {
    montoOC,
    montoAsignado,
    montoDisponible,
    emisoras: result.rows.map(r => ({
      nombreEmisora: r.nombre_emisora,
      numeroOt: r.numero_ot,
      montoOt: parseFloat(r.monto_ot)
    }))
  };
}

/**
 * Actualiza una pauta existente y sincroniza DETALLE_PAUTA si cambia la emisora.
 */
export async function updatePauta(id, data) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const tipoCompraBD = data.tipoCompra === 'en_vivo' ? 'en vivo' : data.tipoCompra;

    const query = `
      UPDATE PAUTAS SET
        numero_ot = $1, numero_oc = $2, fecha_emision = $3, marca = $4,
        coordinadora = $5, fecha_inicio = $6, fecha_fin = $7,
        cantidad_cunas = $8, costo_cunas = $9, monto_oc = $10, monto_ot = $11,
        tipo_compra = $12, estado = $13, observaciones = $14,
        programa = $15, presentadora = $16, horario = $17, dias_semana = $18,
        fk_vendedor = $19, fk_cliente = $20
      WHERE id = $21
      RETURNING *
    `;
    const values = [
      data.numeroOt, data.numeroOc, data.fechaEmision, data.marca,
      data.coordinadora || null, data.fechaInicio, data.fechaFin,
      data.cantidadCunas, data.costoCuna, data.montoOC, data.montoOT,
      tipoCompraBD, data.estado, data.observaciones || null,
      tipoCompraBD === 'en vivo' ? (data.programa || null) : null,
      tipoCompraBD === 'en vivo' ? (data.presentadora || null) : null,
      tipoCompraBD === 'en vivo' ? (data.horario || null) : null,
      data.diasSemana || null,
      data.vendedorId, data.clienteId,
      id
    ];

    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return null;
    }

    // Sincronizar emisora en DETALLE_PAUTA si se envía aliadoId
    if (data.aliadoId) {
      // Eliminar registro previo y re-insertar
      await client.query('DELETE FROM DETALLE_PAUTA WHERE fk_pauta = $1', [id]);
      await client.query(
        'INSERT INTO DETALLE_PAUTA (fk_pauta, fk_aliado, cantidad_emisoras) VALUES ($1, $2, 1)',
        [id, data.aliadoId]
      );
    }

    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Elimina una pauta por ID.
 * CUNAS y DETALLE_PAUTA se eliminan en cascada (ON DELETE CASCADE).
 * @param {number} id - ID de la pauta
 */
export async function deletePauta(id) {
  const query = 'DELETE FROM PAUTAS WHERE id = $1 RETURNING id';
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

