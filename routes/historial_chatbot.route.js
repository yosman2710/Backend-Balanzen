import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { saveChatController, getChatHistoryController } from '../controllers/historial_chatbot.controller.js';

const router = Router();

router.post('/', verifyToken, saveChatController);
router.get('/', verifyToken, getChatHistoryController);

export default router;
