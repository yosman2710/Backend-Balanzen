import { getUserByIdFromDB } from "../models/usuarios.model.js";

export const getUserByIdService = async (id) => {
    return await getUserByIdFromDB(id);
};
