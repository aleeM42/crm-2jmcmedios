// ==============================================
// router/visita.router.js — Endpoints REST /api/visitas (protegidos)
// ==============================================

import { Router } from 'express';
import * as VisitaCtrl from '../controller/visita.controller.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';

const router = Router();

const ROLES_VISITAS = ['Administrador', 'Director', 'Vendedor'];

router.get('/',      authenticate, authorize(...ROLES_VISITAS), VisitaCtrl.getAll);
router.get('/:id',   authenticate, authorize(...ROLES_VISITAS), VisitaCtrl.getById);
router.post('/',     authenticate, authorize(...ROLES_VISITAS), VisitaCtrl.create);
router.put('/:id',   authenticate, authorize(...ROLES_VISITAS), VisitaCtrl.update);
router.delete('/:id', authenticate, authorize(...ROLES_VISITAS), VisitaCtrl.remove);

export default router;
