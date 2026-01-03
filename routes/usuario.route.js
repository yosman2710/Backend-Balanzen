import express from 'express';
import { getUserByIdController } from '../controllers/usuario.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/:userId', verifyToken, getUserByIdController);

export default router;