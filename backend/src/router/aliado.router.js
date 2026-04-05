// ==============================================
// aliado.router.js — Rutas de Aliados Comerciales
// ==============================================
import { Router } from 'express';
import * as AliadoController from '../controller/aliado.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// Todas las rutas protegidas por JWT
router.use(authenticate);

router.get('/', AliadoController.getAll);
router.get('/:id', AliadoController.getById);
router.post('/', AliadoController.create);
router.put('/:id', AliadoController.update);
router.delete('/:id', AliadoController.remove);

export default router;
