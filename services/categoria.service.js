import {
  insertCategoria,
  deleteCategoria,
  getCategoriasByName,
  getCategoriaById,
  getCategoriasUser,
} from '../models/categorias.model.js';
import { findTransaccionesByCategoriaId } from '../models/transaccion.model.js';

// Regla de negocio: no permitir duplicados personalizados para el mismo usuario
// Regla de negocio: no permitir duplicados personalizados para el mismo usuario
export const createCategoriaService = async (name, type, id_usuario, color, icon) => {
  const tipoBD = type === "ingreso" ? "ingreso" : "gasto";
  const found = await getCategoriasByName(name, id_usuario);
  if (found.some(cat => cat.nombre_categoria === name && cat.id_usuario === id_usuario)) {
    throw new Error("Ya existe una categoría personalizada con ese nombre.");
  }
  return await insertCategoria(name, tipoBD, id_usuario, color, icon, false);
};

// Eliminar solo si NO es predeterminada y es del usuario. Regla de negocio: no eliminar predeterminada
export const deleteCategoriaService = async (id_categoria, id_usuario) => {
  const cat = await getCategoriaById(id_categoria, id_usuario);
  if (!cat || cat.es_predeterminada) throw new Error("No se puede eliminar una categoría predeterminada.");

  const transactions = await findTransaccionesByCategoriaId(id_categoria, id_usuario);
  if (transactions.length > 0) {
    throw new Error("No se puede eliminar una categoría con transacciones.");
  }

  return await deleteCategoria(id_categoria, id_usuario);
};

// Buscar por nombre: devuelve todas del usuario + predeterminadas que coinciden
export const getCategoriasByNameService = async (nombre, id_usuario) =>
  await getCategoriasByName(nombre, id_usuario);

// Buscar por id: solo si pertenece al usuario o es predeterminada
export const getCategoriaByIdService = async (id_categoria, id_usuario) => {
  const categoria = await getCategoriaById(id_categoria, id_usuario);
  if (!categoria) return null;
  return {
    id: categoria.id_categoria,
    name: categoria.nombre_categoria,
    icon: categoria.icon,
    color: categoria.color,
    type: categoria.tipo,
    isDefault: categoria.es_predeterminada
  };
};

// Buscar por tipo: muestra predeterminadas y del usuario
export const getCategoriasUserService = async (id_usuario) => {
  const categorias = await getCategoriasUser(id_usuario);
  return categorias.map(categoria => {
    return {
      id: categoria.id_categoria,
      name: categoria.nombre_categoria,
      icon: categoria.icon,
      color: categoria.color,
      type: categoria.tipo,
      isDefault: categoria.es_predeterminada,
      transactionCount: categoria.transactionCount
    };

  });
}



