// ==============================================
// router/auth.router.js — Endpoints de autenticación
// ==============================================

import { Router } from 'express';
import * as AuthCtrl from '../controller/auth.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// POST /api/auth/login  — público
router.post('/login', AuthCtrl.login);

// GET  /api/auth/me     — protegido (requiere JWT)
router.get('/me', authenticate, AuthCtrl.me);

export default router;
