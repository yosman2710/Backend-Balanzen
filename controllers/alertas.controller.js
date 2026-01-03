import { createAlertaService, getAlertasByUsuarioService, deleteAlertaService } from '../services/alertas.service.js';

export const createAlertaController = async (req, res) => {
    try {
        const id_usuario = req.user.id;
        const { id_presupuesto, tipo_alerta } = req.body;
        const id = await createAlertaService({ id_usuario, id_presupuesto, tipo_alerta });
        res.status(201).json({ id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAlertasController = async (req, res) => {
    try {
        const id_usuario = req.user.id;
        const alertas = await getAlertasByUsuarioService(id_usuario);
        res.json(alertas);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteAlertaController = async (req, res) => {
    try {
        const { id_alerta } = req.params;
        await deleteAlertaService(id_alerta);
        res.json({ message: 'Alerta eliminada' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
