// ==============================================
// controller/vendedor.controller.js — Lógica de negocio VENDEDOR + RBAC
// ==============================================

import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import * as VendedorModel from '../model/vendedor.model.js';
import * as TelefonoModel from '../model/telefono.model.js';

const SALT_ROUNDS = 12;

/**
 * GET /api/vendedores
 * Datos públicos de todos los vendedores + KPIs.
 * Accesible por: Admin, Director, Vendedor.
 */
export const getAll = async (req, res, next) => {
  try {
    const [vendedores, kpis] = await Promise.all([
      VendedorModel.findAll(),
      VendedorModel.countByTipo(),
    ]);

    return res.json({
      success: true,
      data: {
        vendedores,
        kpis: {
          total: parseInt(kpis.total, 10),
          vendedores: parseInt(kpis.vendedores, 10),
          directores: parseInt(kpis.directores, 10),
          activos: parseInt(kpis.activos, 10),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/vendedores/directores
 * Lista de directores para select de "jefe vendedor".
 */
export const getDirectores = async (req, res, next) => {
  try {
    const directores = await VendedorModel.findDirectores();
    return res.json({ success: true, data: directores });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/vendedores/:id
 * Detalle completo de un vendedor.
 * RBAC en controller:
 *   - Admin/Director → siempre permitido
 *   - Vendedor → solo si req.params.id === req.user.id
 */
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rol, id: userId } = req.user;

    // RBAC: Vendedor solo puede ver su propio perfil
    if (rol === 'Vendedor' && id !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Solo puede consultar su propio perfil de vendedor',
      });
    }

    const vendedor = await VendedorModel.findById(id);

    if (!vendedor) {
      return res.status(404).json({
        success: false,
        error: 'Vendedor no encontrado',
      });
    }

    return res.json({ success: true, data: vendedor });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/vendedores
 * Transacción atómica: USUARIO → VENDEDOR → TELEFONOS
 * Solo Admin.
 *
 * Body esperado:
 * {
 *   usuario: { primer_nombre, primer_apellido, correo, nombre_usuario, password, rol, estado },
 *   vendedor: { meta, tipo, fk_vendedor_jefe? },
 *   telefonos: [{ codigo_area, numero }]
 * }
 */
export const create = async (req, res, next) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { usuario, vendedor, telefonos } = req.body;

    // Hash de la contraseña
    const password_hash = await bcrypt.hash(usuario.password, SALT_ROUNDS);

    // 1. Crear USUARIO + VENDEDOR
    const newVendedor = await VendedorModel.create(
      { ...usuario, password_hash },
      vendedor,
      client
    );

    // 2. Crear teléfonos (fk_contacto = null para vendedores)
    let newTelefonos = [];
    if (telefonos && telefonos.length > 0) {
      const validTels = telefonos.filter(t => t.codigo_area && t.numero);
      if (validTels.length > 0) {
        newTelefonos = await TelefonoModel.createBatch(
          null,           // fk_contacto = null (vendedor directo)
          newVendedor.id, // fk_usuario
          validTels,
          client
        );
      }
    }

    await client.query('COMMIT');

    return res.status(201).json({
      success: true,
      data: {
        ...newVendedor,
        telefonos: newTelefonos,
      },
    });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
};
