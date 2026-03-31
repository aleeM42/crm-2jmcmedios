// ==============================================
// controller/cliente.controller.js — Lógica de negocio CLIENTE
// ==============================================

import pool from '../config/db.js';
import * as ClienteModel from '../model/cliente.model.js';
import * as ContactoModel from '../model/contacto.model.js';
import * as MarcaModel from '../model/marca.model.js';
import * as TelefonoModel from '../model/telefono.model.js';

// ─── Helpers de validación ────────────────────────────────
const RIF_REGEX    = /^[JGVP]\d{9}$/;
const EMAIL_REGEX  = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX  = /^\d{7}$/;

function validarCliente(data) {
  const errores = [];
  if (!data.nombre?.trim())       errores.push('El nombre comercial del cliente es obligatorio.');
  if (!data.razon_social?.trim()) errores.push('La razón social es obligatoria.');
  if (!data.rif_fiscal?.trim())   errores.push('El RIF fiscal es obligatorio.');
  if (data.rif_fiscal && !RIF_REGEX.test(data.rif_fiscal))
    errores.push('El RIF fiscal debe comenzar con J, G, V o P seguido de exactamente 9 dígitos (ej: J123456789).');
  if (!data.fk_lugar)    errores.push('Debe seleccionar la ubicación (estado) del cliente.');
  if (!data.clasificacion?.trim()) errores.push('La clasificación del cliente es obligatoria.');
  if (!data.sector?.trim())        errores.push('El sector del cliente es obligatorio.');
  if (data.clasificacion === 'Agencia' && !data.nombre_agencia?.trim())
    errores.push('El nombre de la agencia es obligatorio cuando la clasificación es Agencia.');
  return errores;
}

function validarContacto(c, idx) {
  const errores = [];
  const label = `Contacto ${idx + 1}`;
  if (!c.pri_nombre?.trim())    errores.push(`${label}: el primer nombre es obligatorio.`);
  if (!c.pri_apellido?.trim())  errores.push(`${label}: el primer apellido es obligatorio.`);
  if (!c.departamento?.trim())  errores.push(`${label}: el departamento es obligatorio.`);
  if (!c.rol?.trim())           errores.push(`${label}: el rol es obligatorio.`);
  if (c.correo && !EMAIL_REGEX.test(c.correo))
    errores.push(`${label}: el correo electrónico no tiene un formato válido (ej: nombre@dominio.com).`);
  return errores;
}

function validarTelefonos(telefonos) {
  const errores = [];
  if (!telefonos || telefonos.length === 0) return errores; // Teléfono es opcional
  telefonos.forEach((t, i) => {
    if (t.codigo_area || t.numero) {
      if (!t.codigo_area) errores.push(`Teléfono ${i + 1}: falta el código de área.`);
      if (!t.numero || !PHONE_REGEX.test(t.numero))
        errores.push(`Teléfono ${i + 1}: el número debe tener exactamente 7 dígitos numéricos.`);
    }
  });
  return errores;
}

// ─── Controladores ────────────────────────────────────────

/**
 * GET /api/clientes
 * Query params: sector, estado, clasificacion, search, page, limit
 */
