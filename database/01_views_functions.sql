-- Views and Functions for PostgREST Aggregation
-- These replace the logic in 'cargarDatosDashboard.models.js'

-- 1. Dashboard Stats View (or Function)
-- Since we need to filter by the *current* user, a Function is better than a simple View unless existing RLS handles the filtering transparently.
-- With RLS enabled, a View `dashboard_stats` would only show the current user's data.

CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
    (SELECT COALESCE(SUM(t.monto), 0)
     FROM transacciones t
     JOIN categorias c ON t.id_categoria = c.id_categoria
     WHERE t.id_usuario = auth.uid() -- Assumes using Supabase/PostgREST auth.uid()
       AND c.tipo = 'ingreso'
       AND TO_CHAR(t.fecha, 'YYYY-MM') = TO_CHAR(NOW(), 'YYYY-MM')
    ) AS ingresos_mes_actual,
    
    (SELECT COALESCE(SUM(t.monto), 0)
     FROM transacciones t
     JOIN categorias c ON t.id_categoria = c.id_categoria
     WHERE t.id_usuario = auth.uid()
       AND c.tipo = 'gasto'
       AND TO_CHAR(t.fecha, 'YYYY-MM') = TO_CHAR(NOW(), 'YYYY-MM')
    ) AS gastos_mes_actual,
    
    (SELECT COALESCE(SUM(t.monto), 0)
     FROM transacciones t
     JOIN categorias c ON t.id_categoria = c.id_categoria
     WHERE t.id_usuario = auth.uid()
       AND c.tipo = 'ingreso'
       AND TO_CHAR(t.fecha, 'YYYY-MM') = TO_CHAR(NOW() - INTERVAL '1 month', 'YYYY-MM')
    ) AS ingresos_mes_anterior,
    
    (SELECT COALESCE(SUM(t.monto), 0)
     FROM transacciones t
     JOIN categorias c ON t.id_categoria = c.id_categoria
     WHERE t.id_usuario = auth.uid()
       AND c.tipo = 'gasto'
       AND TO_CHAR(t.fecha, 'YYYY-MM') = TO_CHAR(NOW() - INTERVAL '1 month', 'YYYY-MM')
    ) AS gastos_mes_anterior;

-- Note: 'auth.uid()' is specific to Supabase/PostgREST JWT setup.
-- If running raw PostgREST, it might be `current_setting('request.jwt.claim.sub', true)::int`.
-- I'll define a helper function for compatibility.

CREATE OR REPLACE FUNCTION current_user_id() RETURNS INTEGER AS $$
BEGIN
    RETURN current_setting('request.jwt.claim.sub', true)::INTEGER;
EXCEPTION WHEN OTHERS THEN
    RETURN NULL; -- Or handle gracefully
END;
$$ LANGUAGE plpgsql STABLE;

-- Update the View to use the helper
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
    (SELECT COALESCE(SUM(t.monto), 0)
     FROM transacciones t
     JOIN categorias c ON t.id_categoria = c.id_categoria
     WHERE t.id_usuario = current_user_id()
       AND c.tipo = 'ingreso'
       AND TO_CHAR(t.fecha, 'YYYY-MM') = TO_CHAR(NOW(), 'YYYY-MM')
    ) AS ingresos_mes_actual,
    
    (SELECT COALESCE(SUM(t.monto), 0)
     FROM transacciones t
     JOIN categorias c ON t.id_categoria = c.id_categoria
     WHERE t.id_usuario = current_user_id()
       AND c.tipo = 'gasto'
       AND TO_CHAR(t.fecha, 'YYYY-MM') = TO_CHAR(NOW(), 'YYYY-MM')
    ) AS gastos_mes_actual;
    -- (Add others similarly)

-- 2. Monthly Income/Expenses (Graph Data)
CREATE OR REPLACE FUNCTION get_monthly_income_expenses()
RETURNS TABLE (
    mes TEXT,
    ingresos DECIMAL,
    gastos DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        TO_CHAR(t.fecha, 'YYYY-MM') AS mes,
        SUM(CASE WHEN c.tipo = 'ingreso' THEN t.monto ELSE 0 END) AS ingresos,
        SUM(CASE WHEN c.tipo = 'gasto' THEN t.monto ELSE 0 END) AS gastos
    FROM transacciones t
    JOIN categorias c ON t.id_categoria = c.id_categoria
    WHERE t.id_usuario = current_user_id()
      AND t.fecha >= DATE_TRUNC('month', NOW()) - INTERVAL '5 months'
    GROUP BY mes
    ORDER BY mes DESC
    LIMIT 4;
END;
$$ LANGUAGE plpgsql STABLE;

-- 3. Budget Status View (Active Budgets with Spent Amount)
CREATE OR REPLACE VIEW budget_status AS
SELECT 
  p.id_presupuesto,
  c.id_categoria,
  c.nombre_categoria,
  c.icon,
  c.color,
  p.monto_limite,
  COALESCE(SUM(t.monto), 0) AS spent
FROM presupuestos p
JOIN categorias c ON p.id_categoria = c.id_categoria
LEFT JOIN transacciones t ON p.id_usuario = t.id_usuario 
  AND p.id_categoria = t.id_categoria 
  AND t.fecha BETWEEN p.fecha_inicio AND p.fecha_final
WHERE p.id_usuario = current_user_id()
  -- Check if budget is active (current date within range)
  AND NOW() BETWEEN p.fecha_inicio AND p.fecha_final
GROUP BY p.id_presupuesto, c.id_categoria, c.nombre_categoria, c.icon, c.color, p.monto_limite;

