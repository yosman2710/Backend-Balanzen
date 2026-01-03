import db from "../db.js";

// Crear alerta
export const createAlerta = async ({ id_usuario, id_presupuesto, tipo_alerta }) => {
    const query = `
    INSERT INTO alertas (id_usuario, id_presupuesto, tipo_alerta, fecha_alerta)
    VALUES ($1, $2, $3, NOW()) RETURNING id_alerta
  `;
    const { rows } = await db.query(query, [id_usuario, id_presupuesto, tipo_alerta]);
    return rows[0].id_alerta;
};

// Obtener alertas por usuario
export const getAlertasByUsuario = async (id_usuario) => {
    const query = `SELECT * FROM alertas WHERE id_usuario = $1 ORDER BY fecha_alerta DESC`;
    const { rows } = await db.query(query, [id_usuario]);
    return rows;
};

// Eliminar alerta
export const deleteAlerta = async (id_alerta) => {
    const query = `DELETE FROM alertas WHERE id_alerta = $1`;
    const result = await db.query(query, [id_alerta]);
    return result.rowCount > 0;
};
