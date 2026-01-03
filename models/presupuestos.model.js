import db from "../db.js";

// Crear un presupuesto
export const createPresupuesto = async ({ id_usuario, id_categoria, monto_limite, fecha_final, alerta }) => {
  const query = `
    INSERT INTO presupuestos (id_usuario, id_categoria, monto_limite, fecha_inicio, fecha_final, alerta)
    VALUES ($1, $2, $3, NOW(), $4, $5) RETURNING id_presupuesto
  `;
  const { rows } = await db.query(query, [id_usuario, id_categoria, monto_limite, fecha_final, alerta]);
  return rows[0].id_presupuesto;
};

// Eliminar un presupuesto por id
export const deletePresupuesto = async (id_presupuesto) => {
  const query = `DELETE FROM presupuestos WHERE id_presupuesto = $1`;
  const result = await db.query(query, [id_presupuesto]);
  return result.rowCount > 0;
};

// Buscar presupuesto por id
export const findPresupuestoById = async (id_usuario, id_presupuesto) => {
  const query = `SELECT t.*, c.nombre_categoria, c.icon, c.color, c.tipo FROM presupuestos t JOIN categorias c ON t.id_categoria = c.id_categoria WHERE t.id_usuario = $1 AND t.id_presupuesto = $2 `;
  const { rows } = await db.query(query, [id_usuario, id_presupuesto]);
  return rows[0];
};

// Buscar todos los presupuestos de un usuario (listado completo)
export const findPresupuestosByUsuario = async (id_usuario) => {
  const query = `SELECT * FROM presupuestos WHERE id_usuario = $1`;
  const { rows } = await db.query(query, [id_usuario]);
  return rows;
};

// Buscar presupuestos validos en una fecha (útil para dashboards)
export const findPresupuestosByFecha = async (id_usuario, fecha) => {
  const query = `
    SELECT * FROM presupuestos
    WHERE id_usuario = $1 AND $2 BETWEEN fecha_inicio AND fecha_final
  `;
  const { rows } = await db.query(query, [id_usuario, fecha]);
  return rows;
};

// Buscar presupuestos por categoría
export const findPresupuestosByCategoria = async (id_categoria) => {
  const query = `SELECT * FROM presupuestos WHERE id_categoria = $1`;
  const { rows } = await db.query(query, [id_categoria]);
  return rows;
};

// Actualizar presupuesto por id
export const updatePresupuesto = async (id_usuario, id_presupuesto, { monto_limite, fecha_inicio, fecha_final, alerta }) => {
  const query = `
    UPDATE presupuestos SET monto_limite = $1, fecha_inicio = $2, fecha_final = $3, alerta = $4
    WHERE id_usuario = $5 AND id_presupuesto = $6
  `;
  const result = await db.query(query, [monto_limite, fecha_inicio, fecha_final, alerta, id_usuario, id_presupuesto]);
  return result.rowCount > 0;
};
