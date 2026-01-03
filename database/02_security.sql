-- RLS Security Policies
-- This ensures that users can only access their own data via PostgREST

-- Enable RLS on all tables
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE presupuestos ENABLE ROW LEVEL SECURITY;
ALTER TABLE meta_ahorro ENABLE ROW LEVEL SECURITY;
ALTER TABLE contribucion_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE historial_chatbot ENABLE ROW LEVEL SECURITY;

-- Helper function for user ID (if not already defined)
-- CREATE OR REPLACE FUNCTION current_user_id() ... (See 01_views_functions.sql)

-- 1. Users
CREATE POLICY "Users can view their own profile" ON usuarios
    FOR SELECT USING (id_usuario = current_user_id());

CREATE POLICY "Users can update their own profile" ON usuarios
    FOR UPDATE USING (id_usuario = current_user_id());

-- 2. Categories
-- Users see their own categories OR default categories
CREATE POLICY "Users view own or default categories" ON categorias
    FOR SELECT USING (
        id_usuario = current_user_id() 
        OR es_predeterminada = TRUE
    );

CREATE POLICY "Users insert own categories" ON categorias
    FOR INSERT WITH CHECK (id_usuario = current_user_id());

CREATE POLICY "Users update own categories" ON categorias
    FOR UPDATE USING (id_usuario = current_user_id());

CREATE POLICY "Users delete own categories" ON categorias
    FOR DELETE USING (id_usuario = current_user_id() AND es_predeterminada = FALSE);

-- 3. Transacciones
CREATE POLICY "Users view own transactions" ON transacciones
    FOR SELECT USING (id_usuario = current_user_id());

CREATE POLICY "Users create own transactions" ON transacciones
    FOR INSERT WITH CHECK (id_usuario = current_user_id());

CREATE POLICY "Users update own transactions" ON transacciones
    FOR UPDATE USING (id_usuario = current_user_id());

CREATE POLICY "Users delete own transactions" ON transacciones
    FOR DELETE USING (id_usuario = current_user_id());

-- (Repeat for other tables: presupuestos, meta_ahorro, etc.)
CREATE POLICY "Users view own budgets" ON presupuestos FOR SELECT USING (id_usuario = current_user_id());
CREATE POLICY "Users manage own budgets" ON presupuestos FOR ALL USING (id_usuario = current_user_id());

CREATE POLICY "Users view own goals" ON meta_ahorro FOR SELECT USING (id_usuario = current_user_id());
CREATE POLICY "Users manage own goals" ON meta_ahorro FOR ALL USING (id_usuario = current_user_id());

CREATE POLICY "Users view own contributions" ON contribucion_meta FOR SELECT USING (id_usuario = current_user_id());
CREATE POLICY "Users manage own contributions" ON contribucion_meta FOR ALL USING (id_usuario = current_user_id());

CREATE POLICY "Users view own alerts" ON alertas FOR SELECT USING (id_usuario = current_user_id());
CREATE POLICY "Users manage own alerts" ON alertas FOR ALL USING (id_usuario = current_user_id());

CREATE POLICY "Users view own history" ON historial_chatbot FOR SELECT USING (id_usuario = current_user_id());
CREATE POLICY "Users manage own history" ON historial_chatbot FOR ALL USING (id_usuario = current_user_id());
