import { createContribucion, getContribucionesByMeta, deleteContribucion } from '../models/contribuciones.model.js';

export const createContribucionService = async (userId, id_meta, amount, note) => {
    return await createContribucion(userId, id_meta, amount, note);
};

export const getContribucionesByMetaService = async (userId, id_meta) => {
    return await getContribucionesByMeta(userId, id_meta);
};

export const deleteContribucionService = async (userId, id_meta, id_contribucion) => {
    return await deleteContribucion(userId, id_meta, id_contribucion);
};
