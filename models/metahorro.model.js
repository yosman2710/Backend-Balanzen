import db from "../db.js";
// Crear meta de ahorro
export const createMetaAhorro = async (id_usuario, nombre_meta, descripcion_meta, fecha_limite, monto_objetivo) => {
  const query = `
    INSERT INTO meta_ahorro (id_usuario, nombre_meta, descripcion_meta, fecha_limite, monto_objetivo, fecha_creacion)
    VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id_meta
  `;
  const { rows } = await db.query(query, [id_usuario, nombre_meta, descripcion_meta, fecha_limite, monto_objetivo]);
  return rows[0].id_meta;
};

// Eliminar meta de ahorro por id
export const deleteMetaAhorro = async (id_usuario, id_meta) => {
  const query = `DELETE FROM meta_ahorro WHERE id_meta = $1 AND id_usuario = $2`;
  const result = await db.query(query, [id_meta, id_usuario]);
  return result.rowCount > 0;
};

// Buscar meta de ahorro por id
export const findMetaAhorroById = async (id_usuario, id_meta) => {
  const query = `SELECT * FROM meta_ahorro WHERE id_meta = $1 AND id_usuario = $2`;
  const { rows } = await db.query(query, [id_meta, id_usuario]);
  return rows;
};

// Buscar metas de ahorro por usuario
export const findMetasAhorroByUsuario = async (id_usuario) => {
  const query = `SELECT * FROM meta_ahorro WHERE id_usuario = $1`;
  const { rows } = await db.query(query, [id_usuario]);
  return rows;
};

// Actualizar meta de ahorro por id
export const updateMetaAhorro = async (id_usuario, id_meta, { nombre_meta, descripcion_meta, monto_actual, monto_objetivo }) => {
  const query = `
    UPDATE meta_ahorro SET nombre_meta = $1, descripcion_meta = $2, monto_actual = $3, monto_objetivo = $4
    WHERE id_meta = $5 AND id_usuario = $6
  `;
  const result = await db.query(query, [nombre_meta, descripcion_meta, monto_actual, monto_objetivo, id_meta, id_usuario]);
  return result.rowCount > 0;
};


export const getMetaAhorroDashboard = async (id_usuario) => {
  const query = `
    SELECT id_meta, nombre_meta, monto_actual, monto_objetivo, fecha_creacion
    FROM meta_ahorro
    WHERE id_usuario = $1
    ORDER BY fecha_creacion DESC
    LIMIT 1;
  `;
  const { rows } = await db.query(query, [id_usuario]);
  if (!rows.length) return null;

  const meta = rows[0];
  return {
    id: meta.id_meta,
    name: meta.nombre_meta,
    currentAmount: Number(meta.monto_actual),
    targetAmount: Number(meta.monto_objetivo),
    createdAt: meta.fecha_creacion,
  };
};


export const createContribucionMeta = async (id_usuario, id_meta, monto) => {
  const query = `
    INSERT INTO contribucion_meta (id_usuario, id_meta, monto)
    VALUES ($1, $2, $3) RETURNING id_contribucion
  `;
  const { rows } = await db.query(query, [id_usuario, id_meta, monto]);
  return rows[0].id_contribucion;
};

export const deleteContribucionMeta = async (id_usuario, id_meta, id_contribucion) => {
  const query = `DELETE FROM contribucion_meta WHERE id_contribucion = $1 AND id_meta = $2 AND id_usuario = $3`;
  const result = await db.query(query, [id_contribucion, id_meta, id_usuario]);
  return result.rowCount > 0;
};

export const updateContribucionMeta = async (id_usuario, id_meta, id_contribucion, monto) => {
  const query = `
    UPDATE contribucion_meta SET monto = $1
    WHERE id_contribucion = $2 AND id_meta = $3 AND id_usuario = $4
  `;
  const result = await db.query(query, [monto, id_contribucion, id_meta, id_usuario]);
  return result.rowCount > 0;
};  