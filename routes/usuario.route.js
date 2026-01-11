import express from 'express';
import { getUserByIdController, updateUsuarioController } from '../controllers/usuario.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/:userId', verifyToken, getUserByIdController);
router.put('/:userId', verifyToken, updateUsuarioController);

export default router;