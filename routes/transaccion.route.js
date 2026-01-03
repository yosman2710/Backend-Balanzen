// routes/transaccion.route.js
import express from 'express';
import {
    getTransaccionById,
    createTransaccion,
    deleteTransaccion,
    getTransaccionesByCategoriaNombre,
    getTransaccionesByCategoriaId,
    getTransaccionesByCategoriaTipo,
    getTransaccionesByNombre,
    updateTransaccion,
    getTransaccionesUser
} from '../controllers/transaccion.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/:id', verifyToken, getTransaccionById);
router.post('/', verifyToken, createTransaccion);
router.get('/', verifyToken, getTransaccionesUser);
router.delete('/:id', verifyToken, deleteTransaccion);
router.get('/categoria/:id_categoria', verifyToken, getTransaccionesByCategoriaId);
router.get('/categoria', verifyToken, getTransaccionesByCategoriaNombre);   // ?nombre_categoria=
router.get('/tipo', verifyToken, getTransaccionesByCategoriaTipo);         // ?tipo=
router.get('/nombre', verifyToken, getTransaccionesByNombre);              // ?nombre_transaccion=
router.put('/:id', verifyToken, updateTransaccion);

export default router;
