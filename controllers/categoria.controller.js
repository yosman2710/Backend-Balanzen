import {
  createCategoriaService,
  deleteCategoriaService,
  getCategoriasByNameService,
  getCategoriaByIdService,
  getCategoriasUserService,
} from '../services/categoria.service.js';

export const createCategoriaController = async (req, res) => {
  try {
    const { name, type, color, icon } = req.body;

    const userId = req.user.userId;
    const id = await createCategoriaService(name, type, userId, color, icon);
    res.status(201).json({ id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCategoriaController = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const userId = req.user.userId;
    await deleteCategoriaService(id_categoria, userId);
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCategoriasByNameController = async (req, res) => {
  try {
    const { nombre } = req.query;
    const userId = req.user.userId;
    const rows = await getCategoriasByNameService(nombre || '', userId);
    res.json(rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCategoriaByIdController = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const userId = req.user.userId;
    const cat = await getCategoriaByIdService(id_categoria, userId);
    if (!cat) return res.status(404).json({ error: 'No encontrada' });
    res.json(cat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCategoriasUserController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const rows = await getCategoriasUserService(userId);
    res.json(rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

