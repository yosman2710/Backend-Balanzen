import db from "../db.js";

// Crear una transacción
export const createTransaccion = async ({ id_usuario, id_categoria, nombre_transaccion, monto, fecha, descripcion }) => {
  const query = `
    INSERT INTO transacciones (id_usuario, id_categoria, nombre_transaccion, monto, fecha, descripcion)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_transaccion
  `;
  const { rows } = await db.query(query, [id_usuario, id_categoria, nombre_transaccion, monto, fecha, descripcion]);
  return rows[0].id_transaccion; // Devuelve el id de la nueva transacción
};

// Eliminar una transacción por id
export const deleteTransaccion = async (id_transaccion) => {
  const query = `DELETE FROM transacciones WHERE id_transaccion = $1`;
  const result = await db.query(query, [id_transaccion]);
  return result.rowCount > 0;
};

// Buscar transacción por id
export const findTransaccionById = async (id_transaccion) => {
  const query = `SELECT * FROM transacciones WHERE id_transaccion = $1`;
  const { rows } = await db.query(query, [id_transaccion]);
  return rows[0];
};

// Buscar transacciones por nombre de categoría (JOIN)
export const findTransaccionesByCategoriaNombre = async (nombre_categoria) => {
  const query = `
    SELECT t.*
    FROM transacciones t
    JOIN categorias c ON t.id_categoria = c.id_categoria
    WHERE c.nombre_categoria LIKE $1
  `;
  const { rows } = await db.query(query, [`%${nombre_categoria}%`]);
  return rows;
};

// Buscar transacciones por ID de categoría
export const findTransaccionesByCategoriaId = async (id_categoria, id_usuario) => {
  const query = `
    SELECT *
    FROM transacciones
    WHERE id_categoria = $1 AND (id_usuario = $2 OR id_usuario = 0)
    ORDER BY fecha DESC
  `;
  const { rows } = await db.query(query, [id_categoria, id_usuario]);
  return rows;
};

// Buscar transacciones por tipo de categoría (ingreso/gasto)
export const findTransaccionesByCategoriaTipo = async (tipo, id_usuario) => {
  const query = `
    SELECT t.*
    FROM transacciones t
    JOIN categorias c ON t.id_categoria = c.id_categoria
    WHERE c.tipo = $1 AND t.id_usuario = $2
  `;
  const { rows } = await db.query(query, [tipo, id_usuario]); // tipo debe ser 'ingreso' o 'gasto'
  return rows;
};

export const findTransaccionesByNombre = async (nombre_transaccion) => {
  const query = `
    SELECT * FROM transacciones WHERE nombre_transaccion LIKE $1
  `;
  const { rows } = await db.query(query, [`%${nombre_transaccion}%`]);
  return rows; // Devuelve un array de transacciones que coinciden
};

export const updateTransaccion = async (id_transaccion, { id_usuario, id_categoria, monto, fecha, descripcion, nombre_transaccion }) => {
  const query = `
    UPDATE transacciones SET id_usuario = $1, id_categoria = $2, monto = $3, fecha = $4, descripcion = $5, nombre_transaccion = $6
    WHERE id_transaccion = $7
  `;
  const result = await db.query(query, [id_usuario, id_categoria, monto, fecha, descripcion, nombre_transaccion, id_transaccion]);
  return result.rowCount > 0;
};



export const getTransaccionesUser = async (id_usuario) => {
  const query = `SELECT t.id_transaccion, c.tipo, t.nombre_transaccion, t.monto, c.nombre_categoria, t.fecha, c.icon FROM transacciones t JOIN categorias c ON t.id_categoria = c.id_categoria WHERE t.id_usuario = $1 ORDER BY t.fecha DESC
`;
  const { rows } = await db.query(query, [id_usuario]);
  return rows;
};













// Buscar transacciones por rango de fecha y categoría
export const findTransaccionesByCategoryAndDateRange = async (id_usuario, id_categoria, startDate, endDate) => {
  const query = `
    SELECT * 
    FROM transacciones 
    WHERE id_usuario = $1 
      AND id_categoria = $2 
      AND fecha BETWEEN $3 AND $4
    ORDER BY fecha DESC
  `;
  const { rows } = await db.query(query, [id_usuario, id_categoria, startDate, endDate]);
  return rows;
};
