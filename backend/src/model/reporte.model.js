// ==============================================
// reporte.model.js — Modelo de Base de Datos para Reportes
// ==============================================

import pool from '../config/db.js';

class ReporteModel {

  // 1. Ranking Clientes por Pautas
  static async getRankingClientesPautas() {
    // Chart: Top 5 by monto_oc
    const chartQuery = `
      SELECT c.nombre as name, COUNT(p.id)::INTEGER as pautas, SUM(p.monto_oc) as monto
      FROM CLIENTE c
      JOIN PAUTAS p ON c.id = p.fk_cliente
      GROUP BY c.id, c.nombre
      ORDER BY monto DESC
      LIMIT 5
    `;

    // List: All clients sorted by monto
    const listQuery = `
      SELECT c.nombre, c.rif_fiscal, COUNT(p.id)::INTEGER as total_pautas, SUM(p.monto_oc) as monto_total
      FROM CLIENTE c
      LEFT JOIN PAUTAS p ON c.id = p.fk_cliente
      GROUP BY c.id, c.nombre, c.rif_fiscal
      ORDER BY monto_total DESC NULLS LAST
    `;

    const [chartRes, listRes] = await Promise.all([
      pool.query(chartQuery),
      pool.query(listQuery)
    ]);

    return {
      chartData: chartRes.rows,
      listData: listRes.rows
    };
  }

  // 2. Clientes por Sector
  static async getClientesSector() {
    const chartQuery = `
      SELECT sector as name, COUNT(id)::INTEGER as value
      FROM CLIENTE
      WHERE estado = 'Activo'
      GROUP BY sector
      ORDER BY value DESC
    `;

    const listQuery = `
      SELECT rif_fiscal, nombre, razon_social, sector, estado, clasificacion
      FROM CLIENTE
      ORDER BY sector ASC, nombre ASC
    `;

    const [chartRes, listRes] = await Promise.all([
      pool.query(chartQuery),
      pool.query(listQuery)
    ]);

    return {
      chartData: chartRes.rows,
      listData: listRes.rows
    };
  }

  // 3. Regiones por Cliente
  static async getRegionesCliente() {
    // Recursively find Region for any given location ID
    const chartQuery = `
      WITH RECURSIVE lugar_hierarchy AS (
          SELECT id, nombre, tipo, fk_lugar, id as original_lugar_id
          FROM LUGAR
          
          UNION ALL
          
          SELECT p.id, p.nombre, p.tipo, p.fk_lugar, lh.original_lugar_id
          FROM LUGAR p
          INNER JOIN lugar_hierarchy lh ON lh.fk_lugar = p.id
      )
      SELECT lh.nombre as name, COUNT(DISTINCT c.id)::INTEGER as value
      FROM CLIENTE c
      JOIN lugar_hierarchy lh ON c.fk_lugar = lh.original_lugar_id
      WHERE lh.tipo = 'Region'
      GROUP BY lh.nombre
      ORDER BY value DESC
    `;

    const listQuery = `
      WITH RECURSIVE lugar_hierarchy AS (
          SELECT id, nombre, tipo, fk_lugar, id as original_lugar_id
          FROM LUGAR
          
          UNION ALL
          
          SELECT p.id, p.nombre, p.tipo, p.fk_lugar, lh.original_lugar_id
          FROM LUGAR p
          INNER JOIN lugar_hierarchy lh ON lh.fk_lugar = p.id
      )
      SELECT 
        c.nombre, 
        c.rif_fiscal,
        c.sector,
        (SELECT nombre FROM lugar_hierarchy WHERE original_lugar_id = c.fk_lugar AND tipo = 'Region' LIMIT 1) as region,
        (SELECT nombre FROM lugar_hierarchy WHERE original_lugar_id = c.fk_lugar AND tipo = 'Estado' LIMIT 1) as estado_lugar
      FROM CLIENTE c
      ORDER BY region ASC NULLS LAST, c.nombre ASC
    `;

    const [chartRes, listRes] = await Promise.all([
      pool.query(chartQuery),
      pool.query(listQuery)
    ]);

    return {
      chartData: chartRes.rows,
      listData: listRes.rows
    };
  }

  // 4. Ingresos Mensuales por Pautas
  static async getIngresosMensuales(anio) {
    const yearParam = parseInt(anio, 10);

    // Meses con ingreso para el año dado
    const dataQuery = `
      SELECT
        EXTRACT(MONTH FROM fecha_emision)::INTEGER  AS mes,
        COALESCE(SUM(monto_oc), 0)::NUMERIC         AS monto
      FROM PAUTAS
      WHERE EXTRACT(YEAR FROM fecha_emision) = $1
      GROUP BY mes
      ORDER BY mes ASC
    `;

    // KPIs: acumulado y promedio anual
    const kpiTotalesQuery = `
      SELECT
        COALESCE(SUM(monto_oc), 0)::NUMERIC AS total_acumulado
      FROM PAUTAS
      WHERE EXTRACT(YEAR FROM fecha_emision) = $1
    `;

    // KPI: mes con mayor ingreso
    const kpiPicoQuery = `
      SELECT
        EXTRACT(MONTH FROM fecha_emision)::INTEGER AS mes,
        SUM(monto_oc)::NUMERIC                     AS monto_mes
      FROM PAUTAS
      WHERE EXTRACT(YEAR FROM fecha_emision) = $1
      GROUP BY mes
      ORDER BY monto_mes DESC
      LIMIT 1
    `;

    // Años disponibles para el selector
    const aniosQuery = `
      SELECT DISTINCT EXTRACT(YEAR FROM fecha_emision)::INTEGER AS anio
      FROM PAUTAS
      ORDER BY anio DESC
    `;

    const [dataRes, kpiTotRes, kpiPicoRes, aniosRes] = await Promise.all([
      pool.query(dataQuery, [yearParam]),
      pool.query(kpiTotalesQuery, [yearParam]),
      pool.query(kpiPicoQuery, [yearParam]),
      pool.query(aniosQuery),
    ]);

    // Normalise: fill all 12 months (0 for missing)
    const LABELS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const montoByMes = {};
    dataRes.rows.forEach(r => { montoByMes[r.mes] = parseFloat(r.monto); });
    const chartData = LABELS.map((label, i) => ({
      label,
      monto: montoByMes[i + 1] || 0,
    }));

    const totalAcumulado = parseFloat(kpiTotRes.rows[0]?.total_acumulado || 0);
    const mesesConDatos = Object.keys(montoByMes).length;
    const promedioMensual = mesesConDatos > 0 ? totalAcumulado / mesesConDatos : 0;

    const pico = kpiPicoRes.rows[0];
    const mesPicoIdx = pico ? pico.mes - 1 : null;

    return {
      chartData,
      kpi: {
        totalAcumulado,
        promedioMensual,
        maxMes: pico ? parseFloat(pico.monto_mes) : 0,
        mesPicoNombre: mesPicoIdx !== null ? LABELS[mesPicoIdx] : '—',
      },
      aniosDisponibles: aniosRes.rows.map(r => r.anio),
    };
  }
}

export default ReporteModel;
