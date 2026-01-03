import { Router } from 'express';
import { getDashboardData } from '../controllers/datosDashboard.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { getMetaAhorroDashboardController } from '../controllers/metaAhorro.controller.js';

const router = Router();

router.get('/', verifyToken, getDashboardData);
router.get('/metaAhorro', verifyToken, getMetaAhorroDashboardController);

export default router;
