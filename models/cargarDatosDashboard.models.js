import db from '../db.js';


export const getIngresosMesActual = async (userId) => {
  const query = `
    SELECT CAST(COALESCE(SUM(t.monto),0) AS DECIMAL(10,2)) AS ingresos_mes_actual
    FROM transacciones t
    JOIN categorias c ON t.id_categoria = c.id_categoria
    WHERE t.id_usuario = $1 AND c.tipo='ingreso' 
      AND TO_CHAR(t.fecha, 'YYYY-MM') = TO_CHAR(CURRENT_DATE, 'YYYY-MM')
  `;
  const { rows } = await db.query(query, [userId]);
  return Number(rows[0]?.ingresos_mes_actual || 0);
};

// Obtener gastos del mes actual
export const getGastosMesActual = async (userId) => {
  const query = `
    SELECT CAST(COALESCE(SUM(t.monto),0) AS DECIMAL(10,2)) AS gastos_mes_actual FROM transacciones t JOIN categorias c ON t.id_categoria = c.id_categoria WHERE t.id_usuario = $1 AND c.tipo='gasto' AND TO_CHAR(t.fecha, 'YYYY-MM') = TO_CHAR(CURRENT_DATE, 'YYYY-MM')
  `;
  const { rows } = await db.query(query, [userId]);
  return Number(rows[0]?.gastos_mes_actual || 0);
};


// Obtener ingresos del mes anterior
export const getIngresosMesAnterior = async (userId) => {
  const query = `
    SELECT CAST(COALESCE(SUM(t.monto),0) AS DECIMAL(10,2)) AS ingresos_mes_anterior
    FROM transacciones t
    JOIN categorias c ON t.id_categoria = c.id_categoria
    WHERE t.id_usuario = $1 AND c.tipo='ingreso'
      AND TO_CHAR(t.fecha, 'YYYY-MM') = TO_CHAR(CURRENT_DATE - INTERVAL '1 month', 'YYYY-MM')
  `;
  const { rows } = await db.query(query, [userId]);
  return Number(rows[0]?.ingresos_mes_anterior || 0);
};

// Obtener gastos del mes anterior
export const getGastosMesAnterior = async (userId) => {
  const query = `
    SELECT CAST(COALESCE(SUM(t.monto),0) AS DECIMAL(10,2)) AS gastos_mes_anterior
    FROM transacciones t
    JOIN categorias c ON t.id_categoria = c.id_categoria
    WHERE t.id_usuario = $1 AND c.tipo='gasto'
      AND TO_CHAR(t.fecha, 'YYYY-MM') = TO_CHAR(CURRENT_DATE - INTERVAL '1 month', 'YYYY-MM')
  `;
  const { rows } = await db.query(query, [userId]);
  return Number(rows[0]?.gastos_mes_anterior || 0);
};







// Obtiene ingresos y gastos por mes para últimos 6 meses
export const getMonthlyIncomeExpenses = async (userId) => {
  const query = `
    SELECT 
      TO_CHAR(t.fecha, 'YYYY-MM') AS mes,
      SUM(CASE WHEN c.tipo = 'ingreso' THEN t.monto ELSE 0 END) AS ingresos,
      SUM(CASE WHEN c.tipo = 'gasto' THEN t.monto ELSE 0 END) AS gastos
    FROM transacciones t
    JOIN categorias c ON t.id_categoria = c.id_categoria
    WHERE t.id_usuario = $1
      AND t.fecha >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '5 months'
    GROUP BY mes
    ORDER BY mes DESC LIMIT 4;
  `;
  const { rows } = await db.query(query, [userId]);
  return rows.map((row) => ({
    ...row,
    ingresos: Number(row.ingresos),
    gastos: Number(row.gastos),
  }));
};


// Obtiene últimas 3 transacciones con formato de fecha
export const getRecentTransactions = async (userId) => {
  const query = `
    SELECT t.id_transaccion AS id, c.tipo AS type, c.nombre_categoria AS category, t.monto AS amount, t.fecha AS date, t.descripcion AS description, t.nombre_transaccion AS name FROM transacciones t JOIN categorias c ON t.id_categoria = c.id_categoria WHERE t.id_usuario = $1  ORDER BY t.fecha DESC LIMIT 3;
  `;
  const { rows } = await db.query(query, [userId]);
  return rows.map((row) => ({
    ...row,
    amount: Number(row.amount),
    date: new Date(row.date),
  }));
};
