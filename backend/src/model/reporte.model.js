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
  // 5. Pautas por Filtro (Región, Marca, Cliente, Estado, Fechas)
  static async getPautasFiltro(filters = {}) {
    const { region, marca, cliente, estado, fechaDesde, fechaHasta } = filters;

    // ── Build dynamic WHERE clauses ──
    const conditions = [];
    const params = [];
    let paramIdx = 1;

    if (region) {
      conditions.push(`r.nombre = $${paramIdx++}`);
      params.push(region);
    }
    if (marca) {
      conditions.push(`p.marca = $${paramIdx++}`);
      params.push(marca);
    }
    if (cliente) {
      conditions.push(`c.id = $${paramIdx++}`);
      params.push(parseInt(cliente, 10));
    }
    if (estado) {
      conditions.push(`p.estado = $${paramIdx++}`);
      params.push(estado.toLowerCase());
    }
    if (fechaDesde) {
      conditions.push(`p.fecha_emision >= $${paramIdx++}`);
      params.push(fechaDesde);
    }
    if (fechaHasta) {
      conditions.push(`p.fecha_emision <= $${paramIdx++}`);
      params.push(fechaHasta);
    }

    const whereClause = conditions.length > 0
      ? 'WHERE ' + conditions.join(' AND ')
      : '';

    // ── Main list query ──
    const listQuery = `
      SELECT
        p.id,
        p.numero_ot,
        p.numero_oc,
        c.nombre   AS cliente_nombre,
        p.marca,
        r.nombre   AS region,
        ac.nombre_emisora AS emisora,
        p.estado,
        p.monto_ot,
        p.fecha_emision
      FROM PAUTAS p
      LEFT JOIN CLIENTE c ON p.fk_cliente = c.id
      LEFT JOIN DETALLE_PAUTA dp ON dp.fk_pauta = p.id
      LEFT JOIN ALIADOS_COMERCIALES ac ON dp.fk_aliado = ac.id
      LEFT JOIN LUGAR r ON ac.fk_region = r.id
      ${whereClause}
      ORDER BY p.fecha_emision DESC, p.id DESC
    `;

    // ── Chart: distribution by region ──
    const chartQuery = `
      SELECT
        COALESCE(r.nombre, 'Sin región') AS nombre,
        COUNT(DISTINCT p.id)::INTEGER    AS pautas
      FROM PAUTAS p
      LEFT JOIN DETALLE_PAUTA dp ON dp.fk_pauta = p.id
      LEFT JOIN ALIADOS_COMERCIALES ac ON dp.fk_aliado = ac.id
      LEFT JOIN LUGAR r ON ac.fk_region = r.id
      LEFT JOIN CLIENTE c ON p.fk_cliente = c.id
      ${whereClause}
      GROUP BY r.nombre
      ORDER BY pautas DESC
    `;

    // ── Filter options (always unfiltered so the user can see all options) ──
    const regionesQuery = `
      SELECT DISTINCT r.nombre
      FROM ALIADOS_COMERCIALES ac
      JOIN LUGAR r ON ac.fk_region = r.id
      ORDER BY r.nombre
    `;
    const marcasQuery = `
      SELECT DISTINCT marca FROM PAUTAS ORDER BY marca
    `;
    const clientesQuery = `
      SELECT DISTINCT c.id, c.nombre
      FROM CLIENTE c
      JOIN PAUTAS p ON p.fk_cliente = c.id
      ORDER BY c.nombre
    `;
    const estadosQuery = `
      SELECT DISTINCT estado FROM PAUTAS ORDER BY estado
    `;

    const [listRes, chartRes, regionesRes, marcasRes, clientesRes, estadosRes] = await Promise.all([
      pool.query(listQuery, params),
      pool.query(chartQuery, params),
      pool.query(regionesQuery),
      pool.query(marcasQuery),
      pool.query(clientesQuery),
      pool.query(estadosQuery),
    ]);

    return {
      listData: listRes.rows,
      chartData: chartRes.rows,
      totalCount: listRes.rowCount,
      filterOptions: {
        regiones: regionesRes.rows.map(r => r.nombre),
        marcas: marcasRes.rows.map(r => r.marca),
        clientes: clientesRes.rows.map(r => ({ id: r.id, nombre: r.nombre })),
        estados: estadosRes.rows.map(r => r.estado),
      },
    };
  }
  // 6. Gastos en inversión de atención comercial (por Cliente)
  static async getGastosCliente() {
    // ── Unify both GASTOS_VISITAS and GASTOS_MARKETING into one dataset ──
    // GASTOS_VISITAS: gasto → visita → contacto → cliente
    // GASTOS_MARKETING: gasto → cliente (direct FK)
    const listQuery = `
      (
        SELECT
          gv.id,
          gv.fecha,
          c.nombre   AS cliente_nombre,
          gv.concepto,
          gv.categoria,
          gv.monto,
          u.primer_nombre || ' ' || u.primer_apellido AS vendedor_nombre,
          'visita' AS origen
        FROM GASTOS_VISITAS gv
        JOIN VISITAS vi ON gv.fk_visita = vi.id
        LEFT JOIN USUARIOS u ON vi.fk_vendedor = u.id
        LEFT JOIN CONTACTOS co ON vi.fk_contacto = co.id
        LEFT JOIN CLIENTE c ON co.fk_cliente = c.id
      )
      UNION ALL
      (
        SELECT
          gm.id,
          gm.fecha,
          c.nombre   AS cliente_nombre,
          gm.concepto,
          gm.tipo    AS categoria,
          gm.monto,
          NULL       AS vendedor_nombre,
          'marketing' AS origen
        FROM GASTOS_MARKETING gm
        LEFT JOIN CLIENTE c ON gm.fk_cliente = c.id
        WHERE gm.fk_cliente IS NOT NULL
      )
      ORDER BY fecha DESC
    `;

    // ── Chart: Top 10 clients by total spend ──
    const chartQuery = `
      SELECT nombre, SUM(total)::NUMERIC AS gasto_total
      FROM (
        (
          SELECT c.nombre, SUM(gv.monto) AS total
          FROM GASTOS_VISITAS gv
          JOIN VISITAS vi ON gv.fk_visita = vi.id
          LEFT JOIN CONTACTOS co ON vi.fk_contacto = co.id
          LEFT JOIN CLIENTE c ON co.fk_cliente = c.id
          WHERE c.nombre IS NOT NULL
          GROUP BY c.nombre
        )
        UNION ALL
        (
          SELECT c.nombre, SUM(gm.monto) AS total
          FROM GASTOS_MARKETING gm
          LEFT JOIN CLIENTE c ON gm.fk_cliente = c.id
          WHERE c.nombre IS NOT NULL
          GROUP BY c.nombre
        )
      ) combined
      GROUP BY nombre
      ORDER BY gasto_total DESC
      LIMIT 10
    `;

    // ── KPI: totals by category ──
    const kpiQuery = `
      SELECT categoria, SUM(monto)::NUMERIC AS total
      FROM (
        (SELECT categoria, monto FROM GASTOS_VISITAS)
        UNION ALL
        (SELECT tipo AS categoria, monto FROM GASTOS_MARKETING WHERE fk_cliente IS NOT NULL)
      ) all_gastos
      GROUP BY categoria
      ORDER BY total DESC
    `;

    const [listRes, chartRes, kpiRes] = await Promise.all([
      pool.query(listQuery),
      pool.query(chartQuery),
      pool.query(kpiQuery),
    ]);

    // Compute grand total
    const grandTotal = listRes.rows.reduce((s, r) => s + parseFloat(r.monto || 0), 0);

    // Normalize chart data: add percentage field for bar chart
    const maxGasto = chartRes.rows.length > 0 ? parseFloat(chartRes.rows[0].gasto_total) : 1;
    const chartData = chartRes.rows.map(r => ({
      nombre: r.nombre,
      gasto_total: parseFloat(r.gasto_total),
      pct: Math.round((parseFloat(r.gasto_total) / maxGasto) * 100),
    }));

    return {
      listData: listRes.rows,
      chartData,
      totalCount: listRes.rowCount,
      kpi: {
        grandTotal,
        byCategoria: kpiRes.rows.map(r => ({
          categoria: r.categoria,
          total: parseFloat(r.total),
        })),
      },
    };
  }
}

export default ReporteModel;
