import db from "../db.js";

// Crear categoría personalizada (requiere id_usuario y asume no predeterminada)
export const insertCategoria = async (nombre_categoria, tipo, id_usuario, color, icon, es_predeterminada = false) => {
  const query = `
    INSERT INTO categorias (nombre_categoria, tipo, id_usuario, color, icon, es_predeterminada)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_categoria
  `;
  const { rows } = await db.query(query, [nombre_categoria, tipo, id_usuario, color, icon, es_predeterminada]);
  return rows[0].id_categoria;
};

// Eliminar solo si es personalizada y del usuario actual (no predeterminada)
export const deleteCategoria = async (id_categoria, id_usuario) => {
  const query = `
    DELETE FROM categorias
    WHERE id_categoria = $1 AND id_usuario = $2 AND es_predeterminada = FALSE
  `;
  const result = await db.query(query, [id_categoria, id_usuario]);
  return result.rowCount;
};

// Buscar categorías por nombre (devuelve personalizadas del usuario y predeterminadas)
export const getCategoriasByName = async (nombre, id_usuario) => {
  const query = `
    SELECT * FROM categorias
    WHERE nombre_categoria LIKE $1
      AND (id_usuario = $2 OR es_predeterminada = TRUE)
  `;
  const { rows } = await db.query(query, [`%${nombre}%`, id_usuario]);
  return rows;
};

// Buscar categoría por id (SOLO si pertenece al usuario o es predeterminada)
export const getCategoriaById = async (id_categoria, id_usuario) => {
  const query = `
    SELECT * FROM categorias
    WHERE id_categoria = $1
      AND (id_usuario = $2 OR es_predeterminada = TRUE)
  `;
  const { rows } = await db.query(query, [id_categoria, id_usuario]);
  return rows[0];
};

// Listar todas las categorías por tipo (devuelve predeterminadas y personalizadas del usuario)
export const getCategoriasUser = async (id_usuario) => {
  const query = `
    SELECT 
      c.*,
      COUNT(t.id_transaccion) AS "transactionCount"
    FROM categorias c
    LEFT JOIN transacciones t 
      ON c.id_categoria = t.id_categoria
      AND t.id_usuario = $1
    WHERE c.es_predeterminada = TRUE 
       OR c.id_usuario = $2
    GROUP BY c.id_categoria;
  `;
  const { rows } = await db.query(query, [id_usuario, id_usuario]);
  return rows;
};




