import {
    getMetaAhorroDashboard, createMetaAhorro, deleteMetaAhorro,
    findMetaAhorroById, findMetasAhorroByUsuario, updateMetaAhorro
} from '../models/metahorro.model.js';
import { getContribucionesByMeta } from '../models/contribuciones.model.js';

export const getMetaAhorroDashboardService = async (userId) => {
    return await getMetaAhorroDashboard(userId);
};

export const createMetaAhorroService = async (userId, name, description, deadline, targetAmount) => {
    return await createMetaAhorro(userId, name, description, deadline, targetAmount);
};

export const deleteMetaAhorroService = async (userId, id_meta) => {
    return await deleteMetaAhorro(userId, id_meta);
};

export const findMetaAhorroByIdService = async (userId, id_meta) => {
    const rows = await findMetaAhorroById(userId, id_meta);
    const meta = rows[0];

    if (!meta) {
        throw new Error('Meta no encontrada');
    }
    const contribuciones = await getContribucionesByMeta(id_meta);
    return {
        id: meta.id_meta,
        name: meta.nombre_meta,
        targetAmount: Number(meta.monto_objetivo),
        currentAmount: Number(meta.monto_actual),
        deadline: meta.fecha_limite,
        description: meta.descripcion_meta,
        createdAt: meta.fecha_creacion,
        contributions: contribuciones.map(contribucion => ({
            id: contribucion.id_contribuciones,
            amount: Number(contribucion.monto),
            date: contribucion.fecha,
            note: contribucion.descripcion
        }))
    };
};

export const findMetasAhorroByUsuarioService = async (userId) => {
    return await findMetasAhorroByUsuario(userId);
};

export const updateMetaAhorroService = async (userId, id_meta, data) => {
    return await updateMetaAhorro(userId, id_meta, data);
};

export const createContribucionMetaService = async (userId, id_meta, monto) => {
    return await createContribucionMeta(userId, id_meta, monto);
};

export const deleteContribucionMetaService = async (userId, id_meta, id_contribucion) => {
    return await deleteContribucionMeta(userId, id_meta, id_contribucion);
};

export const updateContribucionMetaService = async (userId, id_meta, id_contribucion, monto) => {
    return await updateContribucionMeta(userId, id_meta, id_contribucion, monto);
};

