// ==============================================
// router/gasto.router.js — Endpoints REST /api/gastos (protegidos)
// ==============================================

import { Router } from 'express';
import * as GastoCtrl from '../controller/gasto.controller.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';

const router = Router();

const ROLES_GASTOS = ['Administrador', 'Director', 'Vendedor'];

router.get('/',      authenticate, authorize(...ROLES_GASTOS), GastoCtrl.getAll);
router.get('/:id',   authenticate, authorize(...ROLES_GASTOS), GastoCtrl.getById);
router.post('/',     authenticate, authorize(...ROLES_GASTOS), GastoCtrl.create);
router.put('/:id',   authenticate, authorize(...ROLES_GASTOS), GastoCtrl.update);
router.delete('/:id', authenticate, authorize(...ROLES_GASTOS), GastoCtrl.remove);

export default router;
