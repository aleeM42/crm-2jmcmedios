// ==============================================
// oportunidad.router.js — Rutas de Oportunidades (Pipeline)
// ==============================================
import { Router } from 'express';
import * as OportunidadController from '../controller/oportunidad.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', OportunidadController.getAll);
router.get('/:id', OportunidadController.getById);
router.post('/', OportunidadController.create);
router.put('/:id', OportunidadController.update);
router.delete('/:id', OportunidadController.remove);

export default router;
