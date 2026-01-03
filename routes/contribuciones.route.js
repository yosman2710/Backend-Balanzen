import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
    createContribucionController,
    getContribucionesByMetaController,
    deleteContribucionController
} from '../controllers/contribuciones.controller.js';

const router = Router();

router.post('/', verifyToken, createContribucionController);
router.get('/meta/:id_meta', verifyToken, getContribucionesByMetaController);
router.delete('/:id', verifyToken, deleteContribucionController);

export default router;
