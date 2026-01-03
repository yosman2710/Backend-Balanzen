import { createHistorial, getHistorialByUsuario } from '../models/historial_chatbot.model.js';

export const saveChatHistoryService = async (data) => {
    return await createHistorial(data);
};

export const getChatHistoryService = async (id_usuario) => {
    return await getHistorialByUsuario(id_usuario);
};
