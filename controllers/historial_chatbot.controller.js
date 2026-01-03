import { saveChatHistoryService, getChatHistoryService } from '../services/historial_chatbot.service.js';

export const saveChatController = async (req, res) => {
    try {
        const id_usuario = req.user.id;
        const { id_chat, pregunta, respuesta } = req.body;
        const id = await saveChatHistoryService({ id_chat, id_usuario, pregunta, respuesta });
        res.status(201).json({ id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getChatHistoryController = async (req, res) => {
    try {
        const id_usuario = req.user.id;
        const history = await getChatHistoryService(id_usuario);
        res.json(history);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
