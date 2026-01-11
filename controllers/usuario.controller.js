import { getUserByIdService, updateUsuarioService } from "../services/usuario.service.js";

export const getUserByIdController = async (req, res) => {
    const userId = req.user.userId;
    try {
        const user = await getUserByIdService(userId);
        res.status(200).json({
            ...user,
            message: 'Usuario obtenido correctamente'
        });
    } catch (err) {
        res.status(err.status || 500).json({
            error: err.message || 'Error del servidor'
        });
    }
};

export const updateUsuarioController = async (req, res) => {
    const userId = req.user.userId;
    const { nombre, email, fecha_nacimiento, genero, pais } = req.body;
    try {
        const user = await updateUsuarioService(userId, { nombre, email, fecha_nacimiento, genero, pais });
        res.status(200).json({
            ...user,
            message: 'Usuario actualizado correctamente'
        });
    } catch (err) {
        res.status(err.status || 500).json({
            error: err.message || 'Error del servidor'
        });
    }
};