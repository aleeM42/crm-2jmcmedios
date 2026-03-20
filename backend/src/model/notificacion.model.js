// ==============================================
// model/notificacion.model.js
// ==============================================
import pool from '../config/db.js';

export const getNotificaciones = async (userId, rol) => {
  const notificaciones = [];
  const isVendedor = rol === 'Vendedor';
  const paramVendedor = isVendedor ? [userId] : [];
  const compVendedorCTE = isVendedor ? `c.fk_vendedor = $1` : `1=1`;

  // 1. Pautas por vencer (próximos 7 días)
  const queryPautas = `
    SELECT p.id, p.fecha_fin, c.nombre as cliente_nombre
    FROM PAUTAS p
    JOIN CLIENTE c ON p.fk_cliente = c.id
    WHERE p.estado NOT IN ('finalizada', 'suspendida')
      AND p.fecha_fin BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
      AND ${compVendedorCTE}
  `;
  const resPautas = await pool.query(queryPautas, paramVendedor);
  resPautas.rows.forEach(p => {
    notificaciones.push({
      id: `pauta-${p.id}`,
      titulo: 'Pauta por vencer',
      mensaje: `La pauta de ${p.cliente_nombre} finaliza pronto.`,
      tipo: 'warning'
    });
  });

  // 2. Cliente inactivo 90 días (sin negociaciones)
  const queryInactivos = `
    SELECT c.id, c.nombre
    FROM CLIENTE c
    LEFT JOIN HISTORICO_NEGOCIACIONES h ON c.id = h.fk_cliente
    WHERE c.estado = 'Activo' AND ${compVendedorCTE}
    GROUP BY c.id, c.nombre
    HAVING MAX(h.fecha_negociacion) < CURRENT_DATE - INTERVAL '90 days'
        OR MAX(h.fecha_negociacion) IS NULL
  `;
  const resInactivos = await pool.query(queryInactivos, paramVendedor);
  resInactivos.rows.forEach(c => {
    notificaciones.push({
      id: `inactivo-${c.id}`,
      titulo: 'Cliente inactivo',
      mensaje: `${c.nombre} no tiene negociaciones en más de 90 días.`,
      tipo: 'error'
    });
  });

  // 3. Cliente no visitado en 90 días
  const queryVisitas = `
    SELECT c.id, c.nombre
    FROM CLIENTE c
    LEFT JOIN VISITAS v ON c.id = v.fk_cliente
    WHERE c.estado = 'Activo' AND ${compVendedorCTE}
    GROUP BY c.id, c.nombre
    HAVING MAX(v.fecha) < CURRENT_DATE - INTERVAL '90 days'
        OR MAX(v.fecha) IS NULL
  `;
  const resVisitas = await pool.query(queryVisitas, paramVendedor);
  resVisitas.rows.forEach(c => {
    notificaciones.push({
      id: `visita-${c.id}`,
      titulo: 'Falta de visita',
      mensaje: `${c.nombre} no ha sido visitado en más de 90 días.`,
      tipo: 'info'
    });
  });

  // 4. Cumpleaños hoy
  const queryCumples = `
    SELECT ct.id, ct.pri_nombre, ct.pri_apellido, c.nombre as cliente_nombre
    FROM CONTACTOS ct
    JOIN CLIENTE c ON ct.fk_cliente = c.id
    WHERE ct.fecha_nac IS NOT NULL AND ${compVendedorCTE}
      AND EXTRACT(MONTH FROM ct.fecha_nac) = EXTRACT(MONTH FROM CURRENT_DATE) 
      AND EXTRACT(DAY FROM ct.fecha_nac) = EXTRACT(DAY FROM CURRENT_DATE)
  `;
  const resCumples = await pool.query(queryCumples, paramVendedor);
  resCumples.rows.forEach(ct => {
    notificaciones.push({
      id: `cumple-${ct.id}`,
      titulo: '¡Cumpleaños Hoy! 🎉',
      mensaje: `${ct.pri_nombre} ${ct.pri_apellido} (${ct.cliente_nombre}) cumple años hoy.`,
      tipo: 'success'
    });
  });

  return notificaciones;
};
