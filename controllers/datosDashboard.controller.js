import { fetchDashboardData } from '../services/datosDashboard.service.js';

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = await fetchDashboardData(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
