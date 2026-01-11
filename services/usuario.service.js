import { getUserByIdFromDB, updateUsuario } from "../models/usuarios.model.js";

export const getUserByIdService = async (id) => {
    return await getUserByIdFromDB(id);
};

export const updateUsuarioService = async (id, { nombre, email, fecha_nacimiento, genero, pais }) => {
    return await updateUsuario(id, { nombre, email, fecha_nacimiento, genero, pais });
};
