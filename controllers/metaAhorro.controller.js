import {
    getMetaAhorroDashboardService, createMetaAhorroService, deleteMetaAhorroService,
    findMetaAhorroByIdService, findMetasAhorroByUsuarioService, updateMetaAhorroService
} from '../services/metaAhorro.service.js';
import { createContribucionService, deleteContribucionService } from '../services/contribuciones.service.js';

export const getMetaAhorroDashboardController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const meta = await getMetaAhorroDashboardService(userId);
        if (!meta) {
            return res.status(404).json({ message: 'Meta no encontrada' });
        }
        res.json(meta);
    } catch (error) {
        console.error('Error al obtener la meta:', error);
        res.status(500).json({ message: 'Error al obtener la meta' });
    }
};

export const createMetaAhorroController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, description, deadline, targetAmount } = req.body;
        const id = await createMetaAhorroService(userId, name, description, deadline, targetAmount);
        res.status(201).json({ id });
    } catch (error) {
        console.error('Error al crear la meta:', error);
        res.status(500).json({ message: 'Error al crear la meta: ' + error });
    }
};

export const deleteMetaAhorroController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id_meta } = req.params;
        await deleteMetaAhorroService(userId, id_meta);
        res.json({ message: 'Meta eliminada' });
    } catch (error) {
        console.error('Error al eliminar la meta:', error);
        res.status(500).json({ message: 'Error al eliminar la meta' });
    }
};

export const findMetaAhorroByIdController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id_meta } = req.params;
        const meta = await findMetaAhorroByIdService(userId, id_meta);
        if (!meta) {
            return res.status(404).json({ message: 'Meta no encontrada' });
        }
        res.json(meta);
    } catch (error) {
        console.error('Error al obtener la meta:', error);
        res.status(500).json({ message: 'Error al obtener la meta' });
    }
};

export const createContribucionMetaController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id_meta } = req.params;
        const { amount, note } = req.body;
        console.log(userId, id_meta, amount, note);
        const id = await createContribucionService(userId, id_meta, amount, note);
        res.status(201).json({ id });
    } catch (error) {
        console.error('Error al crear la contribución:', error);
        res.status(500).json({ message: 'Error al crear la contribución' });
    }
};

export const updateContribucionMetaController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id_meta } = req.params;
        const { id_contribucion } = req.params;
        const { monto } = req.body;
        const meta = await updateContribucionMetaService(userId, id_meta, id_contribucion, monto);
        if (!meta) {
            return res.status(404).json({ message: 'Meta no encontrada' });
        }
        res.json(meta);
    } catch (error) {
        console.error('Error al actualizar la meta:', error);
        res.status(500).json({ message: 'Error al actualizar la meta' });
    }
};



export const deleteContribucionMetaController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id_meta, id_contribucion } = req.params;
        console.log(userId, id_meta, id_contribucion);
        await deleteContribucionService(userId, id_meta, id_contribucion);
        res.json({ message: 'Contribución eliminada' });
    } catch (error) {
        console.error('Error al eliminar la contribución:', error);
        res.status(500).json({ message: 'Error al eliminar la contribución' });
    }
};

export const findMetasAhorroByUsuarioController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const metas = await findMetasAhorroByUsuarioService(userId);
        res.json(metas);
    } catch (error) {
        console.error('Error al obtener las metas:', error);
        res.status(500).json({ message: 'Error al obtener las metas' });
    }
};

export const updateMetaAhorroController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id_meta } = req.params;
        const { nombre_meta, monto_actual, monto_objetivo } = req.body;
        const meta = await updateMetaAhorroService(userId, id_meta, { nombre_meta, monto_actual, monto_objetivo });
        if (!meta) {
            return res.status(404).json({ message: 'Meta no encontrada' });
        }
        res.json(meta);
    } catch (error) {
        console.error('Error al actualizar la meta:', error);
        res.status(500).json({ message: 'Error al actualizar la meta' });
    }
};
