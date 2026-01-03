import {
  createPresupuestoService,
  deletePresupuestoService,
  updatePresupuestoService,
  findPresupuestosByUsuarioService,
  findPresupuestosByFechaService,
  findPresupuestosByCategoriaService,
  findPresupuestoByIdService
} from '../services/presupuestos.service.js';

// Crear presupuesto
export const createPresupuestoController = async (req, res) => {
  try {
    const id_usuario = req.user.userId; // autenticado
    const { id_categoria, monto_limite, fecha_final, alerta } = req.body;
    const id = await createPresupuestoService({ id_usuario, id_categoria, monto_limite, fecha_final, alerta });
    res.status(201).json({ id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar presupuesto
export const deletePresupuestoController = async (req, res) => {
  try {
    const id_usuario = req.user.userId;
    const { id_presupuesto } = req.params;
    await deletePresupuestoService(id_presupuesto, id_usuario);
    res.json({ message: 'Presupuesto eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar presupuesto
export const updatePresupuestoController = async (req, res) => {
  try {
    const id_usuario = req.user.userId;
    const { id_presupuesto } = req.params;
    const { monto_limite, fecha_inicio, fecha_final, alerta } = req.body;
    const updated = await updatePresupuestoService(id_presupuesto, id_usuario, { monto_limite, fecha_inicio, fecha_final, alerta });
    res.json({ message: 'Presupuesto actualizado correctamente', updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos los presupuestos propios
export const getPresupuestosController = async (req, res) => {
  try {
    const id_usuario = req.user.userId;
    const presupuestos = await findPresupuestosByUsuarioService(id_usuario);
    res.json(presupuestos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar por fecha
export const getPresupuestosByFechaController = async (req, res) => {
  try {
    const id_usuario = req.user.userId;
    const { fecha } = req.query;
    const presupuestos = await findPresupuestosByFechaService(id_usuario, fecha);
    res.json(presupuestos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Buscar por categoría
export const getPresupuestosByCategoriaController = async (req, res) => {
  try {
    const id_usuario = req.user.userId;
    const { id_categoria } = req.params;
    const presupuestos = await findPresupuestosByCategoriaService(id_categoria, id_usuario);
    res.json(presupuestos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPresupuestoByIdController = async (req, res) => {
  try {
    const id_usuario = req.user.userId;
    const { id_presupuesto } = req.params;
    const presupuesto = await findPresupuestoByIdService(id_usuario, id_presupuesto);
    res.json(presupuesto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};