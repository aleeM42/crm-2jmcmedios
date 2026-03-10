// ==============================================
// router/cliente.router.js — Endpoints REST /api/clientes
// ==============================================

import { Router } from 'express';
import * as ClienteCtrl from '../controller/cliente.controller.js';

const router = Router();

router.get('/',      ClienteCtrl.getAll);
router.get('/:id',   ClienteCtrl.getById);
router.post('/',     ClienteCtrl.create);
router.put('/:id',   ClienteCtrl.update);
router.delete('/:id', ClienteCtrl.remove);

export default router;
