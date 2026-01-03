import { fetchBudgetsWithProgressService } from '../services/datosbudget.service.js';

export const getBudgetsWithProgressController = async (req, res) => {
  try {
    const userId = req.user.userId; // Asumiendo auth con middleware
    const budgets = await fetchBudgetsWithProgressService(userId);
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
