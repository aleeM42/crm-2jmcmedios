// ==============================================
// router/cliente.router.js — Endpoints REST /api/clientes (protegidos)
// ==============================================

import { Router } from 'express';
import * as ClienteCtrl from '../controller/cliente.controller.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';
import validateBody from '../middleware/validateBody.js';

const router = Router();

// Todos los endpoints requieren autenticación + roles permitidos
const ROLES_CLIENTES = ['Administrador', 'Director', 'Vendedor'];

// GET  /api/clientes           — Lista paginada con filtros + KPIs
router.get('/', authenticate, authorize(...ROLES_CLIENTES), ClienteCtrl.getAll);

// GET  /api/clientes/empresas  — Lista de empresas para select de sub-empresas
router.get('/empresas', authenticate, authorize(...ROLES_CLIENTES), ClienteCtrl.getEmpresas);

// GET  /api/clientes/:id/marcas  — Marcas del cliente (para select en pauta)
router.get('/:id/marcas', authenticate, authorize(...ROLES_CLIENTES), ClienteCtrl.getMarcasByCliente);

// GET  /api/clientes/:id       — Detalle completo
router.get('/:id', authenticate, authorize(...ROLES_CLIENTES), ClienteCtrl.getById);

// POST /api/clientes           — Crear cliente (transacción atómica)
router.post(
  '/',
  authenticate,
  authorize(...ROLES_CLIENTES),
  validateBody([
    'cliente.nombre',
    'cliente.razon_social',
    'cliente.tipo',
    'cliente.direccion',
    'cliente.rif_fiscal',
    'cliente.clasificacion',
    'cliente.sector',
    'cliente.estado',
    'cliente.fk_lugar',
    'cliente.fk_vendedor',
  ]),
  ClienteCtrl.create
);

// POST /api/clientes/:id/marcas — Crear una marca para un cliente
router.post(
  '/:id/marcas',
  authenticate,
  authorize(...ROLES_CLIENTES),
  ClienteCtrl.createMarca
);

export default router;