export const getAll = async (req, res, next) => {
  try {
    const filters = {
      sector: req.query.sector,
      estado: req.query.estado,
      clasificacion: req.query.clasificacion,
      search: req.query.search,
      page: req.query.page,
      limit: req.query.limit,
    };

    const vendedorId = req.user.rol === 'Vendedor' ? req.user.id : null;

    const [result, kpis] = await Promise.all([
      ClienteModel.findAll(filters, vendedorId),
      ClienteModel.countByEstado(vendedorId),
    ]);

    return res.json({
      success: true,
      data: {
        clientes: result.clientes,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: Math.ceil(result.total / result.limit),
        },
        kpis: {
          total: parseInt(kpis.total, 10),
          activos: parseInt(kpis.activos, 10),
          inactivos: parseInt(kpis.inactivos, 10),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/clientes/:id
 */
export const getById = async (req, res, next) => {
  try {
    const cliente = await ClienteModel.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ success: false, error: 'Cliente no encontrado' });
    }
    return res.json({ success: true, data: cliente });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/clientes/empresas
 */
export const getEmpresas = async (req, res, next) => {
  try {
    const empresas = await ClienteModel.findEmpresas();
    return res.json({ success: true, data: empresas });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/clientes/:id/marcas
 */
export const getMarcasByCliente = async (req, res, next) => {
  try {
    const marcas = await MarcaModel.findByClienteId(req.params.id);
    return res.json({ success: true, data: marcas });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/clientes
 * Transacción atómica: CLIENTE → MARCAS → CONTACTO → TELEFONOS
 */
export const create = async (req, res, next) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { cliente, contacto, contactos, telefonos, marcas } = req.body;

    // ── Validaciones de negocio ──────────────────────────
    const errCliente = validarCliente(cliente || {});
    if (errCliente.length > 0) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(400).json({ success: false, error: errCliente[0] });
    }

    // Normalizar RIF a mayúsculas
    if (cliente.rif_fiscal) cliente.rif_fiscal = cliente.rif_fiscal.toUpperCase();

    const reqContactos = contactos && Array.isArray(contactos)
      ? contactos
      : (contacto ? [contacto] : []);

    const contactosActivos = reqContactos.filter(c => c.pri_nombre);

    for (let i = 0; i < contactosActivos.length; i++) {
      const errC = validarContacto(contactosActivos[i], i);
      if (errC.length > 0) {
        await client.query('ROLLBACK');
        client.release();
        return res.status(400).json({ success: false, error: errC[0] });
      }
    }

    const errTel = validarTelefonos(telefonos);
    if (errTel.length > 0) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(400).json({ success: false, error: errTel[0] });
    }

    // ── 1. Crear cliente ─────────────────────────────────
    const newCliente = await ClienteModel.create(cliente, client);

    // ── 2. Crear marcas ──────────────────────────────────
    let newMarcas = [];
    if (marcas && marcas.length > 0) {
      newMarcas = await MarcaModel.createBatch(newCliente.id, marcas, client);
    }

    // ── 3. Crear contactos y teléfonos ───────────────────
    let insertedContactos = [];
    let newTelefonos = [];

    for (let i = 0; i < contactosActivos.length; i++) {
      const cData = { ...contactosActivos[i], fk_cliente: newCliente.id };
      const insertedC = await ContactoModel.create(cData, client);

      if (i === 0 && telefonos && telefonos.length > 0) {
        const validTels = telefonos.filter(t => t.codigo_area && t.numero);
        newTelefonos = await TelefonoModel.createBatch(
          insertedC.id,
          req.user.id,
          validTels,
          client
        );
        insertedC.telefonos = newTelefonos;
      } else {
        insertedC.telefonos = [];
      }
      insertedContactos.push(insertedC);
    }

    // ── 4. Negociación opcional ──────────────────────────
    const { negociacion } = req.body;
    if (negociacion && negociacion.monto_negociacion && negociacion.fecha_inicio) {
      await client.query(
        `INSERT INTO HISTORICO_NEGOCIACIONES (fecha_inicio, fecha_fin, monto_negociacion, total_cunas, fk_cliente)
         VALUES ($1, $2, $3, $4, $5)`,
        [negociacion.fecha_inicio, negociacion.fecha_fin || null, negociacion.monto_negociacion, parseInt(negociacion.total_cunas, 10) || 0, newCliente.id]
      );
    }

    await client.query('COMMIT');

    return res.status(201).json({
      success: true,
      data: { ...newCliente, marcas: newMarcas, contactos: insertedContactos },
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ [create cliente] ERROR:', err.message, '| Code:', err.code, '| Detail:', err.detail);
    next(err);
  } finally {
    client.release();
  }
};
