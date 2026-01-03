import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { register, login, verify } from '../controllers/auth.controller.js';

const router = Router();
console.log(typeof (register));

router.post('/register', register);

router.post('/login', login);

router.get('/verify', verifyToken, verify);

export default router;
