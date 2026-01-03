import { createAlerta, getAlertasByUsuario, deleteAlerta } from '../models/alertas.model.js';

export const createAlertaService = async (data) => {
    return await createAlerta(data);
};

export const getAlertasByUsuarioService = async (id_usuario) => {
    return await getAlertasByUsuario(id_usuario);
};

export const deleteAlertaService = async (id_alerta) => {
    return await deleteAlerta(id_alerta);
};
