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
 * Obtiene todas las pautas con el nombre del cliente relacionado.
 * No se aplica filtro de rol, todos pueden ver todas las pautas.
 */
export async function getAllPautas() {
  // Sincronizar estados antes de consultar
  await syncPautasEstados();

  const query = `
    SELECT p.*, 
           c.nombre AS cliente_nombre,
           u.primer_nombre || ' ' || u.primer_apellido AS vendedor_nombre
    FROM PAUTAS p
    LEFT JOIN CLIENTE c ON p.fk_cliente = c.id
    LEFT JOIN USUARIOS u ON p.fk_vendedor = u.id
    ORDER BY p.id DESC
  `;
  const result = await pool.query(query);
  return result.rows;
}

/**
 * Obtiene una pauta por su ID, con datos de Emisoras y Negociación Total
 */
export async function getPautaById(id) {
  // Sincronizar estados antes de consultar
  await syncPautasEstados();

  // get pauta
  const queryPauta = `
    SELECT p.*,
           c.nombre AS cliente_nombre,
           c.clasificacion AS cliente_clasificacion,
           c.nombre_agencia AS cliente_agencia
    FROM PAUTAS p
    LEFT JOIN CLIENTE c ON p.fk_cliente = c.id
    WHERE p.id = $1
  `;
  const resultPauta = await pool.query(queryPauta, [id]);
  if (resultPauta.rows.length === 0) return null;
  const pauta = resultPauta.rows[0];

  // get emisoras
  const queryEmisoras = `
    SELECT ac.nombre_emisora, dp.cantidad_emisoras, l.nombre as ciudad_nombre, lp.nombre as estado_nombre, r.nombre as region_nombre
    FROM DETALLE_PAUTA dp
    JOIN ALIADOS_COMERCIALES ac ON dp.fk_aliado = ac.id
    LEFT JOIN LUGAR l ON ac.fk_lugar = l.id
    LEFT JOIN LUGAR lp ON l.fk_lugar = lp.id
    LEFT JOIN LUGAR r ON ac.fk_region = r.id
    WHERE dp.fk_pauta = $1
  `;
  const resultEmisoras = await pool.query(queryEmisoras, [id]);
  if (resultEmisoras.rows.length > 0) {
      pauta.emisoras = resultEmisoras.rows;
  } else {
      pauta.emisoras = [];
  }

  // get historico negociaciones total para monto total negociacion
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
 * Crea una pauta en la BD, incluyendo inserciones en tablas relacionadas (CUNAS, DETALLE_PAUTA, HISTORICO).
 * Requiere transacción para asegurar consistencia.
 */
export async function createPauta(data) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Convertir el tipo de compra al ENUM o string esperado por la BD
    const tipoCompraBD = data.tipoCompra === 'en_vivo' ? 'en vivo' : 'rotativa';
    
    const queryPauta = `
      INSERT INTO PAUTAS (
        numero_ot, fecha_emision, marca, coordinadora, fecha_inicio, fecha_fin,
        cantidad_cunas, costo_cunas, monto_oc, monto_ot, tipo_compra, estado,
        observaciones, programa, presentadora, horario, fk_vendedor, fk_cliente
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
      ) RETURNING id
    `;
    
    // Variables asegurando nulos correctos
    const valuesPauta = [
      data.numeroOt,
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
      data.vendedorId,
      data.clienteId
    ];

    const resultPauta = await client.query(queryPauta, valuesPauta);
    const pautaId = resultPauta.rows[0].id;

    // Tabla CUNAS (Cortina y mensaje como '-' si no vienen en front)
    const queryCuna = `
      INSERT INTO CUNAS (duracion, cortina, mensaje, fk_pauta)
      VALUES ($1, $2, $3, $4)
    `;
    await client.query(queryCuna, [data.duracionCuna, '-', '-', pautaId]);

    // Tabla DETALLE_PAUTA (emisoras asociadas)
    if (data.emisorasAsoc && data.emisorasAsoc.length > 0) {
      const queryDetalle = `
        INSERT INTO DETALLE_PAUTA (fk_pauta, fk_aliado, cantidad_emisoras)
        VALUES ($1, $2, $3)
      `;
      for (const emisora of data.emisorasAsoc) {
        await client.query(queryDetalle, [pautaId, emisora.id, emisora.cantidad_emisoras]);
      }
    }

    // Tabla HISTORICO_NEGOCIACIONES
    const queryHistorico = `
      INSERT INTO HISTORICO_NEGOCIACIONES (fecha_inicio, fecha_fin, monto_negociacion, total_cunas, fk_cliente)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await client.query(queryHistorico, [data.fechaInicio, data.fechaFin, data.montoOT || 0, parseInt(data.cantidadCunas, 10) || 0, data.clienteId]);

    await client.query('COMMIT');
    return pautaId;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
