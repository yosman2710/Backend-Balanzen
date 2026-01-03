import { Router } from 'express';
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createCategoriaController,
  deleteCategoriaController,
  getCategoriasByNameController,
  getCategoriaByIdController,
  getCategoriasUserController,
} from '../controllers/categoria.controller.js';

const router = Router();

router.post('/', verifyToken, createCategoriaController);
router.get('/buscar', verifyToken, getCategoriasByNameController);
router.get('/:id_categoria', verifyToken, getCategoriaByIdController);
router.delete('/:id_categoria', verifyToken, deleteCategoriaController);
router.get('/', verifyToken, getCategoriasUserController);
export default router;
