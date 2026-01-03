import { Router } from 'express';
import { getBudgetsWithProgressController } from '../controllers/datosbudget.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.get('/', verifyToken, getBudgetsWithProgressController); // GET /budgets/current

export default router;
