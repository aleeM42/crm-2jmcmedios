// ==============================================
// router/gastoMarketing.router.js — Endpoints REST /api/gastos-marketing
// ==============================================

import { Router } from 'express';
import * as GastoMktCtrl from '../controller/gastoMarketing.controller.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';

const router = Router();

const ROLES = ['Administrador', 'Director', 'Vendedor'];

router.get('/',    authenticate, authorize(...ROLES), GastoMktCtrl.getAll);
router.get('/:id', authenticate, authorize(...ROLES), GastoMktCtrl.getById);
router.post('/',   authenticate, authorize(...ROLES), GastoMktCtrl.create);

export default router;
