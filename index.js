import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from "./db.js";

// Routes
import authRoutes from './routes/auth.route.js';
import categoriaRoutes from './routes/categoria.route.js';
import presupuestoRoutes from './routes/presupuestos.route.js';
import transaccionRoutes from './routes/transaccion.route.js';
import datosDashboardRoutes from './routes/datosDashboard.route.js';
import datosBudgetRoutes from './routes/datosbudget.route.js';
import alertasRoutes from './routes/alertas.route.js';
import contribucionesRoutes from './routes/contribuciones.route.js';
import chatbotRoutes from './routes/historial_chatbot.route.js';
import metaAhorroRoutes from './routes/metaAhorro.route.js';
import usuarioRoutes from './routes/usuario.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test DB Connection
async function testConnection() {
  try {
    const { rows } = await pool.query("SELECT NOW() AS now");
    console.log("Conexión a base de datos exitosa. Hora del servidor:", rows[0].now);
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
}

testConnection();

// Routes Registration
app.use('/auth', authRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/presupuestos', presupuestoRoutes);
app.use('/transacciones', transaccionRoutes);
app.use('/dashboard', datosDashboardRoutes);
app.use('/budget', datosBudgetRoutes);
app.use('/alertas', alertasRoutes);
app.use('/contribuciones', contribucionesRoutes);
app.use('/chatbot', chatbotRoutes);
app.use('/metaAhorro', metaAhorroRoutes);
app.use('/usuario', usuarioRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'Backend de Balanzen funcionando correctamente 🚀' });
});

// Start Server
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en corriendo`);
});