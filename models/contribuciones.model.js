import db from "../db.js";

// Crear contribucion
export const createContribucion = async (userId, id_meta, monto, descripcion) => {
    const query = `
    INSERT INTO contribuciones (id_usuario, id_meta, monto, descripcion, fecha)
    VALUES ($1, $2, $3, $4, NOW()) RETURNING id_contribuciones
  `;
    const { rows } = await db.query(query, [userId, id_meta, monto, descripcion]);
    return rows[0].id_contribuciones;
};

// Obtener contribuciones por meta
export const getContribucionesByMeta = async (userId, id_meta) => {
    const query = `SELECT * FROM contribuciones WHERE id_meta = $1 AND id_usuario = $2 ORDER BY fecha DESC`;
    const { rows } = await db.query(query, [id_meta, userId]);
    return rows;
};

// Eliminar contribucion
export const deleteContribucion = async (userId, id_meta, id_contribucion) => {
    const query = `DELETE FROM contribuciones WHERE id_contribuciones = $1 AND id_meta = $2 AND id_usuario = $3`;
    const result = await db.query(query, [id_contribucion, id_meta, userId]);
    return result.rowCount > 0;
};
