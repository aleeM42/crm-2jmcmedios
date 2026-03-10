// ==============================================
// router/contacto.router.js — Endpoints REST /api/contactos
// ==============================================

import { Router } from 'express';
import * as ContactoCtrl from '../controller/contacto.controller.js';

const router = Router();

router.get('/',              ContactoCtrl.getAll);
router.get('/:id',           ContactoCtrl.getById);
router.get('/cliente/:clienteId', ContactoCtrl.getByCliente);
router.post('/',             ContactoCtrl.create);
router.put('/:id',           ContactoCtrl.update);
router.delete('/:id',        ContactoCtrl.remove);

export default router;
