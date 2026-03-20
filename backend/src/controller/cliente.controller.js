// ==============================================
// controller/cliente.controller.js — Lógica de negocio CLIENTE
// ==============================================

import pool from '../config/db.js';
import * as ClienteModel from '../model/cliente.model.js';
import * as ContactoModel from '../model/contacto.model.js';
import * as MarcaModel from '../model/marca.model.js';
import * as TelefonoModel from '../model/telefono.model.js';

/**
 * GET /api/clientes
 * Query params: sector, estado, clasificacion, search, page, limit
 * Retorna lista paginada + KPIs.
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

    // RBAC: vendedor solo ve sus clientes
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
 * Detalle completo: cliente + sub-empresas + marcas + contactos + teléfonos.
 */
export const getById = async (req, res, next) => {
  try {
    const cliente = await ClienteModel.findById(req.params.id);

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado',
      });
    }

    return res.json({ success: true, data: cliente });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/clientes/empresas
 * Lista empresas disponibles para select de sub-empresas.
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
 * POST /api/clientes
 * Transacción atómica: CLIENTE → MARCAS → CONTACTO → TELEFONOS
 *
 * Body esperado:
 * {
 *   cliente: { nombre, razon_social, tipo, direccion, rif_fiscal, ... },
 *   contacto: { pri_nombre, pri_apellido, departamento, correo, rol, tipo },
 *   telefonos: [{ codigo_area, numero }],
 *   marcas: [{ nombre, observaciones? }]
 * }
 */
export const create = async (req, res, next) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { cliente, contacto, contactos, telefonos, marcas } = req.body;

    // 1. Crear cliente
    const newCliente = await ClienteModel.create(cliente, client);

    // 2. Crear marcas asociadas
    let newMarcas = [];
    if (marcas && marcas.length > 0) {
      newMarcas = await MarcaModel.createBatch(newCliente.id, marcas, client);
    }

    // 3. Crear contactos
    let insertedContactos = [];
    let newTelefonos = [];
    
    // Soportar tanto "contactos" (array) como "contacto" (objeto) para compatibilidad
    const reqContactos = contactos && Array.isArray(contactos) ? contactos : (contacto ? [contacto] : []);

    for (let i = 0; i < reqContactos.length; i++) {
      const cData = reqContactos[i];
      if (cData.pri_nombre) {
        cData.fk_cliente = newCliente.id;
        const insertedC = await ContactoModel.create(cData, client);

        // 4. Crear teléfonos asociados al contacto principal (el primero)
        if (i === 0 && telefonos && telefonos.length > 0) {
          newTelefonos = await TelefonoModel.createBatch(
            insertedC.id,
            req.user.id, // usuario autenticado
            telefonos,
            client
          );
          insertedC.telefonos = newTelefonos;
        } else {
          insertedC.telefonos = [];
        }
        insertedContactos.push(insertedC);
      }
    }

    await client.query('COMMIT');

    return res.status(201).json({
      success: true,
      data: {
        ...newCliente,
        marcas: newMarcas,
        contactos: insertedContactos,
      },
    });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
};
