// ==============================================
// model/dashboard.model.js — Queries de agregación para Dashboard
// ==============================================

import pool from '../config/db.js';

const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];

/**
 * Retorna todas las métricas del Dashboard (resumen general sin filtro por rol).
 * @param {number} [anio] — Año para ingresos mensuales (default: año actual)
 */
export async function getResumen(anio) {
  const year = anio || new Date().getFullYear();

  // ── KPI cards ──
  const totalClientesQ  = `SELECT COUNT(*)::int AS total FROM cliente`;
  const totalVentasQ    = `SELECT COALESCE(SUM(monto_ot), 0)::numeric AS total FROM pautas`;
  const pautasTransQ    = `SELECT COUNT(*)::int AS total FROM pautas WHERE estado = 'en transmision'`;
  const totalEmisorasQ  = `SELECT COUNT(*)::int AS total FROM aliados_comerciales`;

  // ── Variación ventas: mes actual vs anterior ──
  const variacionQ = `
    SELECT
      COALESCE(SUM(CASE
        WHEN EXTRACT(MONTH FROM fecha_emision) = EXTRACT(MONTH FROM CURRENT_DATE)
         AND EXTRACT(YEAR  FROM fecha_emision) = EXTRACT(YEAR  FROM CURRENT_DATE)
        THEN monto_ot END), 0)::numeric AS mes_actual,
      COALESCE(SUM(CASE
        WHEN EXTRACT(MONTH FROM fecha_emision) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month')
         AND EXTRACT(YEAR  FROM fecha_emision) = EXTRACT(YEAR  FROM CURRENT_DATE - INTERVAL '1 month')
        THEN monto_ot END), 0)::numeric AS mes_anterior
    FROM pautas`;

  // ── Pipeline: conteo de pautas por estado ──
  const pipelineQ = `
    SELECT estado AS name, COUNT(*)::int AS value
    FROM pautas
    GROUP BY estado
    ORDER BY value DESC`;

  // ── Ingresos mensuales del año solicitado ──
  const ingresosQ = `
    SELECT EXTRACT(MONTH FROM fecha_emision)::int AS mes,
           COALESCE(SUM(monto_ot), 0)::numeric AS total
    FROM pautas
    WHERE EXTRACT(YEAR FROM fecha_emision) = $1
    GROUP BY mes
    ORDER BY mes`;

  // ── Top 5 clientes por inversión (SUM monto_ot) ──
  const topClientesQ = `
    SELECT c.nombre,
           COALESCE(SUM(p.monto_ot), 0)::numeric AS inversion,
           COUNT(CASE WHEN p.estado = 'en transmision' THEN 1 END)::int AS pautas_activas,
           l.nombre AS region,
           u.primer_nombre || ' ' || u.primer_apellido AS vendedor
    FROM cliente c
    LEFT JOIN pautas p      ON p.fk_cliente  = c.id
    LEFT JOIN lugar l       ON l.id          = c.fk_lugar
    LEFT JOIN vendedores v  ON v.usuario_id  = c.fk_vendedor
    LEFT JOIN usuarios u    ON u.id          = v.usuario_id
    GROUP BY c.id, c.nombre, l.nombre, u.primer_nombre, u.primer_apellido
    ORDER BY inversion DESC
    LIMIT 5`;

  const [clientes, ventas, pautasT, emisoras, variacion, pipeline, ingresos, topClientes] =
    await Promise.all([
      pool.query(totalClientesQ),
      pool.query(totalVentasQ),
      pool.query(pautasTransQ),
      pool.query(totalEmisorasQ),
      pool.query(variacionQ),
      pool.query(pipelineQ),
      pool.query(ingresosQ, [year]),
      pool.query(topClientesQ),
    ]);

  // Variación porcentual
  const mesActual   = Number(variacion.rows[0].mes_actual);
  const mesAnterior = Number(variacion.rows[0].mes_anterior);
  const variacionPct = mesAnterior > 0
    ? Number((((mesActual - mesAnterior) / mesAnterior) * 100).toFixed(1))
    : null;

  // Formatear ingresos mensuales con label de 3 letras
  const ingresosMensuales = ingresos.rows.map((r) => ({
    label: MESES[r.mes - 1],
    value: Number(r.total),
  }));

  return {
    totalClientes:       clientes.rows[0].total,
    totalVentas:         Number(ventas.rows[0].total),
    pautasEnTransmision: pautasT.rows[0].total,
    totalEmisoras:       emisoras.rows[0].total,
    variacionVentas:     variacionPct,
    pipeline:            pipeline.rows.map((r) => ({ name: r.name, value: r.value })),
    ingresosMensuales,
    topClientes:         topClientes.rows.map((r) => ({
      nombre:        r.nombre,
      inversion:     Number(r.inversion),
      pautasActivas: r.pautas_activas,
      region:        r.region,
      vendedor:      r.vendedor,
    })),
  };
}
