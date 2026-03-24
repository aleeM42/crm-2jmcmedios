// ==============================================
// router/cobertura.router.js — Endpoints REST /api/coberturas
// ==============================================

import { Router } from 'express';
import * as CoberturaCtrl from '../controller/cobertura.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

router.get('/', authenticate, CoberturaCtrl.getAll);

export default router;
