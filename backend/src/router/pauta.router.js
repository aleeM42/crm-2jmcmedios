// ==============================================
// pauta.router.js — Rutas de Pautas
// ==============================================
import { Router } from 'express';
import * as PautaController from '../controller/pauta.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// Todas las rutas protegidas por JWT
router.use(authenticate);

router.post('/', PautaController.create);
router.get('/', PautaController.getAll);
router.get('/:id', PautaController.getById);

export default router;
