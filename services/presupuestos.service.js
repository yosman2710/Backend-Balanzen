import {
  createPresupuesto,
  deletePresupuesto,
  findPresupuestoById,
  findPresupuestosByUsuario,
  findPresupuestosByFecha,
  findPresupuestosByCategoria,
  updatePresupuesto
} from '../models/presupuestos.model.js';
import { findTransaccionesByCategoryAndDateRange } from '../models/transaccion.model.js';

// Crear presupuesto: no permitir duplicados para misma categoria/periodo
// Crear presupuesto: no permitir duplicados para misma categoria/periodo (la validación temporal es más compleja, por ahora simplificamos o validamos solapamiento)
export const createPresupuestoService = async ({ id_usuario, id_categoria, monto_limite, fecha_final, alerta }) => {
  // Validación de solapamiento opcional o futura
  return await createPresupuesto({ id_usuario, id_categoria, monto_limite, fecha_final, alerta });
};

// Eliminar: permite solo si el presupuesto es del usuario actual
export const deletePresupuestoService = async (id_presupuesto, id_usuario) => {
  const presupuesto = await findPresupuestoById(id_usuario, id_presupuesto);
  if (!presupuesto) {
    throw new Error('Presupuesto no encontrado o no autorizado.');
  }
  return await deletePresupuesto(id_presupuesto);
};

// Actualizar: solo el dueño puede actualizar
export const updatePresupuestoService = async (id_presupuesto, id_usuario, { monto_limite, fecha_inicio, fecha_final, alerta }) => {
  const presupuesto = await findPresupuestoById(id_usuario, id_presupuesto);
  if (!presupuesto) {
    throw new Error('Presupuesto no encontrado o no autorizado.');
  }
  return await updatePresupuesto(id_usuario, id_presupuesto, { monto_limite, fecha_inicio, fecha_final, alerta });
};

// Listar todos mis presupuestos
export const findPresupuestosByUsuarioService = async (id_usuario) =>
  await findPresupuestosByUsuario(id_usuario);

// Listar por fecha valida
export const findPresupuestosByFechaService = async (id_usuario, fecha) =>
  await findPresupuestosByFecha(id_usuario, fecha);

// Listar por categoría (solo mías)
export const findPresupuestosByCategoriaService = async (id_categoria, id_usuario) => {
  const todos = await findPresupuestosByCategoria(id_categoria);
  return todos.filter(p => p.id_usuario === id_usuario);
};

export const findPresupuestoByIdService = async (id_usuario, id_presupuesto) => {
  // 1. Obtener presupuesto
  const presupuesto = await findPresupuestoById(id_usuario, id_presupuesto);
  if (!presupuesto) {
    throw new Error('Presupuesto no encontrado');
  }

  // 2. Obtener fechas de inicio y fin
  const startDate = presupuesto.fecha_inicio;
  const endDate = presupuesto.fecha_final;

  // 3. Buscar transacciones en ese rango
  const transactions = await findTransaccionesByCategoryAndDateRange(
    id_usuario,
    presupuesto.id_categoria,
    startDate,
    endDate
  );

  // 4. Calcular gastado
  const spent = transactions.reduce((acc, curr) => acc + Number(curr.monto), 0);

  // 5. Retornar objeto combinado
  return {
    budget: {
      id: presupuesto.id_presupuesto,
      categoryId: presupuesto.id_categoria,
      categoryName: presupuesto.nombre_categoria,
      categoryIcon: presupuesto.icon,
      categoryColor: presupuesto.color,
      amount: Number(presupuesto.monto_limite),
      spent: spent,
      startDate: presupuesto.fecha_inicio,
      endDate: presupuesto.fecha_final,
      alertThreshold: presupuesto.alerta,
    },
    transactions: transactions.map(t => ({
      id: t.id_transaccion,
      description: t.nombre_transaccion || t.descripcion, // Usar nombre o descripcion
      amount: Number(t.monto),
      date: t.fecha
    }))
  };
};
