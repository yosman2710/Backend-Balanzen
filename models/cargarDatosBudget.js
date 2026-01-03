import db from '../db.js';

export const getBudgetsWithSpent = async (userId) => {
  const query = `
    SELECT 
      p.id_presupuesto AS id,
      c.id_categoria AS "categoryId",
      c.nombre_categoria AS category,
      c.icon AS icon,
      c.color AS color,
      p.monto_limite AS "limit",
      COALESCE(SUM(t.monto), 0) AS spent
    FROM presupuestos p
    JOIN categorias c ON p.id_categoria = c.id_categoria
    LEFT JOIN transacciones t ON p.id_usuario = t.id_usuario 
      AND p.id_categoria = t.id_categoria 
      AND t.fecha BETWEEN p.fecha_inicio AND p.fecha_final
    WHERE p.id_usuario = $1
      AND CURRENT_DATE BETWEEN p.fecha_inicio AND p.fecha_final
    GROUP BY p.id_presupuesto, c.id_categoria, c.nombre_categoria, c.icon, c.color, p.monto_limite;
  `;
  const { rows } = await db.query(query, [userId]);
  return rows;
};
