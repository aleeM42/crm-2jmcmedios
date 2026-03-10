// ==============================================
// router/visita.router.js — Endpoints REST /api/visitas
// ==============================================

import { Router } from 'express';
import * as VisitaCtrl from '../controller/visita.controller.js';

const router = Router();

router.get('/',      VisitaCtrl.getAll);
router.get('/:id',   VisitaCtrl.getById);
router.post('/',     VisitaCtrl.create);
router.put('/:id',   VisitaCtrl.update);
router.delete('/:id', VisitaCtrl.remove);

export default router;
