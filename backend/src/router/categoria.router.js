// ==============================================
// router/categoria.router.js — Endpoints REST /api/categorias
// ==============================================

import { Router } from 'express';
import * as CategoriaCtrl from '../controller/categoria.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

router.get('/', authenticate, CategoriaCtrl.getAll);

export default router;
