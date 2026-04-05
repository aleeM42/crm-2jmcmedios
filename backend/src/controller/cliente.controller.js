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

/**
 * POST /api/clientes/:id/marcas
 * Crea una marca individual para un cliente existente.
 */
export const createMarca = async (req, res, next) => {
  try {
    const clienteId = req.params.id;
    const { nombre, observaciones } = req.body;

    if (!nombre?.trim()) {
      return res.status(400).json({ success: false, error: 'El nombre de la marca es obligatorio.' });
    }

    // Verificar que el cliente existe
    const cliente = await ClienteModel.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ success: false, error: 'Cliente no encontrado.' });
    }

    const nuevaMarca = await MarcaModel.createOne(clienteId, { nombre: nombre.trim(), observaciones });
    return res.status(201).json({ success: true, data: nuevaMarca });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/clientes/:id
 * Transacción atómica: CLIENTE → CONTACTOS (update/create/delete) → TELEFONOS
 */
export const update = async (req, res, next) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const clienteId = parseInt(req.params.id, 10);
    const { cliente, contactos, telefonos } = req.body;

    // ── Verificar que el cliente existe ──────────────────
    const existente = await ClienteModel.findById(clienteId);
    if (!existente) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(404).json({ success: false, error: 'Cliente no encontrado.' });
    }

    // ── Validaciones de negocio ──────────────────────────
    const errCliente = validarCliente(cliente || {});
    if (errCliente.length > 0) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(400).json({ success: false, error: errCliente[0] });
    }

    // Normalizar RIF a mayúsculas
    if (cliente.rif_fiscal) cliente.rif_fiscal = cliente.rif_fiscal.toUpperCase();

    // ── 1. Actualizar cliente ────────────────────────────
    const updatedCliente = await ClienteModel.update(clienteId, cliente, client);
    if (!updatedCliente) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(404).json({ success: false, error: 'No se pudo actualizar el cliente.' });
    }

    // ── 2. Sincronizar contactos ─────────────────────────
    let updatedContactos = [];

    if (contactos && Array.isArray(contactos)) {
      const contactosActivos = contactos.filter(c => c.pri_nombre);

      // Validar contactos
      for (let i = 0; i < contactosActivos.length; i++) {
        const errC = validarContacto(contactosActivos[i], i);
        if (errC.length > 0) {
          await client.query('ROLLBACK');
          client.release();
          return res.status(400).json({ success: false, error: errC[0] });
        }
      }

      // Validar teléfonos
      const errTel = validarTelefonos(telefonos);
      if (errTel.length > 0) {
        await client.query('ROLLBACK');
        client.release();
        return res.status(400).json({ success: false, error: errTel[0] });
      }

      // IDs de contactos enviados que ya existen (para actualizar)
      const contactosConId = contactosActivos.filter(c => c.id);
      const contactosSinId = contactosActivos.filter(c => !c.id);
      const idsEnviados = contactosConId.map(c => c.id);

      // IDs actuales en la BD para este cliente
      const contactosActuales = existente.contactos || [];
      const idsActuales = contactosActuales.map(c => c.id);

      // Contactos eliminados (estaban en BD pero no vinieron en el request)
      const idsAEliminar = idsActuales.filter(id => !idsEnviados.includes(id));
      if (idsAEliminar.length > 0) {
        await ContactoModel.deleteByIds(idsAEliminar, client);
      }

      // Actualizar contactos existentes
      for (const cData of contactosConId) {
        const updated = await ContactoModel.update(cData.id, cData, client);

        // Sincronizar teléfonos del contacto: delete + re-insert
        await TelefonoModel.deleteByContactoId(cData.id, client);
        const telDeContacto = (cData.telefonos || []).filter(t => t.codigo_area && t.numero);
        let newTels = [];
        if (telDeContacto.length > 0) {
          newTels = await TelefonoModel.createBatch(cData.id, req.user.id, telDeContacto, client);
        }

        updatedContactos.push({ ...updated, telefonos: newTels });
      }

      // Crear contactos nuevos
      for (let i = 0; i < contactosSinId.length; i++) {
        const cData = { ...contactosSinId[i], fk_cliente: clienteId };
        const inserted = await ContactoModel.create(cData, client);

        // Teléfonos para contactos nuevos: usar el array global solo para el primer contacto nuevo si no tiene telefonos propios
        const telDeContacto = (cData.telefonos || []).filter(t => t.codigo_area && t.numero);
        let newTels = [];
        if (telDeContacto.length > 0) {
          newTels = await TelefonoModel.createBatch(inserted.id, req.user.id, telDeContacto, client);
        } else if (i === 0 && contactosConId.length === 0 && telefonos && telefonos.length > 0) {
          // Si no hay contactos existentes, asignar teléfonos globales al primer contacto nuevo
          const validTels = telefonos.filter(t => t.codigo_area && t.numero);
          if (validTels.length > 0) {
            newTels = await TelefonoModel.createBatch(inserted.id, req.user.id, validTels, client);
          }
        }

        updatedContactos.push({ ...inserted, telefonos: newTels });
      }
    }

    // ── 3. Negociación (Histórico) ───────────────────────
    const { negociacion } = req.body;
    let finalNegociacion = null;
    if (negociacion && negociacion.monto_negociacion && negociacion.fecha_inicio) {
      if (negociacion.id) {
        // Actualizar existente
        const upNeg = await client.query(
          `UPDATE HISTORICO_NEGOCIACIONES
           SET fecha_inicio = $1, fecha_fin = $2, monto_negociacion = $3, total_cunas = $4
           WHERE id = $5 AND fk_cliente = $6
           RETURNING *`,
          [negociacion.fecha_inicio, negociacion.fecha_fin || null, negociacion.monto_negociacion, parseInt(negociacion.total_cunas, 10) || null, negociacion.id, clienteId]
        );
        finalNegociacion = upNeg.rows[0];
      } else {
        // Crear nuevo
        const inNeg = await client.query(
          `INSERT INTO HISTORICO_NEGOCIACIONES (fecha_inicio, fecha_fin, monto_negociacion, total_cunas, fk_cliente)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *`,
          [negociacion.fecha_inicio, negociacion.fecha_fin || null, negociacion.monto_negociacion, parseInt(negociacion.total_cunas, 10) || null, clienteId]
        );
        finalNegociacion = inNeg.rows[0];
      }
    }

    await client.query('COMMIT');

    return res.json({
      success: true,
      data: { ...updatedCliente, contactos: updatedContactos },
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ [update cliente] ERROR:', err.message, '| Code:', err.code, '| Detail:', err.detail);
    next(err);
  } finally {
    client.release();
  }
};

/**
 * DELETE /api/clientes/:id
 * Elimina un cliente. ON DELETE CASCADE se encarga de las tablas dependientes.
 */
export const remove = async (req, res, next) => {
  try {
    const clienteId = parseInt(req.params.id, 10);

    const deleted = await ClienteModel.deleteById(clienteId);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Cliente no encontrado.' });
    }

    return res.json({ success: true, data: { id: deleted.id } });
  } catch (err) {
    console.error('❌ [delete cliente] ERROR:', err.message, '| Code:', err.code, '| Detail:', err.detail);
    next(err);
  }
};
