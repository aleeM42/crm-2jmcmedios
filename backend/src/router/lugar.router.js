// ==============================================
// router/lugar.router.js — Endpoints REST /api/lugares
// ==============================================

import { Router } from 'express';
import * as LugarCtrl from '../controller/lugar.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// GET /api/lugares             — Todos los lugares
// GET /api/lugares?tipo=estado — Filtrar por tipo
// GET /api/lugares?padre_id=2  — Hijos de un lugar
router.get('/', authenticate, LugarCtrl.getAll);

export default router;
