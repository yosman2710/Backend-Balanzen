import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
    createAlertaController,
    getAlertasController,
    deleteAlertaController
} from '../controllers/alertas.controller.js';

const router = Router();

router.post('/', verifyToken, createAlertaController);
router.get('/', verifyToken, getAlertasController);
router.delete('/:id_alerta', verifyToken, deleteAlertaController);

export default router;
