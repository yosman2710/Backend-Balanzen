import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import {
    findMetaAhorroByIdController, findMetasAhorroByUsuarioController,
    updateMetaAhorroController, createMetaAhorroController, deleteMetaAhorroController,
    createContribucionMetaController, deleteContribucionMetaController
} from "../controllers/metaAhorro.controller.js";

const router = Router();

// Crear meta
router.post('/', verifyToken, createMetaAhorroController);
// Buscar meta por ID
router.get('/:id_meta', verifyToken, findMetaAhorroByIdController);
// Crear contribución a meta
router.post('/:id_meta/contribuciones', verifyToken, createContribucionMetaController);
// Eliminar contribución a meta
router.delete('/:id_meta/contribuciones/:id_contribucion', verifyToken, deleteContribucionMetaController);
// Eliminar meta
router.delete('/:id_meta', verifyToken, deleteMetaAhorroController);
// Actualizar meta
router.put('/:id_meta', verifyToken, updateMetaAhorroController);

// Listar todos (usuario)
router.get('/', verifyToken, findMetasAhorroByUsuarioController);


export default router;
