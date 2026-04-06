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
}

export default ReporteModel;
