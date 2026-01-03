import db from "../db.js";

// Crear usuario
export const createUsuario = async ({ nombre, email, password, fecha_nacimiento, genero, pais }) => {
  const query = `
    INSERT INTO usuarios (nombre, email, password, fecha_nacimiento, genero, pais, fecha_creacion)
    VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id_usuario
  `;
  const { rows } = await db.query(query, [nombre, email, password, fecha_nacimiento, genero, pais]);
  return rows[0].id_usuario;
};

// Obtener usuario por id
export const getUserByIdFromDB = async (id) => {
  const query = `SELECT * FROM usuarios WHERE id_usuario = $1`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

// Buscar usuario por email
export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM usuarios WHERE email = $1`;
  const { rows } = await db.query(query, [email]);
  return rows;
};
