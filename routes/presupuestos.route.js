import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
  createPresupuestoController,
  deletePresupuestoController,
  updatePresupuestoController,
  getPresupuestosController,
  getPresupuestosByFechaController,
  getPresupuestosByCategoriaController,
  getPresupuestoByIdController
} from '../controllers/presupuestos.controller.js';

const router = Router();

// Crear presupuesto
router.post('/', verifyToken, createPresupuestoController);

// Buscar por id
router.get('/:id_presupuesto', verifyToken, getPresupuestoByIdController);

// Eliminar
router.delete('/:id_presupuesto', verifyToken, deletePresupuestoController);

// Actualizar
router.put('/:id_presupuesto', verifyToken, updatePresupuestoController);

// Listar todos (usuario)
router.get('/', verifyToken, getPresupuestosController);

// Listar por fecha
router.get('/fecha', verifyToken, getPresupuestosByFechaController); // ?fecha=YYYY-MM-DD

// Listar por categoría
router.get('/categoria/:id_categoria', verifyToken, getPresupuestosByCategoriaController);

export default router;
