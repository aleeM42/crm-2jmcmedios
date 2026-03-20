// ==============================================
// router/dashboard.router.js — Endpoints REST /api/dashboard (protegido)
// ==============================================

import { Router } from 'express';
import * as DashboardCtrl from '../controller/dashboard.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// GET /api/dashboard/resumen — Métricas agregadas del CRM
router.get('/resumen', authenticate, DashboardCtrl.getResumen);

export default router;
