// ==============================================
// controller/vendedor.controller.js — Lógica de negocio VENDEDOR + RBAC
// ==============================================

import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import * as VendedorModel from '../model/vendedor.model.js';
import * as TelefonoModel from '../model/telefono.model.js';

const SALT_ROUNDS = 12;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\d{7}$/;

// ─── Helpers de validación ────────────────────────────────
function validarVendedor(usuario, vendedor) {
  const errores = [];
  if (!usuario.primer_nombre?.trim())  errores.push('El primer nombre es obligatorio.');
  if (!usuario.primer_apellido?.trim()) errores.push('El primer apellido es obligatorio.');
  if (!usuario.correo?.trim())          errores.push('El correo electrónico es obligatorio.');
  if (usuario.correo && !EMAIL_REGEX.test(usuario.correo))
    errores.push('El correo electrónico no tiene un formato válido (ej: vendedor@empresa.com).');
  if (!usuario.nombre_usuario?.trim())  errores.push('El nombre de usuario es obligatorio.');
  if (!usuario.password?.trim())        errores.push('La contraseña es obligatoria.');

  const meta = parseFloat(vendedor?.meta ?? '');
  if (isNaN(meta) || meta < 0)
    errores.push('La meta anual no puede ser un número negativo.');

  return errores;
}

function validarTelefonos(telefonos) {
  const errores = [];
  if (!telefonos || telefonos.length === 0) return errores; // teléfonos opcionales en vendedor
  telefonos.forEach((t, i) => {
    if (t.codigo_area || t.numero) {
      if (!t.codigo_area)
        errores.push(`Teléfono ${i + 1}: falta el código de área.`);
      if (!t.numero || !PHONE_REGEX.test(t.numero))
        errores.push(`Teléfono ${i + 1}: el número debe tener exactamente 7 dígitos numéricos.`);
    }
  });
  return errores;
}

// ─── Controladores ────────────────────────────────────────

/**
 * GET /api/vendedores
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
 * RBAC: Vendedor solo puede ver su propio perfil
 */
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rol, id: userId } = req.user;

    if (rol === 'Vendedor' && id !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Solo puede consultar su propio perfil de vendedor',
      });
    }

    const vendedor = await VendedorModel.findById(id);
    if (!vendedor) {
      return res.status(404).json({ success: false, error: 'Vendedor no encontrado' });
    }

    return res.json({ success: true, data: vendedor });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/vendedores
 * Transacción atómica: USUARIO → VENDEDOR → TELEFONOS
 */
export const create = async (req, res, next) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { usuario, vendedor, telefonos } = req.body;

    // ── Validaciones de negocio ──────────────────────────
    const errores = [
      ...validarVendedor(usuario || {}, vendedor || {}),
      ...validarTelefonos(telefonos || []),
    ];
    if (errores.length > 0) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(400).json({ success: false, error: errores[0] });
    }

    // ── Hash de contraseña ───────────────────────────────
    const password_hash = await bcrypt.hash(usuario.password, SALT_ROUNDS);

    // ── 1. Crear USUARIO + VENDEDOR ──────────────────────
    const newVendedor = await VendedorModel.create(
      { ...usuario, password_hash },
      vendedor,
      client
    );

    // ── 2. Crear teléfonos ───────────────────────────────
    let newTelefonos = [];
    if (telefonos && telefonos.length > 0) {
      const validTels = telefonos.filter(t => t.codigo_area && t.numero);
      if (validTels.length > 0) {
        newTelefonos = await TelefonoModel.createBatch(
          null,
          newVendedor.id,
          validTels,
          client
        );
      }
    }

    await client.query('COMMIT');

    return res.status(201).json({
      success: true,
      data: { ...newVendedor, telefonos: newTelefonos },
    });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
};

/**
 * PUT /api/vendedores/:id
 * Transacción atómica: UPDATE USUARIO → UPDATE VENDEDOR → RE-CREATE TELEFONOS
 * RBAC: Admin, Director, o el mismo vendedor
 */
export const update = async (req, res, next) => {
  const { id } = req.params;
  const { rol, id: userId } = req.user;

  // RBAC checks for updating
  if (rol === 'Vendedor' && id !== userId) {
    return res.status(403).json({
      success: false,
      error: 'Solo puede editar su propio perfil',
    });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { usuario, vendedor, telefonos } = req.body;

    // ── Validaciones de negocio ──────────────────────────
    // Note: The password validation applies only if creating. For updates, password might be empty if unchanged.
    // So we remove the password check if password is empty.
    const usuarioAValidar = { ...usuario };
    if (!usuarioAValidar.password) {
      usuarioAValidar.password = 'placeholder'; // skip validacion
    }

    const errores = [
      ...validarVendedor(usuarioAValidar || {}, vendedor || {}),
      ...validarTelefonos(telefonos || []),
    ];
    if (errores.length > 0) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(400).json({ success: false, error: errores[0] });
    }

    // ── Hash de contraseña (opcional en update) ────────
    let userDataToUpdate = { ...usuario };
    if (usuario.password && usuario.password.trim() !== '') {
      userDataToUpdate.password_hash = await bcrypt.hash(usuario.password, SALT_ROUNDS);
    }

    // ── 1. Update USUARIO + VENDEDOR ──────────────────────
    const updatedVendedor = await VendedorModel.update(
      id,
      userDataToUpdate,
      vendedor,
      client
    );

    // ── 2. Update teléfonos ───────────────────────────────
    // Delete existing phones for the user
    await TelefonoModel.deleteByUsuarioId(id, client);

    // Re-insert phones
    let newTelefonos = [];
    if (telefonos && telefonos.length > 0) {
      const validTels = telefonos.filter(t => t.codigo_area && t.numero);
      if (validTels.length > 0) {
        newTelefonos = await TelefonoModel.createBatch(
          null,
          updatedVendedor.id,
          validTels,
          client
        );
      }
    }

    await client.query('COMMIT');

    return res.status(200).json({
      success: true,
      data: { ...updatedVendedor, telefonos: newTelefonos },
    });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
};

/**
 * DELETE /api/vendedores/:id
 */
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rol, id: userId } = req.user;

    // RBAC: Solo administrador o el mismo vendedor pueden eliminar
    if (rol !== 'Administrador' && id !== userId) {
      return res.status(403).json({ success: false, error: 'No tiene permisos para eliminar este vendedor.' });
    }

    const deleted = await VendedorModel.remove(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Vendedor no encontrado' });
    }
    return res.status(200).json({ success: true, data: deleted });
  } catch (err) {
    // Manejo especial para errores de llave foránea (ej. eliminar un vendedor con clientes)
    if (err.code === '23503') {
      return res.status(400).json({ success: false, error: 'No se puede eliminar este vendedor porque tiene clientes asignados o vendedores a su cargo.' });
    }
    next(err);
  }
};
