// ==============================================
// router/vendedor.router.js — Endpoints REST /api/vendedores (protegidos + RBAC)
// ==============================================

import { Router } from 'express';
import * as VendedorCtrl from '../controller/vendedor.controller.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';
import validateBody from '../middleware/validateBody.js';

const router = Router();

const ROLES_LECTURA = ['Administrador', 'Director', 'Vendedor', 'Gestor de Pautas'];

// GET  /api/vendedores             — Lista + KPIs (todos los roles)
router.get('/', authenticate, authorize(...ROLES_LECTURA), VendedorCtrl.getAll);

// GET  /api/vendedores/directores  — Lista de directores para select
router.get('/directores', authenticate, authorize(...ROLES_LECTURA), VendedorCtrl.getDirectores);

// GET  /api/vendedores/:id         — Detalle (RBAC granular en controller)
router.get('/:id', authenticate, authorize(...ROLES_LECTURA), VendedorCtrl.getById);

// POST /api/vendedores             — Crear vendedor (solo Admin)
router.post(
  '/',
  authenticate,
  authorize('Administrador'),
  validateBody([
    'usuario.primer_nombre',
    'usuario.primer_apellido',
    'usuario.correo',
    'usuario.nombre_usuario',
    'usuario.password',
    'usuario.rol',
    'vendedor.meta',
    'vendedor.tipo',
  ]),
  VendedorCtrl.create
);

// PUT  /api/vendedores/:id         — Editar vendedor
router.put(
  '/:id',
  authenticate,
  authorize('Administrador', 'Director', 'Vendedor'),
  validateBody([
    'usuario.primer_nombre',
    'usuario.primer_apellido',
    'usuario.correo',
    'usuario.nombre_usuario',
    'usuario.rol',
    'vendedor.meta',
    'vendedor.tipo',
  ]),
  VendedorCtrl.update
);

// DELETE /api/vendedores/:id       — Eliminar vendedor
router.delete('/:id', authenticate, authorize('Administrador', 'Director', 'Vendedor'), VendedorCtrl.remove);

export default router;
