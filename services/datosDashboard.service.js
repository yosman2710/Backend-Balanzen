import {
  getIngresosMesActual,
  getGastosMesActual,
  getIngresosMesAnterior,
  getGastosMesAnterior,
  getMonthlyIncomeExpenses,
  getRecentTransactions
} from '../models/cargarDatosDashboard.models.js';

export const fetchDashboardData = async (userId) => {
  try {
    const ingresosMes = await getIngresosMesActual(userId);
    const gastosMes = await getGastosMesActual(userId);
    const ingresosAnterior = await getIngresosMesAnterior(userId);
    const gastosAnterior = await getGastosMesAnterior(userId);
    const monthly = await getMonthlyIncomeExpenses(userId);
    const recent = await getRecentTransactions(userId);

    return {
      ingresosMes,
      gastosMes,
      incomeChange: ingresosMes - ingresosAnterior,
      expenseChange: gastosMes - gastosAnterior,
      monthly,
      recent
    };
  } catch (error) {
    throw new Error(`Error fetching dashboard data: ${error.message}`);
  }
};
