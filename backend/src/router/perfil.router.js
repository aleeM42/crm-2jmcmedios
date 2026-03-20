// ==============================================
// router/perfil.router.js — Endpoints REST /api/perfil (protegido)
// ==============================================

import { Router } from 'express';
import * as PerfilCtrl from '../controller/perfil.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// GET /api/perfil — Datos del usuario logueado
router.get('/', authenticate, PerfilCtrl.getPerfil);

export default router;
