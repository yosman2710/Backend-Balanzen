import jwt from 'jsonwebtoken';
import md5 from 'md5';
import { findUserByEmail, createUsuario, updatePassword } from '../models/usuarios.model.js';

export const registerUserService = async (nombre, email, password, fecha_nacimiento, genero, pais) => {
    if (!nombre || !email || !password) {
        throw { status: 400, message: 'Todos los campos son requeridos' };
    }

    const existingUsers = await findUserByEmail(email);
    if (existingUsers.length > 0) {
        throw { status: 400, message: 'Correo ya registrado' };
    }

    const hashedPassword = md5(password);

    return await createUsuario({
        nombre,
        email,
        password: hashedPassword,
        fecha_nacimiento,
        genero,
        pais
    });
};

export const loginUserService = async (email, password) => {
    if (!email || !password) {
        throw { status: 400, message: 'Email y contraseña son requeridos' };
    }

    const users = await findUserByEmail(email);
    const hashedPassword = md5(password);

    if (users.length === 0 || users[0].password !== hashedPassword) {
        throw { status: 401, message: 'Credenciales inválidas' };
    }

    const user = users[0];
    const userId = user.id || user.id_usuario;

    const token = jwt.sign(
        { userId: userId, nombre: user.nombre, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    return {
        id: userId,
        nombre: user.nombre,
        email: user.email,
        token: token,
    };
};

export const updatePasswordUserService = async (id, password) => {
    const hashedPassword = md5(password);
    return await updatePassword(id, hashedPassword);
};

