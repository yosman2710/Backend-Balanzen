// controllers/transaccion.controller.js
import {
    getTransaccionByIdService,
    createTransaccionService,
    deleteTransaccionService,
    getTransaccionesByCategoriaNombreService,
    getTransaccionesByCategoriaIdService,
    getTransaccionesByCategoriaTipoService,
    getTransaccionesByNombreService,
    updateTransaccionService,
    getTransaccionesUserService
} from '../services/transaccion.service.js';

// Obtener una transacción por ID
export const getTransaccionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaccion = await getTransaccionByIdService(id);
        res.json(transaccion);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

// Crear una nueva transacción
export const createTransaccion = async (req, res) => {
    try {
        const userId = req.user.userId;
        const nuevaTransaccion = await createTransaccionService({
            ...req.body,
            id_usuario: userId,
        });
        res.status(201).json({ id: nuevaTransaccion });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

// Eliminar una transacción por ID
export const deleteTransaccion = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteTransaccionService(id);
        res.json(result);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

// Buscar transacciones por ID de categoría
export const getTransaccionesByCategoriaId = async (req, res) => {
    try {
        const { id_categoria } = req.params;
        const userId = req.user.userId;
        const transacciones = await getTransaccionesByCategoriaIdService(id_categoria, userId);
        res.json(transacciones);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

// Buscar transacciones por nombre de categoría
export const getTransaccionesByCategoriaNombre = async (req, res) => {
    try {
        const { nombre_categoria } = req.query;
        const transacciones = await getTransaccionesByCategoriaNombreService(nombre_categoria);
        res.json(transacciones);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

// Buscar transacciones por tipo de categoría
export const getTransaccionesByCategoriaTipo = async (req, res) => {
    try {
        const { tipo } = req.query;
        const transacciones = await getTransaccionesByCategoriaTipoService(tipo);
        res.json(transacciones);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

// Buscar transacciones por nombre_transaccion
export const getTransaccionesByNombre = async (req, res) => {
    try {
        const { nombre_transaccion } = req.query;
        const transacciones = await getTransaccionesByNombreService(nombre_transaccion);
        res.json(transacciones);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

// Actualizar una transacción existente
export const updateTransaccion = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // Debe tener todos los campos necesarios
        const result = await updateTransaccionService(id, updates);
        res.json(result);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

// Listar todas (usuario)
export const getTransaccionesUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const transacciones = await getTransaccionesUserService(userId);
        res.json(transacciones);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};
