import { loginUserService, registerUserService } from '../services/auth.service.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await loginUserService(email, password);
        res.status(200).json({
            ...user,
            message: 'Login exitoso'
        });
    } catch (err) {
        res.status(err.status || 500).json({
            error: err.message || 'Error del servidor'
        });
    }
};

export const register = async (req, res) => {
    const { nombre, email, password, fecha_nacimiento, genero, pais } = req.body;
    try {
        const userId = await registerUserService(nombre, email, password, fecha_nacimiento, genero, pais);
        res.status(201).json({ message: "Usuario creado correctamente", userId });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
    }
};

export const verify = (req, res) => {
    // req.user viene del middleware verifyToken
    res.json(req.user);
};